"use client";

import {
  Box,
  Card,
  CardBody,
  Container,
  Divider,
  Flex,
  HStack,
  Heading,
  Input,
  Stack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  VStack,
  useSteps,
} from "@chakra-ui/react";
import Image from "next/image";
import CheckoutGif from "@/assets/checkout/checkout-side.gif"

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const steps = [1, 2, 3];

  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  return (
    <Flex justify={"center"} gap={"64px"} flexDirection={{ base: "row" }}>
      <Stack flex={1} align={"center"} justify={"center"} pt={"64px"}>
        <Stack gap={"40px"} maxW={"664px"} w={"100%"}>
          <VStack gap={"24px"} align={"flex-start"}>
            <Heading fontSize={"20px"}>Product Summary</Heading>
            <Card w={"100%"}>
              <CardBody>
                <VStack spacing={4}>
                  <HStack w={"100%"}>
                    <VStack flex={2} align={"flex-start"}>
                      <Text>Product</Text>
                      <Input defaultValue={`Product ${params.id}`} isReadOnly />
                    </VStack>
                    <VStack flex={1} align={"flex-start"}>
                      <Text>Quantity</Text>
                      <Input defaultValue={`1`} isReadOnly />
                    </VStack>
                  </HStack>
                  <Divider orientation="horizontal" />
                  <HStack w={"100%"} justify={"space-between"}>
                    <Text>Total</Text>
                    <Text>USD 10.00</Text>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          </VStack>
          <VStack gap={"24px"} align={"flex-start"}>
            <Heading fontSize={"20px"}>Contact Information</Heading>
            <Card w={"100%"}>
              <CardBody>
                <VStack spacing={4} >
                  <VStack flex={2} align={"flex-start"} w={"100%"}>
                    <Text>Full Name</Text>
                    <Input placeholder="Enter Full name" />
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </Stack>
      </Stack>
      <Stack
        flex={1}
        align={"center"}
        boxShadow={"0px 1.063px 12px 0px rgba(0, 0, 0, 0.05)"}
        borderRadius={"4px"}
        pt={"64px"}
      >
        <Stepper index={activeStep} maxW={"229px"}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>{step}</StepTitle>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
        <Heading fontSize={"24px"} lineHeight={"28px"}>Personal information</Heading>
        <Text>Please fill in the form on the left to complete the purchase successfully.</Text>
        <Image src={CheckoutGif.src}  alt="" height={296} width={296}/>
      </Stack>
    </Flex>
  );
}
