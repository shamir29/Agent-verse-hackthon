"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Car, Zap, BatteryCharging, CheckCircle2 } from "lucide-react";
import { SkeletonCard } from "@/components/ui/SkeletonCard";

export default function EVChargingPage() {
  const { data: stations = [], isLoading } = useQuery<any[]>({
    queryKey: ["evStations"],
    queryFn: async () => (await fetch("/api/ev-charging")).json(),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
          <Car className="w-6 h-6 text-primary" /> EV Charging Infrastructure & Grid Balancing
        </h1>
        <p className="text-sm text-text-secondary">
          Fast-charging hub availability, high-power DC fast charge status, and feeder load balancing.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SkeletonCard height="h-36" />
          <SkeletonCard height="h-36" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stations.map((st) => (
            <div key={st.id} className="bg-surface border border-border rounded-card p-5 space-y-3 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-text-primary">{st.name}</h3>
                  <span className="text-xs text-text-secondary">{st.location}</span>
                </div>
                <div className="p-2 bg-blue-50 text-primary rounded-btn">
                  <BatteryCharging className="w-4 h-4" />
                </div>
              </div>

              <div className="flex justify-between items-center bg-bg p-3 rounded-btn border border-border text-xs">
                <span className="text-text-secondary">Available Ports</span>
                <span className="font-mono-data font-bold text-primary">
                  {st.chargersAvailable} / {st.totalChargers} Free
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-text-tertiary font-mono-data pt-1">
                <span>Power Rate: {st.powerKw} kW</span>
                <span className="text-emerald-good font-semibold capitalize">{st.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
