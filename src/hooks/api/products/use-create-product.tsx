import IProduct, { ICreateProduct, ProductStatus } from "@/types/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fakeDatabase } from "../db";
import { RQueryKeys } from "@/config";

function createProduct(newProduct: ICreateProduct): Promise<IProduct> {
  return new Promise((resolve, reject) => {
    try {
      const nextId = (
        parseInt(fakeDatabase[fakeDatabase.length - 1]?.id || "0", 10) + 1
      ).toString();

      const productToAdd: IProduct = {
        id: nextId,
        name: newProduct.name,
        price: newProduct.price,
        payLink: "https://www.google.com",
        status: ProductStatus.Active,
      };
      fakeDatabase.push(productToAdd);
      resolve(productToAdd);
    } catch (error) {
      reject(error);
    }
  });
}

export default function useCreateProduct() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (product: ICreateProduct) => createProduct(product),
    onSuccess: () => {
      console.log("Product created");
      client.invalidateQueries({ queryKey: [RQueryKeys.products] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
