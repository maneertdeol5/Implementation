export default async function ClientRisksPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4">
      <div className="text-sm font-medium text-zinc-900">Risks</div>
      <div className="mt-2 text-sm text-zinc-600">
        TODO: list risks for client {id} with RYG, owner, mitigation, due date.
      </div>
    </div>
  );
}

