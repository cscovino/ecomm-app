"use client";

import { useRouter } from "next/navigation";

import { putProduct } from "@/app/api/products";
import ProductForm from "@/components/ProductForm";
import { Product } from "@/types";

interface FormClientProps {
  product: Product;
}

export default async function FormClient({ product }: FormClientProps) {
  const router = useRouter();
  const onEdit = async (payload: Product) => {
    await putProduct(payload);
    router.prefetch(`/products/${product.id}`);
    router.push(`/products/${product.id}`);
  };
  return <ProductForm product={product} onEdit={onEdit} />;
}
