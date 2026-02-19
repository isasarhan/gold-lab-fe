"use client";
import React, { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./ThemeProvider";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Toaster />
      {children}
    </ThemeProvider>
  );
};

export default Providers;
