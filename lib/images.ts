import type { Tables } from "@/lib/supabase/database.types";

/* Kept out of lib/data/products.ts because the admin's upload widget is a
   client component, and that module is server-only. Building this URL needs no
   session and makes no request — the bucket is public. */

export type ProductImage = Tables<"product_images">;

/** What the storefront needs of a photograph — no ids, no timestamps. */
export type PieceImage = { path: string; alt: string };

export const IMAGE_BUCKET = "product-images";

export function imageUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${IMAGE_BUCKET}/${path}`;
}
