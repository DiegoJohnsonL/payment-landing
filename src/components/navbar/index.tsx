'use client'

import { Box, Button, Flex, HStack, Heading, IconButton, useColorMode } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Logo from "../logo";

export default function Navbar() {
  return (
    <nav>
      <Box boxShadow={"0px 12px 30px 0px rgba(0, 30, 87, 0.03)"}>
        <Flex
          w={"100%"}
          justify={"space-between"}
          p={"32px 108px"}
          align={"center"}
        >
          <Logo height={40} width={156} colorMode="light" />
          <Button
            fontSize={"12px"}
            display={{ base: " none", md: "inline-flex" }}
          >
            Get Started
          </Button>
          <IconButton
            aria-label="Open Menu"
            icon={<HamburgerIcon />}
            display={{ md: "none" }}
          />
        </Flex>
      </Box>
    </nav>
  );
} 