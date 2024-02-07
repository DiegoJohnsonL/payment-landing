import IProduct from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { RQueryKeys } from "@/config";
import { getProduct } from "@/services/product-service";

export default function useGetProduct(productId: string) {
  return useQuery<IProduct, Error>({
    queryKey: [RQueryKeys.products, productId],
    queryFn: () => getProduct(productId),
  });
}
