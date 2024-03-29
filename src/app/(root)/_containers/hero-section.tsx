"use client";

import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import heroGif from "@/assets/root/hero-animation.gif";
import HeroBackground from "@/assets/root/hero-background.png";
import Image from "next/image";
import { Link } from "@chakra-ui/next-js";

export default function HeroSection() {
  return (
    <Box px={{ base: "0px", md: "20px" }} w={"100%"}>
      <Flex
        backgroundImage={`url(${HeroBackground.src})`}
        backgroundPosition={"bottom"}
        backgroundRepeat={"repeat-x"}
        borderBottomRadius={"30px"}
        position={"relative"}
        overflow={"hidden"}
      >
        <VStack
          gap={"24px"}
          textAlign={"center"}
          pt={{ base: "80px", md: "96px" }}
          w={"100%"}
          px={{ base: "20px", md: " 0px" }}
          zIndex={"10"}
        >
          <Heading
            size={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight={"500"}
            maxW={"686px"}
          >
            Cryptoasset-based <br />
            <span style={{ color: "#999" }}>Payment System</span>
          </Heading>
          <Text maxW={"468px"}>
            Facilitate payments and fund transfers via cryptocurrencies on any
            of your sales platforms.
          </Text>
          <Link href={"/login"}>
            <Button
              variant={"outline"}
              border={"2px solid"}
              p={"18px 30px"}
              mt={"8px"}
              fontSize={"14px"}
              boxShadow={
                "0px 10px 10px -3.75px rgba(0, 0, 0, 0.06), 0px 2.289px 2.289px -2.5px rgba(0, 0, 0, 0.16), 0px 0.602px 0.602px -1.25px rgba(0, 0, 0, 0.18), 0px -5px 4px -3.5px rgba(71, 136, 255, 0.30) inset, 0px -1.144px 0.915px -2.333px rgba(71, 136, 255, 0.61) inset, 0px -0.301px 0.241px -1.167px rgba(71, 136, 255, 0.68) inset"
              }
            >
              Get Started
            </Button>
          </Link>
          <Box>
            <Image src={heroGif.src} alt="my-gif" width={376} height={424} />
          </Box>
        </VStack>

        <Grid
          templateColumns="repeat(auto-fill, minmax(50px, 1fr))"
          templateRows="repeat(auto-fill, minmax(50px, 1fr))"
          gap={0}
          position="absolute"
          w={"100%"}
          h={"200vh"}
          pointerEvents="none"
        >
          {Array.from({ length: 2000 }, (_, index) => (
            <Box
              key={index}
              width="100%"
              opacity={0.12}
              height="100%"
              border="1px solid white"
              background="transparent"
            />
          ))}
        </Grid>
      </Flex>
    </Box>
  );
}
