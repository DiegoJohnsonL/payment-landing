import IProduct, { ProductStatus } from "@/types/product";

export const fakeDatabase: IProduct[] = Array.from({ length: 15 }).map(
  (_, index) => ({
    id: (index + 1).toString(),
    name: `Product ${index + 1}`,
    price: Number((Math.random() * 100).toFixed(2)),
    status: Math.random() > 0.5 ? ProductStatus.Active : ProductStatus.Inactive,
  })
);
