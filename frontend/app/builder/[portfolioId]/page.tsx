"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Puck, Data } from "@measured/puck";
import "@measured/puck/puck.css";
import { puckConfig, defaultPageData } from "../puck.config";
import { api, Portfolio, ChatMessage } from "@/lib/api";
import { ArrowLeft, Save, Globe, Copy, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// ─── TYPES ─────────────────────────────────────────────────────────────────────
type Message = {
  role: "user" | "assistant";
  content: string;
};

// ─── CHAT PANEL ────────────────────────────────────────────────────────────────
function ChatPanel({
  portfolioId,
  pageData,
  onDataChange,
  initialMessages,
}: {
  portfolioId: string;
  pageData: Data;
  onDataChange: (data: Data) => void;
  initialMessages: Message[];
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    // Save user message to DB
    try {
      await api.saveChatMessage(portfolioId, "user", userMessage);
    } catch (err) {
      console.error("Failed to save user message:", err);
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          pageData: pageData,
        }),
      });

      const data = await response.json();

      if (data.updatedPageData) {
        onDataChange(data.updatedPageData);
      }

      const assistantMessage = data.message || "Done! Check the canvas.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantMessage },
      ]);

      // Save assistant message to DB
      try {
        await api.saveChatMessage(portfolioId, "assistant", assistantMessage);
      } catch (err) {
        console.error("Failed to save assistant message:", err);
      }
    } catch (err) {
      const errorMessage = "Something went wrong. Please try again.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: errorMessage },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0f172a] border-l border-white/10">
      <div className="px-4 py-3 border-b border-white/10">
        <p className="text-sm font-semibold text-white">AI Assistant</p>
        <p className="text-xs text-slate-400">Describe what you want to build</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-sky-500 text-white rounded-br-sm"
                  : "bg-slate-800 text-slate-200 rounded-bl-sm"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 rounded-2xl rounded-bl-sm px-4 py-2.5">
              <div className="flex gap-1 items-center">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Describe what you want..."
            rows={2}
            className="flex-1 bg-slate-800 text-slate-200 text-sm rounded-xl px-3 py-2 resize-none outline-none border border-white/10 focus:border-sky-500 placeholder:text-slate-500 transition-colors"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="self-end px-4 py-2 bg-sky-500 text-white text-sm font-medium rounded-xl hover:bg-sky-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}

// ─── BUILDER PAGE ──────────────────────────────────────────────────────────────
export default function BuilderPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const portfolioId = params.portfolioId as string;

  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [pageData, setPageData] = useState<Data>(defaultPageData as Data);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [puckKey, setPuckKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  // Load portfolio and chat history
  useEffect(() => {
    const loadData = async () => {
      try {
        const [portfolioData, chatHistory] = await Promise.all([
          api.getPortfolio(portfolioId),
          api.getChatHistory(portfolioId),
        ]);

        setPortfolio(portfolioData);
        setPageData(portfolioData.puck_json as Data);

        // Convert chat history to messages format
        const messages: Message[] = chatHistory.length > 0
          ? chatHistory.map((msg) => ({ role: msg.role, content: msg.content }))
          : [{
              role: "assistant" as const,
              content: "Hi! I can help you build your portfolio. Try saying something like:\n\n• \"Add a navbar with my name John Doe\"\n• \"Change the hero headline to Full Stack Developer\"\n• \"Add a projects section with 3 projects\"",
            }];
        setChatMessages(messages);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load portfolio");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [portfolioId]);

  // Fix Puck canvas padding
  useEffect(() => {
    const fix = () => {
      const inner = document.querySelector('[class*="PuckCanvas-inner"]') as HTMLElement;
      if (inner) {
        inner.style.paddingBottom = "35px";
        inner.style.boxSizing = "content-box";
      }
    };
    const timer = setTimeout(fix, 500);
    return () => clearTimeout(timer);
  }, [puckKey]);

  const handleSave = async () => {
    if (!portfolio) return;
    setSaving(true);
    try {
      await api.updatePortfolio(portfolioId, { puck_json: pageData as Record<string, unknown> });
      setHasUnsavedChanges(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!portfolio) return;
    try {
      const updated = await api.publishPortfolio(portfolioId, portfolio.slug);
      setPortfolio(updated);
      alert("Portfolio published!");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to publish");
    }
  };

  const handleUnpublish = async () => {
    if (!portfolio) return;
    try {
      const updated = await api.unpublishPortfolio(portfolioId);
      setPortfolio(updated);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to unpublish");
    }
  };

  const copyPublicUrl = () => {
    if (!portfolio || !user) return;
    const url = `${window.location.origin}/u/${user.username}/${portfolio.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDataChange = useCallback((data: Data) => {
    setPageData(data);
    setHasUnsavedChanges(true);
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#020617]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#020617] text-white">
        <p className="text-red-400 mb-4">{error}</p>
        <button
          onClick={() => router.push("/dashboard")}
          className="text-sky-400 hover:text-sky-300"
        >
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#020617] border-b border-white/10 z-50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-slate-400 hover:text-white transition-colors p-1"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-white font-semibold">{portfolio?.name}</span>
            {hasUnsavedChanges && (
              <span className="ml-2 text-xs text-amber-400">• Unsaved</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {portfolio?.is_published && (
            <button
              onClick={copyPublicUrl}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-white/5"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied!" : "Copy URL"}
            </button>
          )}

          <button
            onClick={handleSave}
            disabled={saving || !hasUnsavedChanges}
            className="flex items-center gap-1 text-xs bg-slate-700 text-white px-3 py-1.5 rounded-lg hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Save className="w-3 h-3" />
            {saving ? "Saving..." : "Save"}
          </button>

          {portfolio?.is_published ? (
            <button
              onClick={handleUnpublish}
              className="flex items-center gap-1 text-xs bg-amber-600 text-white px-3 py-1.5 rounded-lg hover:bg-amber-500 transition-colors"
            >
              <Globe className="w-3 h-3" />
              Unpublish
            </button>
          ) : (
            <button
              onClick={handlePublish}
              className="flex items-center gap-1 text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-500 transition-colors"
            >
              <Globe className="w-3 h-3" />
              Publish
            </button>
          )}
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 min-h-0 overflow-hidden">
          <Puck
            key={puckKey}
            config={puckConfig}
            data={pageData}
            onPublish={handleSave}
            onChange={handleDataChange}
          />
        </div>

        <div className="w-80 flex-shrink-0 overflow-hidden">
          <ChatPanel
            portfolioId={portfolioId}
            pageData={pageData}
            onDataChange={(data) => {
              handleDataChange(data);
              setPuckKey((k) => k + 1);
            }}
            initialMessages={chatMessages}
          />
        </div>
      </div>
    </div>
  );
}
