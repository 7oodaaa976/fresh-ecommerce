import { getMyToken } from "@/utitlies/getMyToken";
import { toast } from "sonner";


export async function getLoggedUserCart() {
  const token = await getMyToken();
  if (!token) {
    toast.error("PleaseLogin first",{position:"top-center"})
    throw new Error("Please login ");
  }
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "GET",
    headers: { token},
  });

  const payload = await res.json();
  return payload;
}
