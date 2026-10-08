import type { Enums } from "@/lib/supabase/database.types";

/* Vocabulary for the admin screens. The demonstration orders and the hardcoded
   stock table that used to live here are gone — that data is in Supabase now
   (see lib/data/orders.ts and lib/data/products.ts). What remains is how the
   shop *talks* about an order or a stock level, which is a presentation
   decision and belongs on this side. */

export type OrderStatus = Enums<"order_status">;

export const STATUS_LABEL: Record<OrderStatus, string> = {
  new: "New",
  packing: "Packing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const ALL_STATUSES: OrderStatus[] = [
  "new",
  "packing",
  "shipped",
  "delivered",
  "cancelled",
];

/** Orders still owed something. Drives the sidebar count and the overview. */
export const OPEN_STATUSES: OrderStatus[] = ["new", "packing"];

/** What an order can become next, so the admin never offers a nonsense move. */
export const NEXT_STATUSES: Record<OrderStatus, OrderStatus[]> = {
  new: ["packing", "cancelled"],
  packing: ["shipped", "cancelled"],
  shipped: ["delivered"],
  delivered: [],
  cancelled: [],
};

export const LOW_STOCK_AT = 5;

export type StockLevel = "out" | "low" | "ok";

export const stockLevel = (n: number): StockLevel =>
  n === 0 ? "out" : n <= LOW_STOCK_AT ? "low" : "ok";

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
