
export default async function getAllBrands() {
  try {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Failed to fetch brands");

    const { data } = await response.json();
    return data ;
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
}



export async function getBrandById(id: string) {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
  if (!res.ok) throw new Error("Failed to fetch brand")
  return res.json()
}


export async function getProductsByBrand(brandId: string) {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`)
  if (!res.ok) throw new Error("Failed to fetch products")
  return res.json()
}