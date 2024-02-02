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
  VStack,
  useRadioGroup,
  useSteps,
} from "@chakra-ui/react";
import Image from "next/image";
import CheckoutGif from "@/assets/checkout/checkout-side.gif";
import PersonalInfoStep from "./_components/personal-info-step";
import PaymentOptionsStep from "./_components/payment-options-step";
import CheckoutCompleteStep from "./_components/checkout-complete-step";
import useGetProduct from "@/hooks/api/product/use-get-product";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { z } from "zod";
import getIzipayToken from "@/actions/checkout";
import { usePaymentOptions } from "@/hooks/utils/use-get-payment-options";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

const CheckoutFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  zip: z.string(),
  cardNumber: z.string(),
  cardHolder: z.string(),
  expirationDate: z.string(),
  cvv: z.string(),
});

type CheckoutFormInputs = z.infer<typeof CheckoutFormSchema>;

const steps = [{ index: 0 }, { index: 1 }, { index: 2 }];

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const paymentOptions = usePaymentOptions();
  const { getRadioProps, value } = useRadioGroup({
    name: "paymentOptions",
    defaultValue: paymentOptions[0].id.toString(),
    onChange: (value) => console.log(value),
  });
  const [isPayment, setIsPayment] = useState(false);

  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: steps.length,
  });

  const router = useRouter();
  const { data: product, isLoading } = useGetProduct(params.id);

  const onNext = async () => {
    if (activeStep === steps.length - 1) return router.push("/dashboard");
    if (activeStep === 1) {
      const res = await getIzipayToken(product!.price);
      if (res.response.token) {
        const token = res.response.token;
        console.log("token", token);
        const decoded = jwtDecode(token) as any;

        const iziConfig = {
          config: {
            transactionId: decoded.transactionId, //From API
            action: "pay",
            merchantCode: decoded.merchantCode, // FROM API
            order: {
              orderNumber: decoded.OrderNumber, // FROM API
              currency: "PEN", // FROM API
              amount: decoded.Amount, // FROM API
              processType: "AT",
              merchantBuyerId: "mc17621", // Either phone number, email or id. How should we handle when users are not logged in?
              dateTimeTransaction: currentTimeUnix,
            },
            //This billing information is necessary but we don't ask the user for it. Should we hardcode it with some peruvian street address?
            billing: {
              firstName: "Juan",
              lastName: "Wick Quispe",
              email: "jwickq@izi.com",
              phoneNumber: "958745896",
              street: "Av. Jorge Chávez 275",
              city: "Lima",
              state: "Lima",
              country: "PE",
              postalCode: "15038",
              documentType: "DNI",
              document: "21458796",
            },
            render: {
              typeForm: "embedded",
              container: "#your-iframe-payment",
              showButtonProcessForm: true,
            },
            // urlRedirect:
            //   "https://server.punto-web.com/comercio/creceivedemo.asp?p=h1",
          },
        };

        handleLoadForm(iziConfig.config, token);
      }
    } else {
      goToNext();
    }
  };

  const onBack = () => {
    goToPrevious();
  };

  const currentTimeUnix = Math.floor(Date.now()) * 1000;

  const callbackResponsePayment = (response: any) => {
    console.log(response);
    setIsPayment(false);
    goToNext();
  };

  const handleLoadForm = (iziconfig: any, token: string) => {
    try {
      setIsPayment(true);
      const checkout = new Izipay({ config: iziconfig });
      checkout &&
        checkout.LoadForm({
          authorization: token,
          keyRSA: "RSA",
          callbackResponse: callbackResponsePayment,
        });
    } catch (error: any) {
      console.log(error.message, error.Errors, error.date);
    }
  };

  function renderStep() {
    if (isLoading)
      return (
        <Center w={"100%"} h={"100%"}>
          <Spinner />
        </Center>
      );
    if (!product) return <></>;
    if (isPayment) return <></>;
    switch (activeStep) {
      case 0:
        return <PersonalInfoStep product={product} />;
      case 1:
        return (
          <PaymentOptionsStep
            product={product}
            paymentOptions={paymentOptions}
            getRadioProps={getRadioProps}
          />
        );
      case 2:
      default:
        return <CheckoutCompleteStep />;
    }
  }

  return (
    <>
      <Script src="https://sandbox-checkout.izipay.pe/payments/v1/js/index.js" />
      <Flex flex={1} gap={"40px"} flexDirection={{ base: "row" }}>
        {/* Left Side */}
        <Stack
          flex={1}
          align={"center"}
          pt={{ base: "32px", md: "64px" }}
          px={"20px"}
          pb={"44px"}
        >
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
            <VStack
              gap={"24px"}
              w={"100%"}
              h={"fit-content"}
              display={isPayment ? "flex" : "none"}
              className="payment-form"
            >
              <Box id="your-iframe-payment"></Box>
            </VStack>
            <Spacer />
            {!isPayment && (
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
            )}
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
    </>
  );
}
