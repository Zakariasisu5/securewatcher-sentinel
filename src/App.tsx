
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/providers/AuthProvider";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

import Index from "@/pages/Index";
import Threats from "@/pages/Threats";
import ThreatDetails from "@/pages/ThreatDetails";
import Traffic from "@/pages/Traffic";
import Anomalies from "@/pages/Anomalies";
import Reports from "@/pages/Reports";
import Alerts from "@/pages/Alerts";
import Settings from "@/pages/Settings";
import Help from "@/pages/Help";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/auth" element={<Auth />} />
          
          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
          <Route path="/threats" element={<ProtectedRoute><Threats /></ProtectedRoute>} />
          <Route path="/threats/:id" element={<ProtectedRoute><ThreatDetails /></ProtectedRoute>} />
          <Route path="/traffic" element={<ProtectedRoute><Traffic /></ProtectedRoute>} />
          <Route path="/anomalies" element={<ProtectedRoute><Anomalies /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="/alerts" element={<ProtectedRoute><Alerts /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/help" element={<ProtectedRoute><Help /></ProtectedRoute>} />
          
          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
