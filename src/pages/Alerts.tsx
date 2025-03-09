
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";

const Alerts = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Notifications & Alerts</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Alert Configuration</CardTitle>
            <CardDescription>
              Manage your notification preferences and alert settings
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] flex items-center justify-center">
            <div className="text-center">
              <Bell className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No active alerts</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Configure your alert preferences to receive notifications about security events.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Alerts;
