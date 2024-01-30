import { useDashboardMenuItems } from "@/hooks/utils/use-menu-items";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from "react";

const NavbarContext = createContext(
  {} as {
    selectedItemId: string | undefined;
    setSelectedItemId: (id: string) => void;
  }
);

export const NavbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedItemId, setItemId] = useState<string>();
  const pathname = usePathname();
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab");
  const dashboardMenuItems = useDashboardMenuItems();
  const router = useRouter();

  useEffect(() => {
    if (pathname.includes("dashboard")){
      setItemId(tab ?? dashboardMenuItems[0].id);
    } else {
      setItemId(undefined);
    }
  }, [dashboardMenuItems, pathname, router, setItemId, tab]);

  const setSelectedItemId = (id: string) => {
    router.push("/dashboard?tab=" + id);
  }
  const value = {
    selectedItemId,
    setSelectedItemId,
  };
  return (
    <NavbarContext.Provider value={value}>{children}</NavbarContext.Provider>
  );
};

export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }
  return context;
};
