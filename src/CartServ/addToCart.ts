"use server"
import { getMyToken } from "@/utitlies/getMyToken";

export async function getUserCart(id: string) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("Please LogIn First");
  }
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId: id }),
  });

  const payload = await response.json();
  return payload;
}
