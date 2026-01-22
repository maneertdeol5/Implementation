export type UserRole = 'Admin' | 'Standard' | 'ExecViewer';

export type RYGStatus = 'Green' | 'Yellow' | 'Red';

export interface Client {
  id: string;
  name: string;
  tier?: string;
  account_owner_id?: string;
  created_at: string;
  updated_at: string;
  // Computed/joined fields
  latest_update?: WeeklyUpdate;
  risks_count?: number;
  initiatives_count?: number;
}

export interface WeeklyUpdate {
  id: string;
  client_id: string;
  week_start_date: string;
  status: RYGStatus;
  summary: string;
  blockers?: string;
  next_steps?: string;
  rationale?: string; // Required if Yellow/Red
  created_by: string;
  created_at: string;
}

export interface Initiative {
  id: string;
  client_id: string;
  name: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Blocked';
  target_date?: string;
  owner_id?: string;
  created_at: string;
}

export interface Risk {
  id: string;
  client_id: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'Mitigated' | 'Closed';
  owner_id?: string;
  created_at: string;
}

export interface JiraRollupSnapshot {
  id: string;
  client_id: string;
  snapshot_date: string;
  total_issues: number;
  completed_issues: number;
  in_progress_issues: number;
  created_at: string;
}
