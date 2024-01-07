"use client";

import { useRouter } from "next/navigation";

import ProductForm from "@/components/ProductForm";
import { Product } from "@/types";
import { postProduct } from "@/app/api/products";
import { useTranslations } from "next-intl";

const productTemplate: Product = {
  id: 0,
  reference: "",
  name: "",
  description: "",
  price: "",
  tax: 0,
  quantity: 0,
};

export default function AddProduct() {
  const router = useRouter();
  const t = useTranslations("Products");
  const onAdd = async (payload: Product) => {
    await postProduct(payload);
    router.push(`/products`);
    router.refresh();
  };
  return (
    <main className="min-h-screen flex flex-col items-center p-24">
      <div className="w-3/5 flex flex-col">
        <h1 className="py-4 text-3xl">{t("new")}</h1>
        <ProductForm product={productTemplate} onEdit={onAdd} />
      </div>
    </main>
  );
}
