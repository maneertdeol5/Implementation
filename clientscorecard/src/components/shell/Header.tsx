import type { Role } from "@/lib/auth/roles";

export function Header({ role }: { role: Role }) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-zinc-200 bg-white px-4">
      <div className="flex items-baseline gap-3">
        <div className="text-sm font-semibold text-zinc-900">
          WellStack Client Control Tower
        </div>
        <div className="text-xs text-zinc-500">Internal</div>
      </div>
      <div className="text-xs text-zinc-600">
        Role: <span className="font-medium text-zinc-900">{role}</span>
      </div>
    </header>
  );
}

