import "server-only";

import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { asGood } from "@/lib/catalog";
import type { GuestOrder, OrderWithItems } from "@/lib/orders";

/* Order reads. Which rows come back is decided entirely by RLS: a customer sees
   their own, an admin sees all of them, and a guest sees exactly one order and
   only by presenting its token. None of that is re-implemented here.

   The shapes and the arithmetic live in lib/orders.ts, which the admin's client
   components can import without pulling a server client into the browser. */

export type { Order, OrderItem, OrderWithItems, GuestOrder } from "@/lib/orders";
export { orderCount } from "@/lib/orders";

const WITH_ITEMS = "*, items:order_items(*)";

/** Every order the signed-in shopper has placed. */
export const listMyOrders = cache(async (userId: string): Promise<OrderWithItems[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select(WITH_ITEMS)
    .eq("user_id", userId)
    .order("placed_at", { ascending: false });

  if (error) throw new Error(`Could not load your orders: ${error.message}`);
  return (data ?? []) as OrderWithItems[];
});

/* ------------------------------------------------------------------ guest -- */

export const getOrderByToken = cache(
  async (orderNumber: string, token: string): Promise<GuestOrder | null> => {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_order_by_token", {
      p_order_number: orderNumber,
      p_access_token: token,
    });

    if (error) throw new Error(`Could not find that order: ${error.message}`);
    if (!data) return null;

    const raw = data as unknown as GuestOrder;
    return {
      ...raw,
      items: (raw.items ?? []).map((i) => ({ ...i, good: asGood(i.good) })),
    };
  },
);

/* ------------------------------------------------------------------ admin -- */

export const listOrders = cache(async (): Promise<OrderWithItems[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select(WITH_ITEMS)
    .order("placed_at", { ascending: false });

  if (error) throw new Error(`Could not load orders: ${error.message}`);
  return (data ?? []) as OrderWithItems[];
});

export const getOrder = cache(async (orderNumber: string): Promise<OrderWithItems | null> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select(WITH_ITEMS)
    .eq("order_number", orderNumber)
    .maybeSingle();

  if (error) throw new Error(`Could not load that order: ${error.message}`);
  return (data as OrderWithItems) ?? null;
});
