import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Hide,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import Ipad from "../assets/ipad.png";
import PaymentLink from "../assets/payment-link.gif";
import Link from "next/link";

export default function OurProductsSection() {
  return (
    <Flex
      flexDirection={"column"}
      align={"center"}
      py={"50px"}
      gap={"36px"}
      w={"100%"}
      px={{ lg: "20px", xl: "100px" }}
    >
      <VStack
        gap={"20px"}
        px={"20px"}
        align={{ base: "flex-start", md: "center" }}
      >
        <Heading
          size={{ base: "2xl", md: "3xl", lg: "4xl" }}
          fontWeight={"500"}
        >
          Our Products
        </Heading>
        <Text fontSize={{ base: "16px", md: "20px" }} maxW={"973px"}>
          {
            "We facilitate payment and transfer options across widely used Blockchain Networks. (Ethereum, Polygon, BNB Chain, Arbitrum, Optimismm Algorand and soon Bitcoin and Bitcoin L2s)"
          }
        </Text>
        <Link href={"/login"}>
          <Button
            rightIcon={<ArrowForwardIcon />}
            variant="ghost"
            fontWeight={"500"}
          >
            Get Started
          </Button>
        </Link>
      </VStack>
      <Box
        w={"100%"}
        pt={{ base: "24px", lg: "72px" }}
        paddingX={{ base: "24px", lg: "72px" }}
        borderRadius={{ base: "0px", md: "12px" }}
        bgGradient={
          "linear-gradient(90deg, rgba(145, 181, 253, 0.11) -0.08%, rgba(145, 183, 253, 0.53) 49.95%, #96BAFE 99.98%)"
        }
      >
        <Flex
          justify={"center"}
          align={"center"}
          py={{ base: "42px", md: "85px" }}
          gap={{ base: "24px", lg: "84px" }}
          bg={"white"}
          borderTopRadius={"12px"}
          px={"20px"}
          flexDirection={{ base: "column", md: "row" }}
        >
          <Flex order={{ base: "2", md: "1" }}>
            <Image
              src={Ipad.src}
              alt="payment link iPad"
              width={517}
              height={373}
            />
          </Flex>
          <Flex
            flexDirection={"column"}
            align={{ base: "center", md: "flex-start" }}
            gap={"24px"}
            order={{ base: "1", md: "2" }}
          >
            <Image src={PaymentLink.src} alt="my-gif" width={110} height={80} />
            <Stack gap={"16px"} align={{ base: "center", md: "flex-start" }}>
              <Text fontSize={"24px"} fontWeight={"500"}>
                Payment Link
              </Text>
              <Text maxW={{ base: "90%", md: "279px" }}>
                For enterprises selling via social platforms or without an
                existing online store, design personalized links for specific
                products and amounts. You have the flexibility to create one or
                multiple payment links based on your preferences.
              </Text>
              <Link href={"/login"}>
                <Button
                  ms={"-16px"}
                  rightIcon={<ArrowForwardIcon />}
                  variant="ghost"
                  fontWeight={"500"}
                >
                  Start Now
                </Button>
              </Link>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
