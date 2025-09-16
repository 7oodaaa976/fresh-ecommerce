"use client";

import { useEffect, useState } from "react";
import { getWishlist } from "@/services/wishlistServ";
import { productType } from "@/Types/product.type";
import Image from "next/image";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<productType[]>([]);

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const res = await getWishlist();
        setWishlist(res?.data || []);
      } catch (err) {
        console.error(err);
      }
    }
    fetchWishlist();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
      <div className="grid grid-cols-2 gap-4">
        {wishlist.length > 0 ? (
          wishlist.map((pro) => (
            <div key={pro._id} className="border p-4 rounded">
              <Image
                width={300}
                height={300}
                src={pro.imageCover}
                alt="productImage"
              />
              <h2>{pro.title}</h2>
            </div>
          ))
        ) : (
          <p>No items in your wishlist.</p>
        )}
      </div>
    </div>
  );
}
