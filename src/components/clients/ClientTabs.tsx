"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type ClientTabsProps = {
  clientId: string;
};

export function ClientTabs({ clientId }: ClientTabsProps) {
  const pathname = usePathname();

  const tabs = [
    {
      label: "Initiatives",
      href: `/clients/${clientId}/initiatives`,
      matches: [`/clients/${clientId}/initiatives`],
    },
    {
      label: "Risks",
      href: `/clients/${clientId}/risks`,
      matches: [`/clients/${clientId}/risks`],
    },
    {
      label: "Jira",
      href: `/clients/${clientId}/jira`,
      matches: [`/clients/${clientId}/jira`],
    },
    {
      label: "HubSpot",
      href: `/clients/${clientId}/hubspot`,
      matches: [`/clients/${clientId}/hubspot`],
    },
    {
      label: "Updates",
      href: `/clients/${clientId}/updates`,
      matches: [
        `/clients/${clientId}/updates`,
        `/clients/${clientId}/update`,
      ],
    },
  ];

  return (
    <div className="border-b border-slate-200">
      <nav className="-mb-px flex flex-wrap gap-4">
        {tabs.map((tab) => {
          const isActive = tab.matches.some((match) =>
            pathname.startsWith(match)
          );

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`border-b-2 px-1 pb-3 text-sm font-medium ${
                isActive
                  ? "border-slate-900 text-slate-900"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
