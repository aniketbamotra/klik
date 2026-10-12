"use server";

import { redirect } from "next/navigation";
import { refresh } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/data/session";
import type { Enums, TablesInsert } from "@/lib/supabase/database.types";

/* Everything the shop owner can change.

   Each action calls requireAdmin() first. That is not the only guard — every
   one of these writes also has to get past an RLS policy that asks the same
   question of the database — but it is the one that gives a customer who wanders
   into /admin a redirect instead of a stack trace. */

export type ActionState = { error?: string; notice?: string };

const BUCKET = "product-images";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

/** The description field is one textarea; blank lines separate paragraphs. */
const toStory = (value: string) =>
  value
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

function readProduct(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const slug = slugify(String(formData.get("slug") ?? "") || name);
  const price = Math.max(0, Math.floor(Number(formData.get("price") ?? 0)));
  const stock = Math.max(0, Math.floor(Number(formData.get("stock") ?? 0)));
  const counter = String(formData.get("counter") ?? "jewellery") as Enums<"counter">;
  const status = String(formData.get("status") ?? "active") as Enums<"product_status">;

  return {
    name,
    slug,
    price,
    stock,
    counter,
    status,
    good: String(formData.get("good") ?? "hoops").trim() || "hoops",
    scale: Math.min(2, Math.max(0.1, Number(formData.get("scale") ?? 0.85))),
    note: String(formData.get("note") ?? "").trim(),
    material: String(formData.get("material") ?? "").trim(),
    dimensions: String(formData.get("dimensions") ?? "").trim(),
    story: toStory(String(formData.get("story") ?? "")),
  } satisfies TablesInsert<"products">;
}

export async function saveProduct(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();

  const existingSlug = String(formData.get("existing_slug") ?? "");
  const product = readProduct(formData);

  if (!product.name) return { error: "A piece needs a name." };
  if (!product.slug) return { error: "A piece needs a handle for its web address." };
  if (!Number.isFinite(product.price)) return { error: "Enter a price in whole rupees." };

  const supabase = await createClient();

  if (existingSlug) {
    const { error } = await supabase
      .from("products")
      .update(product)
      .eq("slug", existingSlug);

    if (error) return { error: friendly(error.message) };

    // the handle is part of the URL, so an edit that changes it moves the page
    if (product.slug !== existingSlug) redirect(`/admin/products/${product.slug}`);
    refresh();
    return { notice: "Saved." };
  }

  /* The form generated this id so photographs could upload into the piece's
     folder before it existed. Only a well-formed uuid is accepted. */
  const id = String(formData.get("product_id") ?? "");
  if (!UUID.test(id)) return { error: "The form is out of date. Reload the page and try again." };

  const { error } = await supabase.from("products").insert({ ...product, id });
  if (error) return { error: friendly(error.message) };

  const paths = formData.getAll("image_path").map(String);
  const alts = formData.getAll("image_alt").map(String);
  if (paths.length > 0) {
    const { error: imageError } = await insertImages(supabase, id, paths, 0, alts);
    // the piece exists either way; say so on its page rather than here, where
    // a retry would try to create it twice
    if (imageError) redirect(`/admin/products/${product.slug}?photos=failed`);
  }

  redirect(`/admin/products/${product.slug}`);
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();
  const slug = String(formData.get("slug") ?? "");
  if (!slug) return;

  const supabase = await createClient();
  /* Archiving rather than deleting: order_items keep a product_id, and past
     orders should still point at the piece that was bought. Archived pieces
     fall out of the storefront because RLS only exposes active ones. */
  await supabase.from("products").update({ status: "archived" }).eq("slug", slug);

  redirect("/admin/products");
}

export async function setStock(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();

  const slug = String(formData.get("slug") ?? "");
  const stock = Math.max(0, Math.floor(Number(formData.get("stock") ?? 0)));
  if (!slug) return { error: "Which piece?" };

  const supabase = await createClient();
  const { error } = await supabase.from("products").update({ stock }).eq("slug", slug);
  if (error) return { error: friendly(error.message) };

  refresh();
  return { notice: `Set to ${stock}.` };
}

