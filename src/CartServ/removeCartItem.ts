"use server";
import { getMyToken } from "@/utitlies/getMyToken";
export async function removeCartitem(id: string) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("Please login !");
  }
  console.log(`The token > ${token}`);
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    method: "DELETE",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });

  const payload = await res.json();
  return payload;
}
