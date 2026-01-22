import type { Role } from "@/lib/auth/roles";
import { navItemsForRole } from "@/lib/nav/navItems";
import { Header } from "./Header";
import { SidebarNav } from "./SidebarNav";

export function AppShell({
  role,
  children,
}: {
  role: Role;
  children: React.ReactNode;
}) {
  const items = navItemsForRole(role).map((i) => ({ label: i.label, href: i.href }));

  return (
    <div className="min-h-screen">
      <div className="grid min-h-screen grid-cols-[260px_1fr]">
        <aside className="border-r border-zinc-200 bg-white">
          <SidebarNav items={items} />
        </aside>
        <div className="flex min-w-0 flex-col">
          <Header role={role} />
          <main className="min-w-0 flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

