import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";

export default function OurProductsSection() {

    return (
      <Flex flexDirection={"column"} align={"center"} py={"50px"} gap={"36px"}>
        <VStack gap={"20px"}>
          <Heading fontSize={"6xl"} fontWeight={"500"}>
            Our Products
          </Heading>
          <Text fontSize={"20px"} maxW={"973px"}>
            {
              "We facilitate payment and transfer options across widely used Blockchain Networks. (Ethereum, Polygon, BNB Chain, Arbitrum, Optimismm Algorand and soon Bitcoin and Bitcoin L2s)"
            }
          </Text>
          <Button
            rightIcon={<ArrowForwardIcon />}
            variant="ghost"
            fontWeight={"500"}
          >
            Get Started
          </Button>
        </VStack>
      </Flex>
    );
}