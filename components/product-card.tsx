import Link from "next/link";
import { GoodFigure } from "@/components/goods";
import { PieceImage } from "@/components/piece-image";
import { rupees, type Piece } from "@/lib/catalog";

/* The product card sits on its own plane and rises when reached for.
   Depth is elevation, not an outline. */
export function ProductCard({ piece }: { piece: Piece }) {
  return (
    <Link
      href={`/piece/${piece.slug}`}
      className="group/card block focus-visible:outline-offset-4"
    >
      <div className="card p-3.5">
        {/* two per row on a phone, four on a wide screen, inside a 1240px page */}
        <PieceImage
          piece={piece}
          className="aspect-square"
          sizes="(min-width: 1024px) 280px, 50vw"
        />

        <div className="px-1.5 pb-1 pt-4">
          <h3 className="text-sm font-medium leading-snug">{piece.name}</h3>
          <p className="mt-0.5 text-xs leading-snug text-plum/70">
            {piece.material}
          </p>
          <p className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm font-medium">
            {rupees(piece.price)}
            {/* stock is real now, so the card says when a piece cannot be
                bought rather than letting the buyer find out at the bag */}
            {piece.stock === 0 && (
              <span className="text-xs font-normal text-plum/72">Sold out</span>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
}

/* Category tile — the same plane at a wider aspect, with the count
   doing the persuading rather than a claim.

   This one deliberately stays on drawings. The three figures overlap at
   different heights to read as a single emblem for the counter, which works
   because the drawings are flat transparent glyphs on a shared ground. While
   the catalogue is half photographed, a mixed emblem — one cropped photograph
   between two line drawings — would look broken rather than transitional. It
   is a brand device, not a product presentation, so it stays consistent
   whatever the catalogue is doing. */
export function CategoryTile({
  title,
  line,
  href,
  count,
  from,
  pieces,
}: {
  title: string;
  line: string;
  href: string;
  count: number;
  from: number;
  /** three of the counter's pieces, grouped — an emblem, not one magnified card */
  pieces: Piece[];
}) {
  return (
    <Link
      href={href}
      className="group/card block focus-visible:outline-offset-4"
    >
      <div className="card overflow-hidden p-4">
        <div className="tile flex aspect-[16/10] items-end justify-center gap-0 overflow-hidden px-2 pb-3 pt-3 sm:px-4">
          {pieces.slice(0, 3).map((p, i) => (
            <div
              key={p.slug}
              /* depth by scale and height, not by fading — this world's
                 grammar is elevation */
              className={
                i === 1
                  ? "z-10 h-[104%] w-[42%] -translate-y-1"
                  : "h-[82%] w-[36%] translate-y-2"
              }
            >
              <GoodFigure
                good={p.good}
                /* emblems fill their box; the card grid carries true scale */
                scale={Math.min(1, p.scale + 0.18)}
                label={`${p.name} — illustration`}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4 px-2 pb-1.5 pt-5">
          <div>
            <h3 className="display-3">
              {title}
            </h3>
            <p className="mt-2 max-w-[32ch] text-sm leading-snug text-plum/65">
              {line}
            </p>
          </div>
          <span className="flex items-center gap-2 text-sm font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-orange" />
            {count} pieces, from {rupees(from)}
          </span>
        </div>
      </div>
    </Link>
  );
}
