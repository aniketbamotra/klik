"use server";

import { createClient } from "@/lib/supabase/server";

/* Placing the order.

   The bag lives in the browser, so the lines arrive from the client — and are
   therefore not trusted. This action forwards slugs and quantities only. Every
   price, every stock check and the total are decided inside place_order, from
   the products table, under a row lock. Nothing the buyer can edit reaches the
   money. */

export type CheckoutState = {
  error?: string;
  placed?: { orderNumber: string; token: string; total: number };
};

type Line = { slug: string; qty: number };

function readLines(raw: FormDataEntryValue | null): Line[] {
  if (typeof raw !== "string") return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((line) => {
        const item = line as { slug?: unknown; qty?: unknown };
        return {
          slug: typeof item.slug === "string" ? item.slug : "",
          qty: Math.floor(Number(item.qty)),
        };
      })
      .filter((l) => l.slug && Number.isFinite(l.qty) && l.qty > 0);
  } catch {
    return [];
  }
}

export async function placeOrder(
  _prev: CheckoutState,
  formData: FormData,
): Promise<CheckoutState> {
  const lines = readLines(formData.get("lines"));
  if (lines.length === 0) {
    return { error: "Your bag is empty." };
  }

  const supabase = await createClient();

  /* Anonymous or signed in, the call is identical: place_order reads auth.uid()
     for itself and attaches the order to an account only if there is one. */
  const { data, error } = await supabase.rpc("place_order", {
    p_lines: lines,
    p_customer_name: String(formData.get("customer_name") ?? ""),
    p_email: String(formData.get("email") ?? ""),
    p_address_line: String(formData.get("address_line") ?? ""),
    p_city: String(formData.get("city") ?? ""),
    p_phone: String(formData.get("phone") ?? ""),
    p_postcode: String(formData.get("postcode") ?? ""),
    p_note: String(formData.get("note") ?? ""),
  });

  if (error) {
    /* place_order raises with copy already written for a buyer — "Ankle Bells
       has only 3 left." Passing it through beats replacing it with something
       vaguer. */
    return { error: error.message.replace(/^.*?:\s*/, "") || "That order could not be placed." };
  }

  const row = data?.[0];
  if (!row) return { error: "That order could not be placed." };

  return {
    placed: {
      orderNumber: row.out_order_number,
      token: row.out_access_token,
      total: row.out_total,
    },
  };
}
