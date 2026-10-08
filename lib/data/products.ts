import "server-only";

import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { toPiece, type Piece, type ProductRow } from "@/lib/catalog";
import type { Tables } from "@/lib/supabase/database.types";

/* Reads of the catalogue. RLS already limits anonymous and signed-in shoppers to
   active products, so the storefront queries carry no status filter of their
   own — the database is the one making that call, not a where clause somebody
   could forget. The admin functions see everything, again because the policy
   says so and not because the query asks nicely. */

/* Photographs come back embedded rather than fetched per card: the shop grid
   renders fourteen pieces, and fourteen extra round trips to decide whether
   each one has an image is the N+1 this avoids. RLS exposes product_images to
   anon only for active products, so the embed needs no filter of its own. */
const STOREFRONT_COLUMNS =
  "id, slug, name, counter, good, scale, price, note, story, material, dimensions, stock, " +
  "images:product_images(path, alt, sort_order)";

/** Every piece on sale, in the order the shop wants them seen. */
export const listPieces = cache(async (): Promise<Piece[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(STOREFRONT_COLUMNS)
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) throw new Error(`Could not load the catalogue: ${error.message}`);
  return (data ?? []).map((row) => toPiece(row as unknown as ProductRow));
});

export const getPiece = cache(async (slug: string): Promise<Piece | null> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(STOREFRONT_COLUMNS)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(`Could not load that piece: ${error.message}`);
  return data ? toPiece(data as unknown as ProductRow) : null;
});

/* ------------------------------------------------------------------ admin -- */

export type AdminProduct = Tables<"products">;

/** Everything, including drafts and archived pieces. Admin-gated by RLS. */
export const listAllProducts = cache(async (): Promise<AdminProduct[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) throw new Error(`Could not load products: ${error.message}`);
  return data ?? [];
});

export const getProductBySlug = cache(async (slug: string): Promise<AdminProduct | null> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(`Could not load that product: ${error.message}`);
  return data;
});

export type { ProductImage } from "@/lib/images";
import type { ProductImage } from "@/lib/images";

export const listProductImages = cache(async (productId: string): Promise<ProductImage[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("product_images")
    .select("*")
    .eq("product_id", productId)
    .order("sort_order", { ascending: true });

  if (error) throw new Error(`Could not load photographs: ${error.message}`);
  return data ?? [];
});
