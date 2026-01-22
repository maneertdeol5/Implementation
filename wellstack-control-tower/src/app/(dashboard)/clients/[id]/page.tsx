import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HealthBadge } from "@/components/portfolio/health-badge";
import { formatDate, formatRelativeDate } from "@/lib/utils";
import {
  ArrowLeft,
  Plus,
  AlertTriangle,
  Target,
  FileText,
  ExternalLink,
  Clock,
} from "lucide-react";
import type { 
  HealthStatus, 
  RiskSeverity, 
  InitiativeStatus,
  Client,
  Initiative,
  Risk,
  WeeklyUpdate,
  JiraRollupSnapshot,
} from "@/types";
import { INITIATIVE_STATUS, RISK_SEVERITY, RISK_STATUS } from "@/lib/constants";

interface Props {
  params: Promise<{ id: string }>;
}

interface ClientDetailsData {
  client: Client;
  initiatives: Initiative[];
  risks: Risk[];
  weeklyUpdates: WeeklyUpdate[];
  jiraSnapshot: JiraRollupSnapshot | null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: client } = await supabase
    .from("clients")
    .select("name")
    .eq("id", id)
    .single();

  const typedClient = client as { name: string } | null;
  return {
    title: typedClient?.name || "Client Details",
  };
}

async function getClientDetails(id: string): Promise<ClientDetailsData | null> {
  const supabase = await createClient();

  // Get client with all related data
  const { data: client, error } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !client) {
    return null;
  }

  // Get initiatives
  const { data: initiatives } = await supabase
    .from("initiatives")
    .select("*")
    .eq("client_id", id)
    .order("created_at", { ascending: false });

  // Get risks
  const { data: risks } = await supabase
    .from("risks")
    .select("*")
    .eq("client_id", id)
    .order("created_at", { ascending: false });

  // Get weekly updates
  const { data: weeklyUpdates } = await supabase
    .from("weekly_updates")
    .select("*")
    .eq("client_id", id)
    .order("week_start_date", { ascending: false });

  // Get latest Jira snapshot
  const { data: jiraSnapshots } = await supabase
    .from("jira_rollup_snapshots")
    .select("*")
    .eq("client_id", id)
    .order("snapshot_date", { ascending: false })
    .limit(1);

  const jiraSnapshotData = jiraSnapshots && jiraSnapshots.length > 0 
    ? (jiraSnapshots[0] as unknown as JiraRollupSnapshot) 
    : null;

  return {
    client: client as unknown as Client,
    initiatives: (initiatives as unknown as Initiative[]) || [],
    risks: (risks as unknown as Risk[]) || [],
    weeklyUpdates: (weeklyUpdates as unknown as WeeklyUpdate[]) || [],
    jiraSnapshot: jiraSnapshotData,
  };
}

