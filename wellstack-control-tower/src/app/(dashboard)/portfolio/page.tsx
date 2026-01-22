import { Suspense } from "react";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HealthIndicator } from "@/components/portfolio/health-badge";
import { formatDate, formatRelativeDate, isStale, isWithinDays, daysUntil } from "@/lib/utils";
import { STALE_THRESHOLD_DAYS, RENEWAL_WARNING_DAYS } from "@/lib/constants";
import Link from "next/link";
import { AlertTriangle, Clock, Users, TrendingUp } from "lucide-react";
import type { HealthStatus } from "@/types";

export const metadata: Metadata = {
  title: "Portfolio",
};

interface WeeklyUpdateData {
  id: string;
  overall_health: HealthStatus;
  week_start_date: string;
  created_at: string;
}

interface ClientWithUpdates {
  id: string;
  name: string;
  status: string;
  contract_renewal_date: string | null;
  weekly_updates: WeeklyUpdateData[];
}

interface PortfolioStats {
  total: number;
  green: number;
  yellow: number;
  red: number;
  stale: number;
  renewingSoon: number;
}

async function getPortfolioData() {
  const supabase = await createClient();

  // Get all clients with their latest weekly update
  const { data: clients, error } = await supabase
    .from("clients")
    .select(`
      *,
      weekly_updates (
        id,
        overall_health,
        week_start_date,
        created_at
      )
    `)
    .eq("status", "active")
    .order("name");

  if (error) {
    console.error("Error fetching clients:", error);
    return { clients: [], stats: { total: 0, green: 0, yellow: 0, red: 0, stale: 0, renewingSoon: 0 } };
  }

  const typedClients = (clients || []) as unknown as ClientWithUpdates[];

  // Process clients to get latest update
  const processedClients = typedClients.map((client) => {
    const updates = client.weekly_updates || [];
    const latestUpdate = updates.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )[0];

    return {
      ...client,
      latestUpdate,
      isStale: isStale(latestUpdate?.created_at, STALE_THRESHOLD_DAYS),
      isRenewingSoon: isWithinDays(client.contract_renewal_date, RENEWAL_WARNING_DAYS),
      daysUntilRenewal: daysUntil(client.contract_renewal_date),
    };
  });

  // Calculate stats
  const stats: PortfolioStats = {
    total: processedClients.length,
    green: processedClients.filter((c) => c.latestUpdate?.overall_health === "green").length,
    yellow: processedClients.filter((c) => c.latestUpdate?.overall_health === "yellow").length,
    red: processedClients.filter((c) => c.latestUpdate?.overall_health === "red").length,
    stale: processedClients.filter((c) => c.isStale).length,
    renewingSoon: processedClients.filter((c) => c.isRenewingSoon).length,
  };

  return { clients: processedClients, stats };
}

function StatsCards({ stats }: { stats: { total: number; green: number; yellow: number; red: number; stale: number; renewingSoon: number } }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          <Users className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-gray-500">Active clients</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Health Distribution</CardTitle>
          <TrendingUp className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium">{stats.green}</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-yellow-500" />
              <span className="text-sm font-medium">{stats.yellow}</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span className="text-sm font-medium">{stats.red}</span>
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Stale Updates</CardTitle>
          <Clock className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">{stats.stale}</div>
          <p className="text-xs text-gray-500">No update in 7+ days</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Renewals Soon</CardTitle>
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">{stats.renewingSoon}</div>
          <p className="text-xs text-gray-500">Within 90 days</p>
        </CardContent>
      </Card>
    </div>
  );
}

interface ProcessedClient {
  id: string;
  name: string;
  contract_renewal_date: string | null;
  latestUpdate?: { overall_health: HealthStatus; created_at: string } | null;
  isStale: boolean;
  isRenewingSoon: boolean;
  daysUntilRenewal: number | null;
}

function ClientsTable({ clients }: { clients: ProcessedClient[] }) {
  if (clients.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-gray-500">No clients found. Add your first client to get started.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Portfolio</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Client</th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Health</th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Last Update</th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Renewal Date</th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="py-4">
                    <Link
                      href={`/clients/${client.id}`}
                      className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {client.name}
                    </Link>
                  </td>
                  <td className="py-4">
                    {client.latestUpdate ? (
                      <HealthIndicator
                        status={client.latestUpdate.overall_health}
                        isStale={client.isStale}
                      />
                    ) : (
                      <span className="text-sm text-gray-400">No updates</span>
                    )}
                  </td>
                  <td className="py-4">
                    <span className={client.isStale ? "text-orange-600" : "text-gray-600"}>
                      {client.latestUpdate
                        ? formatRelativeDate(client.latestUpdate.created_at)
                        : "—"}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className={client.isRenewingSoon ? "font-medium text-yellow-600" : "text-gray-600"}>
                      {formatDate(client.contract_renewal_date)}
                    </span>
                    {client.daysUntilRenewal !== null && client.daysUntilRenewal <= 90 && client.daysUntilRenewal >= 0 && (
                      <span className="ml-2 text-xs text-yellow-600">
                        ({client.daysUntilRenewal} days)
                      </span>
                    )}
                  </td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      {client.isStale && (
                        <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
                          Stale
                        </span>
                      )}
                      {client.isRenewingSoon && (
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
                          Renewal Soon
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              <div className="mt-2 h-8 w-16 animate-pulse rounded bg-gray-200" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 animate-pulse rounded bg-gray-200" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

async function PortfolioContent() {
  const { clients, stats } = await getPortfolioData();

  return (
    <div className="space-y-6">
      <StatsCards stats={stats} />
      <ClientsTable clients={clients} />
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Portfolio Dashboard</h1>
        <p className="text-gray-500">Overview of all client health and status</p>
      </div>

      <Suspense fallback={<LoadingSkeleton />}>
        <PortfolioContent />
      </Suspense>
    </div>
  );
}
