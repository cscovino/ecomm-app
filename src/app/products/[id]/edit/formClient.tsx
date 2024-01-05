"use client";
import { putProduct } from "@/app/api/products";
import ProductForm from "@/components/ProductForm";
import { Product } from "@/types";
import { useRouter } from "next/navigation";

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
