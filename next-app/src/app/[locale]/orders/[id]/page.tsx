import { getTranslations } from "next-intl/server";

import { getOrderById } from "@/app/api/orders";
import Table from "@/components/Table";
import { Link } from "@/navigation";

export default async function Order({
  params: { id },
}: {
  params: { id: string };
}) {
  const order = await getOrderById(id);
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
          <Link href={`/orders/${id}/edit`}>
            <button
              type="button"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent disabled:opacity-50 disabled:pointer-events-none text-blue-500 hover:bg-blue-800/30 hover:text-blue-400 focus:outline-none focus:ring-1 focus:ring-gray-600"
            >
              {t("Buttons.edit")}
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
              properties={["reference", "name", "orderQuantity"]}
              renderItem={(item, property) => item[property]}
              data={order.products}
            />
          </div>
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
