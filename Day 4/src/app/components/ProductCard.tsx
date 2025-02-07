"use client";
import Link from "next/link";
import Image from "next/image";
import { Product } from "..//utils/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      href={`/product/${product._id}`}
      className="flex flex-col items-start transition-all hover:scale-[1.02]"
    >
      {/* Product Image */}
      <div className="bg-gray-100 rounded-lg w-full aspect-square overflow-hidden mb-3 shadow-sm hover:shadow-md transition-all">
        <Image
          src={product.image.asset.url}
          alt={product.name}
          width={295}
          height={295}
          className="w-full h-full object-contain hover:scale-105 transition-all duration-300"
        />
      </div>

      {/* Product Name */}
      <strong className="text-black text-base xl:text-lg line-clamp-2">{product.name}</strong>

      {/* Pricing */}
      <div className="mt-1 text-lg xl:text-xl font-semibold text-black">
        ${product.price}
      </div>
    </Link>
  );
};

export default ProductCard;