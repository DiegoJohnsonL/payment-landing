import { Search2Icon } from "@chakra-ui/icons";
import {
  HStack,
  VStack,
  Heading,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Text,
  Circle,
  Flex,
  IconButton,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Image from "next/image";
import TransactionHeadingImage from "@/assets/dashboard/transactions-heading.svg?url";
import { Transaction } from "@/types/transaction";

export default function LastTransactionsContainer() {
  const transactions: Transaction[] = [
    //create a list of 3 transactions
    {
      id: "1",
      amount: 100,
      date: "2021-10-10",
      description: "Test transaction",
      paymentMethod: "Credit card",
      customerName: "John Doe",
      customerEmail: "test@gmail.com",
      code: "123456",
      createdAt: "2021-10-10",
      updatedAt: "2021-10-10",
      status: "completed",
    },
    {
      id: "2",
      amount: 200,
      date: "2021-10-10",
      description: "Test transaction",
      paymentMethod: "Credit card",
      customerName: "John Doe",
      customerEmail: "test@gmail.com",
      code: "123456",
      createdAt: "2021-10-10",
      updatedAt: "2021-10-10",
      status: "processing",
    },
  ];

  return (
    <>
      <HStack gap={"32px"} w="100%">
        <Image
          src={TransactionHeadingImage}
          alt="product bag image"
          width={64}
          height={64}
        />
        <VStack align={"flex-start"} spacing={"8px"}>
          <Heading fontSize={"32px"}>Last transactions</Heading>
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
          <Tbody>
            {transactions.map((transaction, index) => (
              <Tr key={transaction.id + "-" + index}>
                <Td color={"#4D4D4D"} fontSize={"12px"}>
                  {transaction.date}
                </Td>
                <Td color={"#4D4D4D"} fontSize={"12px"}>
                  {transaction.customerName}
                </Td>
                <Td color={"#4D4D4D"} fontSize={"12px"}>
                  {transaction.paymentMethod}
                </Td>
                <Td fontSize={"12px"}>{transaction.code}</Td>
                <Td ps={"10px"} fontSize={"12px"}>
                  {transaction.amount}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
