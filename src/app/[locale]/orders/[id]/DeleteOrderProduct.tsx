"use client";

import { useRouter } from "next/navigation";

import DeleteButton from "@/components/DeleteButton";
import { putOrder } from "@/app/api/orders";
import { Order } from "@/types";

export default function DeleteOrderProduct({
  order,
  productId,
}: {
  order: Order;
  productId: number;
}) {
  const router = useRouter();
  const onDelete = () => {
    const newProducts = order.products.filter(
      (product) => product.id !== productId
    );
    const newPrice = newProducts.reduce(
      (acc, product) => acc + parseInt(product.price),
      0
    );
    const newTotalPrice = newProducts.reduce(
      (acc, product) => acc + parseInt(product.price) * (1 + product.tax / 100),
      0
    );
    putOrder({
      ...order,
      products: newProducts,
      price: newPrice,
      totalPrice: Number(newTotalPrice.toFixed(2)),
    }).then(() => router.refresh());
  };
  return <DeleteButton deleteItem={onDelete} />;
}
