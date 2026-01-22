import { PageHeader } from "@/components/layout/PageHeader";

export default function MyAccountsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Accounts"
        description="Track the clients you own and their latest updates."
      />
      <section className="rounded-lg border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
        Assigned accounts list will appear here.
      </section>
    </div>
  );
}
