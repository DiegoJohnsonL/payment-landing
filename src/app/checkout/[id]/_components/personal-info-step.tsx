import IProduct from "@/types/product";
import {
  Box,
  Card,
  CardBody,
  Checkbox,
  Divider,
  FormControl,
  FormErrorMessage,
  HStack,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function PersonalInfoStep({
  product,
  register,
  errors,
}: {
  product: IProduct;
  register: any;
  errors: any;
}) {

  return (
    <>
      <VStack gap={"24px"} align={"flex-start"} w={"100%"}>
        <Heading fontSize={"20px"}>Product Summary</Heading>
        <Card w={"100%"}>
          <CardBody>
            <VStack spacing={"24px"}>
              <HStack w={"100%"} gap={"24px"}>
                <VStack flex={2} align={"flex-start"} gap={"12px"}>
                  <Text fontWeight={"500"}>{product.name}</Text>
                  <Input defaultValue={`Product ${product.id}`} isReadOnly />
                </VStack>
                <VStack flex={1} align={"flex-start"} gap={"12px"}>
                  <Text fontWeight={"500"}>Quantity</Text>
                  <Input defaultValue={`1`} isReadOnly />
                </VStack>
              </HStack>
              <Divider orientation="horizontal" />
              <HStack w={"100%"} justify={"space-between"} gap={"12px"}>
                <Text>Total</Text>
                <Text>USD {product.price}</Text>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
      <VStack gap={"24px"} align={"flex-start"} w={"100%"}>
        <Heading fontSize={"20px"}>Contact Information</Heading>
        <Card w={"100%"}>
          <CardBody display={"flex"} flexDirection={"column"} gap={"16px"}>
            <Stack spacing={"28px"}>
              <HStack gap={"16px"} align={"flex-start"}>
                <VStack align={"flex-start"} w={"100%"} gap={"12px"}>
                  <Text fontWeight={"500"}>First Name</Text>
                  <FormControl w={"100%"} isInvalid={!!errors.firstName}>
                    <Input
                      {...register("firstName")}
                      placeholder="Enter your first name"
                    />
                    <FormErrorMessage>
                      {errors.firstName?.message}
                    </FormErrorMessage>
                  </FormControl>
                </VStack>
                <VStack align={"flex-start"} w={"100%"} gap={"12px"}>
                  <Text fontWeight={"500"}>Last Name</Text>
                  <FormControl w={"100%"} isInvalid={!!errors.lastName}>
                    <Input
                      placeholder="Enter your last name"
                      {...register("lastName")}
                    />
                    <FormErrorMessage>
                      {errors.lastName?.message}
                    </FormErrorMessage>
                  </FormControl>
                </VStack>
              </HStack>
              <VStack align={"flex-start"} w={"100%"} gap={"12px"}>
                <Text fontWeight={"500"}>Identify Document</Text>
                <HStack w={"100%"} gap={"16px"} align={"flex-start"}>
                  <FormControl w={"35%"} isInvalid={!!errors.document}>
                    <Select {...register("document")}>
                      <option value="DNI">DNI</option>
                    </Select>
                    <FormErrorMessage>
                      {errors.document?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl w={"75%"} isInvalid={!!errors.documentNumber}>
                    <Input
                      placeholder="Document Number"
                      {...register("documentNumber")}
                    />
                    <FormErrorMessage>
                      {errors.documentNumber?.message}
                    </FormErrorMessage>
                  </FormControl>
                </HStack>
              </VStack>
              <VStack align={"flex-start"} w={"100%"} gap={"12px"}>
                <Text fontWeight={"500"}>Email Address</Text>
                <FormControl w={"100%"} isInvalid={!!errors.email}>
                  <Input
                    placeholder="Enter your email address"
                    {...register("email")}
                  />
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
              </VStack>
            </Stack>
            <Stack gap={"12px"}>
              <FormControl w={"100%"} isInvalid={!!errors.termsAndConditions}>
                <Checkbox {...register("termsAndConditions")}>
                  Accept{" "}
                  <Text
                    fontWeight={"500"}
                    as="span"
                    fontSize={"14px"}
                    color={"primary.500"}
                  >
                    Terms and Conditions
                  </Text>
                </Checkbox>
                <FormErrorMessage>
                  {errors.termsAndConditions?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl w={"100%"} isInvalid={!!errors.receiveNews}>
                <Checkbox {...register("receiveNews")}>
                  I would like to receive special offers and news about our
                  products.
                </Checkbox>
                <FormErrorMessage>
                  {errors.receiveNews?.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
          </CardBody>
        </Card>
      </VStack>
    </>
  );
}
