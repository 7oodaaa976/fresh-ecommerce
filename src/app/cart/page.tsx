"use client";
import clearCartIetms from "@/CartServ/clearCart";
import { getLoggedUserCart } from "@/CartServ/getUserCart";
import { removeCartitem } from "@/CartServ/removeCartItem";
import { updateCartItem } from "@/CartServ/updateCart";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import { CartPro } from "@/Types/cartProducts";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Cart() {
  const [products, setProducts] = useState<CartPro[]>([]);
  const [isLoading, setisLoading] = useState(true);
  const { numOfCart, setnumOfCart } = useContext(CartContext);
  const [total, settotal] = useState(0);
  const [cartId, setcartId] = useState("");

  async function getUserCart() {
    try {
      const res = await getLoggedUserCart();
      console.log(res);

      if (res.status === "success") {
        settotal(res.data.totalCartPrice);
        setcartId(res.cartId)
        
        setProducts(res.data.products);
        setisLoading(false);
      }
    } catch (err) {
      console.log(err);
      setisLoading(false);
    }
  }

  async function delCartItem(id: string) {
    const response = await removeCartitem(id);
    if (response.status === "success") {
      console.log(response);

      setProducts(response.data.products);
      toast.success("Deleted", { position: "top-right", duration: 2000 });
      let sum = 0;
      response.data.products.forEach((pro: CartPro) => {
        sum += pro.count;
      });
      setnumOfCart(sum);
      getUserCart();
    }
  }
  async function updateCart(id: string, count: string, mark: string) {
    const res = await updateCartItem(id, count);
    console.log(res);
    if (res.status === "success") {
      setProducts(res.data.products);
      toast.success("Updated", { position: "top-center", duration: 1000 });
      if (mark === "+") {
        setnumOfCart(numOfCart + 1);
      } else if (mark === "-") {
        setnumOfCart(numOfCart - 1);
      }
      getUserCart();
    } else {
      toast.error("somtthing wrong ‼️", {
        position: "top-center",
        duration: 1000,
      });
    }
  }
  async function clearCart() {
    const res = await clearCartIetms();
    console.log(res);
    if (res.message === "success") {
      setProducts([]);
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  if (isLoading) {
    return (
      <>
        <div className="min-h-screen mx-auto flex items-center justify-center">
          <span className="loader text-4xl"></span>;
        </div>
      </>
    );
  }
  return (
    <div className="lg:w-[70%] mx-auto w-full py-6">
      {products.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between px-4 gap-4">
            <h1 className="text-center lg:text-left font-bold text-[#99A1AF] text-3xl">
              Total : {total} EGP
            </h1>
            <div className="flex justify-center lg:justify-end">
              <Button onClick={() => clearCart()} className="cursor-pointer">
                Clear
              </Button>
            </div>
          </div>

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: CartPro) => (
                <tr
                  key={product._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="p-4">
                    <Image 
                    
                    width={300}
                    height={300}
                      src={product.product.imageCover}
                      alt={product.product.title}
                      className="w-16 md:w-32 max-w-full max-h-full"
                    />
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.product.title}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          updateCart(
                            product.product._id,
                            ` ${product.count - 1}`,
                            "-"
                          )
                        }
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border rounded-full hover:bg-gray-100"
                        type="button"
                      >
                        -
                      </button>
                      <span className="text-amber-500">{product.count}</span>
                      <button
                        onClick={() =>
                          updateCart(
                            product.product._id,
                            `${product.count + 1}`,
                            "+"
                          )
                        }
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border rounded-full hover:bg-gray-100"
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.price}EGP
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => delCartItem(product.product._id)}
                      className="font-medium text-red-600 dark:text-red-500 cursor-pointer "
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
           (
            <Link href={`/checkout/${cartId}`}>
              <Button className="w-full cursor-pointer">CheckOut</Button>
            </Link>
          )
        </div>
      ) : (
        <h2 className="text-2xl text-center font-bold">No Products Added</h2>
      )}
    </div>
  );
}
