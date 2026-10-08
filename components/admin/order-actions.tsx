"use client";

import { useActionState } from "react";
import { setOrderStatus, type ActionState } from "@/lib/admin/actions";
import { NEXT_STATUSES, STATUS_LABEL, type OrderStatus } from "@/lib/admin-data";

const EMPTY: ActionState = {};

/* One label per move, naming the work rather than the state. A button reading
   "Mark as packed" on a delivered order describes something done last week, so
   an order with nowhere left to go offers nothing. */
const MOVE_LABEL: Partial<Record<OrderStatus, string>> = {
  packing: "Start packing",
  shipped: "Mark as shipped",
  delivered: "Mark as delivered",
  cancelled: "Cancel order",
};

export function OrderActions({
  orderNumber,
  status,
}: {
  orderNumber: string;
  status: OrderStatus;
}) {
  const [state, action, pending] = useActionState(setOrderStatus, EMPTY);
  const moves = NEXT_STATUSES[status];

  return (
    <div className="adm-card p-5">
      {moves.length === 0 ? (
        <p className="adm-body text-plum/70">
          Nothing left to do — this order is {STATUS_LABEL[status].toLowerCase()}.
        </p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {moves.map((next, i) => (
            <form key={next} action={action}>
              <input type="hidden" name="order_number" value={orderNumber} />
              <input type="hidden" name="status" value={next} />
              <button
                type="submit"
                disabled={pending}
                className={`adm-btn w-full ${
                  next === "cancelled"
                    ? "adm-btn-danger"
                    : i === 0
                      ? "adm-btn-primary"
                      : "adm-btn-secondary"
                }`}
              >
                {pending ? "Saving…" : (MOVE_LABEL[next] ?? STATUS_LABEL[next])}
              </button>
            </form>
          ))}
        </div>
      )}

      {state.error && (
        <p role="alert" className="adm-body mt-3 text-alert">
          {state.error}
        </p>
      )}

      {/* the database returns the units on the cancelling transition, so this
          is a statement of what will happen rather than a warning */}
      {moves.includes("cancelled") && (
        <p className="adm-label mt-4 block text-center text-plum/70">
          Cancelling returns the stock to the shelf
        </p>
      )}
    </div>
  );
}
