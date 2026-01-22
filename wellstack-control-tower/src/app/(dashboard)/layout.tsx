import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import type { UserRole, UserProfile } from "@/types";
import type { User } from "@supabase/supabase-js";

interface UserData {
  user: User;
  profile: UserProfile | null;
}

async function getUser(): Promise<UserData | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // Get user profile with role
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return {
    user,
    profile: profile as UserProfile | null,
  };
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await getUser();

  if (!userData?.user) {
    redirect("/login");
  }

  const userRole = userData.profile?.role as UserRole | undefined;
  const userEmail = userData.user.email;

  return (
    <div className="min-h-full">
      {/* Sidebar */}
      <Sidebar userRole={userRole} />

      {/* Main content area */}
      <div className="pl-64">
        {/* Header */}
        <Header
          userEmail={userEmail}
          userRole={userRole}
        />

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
