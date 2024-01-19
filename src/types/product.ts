export default interface IProduct {
  id: number;
  name: string;
  price: number;
  payLink: string;
  status: ProductStatus;
}

export enum ProductStatus {
  Active = "active",
  Inactive = "inactive",
}