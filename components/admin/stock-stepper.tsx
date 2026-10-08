"use client";

import { useActionState, useState } from "react";
import { setStock, type ActionState } from "@/lib/admin/actions";

const EMPTY: ActionState = {};

/* Stock adjustment that saves. The stepper is optimistic locally so counting up
   ten units does not mean ten round trips; Save is what writes, and until it is
   pressed the row says the number is unsaved rather than quietly implying it
   went somewhere.

   Call sites key this on the saved figure, so once the server confirms a new
   number the component remounts around it. That is React's answer to "reset
   state when a prop changes" — no effect, no cascading render. */
export function StockStepper({
  slug,
  name,
  initial,
}: {
  slug: string;
  name: string;
  initial: number;
}) {
  const [n, setN] = useState(initial);
  const [state, action, pending] = useActionState(setStock, EMPTY);

  const dirty = n !== initial;

  return (
    <form action={action} className="flex items-center gap-2">
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="stock" value={n} />

      <div className="flex items-center rounded-lg border border-adm-line bg-adm-surface">
        <button
          type="button"
          onClick={() => setN((v) => Math.max(0, v - 1))}
          disabled={n === 0}
          aria-label={`Reduce ${name} stock`}
          className="px-3 py-1.5 text-sm leading-none enabled:hover:text-orange disabled:cursor-not-allowed disabled:text-plum/30"
        >
          −
        </button>
        <span className="min-w-9 text-center text-sm tabular-nums" aria-live="polite">
          {n}
        </span>
        <button
          type="button"
          onClick={() => setN((v) => Math.min(999, v + 1))}
          aria-label={`Increase ${name} stock`}
          className="px-3 py-1.5 text-sm leading-none hover:text-orange"
        >
          +
        </button>
      </div>

      {dirty && (
        <>
          <button
            type="submit"
            disabled={pending}
            className="adm-btn adm-btn-primary px-3 py-1.5"
          >
            {pending ? "Saving…" : "Save"}
          </button>
          <button
            type="button"
            onClick={() => setN(initial)}
            className="adm-body text-plum/70 underline underline-offset-2 hover:text-plum"
          >
            Reset
          </button>
        </>
      )}

      {state.error && (
        <span role="alert" className="adm-body text-alert">
          {state.error}
        </span>
      )}
    </form>
  );
}
