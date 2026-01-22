import { getCurrentUserRole } from "@/lib/auth/getCurrentUserRole";
import { canAccess, type Role } from "@/lib/auth/roles";

export async function RequireRole({
  allowed,
  children,
}: {
  allowed: readonly Role[];
  children: React.ReactNode;
}) {
  const role = await getCurrentUserRole();
  if (!canAccess(role, allowed)) {
    return (
      <div className="rounded-lg border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Not authorized</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Your account doesn’t have access to this page.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}

