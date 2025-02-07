"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { fetchProductById, fetchProducts } from "../../utils/api";
import { Product } from "../../utils/types";
import Navbar from "@/app/components/Navbar";
import ReviewsSection from "@/app/components/ReviewsSection";
import { Heart, Wishlisted } from "@/app/components/icons";
import { addToWishlist, removeFromWishlist, isProductWishlisted } from "@/app/utils/wishlist";
import ProductSection from "@/app/components/ProductSection";

export default function ProductDetail() {
  const { id } = useParams() as { id: string };
  const [product, setProduct] = useState<Product | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  const colorMap: { [key: string]: string } = {
    Red: "#FF0000",
    Black: "#000000",
    Blue: "#0000FF",
    White: "#FFFFFF",
    Green: "#008000",
    Yellow: "#FFFF00",
    Purple: "#800080",
    Orange: "#FFA500",
    Gray: "#808080",
  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const products = await fetchProducts();
        const related = products.slice(0, 4);
        setRelatedProducts(related);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (!id) return;

    fetchProductById(id).then((data) => {
      console.log("Fetched Product Data:", data);

      if (Array.isArray(data) && data.length > 0) {
        const fetchedProduct = data[0];

        setProduct(fetchedProduct);

        setSelectedColor(fetchedProduct.colors?.[0]?.name || null);
        setSelectedSize(fetchedProduct.sizes?.[0] || null);
      } else {
        setProduct(null);
      }
    });

    setIsWishlisted(isProductWishlisted(id));
  }, [id]);

  const handleWishlistToggle = () => {
    if (!id) return;

    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }

    setIsWishlisted(isProductWishlisted(id));
  };

  if (!product) return <div className="text-center py-10">Loading...</div>;

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="w-full h-[500px] relative rounded-lg overflow-hidden shadow-lg">
            <Image src={product.image?.asset.url} alt={product.name} fill className="object-cover" />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold">{product.name}</h1>
              <p className="text-gray-500 mt-8">${product.price}</p>
              <p className="mt-6 text-gray-700 leading-relaxed">{product.description}</p>

              {product.colors?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Select Color</h3>
                  <div className="flex gap-3">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        className={`w-12 h-12 rounded-full border-2 ${selectedColor === color ? "ring-2 ring-offset-2 ring-black border-black" : "border-gray-300"
                          }`}
                        style={{ backgroundColor: colorMap[color] || "gray" }} // Fallback to gray if color is missing in map
                        onClick={() => setSelectedColor(color)}
                      />
                    ))}
                  </div>
                </div>
              )}


              {/* ✅ Fixed Size Selection */}
              {product.sizes?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Choose Size</h3>
                  <div className="flex gap-3">
                    {product.sizes.map((size, index) => (
                      <button
                        key={index}
                        className={`px-6 py-2 rounded-lg border ${selectedSize === size
                          ? "bg-black text-white border-black"
                          : "border-gray-300 hover:border-black"
                          }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <button className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition shadow-md">
                Add to Cart
              </button>

              <button onClick={handleWishlistToggle} className="transition">
                {isWishlisted ? <Wishlisted className="w-6 h-6" /> : <Heart className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        <ReviewsSection />
        <ProductSection heading="Related Products" products={relatedProducts} showViewAll={false} />
      </main>
    </>
  );
}
