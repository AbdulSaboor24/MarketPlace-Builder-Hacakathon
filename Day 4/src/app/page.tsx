"use client";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";
import { Product } from "./utils/types";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://market-place-builder-hacakathon.vercel.app/api/products");
        const data = await res.json();
        const arrivals = data.filter((product: Product) => product.isNew).slice(0, 4);
        setNewArrivals(arrivals);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <div className="pt-8">
        <ProductSection heading="New Arrivals" products={newArrivals} showViewAll />
      </div>
    </>
  );
}