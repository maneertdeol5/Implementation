import { PageTitle } from "@/components/ui/PageTitle";

export default function DefinitionsPage() {
  return (
    <div className="space-y-6">
      <PageTitle
        title="Definitions"
        subtitle="Common definitions and scoring rubric (scaffolding)."
      />

      <div className="rounded-lg border border-zinc-200 bg-white p-4">
        <div className="text-sm font-medium text-zinc-900">RYG rubric</div>
        <div className="mt-2 text-sm text-zinc-600">
          TODO: define Red/Yellow/Green semantics, thresholds, examples.
        </div>
      </div>
    </div>
  );
}

