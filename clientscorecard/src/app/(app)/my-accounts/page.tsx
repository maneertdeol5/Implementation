import { PageTitle } from "@/components/ui/PageTitle";

export default function MyAccountsPage() {
  return (
    <div className="space-y-6">
      <PageTitle
        title="My Accounts"
        subtitle="Accounts assigned to you (scaffolding)."
      />

      <div className="rounded-lg border border-zinc-200 bg-white p-4">
        <div className="text-sm font-medium text-zinc-900">Assigned clients</div>
        <div className="mt-2 text-sm text-zinc-600">
          TODO: show only clients where you are the owner/CSM.
        </div>
      </div>
    </div>
  );
}

