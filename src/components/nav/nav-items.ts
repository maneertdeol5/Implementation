import type { Role } from "@/lib/auth/roles";

export type NavItem = {
  label: string;
  href: string;
  allowedRoles: Role[];
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export const NAV_SECTIONS: NavSection[] = [
  {
    title: "Core",
    items: [
      {
        label: "Portfolio",
        href: "/portfolio",
        allowedRoles: ["admin", "standard", "exec_viewer"],
      },
      {
        label: "My Accounts",
        href: "/my-accounts",
        allowedRoles: ["admin", "standard", "exec_viewer"],
      },
      {
        label: "Definitions",
        href: "/definitions",
        allowedRoles: ["admin", "standard", "exec_viewer"],
      },
    ],
  },
  {
    title: "Admin",
    items: [
      {
        label: "Integrations",
        href: "/admin/integrations",
        allowedRoles: ["admin"],
      },
      {
        label: "Field Mapping",
        href: "/admin/mapping",
        allowedRoles: ["admin"],
      },
    ],
  },
];
