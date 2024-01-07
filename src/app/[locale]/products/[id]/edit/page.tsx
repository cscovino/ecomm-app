import { getProductById } from "@/app/api/products";

import FormClient from "./formClient";

export default async function EditProduct({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await getProductById(id);
  return (
    <main className="min-h-screen flex flex-col items-center p-24">
      <div className="w-3/5 flex flex-col">
        <h1 className="py-4 text-3xl">Product #{product.id}</h1>
        <FormClient product={product} />
      </div>
    </main>
  );
}
