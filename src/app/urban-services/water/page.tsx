"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Droplets, CheckCircle, AlertTriangle, RefreshCw, ShieldCheck, Waves } from "lucide-react";
import { SkeletonCard, SkeletonTable } from "@/components/ui/SkeletonCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";

interface Reservoir {
  id: string;
  name: string;
  levelPercent: number;
  capacityMl: number;
  lat: number;
  lng: number;
  updatedAt: string;
}

interface Alert {
  id: string;
  title: string;
  category: string;
  severity: string;
  status: string;
  location: string;
  assignedTeam: string | null;
  createdAt: string;
}

export default function WaterServicesPage() {
  const queryClient = useQueryClient();

  // Fetch Reservoirs
  const {
    data: reservoirs = [],
    isLoading: isReservoirsLoading,
    isError: isReservoirsError,
    refetch: refetchReservoirs,
  } = useQuery<Reservoir[]>({
    queryKey: ["reservoirs"],
    queryFn: async () => {
      const res = await fetch("/api/reservoirs");
      if (!res.ok) throw new Error("Failed to load reservoirs");
      return res.json();
    },
  });

  // Fetch Water Leak Alerts
  const {
    data: waterAlerts = [],
    isLoading: isAlertsLoading,
    isError: isAlertsError,
    refetch: refetchAlerts,
  } = useQuery<Alert[]>({
    queryKey: ["waterAlerts"],
    queryFn: async () => {
      const res = await fetch("/api/alerts?category=water");
      if (!res.ok) throw new Error("Failed to load water alerts");
      return res.json();
    },
  });

  // Mutation to Resolve Leak Alert
  const resolveAlertMutation = useMutation({
    mutationFn: async (alertId: string) => {
      const res = await fetch(`/api/alerts/${alertId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "resolved" }),
      });
      if (!res.ok) throw new Error("Failed to resolve alert");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["waterAlerts"] });
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
      queryClient.invalidateQueries({ queryKey: ["kpis"] });
    },
  });

  const isGlobalError = isReservoirsError || isAlertsError;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
            <Droplets className="w-6 h-6 text-blue-600" /> Water Services & Reservoir Management
          </h1>
          <p className="text-sm text-text-secondary">
            Monitoring city water supply basins, distribution pressure, and real-time leak resolution.
          </p>
        </div>
      </div>

      {/* Error state */}
      {isGlobalError && (
        <ErrorState
          title="Water Network Connection Error"
          message="Failed to synchronize water basin levels and leak incident alerts."
          onRetry={() => {
            refetchReservoirs();
            refetchAlerts();
          }}
        />
      )}

      {/* Reservoir Storage Overview */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
          <Waves className="w-4 h-4 text-blue-600" /> City Reservoir Storage Basins
        </h2>

        {isReservoirsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} height="h-36" />
            ))}
          </div>
        ) : reservoirs.length === 0 ? (
          <EmptyState title="No Reservoirs Registered" description="No active water reservoirs found in the database." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reservoirs.map((res) => (
              <div
                key={res.id}
                className="bg-surface border border-border rounded-card p-5 shadow-sm space-y-3 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-text-primary">{res.name}</h3>
                    <span className="text-xs text-text-secondary font-mono-data">Capacity: {res.capacityMl.toLocaleString()} ML</span>
                  </div>
                  <div className="p-2 rounded-btn bg-blue-50 text-blue-600">
                    <Droplets className="w-4 h-4" />
                  </div>
                </div>

                {/* Level Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-text-secondary">Water Level</span>
                    <span
                      className={`font-mono-data ${
                        res.levelPercent < 50 ? "text-amber-warning" : "text-blue-600"
                      }`}
                    >
                      {res.levelPercent}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-bg rounded-full overflow-hidden p-0.5 border border-border">
                    <div
                      style={{ width: `${res.levelPercent}%` }}
                      className={`h-full rounded-full transition-all ${
                        res.levelPercent < 40
                          ? "bg-red-critical"
                          : res.levelPercent < 60
                          ? "bg-amber-warning"
                          : "bg-blue-600"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Active Water & Leak Alerts Table with Working Resolve Action */}
      <div className="bg-surface border border-border rounded-card p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-warning" /> Water Network Leak & Pressure Incident Alerts
            </h2>
            <p className="text-xs text-text-secondary">
              Directly dispatch and resolve leak tickets. Resolving will persist changes to SQLite.
            </p>
          </div>
          <span className="text-xs font-mono-data font-semibold px-2.5 py-1 bg-bg border border-border rounded-chip">
            {waterAlerts.filter((a) => a.status !== "resolved").length} Open Leaks
          </span>
        </div>

        {isAlertsLoading ? (
          <SkeletonTable rows={4} />
        ) : waterAlerts.length === 0 ? (
          <EmptyState title="No Water Alerts Logged" description="No active or historical water leak incidents found." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-[11px] font-semibold uppercase text-text-tertiary bg-bg/50">
                  <th className="py-3 px-4">Leak Title</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Severity</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs text-text-primary">
                {waterAlerts.map((alert) => (
                  <tr key={alert.id} className="hover:bg-bg/60 transition-colors">
                    <td className="py-3 px-4 font-semibold text-text-primary">{alert.title}</td>
                    <td className="py-3 px-4 text-text-secondary">{alert.location}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-chip text-[11px] font-bold capitalize ${
                          alert.severity === "critical"
                            ? "bg-red-bg text-red-critical"
                            : alert.severity === "high"
                            ? "bg-amber-bg text-amber-warning"
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {alert.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 font-semibold text-[11px] ${
                          alert.status === "resolved" ? "text-emerald-good" : "text-amber-warning"
                        }`}
                      >
                        {alert.status === "resolved" ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                        {alert.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {alert.status !== "resolved" ? (
                        <button
                          onClick={() => resolveAlertMutation.mutate(alert.id)}
                          disabled={resolveAlertMutation.isPending}
                          className="px-3 py-1 bg-emerald-good text-white text-xs font-semibold rounded-btn hover:bg-emerald-good/90 disabled:opacity-50 transition-colors inline-flex items-center gap-1"
                        >
                          {resolveAlertMutation.isPending ? (
                            <RefreshCw className="w-3 h-3 animate-spin" />
                          ) : (
                            <ShieldCheck className="w-3.5 h-3.5" />
                          )}
                          Resolve Leak
                        </button>
                      ) : (
                        <span className="text-[11px] text-text-tertiary italic">Resolved</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
