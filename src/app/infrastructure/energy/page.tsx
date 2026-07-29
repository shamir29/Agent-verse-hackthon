"use client";

import React from "react";
import { Activity, Zap, TrendingDown, Building2, BarChart2 } from "lucide-react";
import { GridLoadChart } from "@/components/charts/GridLoadChart";

export default function EnergyMonitoringPage() {
  const demandProfile = [
    { time: "00:00", load: 42 },
    { time: "04:00", load: 38 },
    { time: "08:00", load: 74 },
    { time: "12:00", load: 96 },
    { time: "16:00", load: 91 },
    { time: "20:00", load: 83 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
          <Activity className="w-6 h-6 text-primary" /> Commercial Energy Monitoring & Peak Shaving
        </h1>
        <p className="text-sm text-text-secondary">
          Aggregated demand profile analysis, automated load shifting, and commercial building power factor telemetry.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-bold text-text-primary">Metropolitan Demand Profile (24-Hour Peak Load)</h3>
        <GridLoadChart data={demandProfile} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface border border-border rounded-card p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-text-secondary">Peak Demand Shaved</span>
            <TrendingDown className="w-4 h-4 text-emerald-good" />
          </div>
          <p className="text-2xl font-bold font-mono-data text-emerald-good">14.8 MW</p>
          <p className="text-[11px] text-text-tertiary">Automated commercial HVAC throttling</p>
        </div>

        <div className="bg-surface border border-border rounded-card p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-text-secondary">Avg Power Factor</span>
            <Zap className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-bold font-mono-data text-text-primary">0.98 Cos φ</p>
          <p className="text-[11px] text-text-tertiary">Optimal reactive power compensation</p>
        </div>

        <div className="bg-surface border border-border rounded-card p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-text-secondary">Commercial District Load</span>
            <Building2 className="w-4 h-4 text-amber-warning" />
          </div>
          <p className="text-2xl font-bold font-mono-data text-text-primary">88.4% Peak</p>
          <p className="text-[11px] text-text-tertiary">T. Nagar Commercial & IT Corridors</p>
        </div>
      </div>
    </div>
  );
}
