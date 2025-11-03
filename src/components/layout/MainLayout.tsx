import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const isMobile = useIsMobile();

  // Start with undefined so we can reliably sync once we know isMobile
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  // ensure we only set initial state after mount (avoids SSR mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);

  // sync sidebar with isMobile once mounted
  useEffect(() => {
    if (!mounted) return;
    setSidebarOpen(!isMobile);
  }, [isMobile, mounted]);

  // computed container margin class (always a string)
  const containerMarginClass = !isMobile ? (sidebarOpen ? "ml-64" : "ml-20") : "";

  return (
    <div className="flex min-h-screen bg-background w-full">
      {/* Sidebar should appear above the backdrop on mobile.
          Ensure Sidebar has a z-index >= 50 (e.g. z-50). */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Backdrop (mobile only) */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          role="presentation"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setSidebarOpen(false);
          }}
        />
      )}

      <div
        className={cn(
          "flex flex-col flex-1 w-full transition-all duration-300 ease-in-out",
          containerMarginClass
        )}
      >
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
