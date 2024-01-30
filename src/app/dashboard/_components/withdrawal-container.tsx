import { Search2Icon } from "@chakra-ui/icons";
import { HStack, VStack, Heading, InputGroup, InputLeftElement, Input, Button, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Text, Center } from "@chakra-ui/react";
import WithdrawalHeadingImage from "@/assets/dashboard/withdrawal-heading.svg?url";
import Image from "next/image";

export default function WithdrawalContainer() {
  return (
    <>
      <HStack gap={"32px"} w="100%">
        <Image
          src={WithdrawalHeadingImage}
          alt="product bag image"
          width={64}
          height={64}
        />
        <VStack align={"flex-start"} spacing={"8px"}>
          <Heading fontSize={"32px"}>Withdrawal</Heading>
          <Text>
            Shows the most recent information about the transactions made.
          </Text>
        </VStack>
      </HStack>

      <HStack w={"100%"} justify={"space-between"} gap={"24px"}>
        <InputGroup size={"lg"} maxW={"424px"}>
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="primary.900" boxSize={"16px"} />
          </InputLeftElement>
          <Input fontSize={"14px"} placeholder="Search" />
        </InputGroup>

        <Button fontSize={"14px"} size={"lg"} px={"43px"}>
          Withdraw
        </Button>
      </HStack>
      <TableContainer w={"100%"}>
        <Table variant="unstyled" overflowX={"auto"}>
          <Thead bgColor={"#F5F8FE"}>
            <Tr>
              <Th
                fontWeight={"400"}
                textTransform={"capitalize"}
                fontSize={"14px"}
                textColor={"#4D4D4D"}
              >
                Time
              </Th>
              <Th
                fontWeight={"400"}
                textTransform={"capitalize"}
                fontSize={"14px"}
                textColor={"#4D4D4D"}
              >
                Customer
              </Th>
              <Th
                fontWeight={"400"}
                textTransform={"capitalize"}
                fontSize={"14px"}
                textColor={"#4D4D4D"}
              >
                Method
              </Th>
              <Th
                fontWeight={"400"}
                textTransform={"capitalize"}
                fontSize={"14px"}
                textColor={"#4D4D4D"}
              >
                Code
              </Th>
              <Th
                fontWeight={"400"}
                textTransform={"capitalize"}
                fontSize={"14px"}
                textColor={"#4D4D4D"}
              >
                Amount
              </Th>
            </Tr>
          </Thead>
          <Tbody></Tbody>
        </Table>
      </TableContainer>
      <Center w={"100%"}>
        <Text fontSize={"14px"}>No withdraws yet</Text>
      </Center>
    </>
  );
}
