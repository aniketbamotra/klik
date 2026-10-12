"use client";

import Link from "next/link";
import { startTransition, useActionState, useState } from "react";
import { GoodFigure, GOODS } from "@/components/goods";
import { DraftPhotos, ProductPhotos, type Draft } from "@/components/admin/photos";
import { removePhoto, uploadPhoto } from "@/lib/admin/upload";
import { COUNTERS, asGood } from "@/lib/catalog";
import { saveProduct, deleteProduct, type ActionState } from "@/lib/admin/actions";
import type { AdminProduct } from "@/lib/data/products";
import type { ProductImage } from "@/lib/images";

/* Photographs are part of this form on both pages, uploaded from the browser
   straight to Storage — the form itself only ever carries their paths. On the
   edit page they save as they change; on a new piece they upload when "Add
   product" is pressed, just before the fields are saved. See
   components/admin/photos.tsx for why none of that can be a nested form. */

const EMPTY: ActionState = {};

const GOOD_KEYS = Object.keys(GOODS);

function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="adm-body block font-medium">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {hint && <p className="adm-body mt-1.5 text-plum/70">{hint}</p>}
    </div>
  );
}

function Section({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="adm-card p-5 sm:p-6">
      <h2 className="adm-h2">{title}</h2>
      {note && <p className="adm-body mt-1 text-plum/70">{note}</p>}
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  );
}

