import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShopView } from "@/components/shop-view";
import { COUNTERS, type Counter } from "@/lib/catalog";
import { listPieces } from "@/lib/data/products";

const VALID: Counter[] = ["jewellery", "house"];

export function generateStaticParams() {
  return VALID.map((counter) => ({ counter }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ counter: string }>;
}): Promise<Metadata> {
  const { counter } = await params;
  const c = COUNTERS.find((x) => x.key === counter);
  return c
    ? { title: `${c.title} — Klik`, description: c.line }
    : { title: "Not found — Klik" };
}

export default async function CounterPage({
  params,
}: {
  params: Promise<{ counter: string }>;
}) {
  const { counter } = await params;
  const c = COUNTERS.find((x) => x.key === counter);
  if (!c) notFound();

  const whole = await listPieces();
  const pieces = whole.filter((p) => p.counter === c.key);

  return (
    <ShopView
      active={c.key}
      title={c.key === "jewellery" ? "Jewellery." : "For the house."}
      line={c.line}
      pieces={pieces}
      total={whole.length}
      whole={whole}
    />
  );
}
