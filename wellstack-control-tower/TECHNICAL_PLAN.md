# WellStack Client Control Tower - Technical Plan

## Overview
Internal web application for managing client relationships, tracking initiatives, risks, and weekly updates with integrations to Jira and HubSpot.

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **External Integrations**: Jira, HubSpot (future)

## Architecture

### Role-Based Access Control (RBAC)
| Role | Permissions |
|------|-------------|
| Admin | Full access: CRUD all entities, manage integrations, user management |
| Standard | View all, create/edit own clients and updates, cannot manage integrations |
| ExecViewer | Read-only access to portfolio and client details |

### Core Entities

```
clients
├── id (uuid, PK)
├── name (text)
├── hubspot_company_id (text, nullable)
├── contract_renewal_date (date, nullable)
├── contract_value (numeric, nullable)
├── primary_contact_email (text, nullable)
├── status (enum: active, churned, prospect)
├── created_at (timestamptz)
├── updated_at (timestamptz)
└── created_by (uuid, FK -> auth.users)

initiatives
├── id (uuid, PK)
├── client_id (uuid, FK -> clients)
├── title (text)
├── description (text, nullable)
├── status (enum: not_started, in_progress, completed, on_hold)
├── priority (enum: low, medium, high, critical)
├── due_date (date, nullable)
├── created_at (timestamptz)
└── updated_at (timestamptz)

risks
├── id (uuid, PK)
├── client_id (uuid, FK -> clients)
├── title (text)
├── description (text, nullable)
├── severity (enum: low, medium, high, critical)
├── status (enum: open, mitigated, resolved)
├── mitigation_plan (text, nullable)
├── created_at (timestamptz)
└── updated_at (timestamptz)

weekly_updates
├── id (uuid, PK)
├── client_id (uuid, FK -> clients)
├── week_start_date (date) -- Monday of the week
├── overall_health (enum: green, yellow, red)
├── health_rationale (text, nullable) -- Required when Y/R
├── summary (text)
├── wins (text, nullable)
├── blockers (text, nullable)
├── next_steps (text, nullable)
├── created_by (uuid, FK -> auth.users)
├── created_at (timestamptz)
├── updated_at (timestamptz)
└── UNIQUE(client_id, week_start_date)

jira_rollup_snapshots
├── id (uuid, PK)
├── client_id (uuid, FK -> clients)
├── snapshot_date (timestamptz)
├── total_issues (integer)
├── open_issues (integer)
├── in_progress_issues (integer)
├── completed_issues (integer)
├── overdue_issues (integer)
├── data_json (jsonb) -- Full rollup data
├── created_at (timestamptz)
└── synced_at (timestamptz)

user_profiles
├── id (uuid, PK, FK -> auth.users)
├── email (text)
├── full_name (text)
├── role (enum: admin, standard, exec_viewer)
├── created_at (timestamptz)
└── updated_at (timestamptz)

integration_configs
├── id (uuid, PK)
├── integration_type (enum: jira, hubspot)
├── config_json (jsonb, encrypted)
├── is_active (boolean)
├── last_synced_at (timestamptz, nullable)
├── created_at (timestamptz)
└── updated_at (timestamptz)
```

## File/Folder Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── portfolio/
│   │   │   └── page.tsx
│   │   ├── my-accounts/
│   │   │   └── page.tsx
│   │   ├── clients/
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx           # Client detail with tabs
│   │   │   │   └── update/
│   │   │   │       └── page.tsx       # Weekly update form
│   │   │   └── page.tsx               # Clients list (redirect to portfolio)
│   │   ├── admin/
│   │   │   ├── integrations/
│   │   │   │   └── page.tsx
│   │   │   ├── mapping/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx             # Admin-only layout guard
│   │   ├── definitions/
│   │   │   └── page.tsx
│   │   └── layout.tsx                 # Dashboard layout with sidebar
│   ├── api/
│   │   ├── auth/
│   │   │   └── callback/
│   │   │       └── route.ts
│   │   ├── clients/
│   │   │   └── route.ts
│   │   ├── weekly-updates/
│   │   │   └── route.ts
│   │   └── sync/
│   │       ├── jira/
│   │       │   └── route.ts
│   │       └── hubspot/
│   │           └── route.ts
│   ├── globals.css
│   ├── layout.tsx                     # Root layout
│   └── page.tsx                       # Root redirect to /portfolio
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── textarea.tsx
│   │   ├── tabs.tsx
│   │   └── dialog.tsx
│   ├── layout/
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   └── nav-link.tsx
│   ├── portfolio/
│   │   ├── portfolio-filters.tsx
│   │   ├── portfolio-table.tsx
│   │   └── health-badge.tsx
│   ├── clients/
│   │   ├── client-summary.tsx
│   │   ├── client-tabs.tsx
│   │   ├── initiatives-tab.tsx
│   │   ├── risks-tab.tsx
│   │   ├── jira-tab.tsx
│   │   ├── hubspot-tab.tsx
│   │   └── updates-tab.tsx
│   └── forms/
│       ├── weekly-update-form.tsx
│       └── client-form.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts                  # Browser client
│   │   ├── server.ts                  # Server client
│   │   └── middleware.ts              # Auth middleware helper
│   ├── utils.ts                       # Utility functions (cn, etc.)
│   └── constants.ts                   # App constants
├── types/
│   ├── database.ts                    # Supabase generated types
│   ├── entities.ts                    # Domain entity types
│   └── auth.ts                        # Auth/role types
├── hooks/
│   ├── use-user.ts
│   └── use-clients.ts
└── middleware.ts                      # Next.js middleware for auth
```

## Key Features

### 1. Portfolio Dashboard (`/portfolio`)
- Table view of all clients with:
  - Client name, health status (RYG), contract renewal date
  - Last update date with "stale" indicator (>7 days)
  - Renewal warning (<90 days)
- Filters: Health status, Renewal date range, Search
- Click row to navigate to client detail

### 2. My Accounts (`/my-accounts`)
- Same as portfolio but filtered to current user's assigned clients
- Quick access to submit weekly updates

### 3. Client Detail (`/clients/[id]`)
- **Summary Section**: Latest health, top risks, upcoming milestones, RYG history chart
- **Tabs**:
  - Initiatives: List with status, priority, due dates
  - Risks: Open risks with severity and mitigation plans
  - Jira: Rollup metrics from latest sync
  - HubSpot: Company fields from integration
  - Updates: Historical weekly updates

### 4. Weekly Update Form (`/clients/[id]/update`)
- One update per client per week (Monday-based weeks)
- Fields: Overall health (RYG), Summary, Wins, Blockers, Next Steps
- **Validation**: Rationale required when health is Yellow or Red
- Edit existing update if within same week

### 5. Admin Pages
- **Integrations** (`/admin/integrations`): Configure Jira/HubSpot credentials
- **Mapping** (`/admin/mapping`): Map external IDs to clients

### 6. Definitions (`/definitions`)
- Reference page explaining RYG criteria, status definitions

## Security Considerations
- Row Level Security (RLS) on all tables
- API routes protected by auth middleware
- Role checks in middleware and server components
- Encrypted storage for integration credentials

## Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```
