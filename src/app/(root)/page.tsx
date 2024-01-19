'use client'

import { Box, Flex, VStack } from "@chakra-ui/react";
import HeroSection from "./components/hero-section";
import PartnersSection from "./components/partners-section";
import OurProductsSection from "./components/our-products-section";

export default function Home() {
  return (
    <VStack flexDirection={"column"} gap={"62px"}>
      <HeroSection />
      <PartnersSection />
      <OurProductsSection />
    </VStack>
  );
}
