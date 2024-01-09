"use client";

import { useRouter } from "next/navigation";

import { deleteProduct } from "@/app/api/products";
import DeleteButton from "@/components/DeleteButton";

export default function DeleteProduct({ id }: { id: number }) {
  const router = useRouter();
  const onDelete = () => {
    deleteProduct(id).then(() => router.refresh());
  };
  return <DeleteButton deleteItem={onDelete} />;
}
