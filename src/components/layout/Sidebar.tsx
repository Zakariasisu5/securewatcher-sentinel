import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Shield, 
  Activity, 
  Settings, 
  Menu, 
  ChevronLeft,
  AlertCircle,
  Bell,
  FileText,
  HelpCircle,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  active?: boolean;
  expanded?: boolean;
}

const SidebarItem = ({ icon: Icon, label, to, active, expanded }: SidebarItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center group px-3 py-2 my-1 rounded-md text-sm font-medium transition-all",
        expanded ? "justify-start" : "justify-center",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
      )}
    >
      <Icon className={cn("h-5 w-5", expanded ? "mr-3" : "mx-auto")} />
      {expanded && <span className="animate-fade-in">{label}</span>}
      {!expanded && (
        <div className="absolute left-full ml-6 px-2 py-1 rounded-md bg-popover text-popover-foreground 
          shadow-md text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity scale-95 
          group-hover:scale-100 z-50 pointer-events-none transform origin-left duration-200">
          {label}
        </div>
      )}
    </Link>
  );
};

export function Sidebar({ open, setOpen }: SidebarProps) {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div 
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar transition-all duration-300 ease-in-out border-r border-border/50",
        // Mobile: slide in/out, Desktop: expand/collapse
        isMobile 
          ? open ? "translate-x-0 w-64" : "-translate-x-full w-64"
          : open ? "w-64" : "w-20"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-border/50">
        {open ? (
          <h2 className="text-xl font-semibold text-sidebar-foreground animate-fade-in">SecureWatch</h2>
        ) : (
          <div className="w-full flex justify-center">
            <span className="text-xl font-bold text-sidebar-foreground">SW</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setOpen(!open)}
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          {isMobile ? <X className="h-5 w-5" /> : open ? <ChevronLeft className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      
      <ScrollArea className="flex-1 py-4 px-3">
        <nav className="space-y-6">
          <div>
            {open && <h3 className="px-3 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider animate-fade-in">Main</h3>}
            <div className="mt-2">
              <SidebarItem
                icon={LayoutDashboard}
                label="Dashboard"
                to="/"
                active={isActive("/")}
                expanded={open}
              />
              <SidebarItem
                icon={Shield}
                label="Threats"
                to="/threats"
                active={isActive("/threats")}
                expanded={open}
              />
              <SidebarItem
                icon={AlertCircle}
                label="Anomalies"
                to="/anomalies"
                active={isActive("/anomalies")}
                expanded={open}
              />
              <SidebarItem
                icon={Activity}
                label="Network"
                to="/traffic"
                active={isActive("/traffic")}
                expanded={open}
              />
            </div>
          </div>
          
          <div>
            {open && <h3 className="px-3 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider animate-fade-in">System</h3>}
            <div className="mt-2">
              <SidebarItem
                icon={FileText}
                label="Reports"
                to="/reports"
                active={isActive("/reports")}
                expanded={open}
              />
              <SidebarItem
                icon={Bell}
                label="Alerts"
                to="/alerts"
                active={isActive("/alerts")}
                expanded={open}
              />
              <SidebarItem
                icon={Settings}
                label="Settings"
                to="/settings"
                active={isActive("/settings")}
                expanded={open}
              />
              <SidebarItem
                icon={HelpCircle}
                label="Help"
                to="/help"
                active={isActive("/help")}
                expanded={open}
              />
            </div>
          </div>
        </nav>
      </ScrollArea>
      
      <div className="p-4 border-t border-border/50">
        {open ? (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-medium">AD</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-sidebar-foreground">Admin</span>
              <span className="text-xs text-sidebar-foreground/70">Security Analyst</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-medium">AD</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
