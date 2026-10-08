import { STATUS_LABEL, stockLevel, type OrderStatus } from "@/lib/admin-data";

/* One status vocabulary across the whole panel. Colour is functional here —
   never decoration — and every pill carries its word, so status never depends
   on colour alone. */

const ORDER_TONE: Record<OrderStatus, string> = {
  new: "bg-plum text-cream",
  packing: "bg-orange/25 text-plum",
  shipped: "bg-ok/12 text-ok",
  delivered: "bg-adm-bg text-plum/70",
  cancelled: "bg-alert/10 text-alert",
};

export function OrderStatusPill({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${ORDER_TONE[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

export function StockPill({ n }: { n: number }) {
  const level = stockLevel(n);
  const tone =
    level === "out"
      ? "bg-alert/10 text-alert"
      : level === "low"
        ? "bg-orange/25 text-plum"
        : "bg-ok/12 text-ok";
  const word = level === "out" ? "Out of stock" : level === "low" ? "Low" : "In stock";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${tone}`}
    >
      <span className="tabular-nums">{n}</span>
      <span className="opacity-75">·</span>
      {word}
    </span>
  );
}
