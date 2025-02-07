"use client";
import { useState } from "react";
import { Product } from "../utils/types";

const Cart = () => {
  const [cart, setCart] = useState<Product[]>([]);

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold">Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((product) => (
            <div key={product._id} className="border-b py-4">
              <p>{product.name} - ${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;