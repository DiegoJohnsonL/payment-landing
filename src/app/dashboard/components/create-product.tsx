import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
  Button,
  HStack,
  Stack,
} from "@chakra-ui/react";

export default function CreateProduct({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"sm"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Create Product</DrawerHeader>

        <DrawerBody px={"40px"}>
          <Stack gap={"40px"} >
            <Input placeholder="Type here..." />
            <HStack w={"100%"} gap={"24px"} justify={"space-around"}>
              <Button py={"20px"} variant="outline"  onClick={onClose} w={"100%"}>
                Cancel
              </Button>
              <Button py={"20px"} w={"100%"}>Create</Button>
            </HStack>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
