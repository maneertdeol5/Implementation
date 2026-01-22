"use client";

import { Bell, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { UserRole } from "@/types";
import { USER_ROLES } from "@/lib/constants";

interface HeaderProps {
  title?: string;
  userEmail?: string;
  userRole?: UserRole;
  onSignOut?: () => void;
}

export function Header({ title, userEmail, userRole, onSignOut }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* Page Title */}
      <div className="flex items-center gap-4">
        {title && (
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        )}
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-4">
        {/* Notifications placeholder */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-500" />
          <span className="sr-only">Notifications</span>
        </Button>

        {/* User menu */}
        <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
              <User className="h-4 w-4 text-gray-600" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-700">
                {userEmail ?? "User"}
              </p>
              {userRole && (
                <Badge variant="secondary" className="text-xs">
                  {USER_ROLES[userRole]?.label ?? userRole}
                </Badge>
              )}
            </div>
          </div>

          {onSignOut && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onSignOut}
              title="Sign out"
            >
              <LogOut className="h-4 w-4 text-gray-500" />
              <span className="sr-only">Sign out</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
