import { getMyToken } from "@/utitlies/getMyToken";

export default async function clearCartIetms() {
  const token = await getMyToken();
  if (!token) throw new Error("Please login ");
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "DELETE",
    headers: {
      token,
    },
  });
  const payload = await res.json();
  return payload;
}
