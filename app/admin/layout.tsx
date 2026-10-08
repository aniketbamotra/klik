import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/shell";
import { requireAdmin } from "@/lib/data/session";
import { listAllProducts } from "@/lib/data/products";
import { listOrders } from "@/lib/data/orders";
import { OPEN_STATUSES, stockLevel } from "@/lib/admin-data";

export const metadata: Metadata = {
  title: "Shop admin — Klik",
  robots: { index: false, follow: false },
};

/* The real admin gate. The proxy only established that someone is signed in;
   this asks the database whether they are the owner, and it runs before any
   admin page renders. */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  const [products, orders] = await Promise.all([listAllProducts(), listOrders()]);

  return (
    <AdminShell
      openOrders={orders.filter((o) => OPEN_STATUSES.includes(o.status)).length}
      needingRestock={
        products.filter((p) => p.status === "active" && stockLevel(p.stock) !== "ok").length
      }
    >
      {children}
    </AdminShell>
  );
}
