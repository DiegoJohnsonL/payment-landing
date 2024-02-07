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
  useToast,
} from "@chakra-ui/react";
import LoginLogo from "@/assets/login/login-logo.svg";
import Logo from "@/components/logo";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authenticate, requestCode } from "@/actions/auth";
import { authFormSchema } from "@/types/schemas/auth-schema";
import parsePhoneNumberFromString, {
  CountryCode,
  getCountries,
  getCountryCallingCode,
} from "libphonenumber-js";

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
  const [country, setCountry] = useState("PE");
  const router = useRouter();
  const countries = getCountries();
  const toast = useToast();
  const {
    handleSubmit,
    setValue,
    trigger,
    clearErrors,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormInputs>({
    resolver: zodResolver(authFormSchema),
  });

  const onSubmit = async (data: AuthFormInputs) => {
    const res = await authenticate(data);
    console.log("response", res);
    if (res.status === 201) {
      toast({
        title: res.message,
        status: "success",
        isClosable: true,
      });
      router.push("/dashboard");
    } else {
      res.message &&
        toast({
          title: res.message,
          status: "error",
          isClosable: true,
        });
    }
  };

  const handleRequestCode = async () => {
    return requestCode(watch("phone")).then((res) => {
      console.log("res", res);
      if (res.status === 200) {
        toast({
          title: res.message,
          status: "success",
          isClosable: true,
        });
        setCurrentStep(1);
      } else {
        res.message &&
          toast({
            title: res.message,
            status: "error",
            isClosable: true,
          });
      }
    });
  }

  const onNext = async () => {
    type FieldName = keyof AuthFormInputs;
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[]);
    if (!output) return;
    if (currentStep === 0) {
      handleRequestCode();
    } else {
      handleSubmit(onSubmit)();
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
                    isInvalid={false}
                    size={"lg"}
                    fontSize={"14px"}
                    value={country}
                    w={"30%"}
                    onChange={(e) => {
                      setCountry(e.target.value);
                    }}
                  >
                    {countries.map((country) => {
                      return (
                        <option key={country} value={country}>
                          {country + " +" + getCountryCallingCode(country)}{" "}
                        </option>
                      );
                    })}
                  </Select>
                  <Input
                    w={"70%"}
                    type="number"
                    onChange={(e) => {
                      const phoneNumber = parsePhoneNumberFromString(
                        e.target.value,
                        country as CountryCode
                      );
                      setValue("phone", phoneNumber?.number as string);
                    }}
                    size={"lg"}
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
            <VStack>
              <FormControl isInvalid={!!errors.twoFaCode}>
                <HStack pt={"24px"} gap={{ base: "12px", md: "16px" }}>
                  <PinInput
                    size={"lg"}
                    isInvalid={!!errors.twoFaCode}
                    onChange={(value: string) => {
                      clearErrors("twoFaCode");
                      setValue("twoFaCode", value);
                    }}
                  >
                    {[1, 2, 3, 4].map((index) => (
                      <PinInputField key={index} {...pinInputFieldStyles} />
                    ))}
                  </PinInput>
                </HStack>
                <FormErrorMessage>{`${errors.twoFaCode?.message}`}</FormErrorMessage>
              </FormControl>
            </VStack>

            <Text fontWeight={"300"} pt={"16px"} fontSize={"14px"}>
              Didn&rsquo;t get a code?{" "}
              <Text
                as="span"
                cursor={"pointer"}
                textColor={"primary.500"}
                fontWeight={"400"}
                onClick={() => {
                  handleRequestCode();
                }}
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
              <Logo width={120} colorMode="light" />
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
                type={"button"}
                mt={"32px"}
                fontSize={"14px"}
                onClick={onNext}
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
