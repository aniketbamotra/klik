import Link from "next/link";
import { CategoryTile, ProductCard } from "@/components/product-card";
import { EndCard } from "@/components/end-card";
import { PieceImage } from "@/components/piece-image";
import { ArrowRight, Return, Shield, Truck } from "@/components/icons";
import {
  COUNTERS,
  materialRange,
  priceCeiling,
  priceFloor,
  rupees,
  sentenceList,
  spell,
  type Piece,
} from "@/lib/catalog";
import { listPieces } from "@/lib/data/products";

/* The two planes in the hero are real pieces, linked, at their own prices.
   These two are preferred because they sit well at that size, but the shop is
   editable now — if either is gone, the hero takes whatever the counter leads
   with rather than crashing on a missing slug. */
const HERO_PICKS = ["fat-little-vase", "little-jhumka"];

function heroPieces(pieces: Piece[]) {
  const picked = HERO_PICKS.map((slug) => pieces.find((p) => p.slug === slug)).filter(
    (p): p is Piece => Boolean(p),
  );
  const rest = pieces.filter((p) => !picked.some((h) => h.slug === p.slug));
  return [...picked, ...rest].slice(0, 2);
}

export default async function Home() {
  const pieces = await listPieces();
  const jewellery = pieces.filter((p) => p.counter === "jewellery");
  const house = pieces.filter((p) => p.counter === "house");
  const cheapest = (list: Piece[]) => priceFloor(list);
  const HERO = heroPieces(pieces);

  return (
    <>
      <>
        {/* ── hero ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <span
            className="haze -left-40 -top-32 h-[34rem] w-[34rem] bg-haze opacity-55"
            aria-hidden="true"
          />
          <span
            className="haze -right-32 top-64 h-[26rem] w-[26rem] bg-cream opacity-70"
            aria-hidden="true"
          />

          <div className="relative mx-auto grid max-w-[1240px] items-center gap-10 px-4 py-10 sm:px-6 md:grid-cols-2 md:py-16">
            <div>
              <h1 className="display-1">
                Everyday jewellery and things{" "}
                <em className="italic">for the house.</em>
              </h1>
              <p className="mt-6 max-w-[38ch] text-base leading-relaxed text-plum/75">
                Priced to be used rather than saved. Nothing here costs more
                than {rupees(priceCeiling(pieces))}.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Link href="/shop" className="btn btn-primary px-8 py-4 text-sm">
                  Shop all
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <span className="flex items-center gap-2.5 text-sm">
                  <span className="h-2.5 w-2.5 rounded-full bg-orange" />
                  {pieces.length} pieces, from {rupees(cheapest(pieces))}
                </span>
              </div>
            </div>

            {/* two planes at different heights, over an orange one */}
            <div className="relative h-[21rem] sm:h-[23rem]">
              <span
                className="absolute inset-x-0 top-12 h-[10rem] w-full rotate-[-5deg] rounded-[1.25rem] bg-orange shadow-[var(--shadow-lift)] sm:inset-x-auto sm:left-1/2 sm:top-14 sm:h-[13rem] sm:w-[13rem] sm:-translate-x-1/2 sm:rotate-[-9deg]"
                aria-hidden="true"
              />
              {HERO.map((piece, i) => (
                <Link
                  key={piece.slug}
                  href={`/piece/${piece.slug}`}
                  className={`group/card settle absolute ${
                    i === 0
                      ? "right-0 top-0 [--tilt:5deg]"
                      : "left-0 top-16 [--tilt:-4deg]"
                  }`}
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  {/* a div rather than a span: PieceImage renders a block, and
                      a div inside a span is invalid enough that the parser
                      hoists it out and hydration disagrees */}
                  <div className="card w-[10.5rem] p-4 sm:w-[13rem]">
                    <PieceImage
                      piece={piece}
                      className="aspect-square"
                      sizes="(min-width: 640px) 13rem, 10.5rem"
                      priority
                    />
                    <span className="flex flex-col gap-0.5 px-1 pb-0.5 pt-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                      <span className="text-sm font-medium leading-snug">
                        {piece.name}
                      </span>
                      <span className="shrink-0 text-sm text-plum/72">
                        {rupees(piece.price)}
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── service row ──────────────────────────────────────── */}
        <section className="border-y border-line bg-card/60">
          <div className="mx-auto max-w-[1240px] px-4 py-9 sm:px-6">
            <div className="grid gap-7 sm:grid-cols-3">
              {(
                [
                  [Truck, "Delivery", "Terms not yet published"],
                  [Return, "Returns", "Policy not yet published"],
                  [Shield, "Secure checkout", "Payments not yet connected"],
                ] as const
              ).map(([Icon, title, note]) => (
                <div key={title} className="flex items-start gap-3.5">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{title}</p>
                    {/* the terms do not exist yet — state it, never promise */}
                    <p className="mt-0.5 text-xs text-plum/72">{note}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="label mt-7 inline-block rounded-full border border-dashed border-plum/30 px-3.5 py-1.5 text-plum/72">
              Delivery, returns and payment are being finalised
            </p>
          </div>
        </section>

        {/* ── categories ───────────────────────────────────────── */}
        <section className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 md:py-20">
          <h2 className="display-2">
            Two counters.
          </h2>
          {/* "counter" is the shop's own word, and this is where a first-time
              visitor meets it — say what it means once, here */}
          <p className="mt-3 max-w-[40ch] text-base leading-relaxed text-plum/75">
            One for the body, one for the room.
          </p>
          <div className="mt-9 grid gap-6 md:grid-cols-2">
            {COUNTERS.map((c) => {
              const list = c.key === "jewellery" ? jewellery : house;
              return (
                <CategoryTile
                  key={c.key}
                  title={c.title}
                  line={c.line}
                  href={`/shop/${c.key}`}
                  count={list.length}
                  from={cheapest(list)}
                  pieces={
                    /* three the hero does not already show */
                    list.filter((p) => !HERO.some((h) => h.slug === p.slug))
                  }
                />
              );
            })}
          </div>
        </section>

        {/* ── the full catalogue ───────────────────────────────── */}
        <section className="relative overflow-hidden border-t border-line">
          <span
            className="haze -left-40 top-40 h-[28rem] w-[28rem] bg-cream opacity-60"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-[1240px] px-4 py-16 sm:px-6 md:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="display-2">
                  Everything in the shop.
                </h2>
                <p className="mt-3 text-sm text-plum/75">
                  {pieces.length} pieces, from {rupees(cheapest(pieces))}.
                </p>
              </div>
              <Link href="/shop" className="btn btn-quiet px-6 py-3.5 text-sm">
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="plane mt-10 p-4 sm:p-7">
              <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                {pieces.map((piece) => (
                  <ProductCard key={piece.slug} piece={piece} />
                ))}
                {/* squares the grid and ends the catalogue deliberately */}
                <EndCard
                  title={`That is all ${spell(pieces.length)}.`}
                  line={`${sentenceList(materialRange(pieces))}.`}
                  href="/shop"
                  action="Browse the shop"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── brand band — the confirmed positioning: everyday, not occasion ── */}
        <section className="relative bg-plum text-cream">
          <div className="mx-auto max-w-[680px] px-4 py-20 text-center sm:px-6 md:py-24">
            <h2 className="display-2">
              Made to be used, <em className="italic">not saved.</em>
            </h2>
            <p className="mx-auto mt-6 max-w-[50ch] text-base leading-relaxed text-cream/80">
              Everything here is priced to go on in the morning and stay on, or
              to sit somewhere you actually walk past. Not the drawer, not the
              good cupboard. The diya is for a Tuesday and the hoops are for the
              commute.
            </p>
            <Link
              href="/shop"
              className="btn mt-9 bg-orange px-7 py-3.5 text-sm text-plum-deep"
            >
              Everything in the shop
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </>

    </>
  );
}
