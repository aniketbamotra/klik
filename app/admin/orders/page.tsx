import { PageHead } from "@/components/admin/page-head";
import { OrdersView } from "@/components/admin/orders-view";
import { EmptyState } from "@/components/admin/empty";
import { listOrders } from "@/lib/data/orders";
import { OPEN_STATUSES } from "@/lib/admin-data";

export default async function AdminOrders() {
  const orders = await listOrders();
  const open = orders.filter((o) => OPEN_STATUSES.includes(o.status));

  return (
    <>
      <PageHead
        title="Orders"
        meta={
          orders.length === 0
            ? "Nothing has been ordered yet."
            : `${orders.length} orders · ${open.length} still to fulfil.`
        }
      />

      {orders.length === 0 ? (
        <EmptyState
          title="No orders yet."
          body="Orders placed in the shop land here, whether the buyer had an account or checked out as a guest."
          action={{ href: "/", label: "View the shop" }}
        />
      ) : (
        <>
          <OrdersView orders={orders} />
          <p className="adm-label mt-5 inline-block rounded-full border border-dashed border-plum/30 px-3 py-1.5 text-plum/70">
            No payment is taken at checkout — settle each order with the buyer directly
          </p>
        </>
      )}
    </>
  );
}
