"use client";

import Image from "next/image";
import { useState } from "react";
import { imageUrl } from "@/lib/images";
import type { Piece } from "@/lib/catalog";

/* The product page when a piece has been photographed more than once: one
   large image, a strip of thumbnails under it, and selecting a thumbnail swaps
   the main image. No lightbox and no zoom — the standing brand commitment is a
   conventional interface, and this is the pattern every shopper already knows.

   Only rendered for two or more photographs; one photograph needs no chooser,
   and none falls back to the drawing. Both of those cases are PieceImage's. */
export function PieceGallery({ piece }: { piece: Piece }) {
  const [active, setActive] = useState(0);
  const shown = piece.images[active] ?? piece.images[0];

  return (
    <div>
      <div className="tile relative aspect-square overflow-hidden">
        <Image
          src={imageUrl(shown.path)}
          alt={shown.alt || piece.name}
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <ul className="mt-3 flex flex-wrap gap-2.5">
        {piece.images.map((image, i) => {
          const on = i === active;
          return (
            <li key={image.path}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={on ? "true" : undefined}
                aria-label={`Show photograph ${i + 1} of ${piece.images.length}`}
                className={`tile relative block h-16 w-16 overflow-hidden transition-shadow sm:h-20 sm:w-20 ${
                  on
                    ? "shadow-[inset_0_0_0_2px_var(--color-plum)]"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={imageUrl(image.path)}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
