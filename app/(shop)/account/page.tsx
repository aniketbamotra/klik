import type { Metadata } from "next";
import Link from "next/link";
import { GoodFigure } from "@/components/goods";
import { ArrowRight } from "@/components/icons";
import { ProfileForm } from "@/components/profile-form";
import { asGood, rupees } from "@/lib/catalog";
import { requireUser } from "@/lib/data/session";
import { listMyOrders } from "@/lib/data/orders";
import { STATUS_LABEL, formatDate } from "@/lib/admin-data";

export const metadata: Metadata = {
  title: "Your account · Klik",
};

export default async function AccountPage() {
  const viewer = await requireUser();
  const orders = await listMyOrders(viewer.id);

  return (
    <section className="relative overflow-hidden">
      <span
        className="haze -left-40 -top-24 h-[28rem] w-[28rem] bg-haze opacity-45"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1240px] px-4 py-12 sm:px-6 md:py-16">
        <h1 className="display-1">Your account.</h1>
        <p className="mt-4 text-base text-plum/75">{viewer.email}</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_22rem] lg:gap-10">
          <div>
            <h2 className="display-3">Orders</h2>

            {orders.length === 0 ? (
              <div className="card mt-5 p-8">
                <p className="text-base text-plum/75">
                  Nothing ordered yet. Anything you buy from here on will be
                  listed on this page.
                </p>
                <Link href="/shop" className="btn btn-primary mt-6 px-7 py-4 text-sm">
                  Browse the shop
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <ul className="mt-5 space-y-4">
                {orders.map((order) => (
                  <li key={order.id} className="card p-5 sm:p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <p className="text-base font-medium tabular-nums">
                        {order.order_number}
                      </p>
                      <p className="text-base font-medium">{rupees(order.total)}</p>
                    </div>
                    <p className="mt-1 text-sm text-plum/75">
                      {formatDate(order.placed_at)} · {STATUS_LABEL[order.status]}
                    </p>

                    <ul className="mt-4 flex flex-wrap gap-3">
                      {order.items.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-center gap-3 rounded-tile bg-paper px-3 py-2"
                        >
                          <span className="block h-9 w-9 shrink-0">
                            <GoodFigure good={asGood(item.good)} scale={0.9} />
                          </span>
                          <span className="text-sm">
                            {item.name}
                            {item.qty > 1 && (
                              <span className="text-plum/72"> × {item.qty}</span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <ProfileForm name={viewer.name ?? ""} phone={viewer.phone ?? ""} />
          </aside>
        </div>
      </div>
    </section>
  );
}
