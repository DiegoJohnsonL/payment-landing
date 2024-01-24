"use client";

import useCreateProduct from "@/hooks/api/products/use-create-product";
import useUpdateProduct from "@/hooks/api/products/use-update-product";
import IProduct, { ICreateProduct, ProductStatus } from "@/types/product";
import { ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Input,
  Button,
  HStack,
  Stack,
  Select,
  FormControl,
  FormLabel,
  Flex,
  Heading,
  IconButton,
  NumberInput,
  NumberInputField,
  FormErrorMessage,
  useToast,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createUpdateProductSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  price: z.number().positive({ message: "Price must be positive" }),
  status: z.boolean().optional(), 
});

type TCreateUpdateProductSchema = z.infer<typeof createUpdateProductSchema>;

export default function CreateUpdateProductDrawer({
  isOpen,
  onClose,
  product,
}: {
  isOpen: boolean;
  onClose: () => void;
  product?: IProduct;
}) {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TCreateUpdateProductSchema>({
    resolver: zodResolver(createUpdateProductSchema),
  });

  const title = product ? "Update Product" : "Create Product";
  const { mutate: createProduct } = useCreateProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const toast = useToast();

  function onSubmit(values: TCreateUpdateProductSchema) {
    if (product) {
      updateProduct(
        {
          id: product.id,
          name: values.name,
          price: values.price,
          status: values.status ? ProductStatus.Active : ProductStatus.Inactive,
        } as IProduct,
        {
          onSuccess: () => {
            toast({
              title: `Product Updated`,
              status: "success",
              isClosable: true,
            });
            onClose();
          },
        }
      );
    } else
      return createProduct(
        {
          name: values.name,
          price: values.price,
        } as ICreateProduct,
        {
          onSuccess: () => {
            toast({
              title: `Product Created`,
              status: "success",
              isClosable: true,
            });
            onClose();
          },
        }
      );
  }

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("price", product.price);
      setValue("status", product.status === ProductStatus.Active);
    } else {
      setValue("name", "");
      setValue("price", 0.0);
      setValue("status", true);
    }
  }, [product, setValue]);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"sm"}>
      <DrawerOverlay backdropFilter="blur(10px)" />
      <DrawerContent>
        <DrawerBody p={"40px"}>
          <Stack w={"100%"} gap={"32px"}>
            <Flex justify={"space-between"} align={"center"}>
              <Heading fontSize={"20px"}>{title}</Heading>
              <IconButton
                isRound={true}
                size={"lg"}
                colorScheme={"gray"}
                onClick={onClose}
                variant="outline"
                aria-label="Done"
                icon={<CloseIcon boxSize={"16px"} />}
              />
            </Flex>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack gap={"40px"}>
                <Stack gap={"24px"}>
                  <FormControl isInvalid={!!errors.name}>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                      {...register("name")}
                      id="name"
                      placeholder="Product name"
                    />
                    <FormErrorMessage>{`${errors.name?.message}`}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.price}>
                    <FormLabel htmlFor="price">Price</FormLabel>
                    <Flex gap={"16px"} align={"center"}>
                      <Select isInvalid={false} defaultValue={"PE"} w={"40%"}>
                        <option value="PE">PEN [Soles]</option>
                      </Select>
                      <NumberInput w="60%" min={0} defaultValue={0.0}>
                        <NumberInputField
                          {...register("price", { valueAsNumber: true })}
                          id="price"
                        />
                      </NumberInput>
                    </Flex>
                    <FormErrorMessage>{`${errors.price?.message}`}</FormErrorMessage>
                  </FormControl>
                  {product && (
                    <FormControl isInvalid={!!errors.status}>
                      <FormLabel htmlFor="status">Status</FormLabel>
                      <Menu id="status">
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                          Actions
                        </MenuButton>
                        <MenuList>
                          <MenuItem>Download</MenuItem>
                          <MenuItem>Create a Copy</MenuItem>
                          <MenuItem>Mark as Draft</MenuItem>
                          <MenuItem>Delete</MenuItem>
                          <MenuItem>Attend a Workshop</MenuItem>
                        </MenuList>
                      </Menu>
                      <FormErrorMessage>{`${errors.status?.message}`}</FormErrorMessage>
                    </FormControl>
                  )}
                </Stack>

                <HStack w={"100%"} gap={"24px"} justify={"space-around"}>
                  <Button
                    py={"20px"}
                    variant="outline"
                    onClick={onClose}
                    w={"100%"}
                  >
                    Cancel
                  </Button>
                  <Button
                    py={"20px"}
                    w={"100%"}
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    Create
                  </Button>
                </HStack>
              </Stack>
            </form>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
