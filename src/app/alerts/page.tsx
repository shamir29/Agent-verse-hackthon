"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Bell, Filter, CheckCircle2, UserCheck, ShieldAlert, RefreshCw, X } from "lucide-react";
import { SkeletonTable } from "@/components/ui/SkeletonCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";

interface Alert {
  id: string;
  title: string;
  category: string;
  severity: string;
  status: string;
  location: string;
  assignedTeam: string | null;
  createdAt: string;
  resolvedAt: string | null;
}

export default function AlertsLogPage() {
  const queryClient = useQueryClient();
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [assigningAlert, setAssigningAlert] = useState<Alert | null>(null);
  const [teamNameInput, setTeamNameInput] = useState("");

  // Fetch Alerts from API
  const {
    data: alerts = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<Alert[]>({
    queryKey: ["alertsLog", selectedSeverity, selectedStatus, selectedCategory],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedSeverity !== "all") params.append("severity", selectedSeverity);
      if (selectedStatus !== "all") params.append("status", selectedStatus);
      if (selectedCategory !== "all") params.append("category", selectedCategory);

      const res = await fetch(`/api/alerts?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load alerts log");
      return res.json();
    },
  });

  // Mutation to Assign or Resolve Alert
  const updateAlertMutation = useMutation({
    mutationFn: async ({ alertId, status, assignedTeam }: { alertId: string; status: string; assignedTeam?: string }) => {
      const res = await fetch(`/api/alerts/${alertId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, assignedTeam }),
      });
      if (!res.ok) throw new Error("Failed to update alert");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alertsLog"] });
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
      queryClient.invalidateQueries({ queryKey: ["kpis"] });
      setAssigningAlert(null);
      setTeamNameInput("");
    },
  });

  const handleAssignTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assigningAlert || !teamNameInput.trim()) return;

    updateAlertMutation.mutate({
      alertId: assigningAlert.id,
      status: "assigned",
      assignedTeam: teamNameInput.trim(),
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
            <Bell className="w-6 h-6 text-primary" /> Master Incident & Alerts Operations Log
          </h1>
          <p className="text-sm text-text-secondary">
            Cross-modular alert logging, team assignment, and audit resolution workflow.
          </p>
        </div>
      </div>

      {/* Error state */}
      {isError && (
        <ErrorState
          title="Alert Database Connection Error"
          message="Failed to retrieve master alert log entries from local SQLite."
          onRetry={refetch}
        />
      )}

      {/* Filtering Bar */}
      <div className="bg-surface border border-border rounded-card p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
          <Filter className="w-4 h-4 text-primary" /> Filter Alert Log:
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Severity Filter */}
          <div className="flex items-center gap-1.5 text-xs text-text-secondary">
            <span>Severity:</span>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="px-3 py-1.5 text-xs bg-bg border border-border rounded-btn focus:outline-none focus:border-primary text-text-primary font-medium"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs text-text-secondary">
            <span>Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1.5 text-xs bg-bg border border-border rounded-btn focus:outline-none focus:border-primary text-text-primary font-medium"
            >
              <option value="all">All Statuses</option>
              <option value="open">Open</option>
              <option value="assigned">Assigned</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 text-xs text-text-secondary">
            <span>Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 text-xs bg-bg border border-border rounded-btn focus:outline-none focus:border-primary text-text-primary font-medium"
            >
              <option value="all">All Categories</option>
              <option value="power">Power</option>
              <option value="water">Water</option>
              <option value="air_quality">Air Quality</option>
              <option value="healthcare">Healthcare</option>
              <option value="maintenance">Maintenance</option>
              <option value="weather">Weather</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alerts Table */}
      <div className="bg-surface border border-border rounded-card p-5 space-y-4 shadow-sm">
        {isLoading ? (
          <SkeletonTable rows={8} />
        ) : alerts.length === 0 ? (
          <EmptyState
            title="No Alerts Found"
            description="No system alerts match the active severity, status, or category filters."
            onResetFilters={() => {
              setSelectedSeverity("all");
              setSelectedStatus("all");
              setSelectedCategory("all");
            }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-[11px] font-semibold uppercase text-text-tertiary bg-bg/50">
                  <th className="py-3 px-4">Severity</th>
                  <th className="py-3 px-4">Alert Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Assigned Team</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs text-text-primary">
                {alerts.map((alert) => (
                  <tr key={alert.id} className="hover:bg-bg/60 transition-colors">
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-chip text-[11px] font-bold capitalize ${
                          alert.severity === "critical"
                            ? "bg-red-bg text-red-critical border border-red-critical/20"
                            : alert.severity === "high"
                            ? "bg-amber-bg text-amber-warning border border-amber-warning/20"
                            : alert.severity === "medium"
                            ? "bg-blue-50 text-blue-600 border border-blue-200"
                            : "bg-gray-100 text-text-secondary"
                        }`}
                      >
                        {alert.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-text-primary">{alert.title}</td>
                    <td className="py-3 px-4 capitalize text-text-secondary">{alert.category.replace("_", " ")}</td>
                    <td className="py-3 px-4 text-text-secondary">{alert.location}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 font-semibold text-[11px] ${
                          alert.status === "resolved"
                            ? "text-emerald-good"
                            : alert.status === "assigned"
                            ? "text-primary"
                            : "text-amber-warning"
                        }`}
                      >
                        {alert.status === "resolved" ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : alert.status === "assigned" ? (
                          <UserCheck className="w-3.5 h-3.5" />
                        ) : (
                          <ShieldAlert className="w-3.5 h-3.5" />
                        )}
                        {alert.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-text-secondary font-mono-data text-[11px]">
                      {alert.assignedTeam || <span className="text-text-tertiary italic">Unassigned</span>}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      {alert.status !== "resolved" && (
                        <>
                          <button
                            onClick={() => {
                              setAssigningAlert(alert);
                              setTeamNameInput(alert.assignedTeam || "Grid Maintenance Response Unit");
                            }}
                            className="px-2.5 py-1 bg-bg border border-border hover:border-primary/40 text-text-primary text-xs font-medium rounded-btn transition-colors"
                          >
                            Assign Team
                          </button>
                          <button
                            onClick={() =>
                              updateAlertMutation.mutate({
                                alertId: alert.id,
                                status: "resolved",
                              })
                            }
                            disabled={updateAlertMutation.isPending}
                            className="px-2.5 py-1 bg-emerald-good text-white text-xs font-semibold rounded-btn hover:bg-emerald-good/90 transition-colors"
                          >
                            Resolve
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Assign Team Modal Dialog */}
      {assigningAlert && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-card max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b border-border pb-3">
              <div>
                <h3 className="text-sm font-bold text-text-primary">Assign Response Unit</h3>
                <p className="text-xs text-text-secondary">{assigningAlert.title}</p>
              </div>
              <button
                onClick={() => setAssigningAlert(null)}
                className="text-text-tertiary hover:text-text-primary p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAssignTeamSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-text-primary block mb-1">
                  Response Team Name
                </label>
                <input
                  type="text"
                  value={teamNameInput}
                  onChange={(e) => setTeamNameInput(e.target.value)}
                  placeholder="e.g. Rapid Electrical Response 1"
                  required
                  className="w-full px-3 py-2 text-xs bg-bg border border-border rounded-btn focus:outline-none focus:border-primary text-text-primary"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAssigningAlert(null)}
                  className="px-3 py-1.5 bg-bg text-text-secondary text-xs font-medium rounded-btn hover:bg-border/60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateAlertMutation.isPending}
                  className="px-4 py-1.5 bg-primary text-white text-xs font-semibold rounded-btn hover:bg-primary-hover transition-colors inline-flex items-center gap-1"
                >
                  {updateAlertMutation.isPending && <RefreshCw className="w-3 h-3 animate-spin" />}
                  Save Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
