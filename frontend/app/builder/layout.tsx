"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function BuilderLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div style={{ height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </ProtectedRoute>
  );
}