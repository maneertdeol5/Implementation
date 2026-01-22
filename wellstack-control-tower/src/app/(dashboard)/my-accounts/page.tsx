import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HealthIndicator } from "@/components/portfolio/health-badge";
import { Button } from "@/components/ui/button";
import { formatDate, formatRelativeDate, isStale } from "@/lib/utils";
import { STALE_THRESHOLD_DAYS } from "@/lib/constants";
import Link from "next/link";
import { Plus } from "lucide-react";
import type { HealthStatus } from "@/types";

export const metadata: Metadata = {
  title: "My Accounts",
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

async function getMyAccounts() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  // Get clients created by the current user with their latest weekly update
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
    .eq("created_by", user.id)
    .eq("status", "active")
    .order("name");

  if (error) {
    console.error("Error fetching clients:", error);
    return [];
  }

  const typedClients = (clients || []) as unknown as ClientWithUpdates[];

  // Process clients to get latest update
  return typedClients.map((client) => {
    const updates = client.weekly_updates || [];
    const latestUpdate = updates.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )[0];

    return {
      ...client,
      latestUpdate,
      isStale: isStale(latestUpdate?.created_at, STALE_THRESHOLD_DAYS),
    };
  });
}

interface ProcessedClient {
  id: string;
  name: string;
  contract_renewal_date: string | null;
  latestUpdate?: { overall_health: HealthStatus; created_at: string } | null;
  isStale: boolean;
}

export default async function MyAccountsPage() {
  const clients = await getMyAccounts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Accounts</h1>
          <p className="text-gray-500">Clients you are responsible for</p>
        </div>
      </div>

      {clients.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <Plus className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No accounts assigned</h3>
            <p className="mt-2 text-gray-500">
              You don&apos;t have any clients assigned to you yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clients.map((client: ProcessedClient) => (
            <Card key={client.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">
                    <Link
                      href={`/clients/${client.id}`}
                      className="hover:text-blue-600"
                    >
                      {client.name}
                    </Link>
                  </CardTitle>
                  {client.latestUpdate && (
                    <HealthIndicator
                      status={client.latestUpdate.overall_health}
                      isStale={client.isStale}
                    />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Last Update:</span>
                    <span className={client.isStale ? "text-orange-600 font-medium" : ""}>
                      {client.latestUpdate
                        ? formatRelativeDate(client.latestUpdate.created_at)
                        : "No updates"}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Renewal:</span>
                    <span>{formatDate(client.contract_renewal_date)}</span>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button asChild variant="outline" size="sm" className="flex-1">
                    <Link href={`/clients/${client.id}`}>View Details</Link>
                  </Button>
                  <Button asChild size="sm" className="flex-1">
                    <Link href={`/clients/${client.id}/update`}>
                      {client.isStale ? "Add Update" : "Update"}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
