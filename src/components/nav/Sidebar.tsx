"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_SECTIONS } from "@/components/nav/nav-items";
import { isRoleAllowed, type Role } from "@/lib/auth/roles";

type SidebarProps = {
  role: Role;
};

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
      <div className="px-6 py-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          WellStack
        </p>
        <h2 className="text-lg font-semibold text-slate-900">Control Tower</h2>
      </div>
      <nav className="flex-1 space-y-6 px-3 pb-6">
        {NAV_SECTIONS.map((section) => {
          const visibleItems = section.items.filter((item) =>
            isRoleAllowed(role, item.allowedRoles)
          );

          if (visibleItems.length === 0) {
            return null;
          }

          return (
            <div key={section.title}>
              <p className="px-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                {section.title}
              </p>
              <ul className="mt-2 space-y-1">
                {visibleItems.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition ${
                          isActive
                            ? "bg-slate-900 text-white"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
