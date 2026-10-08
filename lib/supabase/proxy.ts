import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/lib/supabase/database.types";

/* Server Components cannot write cookies, so this is the one place a refreshed
   auth token gets handed back to the browser. Without it, sessions expire and
   people get logged out at random.

   The gate here is deliberately thin. Klik's storefront is open to guests by
   design, so this only asks "is anyone signed in at all" for the two areas that
   need an account, and never asks "are they an admin" — that is a database
   question, and the proxy runs on prefetches too. Role is checked in the admin
   layout, next to the data. */

const NEEDS_ACCOUNT = ["/account"];
const NEEDS_ADMIN = ["/admin"];
const ADMIN_SIGN_IN = "/admin/sign-in";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
          // no-store and friends, so a CDN never caches one person's session
          Object.entries(headers).forEach(([key, value]) =>
            supabaseResponse.headers.set(key, value),
          );
        },
      },
    },
  );

  // Nothing goes between creating the client and this call. getClaims verifies
  // the JWT signature, unlike getSession, which only reads what the cookie says.
  const { data } = await supabase.auth.getClaims();
  const signedIn = Boolean(data?.claims);

  const path = request.nextUrl.pathname;
  const wantsAccount = NEEDS_ACCOUNT.some((p) => path === p || path.startsWith(`${p}/`));
  const wantsAdmin =
    NEEDS_ADMIN.some((p) => path === p || path.startsWith(`${p}/`)) &&
    path !== ADMIN_SIGN_IN;

  if (!signedIn && (wantsAccount || wantsAdmin)) {
    const url = request.nextUrl.clone();
    url.pathname = wantsAdmin ? ADMIN_SIGN_IN : "/sign-in";
    url.search = "";
    // so the sign-in screen can send them back where they were headed
    url.searchParams.set("next", path);
    return withSessionCookies(NextResponse.redirect(url), supabaseResponse);
  }

  /* A signed-in admin has no business on the admin sign-in screen.

     The `denied` guard matters: that parameter means the admin layout has just
     turned a signed-in *customer* away. Without it, bouncing them to /admin
     would have the layout send them straight back here, forever. */
  if (signedIn && path === ADMIN_SIGN_IN && !request.nextUrl.searchParams.has("denied")) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return withSessionCookies(NextResponse.redirect(url), supabaseResponse);
  }

  return supabaseResponse;
}

/* Any response other than the one Supabase wrote to has to inherit its cookies,
   or the browser and the server drift apart and the session dies early. */
function withSessionCookies(response: NextResponse, from: NextResponse) {
  from.cookies.getAll().forEach((cookie) => response.cookies.set(cookie));
  return response;
}
