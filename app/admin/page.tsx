import Link from "next/link";
import { GoodFigure } from "@/components/goods";
import { PageHead } from "@/components/admin/page-head";
import { OrderStatusPill, StockPill } from "@/components/admin/status";
import { Plus } from "@/components/admin/icons";
import { asGood, rupees } from "@/lib/catalog";
import { listAllProducts } from "@/lib/data/products";
import { listOrders, orderCount } from "@/lib/data/orders";
import { LOW_STOCK_AT, OPEN_STATUSES, formatDate, stockLevel } from "@/lib/admin-data";

export default async function AdminOverview() {
  const [products, orders] = await Promise.all([listAllProducts(), listOrders()]);

  const live = products.filter((p) => p.status === "active");
  const open = orders.filter((o) => OPEN_STATUSES.includes(o.status));
  const delivered = orders.filter((o) => o.status === "delivered");
  const needsAttention = live.filter((p) => stockLevel(p.stock) !== "ok");
  const outOfStock = live.filter((p) => p.stock === 0).length;

  const recent = orders.slice(0, 5);
  /* Money is summed off the orders themselves, never recomputed from today's
     prices — what was paid is history. */
  const openValue = open.reduce((n, o) => n + o.total, 0);
  const fulfilledValue = delivered.reduce((n, o) => n + o.total, 0);
  const unitsOnHand = live.reduce((n, p) => n + p.stock, 0);

  const tiles = [
    {
      label: "Open orders",
      value: String(open.length),
      note: `${rupees(openValue)} to fulfil`,
    },
    {
      label: "Delivered",
      value: rupees(fulfilledValue),
      note: `${delivered.length} order${delivered.length === 1 ? "" : "s"} completed`,
    },
    {
      label: "Needs restock",
      value: String(needsAttention.length),
      note: `${outOfStock} out, ${needsAttention.length - outOfStock} low`,
    },
    {
      label: "Units on hand",
      value: String(unitsOnHand),
      note: `Across ${live.length} piece${live.length === 1 ? "" : "s"}`,
    },
  ];

  return (
    <>
      <PageHead
        title="Overview"
        meta="Everything that needs you today."
        actions={
          <Link href="/admin/products/new" className="adm-btn adm-btn-primary">
            <Plus className="h-4 w-4" />
            Add product
          </Link>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {tiles.map((t) => (
          <div key={t.label} className="adm-card p-5">
            <p className="adm-label text-plum/70">{t.label}</p>
            <p className="mt-2 text-2xl font-semibold tabular-nums">{t.value}</p>
            <p className="adm-body mt-1 text-plum/70">{t.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <section className="adm-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-adm-line px-5 py-4">
            <h2 className="adm-h2">Recent orders</h2>
            <Link href="/admin/orders" className="adm-body text-plum/70 hover:text-plum">
              All orders
            </Link>
          </div>

          {recent.length === 0 ? (
            <p className="adm-body px-5 py-6 text-plum/70">
              No orders yet. The first one placed in the shop appears here.
            </p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-adm-line">
                  <th scope="col" className="adm-label px-5 py-2.5 text-plum/70">Order</th>
                  <th scope="col" className="adm-label px-5 py-2.5 text-plum/70">Customer</th>
                  <th scope="col" className="adm-label hidden px-5 py-2.5 text-plum/70 sm:table-cell">Status</th>
                  <th scope="col" className="adm-label px-5 py-2.5 text-right text-plum/70">Total</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((o) => (
                  <tr key={o.id} className="border-b border-adm-line last:border-0 hover:bg-adm-bg">
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/orders/${o.order_number}`}
                        className="adm-body font-medium hover:underline"
                      >
                        {o.order_number}
                      </Link>
                      <p className="adm-body text-plum/70">{formatDate(o.placed_at)}</p>
                    </td>
                    <td className="px-5 py-3">
                      <p className="adm-body">{o.customer_name}</p>
                      <p className="adm-body text-plum/70">{o.city}</p>
                    </td>
                    <td className="hidden px-5 py-3 sm:table-cell">
                      <OrderStatusPill status={o.status} />
                    </td>
                    <td className="px-5 py-3 text-right">
                      <p className="adm-body font-medium tabular-nums">{rupees(o.total)}</p>
                      <p className="adm-body text-plum/70">
                        {orderCount(o)} item{orderCount(o) === 1 ? "" : "s"}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="adm-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-adm-line px-5 py-4">
            <h2 className="adm-h2">Needs restock</h2>
            <Link href="/admin/inventory" className="adm-body text-plum/70 hover:text-plum">
              Inventory
            </Link>
          </div>
          {/* the good day is the one this list is empty, and it should read
              as an answer rather than as a section that failed to load */}
          {needsAttention.length === 0 ? (
            <p className="adm-body px-5 py-6 text-plum/70">
              Every piece is above {LOW_STOCK_AT} units. Nothing to reorder.
            </p>
          ) : (
            <ul>
              {needsAttention.map((p) => (
                <li
                  key={p.slug}
                  className="flex items-center gap-3 border-b border-adm-line px-5 py-3 last:border-0"
                >
                  <span className="h-10 w-10 shrink-0 rounded-md bg-adm-bg p-1.5">
                    <GoodFigure good={asGood(p.good)} scale={Number(p.scale)} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="adm-body truncate font-medium">{p.name}</p>
                    <p className="adm-body text-plum/70">{p.material}</p>
                  </div>
                  <StockPill n={p.stock} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
