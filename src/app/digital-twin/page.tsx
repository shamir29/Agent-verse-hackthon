"use client";

import React, { useState } from "react";
import { Globe, Layers, Activity, Zap, Droplets, Sun, Radio, ShieldCheck } from "lucide-react";
import { CityMap } from "@/components/map/CityMap";
import { useQuery } from "@tanstack/react-query";

export default function DigitalTwinPage() {
  const [activeLayer, setActiveLayer] = useState<"all" | "power" | "water">("all");

  const { data: substations = [] } = useQuery<any[]>({
    queryKey: ["twinSubstations"],
    queryFn: async () => (await fetch("/api/substations")).json(),
  });

  const { data: reservoirs = [] } = useQuery<any[]>({
    queryKey: ["twinReservoirs"],
    queryFn: async () => (await fetch("/api/reservoirs")).json(),
  });

  const markers = [
    ...(activeLayer === "all" || activeLayer === "power"
      ? substations.map((s) => ({ id: s.id, name: s.name, type: "substation" as const, status: s.status, loadPercent: s.loadPercent, lat: s.lat, lng: s.lng, zone: s.zone }))
      : []),
    ...(activeLayer === "all" || activeLayer === "water"
      ? reservoirs.map((r) => ({ id: r.id, name: r.name, type: "reservoir" as const, levelPercent: r.levelPercent, lat: r.lat, lng: r.lng }))
      : []),
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
            <Globe className="w-6 h-6 text-primary" /> Urban Digital Twin Topology Workspace
          </h1>
          <p className="text-sm text-text-secondary">
            Multi-layered spatial digital twin rendering power substations, water basins, and IoT sensors.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-surface p-1 rounded-btn border border-border">
          <button
            onClick={() => setActiveLayer("all")}
            className={`px-3 py-1 text-xs font-semibold rounded-chip ${activeLayer === "all" ? "bg-primary text-white" : "text-text-secondary"}`}
          >
            All Layers
          </button>
          <button
            onClick={() => setActiveLayer("power")}
            className={`px-3 py-1 text-xs font-semibold rounded-chip ${activeLayer === "power" ? "bg-primary text-white" : "text-text-secondary"}`}
          >
            Power Grid
          </button>
          <button
            onClick={() => setActiveLayer("water")}
            className={`px-3 py-1 text-xs font-semibold rounded-chip ${activeLayer === "water" ? "bg-primary text-white" : "text-text-secondary"}`}
          >
            Water Mesh
          </button>
        </div>
      </div>

      <CityMap markers={markers} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface border border-border rounded-card p-4 space-y-2">
          <span className="text-xs font-bold text-text-tertiary uppercase">Active Plotted Nodes</span>
          <p className="text-2xl font-bold font-mono-data text-text-primary">{markers.length} Nodes</p>
        </div>
        <div className="bg-surface border border-border rounded-card p-4 space-y-2">
          <span className="text-xs font-bold text-text-tertiary uppercase">Spatial Precision</span>
          <p className="text-2xl font-bold font-mono-data text-emerald-good">Sub-meter 10cm</p>
        </div>
        <div className="bg-surface border border-border rounded-card p-4 space-y-2">
          <span className="text-xs font-bold text-text-tertiary uppercase">Telemetry Latency</span>
          <p className="text-2xl font-bold font-mono-data text-primary">14ms Live</p>
        </div>
      </div>
    </div>
  );
}
