"use client";

import { useRouter } from "@/navigation";
import { deleteOrder, getOrderById } from "@/app/api/orders";
import DeleteButton from "@/components/DeleteButton";
import { getProductById, putProduct } from "@/app/api/products";

export default function DeleteOrder({ id }: { id: number }) {
  const router = useRouter();
  const onDelete = async () => {
    const order = await getOrderById(id.toString());
    await Promise.all(
      order.products.map(async (orderProduct) => {
        const product = await getProductById(orderProduct.id.toString());
        await putProduct({
          ...product,
          quantity: product.quantity + orderProduct.orderQuantity,
        });
      })
    );
    await deleteOrder(id);
    router.refresh();
  };
  return <DeleteButton deleteItem={onDelete} />;
}
