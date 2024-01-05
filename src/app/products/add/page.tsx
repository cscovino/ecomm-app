"use client";
import { postProduct } from "@/app/api/products";
import ProductForm from "@/components/ProductForm";
import { Product } from "@/types";
import { useRouter } from "next/navigation";

const productTemplate: Product = {
  id: 0,
  reference: "",
  name: "",
  description: "",
  price: "",
  tax: 0,
  quantity: 0,
};

export default async function AddProduct() {
  const router = useRouter();
  const onAdd = async (payload: Product) => {
    await postProduct(payload);
    router.push(`/products`);
  };
  return (
    <main className="min-h-screen flex flex-col items-center p-24">
      <div className="w-3/5 flex flex-col">
        <h1 className="py-4 text-3xl">New Product</h1>
        <ProductForm product={productTemplate} onEdit={onAdd} />
      </div>
    </main>
  );
}
