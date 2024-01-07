import Link from "next/link";
import { ReactNode } from "react";

interface SideBarProps {
  links: ReactNode[];
}

export default function SideBar({ links }: SideBarProps) {
  return (
    <>
      <button
        type="button"
        className="text-gray-500 hover:text-gray-600 top-8 left-8 absolute"
        data-hs-overlay="#docs-sidebar"
        aria-controls="docs-sidebar"
        aria-label="Toggle navigation"
      >
        <span className="sr-only">Toggle Navigation</span>
        <svg
          className="flex-shrink-0 w-4 h-4"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </button>
      <div
        id="docs-sidebar"
        className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 border-e pt-7 pb-10 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-slate-700 [&::-webkit-scrollbar-thumb]:bg-slate-500 bg-gray-800 border-gray-700"
      >
        <div className="px-6">
          <Link
            className="flex-none text-xl font-semibold text-white"
            href="/"
            aria-label="Ecomm"
          >
            Ecomm
          </Link>
        </div>
        <nav
          className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
          data-hs-accordion-always-open
        >
          <ul className="space-y-1.5">
            {links.map((link, index) => (
              <li className="group my-2" key={`link-${index}`}>
                {link}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
