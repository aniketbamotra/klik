import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToBag } from "@/components/add-to-bag";
import { PieceImage } from "@/components/piece-image";
import { PieceGallery } from "@/components/piece-gallery";
import { ProductCard } from "@/components/product-card";
import { ArrowRight, Return, Shield, Truck } from "@/components/icons";
import { COUNTERS, rupees } from "@/lib/catalog";
import { getPiece, listPieces } from "@/lib/data/products";

/* Deliberately no generateStaticParams: the owner adds, renames and archives
   pieces from the admin, so the set of product URLs is not knowable at build
   time. These render per request against the catalogue as it stands. */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const piece = await getPiece(slug);
  return piece
    ? { title: `${piece.name} — Klik`, description: piece.note }
    : { title: "Not found — Klik" };
}

export default async function PiecePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const piece = await getPiece(slug);
  if (!piece) notFound();

  const counter = COUNTERS.find((c) => c.key === piece.counter)!;
  const alsoHere = (await listPieces())
    .filter((p) => p.counter === piece.counter && p.slug !== piece.slug)
    .slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden">
        <span
          className="haze -right-40 -top-32 h-[32rem] w-[32rem] bg-haze opacity-50"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1240px] px-4 py-8 sm:px-6 md:py-12">
          <nav aria-label="Breadcrumb" className="text-sm text-plum/75">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/shop" className="hover:text-plum">
                  Shop
                </Link>
              </li>
              <li aria-hidden="true">·</li>
              <li>
                <Link href={`/shop/${counter.key}`} className="hover:text-plum">
                  {counter.title}
                </Link>
              </li>
              <li aria-hidden="true">·</li>
              <li className="text-plum">{piece.name}</li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-14">
            {/* the object, on its own plane — hugs its content and stays put
                while the description is read */}
            <div className="card self-start p-3 sm:p-4 md:sticky md:top-28">
              {piece.images.length > 1 ? (
                <PieceGallery piece={piece} />
              ) : (
                <PieceImage
                  piece={piece}
                  className="aspect-square"
                  /* the piece page is the one place the object should crowd
                     its frame; the grid keeps true comparative scale */
                  scaleBoost={0.12}
                  pad="p-3 sm:p-4"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  priority
                />
              )}
            </div>

            <div className="md:pt-4">
              <h1 className="display-1">{piece.name}</h1>
              <p className="mt-5 text-2xl">{rupees(piece.price)}</p>
              <p className="mt-6 max-w-[44ch] text-lg leading-relaxed">
                {piece.note}
              </p>
              <div className="mt-5 max-w-[46ch] space-y-4 text-base leading-relaxed text-plum/75">
                {piece.story.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>

              <AddToBag piece={piece} />

              {/* the same reassurance the homepage offers where interest
                  starts, put where the decision is actually made */}
              <ul className="mt-8 grid gap-3 border-t border-line pt-7 sm:grid-cols-3">
                {(
                  [
                    [Truck, "Delivery", "Terms not yet published"],
                    [Return, "Returns", "Policy not yet published"],
                    /* the homepage calls this "Secure checkout" — one name
                       per concept, or the buyer reads two different things */
                    [Shield, "Secure checkout", "Payments not yet connected"],
                  ] as const
                ).map(([Icon, title, note]) => (
                  <li key={title} className="flex items-start gap-2.5">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">{title}</p>
                      <p className="mt-0.5 text-xs text-plum/72">{note}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <dl className="mt-8 border-t border-line pt-7 text-sm">
                <div className="flex justify-between gap-6 py-2.5">
                  <dt className="text-plum/75">Material</dt>
                  <dd className="text-right font-medium">{piece.material}</dd>
                </div>
                <div className="flex justify-between gap-6 border-t border-line py-2.5">
                  <dt className="text-plum/75">Counter</dt>
                  <dd className="text-right font-medium">
                    <Link
                      href={`/shop/${counter.key}`}
                      className="hover:text-orange"
                    >
                      {counter.title}
                    </Link>
                  </dd>
                </div>
                {/* an empty spec row advertises the gap on every product —
                    better to omit it until the piece has been measured */}
                {piece.dimensions && (
                  <div className="flex justify-between gap-6 border-t border-line py-2.5">
                    <dt className="text-plum/75">Dimensions</dt>
                    <dd className="text-right font-medium">{piece.dimensions}</dd>
                  </div>
                )}
              </dl>

              {/* the buyer cannot hold this, so a drawing must not be allowed
                  to pass for a photograph. Once the piece is photographed the
                  note would contradict the image beside it, so it goes. */}
              {piece.images.length === 0 && (
                <p className="label mt-7 inline-block rounded-full border border-dashed border-plum/45 px-3.5 py-1.5 text-plum/72">
                  Drawing, not a photograph — real imagery to come
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {alsoHere.length > 0 && (
        <section className="border-t border-line">
          <div className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6 md:py-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="display-2">Also at this counter.</h2>
              <Link
                href={`/shop/${counter.key}`}
                className="btn btn-quiet px-6 py-3.5 text-sm"
              >
                All {counter.title.toLowerCase()}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="plane mt-8 p-4 sm:p-7">
              <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                {alsoHere.map((p) => (
                  <ProductCard key={p.slug} piece={p} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
