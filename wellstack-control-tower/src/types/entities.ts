/**
 * Domain entity types with business logic
 */

import type { Tables } from "./database";

// Base entity types from database
export type Client = Tables<"clients">;
export type Initiative = Tables<"initiatives">;
export type Risk = Tables<"risks">;
export type WeeklyUpdate = Tables<"weekly_updates">;
export type JiraRollupSnapshot = Tables<"jira_rollup_snapshots">;
export type UserProfile = Tables<"user_profiles">;
export type IntegrationConfig = Tables<"integration_configs">;

// Extended types with relations
export interface ClientWithLatestUpdate extends Client {
  latest_update?: WeeklyUpdate | null;
  open_risks_count?: number;
  active_initiatives_count?: number;
}

export interface ClientDetail extends Client {
  initiatives: Initiative[];
  risks: Risk[];
  weekly_updates: WeeklyUpdate[];
  jira_snapshots: JiraRollupSnapshot[];
}

// Status and enum types
export type HealthStatus = "green" | "yellow" | "red";
export type InitiativeStatus = "not_started" | "in_progress" | "completed" | "on_hold";
export type PriorityLevel = "low" | "medium" | "high" | "critical";
export type RiskSeverity = "low" | "medium" | "high" | "critical";
export type RiskStatus = "open" | "mitigated" | "resolved";
export type ClientStatus = "active" | "churned" | "prospect";
export type UserRole = "admin" | "standard" | "exec_viewer";
export type IntegrationType = "jira" | "hubspot";

// Filter types for portfolio
export interface PortfolioFilters {
  search?: string;
  healthStatus?: HealthStatus[];
  clientStatus?: ClientStatus[];
  renewalWithinDays?: number;
  showStaleOnly?: boolean;
}

// Form data types
export interface WeeklyUpdateFormData {
  clientId: string;
  weekStartDate: string;
  overallHealth: HealthStatus;
  healthRationale?: string;
  summary: string;
  wins?: string;
  blockers?: string;
  nextSteps?: string;
}

export interface ClientFormData {
  name: string;
  status: ClientStatus;
  contractRenewalDate?: string;
  contractValue?: number;
  primaryContactEmail?: string;
  hubspotCompanyId?: string;
}

// API response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
