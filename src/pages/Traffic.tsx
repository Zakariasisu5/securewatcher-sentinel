
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { NetworkTraffic } from "@/components/traffic/NetworkTraffic";

const Traffic = () => {
  return (
    <MainLayout>
      <NetworkTraffic />
    </MainLayout>
  );
};

export default Traffic;
