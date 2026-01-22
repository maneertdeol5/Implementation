'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  BookOpen, 
  Network,
  Map
} from 'lucide-react';

const navigation = [
  { name: 'Portfolio', href: '/portfolio', icon: LayoutDashboard },
  { name: 'My Accounts', href: '/my-accounts', icon: Users },
  { name: 'Definitions', href: '/definitions', icon: BookOpen },
];

const adminNavigation = [
  { name: 'Integrations', href: '/admin/integrations', icon: Network },
  { name: 'Mapping', href: '/admin/mapping', icon: Map },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-slate-900 text-white">
      <div className="flex h-16 items-center px-6 font-bold text-xl">
        WellStack
      </div>
      <div className="flex-1 flex flex-col gap-y-6 px-4 py-4">
        <nav className="flex flex-col gap-y-1">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div>
          <div className="mb-2 px-3 text-xs font-semibold uppercase text-slate-500">
            Admin
          </div>
          <nav className="flex flex-col gap-y-1">
            {adminNavigation.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
