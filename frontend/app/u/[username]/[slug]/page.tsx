"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Render } from "@measured/puck";
import { puckConfig } from "@/app/builder/puck.config";
import { api } from "@/lib/api";

interface PublicPortfolio {
  name: string;
  slug: string;
  puck_json: Record<string, unknown>;
  published_at: string | null;
  username: string;
}

export default function PublicPortfolioPage() {
  const params = useParams();
  const username = params.username as string;
  const slug = params.slug as string;

  const [portfolio, setPortfolio] = useState<PublicPortfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const data = await api.getPublicPortfolio(username, slug);
        setPortfolio(data);
      } catch (err) {
        setError("Portfolio not found or not published");
      } finally {
        setLoading(false);
      }
    };

    loadPortfolio();
  }, [username, slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500" />
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-slate-400 mb-6">{error || "Portfolio not found"}</p>
        <a
          href="/"
          className="text-sky-400 hover:text-sky-300 transition-colors"
        >
          ← Back to Home
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Render config={puckConfig} data={portfolio.puck_json as any} />
    </div>
  );
}
