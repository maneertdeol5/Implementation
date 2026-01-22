export default async function ClientUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Weekly Update: {id}</h1>
      <p className="mt-2 text-slate-600">Submit weekly update for this client.</p>
    </div>
  );
}
