"use client"

import useGetPartners from "@/hooks/cms-api/use-get-partners";
import useResponsive from "@/hooks/use-responsive";
import { Box, Flex, Spinner, Stack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Grid, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

export default function PartnersSection() {
  const { isMobile, isTablet } = useResponsive();
  const { data: partners, isLoading } = useGetPartners();
  return (
    <Flex
      align={"center"}
      flexDirection={"column"}
      py={"40px"}
      gap={"40px"}
      w={"100%"}
    >
      <Text fontSize={"14px"}>Powering the next generation B2B startups</Text>
      <VStack gap={"32px"} w={"100%"}>
        {isLoading && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            color="primary.100"
            size="lg"
          />
        )}
        <Swiper
          loopAddBlankSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          slidesPerView={isMobile ? 2 : isTablet ? 3 : 4}
          spaceBetween={"20px"}
          grid={{
            rows: isMobile ? 1 : 2,
            fill: "row",
          }}
          modules={[Grid, Pagination, Autoplay, Navigation]}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          {partners?.map((partner, index) => (
              <SwiperSlide
                key={partner.slug + "-" + index}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  cursor={partner.link ? "pointer" : "default"}
                  onClick={() => {
                    if (partner.link) {
                      window.open(partner.link, "_blank");
                    }
                  }}
                >
                  <Image
                    src={partner.image}
                    alt={`${partner.name} logo`}
                    width={200}
                    height={60}
                  />
                </Box>
              </SwiperSlide>
            ))}
        </Swiper>

        <Box
          w={"100%"}
          maxW={"1000px"}
          h={"1px"}
          background={
            "radial-gradient(70.71% 70.71% at 50% 50%, rgba(149, 149, 155, 0.40) 0%, rgba(230, 230, 230, 0.00) 100%)"
          }
          boxShadow={
            "0px 1px 5px -0.35px rgba(117, 140, 255, 0.15), 0px 0.121px 0.604px -0.175px rgba(117, 140, 255, 0.03)"
          }
        />
      </VStack>
    </Flex>
  );
}
