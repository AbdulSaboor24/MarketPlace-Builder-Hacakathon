"use client";
import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "../utils/types";
import { usePathname } from "next/navigation"; // Use usePathname from next/navigation

interface ProductSectionProps {
  heading: string;
  products: Product[];
  showViewAll?: boolean; // Optional "View All" button
}

const ProductSection: React.FC<ProductSectionProps> = ({ heading, products, showViewAll = true }) => {
  const pathname = usePathname(); // Get the current path

  return (
    <section className="max-w-screen-xl mx-auto text-center pt-4 pb-20">
      {/* Section Heading */}
      <h1 className="text-[28px] md:text-4xl font-bold mb-8 md:mb-12 capitalize">
        {heading}
      </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mx-4 xl:mx-0">
        {products.map((product) => (
          <div key={product._id} className="w-full max-w-[198px] sm:max-w-[295px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* View All Button (only show on pages other than /shop) */}
      {showViewAll && pathname !== "/shop" && (
        <div className="w-full px-4 sm:px-0 text-center mt-6">
          <button
            onClick={() => window.location.href = "/shop"} // Navigating to /shop
            className="w-full sm:w-[218px] px-[54px] py-3 border rounded-full hover:bg-black hover:text-white text-black transition-all font-medium text-sm sm:text-base border-black/20"
          >
            View All
          </button>
        </div>
      )}

      {/* HR Tag (only show on pages other than /shop) */}
      {pathname !== "/shop" && (
        <hr className="bg-slate-200 my-10 w-full max-w-[1300px] mx-auto" />
      )}
    </section>
  );
};

export default ProductSection;