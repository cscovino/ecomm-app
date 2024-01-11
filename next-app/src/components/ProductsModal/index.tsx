import { useState, forwardRef } from "react";
import { useTranslations } from "next-intl";

import { Product } from "@/types";

interface ProductsModalProps {
  products: Product[];
  onSave: (selectedProducts: number[]) => void;
  onCancel: () => void;
}

type Ref = HTMLDialogElement;

export default forwardRef<Ref, ProductsModalProps>(function ProductsModal(
  { products, onSave, onCancel },
  ref
) {
  const t = useTranslations();
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const onSelectItem = (id: number) => {
    setSelectedProducts((prev) => {
      if (prev.includes(id)) {
        return prev.filter((prod) => prod !== id);
      }
      return prev.concat(id);
    });
  };

  return (
    <dialog
      ref={ref}
      onCancel={onCancel}
      onClose={() => setSelectedProducts([])}
      className="rounded-lg bg-stone-900 backdrop:backdrop-blur-sm"
    >
      <div className="p-12 flex flex-col gap-6">
        <h1 className="py-2 text-3xl text-center text-white">
          {t("Products.availables")}
        </h1>
        <div className="flex flex-col gap-4">
          {products.map((product) => (
            <button
              type="button"
              key={product.id}
              onClick={() => onSelectItem(product.id)}
              className={`py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent ${selectedProducts.includes(product.id)
                  ? "bg-white text-gray-800"
                  : "bg-gray-500 hover:bg-gray-600 text-white"
                } disabled:opacity-50 disabled:pointer-events-none`}
            >
              <div className="w-full flex justify-between gap-6">
                <span className="inline-block">{`${product.reference} - ${product.name}`}</span>
                <span className="inline-block">{`${t(
                  "Products.properties.qty"
                )}: ${product.quantity}`}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="w-full flex justify-end gap-6">
          <button
            onClick={() => onSave(selectedProducts)}
            type="button"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-teal-500 disabled:opacity-50 disabled:pointer-events-none hover:bg-teal-800/30 hover:text-teal-400 focus:outline-none"
          >
            {t("Buttons.save")}
          </button>
          <button
            onClick={onCancel}
            type="button"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-200 disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-700 focus:outline-none"
          >
            {t("Buttons.cancel")}
          </button>
        </div>
      </div>
    </dialog>
  );
});
