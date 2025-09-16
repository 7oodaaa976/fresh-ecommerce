"use server"
import { checkoutType } from "@/Schema/checkoutSchema";
import { getMyToken } from "@/utitlies/getMyToken";

export default async function OnlineCheckout(
  cartId: string,
  url= process.env.NEXT_URL,
  forminfo: checkoutType
) {
  const token = await getMyToken();
  if (!token) throw new Error("please login");

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
    {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shippingAddress: forminfo }),
    }
  );
  const payload = await res.json();
  return payload;
}
