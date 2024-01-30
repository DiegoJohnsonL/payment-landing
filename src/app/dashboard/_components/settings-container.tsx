import { HStack, VStack, Heading, Text } from "@chakra-ui/react";
import SettingsHeadingImage from "@/assets/dashboard/settings-heading.svg?url";
import Image from "next/image";

export default function SettingsContainer() {
  return (
    <HStack gap={"32px"} w="100%">
      <Image
        src={SettingsHeadingImage}
        alt="product bag image"
        width={64}
        height={64}
      />
      <VStack align={"flex-start"} spacing={"8px"}>
        <Heading fontSize={"32px"}>Personal Info</Heading>
        <Text>Update your profile and contact details</Text>
      </VStack>
    </HStack>
  );
}
