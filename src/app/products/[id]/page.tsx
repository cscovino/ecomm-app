import { getProductById } from "@/app/api/products";
import Link from "next/link";

export default async function Product({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await getProductById(id);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-3/5 flex flex-col font-mono">
        <div className="self-end flex gap-4">
          <Link href={`/products`}>
            <button
              type="button"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-200 disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-700 focus:outline-none"
            >
              Back
            </button>
          </Link>
          <Link href={`/products/${id}/edit`}>
            <button
              type="button"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent disabled:opacity-50 disabled:pointer-events-none text-blue-500 hover:bg-blue-800/30 hover:text-blue-400 focus:outline-none focus:ring-1 focus:ring-gray-600"
            >
              Edit
            </button>
          </Link>
        </div>
        <div className="flex flex-col w-fit">
          <h1 className="py-2 text-3xl">{product.name}</h1>
          <div className="flex justify-between gap-2">
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
