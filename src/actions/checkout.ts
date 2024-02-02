"use server";

export default async function getIzipayToken(amount: number) {
  const currentTimeUnix = Math.floor(Date.now()) * 1000;
  const transactionId = currentTimeUnix.toString().slice(0, 14);
  const orderNumber = currentTimeUnix.toString().slice(0, 10).toString();
  console.log("env", process.env.IZIPAY_MERCHANT_CODE, process.env.IZIPAY_PUBLIC_KEY)
  const response = await fetch(
    `https://sandbox-api-pw.izipay.pe/security/v1/Token/Generate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        transactionId: transactionId,
      },
      body: JSON.stringify({
        requestSource: "ECOMMERCE",
        merchantCode: process.env.IZIPAY_MERCHANT_CODE || "",
        orderNumber: orderNumber,
        publicKey: process.env.IZIPAY_PUBLIC_KEY || "",
        amount: amount.toFixed(2),
      }),
    }
  );
  return await response.json();
}
