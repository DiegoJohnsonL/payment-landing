export default interface IProduct {
  id: string;
  name: string;
  price: number;
  status: ProductStatus;
}

export enum ProductStatus {
  Active = "active",
  Inactive = "inactive",
}

export  interface ICreateProduct {
  name: string;
  price: number;
  payLink: string;
  status: ProductStatus;
}