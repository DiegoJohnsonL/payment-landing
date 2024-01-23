import IProduct, { ProductStatus } from "@/types/product";

export const fakeDatabase: IProduct[] = Array.from({ length: 15 }).map(
  (_, index) => ({
    id: index.toString(),
    name: `Product ${index}`,
    price: Math.random() * 100,
    payLink: "https://www.google.com",
    status: Math.random() > 0.5 ? ProductStatus.Active : ProductStatus.Inactive,
  })
);
