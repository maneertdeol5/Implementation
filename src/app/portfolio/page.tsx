import { PageHeader } from "@/components/layout/PageHeader";

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Portfolio"
        description="Monitor client health, renewals, and weekly update freshness."
      />

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase text-slate-400">
            Health snapshot
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Roll up RYG status across all active clients.
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase text-slate-400">
            Renewals
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Highlight renewals within the next 90 days.
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase text-slate-400">
            Stale updates
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Flag clients without updates in the last 7 days.
          </p>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="text-sm font-semibold text-slate-700">Filters</h2>
        <p className="mt-2 text-sm text-slate-500">
          Segment by owner, region, renewal window, and RYG health.
        </p>
      </section>

      <section className="rounded-lg border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
        Client list table will appear here.
      </section>
    </div>
  );
}
