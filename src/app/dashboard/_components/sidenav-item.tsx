import { logout } from "@/actions/auth";
import { ISidenavItem } from "@/types/sidenav-item";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";

export default function SidenavItem({
  item,
  selectedId,
}: {
  item: ISidenavItem;
  selectedId?: string;
}) {
const isSelected = item.id === selectedId;
  return (
    <Flex
      py={"24px"}
      w={"100%"}
      px={"26px"}
      borderBottom={"1px solid #F2F5F8"}
      position={"relative"}
    >
      <Box
        hidden={!isSelected}
        position={"absolute"}
        left={0}
        top="50%"
        transform="translateY(-50%)"
        w={"4px"}
        height={"65%"}
        borderRightRadius={"4px"}
        bgColor={"primary.500"}
      />
      <Flex
        gap={"12px"}
        align={"center"}
        cursor={"pointer"}
        onClick={() => {
          if (item.id == "logout") {
            logout();
          }
        }}
      >
        <Icon
          boxSize={"20px"}
          as={item.icon}
          color={isSelected ? "primary.500" : "black"}
        />
        <Text fontWeight={"500px"} color={isSelected ? "primary.500" : "auto"}>
          {item.label}
        </Text>
      </Flex>
    </Flex>
  );
}