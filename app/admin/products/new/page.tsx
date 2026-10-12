import { PageHead } from "@/components/admin/page-head";
import { ProductForm } from "@/components/admin/product-form";

export default function NewProduct() {
  /* Generated here rather than in the client form so the server render and
     hydration agree. Photographs upload into this id's folder before the piece
     is saved, and the piece is then created with it. */
  const draftId = crypto.randomUUID();

  return (
    <>
      <PageHead
        title="Add product"
        meta="Fill what you know — photographs included. Only the name and price are required."
        back={{ href: "/admin/products", label: "Products" }}
      />
      <ProductForm draftId={draftId} />
    </>
  );
}
