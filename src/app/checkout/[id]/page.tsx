"use client";

import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Show,
  Spacer,
  Spinner,
  Stack,
  Step,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  Stepper,
  Text,
  useSteps,
} from "@chakra-ui/react";
import Image from "next/image";
import CheckoutGif from "@/assets/checkout/checkout-side.gif";
import PersonalInfoStep from "./_components/personal-info-step";
import PaymentOptionsStep from "./_components/payment-options-step";
import CheckoutCompleteStep from "./_components/checkout-complete-step";
import useGetProduct from "@/hooks/api/product/use-get-product";
import { useRouter } from "next/navigation";

const steps = [{ index: 0 }, { index: 1 }, { index: 2 }];

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: steps.length,
  });
  const router = useRouter();
  const { data: product, isLoading } = useGetProduct(params.id);
  const onNext = () => {
    if (activeStep === steps.length - 1) return router.push("/dashboard");
    goToNext();
  };
  const onBack = () => {
    goToPrevious();
  };
  function renderStep() {
    if (isLoading)
      return (
        <Center w={"100%"} h={"100%"}>
          <Spinner />
        </Center>
      );
    if (!product) return null;
    switch (activeStep) {
      case 0:
        return <PersonalInfoStep product={product} />;
      case 1:
        return <PaymentOptionsStep />;
      case 2:
      default:
        return <CheckoutCompleteStep />;
    }
  }

  return (
    <Flex flex={1} gap={"40px"} flexDirection={{ base: "row" }}>
      {/* Left Side */}
      <Stack flex={1} align={"center"} pt={{base: "32px", md: "64px"}} px={"20px"} pb={"44px"}>
        <Stack
          gap={"40px"}
          maxW={"664px"}
          w={"100%"}
          align={"center"}
          justify={"flex-start"}
          flex={1}
        >
          <Show below="md">
            <Box w={"100%"} maxW={"229px"}>
              <Stepper index={activeStep} size={"lg"}>
                {steps.map((step, index) => (
                  <Step key={index}>
                    <StepIndicator>
                      <StepStatus
                        complete={<StepNumber />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>
                    <StepSeparator />
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Show>
          {renderStep()}
          <Spacer />
          <Flex gap={"24px"} w={"100%"}>
            {activeStep > 0 && (
              <Button
                h={"48px"}
                w={"100%"}
                justifySelf={"flex-end"}
                display={"flex"}
                variant={"outline"}
                onClick={onBack}
              >
                Back
              </Button>
            )}
            <Button
              h={"48px"}
              w={"100%"}
              justifySelf={"flex-end"}
              display={"flex"}
              onClick={onNext}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Flex>
        </Stack>
      </Stack>

      {/* right side */}
      <Show above="md">
        <Stack
          flex={1}
          align={"center"}
          boxShadow={"0px 1.063px 12px 0px rgba(0, 0, 0, 0.05)"}
          borderRadius={"4px"}
          gap={"40px"}
          w={"100%"}
          pt={"64px"}
        >
          <Box w={"100%"} maxW={"229px"}>
            <Stepper index={activeStep} size={"lg"}>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepNumber />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>
                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
          </Box>
          <Flex
            flexDirection={"column"}
            gap={"16px"}
            align={"center"}
            textAlign={"center"}
          >
            <Heading fontSize={"24px"} lineHeight={"28px"} pt={"100px"}>
              Personal information
            </Heading>
            <Text maxW={"322px"}>
              Please fill in the form on the left to complete the purchase
              successfully
            </Text>
          </Flex>
          <Image src={CheckoutGif.src} alt="" height={296} width={296} />
        </Stack>
      </Show>
    </Flex>
  );
}
