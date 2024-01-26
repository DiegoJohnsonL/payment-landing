import IProduct from "@/types/product";
import {
  Button,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import DeleteProductModalImage from "@/assets/dashboard/delete-product-modal.png";
import useDeleteProduct from "@/hooks/api/product/use-delete-product";

export default function DeleteProductModal({
  isOpen,
  onClose,
  product,
}: {
  isOpen: boolean;
  onClose: () => void;
  product?: IProduct;
}) {
  const { mutate: deleteProduct } = useDeleteProduct();
  const onDelete = () => {
    deleteProduct(product!.id, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay backdropFilter={"blur(10px)"} />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody pb={"48px"} px={"40px"} pt={"64px"}>
          <VStack gap={"24px"}>
            <Image
              src={DeleteProductModalImage.src}
              width={88}
              height={80}
              alt="Red Delete Image"
            />
            <VStack align={"flex-start"} spacing={"16px"}>
              <Text
                color={"black"}
                fontSize={"20px"}
                lineHeight={"24px"}
                fontWeight={"500"}
              >
                Are you sure you want to remove this product?
              </Text>
              <Text color={"black"} fontSize={"14px"} lineHeight={"140%"}>
                {
                  'Click "Delete" to delete it permanently, or "Cancel" if you wish to keep the product.'
                }
              </Text>
            </VStack>
          </VStack>
          <HStack w={"100%"} justify={"space-around"} gap={"24px"} pt={"40px"}>
            <Button py={"20px"} variant="outline" onClick={onClose} w={"100%"}>
              Cancel
            </Button>
            <Button
              py={"20px"}
              w={"100%"}
              onClick={onDelete}
            >
              Delete
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
