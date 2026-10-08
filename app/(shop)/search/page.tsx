"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { EndCard, needsTerminal } from "@/components/end-card";
import { ArrowRight, Search as SearchIcon } from "@/components/icons";
import { useCatalog } from "@/lib/bag";
import { capitalise, materialRange, priceFloor, rupees, shapeLine, spell } from "@/lib/catalog";

function SearchInner() {
  /* the shop as the server fetched it, handed down by the layout — searching
     is client-side over the live catalogue, not over a bundled constant */
  const pieces = useCatalog();
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const term = q.trim().toLowerCase();

  /* keep the term in the URL so a result set can be linked, restored and
     survive back — component state alone loses all three */
  useEffect(() => {
    const t = window.setTimeout(() => {
      const next = q.trim() ? `/search?q=${encodeURIComponent(q.trim())}` : "/search";
      if (next !== window.location.pathname + window.location.search) {
        router.replace(next, { scroll: false });
      }
    }, 250);
    return () => window.clearTimeout(t);
  }, [q, router]);

  const results = useMemo(() => {
    if (!term) return pieces;
    return pieces.filter((p) =>
      [p.name, p.material, p.note, p.counter, ...p.story]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [term, pieces]);

  return (
    <section className="relative overflow-hidden">
      <span
        className="haze -left-40 -top-24 h-[28rem] w-[28rem] bg-haze opacity-45"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1240px] px-4 py-12 sm:px-6 md:py-16">
        <h1 className="display-1">Search.</h1>
        {/* the heading already says "search" — this says what a term can be */}
        <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-plum/75">
          {capitalise(spell(pieces.length))} pieces, from {rupees(priceFloor(pieces))}.
          A name, a material or a counter all work.
        </p>

        <div className="relative mt-8 max-w-xl">
          <SearchIcon className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-plum/72" />
          <label htmlFor="q" className="sr-only">
            Search the shop
          </label>
          <input
            id="q"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Brass, jhumka, vase…"
            className="w-full rounded-full border border-line bg-card py-4 pl-14 pr-5 text-base placeholder:text-plum/70 focus:border-plum focus:outline-none"
          />
        </div>

        <p aria-live="polite" className="mt-5 text-sm text-plum/75">
          {term
            ? `${results.length} of ${pieces.length} ${
                results.length === 1 ? "piece matches" : "pieces match"
              } “${q.trim()}”`
            : `Showing all ${pieces.length} pieces`}
        </p>

        {results.length > 0 ? (
          <div className="plane mt-6 p-4 sm:p-7">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {results.map((piece) => (
                <ProductCard key={piece.slug} piece={piece} />
              ))}
              {needsTerminal(results.length) && (
                <EndCard
                  title={term ? "That is every match." : "That is the whole shop."}
                  line={`${shapeLine(pieces)}.`}
                  href="/shop"
                  action="Browse the shop"
                />
              )}
            </div>
          </div>
        ) : (
          <div className="card mt-6 max-w-[46rem] p-8 sm:p-10">
            <p className="display-3">Nothing matches that.</p>
            {/* the materials offered as a way out are read from the catalogue,
                so this never suggests a material the shop does not stock */}
            <p className="mt-4 max-w-[44ch] text-base leading-relaxed text-plum/75">
              The whole shop is {spell(pieces.length)} pieces, so try something
              broader — {materialRange(pieces).join(", ")} all return something.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setQ("")}
                className="btn btn-primary px-7 py-4 text-sm"
              >
                Clear search
              </button>
              <Link href="/shop" className="btn btn-quiet px-6 py-4 text-sm">
                Browse the shop
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchInner />
    </Suspense>
  );
}
