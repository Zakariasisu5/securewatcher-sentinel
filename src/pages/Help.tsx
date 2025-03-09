
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const Help = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Help & Documentation</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>User Guide</CardTitle>
            <CardDescription>
              Learn how to use the system and get support
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] flex items-center justify-center">
            <div className="text-center">
              <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Documentation is being prepared</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Comprehensive user guides and FAQs will be available soon.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Help;
