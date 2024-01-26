"use client";

import useCreateProduct from "@/hooks/api/product/use-create-product";
import useUpdateProduct from "@/hooks/api/product/use-update-product";
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
  Text,
  Circle,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { use, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createUpdateProductSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  price: z.number().positive({ message: "Price must be positive" }),
  status: z.nativeEnum(ProductStatus).optional(),
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
    watch,
    reset,
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
          status: values.status,
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
      setValue("status", product.status);
    } else {
      reset();
    }
  }, [product, reset, setValue]);

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
                    <FormControl>
                      <FormLabel htmlFor="status">Status</FormLabel>
                      <Menu size={"lg"}>
                        <MenuButton
                          type="button"
                          w={"100%"}
                          p={"16px"}
                          border={"1px solid #DDE3EE"}
                        >
                          <HStack>
                            <Circle
                              size="12px"
                              bg={
                                watch("status") === ProductStatus.Active
                                  ? "#6BC77C"
                                  : "#F15042"
                              }
                              color="white"
                            />
                            <Text
                              textTransform={"capitalize"}
                              fontSize={"14px"}
                            >
                              {watch("status")}
                            </Text>
                          </HStack>
                        </MenuButton>
                        <MenuList w={"100%"}>
                          <MenuItem
                            fontSize={"14px"}
                            onClick={() =>
                              setValue("status", ProductStatus.Active)
                            }
                          >
                            <HStack>
                              <Circle size="12px" bg="#6BC77C" color="white" />
                              <Text
                                textTransform={"capitalize"}
                                fontSize={"14px"}
                              >
                                Active
                              </Text>
                            </HStack>
                          </MenuItem>
                          <MenuItem
                            fontSize={"14px"}
                            onClick={() =>
                              setValue("status", ProductStatus.Inactive)
                            }
                          >
                            <HStack>
                              <Circle size="12px" bg="#F15042" color="white" />
                              <Text
                                textTransform={"capitalize"}
                                fontSize={"14px"}
                              >
                                Inactive
                              </Text>
                            </HStack>
                          </MenuItem>
                        </MenuList>
                      </Menu>
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
                    {product ? "Update" : "Create"}
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