export default async function ClientDetailPage({ params }: Props) {
  const { id } = await params;
  const data = await getClientDetails(id);

  if (!data) {
    notFound();
  }

  const { client, initiatives, risks, weeklyUpdates, jiraSnapshot } = data;
  const latestUpdate = weeklyUpdates[0];
  const openRisks = risks.filter((r: { status: string }) => r.status === "open");
  const activeInitiatives = initiatives.filter(
    (i: { status: string }) => i.status === "in_progress" || i.status === "not_started"
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="icon">
            <Link href="/portfolio">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
            <p className="text-gray-500">Client Overview</p>
          </div>
        </div>
        <Button asChild>
          <Link href={`/clients/${id}/update`}>
            <Plus className="mr-2 h-4 w-4" />
            Weekly Update
          </Link>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Current Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            {latestUpdate ? (
              <HealthBadge status={latestUpdate.overall_health as HealthStatus} size="lg" />
            ) : (
              <span className="text-gray-400">No updates yet</span>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Last Update
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="font-medium">
                {latestUpdate ? formatRelativeDate(latestUpdate.created_at) : "Never"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Open Risks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <span className="text-2xl font-bold">{openRisks.length}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Contract Renewal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="font-medium">
              {formatDate(client.contract_renewal_date)}
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="initiatives" className="space-y-4">
        <TabsList>
          <TabsTrigger value="initiatives">
            Initiatives ({initiatives.length})
          </TabsTrigger>
          <TabsTrigger value="risks">Risks ({risks.length})</TabsTrigger>
          <TabsTrigger value="updates">Updates ({weeklyUpdates.length})</TabsTrigger>
          <TabsTrigger value="jira">Jira</TabsTrigger>
          <TabsTrigger value="hubspot">HubSpot</TabsTrigger>
        </TabsList>

        {/* Initiatives Tab */}
        <TabsContent value="initiatives">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Initiatives</CardTitle>
              <Badge variant="secondary">{activeInitiatives.length} active</Badge>
            </CardHeader>
            <CardContent>
              {initiatives.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  No initiatives recorded for this client.
                </p>
              ) : (
                <div className="space-y-4">
                  {initiatives.map((initiative: {
                    id: string;
                    title: string;
                    description: string | null;
                    status: InitiativeStatus;
                    priority: string;
                    due_date: string | null;
                  }) => (
                    <div
                      key={initiative.id}
                      className="flex items-start justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-start gap-3">
                        <Target className="mt-0.5 h-5 w-5 text-gray-400" />
                        <div>
                          <h4 className="font-medium">{initiative.title}</h4>
                          {initiative.description && (
                            <p className="mt-1 text-sm text-gray-500">
                              {initiative.description}
                            </p>
                          )}
                          <div className="mt-2 flex items-center gap-2">
                            <Badge
                              className={
                                INITIATIVE_STATUS[initiative.status]?.color
                              }
                            >
                              {INITIATIVE_STATUS[initiative.status]?.label}
                            </Badge>
                            {initiative.due_date && (
                              <span className="text-xs text-gray-500">
                                Due: {formatDate(initiative.due_date)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risks Tab */}
        <TabsContent value="risks">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Risks</CardTitle>
              <Badge variant={openRisks.length > 0 ? "destructive" : "secondary"}>
                {openRisks.length} open
              </Badge>
            </CardHeader>
            <CardContent>
              {risks.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  No risks recorded for this client.
                </p>
              ) : (
                <div className="space-y-4">
                  {risks.map((risk: {
                    id: string;
                    title: string;
                    description: string | null;
                    severity: RiskSeverity;
                    status: "open" | "mitigated" | "resolved";
                    mitigation_plan: string | null;
                  }) => (
                    <div
                      key={risk.id}
                      className="flex items-start justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-start gap-3">
                        <AlertTriangle
                          className={`mt-0.5 h-5 w-5 ${
                            risk.status === "open"
                              ? "text-red-500"
                              : "text-gray-400"
                          }`}
                        />
                        <div>
                          <h4 className="font-medium">{risk.title}</h4>
                          {risk.description && (
                            <p className="mt-1 text-sm text-gray-500">
                              {risk.description}
                            </p>
                          )}
                          <div className="mt-2 flex items-center gap-2">
                            <Badge className={RISK_SEVERITY[risk.severity]?.color}>
                              {RISK_SEVERITY[risk.severity]?.label}
                            </Badge>
                            <Badge className={RISK_STATUS[risk.status]?.color}>
                              {RISK_STATUS[risk.status]?.label}
                            </Badge>
                          </div>
                          {risk.mitigation_plan && (
                            <p className="mt-2 text-sm text-gray-600">
                              <strong>Mitigation:</strong> {risk.mitigation_plan}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Updates Tab */}
        <TabsContent value="updates">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Updates History</CardTitle>
            </CardHeader>
            <CardContent>
              {weeklyUpdates.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  No weekly updates recorded yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {weeklyUpdates.map((update: {
                    id: string;
                    week_start_date: string;
                    overall_health: HealthStatus;
                    summary: string;
                    health_rationale: string | null;
                    wins: string | null;
                    blockers: string | null;
                    next_steps: string | null;
                    created_at: string;
                  }) => (
                    <div key={update.id} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-gray-400" />
                          <span className="font-medium">
                            Week of {formatDate(update.week_start_date)}
                          </span>
                        </div>
                        <HealthBadge status={update.overall_health} />
                      </div>
                      <p className="text-sm text-gray-700">{update.summary}</p>
                      {update.health_rationale && (
                        <p className="mt-2 text-sm text-gray-600">
                          <strong>Rationale:</strong> {update.health_rationale}
                        </p>
                      )}
                      {update.wins && (
                        <p className="mt-2 text-sm text-green-700">
                          <strong>Wins:</strong> {update.wins}
                        </p>
                      )}
                      {update.blockers && (
                        <p className="mt-2 text-sm text-red-700">
                          <strong>Blockers:</strong> {update.blockers}
                        </p>
                      )}
                      {update.next_steps && (
                        <p className="mt-2 text-sm text-blue-700">
                          <strong>Next Steps:</strong> {update.next_steps}
                        </p>
                      )}
                      <p className="mt-3 text-xs text-gray-400">
                        Submitted {formatRelativeDate(update.created_at)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Jira Tab */}
        <TabsContent value="jira">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Jira Integration
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {jiraSnapshot ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    Last synced: {formatRelativeDate(jiraSnapshot.synced_at)}
                  </p>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-lg bg-gray-50 p-4 text-center">
                      <p className="text-2xl font-bold">{jiraSnapshot.total_issues}</p>
                      <p className="text-sm text-gray-500">Total Issues</p>
                    </div>
                    <div className="rounded-lg bg-blue-50 p-4 text-center">
                      <p className="text-2xl font-bold text-blue-600">
                        {jiraSnapshot.open_issues}
                      </p>
                      <p className="text-sm text-gray-500">Open</p>
                    </div>
                    <div className="rounded-lg bg-yellow-50 p-4 text-center">
                      <p className="text-2xl font-bold text-yellow-600">
                        {jiraSnapshot.in_progress_issues}
                      </p>
                      <p className="text-sm text-gray-500">In Progress</p>
                    </div>
                    <div className="rounded-lg bg-green-50 p-4 text-center">
                      <p className="text-2xl font-bold text-green-600">
                        {jiraSnapshot.completed_issues}
                      </p>
                      <p className="text-sm text-gray-500">Completed</p>
                    </div>
                  </div>
                  {jiraSnapshot.overdue_issues > 0 && (
                    <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                      <p className="text-sm text-red-700">
                        <strong>{jiraSnapshot.overdue_issues}</strong> overdue issues
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ExternalLink className="mx-auto h-12 w-12 text-gray-300" />
                  <p className="mt-4 text-gray-500">
                    Jira integration not configured for this client.
                  </p>
                  <p className="text-sm text-gray-400">
                    Contact an admin to set up the integration.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* HubSpot Tab */}
        <TabsContent value="hubspot">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                HubSpot Integration
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {client.hubspot_company_id ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    HubSpot Company ID: {client.hubspot_company_id}
                  </p>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-600">
                      HubSpot data will appear here once the integration is configured.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <ExternalLink className="mx-auto h-12 w-12 text-gray-300" />
                  <p className="mt-4 text-gray-500">
                    HubSpot integration not configured for this client.
                  </p>
                  <p className="text-sm text-gray-400">
                    Contact an admin to link the HubSpot company.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
