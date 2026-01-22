import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GitBranch, Link as LinkIcon, Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Mapping",
};

interface ClientMapping {
  id: string;
  name: string;
  hubspot_company_id: string | null;
  status: string;
}

async function getClientsWithMappings(): Promise<ClientMapping[]> {
  const supabase = await createClient();

  const { data: clients } = await supabase
    .from("clients")
    .select("id, name, hubspot_company_id, status")
    .eq("status", "active")
    .order("name");

  return (clients as ClientMapping[]) || [];
}

export default async function MappingPage() {
  const clients = await getClientsWithMappings();

  const mappedClients = clients.filter((c) => c.hubspot_company_id);
  const unmappedClients = clients.filter((c) => !c.hubspot_company_id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Client Mapping</h1>
        <p className="text-gray-500">
          Map clients to external system IDs (HubSpot, Jira)
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{clients.length}</div>
            <p className="text-sm text-gray-500">Total Clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {mappedClients.length}
            </div>
            <p className="text-sm text-gray-500">Mapped to HubSpot</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-orange-600">
              {unmappedClients.length}
            </div>
            <p className="text-sm text-gray-500">Unmapped</p>
          </CardContent>
        </Card>
      </div>

      {/* Unmapped Clients */}
      {unmappedClients.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-orange-500" />
              Unmapped Clients
            </CardTitle>
            <CardDescription>
              These clients need to be linked to external systems
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {unmappedClients.map((client) => (
                <div
                  key={client.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <span className="font-medium">{client.name}</span>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Mapping
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mapped Clients */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5 text-green-500" />
            Mapped Clients
          </CardTitle>
          <CardDescription>
            Clients linked to external system IDs
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mappedClients.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No clients have been mapped to external systems yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 text-left text-sm font-medium text-gray-500">
                      Client
                    </th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-500">
                      HubSpot ID
                    </th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-500">
                      Status
                    </th>
                    <th className="pb-3 text-right text-sm font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {mappedClients.map((client) => (
                    <tr key={client.id}>
                      <td className="py-3 font-medium">{client.name}</td>
                      <td className="py-3">
                        <code className="rounded bg-gray-100 px-2 py-1 text-sm">
                          {client.hubspot_company_id}
                        </code>
                      </td>
                      <td className="py-3">
                        <Badge variant="success">Mapped</Badge>
                      </td>
                      <td className="py-3 text-right">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Help Card */}
      <Card>
        <CardHeader>
          <CardTitle>About Mapping</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm text-gray-600">
            <p>
              Client mapping connects your internal client records to external
              system identifiers. This enables:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Automatic data syncing from HubSpot (company info, contacts)</li>
              <li>Jira project rollups and issue tracking</li>
              <li>Cross-system reporting and analytics</li>
            </ul>
            <p className="mt-4">
              To map a client, you&apos;ll need the external system ID (e.g.,
              HubSpot Company ID) which can be found in the URL or settings of
              the external system.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
