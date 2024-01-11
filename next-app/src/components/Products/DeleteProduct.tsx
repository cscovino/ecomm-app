"use client";

import { useRouter } from "@/navigation";
import { deleteProduct } from "@/app/api/products";
import DeleteButton from "@/components/DeleteButton";

export default function DeleteProduct({ id }: { id: number }) {
  const router = useRouter();
  const onDelete = () => {
    // TODO: check orders with this product and manage them
    deleteProduct(id).then(() => router.refresh());
  };
  return <DeleteButton deleteItem={onDelete} />;
}
