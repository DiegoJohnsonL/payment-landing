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
  PinInput,
  PinInputField,
  Select,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import LoginLogo from "@/assets/login/login-logo.svg";
import Logo from "@/components/logo";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authenticate } from "@/actions/auth";
import { authFormSchema } from "@/types/schemas/auth-schema";

type AuthFormInputs = z.infer<typeof authFormSchema>;

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

const pinInputFieldStyles = {
  width: { base: "40px", md: "56px" },
  height: { base: "60px", md: "80px" },
  fontSize: "24px",
  color: "#0047BB",
  bgColor: "rgba(250, 252, 255, 0.80)",
  border: "1.5px solid #DDE3EE",
};

export default function Login() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormInputs>({
    resolver: zodResolver(authFormSchema),
  });

  const onSubmit = async (data: AuthFormInputs) => {
    const response = await authenticate(data);
    if (response?.token) {
      router.push("/dashboard");
    }
  };

  type FieldName = keyof AuthFormInputs;

  const onNext = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[]);
    if (!output) return;
    return setCurrentStep(1);
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
            <HStack pt={"24px"} gap={{ base: "12px", md: "16px" }}>
              <PinInput
                size={"lg"}
                onChange={(value: string) => {
                  setValue("twoFaCode", value);
                }}
              >
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <PinInputField key={index} {...pinInputFieldStyles} />
                ))}
              </PinInput>
            </HStack>
            <Text fontWeight={"300"} pt={"16px"} fontSize={"14px"}>
              Didn&rsquo;t get a code?{" "}
              <Text
                as="span"
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
      <Card maxW={"519px"} w={"100%"}>
        <CardBody px={{ base: "20px", sm: "40px" }} py={"32px"}>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                type={currentStep === 0 ? "button" : "submit"}
                mt={"32px"}
                fontSize={"14px"}
                onClick={() => currentStep === 0 && onNext()}
                w={"204px"}
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
