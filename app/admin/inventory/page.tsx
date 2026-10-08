import { GoodFigure } from "@/components/goods";
import { PageHead } from "@/components/admin/page-head";
import { StockPill } from "@/components/admin/status";
import { StockStepper } from "@/components/admin/stock-stepper";
import { asGood, rupees } from "@/lib/catalog";
import { listAllProducts } from "@/lib/data/products";
import { LOW_STOCK_AT, stockLevel } from "@/lib/admin-data";

export default async function AdminInventory() {
  /* Archived pieces are not stock the shop is holding for sale, so this screen
     counts only what is actually on the shelf. */
  const live = (await listAllProducts()).filter((p) => p.status !== "archived");
  const sorted = [...live].sort((a, b) => a.stock - b.stock);

  const s = {
    unitsOnHand: live.reduce((n, p) => n + p.stock, 0),
    outOfStock: live.filter((p) => stockLevel(p.stock) === "out").length,
    lowStock: live.filter((p) => stockLevel(p.stock) === "low").length,
    pieces: live.length,
  };

  return (
    <>
      <PageHead
        title="Inventory"
        meta={`${s.unitsOnHand} units on hand. Low is ${LOW_STOCK_AT} or fewer.`}
      />

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Out of stock", value: s.outOfStock },
          { label: "Low", value: s.lowStock },
          { label: "In stock", value: s.pieces - s.outOfStock - s.lowStock },
        ].map((t) => (
          <div key={t.label} className="adm-card p-5">
            <p className="adm-label text-plum/70">{t.label}</p>
            {/* the pills carry status colour; a bare count does not */}
            <p className="mt-2 text-2xl font-semibold tabular-nums">{t.value}</p>
          </div>
        ))}
      </div>

      {/* below lg the table becomes stacked cards — adjusting stock is the
          whole point of this screen and must not sit off-canvas */}
      <ul className="mt-6 space-y-3 lg:hidden">
        {sorted.map((p) => {
          const n = p.stock;
          return (
            <li key={p.slug} className="adm-card flex items-start gap-3 p-4">
              <span className="h-12 w-12 shrink-0 rounded-md bg-adm-bg p-1.5">
                <GoodFigure good={asGood(p.good)} scale={Number(p.scale)} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="adm-body font-medium">{p.name}</p>
                <p className="adm-body text-plum/70">
                  {rupees(p.price)} each · {rupees(n * p.price)} on hand
                </p>
              </div>
              {/* the control sits with the count it changes, not below a rule */}
              <div className="flex shrink-0 flex-col items-end gap-2">
                <StockPill n={n} />
                <StockStepper key={n} slug={p.slug} name={p.name} initial={n} />
              </div>
            </li>
          );
        })}
      </ul>

      <div className="adm-card mt-6 hidden overflow-hidden lg:block">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-adm-line">
              <th scope="col" className="adm-label px-5 py-3 text-plum/70">Piece</th>
              <th scope="col" className="adm-label px-5 py-3 text-plum/70">Status</th>
              <th scope="col" className="adm-label px-5 py-3 text-right text-plum/70">Value on hand</th>
              <th scope="col" className="adm-label px-5 py-3 text-right text-plum/70">Adjust</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p) => {
              const n = p.stock;
              return (
                <tr
                  key={p.slug}
                  className="border-b border-adm-line last:border-0 hover:bg-adm-bg"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="h-11 w-11 shrink-0 rounded-md bg-adm-bg p-1.5">
                        <GoodFigure good={asGood(p.good)} scale={Number(p.scale)} />
                      </span>
                      <div className="min-w-0">
                        <p className="adm-body truncate font-medium">{p.name}</p>
                        <p className="adm-body text-plum/70">{rupees(p.price)} each</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3"><StockPill n={n} /></td>
                  <td className="adm-body px-5 py-3 text-right tabular-nums">{rupees(n * p.price)}</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end">
                      <StockStepper key={n} slug={p.slug} name={p.name} initial={n} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="adm-label mt-5 inline-block rounded-full border border-dashed border-plum/30 px-3 py-1.5 text-plum/70">
        Checkout decrements these figures as orders come in
      </p>
    </>
  );
}
