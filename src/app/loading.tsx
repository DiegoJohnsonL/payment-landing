import { Center, Spinner, VStack } from "@chakra-ui/react";

export default function Loading() {
  return (
    <VStack
      h={"100vh"}
      style={{
        height: "100dvh",
      }}
      w={"100%"}
    >
      <Center height={"100%"} w={"100%"}>
        <Spinner />
      </Center>
    </VStack>
  );
}
