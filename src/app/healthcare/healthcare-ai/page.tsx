"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { HeartPulse, Activity, AlertTriangle, ShieldCheck } from "lucide-react";
import { SkeletonCard } from "@/components/ui/SkeletonCard";

export default function HealthcareAIPage() {
  const { data: hospitals = [], isLoading } = useQuery<any[]>({
    queryKey: ["hospitals"],
    queryFn: async () => (await fetch("/api/healthcare")).json(),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
          <HeartPulse className="w-6 h-6 text-red-critical" /> Healthcare AI & Emergency Dispatch Triage
        </h1>
        <p className="text-sm text-text-secondary">
          Real-time hospital ICU bed capacity, emergency room queues, and AI ambulance route optimization.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SkeletonCard height="h-40" />
          <SkeletonCard height="h-40" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {hospitals.map((h) => (
            <div key={h.id} className="bg-surface border border-border rounded-card p-5 space-y-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-text-primary">{h.name}</h3>
                  <span className="text-xs text-text-secondary">{h.location}</span>
                </div>
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-chip ${
                    h.status === "critical" ? "bg-red-bg text-red-critical" : "bg-emerald-bg text-emerald-good"
                  }`}
                >
                  {h.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-bg p-3 rounded-btn border border-border text-center font-mono-data">
                <div>
                  <span className="text-[10px] text-text-tertiary block">Total Beds</span>
                  <span className="text-xs font-bold">{h.totalBeds}</span>
                </div>
                <div>
                  <span className="text-[10px] text-text-tertiary block">ER Queue</span>
                  <span className="text-xs font-bold text-red-critical">{h.emergencyQueue} Waiting</span>
                </div>
                <div>
                  <span className="text-[10px] text-text-tertiary block">ICU Available</span>
                  <span className="text-xs font-bold text-emerald-good">{h.icuAvailable} Beds</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
