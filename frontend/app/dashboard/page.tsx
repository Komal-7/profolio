"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, ExternalLink, Trash2, Globe, FileEdit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api, Portfolio } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Create modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState("");

  useEffect(() => {
    loadPortfolios();
  }, []);

  const loadPortfolios = async () => {
    try {
      const data = await api.getPortfolios();
      setPortfolios(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load portfolios");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError("");
    setCreateLoading(true);

    try {
      const portfolio = await api.createPortfolio(newName, newSlug);
      router.push(`/builder/${portfolio.id}`);
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : "Failed to create portfolio");
      setCreateLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this portfolio?")) return;

    try {
      await api.deletePortfolio(id);
      setPortfolios(portfolios.filter((p) => p.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete portfolio");
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0d141c]">My Portfolios</h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back, {user?.username}
          </p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-[#0c7ff2] hover:bg-[#0a6dd4] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Portfolio
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">{error}</div>
      )}

      {/* Portfolio Grid */}
      {portfolios.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="text-gray-400 mb-4">
            <FileEdit className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            No portfolios yet
          </h3>
          <p className="text-gray-500 mb-4">
            Create your first portfolio to get started
          </p>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-[#0c7ff2] hover:bg-[#0a6dd4] text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Portfolio
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolios.map((portfolio) => (
            <Card
              key={portfolio.id}
              className="p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-[#0d141c]">
                    {portfolio.name}
                  </h3>
                  <p className="text-xs text-gray-500">/{portfolio.slug}</p>
                </div>
                {portfolio.is_published ? (
                  <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    <Globe className="w-3 h-3" />
                    Published
                  </span>
                ) : (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    Draft
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-400 mb-4">
                Last edited: {formatDate(portfolio.updated_at)}
              </p>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => router.push(`/builder/${portfolio.id}`)}
                >
                  <FileEdit className="w-3 h-3 mr-1" />
                  Edit
                </Button>

                {portfolio.is_published && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const url = `/u/${user?.username}/${portfolio.slug}`;
                      window.open(url, "_blank");
                    }}
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => handleDelete(portfolio.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md p-6 m-4">
            <h2 className="text-xl font-bold text-[#0d141c] mb-4">
              Create New Portfolio
            </h2>
            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Portfolio Name
                </label>
                <Input
                  type="text"
                  placeholder="My Portfolio"
                  value={newName}
                  onChange={(e) => {
                    setNewName(e.target.value);
                    setNewSlug(generateSlug(e.target.value));
                  }}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  URL Slug
                </label>
                <Input
                  type="text"
                  placeholder="my-portfolio"
                  value={newSlug}
                  onChange={(e) => setNewSlug(e.target.value)}
                  pattern="^[a-z0-9-]+$"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  Your portfolio will be at: /u/{user?.username}/{newSlug || "..."}
                </p>
              </div>

              {createError && (
                <p className="text-red-500 text-sm">{createError}</p>
              )}

              <div className="flex gap-3 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewName("");
                    setNewSlug("");
                    setCreateError("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-[#0c7ff2] hover:bg-[#0a6dd4] text-white"
                  disabled={createLoading}
                >
                  {createLoading ? "Creating..." : "Create"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
