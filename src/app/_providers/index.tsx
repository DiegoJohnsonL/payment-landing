"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/styles/theme/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NavbarProvider } from "./navbar-selected";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <ChakraProvider
      theme={theme}
      toastOptions={{ defaultOptions: { position: "bottom" } }}
    >
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
          <NavbarProvider>{children}</NavbarProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
