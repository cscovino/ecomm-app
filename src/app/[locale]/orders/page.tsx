import { getTranslations } from "next-intl/server";

import Table from "@/components/Table";
import { Order } from "@/types";
import { getOrders } from "@/app/api/orders";
import { Link } from "@/navigation";

import DeleteOrder from "./DeleteOrder";

export default async function Orders() {
  const t = await getTranslations("Orders");
  const orders = await getOrders();
  return (
    <main className="flex flex-col p-24">
      <div className="overflow-x-auto flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold pb-6">{t("orders")}</h1>
        <div className="p-1.5 w-4/5 inline-block align-middle">
          <div className="border rounded-lg divide-y border-gray-700 divide-gray-700">
            <div className="py-3 px-4 flex justify-between">
              <div className="relative h-full max-w-xs">
                <label htmlFor="hs-table-search" className="sr-only">
                  {t("search")}
                </label>
                <input
                  type="text"
                  name="hs-table-search"
                  id="hs-table-search"
                  className="py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder={t("placeholders.search")}
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
              </div>
              <Link href={`/orders/add`}>
                <button
                  type="button"
                  className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent disabled:opacity-50 disabled:pointer-events-none text-blue-500 hover:bg-blue-800/30 hover:text-blue-400 focus:outline-none focus:ring-1 focus:ring-gray-600"
                >
                  {t("add")}
                </button>
              </Link>
            </div>
            <div className="overflow-hidden">
              <Table<Omit<Order, "products"> & { delete?: string }>
                namespace="Orders.properties"
                keyExtractor={({ id }) => id.toString()}
                hrefExtractor={({ id }) => `/orders/${id}`}
                properties={["orderNumber", "price", "totalPrice", "delete"]}
                renderItem={(item, property) => {
                  if (["price", "totalPrice"].includes(property)) {
                    return `${item[property]} €`;
                  }
                  if (("delete" as keyof Order) === property) {
                    return <DeleteOrder id={item.id} />;
                  }
                  return item[property];
                }}
                data={orders}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
