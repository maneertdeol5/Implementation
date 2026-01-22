import type { ReactNode } from "react";

import { ClientSummary } from "@/components/clients/ClientSummary";
import { ClientTabs } from "@/components/clients/ClientTabs";

type ClientLayoutProps = {
  children: ReactNode;
  params: { id: string };
};

export default function ClientLayout({ children, params }: ClientLayoutProps) {
  return (
    <div className="space-y-6">
      <ClientSummary clientId={params.id} />
      <ClientTabs clientId={params.id} />
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        {children}
      </div>
    </div>
  );
}
