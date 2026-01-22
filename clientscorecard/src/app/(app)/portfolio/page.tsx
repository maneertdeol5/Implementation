import { PageTitle } from "@/components/ui/PageTitle";

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      <PageTitle
        title="Portfolio"
        subtitle="Portfolio dashboard (filters, stale indicators, renewals) — scaffolding."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-zinc-200 bg-white p-4">
          <div className="text-sm font-medium text-zinc-900">Filters</div>
          <div className="mt-2 text-sm text-zinc-600">
            TODO: owner, segment, RYG, stale (&gt;7d), renewal &lt; 90d.
          </div>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-4">
          <div className="text-sm font-medium text-zinc-900">Stale indicator</div>
          <div className="mt-2 text-sm text-zinc-600">
            TODO: compute from latest weekly update date per client.
          </div>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-4">
          <div className="text-sm font-medium text-zinc-900">Renewals</div>
          <div className="mt-2 text-sm text-zinc-600">TODO: renewal within 90 days.</div>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-4">
        <div className="text-sm font-medium text-zinc-900">Client list</div>
        <div className="mt-2 text-sm text-zinc-600">
          TODO: table/grid with latest RYG, next milestone, last update timestamp.
        </div>
      </div>
    </div>
  );
}

