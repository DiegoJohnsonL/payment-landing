"use client";

import { Box, Button, Flex, IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Logo from "../logo";
import { Link } from "@chakra-ui/next-js";

export default function Navbar() {
  return (
    <nav>
      <Flex
        justify={"center"}
        boxShadow={"0px 12px 30px 0px rgba(0, 30, 87, 0.03)"}
      >
        <Flex
          w={"100%"}
          justify={"space-between"}
          paddingX={{ base: "20px", lg: "48px", xl: "108px" }}
          py={{ base: "24px", md: "32px" }}
          align={"center"}
        >
          <Logo height={36} width={120} colorMode="light" />
          <Link href={"/login"}>
            <Button
              fontSize={"12px"}
              display={{ base: " none", md: "inline-flex" }}
            >
              Get Started
            </Button>
          </Link>
          <IconButton
            aria-label="Open Menu"
            colorScheme="gray"
            icon={<HamburgerIcon />}
            display={{ md: "none" }}
          />
        </Flex>
      </Flex>
    </nav>
  );
}
