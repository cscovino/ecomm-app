import Table from "@/components/Table";
import { getProducts } from "../api/products";
import Link from "next/link";

export default async function Products() {
  const products = await getProducts();
  return (
    <main className="flex flex-col p-24">
      <div className="overflow-x-auto flex justify-center items-center">
        <div className="p-1.5 w-4/5 inline-block align-middle">
          <div className="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
            <div className="py-3 px-4 flex justify-between">
              <div className="relative max-w-xs">
                <label htmlFor="hs-table-search" className="sr-only">
                  Search
                </label>
                <input
                  type="text"
                  name="hs-table-search"
                  id="hs-table-search"
                  className="py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="Search for items"
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
              <Link href={`/products/add`}>
                <button
                  type="button"
                  className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent disabled:opacity-50 disabled:pointer-events-none text-blue-500 hover:bg-blue-800/30 hover:text-blue-400 focus:outline-none focus:ring-1 focus:ring-gray-600"
                >
                  Add
                </button>
              </Link>
            </div>
            <div className="overflow-hidden">
              <Table
                keyExtractor={({ id }) => id.toString()}
                hrefExtractor={({ id }) => `/products/${id}`}
                properties={["reference", "name", "price"]}
                renderItem={(item, property) => {
                  if ("price" === property) {
                    return `${item[property]} €`;
                  }
                  return item[property];
                }}
                data={products}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
