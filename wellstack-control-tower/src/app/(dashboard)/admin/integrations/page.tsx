import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatRelativeDate } from "@/lib/utils";
import { Plug, RefreshCw, Settings, CheckCircle, XCircle } from "lucide-react";
import type { IntegrationConfig } from "@/types";

export const metadata: Metadata = {
  title: "Integrations",
};

async function getIntegrations(): Promise<IntegrationConfig[]> {
  const supabase = await createClient();

  const { data: integrations } = await supabase
    .from("integration_configs")
    .select("*")
    .order("integration_type");

  return (integrations as IntegrationConfig[]) || [];
}

export default async function IntegrationsPage() {
  const integrations = await getIntegrations();

  const jiraConfig = integrations.find((i) => i.integration_type === "jira");
  const hubspotConfig = integrations.find((i) => i.integration_type === "hubspot");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
        <p className="text-gray-500">
          Configure external integrations for data syncing
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Jira Integration */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <svg
                    className="h-6 w-6 text-blue-600"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.758a1.001 1.001 0 0 0-1.001-1.001zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24 12.483V1.005A1.005 1.005 0 0 0 23.013 0z" />
                  </svg>
                </div>
                <div>
                  <CardTitle>Jira</CardTitle>
                  <CardDescription>Project tracking integration</CardDescription>
                </div>
              </div>
              {jiraConfig?.is_active ? (
                <Badge variant="success" className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Connected
                </Badge>
              ) : (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <XCircle className="h-3 w-3" />
                  Not Connected
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Sync issue rollups and project status from Jira to track client
              delivery metrics.
            </p>

            {jiraConfig && (
              <div className="rounded-lg bg-gray-50 p-3 text-sm">
                <p className="text-gray-600">
                  Last synced:{" "}
                  {jiraConfig.last_synced_at
                    ? formatRelativeDate(jiraConfig.last_synced_at)
                    : "Never"}
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Settings className="mr-2 h-4 w-4" />
                Configure
              </Button>
              {jiraConfig?.is_active && (
                <Button variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Sync Now
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* HubSpot Integration */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                  <svg
                    className="h-6 w-6 text-orange-600"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.164 7.93V5.084a2.198 2.198 0 0 0 1.267-1.978v-.067A2.2 2.2 0 0 0 17.238.845h-.067a2.2 2.2 0 0 0-2.193 2.194v.067c0 .844.481 1.572 1.18 1.94v2.885a6.175 6.175 0 0 0-2.932 1.26l-7.737-6.024a2.598 2.598 0 0 0 .088-.652 2.608 2.608 0 1 0-2.608 2.608c.477 0 .923-.133 1.307-.356l7.563 5.882a6.216 6.216 0 0 0-.635 2.737 6.214 6.214 0 0 0 .673 2.812l-2.33 2.33a2.197 2.197 0 0 0-.656-.106 2.2 2.2 0 1 0 2.194 2.194c0-.233-.04-.457-.106-.665l2.291-2.291a6.226 6.226 0 1 0 4.092-10.752zm0 9.544a3.325 3.325 0 1 1 0-6.65 3.325 3.325 0 0 1 0 6.65z" />
                  </svg>
                </div>
                <div>
                  <CardTitle>HubSpot</CardTitle>
                  <CardDescription>CRM integration</CardDescription>
                </div>
              </div>
              {hubspotConfig?.is_active ? (
                <Badge variant="success" className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Connected
                </Badge>
              ) : (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <XCircle className="h-3 w-3" />
                  Not Connected
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Pull company data and contact information from HubSpot to enrich
              client profiles.
            </p>

            {hubspotConfig && (
              <div className="rounded-lg bg-gray-50 p-3 text-sm">
                <p className="text-gray-600">
                  Last synced:{" "}
                  {hubspotConfig.last_synced_at
                    ? formatRelativeDate(hubspotConfig.last_synced_at)
                    : "Never"}
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Settings className="mr-2 h-4 w-4" />
                Configure
              </Button>
              {hubspotConfig?.is_active && (
                <Button variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Sync Now
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plug className="h-5 w-5" />
            Integration Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-600">
              Integration configuration is managed through environment variables
              and Supabase. Contact the development team to set up new
              integrations or modify existing credentials.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
