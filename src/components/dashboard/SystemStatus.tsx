
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusIndicator } from "@/components/ui/StatusIndicator";

interface SystemComponent {
  name: string;
  status: "online" | "offline" | "warning" | "error" | "processing";
  lastChecked: Date;
  uptime?: string;
}

interface SystemStatusProps {
  components?: SystemComponent[];
}

export function SystemStatus({ components }: SystemStatusProps) {
  const defaultComponents: SystemComponent[] = [
    {
      name: "Network Scanner",
      status: "online",
      lastChecked: new Date(),
      uptime: "30d 4h 12m",
    },
    {
      name: "Traffic Analyzer",
      status: "online",
      lastChecked: new Date(),
      uptime: "15d 7h 22m",
    },
    {
      name: "Threat Intelligence",
      status: "online",
      lastChecked: new Date(),
      uptime: "30d 4h 11m",
    },
    {
      name: "Anomaly Detection",
      status: "warning",
      lastChecked: new Date(),
    },
    {
      name: "Log Management",
      status: "online",
      lastChecked: new Date(),
      uptime: "30d 4h 12m",
    },
  ];

  const systemComponents = components || defaultComponents;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-semibold">System Status</CardTitle>
            <CardDescription>Real-time component health</CardDescription>
          </div>
          <StatusIndicator 
            status={systemComponents.every(c => c.status === "online") ? "online" : "warning"} 
            label={systemComponents.every(c => c.status === "online") ? "All Systems Operational" : "Issues Detected"}
            size="sm"
          />
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-3">
          {systemComponents.map((component) => (
            <div 
              key={component.name}
              className="flex items-center justify-between px-3 py-2 rounded-md transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center gap-3">
                <StatusIndicator status={component.status} size="sm" />
                <span className="font-medium text-sm">{component.name}</span>
              </div>
              <div className="flex flex-col items-end">
                {component.uptime && (
                  <span className="text-xs text-muted-foreground">{component.uptime}</span>
                )}
                <span className="text-xs text-muted-foreground">
                  Last checked: {component.lastChecked.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
