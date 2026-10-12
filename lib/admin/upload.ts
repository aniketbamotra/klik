import { createClient } from "@/lib/supabase/client";
import { IMAGE_BUCKET } from "@/lib/images";

/* Photographs go from the browser straight to Supabase Storage. Routing them
   through a server action capped them at Next's 1 MB action body limit — less
   than most phone photographs — and Netlify's function payload limit sits behind
   that. The storage RLS policies already restrict writes to admins, so the
   browser's own session is the right credential. */

export const MAX_MB = 5; // matches the bucket's own limit, so the check agrees with the server
export const OK_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

const EXTENSION: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

/** Why this file cannot be uploaded, or null if it can. */
export function checkPhoto(file: File): string | null {
  if (!OK_TYPES.includes(file.type)) return `${file.name} is not a JPG, PNG, WebP or AVIF.`;
  if (file.size > MAX_MB * 1024 * 1024) return `${file.name} is over ${MAX_MB} MB.`;
  return null;
}

/** Uploads one photograph under the product's folder and returns its path. */
export async function uploadPhoto(productId: string, file: File): Promise<string> {
  const path = `${productId}/${crypto.randomUUID()}.${EXTENSION[file.type] ?? "jpg"}`;
  const { error } = await createClient()
    .storage.from(IMAGE_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw new Error(`Could not upload ${file.name}: ${error.message}`);
  return path;
}

export async function removePhoto(path: string) {
  await createClient().storage.from(IMAGE_BUCKET).remove([path]);
}
