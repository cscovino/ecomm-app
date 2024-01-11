"use client";

import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";

export default function BackButton() {
  const router = useRouter();
  const t = useTranslations();
  const onClick = () => {
    router.back();
    router.refresh();
  };
  return (
    <div className="self-end flex gap-4">
      <button
        type="button"
        onClick={onClick}
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-200 disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-700 focus:outline-none"
      >
        {t("Buttons.back")}
      </button>
    </div>
  );
}
