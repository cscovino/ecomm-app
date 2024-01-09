"use client";

import { useRouter } from "next/navigation";

import { putOrder } from "@/app/api/orders";
import { Order } from "@/types";
import NumberInput from "@/components/NumberInput";
import { getProductById, putProduct } from "../../api/products";
import { useState } from "react";

export default function QuantityInput({
  order,
  productId,
}: {
  order: Order;
  productId: number;
}) {
  const router = useRouter();
  const [disabledIncrement, setDisabledIncrement] = useState(false);
  const onChange = async (increment: boolean) => {
    const product = await getProductById(productId.toString());
    const productQuantity = increment
      ? product.quantity - 1
      : product.quantity + 1;
    if (productQuantity === 0) {
      setDisabledIncrement(true);
    } else {
      setDisabledIncrement(false);
    }
    await putProduct({
      ...product,
      quantity: productQuantity,
    });
    const newProducts = order.products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          orderQuantity: increment
            ? product.orderQuantity + 1
            : product.orderQuantity - 1,
        };
      }
      return product;
    });
    const newPrice = newProducts.reduce(
      (acc, product) => acc + parseInt(product.price) * product.orderQuantity,
      0
    );
    const newTotalPrice = newProducts.reduce(
      (acc, product) =>
        acc +
        parseInt(product.price) *
        (1 + product.tax / 100) *
        product.orderQuantity,
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
  return (
    <NumberInput
      name="orderQuantity"
      defaultValue={
        order.products.find((product) => product.id === productId)
          ?.orderQuantity || 0
      }
      onIncrement={() => {
        onChange(true);
      }}
      disabledIncrement={disabledIncrement}
      onDecrement={() => {
        onChange(false);
      }}
    />
  );
}
