import Link from "next/link";
import { FormEvent } from "react";

import { Order } from "@/types";

interface OrderFormProps {
  order: Order;
  onEdit: (order: Partial<Order>) => void;
}

export default async function OrderForm({ order, onEdit }: OrderFormProps) {
  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    const formData = new FormData(
      document.getElementById("order-form") as HTMLFormElement
    );
    onEdit({
      id: order.id,
      orderId: formData.get("name") as string,
    });
  };
  return (
    <form
      id="order-form"
      className="w-full flex flex-col gap-4"
      onSubmit={onSubmit}
    >
      <div className="flex justify-between items-center gap-6">
        <div className="flex flex-col w-full">
          <label
            htmlFor="input-name"
            className="block text-sm font-medium mb-2 text-white"
          >
            Name
          </label>
          <input
            name="name"
            id="input-name"
            className="py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-slate-900 border-gray-700 text-gray-400"
            placeholder="Awesome Order"
            defaultValue={order.orderId}
          />
        </div>
      </div>
      <div className="w-full flex justify-end gap-6">
        <button
          type="submit"
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-teal-500 disabled:opacity-50 disabled:pointer-events-none hover:bg-teal-800/30 hover:text-teal-400 focus:outline-none"
        >
          Save
        </button>
        <Link href={`/orders/${order.id}`}>
          <button
            type="button"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-200 disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-700 focus:outline-none"
          >
            Cancel
          </button>
        </Link>
      </div>
    </form>
  );
}
