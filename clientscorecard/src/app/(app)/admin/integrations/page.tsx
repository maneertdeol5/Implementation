import { PageTitle } from "@/components/ui/PageTitle";

export default function AdminIntegrationsPage() {
  return (
    <div className="space-y-6">
      <PageTitle
        title="Admin · Integrations"
        subtitle="Jira + HubSpot integration settings and sync status (scaffolding)."
      />

      <div className="rounded-lg border border-zinc-200 bg-white p-4">
        <div className="text-sm font-medium text-zinc-900">Sync status</div>
        <div className="mt-2 text-sm text-zinc-600">
          TODO: show last synced timestamp per integration and per client mapping.
        </div>
      </div>
    </div>
  );
}

