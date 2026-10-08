import Image from "next/image";
import { GoodFigure } from "@/components/goods";
import { imageUrl } from "@/lib/images";
import type { Piece } from "@/lib/catalog";

/* One decision, made once: a piece shows its photograph if it has one, and its
   drawing if it does not.

   The drawings stand in for photography that does not exist yet
   (PLACEHOLDERS.md), so the shop will be mixed for a while — some pieces shot,
   most not. Putting the fallback in every call site would be fourteen chances
   to get it inconsistent, so every storefront surface renders through this
   instead of reaching for GoodFigure directly.

   The component owns the tile because the two cases want different frames: a
   drawing is a flat glyph that sits *inset* on the cream tile with the paper
   showing around it, while a photograph is the object itself and bleeds to the
   tile's edge. Passing padding in from outside would inset both. */
export function PieceImage({
  piece,
  sizes,
  className = "",
  /** inset for the drawing only — a photograph always fills the frame */
  pad = "p-5",
  /** the drawing crowds its frame on the piece page, but not in the grid */
  scaleBoost = 0,
  priority = false,
}: {
  piece: Piece;
  /** what width this renders at per breakpoint; next/image cannot infer it */
  sizes: string;
  /** aspect and any layout the frame needs */
  className?: string;
  pad?: string;
  scaleBoost?: number;
  priority?: boolean;
}) {
  const photograph = piece.images[0];

  return (
    <div className={`tile relative overflow-hidden ${className}`}>
      {photograph ? (
        <Image
          src={imageUrl(photograph.path)}
          /* a product photograph is the evidence a buyer decides on, never
             decoration — so it always describes itself, falling back to the
             name when the owner has not written alt text yet */
          alt={photograph.alt || piece.name}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div className={`flex h-full w-full items-center justify-center ${pad}`}>
          <div className="h-full w-full">
            <GoodFigure
              good={piece.good}
              scale={Math.min(1, piece.scale + scaleBoost)}
              label={`${piece.name} — illustration`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
