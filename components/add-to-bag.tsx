"use client";

import { useState } from "react";
import Link from "next/link";
import { Bag } from "@/components/icons";
import { useBag } from "@/lib/bag";
import type { Piece } from "@/lib/catalog";

export function AddToBag({ piece }: { piece: Piece }) {
  const { add, lines, ready } = useBag();
  const [justAdded, setJustAdded] = useState(false);
  const inBag = ready ? (lines[piece.slug] ?? 0) : 0;

  const soldOut = piece.stock === 0;
  /* The button stops at what the shop actually has. Checkout re-checks this
     against the row it locks, so this is a courtesy rather than the guard —
     but being told at the button beats being told at the till. */
  const atLimit = !soldOut && inBag >= piece.stock;

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={soldOut || atLimit}
          onClick={() => {
            add(piece.slug);
            setJustAdded(true);
            window.setTimeout(() => setJustAdded(false), 2200);
          }}
          className="btn btn-primary px-8 py-4 text-sm disabled:cursor-not-allowed disabled:bg-plum/30 disabled:shadow-none"
        >
          <Bag className="h-4 w-4" />
          {soldOut ? "Sold out" : "Add to bag"}
        </button>

        {inBag > 0 && (
          <Link href="/bag" className="btn btn-quiet px-6 py-4 text-sm">
            {inBag} in your bag — view
          </Link>
        )}
      </div>

      {/* announced for screen readers, not only shown */}
      <p aria-live="polite" className="mt-3 min-h-5 text-sm text-plum/75">
        {soldOut
          ? "None left. This piece is not being restocked automatically."
          : atLimit
            ? `That is all ${piece.stock} the shop has.`
            : justAdded
              ? `${piece.name} added to your bag.`
              : piece.stock <= 5
                ? `Only ${piece.stock} left.`
                : ""}
      </p>
    </div>
  );
}
