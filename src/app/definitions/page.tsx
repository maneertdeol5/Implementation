import { PageHeader } from "@/components/layout/PageHeader";

export default function DefinitionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Definitions"
        description="Shared glossary for health signals, initiative stages, and risk levels."
      />
      <section className="rounded-lg border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
        Definitions catalog will appear here.
      </section>
    </div>
  );
}
