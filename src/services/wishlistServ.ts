"use server";
import { getMyToken } from "@/utitlies/getMyToken";

export async function getWishlist() {
  const token = await getMyToken();
  if (!token) throw new Error("Please login!");

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    headers: { token },
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to fetch wishlist");
  }

  return res.json();
}

export async function addToWishlist(productId: string) {
  const token = await getMyToken();
  if (!token) throw new Error("Please login!");

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({ productId }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to add to wishlist");
  }

  return res.json();
}

export async function removeFromWishlist(productId: string) {
  const token = await getMyToken();
  if (!token) throw new Error("Please login!");

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
    {
      method: "DELETE",
      headers: { token },
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to remove from wishlist");
  }

  return res.json();
}
