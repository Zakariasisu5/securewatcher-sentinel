
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import { Link } from "react-router-dom";

interface Threat {
  id: string;
  type: string;
  source: string;
  timestamp: Date;
  severity: "low" | "medium" | "high" | "critical";
  status: "active" | "blocked" | "resolved";
}

export function ThreatMonitor() {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(true);
  
  useEffect(() => {
    // Simulate real-time threat data
    const threatTypes = ["SQL Injection", "DDoS", "Port Scan", "Brute Force", "XSS Attack"];
    const severities: ("low" | "medium" | "high" | "critical")[] = ["low", "medium", "high", "critical"];
    const statuses: ("active" | "blocked" | "resolved")[] = ["active", "blocked", "resolved"];
    
    // Initial threats
    const initialThreats: Threat[] = Array.from({ length: 5 }, (_, i) => ({
      id: `threat-${i}`,
      type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
      source: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 3600000)),
      severity: severities[Math.floor(Math.random() * severities.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
    }));
    
    setThreats(initialThreats);
    
    // Simulate new threats coming in
    const interval = setInterval(() => {
      if (!isMonitoring) return;
      
      const shouldAddThreat = Math.random() > 0.7;
      
      if (shouldAddThreat) {
        const newThreat: Threat = {
          id: `threat-${Date.now()}`,
          type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
          source: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          timestamp: new Date(),
          severity: severities[Math.floor(Math.random() * severities.length)],
          status: "active",
        };
        
        setThreats(prevThreats => [newThreat, ...prevThreats.slice(0, 19)]);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isMonitoring]);
  
  const getSeverityColor = (severity: Threat["severity"]) => {
    switch (severity) {
      case "critical":
        return "bg-destructive text-destructive-foreground hover:bg-destructive/90";
      case "high":
        return "bg-warning text-warning-foreground hover:bg-warning/90";
      case "medium":
        return "bg-info text-info-foreground hover:bg-info/90";
      case "low":
        return "bg-muted text-muted-foreground hover:bg-muted/90";
      default:
        return "bg-muted text-muted-foreground hover:bg-muted/90";
    }
  };
  
  const getStatusColor = (status: Threat["status"]) => {
    switch (status) {
      case "active":
        return "border-destructive text-destructive";
      case "blocked":
        return "border-success text-success";
      case "resolved":
        return "border-muted-foreground text-muted-foreground";
      default:
        return "border-muted-foreground text-muted-foreground";
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="px-4 py-3 flex flex-row items-center justify-between space-y-0">
        <div className="flex flex-col space-y-0.5">
          <CardTitle className="text-lg font-semibold">Threat Monitor</CardTitle>
          <CardDescription>Real-time attack detection</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <StatusIndicator
            status={isMonitoring ? "online" : "offline"}
            label={isMonitoring ? "Monitoring" : "Paused"}
            size="sm"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMonitoring(!isMonitoring)}
          >
            {isMonitoring ? "Pause" : "Resume"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="space-y-0 divide-y divide-border">
            {threats.map((threat) => (
              <div
                key={threat.id}
                className="p-3 hover:bg-muted/30 transition-colors animate-slide-up"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${getSeverityColor(threat.severity).split(' ')[0]}`}>
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">{threat.type}</div>
                      <div className="text-sm text-muted-foreground">
                        Source: <span className="font-mono">{threat.source}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {new Date(threat.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge variant="outline" className={getStatusColor(threat.status)}>
                      {threat.status}
                    </Badge>
                    <Badge variant="secondary" className={getSeverityColor(threat.severity)}>
                      {threat.severity}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-3 border-t border-border">
          <Link to="/threats">
            <Button variant="ghost" size="sm" className="w-full flex items-center justify-center">
              View all threats <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
