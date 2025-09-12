'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Enhancement system disabled for Next.js compatibility
// import { mountEnhancements } from "../enhance/init";
// import "../styles/enhance.css";

// Import navigation system
import { NavProvider } from "./nav/NavProvider";
import "../styles/nav/overlay.css";

const queryClient = new QueryClient();

interface AppWrapperProps {
  children: React.ReactNode;
}

export const AppWrapper = ({ children }: AppWrapperProps) => {
  // Enhancement system disabled for Next.js compatibility
  // React.useEffect(() => {
  //   mountEnhancements();
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <NavProvider>
          {children}
          {/* Enhancement anchor for status system */}
          <div data-status-anchor className="hidden" />
        </NavProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};
