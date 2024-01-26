import { VStack, Heading, Card, CardBody, HStack, Input, Divider, Text, Box, Stack } from "@chakra-ui/react";
import PaymentOptionsRadio from "./payment-options-radio";

export default function PaymentOptionsStep() {

    return (
      <VStack gap={"24px"} align={"flex-start"} w={"100%"}>
        <Heading fontSize={"20px"}>Payment Methods</Heading>
        <Stack gap={"24px"} maxW={"560px"} >
          <PaymentOptionsRadio />
        </Stack>
      </VStack>
    );
}
