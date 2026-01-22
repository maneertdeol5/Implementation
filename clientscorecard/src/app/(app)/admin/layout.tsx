import { RequireRole } from "@/components/auth/RequireRole";
import { Roles } from "@/lib/auth/roles";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RequireRole allowed={[Roles.Admin]}>{children}</RequireRole>;
}

