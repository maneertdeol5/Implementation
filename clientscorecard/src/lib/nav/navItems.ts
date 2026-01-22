import { Roles, type Role } from "@/lib/auth/roles";

export type NavItem = {
  label: string;
  href: string;
  roles: readonly Role[];
};

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Portfolio", href: "/portfolio", roles: [Roles.Admin, Roles.Standard, Roles.ExecViewer] },
  { label: "My Accounts", href: "/my-accounts", roles: [Roles.Admin, Roles.Standard, Roles.ExecViewer] },
  { label: "Clients", href: "/clients", roles: [Roles.Admin, Roles.Standard, Roles.ExecViewer] },
  { label: "Definitions", href: "/definitions", roles: [Roles.Admin, Roles.Standard, Roles.ExecViewer] },
  { label: "Admin: Integrations", href: "/admin/integrations", roles: [Roles.Admin] },
  { label: "Admin: Mapping", href: "/admin/mapping", roles: [Roles.Admin] },
] as const;

export function navItemsForRole(role: Role) {
  return NAV_ITEMS.filter((item) => item.roles.includes(role));
}

