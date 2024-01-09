"use client";

import { useRouter } from "next/navigation";

import { deleteOrder } from "@/app/api/orders";
import DeleteButton from "@/components/DeleteButton";

export default function DeleteOrder({ id }: { id: number }) {
  const router = useRouter();
  const onDelete = () => {
    deleteOrder(id).then(() => router.refresh());
  };
  return <DeleteButton deleteItem={onDelete} />;
}
