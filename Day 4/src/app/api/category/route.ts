import { NextResponse } from "next/server.js";
import client from "../../../../sanityClient.js";

export async function GET() {
  const query = `*[_type == "products"] {
    category
  }`;
  const products = await client.fetch(query);
  return NextResponse.json(products);
}