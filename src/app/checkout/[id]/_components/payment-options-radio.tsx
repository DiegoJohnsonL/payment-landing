"use client";

import { useTranslate } from "@/hooks/utils/use-translate";
import {
  Box,
  Flex,
  HStack,
  Icon,
  Spacer,
  Stack,
  Text,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";
import IzipayImage from "@/assets/checkout/izipay.png";
import MetamaskImage from "@/assets/checkout/metamask.png";
import CreditCardIcon from "@/assets/checkout/credit-card.svg";
import WalletIcon from "@/assets/checkout/wallet.svg";
import Image from "next/image";
import { ChevronRightIcon } from "@chakra-ui/icons";

export default function PaymentOptionsRadio() {
  const paymentOptions = [
    {
      id: 0,
      name: "Credit Card",
      description: "Pay with Izipay",
      image: IzipayImage.src,
      icon: CreditCardIcon,
    },
    {
      id: 1,
      name: "Coming Soon",
      description: "Pay with paypal, google pay, crypto and more",
      image: MetamaskImage.src,
      icon: WalletIcon,
      disabled: true,
    },
  ];

  const {
    getRadioProps,
    value: selectedAnswer,
    setValue,
  } = useRadioGroup({
    name: "paymentOptions",
    defaultValue: paymentOptions[0].id.toString(),
  });

  return (
    <>
      {paymentOptions.map((paymentOption, i: number) => {
        const radio = getRadioProps({ value: paymentOption.id.toString() });
        return (
          <CustomRadio
            key={paymentOption.name}
            radio={radio}
            isDisabled={paymentOption.disabled}
            paymentOption={paymentOption}
          />
        );
      })}
    </>
  );
}

function CustomRadio({ radio, paymentOption, isDisabled }: any) {
  const { __ } = useTranslate();
  const { getInputProps, getRadioProps } = useRadio({ ...radio, isDisabled });
  const input = getInputProps();
  const checkbox = getRadioProps();
  const { isChecked } = radio;

  return (
    <Box as="label" w={"100%"}>
      <input {...input} />
      <Flex
        {...checkbox}
        py={"24px"}
        px={"20px"}
        cursor="pointer"
        border={"1.5px solid #DDE3EE"}
        borderRadius="4px"
        boxShadow="md"
        _checked={{
          border: "1.5px solid",
          borderColor: "primary.500",
          bgColor: "#F2F6FC",
        }}
        _disabled={{
          opacity: 0.5,
        }}
      >
        <HStack gap={"16px"} w={"100%"}>
          {isChecked ? (
            <Flex
              minW={"26px"}
              h={"26px"}
              border={"1.5px solid"}
              borderColor={"primary.500"}
              borderRadius={"50%"}
              justifyContent="center"
              alignItems="center"
            >
              <Flex
                minW={"12px"}
                h={"12px"}
                bg={"primary.500"}
                borderRadius={"50%"}
              />
            </Flex>
          ) : (
            <Box
              minW={"26px"}
              h={"26px"}
              border={"1.5px solid #DDE3EE"}
              borderRadius={"50%"}
            />
          )}
          <HStack gap={"24px"}>
            <Icon as={paymentOption.icon} boxSize={"44px"} />
            <Stack spacing={"4px"}>
              <Text fontWeight={"500"}>{__(paymentOption.name)}</Text>
              <Text>{__(paymentOption.description)}</Text>
            </Stack>
          </HStack>
          <Spacer />
          <Image src={paymentOption.image} width={40} height={32} alt="" />
          <Icon as={ChevronRightIcon} boxSize={"24px"} />
        </HStack>
      </Flex>
    </Box>
  );
}
