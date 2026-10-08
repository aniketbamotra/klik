"use client";

import { useActionState, useCallback, useEffect, useRef, useState } from "react";
import { Star, Trash, Upload } from "@/components/admin/icons";
import {
  uploadProductImage,
  deleteProductImage,
  makeImageMain,
  setImageAlt,
  type ActionState,
} from "@/lib/admin/actions";
import { imageUrl, type ProductImage } from "@/lib/images";

const EMPTY: ActionState = {};

const MAX_MB = 5; // matches the bucket's own limit, so the check agrees with the server
const OK_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

const kb = (n: number) =>
  n < 1024 * 1024 ? `${Math.round(n / 1024)} KB` : `${(n / 1024 / 1024).toFixed(1)} MB`;

/* Real picking, real previews, real validation — and the file now actually goes
   to Supabase Storage. The preview is checked here before the round trip so an
   oversized file is refused instantly rather than after an upload. Object URLs
   are revoked on unmount so a long editing session does not leak them.

   The edit page keys this on the number of stored photographs, so a successful
   upload remounts the widget and the staged preview clears itself — the server's
   list becomes the truth without an effect reaching in to reset state. */
export function ImageUpload({
  productId,
  images,
}: {
  productId: string;
  images: ProductImage[];
}) {
  const [staged, setStaged] = useState<{ file: File; url: string } | null>(null);
  const [over, setOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const [state, action, pending] = useActionState(uploadProductImage, EMPTY);

  useEffect(
    () => () => {
      if (staged) URL.revokeObjectURL(staged.url);
    },
    [staged],
  );

  const accept = useCallback((files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;

    if (!OK_TYPES.includes(file.type)) {
      setError(`${file.name} is not a JPG, PNG, WebP or AVIF.`);
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setError(`${file.name} is over ${MAX_MB} MB.`);
      return;
    }

    setError(null);
    setStaged({ file, url: URL.createObjectURL(file) });
  }, []);

  return (
    <div>
      <form action={action}>
        <input type="hidden" name="product_id" value={productId} />

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setOver(true);
          }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setOver(false);
            accept(e.dataTransfer.files);
            if (input.current) input.current.files = e.dataTransfer.files;
          }}
          className={`rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
            over
              ? "border-plum bg-orange/10"
              : "border-adm-line bg-adm-surface hover:border-plum/40"
          }`}
        >
          <Upload className="mx-auto h-6 w-6 text-plum/70" />
          <p className="adm-body mt-3 font-medium">
            Drop a photograph here, or{" "}
            <button
              type="button"
              onClick={() => input.current?.click()}
              className="underline underline-offset-2 hover:text-orange"
            >
              choose a file
            </button>
          </p>
          <p className="adm-body mt-1 text-plum/70">
            JPG, PNG, WebP or AVIF · up to {MAX_MB} MB
          </p>
          <input
            ref={input}
            name="file"
            type="file"
            accept={OK_TYPES.join(",")}
            className="sr-only"
            onChange={(e) => accept(e.target.files)}
          />
        </div>

        {staged && (
          <div className="mt-3 flex items-center gap-3 rounded-lg border border-adm-line p-3">
            {/* a blob preview is not a remote image; next/image would only get
                in the way here */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={staged.url}
              alt=""
              className="h-14 w-14 rounded-md object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="adm-body truncate">{staged.file.name}</p>
              <p className="adm-body text-plum/70">{kb(staged.file.size)}</p>
            </div>
            <button
              type="submit"
              disabled={pending}
              className="adm-btn adm-btn-primary shrink-0"
            >
              {pending ? "Uploading…" : "Upload"}
            </button>
          </div>
        )}
      </form>

      {(error || state.error) && (
        <p role="alert" className="adm-body mt-3 text-alert">
          {error ?? state.error}
        </p>
      )}

      {images.length > 0 && (
        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {images.map((image, i) => (
            <li key={image.id} className="adm-card overflow-hidden">
              <div className="relative aspect-square bg-adm-bg">
                {/* stored in a public bucket, served straight from Supabase */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl(image.path)}
                  alt={image.alt || ""}
                  className="h-full w-full object-cover"
                />
                {i === 0 && (
                  <span className="absolute left-2 top-2 rounded-full bg-plum px-2 py-1 text-xs font-medium text-cream">
                    Main
                  </span>
                )}
              </div>

              <div className="space-y-2.5 px-3 py-3">
                <AltField image={image} />

                <div className="flex items-center justify-between gap-2">
                  {/* the main photograph is what the shop leads with, so the
                      only ordering the owner actually needs is "this one" */}
                  {i === 0 ? (
                    <span className="adm-body text-plum/55">Shown first in the shop</span>
                  ) : (
                    <form action={makeImageMain}>
                      <input type="hidden" name="image_id" value={image.id} />
                      <input type="hidden" name="product_id" value={productId} />
                      <button
                        type="submit"
                        className="adm-body flex items-center gap-1.5 rounded-md px-1.5 py-1 text-plum/70 hover:bg-adm-bg hover:text-plum"
                      >
                        <Star className="h-4 w-4" />
                        Make main
                      </button>
                    </form>
                  )}

                  <form action={deleteProductImage}>
                    <input type="hidden" name="image_id" value={image.id} />
                    <input type="hidden" name="path" value={image.path} />
                    <button
                      type="submit"
                      aria-label="Remove this photograph"
                      className="rounded-md p-1.5 text-plum/70 hover:bg-alert/10 hover:text-alert"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p aria-live="polite" className="adm-body mt-3 text-plum/70">
        {images.length === 0
          ? "No photographs yet — the shop shows this piece's drawing until you add one."
          : `${images.length} photograph${images.length === 1 ? "" : "s"}. The shop leads with the main one.`}
      </p>
    </div>
  );
}

/* Alt text is what a screen reader and a failed image both fall back to, and it
   is the shop's own words for the piece — worth a field rather than a guess.
   Left blank, the storefront uses the product name. */
function AltField({ image }: { image: ProductImage }) {
  const [state, action, pending] = useActionState(setImageAlt, EMPTY);

  return (
    <form action={action} className="flex items-end gap-2">
      <input type="hidden" name="image_id" value={image.id} />
      <div className="min-w-0 flex-1">
        <label htmlFor={`alt-${image.id}`} className="adm-body block text-plum/70">
          Describe this photograph
        </label>
        <input
          id={`alt-${image.id}`}
          name="alt"
          defaultValue={image.alt}
          className="adm-field mt-1.5"
          placeholder="Oxidised brass jhumka, held in a hand"
        />
      </div>
      <button type="submit" disabled={pending} className="adm-btn adm-btn-secondary shrink-0">
        {pending ? "Saving…" : "Save"}
      </button>
      {state.error && (
        <span role="alert" className="adm-body text-alert">
          {state.error}
        </span>
      )}
    </form>
  );
}
