"use client";
import { addToWishlist, removeFromWishlist } from "@/services/wishlistServ";
import { useState } from "react";
import { toast } from "sonner";

export default function WishlistButton({
  productId,
  inWishlist = false,
}: {
  productId: string;
  inWishlist?: boolean;
}) {
  const [isInWishlist, setIsInWishlist] = useState(inWishlist);

  async function toggleWishlist() {
    try {
      if (isInWishlist) {
        await removeFromWishlist(productId);
        setIsInWishlist(false);
        toast.success("Removed from wishlist ❤️‍🔥");
      } else {
        await addToWishlist(productId);
        setIsInWishlist(true);
        toast.success("Added to wishlist ❤️");
      }
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
    }
  }

  return (
    <button onClick={toggleWishlist} className="text-red-500 text-xl">
      {isInWishlist ? "♥" : "♡"}
    </button>
  );
}
