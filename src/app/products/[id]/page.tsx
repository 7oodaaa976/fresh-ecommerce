import AddToCartBtn from "@/app/_components/Btns/AddToCartBtn";
import Image from "next/image";
import React from "react";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`
  );
  const { data } = await response.json();
  console.log(data);

  return (
    <div className="container w-[90%] md:flex-row md:w-[80%] mx-auto flex flex-col items-center justify-center ">
      <div className="w-1/4">
        <div className="p-4">
          <Image
          height={300}
          width={300}
            src={data.imageCover}
            className="w-full"
            alt={data.title || "ProductImage"}
          />
        </div>
      </div>
      <div className="w-3/4">
        <div className="p-4">
          <h1>{data.title}</h1>
          <h5 className="mt-6 text-gray-400">{data.description}</h5>
          <p className="mt-4">{data.category.name}</p>
          <div className="flex justify-between w-full">
            <span>
              {data.price} <span className="font-bold">EGP</span>
            </span>
            <p>
              <i className="fa-solid fa-star text-yellow-400"></i>
              {data.ratingsAverage}
            </p>
          </div>
        </div>
        <AddToCartBtn id={id} />
      </div>
    </div>
  );
}
