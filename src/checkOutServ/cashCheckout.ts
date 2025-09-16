"use server";
import { getMyToken } from "@/utitlies/getMyToken";

export async function createCashOrder(
  cartId: string,
  shippingAddress: {
    details: string;
    phone: string;
    city: string;
  }
) {
  const token = await getMyToken();
  if (!token) throw new Error("Please login!");

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ shippingAddress }),
    }
  );

  if (!res.ok) {
  const errData = await res.json();
  throw new Error(errData.message || "Failed to create cash order");
}


  return res.json();
}
