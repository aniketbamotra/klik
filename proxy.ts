import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

/* Next 16 renamed the middleware convention to proxy. It runs on the Node.js
   runtime and that is not configurable. */
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /* Everything except static assets and image optimisation. Auth wants to run
       broadly, but refreshing a token on the way to a PNG is waste. */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)",
  ],
};
