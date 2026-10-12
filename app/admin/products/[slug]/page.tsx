import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHead } from "@/components/admin/page-head";
import { ProductForm, WithdrawForm } from "@/components/admin/product-form";
import { getProductBySlug, listProductImages } from "@/lib/data/products";

export default async function EditProduct({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ photos?: string }>;
}) {
  const [{ slug }, { photos }] = await Promise.all([params, searchParams]);
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const images = await listProductImages(product.id);

  return (
    <>
      <PageHead
        title={product.name}
        meta={`Editing ${product.slug}`}
        back={{ href: "/admin/products", label: "Products" }}
        actions={
          product.status === "active" ? (
            <Link href={`/piece/${product.slug}`} className="adm-btn adm-btn-secondary">
              View in shop ↗
            </Link>
          ) : null
        }
      />

      {photos === "failed" && (
        <p role="alert" className="adm-card adm-body mb-5 border-alert/40 p-4 text-alert">
          The piece was saved, but its photographs could not be attached. Add
          them again below.
        </p>
      )}

      <ProductForm product={product} images={images} />

      {/* Outside the product form on purpose: forms cannot nest. */}
      <WithdrawForm slug={product.slug} />
    </>
  );
}
