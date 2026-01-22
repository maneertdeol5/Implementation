import { isRole, Roles, type Role } from "./roles";

/**
 * Temporary role resolution for scaffolding.
 *
 * Later: derive from Supabase Auth `user.app_metadata.role` or `user.user_metadata.role`,
 * with a secure default (ExecViewer) and server-side enforcement (RLS + policies).
 */
export async function getCurrentUserRole(): Promise<Role> {
  const devRole = process.env.NEXT_PUBLIC_DEV_ROLE;
  if (typeof devRole === "string" && isRole(devRole)) return devRole;
  return Roles.Standard;
}

