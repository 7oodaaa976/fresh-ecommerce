"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

type BrandType = {
  _id: string;
  name: string;
  image: string;
};

type ProductType = {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
};

export default function BrandDetailsPage() {
  const { id } = useParams();
  const [brand, setBrand] = useState<BrandType | null>(null);
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    if (!id) return;

    fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then((res) => res.json())
      .then((data) => setBrand(data.data));

    fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.data));
  }, [id]);

  if (!brand) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex items-center gap-6 mb-8">
        <Image
          src={brand.image}
          alt={brand.name}
          width={120}
          height={120}
          className="rounded-xl"
        />
        <h1 className="text-3xl font-bold">{brand.name}</h1>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Products by {brand.name}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-xl shadow p-3 hover:shadow-lg transition"
          >
            <Image
              src={product.imageCover}
              alt={product.title}
              width={200}
              height={200}
              className="rounded-lg"
            />
            <h3 className="mt-2 font-medium">{product.title}</h3>
            <p className="text-green-600 font-bold">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
