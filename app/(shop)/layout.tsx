import { BagProvider } from "@/lib/bag";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { listPieces } from "@/lib/data/products";
import { getViewer } from "@/lib/data/session";

/* The storefront shell. The admin sits outside this group and brings its
   own chrome, so neither surface inherits the other's furniture.

   The catalogue is fetched once here and handed down through the bag provider,
   so client components — the header's counts, the bag's line prices — can read
   the live shop without every one of them fetching for itself. */
export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pieces, viewer] = await Promise.all([listPieces(), getViewer()]);

  return (
    <BagProvider pieces={pieces}>
      <SiteHeader signedIn={viewer.kind !== "guest"} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </BagProvider>
  );
}
