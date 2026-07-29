"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, AlertTriangle, CheckCircle2, Truck, RefreshCw } from "lucide-react";
import { SkeletonCard } from "@/components/ui/SkeletonCard";

export default function WasteManagementPage() {
  const queryClient = useQueryClient();

  const { data: wasteZones = [], isLoading } = useQuery<any[]>({
    queryKey: ["wasteZones"],
    queryFn: async () => (await fetch("/api/waste")).json(),
  });

  const dispatchTruckMutation = useMutation({
    mutationFn: async (zoneId: string) => {
      const res = await fetch(`/api/waste/${zoneId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fillLevelPercent: 12.0, status: "normal" }),
      });
      if (!res.ok) throw new Error("Failed to dispatch truck");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wasteZones"] }),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
          <Trash2 className="w-6 h-6 text-emerald-good" /> Smart Waste Management & Route Optimization
        </h1>
        <p className="text-sm text-text-secondary">
          Ultrasonic bin fill sensor mesh monitoring with automated municipal collection truck dispatch.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SkeletonCard height="h-36" />
          <SkeletonCard height="h-36" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wasteZones.map((zone) => (
            <div key={zone.id} className="bg-surface border border-border rounded-card p-5 space-y-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-text-primary">{zone.zoneName}</h3>
                  <span className="text-xs text-text-secondary font-mono-data">{zone.binCount} Smart Bins Deployed</span>
                </div>
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-chip ${
                    zone.fillLevelPercent >= 80 ? "bg-red-bg text-red-critical" : "bg-emerald-bg text-emerald-good"
                  }`}
                >
                  {zone.fillLevelPercent >= 80 ? "Overflow Risk" : "Normal"}
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-text-secondary">Average Fill Level</span>
                  <span className="font-mono-data">{zone.fillLevelPercent}%</span>
                </div>
                <div className="w-full h-3 bg-bg rounded-full overflow-hidden p-0.5 border border-border">
                  <div
                    style={{ width: `${zone.fillLevelPercent}%` }}
                    className={`h-full rounded-full ${
                      zone.fillLevelPercent >= 85
                        ? "bg-red-critical"
                        : zone.fillLevelPercent >= 70
                        ? "bg-amber-warning"
                        : "bg-emerald-good"
                    }`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-[11px] text-text-tertiary">
                  Last Collection: {new Date(zone.lastCollected).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <button
                  onClick={() => dispatchTruckMutation.mutate(zone.id)}
                  disabled={dispatchTruckMutation.isPending}
                  className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-btn hover:bg-primary-hover transition-colors inline-flex items-center gap-1"
                >
                  {dispatchTruckMutation.isPending ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Truck className="w-3.5 h-3.5" />}
                  Dispatch Truck
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
