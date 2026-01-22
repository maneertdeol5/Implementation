type ClientSummaryProps = {
  clientId: string;
};

export function ClientSummary({ clientId }: ClientSummaryProps) {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">Client</p>
          <h1 className="text-2xl font-semibold text-slate-900">{clientId}</h1>
        </div>
        <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
          RYG: Green
        </span>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-700">
            Latest weekly update
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            No update submitted yet.
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-700">Top risks</h2>
          <p className="mt-2 text-sm text-slate-500">
            Track the highest impact risks here.
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-700">
            Next milestones
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Upcoming initiatives and due dates.
          </p>
        </div>
      </div>
    </section>
  );
}