export async function setOrderStatus(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();

  const orderNumber = String(formData.get("order_number") ?? "");
  const status = String(formData.get("status") ?? "") as Enums<"order_status">;
  if (!orderNumber || !status) return { error: "Nothing to change." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("order_number", orderNumber);

  if (error) return { error: friendly(error.message) };

  refresh();
  return { notice: "Order updated." };
}

/* ---------------------------------------------------------- photographs -- */

/* The files themselves are uploaded from the browser straight to Storage (see
   lib/admin/upload.ts); these actions only record and arrange them. */

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

/** A path must sit in this product's own folder, as uploadPhoto writes it. */
const PHOTO_PATH = (productId: string) =>
  new RegExp(`^${productId}/[0-9a-f-]{36}\\.(jpg|png|webp|avif)$`);

async function insertImages(
  supabase: Awaited<ReturnType<typeof createClient>>,
  productId: string,
  paths: string[],
  firstOrder: number,
  alts: string[] = [],
): Promise<{ error: string | null }> {
  const valid = PHOTO_PATH(productId);
  if (!paths.every((p) => valid.test(p))) return { error: "That photograph was not uploaded here." };

  const { error } = await supabase.from("product_images").insert(
    paths.map((path, i) => ({
      product_id: productId,
      path,
      alt: (alts[i] ?? "").trim(),
      sort_order: firstOrder + i,
    })),
  );
  return { error: error ? friendly(error.message) : null };
}

/** Records photographs already uploaded to this product's folder. */
export async function attachProductImages(
  productId: string,
  paths: string[],
): Promise<ActionState> {
  await requireAdmin();
  if (!UUID.test(productId) || paths.length === 0) return { error: "Nothing to add." };

  const supabase = await createClient();

  /* Append rather than default to 0. With every row at 0 the "main" photograph
     was whichever the database happened to return first. */
  const { count } = await supabase
    .from("product_images")
    .select("id", { count: "exact", head: true })
    .eq("product_id", productId);

  const { error } = await insertImages(supabase, productId, paths, count ?? 0);
  if (error) {
    // do not leave orphans in the bucket if the rows could not be written
    await supabase.storage.from(BUCKET).remove(paths);
    return { error };
  }

  refresh();
  return {};
}

export async function setImageAlt(id: string, alt: string): Promise<ActionState> {
  await requireAdmin();

  const supabase = await createClient();
  const { error } = await supabase
    .from("product_images")
    .update({ alt: alt.trim() })
    .eq("id", id);
  if (error) return { error: friendly(error.message) };

  return {};
}

/** Promote one photograph to the front of the set. */
export async function makeImageMain(id: string, productId: string) {
  await requireAdmin();

  const supabase = await createClient();

  const { data: images } = await supabase
    .from("product_images")
    .select("id")
    .eq("product_id", productId)
    .order("sort_order", { ascending: true });

  if (!images) return;

  /* Renumber the whole set rather than nudging one value: giving the chosen
     row a lower number would leave the others' ties intact, and "main" would
     go back to being whichever the database felt like returning first. */
  const ordered = [id, ...images.map((i) => i.id).filter((x) => x !== id)];
  await Promise.all(
    ordered.map((imageId, index) =>
      supabase.from("product_images").update({ sort_order: index }).eq("id", imageId),
    ),
  );

  refresh();
}

export async function deleteProductImage(id: string, path: string) {
  await requireAdmin();

  const supabase = await createClient();
  const { error } = await supabase.from("product_images").delete().eq("id", id);
  if (!error && path) await supabase.storage.from(BUCKET).remove([path]);

  refresh();
}

/** Postgres speaks in constraint names; the owner should not have to. */
function friendly(message: string) {
  if (message.includes("products_slug_key")) {
    return "Another piece already uses that handle.";
  }
  if (message.includes("row-level security")) {
    return "You do not have permission to change that.";
  }
  return message;
}
