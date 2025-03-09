
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, ArrowLeft, MapPin, Clock, Server, User, Activity, AlarmClock, BarChart4 } from "lucide-react";
import { Link, useParams } from "react-router-dom";

interface ThreatDetailProps {
  threatData?: any;
}

export function ThreatDetail({ threatData }: ThreatDetailProps) {
  const { id } = useParams();
  
  // Mock data if not provided
  const defaultThreatData = {
    id: id || "threat-123",
    timestamp: new Date(),
    detected: new Date(Date.now() - 3600000), // 1 hour ago
    type: "SQL Injection",
    source: "103.45.67.89",
    destination: "192.168.1.25",
    port: 443,
    protocol: "HTTPS",
    severity: "critical" as const,
    status: "active" as const,
    user: "admin",
    service: "Web Application",
    payload: "SELECT * FROM users WHERE username = 'admin' OR 1=1;--",
    impact: "Potential data breach and unauthorized access to user database",
    recommendation: "Update web application firewall rules and patch SQL vulnerability",
    mitigationStatus: "In progress",
    ttps: ["T1190 - Exploit Public-Facing Application", "T1059 - Command and Scripting Interpreter"],
    timeline: [
      { time: new Date(Date.now() - 3600000), event: "Initial detection" },
      { time: new Date(Date.now() - 3540000), event: "Automated analysis initiated" },
      { time: new Date(Date.now() - 3480000), event: "Alert generated" },
      { time: new Date(Date.now() - 3420000), event: "SIEM notification sent" },
    ],
    relatedEvents: [
      { id: "event-234", time: new Date(Date.now() - 86400000), type: "Failed login attempt", source: "103.45.67.89" },
      { id: "event-235", time: new Date(Date.now() - 43200000), type: "Port scan", source: "103.45.67.89" },
    ]
  };

  const threat = threatData || defaultThreatData;
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-destructive text-destructive-foreground";
      case "high":
        return "bg-warning text-warning-foreground";
      case "medium":
        return "bg-info text-info-foreground";
      case "low":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };
  
  const getStatusColor = (status: string) => {
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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Link to="/threats">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold">Threat Details</h2>
            <p className="text-muted-foreground">Detailed analysis and response options</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            Export Report
          </Button>
          <Button variant="default" size="sm">
            Mitigate Threat
          </Button>
        </div>
      </div>
      
      <Card className="overflow-hidden">
        <CardHeader className="pb-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-full ${getSeverityColor(threat.severity)}`}>
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl">{threat.type}</CardTitle>
                <CardDescription>ID: {threat.id}</CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={getSeverityColor(threat.severity)}>
                {threat.severity} severity
              </Badge>
              <Badge variant="outline" className={getStatusColor(threat.status)}>
                {threat.status}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="mt-6">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="technical">Technical Details</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="related">Related Events</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-4">
                      <div className="flex items-start">
                        <dt className="w-32 flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2" /> Detected
                        </dt>
                        <dd>
                          {threat.detected.toLocaleDateString()}{" "}
                          {threat.detected.toLocaleTimeString()}
                        </dd>
                      </div>
                      <Separator />
                      <div className="flex items-start">
                        <dt className="w-32 flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-2" /> Source
                        </dt>
                        <dd className="font-mono">{threat.source}</dd>
                      </div>
                      <Separator />
                      <div className="flex items-start">
                        <dt className="w-32 flex items-center text-muted-foreground">
                          <Server className="h-4 w-4 mr-2" /> Destination
                        </dt>
                        <dd className="font-mono">{threat.destination}</dd>
                      </div>
                      <Separator />
                      <div className="flex items-start">
                        <dt className="w-32 flex items-center text-muted-foreground">
                          <User className="h-4 w-4 mr-2" /> User
                        </dt>
                        <dd>{threat.user}</dd>
                      </div>
                      <Separator />
                      <div className="flex items-start">
                        <dt className="w-32 flex items-center text-muted-foreground">
                          <Activity className="h-4 w-4 mr-2" /> Service
                        </dt>
                        <dd>{threat.service}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Impact & Mitigation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-1">Potential Impact</h4>
                        <p className="text-sm text-muted-foreground">{threat.impact}</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-medium mb-1">Recommendation</h4>
                        <p className="text-sm text-muted-foreground">{threat.recommendation}</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-medium mb-1">Mitigation Status</h4>
                        <Badge variant="outline">{threat.mitigationStatus}</Badge>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-medium mb-1">Response Actions</h4>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm">Block IP</Button>
                          <Button size="sm" variant="outline">Escalate</Button>
                          <Button size="sm" variant="outline">Ignore</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="technical" className="animate-fade-in">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Attack Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-4">
                      <div className="flex items-start">
                        <dt className="w-32 flex items-center text-muted-foreground">
                          Protocol
                        </dt>
                        <dd>{threat.protocol}</dd>
                      </div>
                      <Separator />
                      <div className="flex items-start">
                        <dt className="w-32 flex items-center text-muted-foreground">
                          Port
                        </dt>
                        <dd>{threat.port}</dd>
                      </div>
                      <Separator />
                      <div className="flex flex-col">
                        <dt className="flex items-center text-muted-foreground mb-2">
                          Payload Sample
                        </dt>
                        <dd>
                          <pre className="p-3 bg-muted rounded-md overflow-x-auto text-xs font-mono">
                            {threat.payload}
                          </pre>
                        </dd>
                      </div>
                      <Separator />
                      <div className="flex flex-col">
                        <dt className="flex items-center text-muted-foreground mb-2">
                          TTPs
                        </dt>
                        <dd>
                          <ul className="space-y-1">
                            {threat.ttps.map((ttp: string, i: number) => (
                              <li key={i} className="text-sm">
                                <Badge variant="outline" className="mr-2 font-mono">{ttp.split(" - ")[0]}</Badge>
                                {ttp.split(" - ")[1]}
                              </li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="timeline" className="animate-fade-in">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <AlarmClock className="h-4 w-4 mr-2" /> Event Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {threat.timeline.map((event: any, index: number) => (
                      <div key={index} className="mb-6 ml-6">
                        <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-primary"></div>
                        {index < threat.timeline.length - 1 && (
                          <div className="absolute -left-0 mt-3 h-full w-0.5 bg-border"></div>
                        )}
                        <div className="flex flex-col">
                          <time className="text-xs text-muted-foreground mb-1">
                            {event.time.toLocaleTimeString()}
                          </time>
                          <h3 className="text-sm font-medium">{event.event}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="related" className="animate-fade-in">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <BarChart4 className="h-4 w-4 mr-2" /> Related Security Events
                  </CardTitle>
                  <CardDescription>
                    Previous activity from the same source
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {threat.relatedEvents.map((event: any) => (
                      <div key={event.id} className="p-3 border rounded-md hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{event.type}</span>
                          <Badge variant="outline" className="font-mono text-xs">
                            {event.id}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Source: <span className="font-mono">{event.source}</span>
                          </span>
                          <time className="text-muted-foreground">
                            {event.time.toLocaleDateString()}
                          </time>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
