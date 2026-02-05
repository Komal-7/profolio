"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Navbar() {
  return (
    <nav className="w-full border-b bg-background sticky top-0 z-50 shadow-sm">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <div className="w-6 h-6">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-primary"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <span>Profolio</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/projects" className="hover:text-primary">
            Templates
          </Link>
          <Button asChild variant="outline">
            <Link href="/auth">Login</Link>
          </Button>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-6 pt-10">
              <Link href="/projects">Templates</Link>
              <Button asChild variant="outline">
                <Link href="/auth">Login</Link>
            </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
