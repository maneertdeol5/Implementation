export type Role = "admin" | "standard" | "exec_viewer";

export const ROLE_LABELS: Record<Role, string> = {
  admin: "Admin",
  standard: "Standard",
  exec_viewer: "Exec Viewer",
};

export function isRoleAllowed(role: Role, allowedRoles: Role[]) {
  return allowedRoles.includes(role);
}
