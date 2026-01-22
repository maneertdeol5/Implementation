import { PageTitle } from "@/components/ui/PageTitle";

export default function AdminMappingPage() {
  return (
    <div className="space-y-6">
      <PageTitle
        title="Admin · Mapping"
        subtitle="Client ↔ Jira project / HubSpot company mapping (scaffolding)."
      />

      <div className="rounded-lg border border-zinc-200 bg-white p-4">
        <div className="text-sm font-medium text-zinc-900">Mappings</div>
        <div className="mt-2 text-sm text-zinc-600">
          TODO: manage mappings, validate uniqueness, and show sync health.
        </div>
      </div>
    </div>
  );
}

