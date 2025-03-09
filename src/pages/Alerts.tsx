
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Bell, Filter, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Alert type definition
type AlertSeverity = "critical" | "warning" | "info";
type AlertStatus = "new" | "acknowledged" | "resolved";

interface Alert {
  id: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  timestamp: string;
  status: AlertStatus;
  source: string;
}

const Alerts = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [selectedSeverities, setSelectedSeverities] = useState<AlertSeverity[]>(["critical", "warning", "info"]);
  
  // Sample alerts data
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      title: "Potential SQL Injection Attack",
      message: "Multiple SQL injection attempts detected from IP 203.0.113.42",
      severity: "critical",
      timestamp: "2023-09-15T10:23:00Z",
      status: "new",
      source: "Web Application Firewall"
    },
    {
      id: "2",
      title: "Brute Force Attempt",
      message: "Failed login attempts threshold exceeded for admin account",
      severity: "critical",
      timestamp: "2023-09-15T09:45:00Z",
      status: "acknowledged",
      source: "Authentication Service"
    },
    {
      id: "3",
      title: "Unusual Network Traffic",
      message: "Unexpected outbound connections detected from host SRV-DB01",
      severity: "warning",
      timestamp: "2023-09-15T08:30:00Z",
      status: "new",
      source: "Network IDS"
    },
    {
      id: "4",
      title: "System Update Required",
      message: "Critical security patch available for the monitoring service",
      severity: "info",
      timestamp: "2023-09-14T22:10:00Z",
      status: "resolved",
      source: "System Management"
    },
    {
      id: "5",
      title: "Data Exfiltration Attempt",
      message: "Large data transfer to unauthorized external IP detected",
      severity: "critical",
      timestamp: "2023-09-14T20:55:00Z",
      status: "new",
      source: "Data Loss Prevention"
    }
  ]);

  // Handle acknowledge alert
  const acknowledgeAlert = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, status: "acknowledged" } : alert
    ));
    toast({
      title: "Alert acknowledged",
      description: "The alert has been marked as acknowledged"
    });
  };

  // Handle resolve alert
  const resolveAlert = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, status: "resolved" } : alert
    ));
    toast({
      title: "Alert resolved",
      description: "The alert has been marked as resolved"
    });
  };

  // Toggle severity filter
  const toggleSeverity = (severity: AlertSeverity) => {
    if (selectedSeverities.includes(severity)) {
      setSelectedSeverities(selectedSeverities.filter(s => s !== severity));
    } else {
      setSelectedSeverities([...selectedSeverities, severity]);
    }
  };

  // Filter alerts based on search term, tab, and selected severities
  const filteredAlerts = alerts.filter(alert => {
    // Search term filter
    const matchesSearch = 
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.source.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Tab filter
    const matchesTab = 
      selectedTab === "all" || 
      (selectedTab === "critical" && alert.severity === "critical") ||
      (selectedTab === "active" && alert.status !== "resolved");
    
    // Severity filter
    const matchesSeverity = selectedSeverities.includes(alert.severity);
    
    return matchesSearch && matchesTab && matchesSeverity;
  });

  // Get severity color class
  const getSeverityClass = (severity: AlertSeverity) => {
    switch (severity) {
      case "critical": return "text-destructive";
      case "warning": return "text-warning";
      case "info": return "text-info";
      default: return "";
    }
  };

  // Get status indicator type
  const getStatusIndicator = (status: AlertStatus) => {
    switch (status) {
      case "new": return "error";
      case "acknowledged": return "warning";
      case "resolved": return "online";
      default: return "offline";
    }
  };

  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Notifications & Alerts</h1>
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Severity</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem 
                  checked={selectedSeverities.includes("critical")}
                  onCheckedChange={() => toggleSeverity("critical")}
                >
                  Critical
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem 
                  checked={selectedSeverities.includes("warning")}
                  onCheckedChange={() => toggleSeverity("warning")}
                >
                  Warning
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem 
                  checked={selectedSeverities.includes("info")}
                  onCheckedChange={() => toggleSeverity("info")}
                >
                  Information
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Alert Center
            </CardTitle>
            <CardDescription>
              Monitor and respond to security alerts across your network
            </CardDescription>
          </CardHeader>
          
          <div className="px-6">
            <div className="flex space-x-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search alerts..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <Tabs defaultValue="all" className="mb-4" onValueChange={setSelectedTab}>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="all">All Alerts</TabsTrigger>
                <TabsTrigger value="critical">Critical</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <CardContent>
            {filteredAlerts.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No alerts match your filters</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAlerts.map((alert) => (
                  <div 
                    key={alert.id}
                    className="border rounded-lg p-4 bg-card transition-colors hover:bg-accent/10"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`font-medium ${getSeverityClass(alert.severity)}`}>
                          {alert.title}
                        </h3>
                        <p className="text-sm mt-1">{alert.message}</p>
                        <div className="flex items-center mt-2 text-xs text-muted-foreground">
                          <span>{alert.source}</span>
                          <span className="mx-2">•</span>
                          <span>{formatTime(alert.timestamp)}</span>
                          <span className="mx-2">•</span>
                          <StatusIndicator 
                            status={getStatusIndicator(alert.status) as any}
                            size="sm"
                            label={alert.status}
                          />
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {alert.status !== "acknowledged" && alert.status !== "resolved" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => acknowledgeAlert(alert.id)}
                          >
                            Acknowledge
                          </Button>
                        )}
                        {alert.status !== "resolved" && (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => resolveAlert(alert.id)}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Resolve
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between border-t">
            <div className="text-sm text-muted-foreground">
              Showing {filteredAlerts.length} of {alerts.length} alerts
            </div>
            <Button variant="outline" size="sm">
              View Alert History
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Alerts;
