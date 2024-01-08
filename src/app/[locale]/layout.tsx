import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";

import PrelineScript from "@/components/PrelineScript";
import SideBar from "@/components/SideBar";
import { Link } from "@/navigation";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ecomm",
  description: "E-commerce app",
};

export default function RootLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const t = useTranslations("Nav");
  const messages = useMessages();
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <SideBar
          links={[
            <Link
              key="orders"
              className="flex items-center gap-x-3.5 py-2 px-2.5 text-md text-slate-400 rounded-lg hover:bg-gray-500 group-hover:text-slate-800 bg-gray-900"
              href="/orders"
            >
              <svg
                className="flex-shrink-0 w-8 h-8 text-gray-800 text-slate-400 group-hover:text-slate-800"
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
                <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                <path d="M2 7h20" />
                <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
              </svg>
              {t("orders")}
            </Link>,
            <Link
              key="products"
              className="flex items-center gap-x-3.5 py-2 px-2.5 text-md text-slate-400 rounded-lg hover:bg-gray-500 group-hover:text-slate-800 bg-gray-900"
              href="/products"
            >
              <svg
                className="flex-shrink-0 h-8 w-8 text-slate-400 group-hover:text-gray-800"
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
                <path d="m7.5 4.27 9 5.15" />
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                <path d="m3.3 7 8.7 5 8.7-5" />
                <path d="M12 22V12" />
              </svg>
              {t("products")}
            </Link>,
          ]}
        />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
      <PrelineScript />
    </html>
  );
}
