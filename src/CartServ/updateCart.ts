"use server";
import { getMyToken } from "@/utitlies/getMyToken";

 export async function updateCartItem(id: string, count: string) {
  const token = await getMyToken();
  if(!token) throw new Error("please Login ")
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    method: "PUT",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ count:count }),
  });
  const payload = await res.json()
  return payload
}
