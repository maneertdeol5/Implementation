import type { ReactNode } from "react";

import { Sidebar } from "@/components/nav/Sidebar";
import { TopNav } from "@/components/nav/TopNav";
import { getCurrentUserRole } from "@/lib/auth/getCurrentUserRole";
import type { Role } from "@/lib/auth/roles";

export default async function AppShell({
  children,
}: {
  children: ReactNode;
}) {
  const role = await getCurrentUserRole();
  const effectiveRole: Role = role ?? "standard";

  return (
    <div className="flex min-h-screen">
      <Sidebar role={effectiveRole} />
      <div className="flex flex-1 flex-col">
        <TopNav role={effectiveRole} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
