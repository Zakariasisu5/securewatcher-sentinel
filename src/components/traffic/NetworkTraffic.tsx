
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { StatCard } from "@/components/ui/StatCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, Globe, ArrowDown, ArrowUp, Clock } from "lucide-react";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

interface NetworkTrafficProps {
  data?: any;
}

export function NetworkTraffic({ data }: NetworkTrafficProps) {
  const [trafficData, setTrafficData] = useState<any>(null);
  const [timeRange, setTimeRange] = useState<string>("hour");
  
  useEffect(() => {
    if (data) {
      setTrafficData(data);
      return;
    }
    
    // Mock data
    const timePoints = {
      hour: 12,
      day: 24,
      week: 7,
      month: 30,
    };
    
    const protocolData = [
      { name: 'HTTP', value: 42 },
      { name: 'HTTPS', value: 28 },
      { name: 'DNS', value: 15 },
      { name: 'SMB', value: 8 },
      { name: 'Other', value: 7 },
    ];
    
    const generateTrafficSeries = (points: number, base: number, variance: number) => {
      return Array.from({ length: points }, (_, i) => {
        const value = base + Math.random() * variance - variance / 2;
        return Math.max(0, Math.round(value));
      });
    };
    
    const generateTimeLabels = (timeRange: string, points: number) => {
      const now = new Date();
      const labels = [];
      
      if (timeRange === 'hour') {
        for (let i = points - 1; i >= 0; i--) {
          const time = new Date(now);
          time.setMinutes(now.getMinutes() - i * 5);
          labels.push(time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
        }
      } else if (timeRange === 'day') {
        for (let i = points - 1; i >= 0; i--) {
          const time = new Date(now);
          time.setHours(now.getHours() - i);
          labels.push(time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
        }
      } else if (timeRange === 'week') {
        for (let i = points - 1; i >= 0; i--) {
          const time = new Date(now);
          time.setDate(now.getDate() - i);
          labels.push(time.toLocaleDateString('en-US', { weekday: 'short' }));
        }
      } else {
        for (let i = points - 1; i >= 0; i--) {
          const time = new Date(now);
          time.setDate(now.getDate() - i);
          labels.push(time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        }
      }
      
      return labels;
    };
    
    const points = timePoints[timeRange as keyof typeof timePoints];
    const timeLabels = generateTimeLabels(timeRange, points);
    const incomingSeries = generateTrafficSeries(points, 120, 50);
    const outgoingSeries = generateTrafficSeries(points, 80, 40);
    
    const topTalkers = [
      { ip: '192.168.1.5', sent: 1256, received: 3489 },
      { ip: '192.168.1.10', sent: 986, received: 1245 },
      { ip: '192.168.1.15', sent: 876, received: 956 },
      { ip: '192.168.1.20', sent: 654, received: 789 },
      { ip: '192.168.1.25', sent: 543, received: 678 },
    ];
    
    // Generate combined traffic data
    const trafficChartData = timeLabels.map((time, i) => ({
      time,
      incoming: incomingSeries[i],
      outgoing: outgoingSeries[i],
      total: incomingSeries[i] + outgoingSeries[i],
    }));
    
    setTrafficData({
      protocolDistribution: protocolData,
      trafficSeries: trafficChartData,
      topTalkers,
      totalTraffic: trafficChartData.reduce((sum, point) => sum + point.total, 0),
      incomingTraffic: trafficChartData.reduce((sum, point) => sum + point.incoming, 0),
      outgoingTraffic: trafficChartData.reduce((sum, point) => sum + point.outgoing, 0),
      peakTraffic: Math.max(...trafficChartData.map(point => point.total)),
    });
  }, [data, timeRange]);
  
  if (!trafficData) return null;
  
  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-3 border border-border rounded-md shadow-md">
          <p className="text-sm font-medium mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value} Mbps`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Network Traffic Analysis</h2>
          <p className="text-muted-foreground">Real-time monitoring of network activity</p>
        </div>
        <div className="flex items-center space-x-2">
          <StatusIndicator status="online" label="Monitoring Active" size="sm" />
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hour">Last Hour</SelectItem>
              <SelectItem value="day">Last 24 Hours</SelectItem>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard 
          title="Total Traffic" 
          value={trafficData.totalTraffic} 
          valueSuffix=" Mbps"
          icon={Activity}
          variant="primary"
        />
        <StatCard 
          title="Incoming" 
          value={trafficData.incomingTraffic}
          valueSuffix=" Mbps"
          icon={ArrowDown}
          variant="info"
        />
        <StatCard 
          title="Outgoing" 
          value={trafficData.outgoingTraffic}
          valueSuffix=" Mbps"
          icon={ArrowUp}
          variant="success"
        />
        <StatCard 
          title="Peak Traffic" 
          value={trafficData.peakTraffic}
          valueSuffix=" Mbps"
          icon={Clock}
          variant="warning"
        />
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Traffic Overview</CardTitle>
          <CardDescription>Network utilization over time</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="combined">
            <TabsList className="mb-4">
              <TabsTrigger value="combined">Combined</TabsTrigger>
              <TabsTrigger value="separated">Incoming/Outgoing</TabsTrigger>
              <TabsTrigger value="protocols">Protocol Distribution</TabsTrigger>
            </TabsList>
            
            <TabsContent value="combined" className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={trafficData.trafficSeries}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="time" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip content={customTooltip} />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="var(--primary)"
                    fill="var(--primary)"
                    fillOpacity={0.2}
                    name="Total"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="separated" className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={trafficData.trafficSeries}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="time" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip content={customTooltip} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="incoming"
                    stroke="var(--info)"
                    strokeWidth={2}
                    dot={false}
                    name="Incoming"
                  />
                  <Line
                    type="monotone"
                    dataKey="outgoing"
                    stroke="var(--success)"
                    strokeWidth={2}
                    dot={false}
                    name="Outgoing"
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="protocols" className="h-[350px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={trafficData.protocolDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {trafficData.protocolDistribution.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend layout="vertical" verticalAlign="middle" align="right" />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={trafficData.protocolDistribution}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis dataKey="name" type="category" stroke="var(--muted-foreground)" fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="value" fill="var(--primary)" name="Traffic %">
                      {trafficData.protocolDistribution.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Globe className="h-4 w-4 mr-2" /> Top Communicating Hosts
          </CardTitle>
          <CardDescription>Hosts with highest network activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">IP Address</th>
                  <th className="text-right p-3 text-sm font-medium text-muted-foreground">Data Sent</th>
                  <th className="text-right p-3 text-sm font-medium text-muted-foreground">Data Received</th>
                  <th className="text-right p-3 text-sm font-medium text-muted-foreground">Total</th>
                </tr>
              </thead>
              <tbody>
                {trafficData.topTalkers.map((host: any, index: number) => (
                  <tr key={index} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-3 font-mono text-sm">{host.ip}</td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <ArrowUp className="h-3 w-3 text-success" />
                        <span>{host.sent.toLocaleString()} KB</span>
                      </div>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <ArrowDown className="h-3 w-3 text-info" />
                        <span>{host.received.toLocaleString()} KB</span>
                      </div>
                    </td>
                    <td className="p-3 text-right font-medium">
                      {(host.sent + host.received).toLocaleString()} KB
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
