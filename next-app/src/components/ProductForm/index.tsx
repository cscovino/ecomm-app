import { FormEvent } from "react";
import { useTranslations } from "next-intl";

import { Product } from "@/types";
import { Link } from "@/navigation";
import NumberInput from "../NumberInput";

interface ProductFormProps {
  product: Product;
  onEdit: (product: Product) => void;
}

export default function ProductForm({ product, onEdit }: ProductFormProps) {
  const t = useTranslations();
  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    const formData = new FormData(
      document.getElementById("product-form") as HTMLFormElement
    );
    onEdit({
      id: product.id,
      name: formData.get("name") as string,
      reference: formData.get("reference") as string,
      description: formData.get("description") as string,
      price: formData.get("price") as string,
      tax: parseInt(formData.get("tax") as string),
      quantity: parseInt(formData.get("quantity") as string),
    });
  };
  return (
    <form
      id="product-form"
      className="w-full flex flex-col gap-4"
      onSubmit={onSubmit}
    >
      <div className="flex justify-between items-center gap-6">
        <div className="flex flex-col w-full">
          <label
            htmlFor="input-name"
            className="block text-sm font-medium mb-2 text-white"
          >
            {t("Products.properties.name")}
          </label>
          <input
            name="name"
            id="input-name"
            className="py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-slate-900 border-gray-700 text-gray-400"
            placeholder={t("Products.placeholders.name")}
            defaultValue={product.name}
          />
        </div>
        <div className="flex flex-col w-full">
          <label
            htmlFor="input-reference"
            className="block text-sm font-medium mb-2 text-white"
          >
            {t("Products.properties.reference")}
          </label>
          <input
            name="reference"
            id="input-reference"
            className="py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-slate-900 border-gray-700 text-gray-400"
            placeholder="REF12345"
            defaultValue={product.reference}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="textarea-description"
          className="block text-sm font-medium mb-2 text-white"
        >
          {t("Products.properties.description")}
        </label>
        <textarea
          name="description"
          id="textarea-description"
          className="py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-slate-900 border-gray-700 text-gray-400"
          rows={3}
          placeholder={t("Products.placeholders.description")}
          defaultValue={product.description}
        ></textarea>
      </div>
      <div className="flex gap-6">
        <div className="w-1/2">
          <label
            htmlFor="input-price"
            className="block text-sm font-medium mb-2 text-white"
          >
            {t("Products.properties.price")}
          </label>
          <div className="relative">
            <input
              type="text"
              id="input-price"
              name="price"
              className="py-3 px-4 ps-9 pe-16 block w-full shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-slate-900 border-gray-700 text-gray-400"
              placeholder="0.00"
              defaultValue={product.price}
            />
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
              <span className="text-gray-500">€</span>
            </div>
            <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-4">
              <span className="text-gray-500">EUR</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <label
            htmlFor="input-tax"
            className="block text-sm font-medium mb-2 text-white"
          >
            {t("Products.properties.tax")} %
          </label>
          <NumberInput
            name="tax"
            defaultValue={product.tax}
            onChange={() => { }}
          />
        </div>
        <div className="flex flex-col flex-1">
          <label
            htmlFor="input-quantity"
            className="block text-sm font-medium mb-2 text-white"
          >
            {t("Products.properties.quantity")}
          </label>
          <NumberInput
            name="quantity"
            defaultValue={product.quantity}
            onChange={() => { }}
          />
        </div>
      </div>
      <div className="w-full flex justify-end gap-6">
        <button
          type="submit"
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-teal-500 disabled:opacity-50 disabled:pointer-events-none hover:bg-teal-800/30 hover:text-teal-400 focus:outline-none"
        >
          {t("Buttons.save")}
        </button>
        <Link href={product.id > 0 ? `/products/${product.id}` : "/products"}>
          <button
            type="button"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-200 disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-700 focus:outline-none"
          >
            {t("Buttons.cancel")}
          </button>
        </Link>
      </div>
    </form>
  );
}
