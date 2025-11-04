
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ThreatMonitor } from "@/components/dashboard/ThreatMonitor";
import { SystemStatus } from "@/components/dashboard/SystemStatus";
import { AttackSummary } from "@/components/dashboard/AttackSummary";
import { SecurityAssistant } from "@/components/ai/SecurityAssistant";

const Index = () => {
  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ThreatMonitor />
        </div>
        <div className="md:col-span-1">
          <SystemStatus />
        </div>
        <div className="md:col-span-3">
          <AttackSummary />
        </div>
      </div>
      <SecurityAssistant />
    </MainLayout>
  );
};

export default Index;
