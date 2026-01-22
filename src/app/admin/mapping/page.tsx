import { PageHeader } from "@/components/layout/PageHeader";

export default function MappingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Field Mapping"
        description="Manage Jira and HubSpot field normalization."
      />
      <section className="rounded-lg border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
        Mapping configuration table will appear here.
      </section>
    </div>
  );
}
