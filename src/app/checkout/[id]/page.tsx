"use server";

import CheckoutForm from "./_components/checkout-form";
import { getProduct } from "@/services/product-service";
import { ProductStatus } from "@/types/product";
import { RedirectType, redirect } from "next/navigation";

export default async function CheckoutPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await getProduct(id);
  if (product.status ) {
    return redirect("/dashboard?toast=inactiveProduct", RedirectType.push);
  }
  return (
    <>
      <CheckoutForm product={product} />
    </>
  );
}