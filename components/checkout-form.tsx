"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PieceImage } from "@/components/piece-image";
import { ArrowRight } from "@/components/icons";
import { useBag } from "@/lib/bag";
import { rupees } from "@/lib/catalog";
import { placeOrder, type CheckoutState } from "@/lib/checkout/actions";

const EMPTY: CheckoutState = {};

/* Checkout works the same whether or not anyone is signed in — that is the
   point of guest mode. A signed-in shopper gets their details filled in and the
   order attached to their account; a guest types the same fields and leaves
   with a link only they hold. */
export function CheckoutForm({
  name,
  email,
  phone,
  signedIn,
}: {
  name: string;
  email: string;
  phone: string;
  signedIn: boolean;
}) {
  const { items, subtotal, count, ready, clear } = useBag();
  const [state, action, pending] = useActionState(placeOrder, EMPTY);
  const router = useRouter();

  const placed = state.placed;

  /* Empty the bag only once the order is definitely recorded, and send them to
     the confirmation with the token that proves the order is theirs. */
  useEffect(() => {
    if (!placed) return;
    clear();
    router.replace(
      `/order/${placed.orderNumber}?token=${encodeURIComponent(placed.token)}`,
    );
  }, [placed, clear, router]);

  if (!ready) {
    return <p className="text-base text-plum/75">Reading your bag…</p>;
  }

  if (items.length === 0 && !placed) {
    return (
      <div className="card p-8">
        <p className="display-3">Nothing to check out.</p>
        <p className="mt-4 text-base text-plum/75">
          Your bag is empty, so there is nothing to send anywhere yet.
        </p>
        <Link href="/shop" className="btn btn-primary mt-7 px-7 py-4 text-sm">
          Browse the shop
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  if (placed) {
    return <p className="text-base text-plum/75">Order placed. Taking you to it…</p>;
  }

  return (
    <form action={action} className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:gap-10">
      {/* the bag, as slugs and quantities only — the server prices it */}
      <input
        type="hidden"
        name="lines"
        value={JSON.stringify(items.map((i) => ({ slug: i.piece.slug, qty: i.qty })))}
      />

      <div className="card p-6 sm:p-8">
        <h2 className="display-3">Where it goes</h2>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="customer_name" className="field-label">
              Name
            </label>
            <input
              id="customer_name"
              name="customer_name"
              required
              defaultValue={name}
              autoComplete="name"
              className="field mt-2"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="email" className="field-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              defaultValue={email}
              autoComplete="email"
              className="field mt-2"
              placeholder="you@example.com"
            />
            <p className="mt-2 text-sm text-plum/75">
              Where the order confirmation goes.
            </p>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="address_line" className="field-label">
              Address
            </label>
            <textarea
              id="address_line"
              name="address_line"
              required
              rows={3}
              autoComplete="street-address"
              className="field mt-2 resize-y"
              placeholder="Flat, building, street"
            />
          </div>

          <div>
            <label htmlFor="city" className="field-label">
              City
            </label>
            <input
              id="city"
              name="city"
              required
              autoComplete="address-level2"
              className="field mt-2"
            />
          </div>

          <div>
            <label htmlFor="postcode" className="field-label">
              PIN code
            </label>
            <input
              id="postcode"
              name="postcode"
              inputMode="numeric"
              autoComplete="postal-code"
              className="field mt-2"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="phone" className="field-label">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              defaultValue={phone}
              autoComplete="tel"
              className="field mt-2"
              placeholder="Optional"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="note" className="field-label">
              Anything to add
            </label>
            <textarea
              id="note"
              name="note"
              rows={2}
              className="field mt-2 resize-y"
              placeholder="Optional"
            />
          </div>
        </div>

        {!signedIn && (
          <p className="mt-6 border-t border-line pt-5 text-sm text-plum/75">
            Checking out as a guest. You will get a link to follow this order.{" "}
            <Link
              href="/join?next=/checkout"
              className="underline underline-offset-4 hover:text-orange"
            >
              Create an account
            </Link>{" "}
            if you would rather keep your orders in one place.
          </p>
        )}
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="card p-6 sm:p-7">
          <h2 className="display-3">Your bag</h2>

          <ul className="mt-5 space-y-3">
            {items.map(({ piece, qty }) => (
              <li key={piece.slug} className="flex items-center gap-3">
                <PieceImage
                  piece={piece}
                  className="h-12 w-12 shrink-0"
                  pad="p-1.5"
                  sizes="48px"
                />
                <span className="min-w-0 flex-1 text-sm">
                  {piece.name}
                  {qty > 1 && <span className="text-plum/72"> × {qty}</span>}
                </span>
                <span className="text-sm tabular-nums">
                  {rupees(piece.price * qty)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-6 border-t border-line pt-4 text-sm">
            <div className="flex justify-between gap-6 py-2">
              <dt className="text-plum/75">Pieces</dt>
              <dd className="tabular-nums">{count}</dd>
            </div>
            <div className="flex justify-between gap-6 border-t border-line py-2">
              <dt className="text-plum/75">Delivery</dt>
              <dd className="text-plum/72">Not yet published</dd>
            </div>
            <div className="flex items-baseline justify-between gap-6 border-t border-line pb-1 pt-3">
              <dt className="font-medium">Total</dt>
              <dd className="display-3">{rupees(subtotal)}</dd>
            </div>
          </dl>

          <button
            type="submit"
            disabled={pending}
            className="btn btn-primary mt-7 w-full px-7 py-4 text-sm disabled:cursor-wait disabled:opacity-70"
          >
            {pending ? "Placing your order…" : "Place order"}
          </button>

          {/* the total is confirmed by the server; if the two ever disagree the
              server's is the one that counts, and the buyer should know that */}
          <p className="label mt-2.5 block text-center text-plum/72">
            No card taken — payment arranged after
          </p>

          {state.error && (
            <p
              role="alert"
              className="mt-4 rounded-control bg-alert/8 px-3.5 py-2.5 text-sm text-alert"
            >
              {state.error}
            </p>
          )}
        </div>
      </aside>
    </form>
  );
}
