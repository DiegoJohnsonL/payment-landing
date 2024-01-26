import IProduct from "@/types/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fakeDatabase } from "../db";
import { RQueryKeys } from "@/config";

function deleteProduct(productId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const index = fakeDatabase.findIndex(
        (product) => product.id === productId
      );
      if (index !== -1) {
        fakeDatabase.splice(index, 1);
        resolve();
      } else {
        reject(new Error("Product not found"));
      }
    } catch (error) {
      reject(error);
    }
  });
}

export default function useDeleteProduct() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
    onSuccess: () => {
      console.log("Product deleted");
      client.invalidateQueries({ queryKey: [RQueryKeys.products] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
