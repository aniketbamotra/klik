"use client";

import Link from "next/link";
import { GoodFigure } from "@/components/goods";
import { PieceImage } from "@/components/piece-image";
import { ArrowRight, Bag as BagIcon, Shield } from "@/components/icons";
import { useBag, useCatalog } from "@/lib/bag";
import { COUNTERS, capitalise, priceFloor, rupees, spell } from "@/lib/catalog";

export default function BagPage() {
  const { items, subtotal, count, setQty, remove, ready, overstocked } = useBag();
  const pieces = useCatalog();

  return (
    <section className="relative overflow-hidden">
      <span
        className="haze -left-40 -top-24 h-[28rem] w-[28rem] bg-haze opacity-45"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1240px] px-4 py-12 sm:px-6 md:py-16">
        <h1 className="display-1">Your bag.</h1>

        {/* until the stored bag has been read, commit to neither state */}
        {!ready ? (
          <p className="mt-6 text-base text-plum/75">Reading your bag…</p>
        ) : items.length === 0 ? (
          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
            <div className="card flex flex-col justify-center p-8 sm:p-12">
              <p className="display-2">Nothing in it yet.</p>
              <p className="mt-5 max-w-[40ch] text-base leading-relaxed text-plum/75">
                {capitalise(spell(pieces.length))} pieces in the shop, from{" "}
                {rupees(priceFloor(pieces))}.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/shop" className="btn btn-primary px-7 py-4 text-sm">
                  Browse the shop
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/search" className="btn btn-quiet px-6 py-4 text-sm">
                  Search
                </Link>
              </div>
            </div>

            {/* the two counters, so an empty bag is a doorway */}
            <div className="grid gap-6 sm:grid-cols-2 lg:gap-6">
              {COUNTERS.map((c) => {
                const list = pieces.filter((p) => p.counter === c.key);
                return (
                  <Link
                    key={c.key}
                    href={`/shop/${c.key}`}
                    className="group/card block"
                  >
                    <div className="card flex h-full flex-col p-5">
                      <div className="tile flex aspect-[4/3] items-end justify-center gap-0 overflow-hidden px-3 pb-3 pt-4">
                        {list.slice(0, 3).map((p, i) => (
                          <div
                            key={p.slug}
                            className={
                              i === 1
                                ? "z-10 h-[104%] w-[42%] -translate-y-1"
                                : "h-[82%] w-[36%] translate-y-2"
                            }
                          >
                            <GoodFigure
                              good={p.good}
                              scale={Math.min(1, p.scale + 0.18)}
                              label={`${p.name} — illustration`}
                            />
                          </div>
                        ))}
                      </div>
                      <p className="display-3 mt-5">{c.title}</p>
                      <p className="mt-2 flex items-center gap-2 text-sm text-plum/75">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange" />
                        {list.length} pieces
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_22rem] lg:gap-10">
            <ul className="space-y-4">
              {items.map(({ piece, qty }) => (
                <li key={piece.slug} className="card p-4 sm:p-5">
                  <div className="flex gap-4 sm:gap-6">
                    <Link
                      href={`/piece/${piece.slug}`}
                      className="w-24 shrink-0 sm:w-32"
                    >
                      <PieceImage
                        piece={piece}
                        className="aspect-square"
                        pad="p-3 sm:p-4"
                        sizes="(min-width: 640px) 8rem, 6rem"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
                      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                        <div className="min-w-0">
                          <Link
                            href={`/piece/${piece.slug}`}
                            className="text-base font-medium hover:text-orange"
                          >
                            {piece.name}
                          </Link>
                          <p className="mt-0.5 text-sm text-plum/72">
                            {piece.material}
                          </p>
                        </div>
                        <p className="text-base font-medium">
                          {rupees(piece.price * qty)}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <div className="flex items-center rounded-full border border-line">
                          <button
                            type="button"
                            onClick={() => setQty(piece.slug, qty - 1)}
                            disabled={qty <= 1}
                            aria-label={`Reduce ${piece.name} quantity`}
                            className="px-3.5 py-2 text-base leading-none enabled:hover:text-orange disabled:cursor-not-allowed disabled:text-plum/35"
                          >
                            −
                          </button>
                          <span
                            aria-live="polite"
                            className="min-w-8 text-center text-sm tabular-nums"
                          >
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(piece.slug, qty + 1)}
                            aria-label={`Increase ${piece.name} quantity`}
                            className="px-3.5 py-2 text-base leading-none hover:text-orange"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(piece.slug)}
                          className="text-sm text-plum/75 underline underline-offset-4 hover:text-orange"
                        >
                          Remove
                        </button>
                        {qty > 1 && (
                          <span className="text-sm text-plum/72">
                            {rupees(piece.price)} each
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="card p-6 sm:p-7">
                <h2 className="display-3">Summary</h2>

                <dl className="mt-6 text-sm">
                  <div className="flex justify-between gap-6 py-2">
                    {/* the term is "pieces" everywhere else in the shop; the
                        label names them, so the value need only count them */}
                    <dt className="text-plum/75">Pieces</dt>
                    <dd className="tabular-nums">{count}</dd>
                  </div>
                  <div className="flex justify-between gap-6 border-t border-line py-2">
                    <dt className="text-plum/75">Delivery</dt>
                    <dd className="text-plum/72">Not yet published</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-6 border-t border-line pb-1 pt-3">
                    <dt className="font-medium">Subtotal</dt>
                    <dd className="display-3">{rupees(subtotal)}</dd>
                  </div>
                </dl>

                {/* Checkout records a real order against the shop's stock. A
                    card is still not taken here — payment is not connected, and
                    the note says so instead of implying it was handled. */}
                {overstocked.length > 0 && (
                  <p
                    role="alert"
                    className="mt-6 rounded-control bg-alert/8 px-3.5 py-2.5 text-sm text-alert"
                  >
                    {overstocked.length === 1
                      ? `Only ${overstocked[0].piece.stock} of ${overstocked[0].piece.name} left — reduce that line to check out.`
                      : "Some lines ask for more than the shop has left. Reduce them to check out."}
                  </p>
                )}

                <Link
                  href={overstocked.length > 0 ? "/bag" : "/checkout"}
                  aria-disabled={overstocked.length > 0 || undefined}
                  aria-describedby="checkout-note"
                  className={`btn mt-7 w-full px-7 py-3.5 text-sm ${
                    overstocked.length > 0
                      ? "pointer-events-none cursor-not-allowed text-plum/72 shadow-[inset_0_0_0_1px_var(--color-line)]"
                      : "btn-primary"
                  }`}
                >
                  <Shield className="h-4 w-4" />
                  Checkout
                </Link>
                <p
                  id="checkout-note"
                  className="label mt-2.5 block text-center text-plum/72"
                >
                  No card taken — payment arranged after
                </p>

                <Link
                  href="/shop"
                  className="mt-5 flex items-center justify-center gap-2 text-sm text-plum/75 hover:text-orange"
                >
                  <BagIcon className="h-4 w-4" />
                  Keep looking
                </Link>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
