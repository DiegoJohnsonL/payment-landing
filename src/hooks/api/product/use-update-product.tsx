import IProduct, { ProductStatus } from "@/types/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fakeDatabase } from "../db";
import { RQueryKeys } from "@/config";

export const updateProduct = (
  updatedProduct: IProduct
): Promise<IProduct | undefined> => {
  return new Promise((resolve, reject) => {
    try {
      const updatedProductIndex = fakeDatabase.findIndex(
        (product) => product.id === updatedProduct.id
      );

      if (updatedProductIndex !== -1) {
        fakeDatabase[updatedProductIndex] = {
          ...fakeDatabase[updatedProductIndex],
          ...updatedProduct,
        };
        resolve(fakeDatabase[updatedProductIndex]);
      } else {
        resolve(undefined);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export default function useUpdateProduct() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (product: IProduct) => updateProduct(product),
    onSuccess: (data, variables) => {
      client.invalidateQueries({ queryKey: [RQueryKeys.products] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
