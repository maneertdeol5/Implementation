import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HealthBadge } from "@/components/portfolio/health-badge";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Definitions",
};

export default function DefinitionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Definitions</h1>
        <p className="text-gray-500">Reference guide for health statuses and key terms</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Health Status Definitions */}
        <Card>
          <CardHeader>
            <CardTitle>Health Status (RYG)</CardTitle>
            <CardDescription>
              Client health indicators based on overall engagement status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <div className="flex items-center gap-3 mb-2">
                <HealthBadge status="green" size="lg" />
              </div>
              <p className="text-sm text-gray-700">
                <strong>Green</strong> indicates the client relationship is healthy and on track.
                All deliverables are proceeding as planned, communication is regular and positive,
                and there are no significant concerns.
              </p>
              <ul className="mt-2 text-sm text-gray-600 list-disc list-inside space-y-1">
                <li>On-time delivery of milestones</li>
                <li>Positive stakeholder feedback</li>
                <li>No outstanding escalations</li>
                <li>Regular engagement cadence maintained</li>
              </ul>
            </div>

            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <div className="flex items-center gap-3 mb-2">
                <HealthBadge status="yellow" size="lg" />
              </div>
              <p className="text-sm text-gray-700">
                <strong>Yellow</strong> indicates there are concerns that need attention but are manageable.
                Issues exist but have mitigation plans in place.
              </p>
              <ul className="mt-2 text-sm text-gray-600 list-disc list-inside space-y-1">
                <li>Minor delays in deliverables</li>
                <li>Stakeholder concerns raised but being addressed</li>
                <li>Resource constraints affecting timeline</li>
                <li>Requires increased attention and communication</li>
              </ul>
              <p className="mt-2 text-sm font-medium text-yellow-700">
                * Rationale required when selecting this status
              </p>
            </div>

            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <div className="flex items-center gap-3 mb-2">
                <HealthBadge status="red" size="lg" />
              </div>
              <p className="text-sm text-gray-700">
                <strong>Red</strong> indicates critical issues requiring immediate executive attention.
                The relationship or project is at significant risk.
              </p>
              <ul className="mt-2 text-sm text-gray-600 list-disc list-inside space-y-1">
                <li>Significant delivery failures</li>
                <li>Client escalation to executive level</li>
                <li>Contract or renewal at risk</li>
                <li>Critical resource or technical blockers</li>
              </ul>
              <p className="mt-2 text-sm font-medium text-red-700">
                * Rationale required when selecting this status
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Status Indicators */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Stale Indicator</CardTitle>
              <CardDescription>When updates are overdue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="warning">Stale</Badge>
                <span className="text-sm text-gray-500">appears after 7+ days without update</span>
              </div>
              <p className="text-sm text-gray-700">
                Clients are flagged as &quot;stale&quot; when no weekly update has been submitted
                for more than 7 days. This ensures regular monitoring and communication
                with all active clients.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Renewal Warning</CardTitle>
              <CardDescription>Contract renewal approaching</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="warning">Renewal Soon</Badge>
                <span className="text-sm text-gray-500">appears within 90 days of renewal</span>
              </div>
              <p className="text-sm text-gray-700">
                Clients with contract renewal dates within 90 days are highlighted
                to ensure adequate time for renewal discussions and planning.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Initiative Status</CardTitle>
              <CardDescription>Tracking project progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-3">
                <Badge variant="secondary">Not Started</Badge>
                <span className="text-sm text-gray-600">Initiative is planned but not yet begun</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="default">In Progress</Badge>
                <span className="text-sm text-gray-600">Work is actively underway</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="success">Completed</Badge>
                <span className="text-sm text-gray-600">Initiative has been delivered</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="warning">On Hold</Badge>
                <span className="text-sm text-gray-600">Temporarily paused</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Risk Severity</CardTitle>
              <CardDescription>Categorizing potential issues</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-3">
                <Badge variant="secondary">Low</Badge>
                <span className="text-sm text-gray-600">Minor impact, easily mitigated</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="warning">Medium</Badge>
                <span className="text-sm text-gray-600">Moderate impact, needs attention</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="destructive">High</Badge>
                <span className="text-sm text-gray-600">Significant impact, priority resolution</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="destructive">Critical</Badge>
                <span className="text-sm text-gray-600">Severe impact, immediate action required</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
