import Link from "next/link";
import { PageTitle } from "@/components/ui/PageTitle";

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <PageTitle title="Clients" subtitle="Client directory (scaffolding)." />

      <div className="rounded-lg border border-zinc-200 bg-white p-4">
        <div className="text-sm font-medium text-zinc-900">Example link</div>
        <div className="mt-2 text-sm text-zinc-600">
          Placeholder until client records are wired up.
        </div>
        <div className="mt-4">
          <Link
            className="text-sm font-medium text-zinc-900 underline underline-offset-4"
            href="/clients/demo-client"
          >
            Open demo client
          </Link>
        </div>
      </div>
    </div>
  );
}

