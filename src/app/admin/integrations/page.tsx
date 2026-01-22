import { PageHeader } from "@/components/layout/PageHeader";

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Integrations"
        description="Monitor Jira and HubSpot sync status."
      />
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-700">Jira</h2>
          <p className="mt-2 text-sm text-slate-500">
            Last synced: Not connected
          </p>
          <p className="text-sm text-slate-500">
            Rollup snapshots will land here.
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-700">HubSpot</h2>
          <p className="mt-2 text-sm text-slate-500">
            Last synced: Not connected
          </p>
          <p className="text-sm text-slate-500">
            Company field mappings will land here.
          </p>
        </div>
      </section>
    </div>
  );
}
