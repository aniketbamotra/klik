import type { GoodKey } from "@/components/goods";
import type { Tables } from "@/lib/supabase/database.types";
import type { OrderStatus } from "@/lib/admin-data";

/* The shape of an order and the arithmetic on it, kept apart from the queries
   that fetch one. lib/data/orders.ts is server-only, and the admin's orders
   table is a client component — it needs these without dragging a Supabase
   server client into the browser bundle. */

export type OrderItem = Tables<"order_items">;
export type Order = Tables<"orders">;
export type OrderWithItems = Order & { items: OrderItem[] };

/** What a guest sees on the confirmation screen and whenever they return to
 *  the link. The order number alone proves nothing; the token is the key. */
export type GuestOrder = {
  order_number: string;
  status: OrderStatus;
  placed_at: string;
  customer_name: string;
  email: string;
  address_line: string;
  city: string;
  postcode: string | null;
  subtotal: number;
  shipping: number;
  total: number;
  items: { slug: string; name: string; good: GoodKey; unit_price: number; qty: number }[];
};

/* Totals are read off the order, never recomputed from today's prices. What
   someone paid is history and must not move when the shop reprices a piece. */
export const orderCount = (order: OrderWithItems) =>
  order.items.reduce((n, i) => n + i.qty, 0);
