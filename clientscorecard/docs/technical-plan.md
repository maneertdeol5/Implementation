# WellStack Client Control Tower — Technical Plan (v0)

## Goals

- **Fast, role-aware visibility** across the client portfolio: health (RYG), freshness of updates, upcoming renewals.
- **Operational rigor** for weekly updates: one per client per week, rationale required for Red/Yellow.
- **Extensible integrations** for Jira + HubSpot rollups without coupling UI to vendor APIs.

## Stack

- **Next.js (App Router) + TypeScript**
- **Tailwind CSS**
- **Supabase**: Postgres + Auth (plus RLS for authorization)

## Roles and access

Roles:

- `Admin`: full access to all pages, mappings, and integration controls.
- `Standard`: access to portfolio, clients, and weekly updates (typically scoped to assigned accounts).
- `ExecViewer`: read-only views of portfolio and client detail (no update writes).

Enforcement approach (production):

- **Supabase Auth** with role stored in `app_metadata.role` (preferred) and mirrored in a `profiles` table if needed.
- **RLS policies** enforce row-level access on every table.
- UI gates for navigation and affordances are convenience only; server + DB policies are source of truth.

## Entities (initial)

- `clients`
- `initiatives`
- `risks`
- `weekly_updates`
- `jira_rollup_snapshots`

Key constraints:

- **weekly updates uniqueness**: one update per client per week
  - `unique (client_id, week_start_date)` (or `week_of` computed week bucket)
- **rationale required** when status is Red or Yellow
  - DB check constraint OR enforced in API layer + defensive UI validation.

## Core pages and responsibilities

- `/portfolio`
  - Filters: owner/segment/RYG/stale/renewal window
  - Stale indicator: **last weekly update older than 7 days**
  - Renewal indicator: **renewal within 90 days**
- `/my-accounts`
  - Portfolio subset for the current user’s assigned accounts
- `/clients/[id]` (tabs)
  - Summary: latest update, top risks, next milestones, RYG
  - Tabs: initiatives / risks / jira / hubspot / updates
- `/clients/[id]/update`
  - Weekly update form; enforce uniqueness and required rationale
- `/admin/integrations`
  - Read status + manage credentials/secrets (later)
  - Show “last synced” per integration
- `/admin/mapping`
  - Maintain client↔vendor identifiers mapping (later)
- `/definitions`
  - Scoring rubric and definitions

## Data access pattern

- Server Components fetch data via `src/lib/supabase/server.ts` client.
- Client Components use `src/lib/supabase/browser.ts` only for interactive auth/session and client-side UX enhancements.
- Prefer **server-side reads** for critical dashboards and enforce authorization via **RLS**.

## Folder structure (proposed / initial)

```
src/
  app/
    (app)/                     # authenticated application shell
      layout.tsx               # sidebar + header
      portfolio/page.tsx
      my-accounts/page.tsx
      clients/page.tsx
      clients/[id]/
        layout.tsx             # client header + tab bar
        page.tsx               # Summary tab
        initiatives/page.tsx
        risks/page.tsx
        jira/page.tsx
        hubspot/page.tsx
        updates/page.tsx
        update/page.tsx        # Weekly update form
      admin/
        layout.tsx             # admin gate (role check)
        integrations/page.tsx
        mapping/page.tsx
      definitions/page.tsx

  components/
    auth/RequireRole.tsx
    clients/ClientTabs.tsx
    shell/AppShell.tsx
    shell/Header.tsx
    shell/SidebarNav.tsx
    ui/PageTitle.tsx

  lib/
    auth/
      getCurrentUserRole.ts
      roles.ts
    nav/
      navItems.ts
    supabase/
      browser.ts
      env.ts
      server.ts
```

## Integrations (deferred)

For Jira + HubSpot, the eventual approach:

- Scheduled sync (Supabase Edge Functions / server cron) writes normalized rollup snapshots to Postgres.
- UI reads from `jira_rollup_snapshots` and `hubspot_company_snapshots` (or similar) and displays a **last synced** timestamp.
- Mapping managed in `/admin/mapping` with strong uniqueness constraints.

