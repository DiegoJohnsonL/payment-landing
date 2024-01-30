import { ISidenavItem } from "@/types/sidenav-item";
import { LuStore } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BiMoneyWithdraw } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";

export function useDashboardMenuItems(): ISidenavItem[] {
  return [
    { id: "products", icon: LuStore, label: "Products" },
    {
      id: "last_transaction",
      icon: IoDocumentTextOutline,
      label: "Last Transactions",
    },
    { id: "withdrawal", icon: BiMoneyWithdraw, label: "Withdrawal" },
    { id: "settings", icon: IoSettingsOutline, label: "Settings" },
    { id: "logout", icon: TbLogout2, label: "Log out" },
  ];
}
