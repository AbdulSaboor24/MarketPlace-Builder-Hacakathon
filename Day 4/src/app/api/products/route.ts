import { NextResponse } from "next/server.js";
import client from "../../../../sanityClient.js";

export async function GET() {
  const query = `*[_type == "products"] {
    _id,
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
  const products = await client.fetch(query);
  return NextResponse.json(products);
}