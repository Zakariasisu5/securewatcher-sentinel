
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from "@/components/ui/StatCard";
import { Shield, AlertCircle, Globe, Clock } from "lucide-react";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

interface AttackSummaryProps {
  data?: {
    totalAttacks: number;
    blockedAttacks: number;
    criticalThreats: number;
    averageResponseTime: number;
    attackTrend: { date: string; attacks: number }[];
    attackTypes: { name: string; value: number }[];
    attackOrigins: { name: string; value: number }[];
  };
}

export function AttackSummary({ data }: AttackSummaryProps) {
  const [chartData, setChartData] = useState<typeof data | null>(null);
  
  useEffect(() => {
    if (data) {
      setChartData(data);
      return;
    }
    
    // Mock data
    const mockData = {
      totalAttacks: 1483,
      blockedAttacks: 1348,
      criticalThreats: 27,
      averageResponseTime: 1.8,
      attackTrend: [
        { date: 'Mon', attacks: 240 },
        { date: 'Tue', attacks: 300 },
        { date: 'Wed', attacks: 280 },
        { date: 'Thu', attacks: 200 },
        { date: 'Fri', attacks: 278 },
        { date: 'Sat', attacks: 189 },
        { date: 'Sun', attacks: 239 },
      ],
      attackTypes: [
        { name: 'SQL Injection', value: 178 },
        { name: 'DDoS', value: 124 },
        { name: 'Port Scan', value: 236 },
        { name: 'Brute Force', value: 198 },
        { name: 'XSS', value: 147 },
      ],
      attackOrigins: [
        { name: 'China', value: 325 },
        { name: 'Russia', value: 232 },
        { name: 'US', value: 151 },
        { name: 'Brazil', value: 86 },
        { name: 'Other', value: 189 },
      ],
    };
    
    setChartData(mockData);
  }, [data]);
  
  if (!chartData) return null;
  
  const percentageBlocked = Math.round((chartData.blockedAttacks / chartData.totalAttacks) * 100);
  
  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 border border-border rounded-md shadow-md">
          <p className="text-xs">{`${payload[0].name} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Attack Summary</CardTitle>
        <CardDescription>Overview of security incidents</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <StatCard 
            title="Total Attacks" 
            value={chartData.totalAttacks} 
            icon={Shield}
            variant="primary"
          />
          <StatCard 
            title="Blocked" 
            value={chartData.blockedAttacks} 
            valueSuffix={` (${percentageBlocked}%)`}
            icon={Shield}
            variant="success"
          />
          <StatCard 
            title="Critical Threats" 
            value={chartData.criticalThreats} 
            icon={AlertCircle}
            variant="destructive"
          />
          <StatCard 
            title="Avg. Response" 
            value={chartData.averageResponseTime} 
            valueSuffix=" sec"
            icon={Clock}
            variant="info"
          />
        </div>
        
        <Tabs defaultValue="trends">
          <TabsList className="mb-4">
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="types">Attack Types</TabsTrigger>
            <TabsTrigger value="origins">Origins</TabsTrigger>
          </TabsList>
          
          <TabsContent value="trends" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData.attackTrend}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip content={customTooltip} />
                <Line
                  type="monotone"
                  dataKey="attacks"
                  stroke="var(--info)"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "var(--info)" }}
                  activeDot={{ r: 6 }}
                  name="Attacks"
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="types" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData.attackTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.attackTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                <Tooltip content={customTooltip} />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="origins" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData.attackOrigins}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.attackOrigins.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                <Tooltip content={customTooltip} />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
