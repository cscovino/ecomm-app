import Link from "next/link";
import { ReactNode } from "react";

export interface TableProps<T> {
  keyExtractor: (item: T) => string;
  hrefExtractor: (item: T) => string;
  renderItem: (item: T, property: keyof T) => string | number | ReactNode;
  properties: Array<keyof T>;
  data: T[];
}

export default function Table<T>({
  keyExtractor,
  hrefExtractor,
  renderItem,
  properties,
  data,
}: TableProps<T>) {
  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-700">
        <tr>
          {properties.map((property) => (
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
              key={property.toString()}
            >
              {property.toString()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
        {data.map((item) => (
          <tr
            key={keyExtractor(item)}
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {properties.map((property) => (
              <td
                key={`${keyExtractor(item)}-${property.toString()}`}
                className="text-gray-800 dark:text-gray-200"
              >
                <Link
                  href={hrefExtractor(item)}
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium w-full inline-block"
                >
                  {renderItem(item, property as keyof T)}
                </Link>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
