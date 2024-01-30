import {
  VStack,
  HStack,
  Heading,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Center,
  Spinner,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
  Circle,
  Flex,
  Text,
  useDisclosure,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { FaPen, FaRegTrashAlt } from "react-icons/fa";
import ProductBagImage from "@/assets/dashboard/products-bag.svg?url";
import Image from "next/image";
import IProduct, { ProductStatus } from "@/types/product";
import TablePagination from "@/components/table-pagination";
import { CopyIcon, Search2Icon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";
import { domainsConfig } from "@/config";
import { useState } from "react";
import useGetProducts from "@/hooks/api/product/use-get-products";
import CreateUpdateProductDrawer from "./create-update-product-drawer";
import DeleteProductModal from "./delete-product-modal";

export default function ProductContainer() {
  const createProductDisclosure = useDisclosure();
  const deleteProductDisclosure = useDisclosure();
  const { onCopy, setValue, hasCopied } = useClipboard("");
  const toast = useToast();
  const [pageSize, setPageSize] = useState(20);
  const { data, hasNextPage, isFetching, fetchNextPage, fetchPreviousPage } =
    useGetProducts({
      page: 0,
      pageSize: pageSize,
    });
  const products = data ? data.pages.flatMap((page) => page.data) : [];
  const [selectedProduct, setSelectedProduct] = useState<IProduct>();
  return (
    <>
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
      {/* <TablePagination
      total={100}
      page={2}
      pageSize={pageSize}
      nextPage={() => fetchNextPage()}
      previousPage={() => fetchPreviousPage()}
      setPageSize={setPageSize}
    /> */}
      {isFetching ? (
        <Center w={"100%"} h={"50vh"}>
          <Spinner />
        </Center>
      ) : (
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
                        {`${domainsConfig.urlPayment.replace(
                          "https://",
                          ""
                        )}/checkout/${product.id}`}
                      </Link>
                      <IconButton
                        aria-label="Copy link"
                        variant={"ghost"}
                        onClick={() => {
                          setValue(
                            `${domainsConfig.urlPayment.replace(
                              "https://",
                              ""
                            )}/checkout/${product.id}`
                          );
                          onCopy();
                          toast({
                            title: `Link copied`,
                            status: "success",
                            isClosable: true,
                          });
                        }}
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
    </>
  );
}
