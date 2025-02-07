"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import { getWishlist } from "@/app/utils/wishlist";
import { fetchProductById } from "@/app/utils/api";
import { Product } from "@/app/utils/types";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    const loadWishlist = async () => {
      const productIds = getWishlist();
      if (productIds.length === 0) {
        setWishlist([]);
        return;
      }

      try {
        const products = await Promise.all(
          productIds.map(async (id) => {
            if (typeof id !== "string") return null;
            const product = await fetchProductById(id);
            return Array.isArray(product) ? product[0] : product;
          })
        );

        setWishlist(products.filter((product): product is Product => product !== null));
      } catch (error) {
        console.error("Error fetching wishlist products:", error);
      }
    };

    loadWishlist();
  }, []);

  const handleAddAllToCart = () => {
    alert("All items added to cart!");
  };

  const truncateDescription = (text: string, length: number) => {
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen flex flex-col">
        <main className="max-w-[1600px] mx-auto px-6 sm:px-12 py-12 flex-grow">

          {wishlist.length === 0 ? (
            <div className="flex flex-col items-center text-center py-16">
              <p className="text-2xl font-semibold mb-4">Your wishlist is empty</p>
              <p className="text-gray-600 mb-8">
                Add items to your wishlist to see them here. Start shopping now!
              </p>
              <Link href="/shop">
                <button className="px-8 py-3 bg-black text-white rounded-md hover:bg-black transition">
                  Continue Shopping
                </button>
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
              <div className="hidden md:grid grid-cols-[4fr,1fr] gap-8 pb-4 border-b border-gray-200 w-full">
                <div>Product</div>
                <div className="text-right">Price</div>
              </div>

              {wishlist.map((product) => (
                <div key={product._id} className="grid md:grid-cols-[4fr,1fr] gap-8 py-8 border-b border-gray-200 w-full">
                  <div className="flex gap-6 w-full">
                    <Link href={`/product/${product._id}`}>
                      <div className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px]">
                        <Image src={product.image.asset.url} alt={product.name} fill className="object-cover rounded-md" />
                      </div>
                    </Link>
                    <div className="max-w-[500px]"> {/* Increased max width */}
                      <h3 className="text-lg font-medium">{product.name}</h3>
                      <p className="text-gray-600 text-sm pt-5">
                        {truncateDescription(product.description ?? "", 100)}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end items-start mt-4 md:mt-0 font-semibold">${product.price.toFixed(2)}</div>
                </div>
              ))}
              <div className="flex justify-end mt-8">
                <button onClick={handleAddAllToCart} className="px-6 py-3 bg-black text-white rounded-md hover:bg-black transition">
                  Add All to Cart
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}