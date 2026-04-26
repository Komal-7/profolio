"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BuilderPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center bg-[#020617]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500" />
    </div>
  );
}