
import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className={cn(
        "flex flex-col flex-1 w-full transition-all duration-300 ease-in-out",
        sidebarOpen ? "md:ml-64" : "md:ml-20"
      )}>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
