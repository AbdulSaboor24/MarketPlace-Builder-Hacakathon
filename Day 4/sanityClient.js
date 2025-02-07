import { createClient } from "@sanity/client"
import dotenv from "dotenv";

dotenv.config({ path: `.env.local` });

const client = createClient({
  // projectId: process.env.NEXT_SANITY_PROJECTID,
  projectId: "xg4cf9bm",
  dataset: "production",
  useCdn: false,
  apiVersion: "2021-10-21",
})

export default client