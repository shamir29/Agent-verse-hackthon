"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Cpu, CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react";
import { SkeletonCard } from "@/components/ui/SkeletonCard";

export default function IntegrationsAdminPage() {
  const { data: integrations = [], isLoading } = useQuery<any[]>({
    queryKey: ["integrations"],
    queryFn: async () => (await fetch("/api/admin/integrations")).json(),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
          <Cpu className="w-6 h-6 text-primary" /> SCADA & IoT System Integrations Gateway
        </h1>
        <p className="text-sm text-text-secondary">
          Monitor real-time status, latency, and synchronization health across municipal API gateways.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SkeletonCard height="h-32" />
          <SkeletonCard height="h-32" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map((ig) => (
            <div key={ig.id} className="bg-surface border border-border rounded-card p-5 space-y-3 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-text-tertiary uppercase">{ig.category}</span>
                  <h3 className="text-sm font-bold text-text-primary">{ig.name}</h3>
                </div>
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-chip ${
                    ig.status === "connected" ? "bg-emerald-bg text-emerald-good" : "bg-amber-bg text-amber-warning"
                  }`}
                >
                  {ig.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-mono-data pt-2 border-t border-border">
                <span className="text-text-secondary">Latency: <strong>{ig.latencyMs}ms</strong></span>
                <span className="text-text-tertiary">Last Sync: Live</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
