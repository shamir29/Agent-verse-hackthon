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

export default function MasterAlertsPage() {
  const queryClient = useQueryClient();
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [assigningAlert, setAssigningAlert] = useState<Alert | null>(null);
  const [teamNameInput, setTeamNameInput] = useState("");

  const {
    data: alerts = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<Alert[]>({
    queryKey: ["incidentsAlerts", selectedSeverity, selectedStatus, selectedCategory],
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
      queryClient.invalidateQueries({ queryKey: ["incidentsAlerts"] });
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
      queryClient.invalidateQueries({ queryKey: ["kpis"] });
      setAssigningAlert(null);
      setTeamNameInput("");
    },
  });

  const handleAssignSubmit = (e: React.FormEvent) => {
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
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
          <Bell className="w-6 h-6 text-primary" /> Master Incident Alerts Console
        </h1>
        <p className="text-sm text-text-secondary">
          Centralized triage, response unit dispatch, and resolution audit trail.
        </p>
      </div>

      {isError && <ErrorState title="Database Error" message="Failed to load alert records." onRetry={refetch} />}

      <div className="bg-surface border border-border rounded-card p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
          <Filter className="w-4 h-4 text-primary" /> Filter Alerts:
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-3 py-1.5 text-xs bg-bg border border-border rounded-btn text-text-primary font-medium"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 text-xs bg-bg border border-border rounded-btn text-text-primary font-medium"
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="assigned">Assigned</option>
            <option value="resolved">Resolved</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 text-xs bg-bg border border-border rounded-btn text-text-primary font-medium"
          >
            <option value="all">All Categories</option>
            <option value="power">Power</option>
            <option value="water">Water</option>
            <option value="air_quality">Air Quality</option>
            <option value="healthcare">Healthcare</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-card p-5 space-y-4 shadow-sm">
        {isLoading ? (
          <SkeletonTable rows={6} />
        ) : alerts.length === 0 ? (
          <EmptyState
            title="No Alerts Found"
            description="No system alerts match active search criteria."
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
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Team</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs">
                {alerts.map((a) => (
                  <tr key={a.id} className="hover:bg-bg/60">
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-chip text-[11px] font-bold capitalize ${
                          a.severity === "critical"
                            ? "bg-red-bg text-red-critical"
                            : a.severity === "high"
                            ? "bg-amber-bg text-amber-warning"
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {a.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-text-primary">{a.title}</td>
                    <td className="py-3 px-4 text-text-secondary">{a.location}</td>
                    <td className="py-3 px-4 capitalize font-semibold">{a.status}</td>
                    <td className="py-3 px-4 text-text-secondary font-mono-data text-[11px]">{a.assignedTeam || "Unassigned"}</td>
                    <td className="py-3 px-4 text-right space-x-2">
                      {a.status !== "resolved" && (
                        <>
                          <button
                            onClick={() => {
                              setAssigningAlert(a);
                              setTeamNameInput(a.assignedTeam || "Rapid Dispatch Unit");
                            }}
                            className="px-2.5 py-1 bg-bg border border-border text-xs font-medium rounded-btn hover:bg-surface"
                          >
                            Assign
                          </button>
                          <button
                            onClick={() => updateAlertMutation.mutate({ alertId: a.id, status: "resolved" })}
                            disabled={updateAlertMutation.isPending}
                            className="px-2.5 py-1 bg-emerald-good text-white text-xs font-semibold rounded-btn hover:bg-emerald-good/90"
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

      {assigningAlert && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-card max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-border pb-2">
              <h3 className="text-sm font-bold">Assign Response Unit</h3>
              <button onClick={() => setAssigningAlert(null)}><X className="w-4 h-4 text-text-tertiary" /></button>
            </div>
            <form onSubmit={handleAssignSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold block mb-1">Team Name</label>
                <input
                  type="text"
                  value={teamNameInput}
                  onChange={(e) => setTeamNameInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-bg border border-border rounded-btn"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setAssigningAlert(null)} className="px-3 py-1.5 text-xs bg-bg rounded-btn">Cancel</button>
                <button type="submit" className="px-4 py-1.5 text-xs bg-primary text-white font-semibold rounded-btn">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
