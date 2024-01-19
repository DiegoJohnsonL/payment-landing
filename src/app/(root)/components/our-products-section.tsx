import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
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
      px={"100px"}
    >
      <VStack gap={"20px"}>
        <Heading fontSize={"6xl"} fontWeight={"500"}>
          Our Products
        </Heading>
        <Text fontSize={"20px"} maxW={"973px"}>
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
        pt={"72px"}
        px={"72px"}
        borderRadius={"12px"}
        bgGradient={
          "linear-gradient(90deg, rgba(145, 181, 253, 0.11) -0.08%, rgba(145, 183, 253, 0.53) 49.95%, #96BAFE 99.98%)"
        }
      >
        <Flex
          justify={"space-evenly"}
          py={"85px"}
          bg={"white"}
          borderRadius={"12px"}
        >
          <Image
            src={Ipad.src}
            alt="payment link iPad"
            width={517}
            height={373}
          />
          <Flex flexDirection={"column"} align={"flex-start"} gap={"24px"}>
            <Image src={PaymentLink.src} alt="my-gif" width={110} height={80} />
            <Stack gap={"16px"} align={"flex-start"}>
              <Text fontSize={"24px"} fontWeight={"500"}>
                Payment Link
              </Text>
              <Text maxW={"279px"}>
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
