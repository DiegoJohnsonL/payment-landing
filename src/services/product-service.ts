import { fakeDatabase } from "@/hooks/api/db";
import IProduct from "@/types/product";

export async function getProduct(productId: string): Promise<IProduct> {
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
