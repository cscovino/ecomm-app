"use client";

import { useRouter } from "@/navigation";
import { putProduct } from "@/app/api/products";
import ProductForm from "@/components/ProductForm";
import { Product } from "@/types";

interface FormClientProps {
  product: Product;
}

export default function FormClient({ product }: FormClientProps) {
  const router = useRouter();
  const onEdit = async (payload: Product) => {
    await putProduct(payload);
    router.push(`/products/${product.id}`);
    router.refresh();
  };
  return <ProductForm product={product} onEdit={onEdit} />;
}
