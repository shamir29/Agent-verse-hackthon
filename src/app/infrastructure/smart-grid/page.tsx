"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Zap, Search, Filter, Activity, Server, AlertTriangle, CheckCircle, TrendingUp, X } from "lucide-react";
import { GridLoadChart } from "@/components/charts/GridLoadChart";
import { SkeletonCard, SkeletonTable } from "@/components/ui/SkeletonCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";

interface Substation {
  id: string;
  name: string;
  zone: string;
  status: "operational" | "warning" | "critical" | string;
  loadPercent: number;
  voltageKv: number;
  lat: number;
  lng: number;
  updatedAt: string;
}

export default function SmartGridPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedZone, setSelectedZone] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedSubstation, setSelectedSubstation] = useState<Substation | null>(null);

  // Fetch substations from API
  const {
    data: substations = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<Substation[]>({
    queryKey: ["substations", selectedZone, selectedStatus],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedZone !== "all") params.append("zone", selectedZone);
      if (selectedStatus !== "all") params.append("status", selectedStatus);

      const res = await fetch(`/api/substations?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load grid substations");
      return res.json();
    },
  });

  // Client-side search filter
  const filteredSubstations = useMemo(() => {
    return substations.filter((sub) => {
      const matchSearch =
        sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.zone.toLowerCase().includes(searchTerm.toLowerCase());
      return matchSearch;
    });
  }, [substations, searchTerm]);

  // Generate 24-hour load trend for Recharts chart
  const chartData = useMemo(() => {
    const activeSub = selectedSubstation || substations[0];
    const baseLoad = activeSub ? activeSub.loadPercent : 75;

    return [
      { time: "00:00", load: Math.max(30, baseLoad - 25) },
      { time: "03:00", load: Math.max(25, baseLoad - 35) },
      { time: "06:00", load: Math.min(98, baseLoad - 10) },
      { time: "09:00", load: Math.min(99, baseLoad + 12) },
      { time: "12:00", load: Math.min(100, baseLoad + 18) },
      { time: "15:00", load: Math.min(100, baseLoad + 14) },
      { time: "18:00", load: Math.min(100, baseLoad + 22) },
      { time: "21:00", load: Math.min(98, baseLoad + 5) },
    ];
  }, [selectedSubstation, substations]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" /> Smart Grid Operations Module
          </h1>
          <p className="text-sm text-text-secondary">
            Substation telemetry, transformer health, and real-time load distribution analysis.
          </p>
        </div>
      </div>

      {/* Error state */}
      {isError && (
        <ErrorState
          title="Grid Telemetry Connection Failed"
          message="Could not load substation node details from the database."
          onRetry={refetch}
        />
      )}

      {/* Grid Load Over Time Recharts Chart */}
      <div className="bg-surface border border-border rounded-card p-5 space-y-3 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
          <div>
            <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" /> 24-Hour Substation Load Profile
            </h3>
            <p className="text-xs text-text-secondary">
              Viewing load profile for:{" "}
              <strong className="text-primary">{selectedSubstation?.name || substations[0]?.name || "All Grid Nodes"}</strong>
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono-data">
            <span className="flex items-center gap-1.5 text-text-secondary">
              <span className="w-2.5 h-2.5 rounded-full bg-primary"></span> Power Load (%)
            </span>
          </div>
        </div>

        <GridLoadChart data={chartData} />
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-surface border border-border rounded-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-text-tertiary absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search substation by name or zone..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-bg border border-border rounded-btn focus:outline-none focus:border-primary text-text-primary"
          />
        </div>

        {/* Zone & Status Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-text-secondary font-medium">
            <Filter className="w-3.5 h-3.5" /> Zone:
          </div>
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="px-3 py-1.5 text-xs bg-bg border border-border rounded-btn focus:outline-none focus:border-primary text-text-primary"
          >
            <option value="all">All Zones</option>
            <option value="Anna Nagar">Anna Nagar</option>
            <option value="Adyar">Adyar</option>
            <option value="T. Nagar">T. Nagar</option>
            <option value="Velachery">Velachery</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 text-xs bg-bg border border-border rounded-btn focus:outline-none focus:border-primary text-text-primary"
          >
            <option value="all">All Statuses</option>
            <option value="operational">Operational</option>
            <option value="warning">Warning</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      {/* Substation Cards Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} height="h-40" />
          ))}
        </div>
      ) : filteredSubstations.length === 0 ? (
        <EmptyState
          title="No Substations Found"
          description="No power grid substations match the applied search terms or status filters."
          onResetFilters={() => {
            setSearchTerm("");
            setSelectedZone("all");
            setSelectedStatus("all");
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSubstations.map((sub) => {
            const isSelected = selectedSubstation?.id === sub.id;
            return (
              <div
                key={sub.id}
                onClick={() => setSelectedSubstation(sub)}
                className={`bg-surface border rounded-card p-5 cursor-pointer transition-all shadow-sm space-y-4 hover:shadow-md ${
                  isSelected ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/40"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider block">{sub.zone} Zone</span>
                    <h3 className="text-sm font-bold text-text-primary leading-snug">{sub.name}</h3>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-chip shrink-0 ${
                      sub.status === "critical"
                        ? "bg-red-bg text-red-critical border border-red-critical/20"
                        : sub.status === "warning"
                        ? "bg-amber-bg text-amber-warning border border-amber-warning/20"
                        : "bg-emerald-bg text-emerald-good border border-emerald-good/20"
                    }`}
                  >
                    {sub.status}
                  </span>
                </div>

                {/* Metrics Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-text-secondary">Current Load</span>
                    <span className={`font-mono-data ${sub.loadPercent >= 90 ? "text-red-critical" : "text-text-primary"}`}>
                      {sub.loadPercent}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-bg rounded-full overflow-hidden">
                    <div
                      style={{ width: `${sub.loadPercent}%` }}
                      className={`h-full rounded-full transition-all ${
                        sub.loadPercent >= 90
                          ? "bg-red-critical"
                          : sub.loadPercent >= 80
                          ? "bg-amber-warning"
                          : "bg-primary"
                      }`}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-text-secondary font-mono-data">
                  <span>Voltage: <strong>{sub.voltageKv} kV</strong></span>
                  <span className="text-primary font-sans font-semibold">View Detail &rarr;</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Substation Detail Modal / Drawer View */}
      {selectedSubstation && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-card max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-border pb-3">
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-wide block">
                  {selectedSubstation.zone} Zone Substation
                </span>
                <h2 className="text-lg font-bold text-text-primary">{selectedSubstation.name}</h2>
              </div>
              <button
                onClick={() => setSelectedSubstation(null)}
                className="p-1 rounded-chip text-text-tertiary hover:text-text-primary hover:bg-bg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Detailed Parameters Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-bg p-3 rounded-btn border border-border space-y-1">
                <span className="text-[11px] text-text-tertiary block">Operating Status</span>
                <span className="text-sm font-bold capitalize flex items-center gap-1.5 text-text-primary">
                  {selectedSubstation.status === "operational" ? (
                    <CheckCircle className="w-4 h-4 text-emerald-good" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-warning" />
                  )}
                  {selectedSubstation.status}
                </span>
              </div>

              <div className="bg-bg p-3 rounded-btn border border-border space-y-1">
                <span className="text-[11px] text-text-tertiary block">Current Load</span>
                <span className="text-sm font-bold font-mono-data text-text-primary">
                  {selectedSubstation.loadPercent}% Capacity
                </span>
              </div>

              <div className="bg-bg p-3 rounded-btn border border-border space-y-1">
                <span className="text-[11px] text-text-tertiary block">Busbar Voltage</span>
                <span className="text-sm font-bold font-mono-data text-text-primary">
                  {selectedSubstation.voltageKv} kV
                </span>
              </div>

              <div className="bg-bg p-3 rounded-btn border border-border space-y-1">
                <span className="text-[11px] text-text-tertiary block">Transformer Banks</span>
                <span className="text-sm font-bold font-mono-data text-text-primary">
                  3 Active / 0 Faults
                </span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-3 rounded-btn text-xs text-blue-900 space-y-1">
              <span className="font-bold flex items-center gap-1">
                <Server className="w-3.5 h-3.5 text-primary" /> Telemetry Coordinates
              </span>
              <p className="font-mono-data text-[11px]">
                LAT: {selectedSubstation.lat.toFixed(4)} | LNG: {selectedSubstation.lng.toFixed(4)}
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedSubstation(null)}
                className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-btn hover:bg-primary-hover transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
