"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Navbar } from "@/components/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#f8f9fb]">
        <Navbar />
        {children}
      </div>
    </ProtectedRoute>
  );
}
