const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface User {
  id: string;
  username: string;
  email: string;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface ApiError {
  detail: string;
}

export interface Portfolio {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  puck_json: Record<string, unknown>;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  portfolio_id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({
        detail: "An unexpected error occurred",
      }));
      throw new Error(error.detail);
    }

    return response.json();
  }

  // Auth endpoints
  async signup(username: string, email: string, password: string): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    });
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async updatePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
    return this.request<{ message: string }>("/auth/password", {
      method: "PUT",
      body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
    });
  }

  // Portfolio endpoints
  async getPortfolios(): Promise<Portfolio[]> {
    return this.request<Portfolio[]>("/portfolios");
  }

  async createPortfolio(name: string, slug: string): Promise<Portfolio> {
    return this.request<Portfolio>("/portfolios", {
      method: "POST",
      body: JSON.stringify({ name, slug }),
    });
  }

  async getPortfolio(id: string): Promise<Portfolio> {
    return this.request<Portfolio>(`/portfolios/${id}`);
  }

  async updatePortfolio(id: string, data: { name?: string; puck_json?: Record<string, unknown> }): Promise<Portfolio> {
    return this.request<Portfolio>(`/portfolios/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deletePortfolio(id: string): Promise<void> {
    await fetch(`${this.baseUrl}/portfolios/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }

  async publishPortfolio(id: string, slug: string): Promise<Portfolio> {
    return this.request<Portfolio>(`/portfolios/${id}/publish`, {
      method: "POST",
      body: JSON.stringify({ slug }),
    });
  }

  async unpublishPortfolio(id: string): Promise<Portfolio> {
    return this.request<Portfolio>(`/portfolios/${id}/unpublish`, {
      method: "POST",
    });
  }

  // Chat endpoints
  async getChatHistory(portfolioId: string): Promise<ChatMessage[]> {
    return this.request<ChatMessage[]>(`/chat/${portfolioId}`);
  }

  async saveChatMessage(portfolioId: string, role: "user" | "assistant", content: string): Promise<ChatMessage> {
    return this.request<ChatMessage>(`/chat/${portfolioId}`, {
      method: "POST",
      body: JSON.stringify({ role, content }),
    });
  }

  // Public endpoints (no auth required)
  async getPublicPortfolio(username: string, slug: string): Promise<{ name: string; slug: string; puck_json: Record<string, unknown>; published_at: string | null; username: string }> {
    const response = await fetch(`${this.baseUrl}/portfolios/public/${username}/${slug}`);
    if (!response.ok) {
      throw new Error("Portfolio not found");
    }
    return response.json();
  }
}

export const api = new ApiClient(API_BASE_URL);
