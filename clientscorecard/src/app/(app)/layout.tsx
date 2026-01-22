import { AppShell } from "@/components/shell/AppShell";
import { getCurrentUserRole } from "@/lib/auth/getCurrentUserRole";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const role = await getCurrentUserRole();

  return <AppShell role={role}>{children}</AppShell>;
}

