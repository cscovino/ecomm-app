"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";

import { useRouter } from "@/navigation";
import { putOrder } from "@/app/api/orders";
import { putProduct } from "@/app/api/products";
import { Order, OrderProduct, Product } from "@/types";
import ProductsModal from "@/components/ProductsModal";

interface AddProductModalProps {
  products: Product[];
  order: Order;
}

export default function AddProductModal({
  order,
  products,
}: AddProductModalProps) {
  const router = useRouter();
  const t = useTranslations();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const orderProductsId = order.products.map((product) => product.id);
  const onAdd = () => {
    dialogRef.current?.showModal();
  };
  const onCancel = () => {
    dialogRef.current?.close();
  };
  const onSave = async (selectedProducts: number[]) => {
    const filteredProducts = products.filter((product) =>
      selectedProducts.includes(product.id)
    );
    const newProducts: OrderProduct[] = order.products.concat(
      filteredProducts.map((product) => ({
        ...product,
        orderQuantity: 1,
      }))
    );
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
      price: newPrice,
      totalPrice: Number(newTotalPrice.toFixed(2)),
      products: newProducts,
    });
    await Promise.all(
      filteredProducts.map(async (product) => {
        await putProduct({
          ...product,
          quantity: product.quantity - 1,
        });
      })
    );
    router.refresh();
    dialogRef.current?.close();
  };
  return (
    <div className="py-3 px-4 flex justify-end">
      <button
        type="button"
        onClick={onAdd}
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent disabled:opacity-50 disabled:pointer-events-none text-blue-500 hover:bg-blue-800/30 hover:text-blue-400 focus:outline-none focus:ring-1 focus:ring-gray-600"
      >
        {t("Orders.addProduct")}
      </button>
      <ProductsModal
        ref={dialogRef}
        products={products.filter(
          (product) => !orderProductsId.includes(product.id)
        )}
        onSave={onSave}
        onCancel={onCancel}
      />
    </div>
  );
}
