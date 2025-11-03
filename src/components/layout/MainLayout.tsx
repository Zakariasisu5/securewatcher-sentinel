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
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => !isMobile);

  // keep sidebar state in sync with screen size
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  return (
    <div className="flex min-h-screen bg-background w-full">
      {/* Sidebar (higher z-index than backdrop so it sits above on mobile) */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Backdrop for mobile (only rendered when sidebar is open) */}
      {isMobile && sidebarOpen && (
        <div
          aria-hidden={!sidebarOpen}
          role="button"
          tabIndex={0}
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
              setSidebarOpen(false);
            }
          }}
        />
      )}

      <div
        className={cn(
          "flex flex-col flex-1 w-full transition-all duration-300 ease-in-out",
          !isMobile ? (sidebarOpen ? "ml-64" : "ml-20") : ""
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
