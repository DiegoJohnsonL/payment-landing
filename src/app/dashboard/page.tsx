"use client";

import useGetProducts from "@/hooks/api/use-get-products";
import {
  Button,
  Center,
  Flex,
  HStack,
  List,
  ListItem,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import DocumentIcon from "./assets/document-icon.svg"
import LogoutIcon from "./assets/logout-icon.svg"
import SettingsIcon from "./assets/settings-icon.svg"
import ShopIcon from "./assets/shop-icon.svg"
import SendMoneyIcon from "./assets/send-money-icon.svg"

export default function Dashboard() {
  
  const { data, hasNextPage, isFetching, fetchNextPage } = useGetProducts({
    page: 0,
    pageSize: 10,
  });
  const products = data ? data.pages.flatMap((page) => page.data) : [];
  const sideMenuItems = [
    { id: "products", icon: ShopIcon, label: "Products" },
    { id: "last_transaction", icon: DocumentIcon, label: "Last Transactions" },
    { id: "withdrawal", icon: SendMoneyIcon, label: "Withdrawal" },
    { id: "settings", icon: SettingsIcon, label: "Settings" },
    { id: "logout", icon: LogoutIcon, label: "Log out" },
  ];
  const [selectedItemId, setSelectedItemId] = useState(sideMenuItems[0].id);

  if (isFetching) {
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    );
  }

  return (
    <Flex py={"40px"} flexDirection={"row"} justify={"center"}>
      <VStack maxW={"286px"} w={"100%"} shadow={"md"}>
        <Text>asd</Text>
      </VStack>
      <VStack shadow={"md"} maxW={"912px"} w={"100%"}>
        <List>
          {products.map((product, index) => (
            <ListItem key={product.id + "-" + index}>{product.name}</ListItem>
          ))}
        </List>
        <Button
          onClick={() => {
            fetchNextPage();
          }}
        >
          next page
        </Button>
      </VStack>
    </Flex>
  );
}
