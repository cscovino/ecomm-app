import { getTranslations } from "next-intl/server";

import { Link } from "@/navigation";

export default async function Home() {
  const t = await getTranslations("Nav");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full flex flex-col gap-2 items-center justify-between font-mono text-sm">
        <Link
          href="/products"
          className="flex w-2/5 justify-center border p-6 border-neutral-800 bg-zinc-800/30"
        >
          {t("products")}
        </Link>
        <Link
          href="/orders"
          className="flex w-2/5 justify-center border p-6 border-neutral-800 bg-zinc-800/30"
        >
          {t("orders")}
        </Link>
      </div>
    </main>
  );
}
