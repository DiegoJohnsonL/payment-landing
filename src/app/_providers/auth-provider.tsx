import { getUserSession } from "@/actions/auth";
import { IUserSession } from "@/types/user-session";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import React, { createContext, useEffect } from "react";

export const AuthContext = createContext(
  {} as {
    userSession: IUserSession | undefined | null;
  }
);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: userSession, refetch } = useQuery({
    queryKey: ["userSession"],
    queryFn: async () => getUserSession(),
    staleTime: 1,
  });

  useEffect(() => {
    refetch();
  }, [pathname, refetch]);

  return (
    <AuthContext.Provider
      value={{
        userSession: userSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
