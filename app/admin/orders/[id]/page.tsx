import { notFound } from "next/navigation";
import { GoodFigure } from "@/components/goods";
import { PageHead } from "@/components/admin/page-head";
import { OrderStatusPill } from "@/components/admin/status";
import { OrderActions } from "@/components/admin/order-actions";
import { asGood, rupees } from "@/lib/catalog";
import { getOrder, orderCount } from "@/lib/data/orders";
import { STATUS_LABEL, formatDateTime, type OrderStatus } from "@/lib/admin-data";

const FLOW: OrderStatus[] = ["new", "packing", "shipped", "delivered"];

/* The `id` segment carries the order number — KLK-1043 — because that is what
   the buyer quotes and what the owner searches for. The uuid is never in a URL. */
export default async function OrderDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) notFound();

  const cancelled = order.status === "cancelled";
  const stage = FLOW.indexOf(order.status);
  const count = orderCount(order);

  return (
    <>
      <PageHead
        title={order.order_number}
        meta={`${formatDateTime(order.placed_at)} · ${order.customer_name}, ${order.city}`}
        back={{ href: "/admin/orders", label: "Orders" }}
        actions={<OrderStatusPill status={order.status} />}
      />

      <div className="grid gap-5 lg:grid-cols-[1fr_20rem] lg:items-start">
        <div className="adm-card overflow-hidden">
          <h2 className="adm-h2 border-b border-adm-line px-5 py-4">
            {count} item{count === 1 ? "" : "s"}
          </h2>
          <ul>
            {order.items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-4 border-b border-adm-line px-5 py-4 last:border-0"
              >
                <span className="h-14 w-14 shrink-0 rounded-md bg-adm-bg p-2">
                  <GoodFigure good={asGood(item.good)} scale={0.95} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="adm-body font-medium">{item.name}</p>
                  <p className="adm-body text-plum/70">{item.slug}</p>
                </div>
                {/* the price paid, snapshotted at the order — not today's */}
                <p className="adm-body tabular-nums text-plum/70">
                  {item.qty} × {rupees(item.unit_price)}
                </p>
                <p className="adm-body w-20 text-right font-medium tabular-nums">
                  {rupees(item.unit_price * item.qty)}
                </p>
              </li>
            ))}
          </ul>
          <div className="border-t border-adm-line px-5 py-4">
            <div className="flex items-baseline justify-between">
              <p className="adm-body text-plum/70">Subtotal</p>
              <p className="adm-body tabular-nums">{rupees(order.subtotal)}</p>
            </div>
            <div className="mt-1.5 flex items-baseline justify-between">
              <p className="adm-body text-plum/70">Delivery</p>
              <p className="adm-body text-plum/70">Not yet published</p>
            </div>
            <div className="mt-2.5 flex items-baseline justify-between border-t border-adm-line pt-2.5">
              <p className="adm-body font-medium">Total</p>
              <p className="text-lg font-semibold tabular-nums">{rupees(order.total)}</p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <section className="adm-card p-5">
            <h2 className="adm-h2">Progress</h2>
            {cancelled ? (
              <p className="adm-body mt-3 text-alert">
                This order was cancelled. Nothing further to do.
              </p>
            ) : (
              <ol className="mt-4 space-y-3">
                {FLOW.map((s, i) => {
                  const done = i <= stage;
                  return (
                    <li key={s} className="flex items-center gap-3">
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${
                          done ? "bg-plum text-cream" : "bg-adm-bg text-plum/45"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className={`adm-body ${done ? "font-medium" : "text-plum/55"}`}>
                        {STATUS_LABEL[s]}
                      </span>
                      {i === stage && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-orange" />
                      )}
                    </li>
                  );
                })}
              </ol>
            )}
          </section>

          <section className="adm-card p-5">
            <h2 className="adm-h2">Customer</h2>
            <dl className="mt-4 space-y-2.5">
              <div className="flex justify-between gap-4">
                <dt className="adm-body text-plum/70">Name</dt>
                <dd className="adm-body text-right">{order.customer_name}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="adm-body text-plum/70">Email</dt>
                <dd className="adm-body break-all text-right">
                  <a href={`mailto:${order.email}`} className="hover:underline">
                    {order.email}
                  </a>
                </dd>
              </div>
              {order.phone && (
                <div className="flex justify-between gap-4">
                  <dt className="adm-body text-plum/70">Phone</dt>
                  <dd className="adm-body text-right">{order.phone}</dd>
                </div>
              )}
              <div className="flex justify-between gap-4">
                <dt className="adm-body text-plum/70">Address</dt>
                <dd className="adm-body whitespace-pre-line text-right">
                  {[order.address_line, order.city, order.postcode]
                    .filter(Boolean)
                    .join("\n")}
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-adm-line pt-2.5">
                <dt className="adm-body text-plum/70">Account</dt>
                {/* whether this was a guest checkout matters when chasing an
                    order: there is no account to look the buyer up in */}
                <dd className="adm-body text-right">
                  {order.user_id ? "Signed in" : "Guest checkout"}
                </dd>
              </div>
            </dl>

            {order.note && (
              <div className="mt-4 border-t border-adm-line pt-4">
                <p className="adm-label text-plum/70">Note from the buyer</p>
                <p className="adm-body mt-1.5 whitespace-pre-line">{order.note}</p>
              </div>
            )}
          </section>

          <OrderActions orderNumber={order.order_number} status={order.status} />
        </div>
      </div>
    </>
  );
}
