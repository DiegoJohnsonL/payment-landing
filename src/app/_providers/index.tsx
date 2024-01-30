"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/styles/theme/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import AuthProvider from "./auth-provider";
import { NavbarProvider } from "./navbar-selected";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <AuthProvider>
            <NavbarProvider>{children}</NavbarProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
}
