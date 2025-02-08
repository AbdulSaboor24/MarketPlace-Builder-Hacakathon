import { Product } from "./types";

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("/api/products");
  return res.json();
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const res = await fetch(`/api/products/${id}`);
    if (!res.ok) throw new Error("Failed to fetch product");
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export const fetchCategories = async (): Promise<string[]> => {
  const res = await fetch("/api/category");
  const data: { category: string }[] = await res.json();

  return [...new Set(data.map((item: { category: string }) => item.category))];
};