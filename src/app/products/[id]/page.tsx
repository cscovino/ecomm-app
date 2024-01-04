import { getProductById } from "@/app/api/products";

export default async function Product({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await getProductById(id);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full flex flex-col font-mono">
        <div className="flex flex-col pt-5 w-fit">
          <h1 className="py-2 text-3xl">{product.name}</h1>
          <div className="flex justify-between">
            <span className="inline-flex items-center h-fit self-start gap-x-0.5 py-0.5 px-2 rounded-md text-xs border border-gray-200 bg-white text-gray-800 shadow-sm">
              Ref: {product.reference}
            </span>
            <span className="inline-flex items-center h-fit self-start gap-x-0.5 py-0.5 px-2 rounded-md text-xs border border-gray-200 text-white shadow-sm">
              Qty: {product.quantity}
            </span>
          </div>
        </div>
        <p className="py-4">{product.description}</p>
        <div className="flex gap-6">
          <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-md text-xs font-medium border border-cyan-600 text-cyan-600">
            Price: {product.price}
          </span>
          <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-md text-xs font-medium border border-yellow-600 text-yellow-600">
            Tax: {product.tax}%
          </span>
        </div>
      </div>
    </main>
  );
}
