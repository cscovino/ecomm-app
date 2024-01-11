import { getTranslations } from "next-intl/server";

import { getOrderById } from "@/app/api/orders";
import { getAvailableProducts } from "@/app/api/products";
import Table from "@/components/Table";
import { Link } from "@/navigation";
import { OrderProduct } from "@/types";
import DeleteOrderProduct from "@/components/Orders/DeleteOrderProduct";
import QuantityInput from "@/components/Orders/QuantityInput";
import AddProductModal from "@/components/Orders/AddProductModal";

export default async function EditOrder({
  params: { id },
}: {
  params: { id: string };
}) {
  const order = await getOrderById(id);
  const products = await getAvailableProducts();
  const t = await getTranslations();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-3/5 flex flex-col font-mono">
        <div className="self-end flex gap-4">
          <Link href={`/orders`}>
            <button
              type="button"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-200 disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-700 focus:outline-none"
            >
              {t("Buttons.back")}
            </button>
          </Link>
        </div>
        <h1 className="py-2 text-3xl">
          {t("Orders.order")} #{order.orderNumber}
        </h1>
        <div className="pb-2">
          <h4 className="text-lg">{t("Orders.properties.products")}</h4>
          <div className="border rounded-lg divide-y border-gray-700 divide-gray-700">
            <Table
              namespace="Products.properties"
              keyExtractor={({ id }) => id.toString()}
              hrefExtractor={({ id }) => `/products/${id}`}
              properties={[
                "reference",
                "name",
                "orderQuantity",
                "delete" as keyof OrderProduct,
              ]}
              renderItem={(item, property) => {
                if (property === ("delete" as keyof OrderProduct)) {
                  return (
                    <DeleteOrderProduct order={order} productId={item.id} />
                  );
                }
                if (property === "orderQuantity") {
                  return <QuantityInput order={order} productId={item.id} />;
                }
                return item[property];
              }}
              data={order.products}
            />
          </div>
          <AddProductModal order={order} products={products} />
        </div>

        <div className="flex gap-6">
          <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-md text-xs font-medium border border-cyan-600 text-cyan-600">
            {t("Orders.properties.price")}: {order.price} €
          </span>
          <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-md text-xs font-medium border border-yellow-600 text-yellow-600">
            {t("Orders.properties.totalPrice")}: {order.totalPrice} €
          </span>
        </div>
      </div>
    </main>
  );
}
