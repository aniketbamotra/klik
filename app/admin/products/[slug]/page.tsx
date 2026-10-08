import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHead } from "@/components/admin/page-head";
import { ProductForm, WithdrawForm } from "@/components/admin/product-form";
import { ImageUpload } from "@/components/admin/image-upload";
import { getProductBySlug, listProductImages } from "@/lib/data/products";

export default async function EditProduct({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
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

      <ProductForm product={product} />

      {/* Outside the product form on purpose: forms cannot nest, and neither
          uploading nor withdrawing should wait on the rest of the fields. */}
      <WithdrawForm slug={product.slug} />

      <section className="adm-card mt-5 p-5 sm:p-6">
        <h2 className="adm-h2">Photographs</h2>
        <p className="adm-body mt-1 text-plum/70">
          The shop draws every piece until real photography exists. Uploads are
          stored against this product.
        </p>
        <div className="mt-5">
          {/* keyed on the stored count: a successful upload remounts this and
              the staged preview clears against the server's own list */}
          <ImageUpload
            key={images.length}
            productId={product.id}
            images={images}
          />
        </div>
      </section>
    </>
  );
}
