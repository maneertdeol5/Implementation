export default function ClientOverviewPage() {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-slate-900">Overview</h2>
      <p className="text-sm text-slate-600">
        Use the tabs above to review initiatives, risks, Jira rollups,
        HubSpot context, and weekly updates.
      </p>
      <div className="rounded-md border border-dashed border-slate-200 p-4 text-sm text-slate-500">
        Summary analytics and timelines will appear here.
      </div>
    </div>
  );
}
