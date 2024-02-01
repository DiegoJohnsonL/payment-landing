import {
  HStack,
  VStack,
  Heading,
  Text,
  Avatar,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import SettingsHeadingImage from "@/assets/dashboard/settings-heading.svg?url";
import Image from "next/image";

export default function SettingsContainer() {
  return (
    <>
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
      <HStack mt={"5px"} justify={"space-between"} w={"100%"}>
        <HStack spacing={"24px"}>
          <Avatar
            bg="#EFF3FF"
            boxSize={"80px"}
            src="https://bit.ly/ryan-florence"
          />
          <Heading fontSize={"24px"} fontWeight={"500"}>
            Ryan Florence
          </Heading>
        </HStack>
        <Button fontSize={"14px"} size={"lg"} px={"43px"}>
          Upload Image
        </Button>
      </HStack>
      <VStack w={"100%"} mt={"8px"} gap={"32px"}>
        <HStack w={"100%"} gap={"24px"}>
          <FormControl w={"100%"}>
            <FormLabel>
              <Text fontSize={"16px"}>First Name</Text>
            </FormLabel>
            <Input />
          </FormControl>
          <FormControl w={"100%"}>
            <FormLabel>
              <Text fontSize={"16px"}>Last Name</Text>
            </FormLabel>
            <Input />
          </FormControl>
        </HStack>

        <FormControl w={"100%"}>
          <FormLabel>
            <Text fontSize={"16px"}>Email Address</Text>
          </FormLabel>
          <HStack gap={"24px"}>
            <Input />
            <Button
              minW={{ base: "144px" }}
              variant={"outline"}
              colorScheme="black"
              size={"lg"}
            >
              <Text fontSize={"14px"}>Update Email</Text>
            </Button>
          </HStack>
        </FormControl>

        <FormControl w={"100%"}>
          <FormLabel>
            <Text fontSize={"16px"}>Phone Number</Text>
          </FormLabel>
          <HStack gap={"24px"}>
            <Input />
            <Button
              minW={{ base: "144px" }}
              variant={"outline"}
              colorScheme="black"
              size={"lg"}
            >
              <Text fontSize={"14px"} size={"lg"}>
                Update Phone
              </Text>
            </Button>
          </HStack>
        </FormControl>
      </VStack>
      <Stack gap={"16px"} mt={"16px"}>
        <Text fontWeight={"500"}>I want to delete my account</Text>
        <Text>Would you like to delete your account? This account contains 1388 posts. Deleting your account will remove all the content associated with it</Text>
      </Stack>
      <Button colorScheme="red" variant={"outline"} minH={"44px"} minW={{base: "208px"}}>
        Delete Account
      </Button>
    </>
  );
}
