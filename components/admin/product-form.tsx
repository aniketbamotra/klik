"use client";

import Link from "next/link";
import { useActionState } from "react";
import { GoodFigure, GOODS } from "@/components/goods";
import { COUNTERS, asGood } from "@/lib/catalog";
import { saveProduct, deleteProduct, type ActionState } from "@/lib/admin/actions";
import type { AdminProduct } from "@/lib/data/products";

/* Photographs are deliberately not part of this form. Uploading needs a form of
   its own, forms cannot nest, and an upload should not have to wait for the
   rest of the piece to be valid. The edit page renders ImageUpload beside it. */

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
      {hint && <p className="adm-body mt-0.5 text-plum/70">{hint}</p>}
      <div className="mt-2">{children}</div>
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

export function ProductForm({ product }: { product?: AdminProduct }) {
  const editing = Boolean(product);
  const [state, action, pending] = useActionState(saveProduct, EMPTY);

  return (
    <form action={action} className="grid gap-5 lg:grid-cols-[1fr_20rem] lg:items-start">
      {/* the handle can be edited, so the row is found by the one it had */}
      {product && <input type="hidden" name="existing_slug" value={product.slug} />}

      <div className="space-y-5">
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
            hint="Used in the web address. Leave blank on a new piece and it is made from the name."
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

          <Field
            label="Description"
            htmlFor="story"
            hint="Describe the object and how its material behaves. Leave a blank line between paragraphs. Avoid claims about how it was made or where it came from until those are settled."
          >
            <textarea
              id="story"
              name="story"
              rows={6}
              className="adm-field resize-y"
              defaultValue={product?.story.join("\n\n")}
              placeholder="A small bell-shaped drop with seven tiny bells along its lower edge…"
            />
          </Field>
        </Section>

      </div>

      <div className="space-y-5 lg:sticky lg:top-24">
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
            hint="However you would describe it to a customer. Leave blank if unmeasured — the shop hides the row rather than saying so."
          >
            <input
              id="dimensions"
              name="dimensions"
              className="adm-field"
              defaultValue={product?.dimensions}
              placeholder="8 cm across, 2 cm deep"
            />
          </Field>
        </Section>

        <Section
          title="Drawing"
          note="Which illustration stands in for this piece, and how large it sits in its tile."
        >
          <div className="flex items-center gap-4">
            <span className="h-16 w-16 shrink-0 rounded-md bg-adm-bg p-2">
              <GoodFigure
                good={asGood(product?.good ?? "hoops")}
                scale={Number(product?.scale ?? 0.85)}
              />
            </span>
            <div className="min-w-0 flex-1 space-y-3">
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
            </div>
          </div>
        </Section>

        <Section title="Price and stock">
          <Field label="Price" htmlFor="price" hint="In rupees, without decimals.">
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

          <Field label="Stock on hand" htmlFor="stock">
            <input
              id="stock"
              name="stock"
              type="number"
              min={0}
              className="adm-field"
              defaultValue={product?.stock ?? 0}
            />
          </Field>
        </Section>

        <div className="adm-card p-5">
          <div className="flex flex-col gap-2.5">
            <button
              type="submit"
              disabled={pending}
              className="adm-btn adm-btn-primary w-full"
            >
              {pending ? "Saving…" : editing ? "Save changes" : "Add product"}
            </button>
            <Link href="/admin/products" className="adm-btn adm-btn-secondary w-full">
              Cancel
            </Link>
          </div>

          {state.error && (
            <p role="alert" className="adm-body mt-3 text-alert">
              {state.error}
            </p>
          )}
          {state.notice && (
            <p role="status" className="adm-body mt-3 text-ok">
              {state.notice}
            </p>
          )}
        </div>

        {/* Withdrawing is its own form: it must not be a second submit button
            inside the one that saves. */}
        {editing && (
          <div className="adm-card p-5">
            <button
              type="submit"
              form="withdraw-piece"
              className="adm-btn adm-btn-danger w-full"
            >
              Withdraw from the shop
            </button>
            <p className="adm-label mt-3 block text-center text-plum/70">
              Archived, not deleted — past orders keep pointing at it
            </p>
          </div>
        )}
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
