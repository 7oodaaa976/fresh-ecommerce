export default async function getAllCategories() {
  try {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/categories", {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const { data } = await response.json();
    return data; 
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
