import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/* Who is asking. Klik has three answers, and all three are legitimate:

     guest      — browsing and buying without an account. Not an error state.
     customer   — signed in, has an order history.
     admin      — signed in, runs the shop.

   The proxy already decided whether *someone* is signed in. This is where the
   role question gets asked, next to the data, because that is the check that
   actually protects anything. Memoised with React cache so a page that asks
   three times still costs one round trip. */

export type Viewer =
  | { kind: "guest" }
  | {
      kind: "customer" | "admin";
      id: string;
      email: string;
      name: string | null;
      phone: string | null;
    };

export const getViewer = cache(async (): Promise<Viewer> => {
  const supabase = await createClient();

  // getClaims validates the JWT signature. getSession would only tell us what
  // the cookie claims, which anyone can write.
  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;
  if (!userId) return { kind: "guest" };

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone, role")
    .eq("id", userId)
    .maybeSingle();

  return {
    kind: profile?.role === "admin" ? "admin" : "customer",
    id: userId,
    email: typeof claimsData?.claims?.email === "string" ? claimsData.claims.email : "",
    name: profile?.full_name ?? null,
    phone: profile?.phone ?? null,
  };
});

export async function requireUser() {
  const viewer = await getViewer();
  if (viewer.kind === "guest") redirect("/sign-in?next=/account");
  return viewer;
}

/** The real admin gate. The proxy only checks that someone is signed in; a
 *  signed-in customer who types /admin gets sent to the shop from here. */
export async function requireAdmin() {
  const viewer = await getViewer();
  if (viewer.kind === "guest") redirect("/admin/sign-in");
  if (viewer.kind !== "admin") redirect("/admin/sign-in?denied=1");
  return viewer;
}
