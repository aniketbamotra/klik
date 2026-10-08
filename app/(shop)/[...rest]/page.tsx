import { notFound } from "next/navigation";

/* Unmatched addresses land here only so the 404 renders inside the shop's
   header and footer: the root not-found sits outside the (shop) layout.
   Throwing hands it to app/(shop)/not-found.tsx with a real 404 status. */
export default function CatchAll() {
  notFound();
}
