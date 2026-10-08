import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { EndCard, needsTerminal } from "@/components/end-card";
import { priceCeiling, priceFloor, rupees, shapeLine, type Counter, type Piece } from "@/lib/catalog";

const TABS: { label: string; href: string; key: Counter | "all" }[] = [
  { label: "Everything", href: "/shop", key: "all" },
  { label: "Jewellery", href: "/shop/jewellery", key: "jewellery" },
  { label: "For the house", href: "/shop/house", key: "house" },
];

/* One listing surface for the shop and both counters. The visitor's job here
   is to scan and find, so the grid is the page — heading, a count they can
   trust, the filter, and then nothing between them and the products. */
export function ShopView({
  title,
  line,
  pieces,
  active,
  total,
  whole,
}: {
  title: string;
  line: string;
  pieces: Piece[];
  active: Counter | "all";
  /** size of the whole shop, so "N of M" is honest on a filtered counter */
  total: number;
  /** the whole catalogue, for the closing card's summary of the shop */
  whole: Piece[];
}) {
  const from = priceFloor(pieces);
  const to = priceCeiling(pieces);
  const showTerminal = needsTerminal(pieces.length);

  return (
    <section className="relative overflow-hidden">
      <span
        className="haze -left-40 -top-24 h-[30rem] w-[30rem] bg-haze opacity-50"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1240px] px-4 py-12 sm:px-6 md:py-16">
        <h1 className="display-1 max-w-[16ch]">{title}</h1>
        <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-plum/75">
          {line}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          <nav aria-label="Filter by counter" className="flex flex-wrap gap-2">
            {TABS.map((t) => {
              const on = t.key === active;
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  aria-current={on ? "page" : undefined}
                  className={`btn px-5 py-3 text-sm ${
                    on ? "btn-primary" : "btn-quiet"
                  }`}
                >
                  {t.label}
                </Link>
              );
            })}
          </nav>

          <p className="flex items-center gap-2.5 text-sm text-plum/75">
            <span className="h-2 w-2 rounded-full bg-orange" />
            {/* an empty counter has no price range to state, and "₹0 to ₹0"
                would be a claim about nothing */}
            {pieces.length === 0
              ? "Nothing at this counter yet"
              : `${pieces.length} of ${total} · ${rupees(from)} to ${rupees(to)}`}
          </p>
        </div>

        <div className="plane mt-8 p-4 sm:p-7">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {pieces.map((piece) => (
              <ProductCard key={piece.slug} piece={piece} />
            ))}
            {showTerminal && (
              <EndCard
                title="That is the whole shop."
                line={`${shapeLine(whole)}.`}
                href="/search"
                action="Search the shop"
              />
            )}
          </div>
        </div>

        <p className="label mt-8 inline-block rounded-full border border-dashed border-plum/45 px-3.5 py-1.5 text-plum/72">
          Placeholder catalogue — names, prices, materials, descriptions and illustrations are stand-ins
        </p>
      </div>
    </section>
  );
}
