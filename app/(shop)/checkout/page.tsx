import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout-form";
import { getViewer } from "@/lib/data/session";

export const metadata: Metadata = {
  title: "Checkout · Klik",
  description: "Place your order. An account is not required.",
};

/* Open to guests on purpose — the proxy protects /account and /admin, and
   deliberately not this. */
export default async function CheckoutPage() {
  const viewer = await getViewer();
  const signedIn = viewer.kind !== "guest";

  return (
    <section className="relative overflow-hidden">
      <span
        className="haze -left-40 -top-24 h-[28rem] w-[28rem] bg-haze opacity-45"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1240px] px-4 py-12 sm:px-6 md:py-16">
        <h1 className="display-1">Checkout.</h1>
        <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-plum/75">
          Delivery charges and payment are not settled yet, so no card is taken
          here. Placing the order reserves the pieces and sends the details to
          the shop.
        </p>

        <div className="mt-10">
          <CheckoutForm
            signedIn={signedIn}
            name={signedIn ? (viewer.name ?? "") : ""}
            email={signedIn ? viewer.email : ""}
            phone={signedIn ? (viewer.phone ?? "") : ""}
          />
        </div>
      </div>
    </section>
  );
}
