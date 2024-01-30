import { Search2Icon } from "@chakra-ui/icons";
import { HStack, VStack, Heading, InputGroup, InputLeftElement, Input, Button, Text } from "@chakra-ui/react";
import Image from "next/image";
import ProductBagImage from "@/assets/dashboard/products-bag.svg?url";

export default function LastTransactionsContainer(){
    return (
      <>
        <HStack gap={"32px"} w="100%">
          <Image
            src={ProductBagImage}
            alt="product bag image"
            width={64}
            height={64}
          />
          <VStack align={"flex-start"} spacing={"8px"}>
            <Heading fontSize={"32px"}>Last transactions</Heading>
            <Text>Shows the most recent information about the transactions made.</Text>
          </VStack>
        </HStack>

        <HStack w={"100%"} justify={"space-between"} gap={"24px"}>
          <InputGroup size={"lg"} maxW={"424px"}>
            <InputLeftElement pointerEvents="none">
              <Search2Icon color="primary.900" boxSize={"16px"} />
            </InputLeftElement>
            <Input fontSize={"14px"} placeholder="Search" />
          </InputGroup>

          <Button
            fontSize={"14px"}
            size={"lg"}
            px={"43px"}
          >
            Add transaction
          </Button>
        </HStack>
      </>
    );
  
}