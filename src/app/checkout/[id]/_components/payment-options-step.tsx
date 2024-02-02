import { VStack, Heading, Stack, Button } from "@chakra-ui/react";
import IProduct from "@/types/product";
import { PaymentOption } from "@/hooks/utils/use-get-payment-options";
import PaymentOptionRadio from "./payment-option-radio";

export default function PaymentOptionsStep({
  product,
  paymentOptions,
  getRadioProps,
}: {
  product: IProduct;
  paymentOptions: PaymentOption[];
  getRadioProps: any;
}) {



  return (
    <VStack gap={"24px"} align={"flex-start"} w={"100%"}>
      <Heading fontSize={"20px"}>Payment Methods</Heading>
      <Stack gap={"24px"} maxW={"560px"}>
        <>
          {paymentOptions.map((paymentOption, i: number) => {
            const radio = getRadioProps({ value: paymentOption.id.toString() });
            return (
              <PaymentOptionRadio
                key={paymentOption.name}
                radio={radio}
                isDisabled={paymentOption.disabled}
                paymentOption={paymentOption}
              />
            );
          })}
        </>
      </Stack>
    </VStack>
  );
}


