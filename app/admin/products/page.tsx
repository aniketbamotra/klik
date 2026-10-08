import Link from "next/link";
import { GoodFigure } from "@/components/goods";
import { PageHead } from "@/components/admin/page-head";
import { StockPill } from "@/components/admin/status";
import { Plus } from "@/components/admin/icons";
import { COUNTERS, asGood, rupees } from "@/lib/catalog";
import { listAllProducts } from "@/lib/data/products";

export default async function AdminProducts() {
  const products = await listAllProducts();

  return (
    <>
      <PageHead
        title="Products"
        meta={`${products.length} pieces across ${COUNTERS.length} counters.`}
        actions={
          <Link href="/admin/products/new" className="adm-btn adm-btn-primary">
            <Plus className="h-4 w-4" />
            Add product
          </Link>
        }
      />

      {/* stacked below lg so price, stock and Edit stay reachable */}
      <ul className="space-y-3 lg:hidden">
        {products.map((p) => {
          const counter = COUNTERS.find((c) => c.key === p.counter)!;
          return (
            <li key={p.slug} className="adm-card p-4">
              <div className="flex items-start gap-3">
                <span className="h-12 w-12 shrink-0 rounded-md bg-adm-bg p-1.5">
                  <GoodFigure good={asGood(p.good)} scale={Number(p.scale)} />
                </span>
                <div className="min-w-0 flex-1">
                  <Link href={`/admin/products/${p.slug}`} className="adm-body font-medium hover:underline">
                    {p.name}
                  </Link>
                  <p className="adm-body text-plum/70">
                    {counter.title} · {p.material}
                    {/* drafts and archived pieces are listed here but are not
                        in the shop — the row has to say which is which */}
                    {p.status !== "active" && ` · ${p.status}`}
                  </p>
                </div>
                <p className="adm-body shrink-0 font-medium tabular-nums">{rupees(p.price)}</p>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3 border-t border-adm-line pt-3">
                <StockPill n={p.stock} />
                <Link href={`/admin/products/${p.slug}`} className="adm-btn adm-btn-secondary px-3 py-1.5">
                  Edit
                </Link>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="adm-card hidden overflow-hidden lg:block">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-adm-line">
              <th scope="col" className="adm-label px-5 py-3 text-plum/70">Piece</th>
              <th scope="col" className="adm-label px-5 py-3 text-plum/70">Counter</th>
              <th scope="col" className="adm-label px-5 py-3 text-plum/70">Material</th>
              <th scope="col" className="adm-label px-5 py-3 text-right text-plum/70">Price</th>
              <th scope="col" className="adm-label px-5 py-3 text-plum/70">Stock</th>
              <th scope="col" className="px-5 py-3"><span className="sr-only">Edit</span></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const counter = COUNTERS.find((c) => c.key === p.counter)!;
              return (
                <tr key={p.slug} className="border-b border-adm-line last:border-0 hover:bg-adm-bg">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="h-11 w-11 shrink-0 rounded-md bg-adm-bg p-1.5">
                        <GoodFigure good={asGood(p.good)} scale={Number(p.scale)} />
                      </span>
                      <div className="min-w-0">
                        <Link href={`/admin/products/${p.slug}`} className="adm-body font-medium hover:underline">
                          {p.name}
                        </Link>
                        <p className="adm-body text-plum/70">{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="adm-body px-5 py-3 text-plum/70">
                    {counter.title}
                    {p.status !== "active" && (
                      <span className="adm-label ml-2 rounded-full bg-adm-bg px-2 py-0.5">
                        {p.status}
                      </span>
                    )}
                  </td>
                  <td className="adm-body px-5 py-3 text-plum/70">{p.material}</td>
                  <td className="adm-body px-5 py-3 text-right font-medium tabular-nums">{rupees(p.price)}</td>
                  <td className="px-5 py-3"><StockPill n={p.stock} /></td>
                  <td className="px-5 py-3 text-right">
                    <Link href={`/admin/products/${p.slug}`} className="adm-btn adm-btn-secondary px-3 py-1.5">
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="adm-label mt-5 inline-block rounded-full border border-dashed border-plum/30 px-3 py-1.5 text-plum/70">
        Placeholder names, prices and descriptions — replace them as the real catalogue arrives
      </p>
    </>
  );
}
