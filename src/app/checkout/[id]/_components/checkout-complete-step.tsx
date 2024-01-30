import { Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import FinishCheckoutImg from "@/assets/checkout/finish-checkout.png";
import Logo from "@/components/logo";
export default function CheckoutCompleteStep() {
  return (
    <>
      <VStack h={"100%"} justify={"center"} gap={"0"}>
        <Logo width={125} height={32} colorMode="light" />
        <Image
          src={FinishCheckoutImg.src}
          alt=""
          width={"170"}
          height={"128"}
          style={{
            paddingTop: "20px"
          }}
        />
        <Text fontSize={"32px"} fontWeight={"500"} pt={"32px"}>
          Thank you
        </Text>
        <Text fontSize={"18px"} fontWeight={"500"} opacity={"0.5"} pt={"12px"}>
          Your purchase was successful
        </Text>
      </VStack>
    </>
  );
}
