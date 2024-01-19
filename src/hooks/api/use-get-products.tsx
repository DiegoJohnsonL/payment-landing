import IProduct, { ProductStatus } from "@/types/product";
import { useInfiniteQuery } from "@tanstack/react-query";

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

const fakeDatabase: IProduct[] = Array.from({ length: 50 }).map((_, index) => ({
  id: index,
  name: `Product ${index}`,
  price: Math.random() * 100,
  payLink: "https://www.google.com",
  status: Math.random() > 0.5 ? ProductStatus.Active : ProductStatus.Inactive,
}));

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
    }, 100);
  });
}

export default function useGetProducts(params: IPageParams) {
  return useInfiniteQuery({
    queryKey: ["products", params.page, params.pageSize],
    initialPageParam: params.page,
    queryFn: ({ pageParam }) =>
      fetchProducts({ page: pageParam, pageSize: params.pageSize }),
    getNextPageParam: (pageResponse) =>
      pageResponse.page < pageResponse.totalPages - 1
        ? pageResponse.page + 1
        : undefined,
  });
}
