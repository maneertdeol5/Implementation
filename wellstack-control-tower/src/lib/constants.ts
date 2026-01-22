/**
 * Application constants
 */

export const APP_NAME = "WellStack Client Control Tower";
export const APP_DESCRIPTION = "Internal client management and tracking platform";

/**
 * Health status colors and labels
 */
export const HEALTH_STATUS = {
  green: {
    label: "Green",
    color: "bg-green-500",
    textColor: "text-green-700",
    bgLight: "bg-green-50",
    borderColor: "border-green-200",
  },
  yellow: {
    label: "Yellow",
    color: "bg-yellow-500",
    textColor: "text-yellow-700",
    bgLight: "bg-yellow-50",
    borderColor: "border-yellow-200",
  },
  red: {
    label: "Red",
    color: "bg-red-500",
    textColor: "text-red-700",
    bgLight: "bg-red-50",
    borderColor: "border-red-200",
  },
} as const;

/**
 * Initiative status options
 */
export const INITIATIVE_STATUS = {
  not_started: { label: "Not Started", color: "bg-gray-100 text-gray-700" },
  in_progress: { label: "In Progress", color: "bg-blue-100 text-blue-700" },
  completed: { label: "Completed", color: "bg-green-100 text-green-700" },
  on_hold: { label: "On Hold", color: "bg-yellow-100 text-yellow-700" },
} as const;

/**
 * Priority options
 */
export const PRIORITY = {
  low: { label: "Low", color: "bg-gray-100 text-gray-600" },
  medium: { label: "Medium", color: "bg-blue-100 text-blue-600" },
  high: { label: "High", color: "bg-orange-100 text-orange-600" },
  critical: { label: "Critical", color: "bg-red-100 text-red-600" },
} as const;

/**
 * Risk severity options
 */
export const RISK_SEVERITY = {
  low: { label: "Low", color: "bg-gray-100 text-gray-600" },
  medium: { label: "Medium", color: "bg-yellow-100 text-yellow-600" },
  high: { label: "High", color: "bg-orange-100 text-orange-600" },
  critical: { label: "Critical", color: "bg-red-100 text-red-600" },
} as const;

/**
 * Risk status options
 */
export const RISK_STATUS = {
  open: { label: "Open", color: "bg-red-100 text-red-700" },
  mitigated: { label: "Mitigated", color: "bg-yellow-100 text-yellow-700" },
  resolved: { label: "Resolved", color: "bg-green-100 text-green-700" },
} as const;

/**
 * Client status options
 */
export const CLIENT_STATUS = {
  active: { label: "Active", color: "bg-green-100 text-green-700" },
  churned: { label: "Churned", color: "bg-gray-100 text-gray-700" },
  prospect: { label: "Prospect", color: "bg-blue-100 text-blue-700" },
} as const;

/**
 * User roles
 */
export const USER_ROLES = {
  admin: { label: "Admin", description: "Full access to all features" },
  standard: { label: "Standard", description: "Can manage clients and updates" },
  exec_viewer: { label: "Executive Viewer", description: "Read-only access" },
} as const;

/**
 * Navigation items for sidebar
 */
export const NAV_ITEMS = [
  {
    name: "Portfolio",
    href: "/portfolio",
    icon: "LayoutDashboard",
    roles: ["admin", "standard", "exec_viewer"],
  },
  {
    name: "My Accounts",
    href: "/my-accounts",
    icon: "Users",
    roles: ["admin", "standard"],
  },
  {
    name: "Definitions",
    href: "/definitions",
    icon: "BookOpen",
    roles: ["admin", "standard", "exec_viewer"],
  },
] as const;

export const ADMIN_NAV_ITEMS = [
  {
    name: "Integrations",
    href: "/admin/integrations",
    icon: "Plug",
    roles: ["admin"],
  },
  {
    name: "Mapping",
    href: "/admin/mapping",
    icon: "GitBranch",
    roles: ["admin"],
  },
] as const;

/**
 * Stale threshold in days
 */
export const STALE_THRESHOLD_DAYS = 7;

/**
 * Renewal warning threshold in days
 */
export const RENEWAL_WARNING_DAYS = 90;
