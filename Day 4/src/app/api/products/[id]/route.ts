import { NextResponse } from "next/server";
import client from "../../../../../sanityClient.js";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Product ID not provided" }, { status: 400 });
  }

  const query = `*[_type == "products" && _id == $id] {
    name,
    price,
    category,
    colors,
    description,
    sizes,
    discountPercent,
    isNew,
    image {
      asset -> {
        url
      }
    }
  }`;

  try {
    const product = await client.fetch(query, { id: id });

    if (!product || product.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}