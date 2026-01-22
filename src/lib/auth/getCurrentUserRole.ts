import { cookies } from "next/headers";

import type { Role } from "@/lib/auth/roles";

const ALLOWED_ROLES: Role[] = ["admin", "standard", "exec_viewer"];

export async function getCurrentUserRole(): Promise<Role | null> {
  const roleCookie = cookies().get("role")?.value;

  if (roleCookie && ALLOWED_ROLES.includes(roleCookie as Role)) {
    return roleCookie as Role;
  }

  return "standard";
}
