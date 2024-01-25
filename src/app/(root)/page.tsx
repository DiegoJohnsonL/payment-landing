'use client'

import { Box, Flex, VStack } from "@chakra-ui/react";
import HeroSection from "./_containers/hero-section";
import PartnersSection from "./_containers/partners-section";
import OurProductsSection from "./_containers/our-products-section";

export default function Home() {
  return (
    <VStack flexDirection={"column"} gap={"62px"}>
      <HeroSection />
      <PartnersSection />
      <OurProductsSection />
    </VStack>
  );
}
