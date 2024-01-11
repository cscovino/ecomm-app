"use client";

import { useRouter } from "@/navigation";
import DeleteButton from "@/components/DeleteButton";
import { putOrder } from "@/app/api/orders";
import { Order } from "@/types";
import { getProductById, putProduct } from "@/app/api/products";

export default function DeleteOrderProduct({
  order,
  productId,
}: {
  order: Order;
  productId: number;
}) {
  const router = useRouter();
  const onDelete = async () => {
    const product = await getProductById(productId.toString());
    const deleteProduct = order.products.find(
      (product) => product.id === productId
    );
    await putProduct({
      ...product,
      quantity: product.quantity + (deleteProduct?.orderQuantity || 0),
    });
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
    await putOrder({
      ...order,
      products: newProducts,
      price: newPrice,
      totalPrice: Number(newTotalPrice.toFixed(2)),
    });
    router.refresh();
  };
  return <DeleteButton deleteItem={onDelete} />;
}
