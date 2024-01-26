import IProduct from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { fakeDatabase } from "../db";
import { RQueryKeys } from "@/config";

function getProduct(productId: string): Promise<IProduct> {
  return new Promise((resolve, reject) => {
    try {
      const product = fakeDatabase.find((p) => p.id === productId);

      if (product) {
        resolve(product);
      } else {
        reject(new Error("Product not found"));
      }
    } catch (error) {
      reject(error);
    }
  });
}

export default function useGetProduct(productId: string) {
  return useQuery<IProduct, Error>({
    queryKey: [RQueryKeys.products, productId],
    queryFn: () => getProduct(productId),
  });
}
