
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AnimatedCounter } from "./AnimatedCounter";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  footer?: React.ReactNode;
  className?: string;
  valuePrefix?: string;
  valueSuffix?: string;
  variant?: "default" | "primary" | "info" | "warning" | "success" | "destructive";
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  footer,
  className,
  valuePrefix = "",
  valueSuffix = "",
  variant = "default",
}: StatCardProps) {
  const variantClassNames = {
    default: "",
    primary: "border-primary/20 shadow-md shadow-primary/5",
    info: "border-info/20 shadow-md shadow-info/5",
    warning: "border-warning/20 shadow-md shadow-warning/5",
    success: "border-success/20 shadow-md shadow-success/5",
    destructive: "border-destructive/20 shadow-md shadow-destructive/5",
  };

  const iconVariantClassNames = {
    default: "bg-muted text-foreground",
    primary: "bg-primary/10 text-primary",
    info: "bg-info/10 text-info",
    warning: "bg-warning/10 text-warning",
    success: "bg-success/10 text-success",
    destructive: "bg-destructive/10 text-destructive",
  };
  
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", variantClassNames[variant], className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-md font-medium">{title}</CardTitle>
            {description && (
              <CardDescription className="text-xs mt-1 line-clamp-1">{description}</CardDescription>
            )}
          </div>
          {Icon && (
            <div className={cn("p-2 rounded-full", iconVariantClassNames[variant])}>
              <Icon className="h-4 w-4" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-end">
            <span className="text-2xl font-semibold mr-1">
              {valuePrefix}<AnimatedCounter value={value} />{valueSuffix}
            </span>
            {trend && (
              <div
                className={cn(
                  "text-xs font-medium flex items-center px-1.5 py-0.5 rounded-md",
                  trend.isPositive ? "text-success bg-success/10" : "text-destructive bg-destructive/10"
                )}
              >
                {trend.isPositive ? "+" : "-"}
                {trend.value}%
              </div>
            )}
          </div>
          {footer && <div className="text-xs text-muted-foreground">{footer}</div>}
        </div>
      </CardContent>
    </Card>
  );
}
