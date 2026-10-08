import type { Metadata } from "next";
import { ShopView } from "@/components/shop-view";
import { materialRange, sentenceList, shapeLine, spell } from "@/lib/catalog";
import { listPieces } from "@/lib/data/products";

/* The description counts the shop, so it has to be generated per request now
   rather than declared once at module load. */
export async function generateMetadata(): Promise<Metadata> {
  const pieces = await listPieces();
  return {
    title: "Everything — Klik",
    description: `All ${spell(pieces.length)} pieces: jewellery and objects for the house.`,
  };
}

export default async function Shop() {
  const pieces = await listPieces();

  return (
    <ShopView
      active="all"
      title="Everything in the shop."
      line={`${shapeLine(pieces)}. ${sentenceList(materialRange(pieces))}.`}
      pieces={pieces}
      total={pieces.length}
      whole={pieces}
    />
  );
}
