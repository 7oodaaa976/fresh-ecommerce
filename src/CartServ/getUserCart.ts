import { getMyToken } from "@/utitlies/getMyToken";

export async function getLoggedUserCart() {
  const token = await getMyToken();
  if (!token) {
    throw new Error("Please login ");
  }
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "GET",
    headers: { token},
  });

  const payload = await res.json();
  return payload;
}
