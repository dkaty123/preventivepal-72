
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Faq from "./pages/Faq";
import CalendarPage from "./pages/CalendarPage";
import Benefits from "./pages/Benefits";
import Recommended from "./pages/Recommended";
import HealthInsights from "./pages/HealthInsights";
import SymptomCheckerPage from "./pages/SymptomCheckerPage";
import LocationHealthAlertsPage from "./pages/LocationHealthAlertsPage";
import GeneticRiskPage from "./pages/GeneticRiskPage";
import HealthGoalsPage from "./pages/HealthGoalsPage";
import RemindersPage from "./pages/RemindersPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/benefits" element={<Benefits />} />
          <Route path="/recommended" element={<Recommended />} />
          <Route path="/health-insights" element={<HealthInsights />} />
          <Route path="/symptom-checker" element={<SymptomCheckerPage />} />
          <Route path="/location-alerts" element={<LocationHealthAlertsPage />} />
          <Route path="/genetic-risk" element={<GeneticRiskPage />} />
          <Route path="/health-goals" element={<HealthGoalsPage />} />
          <Route path="/reminders" element={<RemindersPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/faq" element={<Faq />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
