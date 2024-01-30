"use client";

import { Flex, Show, VStack } from "@chakra-ui/react";

import { ISidenavItem } from "@/types/sidenav-item";
import SidenavItem from "./_components/sidenav-item";
import { useDashboardMenuItems } from "@/hooks/utils/use-menu-items";
import { useNavbar } from "../_providers/navbar-selected";
import ProductContainer from "./_components/products-container";
import LastTransactionsContainer from "./_components/last-transactions-container";
import WithdrawalContainer from "./_components/withdrawal-container";
import SettingsContainer from "./_components/settings-container";

export default function Dashboard() {
  const dashboardMenuItems: ISidenavItem[] = useDashboardMenuItems();
  const { selectedItemId } = useNavbar();
  
  const renderSection = () => {
    switch (selectedItemId) {
      case "products":
        return <ProductContainer key={"dashboard-products-section"} />;
      case "last_transaction":
        return (
          <LastTransactionsContainer
            key={"dashboard-last-transaction-section"}
          />
        );
      case "withdrawal":
        return <WithdrawalContainer key={"dashboard-withdrawal-container"} />;
      case "settings":
        return <SettingsContainer key={"dashboard-settings-container"} />;
      default:
        return <></>;
    }
  };
  return (
    <Flex
      py={"40px"}
      w={"100%"}
      flexDirection={{ base: "column", md: "row" }}
      justify={"center"}
      align={{ base: "center", md: "flex-start" }}
      px={"20px"}
      gap={"24px"}
    >
      <Show above="md">
        <VStack maxW={"286px"} w={"100%"} shadow={"md"} gap={0} minW={"205px"}>
          {dashboardMenuItems.map((item) => (
            <SidenavItem
              key={item.id}
              item={item}
              selectedId={selectedItemId}
            />
          ))}
        </VStack>
      </Show>
      <VStack
        shadow={{ base: "none", md: "md" }}
        maxW={"912px"}
        w={"100%"}
        p={{ base: "0", sm: "20px", md: "40px" }}
        gap={"32px"}
        align={"flex-start"}
      >
        {renderSection()}
      </VStack>
    </Flex>
  );
}
