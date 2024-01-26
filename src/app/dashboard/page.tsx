"use client";

import useGetProducts from "@/hooks/api/product/use-get-products";
import {
  Button,
  Center,
  Circle,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
  useClipboard,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ISidenavItem } from "@/types/sidenav-item";
import SidenavItem from "./_components/sidenav-item";
import { LuStore } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BiMoneyWithdraw } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { FaPen, FaRegTrashAlt } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import ProductBagImage from "@/assets/dashboard/products-bag.svg?url";
import Image from "next/image";
import CreateUpdateProductDrawer from "./_components/create-update-product";
import IProduct, { ProductStatus } from "@/types/product";
import TablePagination from "@/components/table-pagination";
import { CopyIcon, Search2Icon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";
import DeleteProductModal from "./_components/delete-product";
import { usePathname } from "next/navigation";
import { domainsConfig } from "@/config";

export default function Dashboard() {
  const { onCopy, setValue, hasCopied } = useClipboard("");
  const createProductDisclosure = useDisclosure();
  const deleteProductDisclosure = useDisclosure();
  const [pageSize, setPageSize] = useState(20);
  const { data, hasNextPage, isFetching, fetchNextPage, fetchPreviousPage } =
    useGetProducts({
      page: 0,
      pageSize: pageSize,
    });
  const products = data ? data.pages.flatMap((page) => page.data) : [];
  const [selectedProduct, setSelectedProduct] = useState<IProduct>();
  const sideMenuItems: ISidenavItem[] = [
    { id: "products", icon: LuStore, label: "Products" },
    {
      id: "last_transaction",
      icon: IoDocumentTextOutline,
      label: "Last Transactions",
    },
    { id: "withdrawal", icon: BiMoneyWithdraw, label: "Withdrawal" },
    { id: "settings", icon: IoSettingsOutline, label: "Settings" },
    { id: "logout", icon: TbLogout2, label: "Log out" },
  ];

  const [selectedItemId, setSelectedItemId] = useState(sideMenuItems[0].id);
  const toast = useToast();
  return (
    <Flex
      py={"40px"}
      w={"100%"}
      flexDirection={{ base: "column", md: "row" }}
      justify={"center"}
      align={{ base: "center", md: "flex-start" }}
      px={"20px"}
      gap={"24px"}
    >
      <CreateUpdateProductDrawer
        isOpen={createProductDisclosure.isOpen}
        onClose={() => {
          setSelectedProduct(undefined);
          createProductDisclosure.onClose();
        }}
        product={selectedProduct}
      />
      <DeleteProductModal
        isOpen={deleteProductDisclosure.isOpen}
        onClose={() => {
          setSelectedProduct(undefined);
          deleteProductDisclosure.onClose();
        }}
        product={selectedProduct}
      />
      <VStack maxW={"286px"} w={"100%"} shadow={"md"} gap={0}>
        {sideMenuItems.map((item) => (
          <SidenavItem key={item.id} item={item} selectedId={selectedItemId} />
        ))}
      </VStack>
      <VStack
        shadow={"md"}
        maxW={"912px"}
        w={"100%"}
        p={"40px"}
        gap={"32px"}
        align={"flex-start"}
      >
        <HStack gap={"32px"} w="100%">
          <Image
            src={ProductBagImage}
            alt="product bag image"
            width={64}
            height={64}
          />
          <VStack align={"flex-start"} spacing={"8px"}>
            <Heading fontSize={"32px"}>Your products</Heading>
            <Text>Visualize your products more easily</Text>
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
            onClick={createProductDisclosure.onOpen}
          >
            Add product
          </Button>
        </HStack>
        <TablePagination
          total={100}
          page={2}
          pageSize={pageSize}
          nextPage={() => fetchNextPage()}
          previousPage={() => fetchPreviousPage()}
          setPageSize={setPageSize}
        />
        {isFetching ? (
          <Center w={"100%"} h={"50vh"}>
            <Spinner />
          </Center>
        ) : (
          <TableContainer w={"100%"}>
            <Table variant="unstyled">
              <Thead bgColor={"#F5F8FE"}>
                <Tr>
                  <Th
                    fontWeight={"400"}
                    textTransform={"capitalize"}
                    fontSize={"14px"}
                    textColor={"#4D4D4D"}
                  >
                    Product
                  </Th>
                  <Th
                    fontWeight={"400"}
                    textTransform={"capitalize"}
                    fontSize={"14px"}
                    textColor={"#4D4D4D"}
                  >
                    Price
                  </Th>
                  <Th
                    fontWeight={"400"}
                    textTransform={"capitalize"}
                    fontSize={"14px"}
                    textColor={"#4D4D4D"}
                  >
                    Link
                  </Th>
                  <Th
                    fontWeight={"400"}
                    textTransform={"capitalize"}
                    fontSize={"14px"}
                    textColor={"#4D4D4D"}
                  >
                    Status
                  </Th>
                  <Th
                    fontWeight={"400"}
                    textTransform={"capitalize"}
                    fontSize={"14px"}
                    textColor={"#4D4D4D"}
                  >
                    Actions
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.map((product, index) => (
                  <Tr key={product.id + "-" + index}>
                    <Td color={"#4D4D4D"} fontSize={"12px"}>
                      {product.name}
                    </Td>
                    <Td color={"#4D4D4D"} fontSize={"12px"}>
                      {product.price.toFixed(2)}
                    </Td>
                    <Td color={"#4D4D4D"} fontSize={"12px"}>
                      <HStack>
                        <Link href={`/checkout/${product.id}`} target="_blank">
                          {`${domainsConfig.urlPayment.replace("https://", "")}/checkout/${product.id}`}
                        </Link>
                        <IconButton
                          aria-label="Copy link"
                          variant={"ghost"}
                          onClick={() => {
                            setValue(`${domainsConfig.urlPayment.replace("https://", "")}/checkout/${product.id}`);
                            onCopy();
                            toast({
                              title: `Link copied`,
                              status: "success",
                              isClosable: true,
                            });
                          }}
                          w={"fit-content"}
                          icon={<CopyIcon />}
                          size={"md"}
                          boxSize={"16px"}
                          color={"primary.500"}
                          cursor={"pointer"}
                        />
                      </HStack>
                    </Td>
                    <Td>
                      <HStack>
                        <Circle
                          size={"12px"}
                          bgColor={
                            product.status === ProductStatus.Active
                              ? "#6BC77C"
                              : "#F15042"
                          }
                        />
                        <Text
                          color={"#4D4D4D"}
                          fontSize={"14px"}
                          textTransform={"capitalize"}
                        >
                          {product.status}
                        </Text>
                      </HStack>
                    </Td>
                    <Td ps={"10px"}>
                      <Flex>
                        <IconButton
                          aria-label="Edit product"
                          variant={"ghost"}
                          boxSize={"20px"}
                          icon={<FaPen />}
                          size={"lg"}
                          color={"primary.500"}
                          cursor={"pointer"}
                          onClick={() => {
                            setSelectedProduct(product);
                            createProductDisclosure.onOpen();
                          }}
                        />
                        <IconButton
                          aria-label="Delete product"
                          variant={"ghost"}
                          size={"lg"}
                          boxSize={"20px"}
                          icon={<FaRegTrashAlt />}
                          color={"primary.500"}
                          cursor={"pointer"}
                          onClick={() => {
                            setSelectedProduct(product);
                            deleteProductDisclosure.onOpen();
                          }}
                        />
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </VStack>
    </Flex>
  );
}
