"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { OrderStatusPill } from "@/components/admin/status";
import { EmptyState } from "@/components/admin/empty";
import { rupees } from "@/lib/catalog";
import { STATUS_LABEL, formatDate, type OrderStatus } from "@/lib/admin-data";
import { orderCount, type OrderWithItems } from "@/lib/orders";

const FILTERS: (OrderStatus | "all")[] = [
  "all",
  "new",
  "packing",
  "shipped",
  "delivered",
  "cancelled",
];

function OrdersInner({ orders }: { orders: OrderWithItems[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const initialStatus = (params.get("status") ?? "all") as OrderStatus | "all";
  const [status, setStatus] = useState<OrderStatus | "all">(
    FILTERS.includes(initialStatus) ? initialStatus : "all",
  );
  const [q, setQ] = useState(params.get("q") ?? "");
  const term = q.trim().toLowerCase();

  useEffect(() => {
    const t = window.setTimeout(() => {
      const sp = new URLSearchParams();
      if (status !== "all") sp.set("status", status);
      if (q.trim()) sp.set("q", q.trim());
      const next = sp.toString() ? `/admin/orders?${sp}` : "/admin/orders";
      if (next !== window.location.pathname + window.location.search) {
        router.replace(next, { scroll: false });
      }
    }, 250);
    return () => window.clearTimeout(t);
  }, [status, q, router]);

  const rows = useMemo(
    () =>
      orders
        .filter((o) => status === "all" || o.status === status)
        .filter(
          (o) =>
            !term ||
            [o.order_number, o.customer_name, o.city, o.email]
              .join(" ")
              .toLowerCase()
              .includes(term),
        ),
    [orders, status, term],
  );

  const count = (s: OrderStatus | "all") =>
    s === "all" ? orders.length : orders.filter((o) => o.status === s).length;

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by status">
          {FILTERS.map((f) => {
            const on = f === status;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setStatus(f)}
                aria-pressed={on}
                className={`adm-btn px-3 py-1.5 ${
                  on ? "adm-btn-primary" : "adm-btn-secondary"
                }`}
              >
                {f === "all" ? "All" : STATUS_LABEL[f]}
                <span className={on ? "text-cream/70" : "text-plum/50"}>
                  {count(f)}
                </span>
              </button>
            );
          })}
        </div>

        <div className="lg:w-72">
          <label htmlFor="order-q" className="sr-only">
            Search orders
          </label>
          <input
            id="order-q"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Order number, name, city or email"
            className="adm-field"
          />
        </div>
      </div>

      <p aria-live="polite" className="adm-body mb-3 text-plum/70">
        {rows.length} of {orders.length} orders
      </p>

      {rows.length === 0 ? (
        <EmptyState
          title="No orders match that."
          body={
            term
              ? `Nothing matches “${q.trim()}”${status !== "all" ? ` in ${STATUS_LABEL[status as OrderStatus].toLowerCase()}` : ""}. Order numbers look like KLK-1042.`
              : "There are no orders at this status yet."
          }
        />
      ) : (
        <>
        <ul className="space-y-3 lg:hidden">
          {rows.map((o) => (
            <li key={o.id} className="adm-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Link href={`/admin/orders/${o.order_number}`} className="adm-body font-medium hover:underline">
                    {o.order_number}
                  </Link>
                  <p className="adm-body text-plum/70">
                    {o.customer_name} · {o.city}
                  </p>
                  <p className="adm-body text-plum/70">{formatDate(o.placed_at)}</p>
                </div>
                <OrderStatusPill status={o.status} />
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-adm-line pt-3">
                <span className="adm-body text-plum/70">
                  {orderCount(o)} item{orderCount(o) === 1 ? "" : "s"}
                </span>
                <span className="adm-body font-medium tabular-nums">{rupees(o.total)}</span>
              </div>
            </li>
          ))}
        </ul>

        <div className="adm-card hidden overflow-hidden lg:block">
          <div>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-adm-line">
                  <th scope="col" className="adm-label px-5 py-3 text-plum/70">Order</th>
                  <th scope="col" className="adm-label px-5 py-3 text-plum/70">Placed</th>
                  <th scope="col" className="adm-label px-5 py-3 text-plum/70">Customer</th>
                  <th scope="col" className="adm-label px-5 py-3 text-plum/70">Status</th>
                  <th scope="col" className="adm-label px-5 py-3 text-right text-plum/70">Items</th>
                  <th scope="col" className="adm-label px-5 py-3 text-right text-plum/70">Total</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((o) => (
                  <tr key={o.id} className="border-b border-adm-line last:border-0 hover:bg-adm-bg">
                    <td className="px-5 py-3">
                      <Link href={`/admin/orders/${o.order_number}`} className="adm-body font-medium hover:underline">
                        {o.order_number}
                      </Link>
                    </td>
                    <td className="adm-body px-5 py-3 text-plum/70">{formatDate(o.placed_at)}</td>
                    <td className="px-5 py-3">
                      <p className="adm-body">{o.customer_name}</p>
                      <p className="adm-body text-plum/70">{o.city}</p>
                    </td>
                    <td className="px-5 py-3"><OrderStatusPill status={o.status} /></td>
                    <td className="adm-body px-5 py-3 text-right tabular-nums">{orderCount(o)}</td>
                    <td className="adm-body px-5 py-3 text-right font-medium tabular-nums">{rupees(o.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </>
      )}
    </>
  );
}

export function OrdersView({ orders }: { orders: OrderWithItems[] }) {
  return (
    <Suspense fallback={null}>
      <OrdersInner orders={orders} />
    </Suspense>
  );
}
