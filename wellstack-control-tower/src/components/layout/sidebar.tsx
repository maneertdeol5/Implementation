"use client";

import {
  LayoutDashboard,
  Users,
  BookOpen,
  Plug,
  GitBranch,
  Settings,
} from "lucide-react";
import { NavLink } from "./nav-link";
import { APP_NAME } from "@/lib/constants";
import type { UserRole } from "@/types";
import { isAdmin } from "@/types/auth";

interface SidebarProps {
  userRole?: UserRole;
}

const mainNavItems = [
  {
    name: "Portfolio",
    href: "/portfolio",
    icon: LayoutDashboard,
    roles: ["admin", "standard", "exec_viewer"] as UserRole[],
  },
  {
    name: "My Accounts",
    href: "/my-accounts",
    icon: Users,
    roles: ["admin", "standard"] as UserRole[],
  },
  {
    name: "Definitions",
    href: "/definitions",
    icon: BookOpen,
    roles: ["admin", "standard", "exec_viewer"] as UserRole[],
  },
];

const adminNavItems = [
  {
    name: "Integrations",
    href: "/admin/integrations",
    icon: Plug,
    roles: ["admin"] as UserRole[],
  },
  {
    name: "Mapping",
    href: "/admin/mapping",
    icon: GitBranch,
    roles: ["admin"] as UserRole[],
  },
];

export function Sidebar({ userRole }: SidebarProps) {
  const filteredMainNav = mainNavItems.filter(
    (item) => !userRole || item.roles.includes(userRole)
  );

  const filteredAdminNav = isAdmin(userRole) ? adminNavItems : [];

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <Settings className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-900">
            {APP_NAME.split(" ").slice(0, 2).join(" ")}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {filteredMainNav.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              icon={<item.icon className="h-5 w-5" />}
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {filteredAdminNav.length > 0 && (
          <>
            <div className="my-4 border-t border-gray-200" />
            <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Admin
            </div>
            <div className="space-y-1">
              {filteredAdminNav.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  icon={<item.icon className="h-5 w-5" />}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </>
        )}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} WellStack
        </p>
      </div>
    </aside>
  );
}
