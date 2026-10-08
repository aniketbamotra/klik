import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GoodFigure } from "@/components/goods";
import { ArrowRight } from "@/components/icons";
import { rupees } from "@/lib/catalog";
import { getOrderByToken } from "@/lib/data/orders";
import { STATUS_LABEL, formatDate } from "@/lib/admin-data";

export const metadata: Metadata = {
  title: "Your order · Klik",
  robots: { index: false, follow: false },
};

/* The confirmation, and the page a guest can come back to. The token in the URL
   is the credential — an order number on its own opens nothing, so this page is
   safe to keep in a browser history or an email without exposing the shop's
   order book. */
export default async function OrderPage({
  params,
  searchParams,
}: {
  params: Promise<{ number: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const [{ number }, { token }] = await Promise.all([params, searchParams]);
  if (!token) notFound();

  const order = await getOrderByToken(number, token);
  if (!order) notFound();

  return (
    <section className="relative overflow-hidden">
      <span
        className="haze -left-40 -top-24 h-[28rem] w-[28rem] bg-haze opacity-45"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[46rem] px-4 py-12 sm:px-6 md:py-16">
        <p className="label text-plum/72">Order {order.order_number}</p>
        <h1 className="display-1 mt-3">Thank you.</h1>
        <p className="mt-5 text-base leading-relaxed text-plum/75">
          Placed {formatDate(order.placed_at)} · {STATUS_LABEL[order.status]}. The
          shop will be in touch at {order.email} to arrange payment and delivery
          — nothing has been charged.
        </p>

        <div className="card mt-9 p-6 sm:p-8">
          <h2 className="display-3">What you ordered</h2>

          <ul className="mt-5 space-y-3">
            {order.items.map((item) => (
              <li key={item.slug} className="flex items-center gap-3">
                <span className="tile flex h-12 w-12 shrink-0 items-center justify-center p-1.5">
                  <span className="block h-full w-full">
                    <GoodFigure good={item.good} scale={0.95} />
                  </span>
                </span>
                <span className="min-w-0 flex-1 text-sm">
                  <Link href={`/piece/${item.slug}`} className="hover:text-orange">
                    {item.name}
                  </Link>
                  {item.qty > 1 && <span className="text-plum/72"> × {item.qty}</span>}
                </span>
                <span className="text-sm tabular-nums">
                  {rupees(item.unit_price * item.qty)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-6 border-t border-line pt-4 text-sm">
            <div className="flex justify-between gap-6 py-2">
              <dt className="text-plum/75">Subtotal</dt>
              <dd className="tabular-nums">{rupees(order.subtotal)}</dd>
            </div>
            <div className="flex justify-between gap-6 border-t border-line py-2">
              <dt className="text-plum/75">Delivery</dt>
              <dd className="text-plum/72">Not yet published</dd>
            </div>
            <div className="flex items-baseline justify-between gap-6 border-t border-line pb-1 pt-3">
              <dt className="font-medium">Total</dt>
              <dd className="display-3">{rupees(order.total)}</dd>
            </div>
          </dl>
        </div>

        <div className="card mt-5 p-6 sm:p-7">
          <h2 className="display-3">Going to</h2>
          <address className="mt-4 whitespace-pre-line text-base not-italic leading-relaxed text-plum/75">
            {[order.customer_name, order.address_line, order.city, order.postcode]
              .filter(Boolean)
              .join("\n")}
          </address>
        </div>

        {/* the guest's only route back to this order is the link they are on */}
        <p className="mt-6 rounded-control bg-cream/60 px-4 py-3.5 text-sm text-plum/75">
          Keep this link. It is how you check on this order later.
        </p>

        <Link href="/shop" className="btn btn-quiet mt-7 px-6 py-4 text-sm">
          Back to the shop
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