export function ProductForm(
  props:
    | { product: AdminProduct; images: ProductImage[] }
    | { draftId: string },
) {
  const product = "product" in props ? props.product : undefined;
  const [state, action, pending] = useActionState(saveProduct, EMPTY);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  /* New piece: upload the waiting photographs first, then save the fields with
     their paths. The browser has already enforced the required fields by the
     time this runs. Photographs uploaded on an earlier attempt keep their path,
     so retrying after a failed save (a taken handle, say) does not upload them
     again. */
  async function addWithPhotos(event: React.FormEvent<HTMLFormElement>) {
    if (!("draftId" in props)) return; // the edit page submits normally
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const productId = props.draftId;

    const waiting = drafts.filter((d) => !d.path);
    const uploaded = new Map<string, string>();
    setUploadError(null);

    if (waiting.length > 0) {
      setProgress({ done: 0, total: waiting.length });
      const results = await Promise.allSettled(
        waiting.map((d) =>
          uploadPhoto(productId, d.file).then((path) => {
            setProgress((p) => p && { ...p, done: p.done + 1 });
            return path;
          }),
        ),
      );
      setProgress(null);

      const failed = results.find((r) => r.status === "rejected");
      if (failed) {
        // all or nothing: do not keep half a set nobody asked for
        results.forEach((r) => r.status === "fulfilled" && removePhoto(r.value));
        setUploadError(`${(failed.reason as Error).message} Nothing was saved — try again.`);
        return;
      }

      results.forEach((r, i) => {
        if (r.status === "fulfilled") uploaded.set(waiting[i].key, r.value);
      });
      setDrafts((all) =>
        all.map((d) => (uploaded.has(d.key) ? { ...d, path: uploaded.get(d.key) } : d)),
      );
    }

    // display order is sort order — the first is the main photograph
    for (const d of drafts) {
      formData.append("image_path", d.path ?? uploaded.get(d.key)!);
      formData.append("image_alt", d.alt);
    }
    startTransition(() => action(formData));
  }

  const uploading = progress !== null;
  const message = uploadError ?? state.error;

  return (
    <form action={action} onSubmit={addWithPhotos} className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
      {/* the handle can be edited, so the row is found by the one it had */}
      {product && <input type="hidden" name="existing_slug" value={product.slug} />}
      {"draftId" in props && <input type="hidden" name="product_id" value={props.draftId} />}

      <div className="min-w-0 space-y-5">
        <Section title="The piece">
          <Field label="Name" htmlFor="name">
            <input
              id="name"
              name="name"
              required
              className="adm-field"
              defaultValue={product?.name}
              placeholder="Little Jhumka"
            />
          </Field>

          <Field
            label="Handle"
            htmlFor="slug"
            hint={
              product
                ? "Used in the web address. Changing it moves the page."
                : "Used in the web address. Leave blank and it is made from the name."
            }
          >
            <input
              id="slug"
              name="slug"
              className="adm-field"
              defaultValue={product?.slug}
              placeholder="little-jhumka"
            />
          </Field>

          <Field label="Short line" htmlFor="note" hint="One sentence, shown under the name.">
            <input
              id="note"
              name="note"
              className="adm-field"
              defaultValue={product?.note}
              placeholder="Seven bells. You will hear yourself arrive."
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Material" htmlFor="material">
              <input
                id="material"
                name="material"
                className="adm-field"
                defaultValue={product?.material}
                placeholder="Brass, oxidised"
              />
            </Field>

            <Field
              label="Dimensions"
              htmlFor="dimensions"
              hint="As you would tell a customer. Blank hides the row."
            >
              <input
                id="dimensions"
                name="dimensions"
                className="adm-field"
                defaultValue={product?.dimensions}
                placeholder="8 cm across, 2 cm deep"
              />
            </Field>
          </div>

          <Field
            label="Description"
            htmlFor="story"
            hint="Describe the object and how its material behaves. Leave a blank line between paragraphs. Avoid claims about how it was made or where it came from until those are settled."
          >
            <textarea
              id="story"
              name="story"
              rows={7}
              className="adm-field resize-y"
              defaultValue={product?.story.join("\n\n")}
              placeholder="A small bell-shaped drop with seven tiny bells along its lower edge…"
            />
          </Field>
        </Section>

        <Section title="Photographs">
          {"draftId" in props ? (
            <DraftPhotos drafts={drafts} setDrafts={setDrafts} disabled={uploading || pending} />
          ) : (
            <ProductPhotos productId={props.product.id} images={props.images} />
          )}
        </Section>
      </div>

      <div className="min-w-0 space-y-5">
        <Section title="Placement">
          <Field label="Counter" htmlFor="counter">
            <select
              id="counter"
              name="counter"
              className="adm-field"
              defaultValue={product?.counter ?? "jewellery"}
            >
              {COUNTERS.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.title}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label="Visibility"
            htmlFor="status"
            hint="Only active pieces appear in the shop."
          >
            <select
              id="status"
              name="status"
              className="adm-field"
              defaultValue={product?.status ?? "active"}
            >
              <option value="active">Active — in the shop</option>
              <option value="draft">Draft — hidden</option>
              <option value="archived">Archived — withdrawn</option>
            </select>
          </Field>
        </Section>

        <Section title="Price and stock">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Price (₹)" htmlFor="price">
              <input
                id="price"
                name="price"
                type="number"
                min={0}
                step={10}
                required
                className="adm-field"
                defaultValue={product?.price}
                placeholder="1240"
              />
            </Field>

            <Field label="In stock" htmlFor="stock">
              <input
                id="stock"
                name="stock"
                type="number"
                min={0}
                className="adm-field"
                defaultValue={product?.stock ?? 0}
              />
            </Field>
          </div>
          <p className="adm-body -mt-2 text-plum/70">Whole rupees, no decimals.</p>
        </Section>

        <Section
          title="Drawing"
          note="Stands in for the piece wherever it has no photograph."
        >
          <div className="grid grid-cols-[4rem_minmax(0,1fr)] items-end gap-4">
            <span className="block h-16 w-16 rounded-md bg-adm-bg p-2">
              <GoodFigure
                good={asGood(product?.good ?? "hoops")}
                scale={Number(product?.scale ?? 0.85)}
              />
            </span>
            <Field label="Illustration" htmlFor="good">
              <select
                id="good"
                name="good"
                className="adm-field"
                defaultValue={product?.good ?? "hoops"}
              >
                {GOOD_KEYS.map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Scale" htmlFor="scale" hint="0.6 for a stud, 1 for a mirror.">
            <input
              id="scale"
              name="scale"
              type="number"
              min={0.1}
              max={2}
              step={0.01}
              className="adm-field"
              defaultValue={product?.scale ?? 0.85}
            />
          </Field>
        </Section>

        {/* Withdrawing is its own form: it must not be a second submit button
            inside the one that saves. */}
        {product && (
          <div className="adm-card p-5">
            <button
              type="submit"
              form="withdraw-piece"
              className="adm-btn adm-btn-danger w-full"
            >
              Withdraw from the shop
            </button>
            <p className="adm-body mt-2.5 text-center text-plum/70">
              Archived, not deleted — past orders keep pointing at it.
            </p>
          </div>
        )}
      </div>

      {/* Kept in reach however long the form gets. */}
      <div className="sticky bottom-0 z-20 -mx-4 flex flex-wrap items-center gap-3 border-t border-adm-line bg-adm-surface/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:col-span-2">
        <div className="adm-body min-w-0 flex-1" aria-live="polite">
          {uploading ? (
            <p className="text-plum/70">
              Uploading photographs {Math.min(progress.done + 1, progress.total)} of {progress.total}…
            </p>
          ) : message ? (
            <p role="alert" className="text-alert">{message}</p>
          ) : state.notice ? (
            <p role="status" className="text-ok">{state.notice}</p>
          ) : null}
        </div>
        <Link href="/admin/products" className="adm-btn adm-btn-secondary">
          Cancel
        </Link>
        <button
          type="submit"
          disabled={pending || uploading}
          className="adm-btn adm-btn-primary"
        >
          {uploading ? "Uploading…" : pending ? "Saving…" : product ? "Save changes" : "Add product"}
        </button>
      </div>
    </form>
  );
}

/* Rendered by the edit page outside the main form, since forms cannot nest. */
export function WithdrawForm({ slug }: { slug: string }) {
  return (
    <form id="withdraw-piece" action={deleteProduct} className="hidden">
      <input type="hidden" name="slug" value={slug} />
    </form>
  );
}
