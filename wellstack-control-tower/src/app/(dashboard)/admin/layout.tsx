import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/types/auth";
import type { UserRole } from "@/types";

interface UserProfileRole {
  role: UserRole;
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get user profile to check role
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const typedProfile = profile as UserProfileRole | null;
  const userRole = typedProfile?.role;

  if (!isAdmin(userRole)) {
    redirect("/portfolio");
  }

  return <>{children}</>;
}
