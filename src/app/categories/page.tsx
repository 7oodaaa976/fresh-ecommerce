import Link from "next/link";
import getAllCategories from "@/services/getCategories";
import { categoryType } from "@/Types/category.type";
import Image from "next/image";

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="container w[80%] mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((cat:categoryType) => (
          <Link
            href={`/categories/${cat._id}`}
            key={cat._id}
            className="border p-2 rounded text-center block hover:shadow-lg transition"
          >
            <Image
            width={200}
            height={200}
              src={cat.image}
              alt={cat.name}
              className="w-full h-32 object-cover mb-2 rounded"
            />
            <p className="font-medium">{cat.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
