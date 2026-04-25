"use client";

import React, { useState, useRef, useEffect } from "react";
import { Puck, Data } from "@measured/puck";
import "@measured/puck/puck.css";
import { puckConfig, starterPageData, defaultPageData } from "./puck.config";

// ─── TYPES ─────────────────────────────────────────────────────────────────────
type Message = {
  role: "user" | "assistant";
  content: string;
};

// ─── CHAT PANEL ────────────────────────────────────────────────────────────────
function ChatPanel({
  pageData,
  onDataChange,
}: {
  pageData: Data;
  onDataChange: (data: Data) => void;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I can help you build your portfolio. Try saying something like:\n\n• \"Add a navbar with my name John Doe\"\n• \"Change the hero headline to Full Stack Developer\"\n• \"Add a projects section with 3 projects\"",
    },
  ]);
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

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.message || "Done! Check the canvas.",
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0f172a] border-l border-white/10">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10">
        <p className="text-sm font-semibold text-white">AI Assistant</p>
        <p className="text-xs text-slate-400">
          Describe what you want to build
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
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

      {/* Input */}
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
const [pageData, setPageData] = useState<Data>(starterPageData as Data);
const [puckKey, setPuckKey] = useState(0);
useEffect(() => {
  const fix = () => {
    const inner = document.querySelector('[class*="PuckCanvas-inner"]') as HTMLElement;
    if (inner) {
      inner.style.paddingBottom = '35px';
      inner.style.boxSizing = 'content-box';
    }
  };
  
  // Run after Puck renders
  const timer = setTimeout(fix, 500);
  return () => clearTimeout(timer);
}, [puckKey]);
  const handlePublish = async (data: Data) => {
    // TODO: Save to database
    console.log("Publishing:", data);
    alert("Portfolio saved! (DB integration coming soon)");
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-[#020617] border-b border-white/10 z-50">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold text-lg tracking-tight">
            profolio
          </span>
          <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
            Builder
          </span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setPageData(defaultPageData as Data)}
            className="text-xs text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
          >
            Clear Canvas
          </button>
          <button
            onClick={() => setPageData(starterPageData as Data)}
            className="text-xs text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
          >
            Load Starter
          </button>
          <button
            onClick={() => handlePublish(pageData)}
            className="text-xs bg-sky-500 text-white px-4 py-1.5 rounded-lg hover:bg-sky-400 transition-colors font-medium"
          >
            Save Portfolio
          </button>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Puck Editor — takes up most space */}
        <div className="flex-1 min-h-0 overflow-hidden ">
          <Puck
            key={puckKey}
            config={puckConfig}
            data={pageData}
            onPublish={handlePublish}
            onChange={setPageData}
          />
        </div>

        {/* AI Chat Panel — fixed width sidebar */}
        <div className="w-80 flex-shrink-0 overflow-hidden">
          <ChatPanel pageData={pageData} onDataChange={(data) => {
                setPageData(data);
                setPuckKey(k => k + 1);
            }} 
          />
        </div>
      </div>
    </div>
  );
}