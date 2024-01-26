import IProduct from "@/types/product";
import { Card, CardBody, Checkbox, Divider, HStack, Heading, Input, Select, Stack, Text, VStack } from "@chakra-ui/react";

export default function PersonalInfoStep({ product }: { product: IProduct }) {
  return (
    <>
      <VStack gap={"24px"} align={"flex-start"} w={"100%"}>
        <Heading fontSize={"20px"}>Product Summary</Heading>
        <Card w={"100%"}>
          <CardBody>
            <VStack spacing={"24px"}>
              <HStack w={"100%"} gap={"24px"}>
                <VStack flex={2} align={"flex-start"} gap={"12px"}>
                  <Text fontWeight={"500"}>Product</Text>
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
                <Text>USD 10.00</Text>
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
              <VStack align={"flex-start"} w={"100%"} gap={"12px"}>
                <Text fontWeight={"500"}>Full Name</Text>
                <Input placeholder="Enter your full name" />
              </VStack>
              <VStack align={"flex-start"} w={"100%"} gap={"12px"}>
                <Text fontWeight={"500"}>Identify Document</Text>
                <HStack w={"100%"} gap={"16px"}>
                  <Select w={"35%"}>
                    <option value="DNI">DNI</option>
                  </Select>
                  <Input w={"75%"} placeholder="Document Number" />
                </HStack>
              </VStack>
              <VStack align={"flex-start"} w={"100%"} gap={"12px"}>
                <Text fontWeight={"500"}>Email Address</Text>
                <Input placeholder="Enter your email address" />
              </VStack>
            </Stack>
            <Stack gap={"12px"}>
              <Checkbox>
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
              <Checkbox>
                I would like to receive special offers and news about our
                products.
              </Checkbox>
            </Stack>
          </CardBody>
        </Card>
      </VStack>
    </>
  );
}