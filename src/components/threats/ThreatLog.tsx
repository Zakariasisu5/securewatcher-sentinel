
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Filter, Download, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";

interface Threat {
  id: string;
  timestamp: Date;
  type: string;
  source: string;
  destination: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "active" | "blocked" | "resolved";
}

interface ThreatLogProps {
  threats?: Threat[];
}

export function ThreatLog({ threats: propThreats }: ThreatLogProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  
  // Generate mock threats if not provided
  const generateMockThreats = (): Threat[] => {
    const threatTypes = ["SQL Injection", "DDoS", "Port Scan", "Brute Force", "XSS Attack", "CSRF Attack", "Command Injection"];
    const severities: ("low" | "medium" | "high" | "critical")[] = ["low", "medium", "high", "critical"];
    const statuses: ("active" | "blocked" | "resolved")[] = ["active", "blocked", "resolved"];
    
    return Array.from({ length: 50 }, (_, i) => ({
      id: `threat-${i+1}`,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 86400000 * 7)), // Last 7 days
      type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
      source: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      destination: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      severity: severities[Math.floor(Math.random() * severities.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
    }));
  };
  
  const allThreats = propThreats || generateMockThreats();
  
  // Apply filters and search
  const filteredThreats = allThreats.filter(threat => {
    const matchesSearch = 
      searchQuery === "" || 
      threat.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      threat.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      threat.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      threat.id.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === "all" || threat.status === statusFilter;
    const matchesSeverity = severityFilter === "all" || threat.severity === severityFilter;
    
    return matchesSearch && matchesStatus && matchesSeverity;
  });
  
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
      <CardHeader className="px-6 py-4 border-b border-border flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Threat Log</CardTitle>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      
      {showFilters && (
        <div className="p-4 border-b border-border bg-muted/20 animate-slide-down">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by IP, threat type, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex items-center gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Source IP</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredThreats.map((threat) => (
                <TableRow key={threat.id} className="hover:bg-muted/30">
                  <TableCell className="font-mono text-xs">{threat.id}</TableCell>
                  <TableCell>
                    {threat.timestamp.toLocaleDateString()}<br />
                    <span className="text-xs text-muted-foreground">{threat.timestamp.toLocaleTimeString()}</span>
                  </TableCell>
                  <TableCell>{threat.type}</TableCell>
                  <TableCell className="font-mono text-xs">{threat.source}</TableCell>
                  <TableCell className="font-mono text-xs">{threat.destination}</TableCell>
                  <TableCell>
                    <Badge className={getSeverityColor(threat.severity)}>
                      {threat.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(threat.status)}>
                      {threat.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link to={`/threats/${threat.id}`}>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View details
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem>Block IP</DropdownMenuItem>
                        <DropdownMenuItem>Mark as resolved</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
