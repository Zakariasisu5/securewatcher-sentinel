
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const Anomalies = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Anomalies Detection</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Anomaly Overview</CardTitle>
            <CardDescription>
              Machine learning-based threat insights and detection
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] flex items-center justify-center">
            <div className="text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Anomaly detection is being configured</h3>
              <p className="text-sm text-muted-foreground mt-2">
                The machine learning models are currently training. Check back soon.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Anomalies;
