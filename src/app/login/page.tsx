import {
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import LoginLogo from "./assets/login-logo.svg";
import Link from "next/link";

export default function Login() {
  return (
    <VStack pt={"96px"}>
      <Card>
        <CardBody px={"40px"} py={"32px"}>
          <VStack w={"100%"}>
            <Text>Welcome Back!</Text>
            <Text>To login enter your cell phone number</Text>
            <Text>
              The verification code will be sent to the users&rsquo; entered
              phone number
            </Text>
            <HStack gap={"16px"}>
              <Select size={"lg"} defaultValue={"PE"} fontSize={"14px"}>
                <option value="PE">+51 PE</option>
              </Select>
              <Input
                placeholder="923 456 078"
                size={"lg"}
                fontSize={"14px"}
                px={"24px"}
              />
            </HStack>
            <Link href="/dashboard">
              <Button>Next</Button>
            </Link>
          </VStack>
        </CardBody>
      </Card>
      <LoginLogo />
    </VStack>
  );
}
