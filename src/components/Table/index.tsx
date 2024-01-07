import { ReactNode } from "react";

import { Link } from "@/navigation";
import { getTranslations } from "next-intl/server";

export interface TableProps<T> {
  namespace: string;
  keyExtractor: (item: T) => string;
  hrefExtractor: (item: T) => string;
  renderItem: (item: T, property: keyof T) => string | number | ReactNode;
  properties: Array<keyof T>;
  data: T[];
}

export default async function Table<T>({
  namespace,
  keyExtractor,
  hrefExtractor,
  renderItem,
  properties,
  data,
}: TableProps<T>) {
  const t = await getTranslations(namespace);
  return (
    <table className="min-w-full divide-y divide-gray-700">
      <thead className="bg-gray-700">
        <tr>
          {properties.map((property) => (
            <th
              scope="col"
              className={`px-6 py-3 text-${property === "delete" ? "center" : "start"
                } text-xs font-medium text-gray-500 uppercase`}
              key={property.toString()}
            >
              {t(property as string)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-700">
        {data.map((item) => (
          <tr key={keyExtractor(item)} className="hover:bg-gray-700">
            {properties.map((property) => (
              <td
                key={`${keyExtractor(item)}-${property.toString()}`}
                className="text-gray-200"
              >
                {property === "delete" ? (
                  <div className="text-center">
                    {renderItem(item, property as keyof T)}
                  </div>
                ) : (
                  <Link
                    href={hrefExtractor(item)}
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium w-full inline-block"
                  >
                    {renderItem(item, property as keyof T)}
                  </Link>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
