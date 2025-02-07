"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { fetchProductById } from "@/app/utils/api";
import { Product } from "@/app/utils/types";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal } = useCart();
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadCart = async () => {
      if (items.length === 0) {
        setCartProducts([]);
        return;
      }
      try {
        const products = await Promise.all(
          items.map(async (cartItem) => {
            const product = await fetchProductById(cartItem.id);
            return Array.isArray(product) ? product[0] : product;
          })
        );
        setCartProducts(products);
      } catch (error) {
        console.error("Error fetching cart products:", error);
      }
    };
    loadCart();
  }, [items]);

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen flex flex-col">
        <main className="max-w-[1600px] mx-auto px-6 sm:px-12 py-12 flex-grow">
          {cartProducts.length === 0 ? (
            <div className="flex flex-col items-center text-center py-16">
              <p className="text-2xl font-semibold mb-4">Your cart is empty</p>
              <p className="text-gray-600 mb-8">Add items to your cart to see them here.</p>
              <Link href="/shop">
                <button className="px-8 py-3 bg-black text-white rounded-md hover:bg-black transition">
                  Continue Shopping
                </button>
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
              <div className="hidden md:grid grid-cols-[3fr,1fr,1fr,1fr] gap-8 pb-4 border-b border-gray-200 w-full">
                <div>Product</div>
                <div className="text-center">Quantity</div>
                <div className="text-right">Price</div>
                <div className="text-right">Total</div>
              </div>

              {cartProducts.map((product, index) => (
                <div key={product._id} className="grid md:grid-cols-[3fr,1fr,1fr,1fr] gap-8 py-8 border-b border-gray-200 w-full">
                  <div className="flex gap-6">
                    <Link href={`/product/${product._id}`}>
                      <div className="relative w-[120px] h-[120px]">
                        <Image src={product.image.asset.url} alt={product.name} fill className="object-cover rounded-md" />
                      </div>
                    </Link>
                    <div>
                      <h3 className="text-lg font-medium">{product.name}</h3>
                      <button
                        onClick={() => removeItem(product._id)}
                        className="text-red-500 text-sm mt-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => updateQuantity(product._id, items[index].quantity - 1)}
                      className="px-3 py-1 bg-gray-200 rounded-md"
                    >
                      -
                    </button>
                    <span className="mx-4">{items[index].quantity}</span>
                    <button
                      onClick={() => updateQuantity(product._id, items[index].quantity + 1)}
                      className="px-3 py-1 bg-gray-200 rounded-md"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right font-semibold">${product.price.toFixed(2)}</div>
                  <div className="text-right font-semibold">${(product.price * items[index].quantity).toFixed(2)}</div>
                </div>
              ))}

              <div className="flex justify-end mt-8 text-xl font-semibold">
                Subtotal: ${getSubtotal().toFixed(2)}
              </div>

              <div className="flex justify-end mt-4">
                <button className="px-8 py-3 bg-black text-white rounded-md hover:bg-black transition">
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}