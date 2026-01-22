import { ROLE_LABELS, type Role } from "@/lib/auth/roles";

type TopNavProps = {
  role: Role;
};

export function TopNav({ role }: TopNavProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4">
      <div>
        <p className="text-sm text-slate-500">WellStack Client Control Tower</p>
        <h1 className="text-lg font-semibold text-slate-900">Portfolio Hub</h1>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          Role: {ROLE_LABELS[role]}
        </span>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
          Data sync: Not connected
        </span>
      </div>
    </header>
  );
}
