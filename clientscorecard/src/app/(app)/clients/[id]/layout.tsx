import Link from "next/link";
import { ClientTabs } from "@/components/clients/ClientTabs";

export default async function ClientLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id: clientId } = await params;

  return (
    <div className="-m-6">
      <div className="border-b border-zinc-200 bg-white">
        <div className="flex items-center justify-between gap-4 px-6 py-5">
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Client
            </div>
            <h1 className="mt-1 text-xl font-semibold tracking-tight text-zinc-900">
              {clientId}
            </h1>
          </div>
          <Link
            href={`/clients/${clientId}/update`}
            className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Add weekly update
          </Link>
        </div>
        <ClientTabs clientId={clientId} />
      </div>

      <div className="p-6">{children}</div>
    </div>
  );
}

