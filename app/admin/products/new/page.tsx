import { PageHead } from "@/components/admin/page-head";
import { ProductForm } from "@/components/admin/product-form";

export default function NewProduct() {
  return (
    <>
      <PageHead
        title="Add product"
        meta="Fill what you know. Photographs can be added once it is saved."
        back={{ href: "/admin/products", label: "Products" }}
      />
      <ProductForm />
    </>
  );
}
