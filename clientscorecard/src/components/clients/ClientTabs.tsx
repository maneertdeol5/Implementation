"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = { label: string; href: string };

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function ClientTabs({ clientId }: { clientId: string }) {
  const pathname = usePathname();
  const base = `/clients/${clientId}`;

  const tabs: readonly Tab[] = [
    { label: "Summary", href: base },
    { label: "Initiatives", href: `${base}/initiatives` },
    { label: "Risks", href: `${base}/risks` },
    { label: "Jira", href: `${base}/jira` },
    { label: "HubSpot", href: `${base}/hubspot` },
    { label: "Updates", href: `${base}/updates` },
  ];

  return (
    <div className="border-b border-zinc-200">
      <div className="-mb-px flex gap-6 overflow-x-auto px-6">
        {tabs.map((t) => {
          const active = isActive(pathname, t.href);
          return (
            <Link
              key={t.href}
              href={t.href}
              className={[
                "whitespace-nowrap border-b-2 py-3 text-sm font-medium transition-colors",
                active
                  ? "border-zinc-900 text-zinc-900"
                  : "border-transparent text-zinc-600 hover:text-zinc-900",
              ].join(" ")}
            >
              {t.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

