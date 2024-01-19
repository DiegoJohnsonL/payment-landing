import useGetPartners from "@/hooks/cms-api/use-get-partners";
import {
  Box,
  Flex,
  SimpleGrid,
  Skeleton,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";

export default function PartnersSection() {
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
        <SimpleGrid
          minChildWidth={"200px"}
          spacing={"16px"}
          w={"100%"}
          maxW={"880px"}
        >
          {partners?.slice(0, 8).map((partner) => (
            <Box
              key={partner.name}
              cursor={partner.link ? "pointer" : "default"}
              onClick={() => {
                if (partner.link) {
                  window.open(partner.link, "_blank");
                }
              }}
              mx={"auto"}
            >
              <Image
                src={partner.image}
                alt={`${partner.name} logo`}
                width={200}
                height={60}
              />
            </Box>
          ))}
        </SimpleGrid>

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
