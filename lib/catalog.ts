import { GOODS, type GoodKey } from "@/components/goods";
import type { PieceImage } from "@/lib/images";
import type { Tables } from "@/lib/supabase/database.types";

/* The catalogue lives in Supabase now. What is left here is the shape a piece
   takes in the interface, plus the copy that is *derived* from whatever the shop
   currently stocks.

   Everything below used to be a module constant computed once from a hardcoded
   array. It is now a function of the pieces actually passed in, because the
   shop can change between two page loads and a sentence that says "fourteen
   pieces" must never outlive the fourteenth piece. */

export type Counter = "jewellery" | "house";

export type Piece = {
  id: string;
  slug: string;
  name: string;
  good: GoodKey;
  /** how large this object sits in its tile — small jewellery should not
   *  present at the same visual weight as a mirror */
  scale: number;
  price: number;
  counter: Counter;
  note: string;
  /** two short paragraphs for the product page */
  story: string[];
  material: string;
  /** free text, in the owner's words — empty means unmeasured */
  dimensions: string;
  /** units on hand; 0 means the piece shows but cannot be bought */
  stock: number;
  /** photographs, main one first. Empty until the owner uploads any, which is
   *  why every surface still falls back to the drawing. */
  images: PieceImage[];
};

const FALLBACK_GOOD: GoodKey = "hoops";

/** The drawing key is free text in the database, so a piece added from the
 *  admin screens with an unknown key still renders rather than crashing. */
export const asGood = (good: string): GoodKey =>
  good in GOODS ? (good as GoodKey) : FALLBACK_GOOD;

/* The storefront select embeds photographs, so a row arrives with more on it
   than the products table alone declares. */
export type ProductRow = Tables<"products"> & {
  images?: { path: string; alt: string; sort_order: number }[] | null;
};

/** Database row → the shape the storefront renders. */
export const toPiece = (row: ProductRow): Piece => ({
  id: row.id,
  slug: row.slug,
  name: row.name,
  good: asGood(row.good),
  scale: Number(row.scale),
  price: row.price,
  counter: row.counter,
  note: row.note,
  story: row.story,
  material: row.material,
  dimensions: row.dimensions,
  stock: row.stock,
  /* PostgREST does not honour an order() on an embedded resource the way it
     does on the top-level rows, so the sort happens here. Main photograph
     first, which is what every surface renders. */
  images: [...(row.images ?? [])]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(({ path, alt }) => ({ path, alt })),
});

export const COUNTERS: {
  key: Counter;
  title: string;
  line: string;
  good: GoodKey;
}[] = [
  {
    key: "jewellery",
    title: "Jewellery",
    line: "Hoops, jhumka, chains, rings, bangles and ankle bells.",
    good: "anklet",
  },
  {
    key: "house",
    title: "For the house",
    line: "Vases, lamps, a mirror, a planter and small brass.",
    good: "mirror",
  },
];

export const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/* the floor and ceiling of the shop, computed — never written into prose */
export const priceFloor = (pieces: Piece[]) =>
  pieces.length ? Math.min(...pieces.map((p) => p.price)) : 0;
export const priceCeiling = (pieces: Piece[]) =>
  pieces.length ? Math.max(...pieces.map((p) => p.price)) : 0;

/* Counts read better spelled out in prose than set as numerals, and the copy
   says them often — "Fourteen pieces", "seven to wear". They are spelled from
   the catalogue rather than typed, so no sentence goes stale the moment a
   piece is added or removed. Same rule as the prices above. */
const NUMBER_WORDS = [
  "no", "one", "two", "three", "four", "five", "six", "seven", "eight",
  "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
  "sixteen", "seventeen", "eighteen", "nineteen", "twenty",
] as const;

export const spell = (n: number) =>
  NUMBER_WORDS[n] ?? n.toLocaleString("en-IN");

export const capitalise = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);

export const countAt = (pieces: Piece[], counter: Counter) =>
  pieces.filter((p) => p.counter === counter).length;

/** The shape of the shop in one clause — "Seven to wear, seven for the house". */
export const shapeLine = (pieces: Piece[]) =>
  `${capitalise(spell(countAt(pieces, "jewellery")))} to wear, ${spell(
    countAt(pieces, "house"),
  )} for the house`;

/* The material range, derived from the catalogue rather than written by hand —
   a summary that can assert a material the shop does not stock is worse than
   no summary. Add to VOCABULARY when a genuinely new material appears; anything
   not actually present is dropped automatically. */
const VOCABULARY = [
  "brass",
  "stoneware",
  "terracotta",
  "wood",
  "cast iron",
  "steel",
  "resin",
] as const;

export const materialRange = (pieces: Piece[]) =>
  VOCABULARY.map((m) => ({
    m,
    n: pieces.filter((p) => p.material.toLowerCase().includes(m)).length,
  }))
    .filter((x) => x.n > 0)
    .sort((a, b) => b.n - a.n)
    .slice(0, 5)
    .map((x) => x.m);

export const sentenceList = (items: readonly string[]) => {
  const list = items.map((s, i) => (i === 0 ? s[0].toUpperCase() + s.slice(1) : s));
  if (list.length < 2) return list.join("");
  return `${list.slice(0, -1).join(", ")} and ${list[list.length - 1]}`;
};
