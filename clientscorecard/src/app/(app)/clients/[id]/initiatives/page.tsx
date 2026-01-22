export default async function ClientInitiativesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4">
      <div className="text-sm font-medium text-zinc-900">Initiatives</div>
      <div className="mt-2 text-sm text-zinc-600">
        TODO: list initiatives for client {id} with status and next milestones.
      </div>
    </div>
  );
}

