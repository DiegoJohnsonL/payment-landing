import { useDashboardMenuItems } from "@/hooks/utils/use-menu-items";
import { usePathname, useSearchParams } from "next/navigation";
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
    setSelectedItemId: React.Dispatch<React.SetStateAction<string | undefined>>;
  }
);

export const NavbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedItemId, setSelectedItemId] = useState<string>();
  const pathname = usePathname();
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab");
  const dashboardMenuItems = useDashboardMenuItems();

  useEffect(() => {
    if (pathname.includes("dashboard")){
      setSelectedItemId(tab ?? dashboardMenuItems[0].id);
    } else {
      setSelectedItemId(undefined);
    }
  }, [dashboardMenuItems, pathname, setSelectedItemId, tab]);

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
