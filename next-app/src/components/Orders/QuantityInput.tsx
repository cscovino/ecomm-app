"use client";

import { useState } from "react";

import { useRouter } from "@/navigation";
import { putOrder } from "@/app/api/orders";
import { Order } from "@/types";
import NumberInput from "@/components/NumberInput";
import { getProductById, putProduct } from "@/app/api/products";

export default function QuantityInput({
  order,
  productId,
}: {
  order: Order;
  productId: number;
}) {
  const router = useRouter();
  const [disabledIncrement, setDisabledIncrement] = useState(false);
  const productQuantity =
    order.products.find((product) => product.id === productId)?.orderQuantity ||
    0;
  const onChange = async (quantity: number) => {
    const product = await getProductById(productId.toString());
    const productQuantity =
      product.quantity - quantity > 0 ? product.quantity - quantity : 0;
    if (productQuantity === 0) {
      setDisabledIncrement(true);
    } else {
      setDisabledIncrement(false);
    }
    await putProduct({
      ...product,
      quantity: productQuantity,
    });
    const newProducts = order.products
      .map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            orderQuantity: product.orderQuantity + quantity,
          };
        }
        return product;
      })
      .filter((product) => product.orderQuantity > 0);
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
      defaultValue={productQuantity}
      disabledIncrement={disabledIncrement}
      onChange={onChange}
    />
  );
}
