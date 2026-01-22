export default async function ClientSummaryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-zinc-200 bg-white p-4">
          <div className="text-sm font-medium text-zinc-900">Latest weekly update</div>
          <div className="mt-2 text-sm text-zinc-600">
            TODO: load most recent `weekly_updates` for client {id}.
          </div>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-4">
          <div className="text-sm font-medium text-zinc-900">Top risks</div>
          <div className="mt-2 text-sm text-zinc-600">
            TODO: load top risks and RYG.
          </div>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-4">
          <div className="text-sm font-medium text-zinc-900">Next milestones</div>
          <div className="mt-2 text-sm text-zinc-600">
            TODO: show next milestones from initiatives.
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-4">
        <div className="text-sm font-medium text-zinc-900">Overall health (RYG)</div>
        <div className="mt-2 text-sm text-zinc-600">
          TODO: derive from latest update or computed scoring.
        </div>
      </div>
    </div>
  );
}

