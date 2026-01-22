export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Client Detail: {id}</h1>
      <p className="mt-2 text-slate-600">Client summary and tabs.</p>
    </div>
  );
}
