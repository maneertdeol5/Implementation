"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type SidebarNavItem = {
  label: string;
  href: string;
};

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SidebarNav({ items }: { items: readonly SidebarNavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex h-full flex-col gap-1 p-3">
      <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        WellStack
      </div>
      <div className="mt-1 flex flex-col gap-1">
        {items.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900",
              ].join(" ")}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

