import getAllBrands from "@/services/getBrands";
import { BrandT } from "@/Types/brands";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Brands() {
  const brands = await getAllBrands();
  return (
    <>
      <div className="container w[80%] mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Brands</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {brands.map((brand: BrandT) => (
            <Link
              href={`/brands/${brand._id}`}
              key={brand._id}
              className="border p-2 rounded text-center block hover:shadow-lg transition"
            >
              <Image
                width={400}
                height={400}
                src={brand.image}
                alt={brand.name}
                className="w-full h-32 object-cover mb-2 rounded"
              />
              <p className="font-medium">{brand.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
