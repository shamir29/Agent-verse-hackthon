"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Sun, Zap, CheckCircle, RefreshCw, Settings2, Sliders } from "lucide-react";
import { SkeletonCard } from "@/components/ui/SkeletonCard";

export default function SolarOptimizationPage() {
  const queryClient = useQueryClient();

  const { data: solarArrays = [], isLoading } = useQuery<any[]>({
    queryKey: ["solarArrays"],
    queryFn: async () => (await fetch("/api/solar")).json(),
  });

  const updateTiltMutation = useMutation({
    mutationFn: async ({ id, tiltAngleDeg }: { id: string; tiltAngleDeg: number }) => {
      const res = await fetch(`/api/solar/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tiltAngleDeg }),
      });
      if (!res.ok) throw new Error("Failed to update tilt");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["solarArrays"] }),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
          <Sun className="w-6 h-6 text-amber-warning" /> Solar Grid Optimization Module
        </h1>
        <p className="text-sm text-text-secondary">
          Solar farm generation telemetry, automatic inverter MPPT tracking, and remote motorized tilt angle adjustment.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SkeletonCard height="h-44" />
          <SkeletonCard height="h-44" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {solarArrays.map((solar) => (
            <div key={solar.id} className="bg-surface border border-border rounded-card p-5 space-y-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-text-tertiary">{solar.zone} Zone</span>
                  <h3 className="text-base font-bold text-text-primary">{solar.name}</h3>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-emerald-bg text-emerald-good rounded-chip">
                  {solar.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-bg p-3 rounded-btn border border-border text-center font-mono-data">
                <div>
                  <span className="text-[10px] text-text-tertiary block">Capacity</span>
                  <span className="text-xs font-bold">{solar.capacityKw} kW</span>
                </div>
                <div>
                  <span className="text-[10px] text-text-tertiary block">Current Output</span>
                  <span className="text-xs font-bold text-amber-warning">{solar.generationKw} kW</span>
                </div>
                <div>
                  <span className="text-[10px] text-text-tertiary block">Efficiency</span>
                  <span className="text-xs font-bold text-emerald-good">{solar.efficiencyPercent}%</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-border">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-text-secondary flex items-center gap-1">
                    <Sliders className="w-3.5 h-3.5 text-primary" /> Motorized Tilt Angle
                  </span>
                  <span className="font-mono-data font-bold text-primary">{solar.tiltAngleDeg}° Angle</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="45"
                  value={solar.tiltAngleDeg}
                  onChange={(e) =>
                    updateTiltMutation.mutate({ id: solar.id, tiltAngleDeg: parseInt(e.target.value) })
                  }
                  className="w-full h-2 bg-bg rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
