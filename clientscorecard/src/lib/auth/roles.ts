export const Roles = {
  Admin: "Admin",
  Standard: "Standard",
  ExecViewer: "ExecViewer",
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];

export function isRole(value: string): value is Role {
  return value === Roles.Admin || value === Roles.Standard || value === Roles.ExecViewer;
}

export function canAccess(userRole: Role, allowedRoles: readonly Role[]) {
  return allowedRoles.includes(userRole);
}

