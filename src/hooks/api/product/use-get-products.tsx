import IProduct, { ProductStatus } from "@/types/product";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fakeDatabase } from "../db";
import { RQueryKeys } from "@/config";

interface PageResponse {
  data: IProduct[];
  page: number;
  totalPages: number;
  size: number;
}

interface IPageParams {
  page: number;
  pageSize: number;
}

function fetchProducts({ page, pageSize }: IPageParams) {
  const start = page * pageSize;
  const end = start + pageSize;
  const dataSlice = fakeDatabase.slice(start, end);
  return new Promise<PageResponse>((resolve) => {
    setTimeout(() => {
      const totalPages = Math.ceil(fakeDatabase.length / pageSize);
      resolve({
        data: dataSlice,
        page: page,
        totalPages: totalPages,
        size: dataSlice.length,
      });
    }, 50);
  });
}

export default function useGetProducts(params: IPageParams) {
  return useInfiniteQuery({
    queryKey: [RQueryKeys.products, params.page, params.pageSize],
    initialPageParam: params.page,
    queryFn: ({ pageParam }) =>
      fetchProducts({ page: pageParam, pageSize: params.pageSize }),
    getNextPageParam: (pageResponse) =>
      pageResponse.page < pageResponse.totalPages - 1
        ? pageResponse.page + 1
        : undefined,
  });
}
