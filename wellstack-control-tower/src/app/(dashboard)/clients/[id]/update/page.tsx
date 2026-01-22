"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { HealthBadge } from "@/components/portfolio/health-badge";
import { getWeekStartDate, formatDate } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import type { HealthStatus } from "@/types";

interface Props {
  params: Promise<{ id: string }>;
}

export default function WeeklyUpdatePage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const supabase = createClient();

  const [clientName, setClientName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [existingUpdateId, setExistingUpdateId] = useState<string | null>(null);

  // Form state
  const [overallHealth, setOverallHealth] = useState<HealthStatus>("green");
  const [healthRationale, setHealthRationale] = useState("");
  const [summary, setSummary] = useState("");
  const [wins, setWins] = useState("");
  const [blockers, setBlockers] = useState("");
  const [nextSteps, setNextSteps] = useState("");

  const weekStartDate = getWeekStartDate();
  const weekStartDateStr = weekStartDate.toISOString().split("T")[0];

  // Validation
  const requiresRationale = overallHealth === "yellow" || overallHealth === "red";
  const isValid =
    summary.trim().length > 0 &&
    (!requiresRationale || healthRationale.trim().length > 0);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);

      // Get client name
      const { data: client } = await supabase
        .from("clients")
        .select("name")
        .eq("id", id)
        .single();

      const typedClient = client as { name: string } | null;
      if (typedClient) {
        setClientName(typedClient.name);
      }

      // Check for existing update this week
      const { data: existingUpdate } = await supabase
        .from("weekly_updates")
        .select("*")
        .eq("client_id", id)
        .eq("week_start_date", weekStartDateStr)
        .single();

      interface ExistingUpdateData {
        id: string;
        overall_health: string;
        health_rationale: string | null;
        summary: string;
        wins: string | null;
        blockers: string | null;
        next_steps: string | null;
      }

      const typedUpdate = existingUpdate as ExistingUpdateData | null;
      if (typedUpdate) {
        setExistingUpdateId(typedUpdate.id);
        setOverallHealth(typedUpdate.overall_health as HealthStatus);
        setHealthRationale(typedUpdate.health_rationale || "");
        setSummary(typedUpdate.summary);
        setWins(typedUpdate.wins || "");
        setBlockers(typedUpdate.blockers || "");
        setNextSteps(typedUpdate.next_steps || "");
      }

      setIsLoading(false);
    }

    loadData();
  }, [id, supabase, weekStartDateStr]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) return;

    setIsSaving(true);
    setError(null);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("You must be logged in to submit an update.");
        return;
      }

      const updateData = {
        client_id: id,
        week_start_date: weekStartDateStr,
        overall_health: overallHealth,
        health_rationale: requiresRationale ? healthRationale : null,
        summary,
        wins: wins || null,
        blockers: blockers || null,
        next_steps: nextSteps || null,
        created_by: user.id,
        updated_at: new Date().toISOString(),
      };

      if (existingUpdateId) {
        // Update existing
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error: updateError } = await (supabase as any)
          .from("weekly_updates")
          .update(updateData)
          .eq("id", existingUpdateId);

        if (updateError) throw updateError;
      } else {
        // Insert new
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error: insertError } = await (supabase as any)
          .from("weekly_updates")
          .insert(updateData);

        if (insertError) throw insertError;
      }

      router.push(`/clients/${id}`);
      router.refresh();
    } catch (err) {
      console.error("Error saving update:", err);
      setError("Failed to save update. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href={`/clients/${id}`}>
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Weekly Update: {clientName}
          </h1>
          <p className="text-gray-500">Week of {formatDate(weekStartDate)}</p>
        </div>
      </div>

      {existingUpdateId && (
        <div className="rounded-md bg-blue-50 p-4">
          <p className="text-sm text-blue-700">
            You are editing an existing update for this week.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Health Status</CardTitle>
            <CardDescription>
              How is the client relationship this week?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              {(["green", "yellow", "red"] as HealthStatus[]).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setOverallHealth(status)}
                  className={`flex-1 rounded-lg border-2 p-4 transition-all ${
                    overallHealth === status
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <HealthBadge status={status} size="lg" />
                </button>
              ))}
            </div>

            {requiresRationale && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Rationale <span className="text-red-500">*</span>
                </label>
                <Textarea
                  value={healthRationale}
                  onChange={(e) => setHealthRationale(e.target.value)}
                  placeholder="Explain why the health status is Yellow or Red..."
                  className="min-h-[100px]"
                  error={
                    requiresRationale && !healthRationale.trim()
                      ? "Rationale is required for Yellow/Red status"
                      : undefined
                  }
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Update Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Summary <span className="text-red-500">*</span>
              </label>
              <Textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Brief summary of the week's activities and status..."
                className="min-h-[120px]"
                error={!summary.trim() ? "Summary is required" : undefined}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Wins</label>
              <Textarea
                value={wins}
                onChange={(e) => setWins(e.target.value)}
                placeholder="Achievements and positive outcomes this week..."
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Blockers
              </label>
              <Textarea
                value={blockers}
                onChange={(e) => setBlockers(e.target.value)}
                placeholder="Issues or obstacles preventing progress..."
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Next Steps
              </label>
              <Textarea
                value={nextSteps}
                onChange={(e) => setNextSteps(e.target.value)}
                placeholder="Planned actions for the coming week..."
                className="min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>

        {error && (
          <div className="mt-4 rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-4">
          <Button asChild variant="outline">
            <Link href={`/clients/${id}`}>Cancel</Link>
          </Button>
          <Button type="submit" disabled={!isValid || isSaving} isLoading={isSaving}>
            {existingUpdateId ? "Update" : "Submit"} Weekly Update
          </Button>
        </div>
      </form>
    </div>
  );
}
