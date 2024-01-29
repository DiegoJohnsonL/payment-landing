"use client";

import {
  AbsoluteCenter,
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Logo from "../logo";
import { Link } from "@chakra-ui/next-js";
import { useContext } from "react";
import { AuthContext } from "@/app/_providers/auth-provider";
import { logout } from "@/actions/auth";

export default function Navbar() {
  const { userSession } = useContext(AuthContext);
  console.log("NAVBAR SESSION", userSession);
  return (
    <nav>
      <Flex
        justify={"center"}
        boxShadow={"0px 12px 30px 0px rgba(0, 30, 87, 0.03)"}
      >
        <Flex
          w={"100%"}
          justify={"space-between"}
          paddingX={{ base: "20px", md: "48px", lg: "108px" }}
          py={{ base: "24px", md: "32px" }}
          align={"center"}
        >
          <Logo height={36} width={120} colorMode="light" />
          {userSession ? (
            <Popover trigger={"hover"}>
              <PopoverTrigger>
                <HStack>
                  <Avatar bg="#EFF3FF" boxSize={"40px"} />
                  <Text ms={"4px"} color={"black"} fontSize={"14px"}>
                    Temp User
                  </Text>
                  <ChevronDownIcon boxSize={"24px"} color={"primary.900"} />
                </HStack>
              </PopoverTrigger>
              <PopoverContent>
                <Button
                  size={"sm"}
                  w={"50px"}
                  mx={"auto"}
                  onClick={() => logout()}
                >
                  logout
                </Button>
              </PopoverContent>
            </Popover>
          ) : (
            <Link href={"/login"}>
              <Button fontSize={"12px"}>Get Started</Button>
            </Link>
          )}
        </Flex>
      </Flex>
    </nav>
  );
}
