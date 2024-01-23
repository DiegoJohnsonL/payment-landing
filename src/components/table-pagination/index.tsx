import { Flex, HStack, Select, Text } from "@chakra-ui/react";
import { ChangeEvent } from "react";

type TablePaginationProps = {
  total: number;
  page: number;
  pageSize: number;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (pageSize: number) => void;
};

export default function TablePagination({
  total,
  page,
  pageSize,
  setPageSize,
}: TablePaginationProps) {
  return (
    <Flex w={"100%"} justify={"space-between"}>
      <HStack>
        <Text color={"#999"}>Showing</Text>
        <Text>?? results</Text>
      </HStack>
      <HStack>
        <Text>Page</Text>
        <Text>1</Text>
        <Text>of</Text>
        <Text>???</Text>
      </HStack>
      <HStack>
        <Text color={"#999"} whiteSpace={"nowrap"}>Items per page</Text>
        <Select
          size={"sm"}
          onChange={(e: any) => setPageSize(e.target.value)}
          maxW={"65px"}
          value={pageSize}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </Select>
      </HStack>
    </Flex>
  );
}
