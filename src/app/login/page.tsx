"use client";

import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormErrorMessage,
  HStack,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  PinInput,
  PinInputField,
  Select,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import LoginLogo from "@/assets/login/login-logo.svg";
import Logo from "@/components/logo";
import { FieldName, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from 'next/navigation';

const requestAuthFormSchema = z.object({
  phone: z.string().min(1, { message: "Phone number is required" }),
  twoFaCode: z.string().min(1, { message: "Verification code is required" }),
});

type TRequestAuthSchema = z.infer<typeof requestAuthFormSchema>;
const steps = [
  {
    id: "Step 1",
    title: "Welcome Back!",
    fields: ["phone"],
  },
  {
    id: "Step 2",
    title: "Verification Code",
    fields: ["twoFaCode"],
  },
];

export default function Login() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<TRequestAuthSchema>({
    resolver: zodResolver(requestAuthFormSchema),
  });

  const onNext = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName<TRequestAuthSchema>[], {
      shouldFocus: true,
    });

    if (!output) return;

    switch (currentStep) {
      case 0:
        return setCurrentStep(1);
      case 1:
        return router.push("/dashboard");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <Text pt={"12px"} fontSize={"14px"} lineHeight={"16px"}>
              To login enter your cell phone number
            </Text>
            <Text pt={"16px"} fontSize={"14px"} lineHeight={"16px"}>
              The verification code will be sent to the users&rsquo; entered
              phone number
            </Text>
            <FormControl isInvalid={!!errors.phone}>
              <Stack pt={"32px"} w={"100%"}>
                <HStack gap={"16px"}>
                  <Select
                    size={"lg"}
                    defaultValue={"PE"}
                    fontSize={"14px"}
                    w={"30%"}
                  >
                    <option value="PE">PE +51</option>
                  </Select>
                  <Input
                    {...register("phone")}
                    w={"70%"}
                    size={"lg"}
                    placeholder={"987 654 321"}
                    id="phone"
                  />
                </HStack>
                <FormErrorMessage>{`${errors.phone?.message}`}</FormErrorMessage>
              </Stack>
            </FormControl>
          </>
        );
      case 1:
        return (
          <>
            <Text pt={"12px"} fontSize={"14px"} lineHeight={"16px"}>
              We will send you an SMS with a verification code.
            </Text>
            <HStack pt={"24px"} gap={"16px"}>
              <PinInput  size={"lg"} onChange={(value: string) => {
                setValue("twoFaCode", value);
              }} >
                <PinInputField w={"56px"} h={"80px"} fontSize={"24px"} color={"#0047BB"} bgColor={"rgba(250, 252, 255, 0.80)"} border={"1.5px solid #DDE3EE"}/>
                <PinInputField w={"56px"} h={"80px"} fontSize={"24px"} color={"#0047BB"} bgColor={"rgba(250, 252, 255, 0.80)"} border={"1.5px solid #DDE3EE"}/>
                <PinInputField w={"56px"} h={"80px"} fontSize={"24px"} color={"#0047BB"} bgColor={"rgba(250, 252, 255, 0.80)"} border={"1.5px solid #DDE3EE"}/>
                <PinInputField w={"56px"} h={"80px"} fontSize={"24px"} color={"#0047BB"} bgColor={"rgba(250, 252, 255, 0.80)"} border={"1.5px solid #DDE3EE"}/>
                <PinInputField w={"56px"} h={"80px"} fontSize={"24px"} color={"#0047BB"} bgColor={"rgba(250, 252, 255, 0.80)"} border={"1.5px solid #DDE3EE"}/>
                <PinInputField w={"56px"} h={"80px"} fontSize={"24px"} color={"#0047BB"} bgColor={"rgba(250, 252, 255, 0.80)"} border={"1.5px solid #DDE3EE"}/>
              </PinInput>
            </HStack>
            <Text fontWeight={"300"} pt={"16px"}>
              Didn&rsquo;t get a code?{" "}
              <Text
                as="span"
                fontSize={"14px"}
                cursor={"pointer"}
                textColor={"primary.500"}
                fontWeight={"400"}
              >
                Click to Resend.
              </Text>
            </Text>
          </>
        );
    }
  };

  return (
    <VStack pt={{ base: "80px", md: "96px" }} gap={"48px"} px={"20px"}>
      <Card maxW={"519px"}>
        <CardBody px={{ base: "20px", sm: "40px" }} py={"32px"}>
          <form>
            <VStack w={"100%"} gap="0" textAlign={"center"}>
              <Logo width={120} height={32} colorMode="light" />
              <Heading
                fontSize={{ base: "32px" }}
                lineHeight={"40px"}
                pt={"32px"}
              >
                {steps[currentStep].title}
              </Heading>
              {renderStep()}
              <Button
                size={"lg"}
                mt={"32px"}
                fontSize={"14px"}
                px={"87px"}
                onClick={onNext}
              >
                {currentStep === 0 ? "Next" : "Verify"}
              </Button>
            </VStack>
          </form>
        </CardBody>
      </Card>
      <LoginLogo />
    </VStack>
  );
}
