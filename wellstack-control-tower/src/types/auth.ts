/**
 * Authentication and authorization types
 */

import type { User } from "@supabase/supabase-js";
import type { UserRole } from "./entities";

export interface AuthUser extends User {
  role?: UserRole;
  fullName?: string;
}

export interface UserSession {
  user: AuthUser | null;
  profile: {
    id: string;
    email: string;
    fullName: string;
    role: UserRole;
  } | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface AuthContextType extends UserSession {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

// Permission helpers
export type Permission =
  | "view:portfolio"
  | "view:clients"
  | "create:clients"
  | "edit:clients"
  | "delete:clients"
  | "create:updates"
  | "edit:own_updates"
  | "view:admin"
  | "manage:integrations"
  | "manage:users";

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    "view:portfolio",
    "view:clients",
    "create:clients",
    "edit:clients",
    "delete:clients",
    "create:updates",
    "edit:own_updates",
    "view:admin",
    "manage:integrations",
    "manage:users",
  ],
  standard: [
    "view:portfolio",
    "view:clients",
    "create:clients",
    "edit:clients",
    "create:updates",
    "edit:own_updates",
  ],
  exec_viewer: ["view:portfolio", "view:clients"],
};

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: UserRole | undefined, permission: Permission): boolean {
  if (!role) return false;
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

/**
 * Check if a role can access admin pages
 */
export function isAdmin(role: UserRole | undefined): boolean {
  return role === "admin";
}

/**
 * Check if a role can create/edit content
 */
export function canEdit(role: UserRole | undefined): boolean {
  return role === "admin" || role === "standard";
}

/**
 * Check if a role is read-only
 */
export function isReadOnly(role: UserRole | undefined): boolean {
  return role === "exec_viewer";
}
