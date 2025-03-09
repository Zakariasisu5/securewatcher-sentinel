
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Threats from "./pages/Threats";
import ThreatDetails from "./pages/ThreatDetails";
import Traffic from "./pages/Traffic";
import Anomalies from "./pages/Anomalies";
import Reports from "./pages/Reports";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import AuthGuard from "./components/auth/AuthGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          
          <Route path="/" element={<AuthGuard><Index /></AuthGuard>} />
          <Route path="/threats" element={<AuthGuard><Threats /></AuthGuard>} />
          <Route path="/threats/:id" element={<AuthGuard><ThreatDetails /></AuthGuard>} />
          <Route path="/anomalies" element={<AuthGuard><Anomalies /></AuthGuard>} />
          <Route path="/traffic" element={<AuthGuard><Traffic /></AuthGuard>} />
          <Route path="/reports" element={<AuthGuard><Reports /></AuthGuard>} />
          <Route path="/alerts" element={<AuthGuard><Alerts /></AuthGuard>} />
          <Route path="/settings" element={<AuthGuard><Settings /></AuthGuard>} />
          <Route path="/help" element={<AuthGuard><Help /></AuthGuard>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
