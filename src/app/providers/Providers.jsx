"use client";

import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export default function Providers({ children }) {
  return (
    <HeroUIProvider>
      <QueryClientProvider client={queryClient}>
        {children}

        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </QueryClientProvider>
    </HeroUIProvider>
  );
}