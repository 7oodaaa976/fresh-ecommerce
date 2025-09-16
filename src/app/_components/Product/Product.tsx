import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/components/card";
import Link from "next/link";
import Image from "next/image";
import { productType } from "./../../../Types/product.type";
import AddToCartBtn from "../Btns/AddToCartBtn";
import WishlistButton from "../Wishlist/Wishlist";

export default function Product({ product }: { product: productType }) {
  return (
    <>
      <div
        key={product.id}
        className=" bg-white shadow rounded-xl transition-all duration-300 hover:scale-105 hover:scale-x-110"
      >
        <div className="product p-4  shadow">
          <Card className="gap-2 ">
            <Link href={`/products/${product.id}`}>
              <CardHeader>
                <CardTitle>
                  <Image
                    width={300}
                    height={300}
                    src={product.imageCover}
                    alt="product"
                  />
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col">
                <CardDescription className="text-green-500">
                  {product.category.name}
                </CardDescription>

                <p className="line-clamp-2">{product.title}</p>
              </CardContent>
              <CardFooter>
                <div className="flex justify-between w-full items-center">
                  <p>
                    {product.price} <span className="font-bold ">EGP</span>
                  </p>
                  <p>
                    {product.ratingsAverage}
                    <i className="fa-solid fa-star text-yellow-400"></i>
                  </p>
                  <WishlistButton productId={product._id} />
                </div>
              </CardFooter>
            </Link>
            <AddToCartBtn id={product.id} />
          </Card>
        </div>
      </div>
    </>
  );
}
