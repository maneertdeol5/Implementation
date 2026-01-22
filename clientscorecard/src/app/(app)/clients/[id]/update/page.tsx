import { PageTitle } from "@/components/ui/PageTitle";

export default async function ClientWeeklyUpdateFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <PageTitle
        title="Weekly update"
        subtitle={`Create/update this week's status for client ${id} (scaffolding).`}
      />

      <div className="rounded-lg border border-zinc-200 bg-white p-4">
        <div className="text-sm font-medium text-zinc-900">Form requirements</div>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-600">
          <li>One update per client per week (unique constraint).</li>
          <li>Requires a rationale when status is Red or Yellow.</li>
          <li>Capture next milestones, top risks, and notes.</li>
        </ul>
        <div className="mt-4 text-sm text-zinc-600">
          TODO: implement form + upsert to `weekly_updates`.
        </div>
      </div>
    </div>
  );
}

