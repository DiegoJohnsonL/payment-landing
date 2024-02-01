import { Search2Icon } from "@chakra-ui/icons";
import {
  HStack,
  VStack,
  Heading,
  InputGroup,
  InputLeftElement,
  Input,
  Text,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Stack,
  Icon,
  Center,
  Circle,
} from "@chakra-ui/react";
import Image from "next/image";
import TransactionHeadingImage from "@/assets/dashboard/transactions-heading.svg?url";
import { Transaction } from "@/types/transaction";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdCallReceived, MdCallMade } from "react-icons/md";
import { IoMdTime } from "react-icons/io";

export default function LastTransactionsContainer() {
  const transactions: Transaction[] = [
    //create a list of 3 transactions
    {
      id: "1",
      amount: 100.00,
      date: "2021-10-10",
      description: "Test transaction",
      paymentMethod: "Credit card",
      customerName: "John Doe",
      customerEmail: "test@gmail.com",
      code: "123456",
      createdAt: "2021-10-10",
      updatedAt: "2021-10-10",
      status: "completed",
      type: "purchase",
    },
    {
      id: "2",
      amount: 56.50,
      date: "2021-10-10",
      description: "Test transaction",
      paymentMethod: "Credit card",
      customerName: "John Doe",
      customerEmail: "test@gmail.com",
      code: "123456",
      createdAt: "2021-10-10",
      updatedAt: "2021-10-10",
      status: "processing",
      type: "deposit",
    },
  ];

  const renderStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Icon as={FaRegCircleCheck} boxSize={"20px"} color={"#6BC77C"} />
        );
      case "processing":
        return (
          <Icon as={IoMdTime} boxSize={"20px"} color={"#ED6625"} />
        );
      default:
        return <></>;
    }
  }

  const renderTypeIcon = (type: string) => {
    switch (type) {
      case "purchase":
        return (
          <Circle size={"24px"} bgColor={"#FFE8E5"}>
            <Icon
              as={MdCallMade}
              boxSize={"15px"}
              color={"#F15042"}
              borderRadius={"full"}
            />
          </Circle>
        );
      case "deposit":
      default:
        return (
          <Circle size={"24px"} bgColor={"#DAF1DF"}>
            <Icon
              as={MdCallReceived}
              boxSize={"15px"}
              color={"#6BC77C"}
              borderRadius={"full"}
            />
          </Circle>
        );
    }
  };

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
                <Td  fontSize={"14px"}>
                  <HStack gap={"18px"} textTransform={"capitalize"}>
                    {renderTypeIcon(transaction.type)}
                    <Stack gap={"4px"}>
                      <Text>{transaction.date}</Text>
                      <Text color={"#999"}>{transaction.type}</Text>
                    </Stack>
                  </HStack>
                </Td>
                <Td fontSize={"14px"}>
                  {transaction.customerName}
                </Td>
                <Td fontSize={"14px"}>
                  {transaction.paymentMethod}
                </Td>
                <Td fontSize={"14px"} color={"primary.500"}>
                  {transaction.code}
                </Td>
                <Td fontSize={"14px"}>
                  <HStack gap={"16px"}>
                    <Text>+ {transaction.amount}</Text>
                    {renderStatusIcon(transaction.status)}
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
