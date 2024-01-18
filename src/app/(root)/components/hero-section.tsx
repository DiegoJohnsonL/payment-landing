'use client'

import { Box, Button, Text, VStack } from "@chakra-ui/react";
import heroGif from "../assets/hero-section.gif"
import Image from "next/image";

export default function HeroSection() {

    return (
      <VStack
        w={"100%"}
        gap={"24px"}
        textAlign={"center"}
        pt={"96px"}
        pb={"50px"}
      >
        <Text fontSize={"80px"} fontWeight={"500"} maxW={"682px"}>
          Cryptoasset-based{" "}
          <Text as="span" color={"#999"}>
            Payment System
          </Text>
        </Text>
        <Text maxW={"468px"}>
          Facilitate payments and fund transfers via cryptocurrencies on any of
          your sales platforms.
        </Text>
        <Button variant={"outline"} mt={"8px"} fontSize={"14px"}>
          Get Started
        </Button>
        <Box>
          <Image src={heroGif.src} alt="my-gif" width={376} height={424} />
        </Box>
      </VStack>
    );
} 