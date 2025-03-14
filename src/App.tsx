import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Calendar from "./pages/Calendar";
import Statistics from "./pages/Statistics";
import Championship from "./pages/Championship";
import Telemetry from "./pages/Telemetry";
import Predictions from "./pages/Predictions";
import Forecast from "./pages/Forecast";
import Constructors from "./pages/Constructors";
import Historia from "./pages/Historia";
import ConstrutoresHistoria from "./pages/historia/Construtores";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/stats" element={<Statistics />} />
          <Route path="/championship" element={<Championship />} />
          <Route path="/telemetry" element={<Telemetry />} />
          <Route path="/predictions" element={<Predictions />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/constructors" element={<Constructors />} />
          <Route path="/historia" element={<Historia />} />
          <Route path="/historia/construtores" element={<ConstrutoresHistoria />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
