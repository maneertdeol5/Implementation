"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { UserRole } from "@/types";

interface UserProfileData {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
}

interface UseUserReturn {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
}

export function useUser(): UseUserReturn {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      setIsLoading(true);

      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();

        if (authUser) {
          setUser(authUser);

          // Get user profile
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { data: profileData } = await (supabase as any)
            .from("user_profiles")
            .select("*")
            .eq("id", authUser.id)
            .single();

          const typedProfile = profileData as UserProfileData | null;
          if (typedProfile) {
            setProfile({
              id: typedProfile.id,
              email: typedProfile.email,
              fullName: typedProfile.full_name,
              role: typedProfile.role as UserRole,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getUser();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        setUser(session.user);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: profileData } = await (supabase as any)
          .from("user_profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        const typedProfile = profileData as UserProfileData | null;
        if (typedProfile) {
          setProfile({
            id: typedProfile.id,
            email: typedProfile.email,
            fullName: typedProfile.full_name,
            role: typedProfile.role as UserRole,
          });
        }
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  return {
    user,
    profile,
    isLoading,
    isAuthenticated: !!user,
    signOut,
  };
}
