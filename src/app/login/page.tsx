"use client";

import {
  Button,
  Card,
  CardBody,
  HStack,
  Heading,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import LoginLogo from "@/assets/login/login-logo.svg";
import Link from "next/link";
import Logo from "@/components/logo";

export default function Login() {
  return (
    <VStack pt={{ base: "80px", md: "96px" }} gap={"48px"} px={"20px"}>
      <Card maxW={"519px"}>
        <CardBody px={{ base: "20px", sm: "40px" }} py={"32px"}>
          <VStack w={"100%"} gap="0" textAlign={"center"}>
            <Logo width={120} height={32} colorMode="light" />
            <Heading
              fontSize={{ base: "32px" }}
              lineHeight={"40px"}
              pt={"32px"}
            >
              Welcome Back!
            </Heading>
            <Text pt={"12px"} fontSize={"14px"} lineHeight={"16px"}>
              To login enter your cell phone number
            </Text>
            <Text pt={"16px"} fontSize={"14px"} lineHeight={"16px"}>
              The verification code will be sent to the users&rsquo; entered
              phone number
            </Text>
            <HStack gap={"16px"} py={"32px"} w={"100%"}>
              <Select
                size={"lg"}
                defaultValue={"PE"}
                fontSize={"14px"}
                w={"40%"}
              >
                <option value="PE">PE +51</option>
              </Select>
              <Input w={"60%"} placeholder="923 456 078" px={"24px"} />
            </HStack>
            <Link href={"/dashboard"}>
              <Button size={"lg"} fontSize={"14px"} px={"87px"}>
                Next
              </Button>
            </Link>
          </VStack>
        </CardBody>
      </Card>
      <LoginLogo />
    </VStack>
  );
}
