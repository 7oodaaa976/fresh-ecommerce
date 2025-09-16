"use client";
import { getUserCart } from "@/CartServ/addToCart";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import React, { useContext } from "react";
import { toast } from "sonner";

export default function AddToCartBtn({ id }: { id: string }) {
  const { numOfCart, setnumOfCart } = useContext(CartContext);
  async function checkAddtoCart(id: string) {
    const response = await getUserCart(id);
    console.log(response);
    if (response.status === "success") {
      toast.success("Product added", {
        position: "top-center",
        duration: 2000,
      });
      setnumOfCart(numOfCart + 1)
    }
  }
  return (
    <>
      <Button
        onClick={() => checkAddtoCart(id)}
        className="w-full my-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg cursor-pointer"
      >
        Add to Cart
      </Button>
    </>
  );
}
