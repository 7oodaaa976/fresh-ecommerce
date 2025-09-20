import AddToCartBtn from "@/app/_components/Btns/AddToCartBtn";
import { productType } from "@/Types/product.type";
import Image from "next/image";

type Props = {
  params: {
    id: string;
  };
};

export default async function CategoryDetails({ params }: Props) {
  const { id } = params;

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category=${id}`,
    { cache: "no-store" }
  );
  const { data } = await res.json();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Category Products</h1>

      {data.length === 0 ? (
        <p className="text-gray-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {data.map((product:productType) => (
            <div
              key={product._id}
              className="border p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <Image
              width={200}
              height={200}
                src={product.imageCover}
                alt={product.title}
                className="w-full h-40 object-cover mb-3 rounded"
              />
              <h2 className="font-semibold text-sm mb-1">{product.title}</h2>
              <p className="text-green-600 font-bold">{product.price} EGP</p>
              <AddToCartBtn id={product.id}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
