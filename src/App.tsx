import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Import enhancement system
import { mountEnhancements } from "./enhance/init";
import "./styles/enhance.css";

// Import navigation system
import { NavProvider } from "./components/nav/NavProvider";
import "./styles/nav/overlay.css";

const queryClient = new QueryClient();

const App = () => {
  // Mount enhancements when app loads
  React.useEffect(() => {
    mountEnhancements();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <NavProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            {/* Enhancement anchor for status system */}
            <div data-status-anchor className="hidden" />
          </NavProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
