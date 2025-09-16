import React from "react";

import getProducts from "@/services/getProducts";
import Product from "../Product/Product";
import { productType } from "@/Types/product.type";

export default async function AllProducts() {
  const data = await getProducts();
  return (
    <>
      <div className="container w-[80%] mx-auto  py-18 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  ">
          {data.map((product:productType) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      </div>
    </>
  );
}
