export default async function ClientHubSpotPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4">
      <div className="text-sm font-medium text-zinc-900">HubSpot</div>
      <div className="mt-2 text-sm text-zinc-600">
        TODO: show mapped company fields and last synced timestamp (integrations not implemented yet).
      </div>
      <div className="mt-2 text-xs text-zinc-500">Client: {id}</div>
    </div>
  );
}

