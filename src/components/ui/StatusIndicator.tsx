
import React from "react";
import { cn } from "@/lib/utils";

type StatusType = "online" | "offline" | "warning" | "error" | "processing";

interface StatusIndicatorProps {
  status: StatusType;
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
  animate?: boolean;
}

export function StatusIndicator({
  status,
  size = "md",
  label,
  className,
  animate = true,
}: StatusIndicatorProps) {
  const statusClasses = {
    online: "bg-success",
    offline: "bg-muted-foreground",
    warning: "bg-warning",
    error: "bg-destructive",
    processing: "bg-info",
  };

  const sizeClasses = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4",
  };

  return (
    <div className={cn("flex items-center", className)}>
      <div className="relative flex items-center">
        <div className={cn("rounded-full", statusClasses[status], sizeClasses[size])}>
          {animate && (
            <div
              className={cn(
                "absolute inset-0 rounded-full animate-ping-slow",
                statusClasses[status],
                "opacity-75"
              )}
            />
          )}
        </div>
      </div>
      {label && <span className="ml-2 text-sm">{label}</span>}
    </div>
  );
}
