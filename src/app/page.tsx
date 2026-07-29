"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  Zap,
  Droplets,
  AlertTriangle,
  Wind,
  Clock,
  Sparkles,
  Search,
  ArrowUpDown,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";
import { CityMap } from "@/components/map/CityMap";
import { SkeletonCard, SkeletonTable } from "@/components/ui/SkeletonCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";

interface KPIResponse {
  cityHealth: number;
  gridHealth: number;
  avgGridLoad: number;
  waterReserveLevel: number;
  activeCriticalAlerts: number;
  totalOpenAlerts: number;
  totalSubstations?: number;
  totalReservoirs?: number;
  airQualityAqi: number;
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

export default function CityOperationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<"createdAt" | "title" | "severity">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Fetch KPIs from API
  const {
    data: kpis,
    isLoading: isKpisLoading,
    isError: isKpisError,
    refetch: refetchKpis,
  } = useQuery<KPIResponse>({
    queryKey: ["kpis"],
    queryFn: async () => {
      const res = await fetch("/api/kpis");
      if (!res.ok) throw new Error("Failed to fetch KPIs");
      return res.json();
    },
  });

  // Fetch Substations & Reservoirs for Map
  const { data: substations = [] } = useQuery<any[]>({
    queryKey: ["substations"],
    queryFn: async () => {
      const res = await fetch("/api/substations");
      if (!res.ok) return [];
      return res.json();
    },
  });

  const { data: reservoirs = [] } = useQuery<any[]>({
    queryKey: ["reservoirs"],
    queryFn: async () => {
      const res = await fetch("/api/reservoirs");
      if (!res.ok) return [];
      return res.json();
    },
  });

  // Fetch Recent Incidents/Alerts for Table
  const {
    data: alerts = [],
    isLoading: isAlertsLoading,
    isError: isAlertsError,
    refetch: refetchAlerts,
  } = useQuery<Alert[]>({
    queryKey: ["alerts"],
    queryFn: async () => {
      const res = await fetch("/api/alerts");
      if (!res.ok) throw new Error("Failed to fetch alerts");
      return res.json();
    },
  });

  // Map markers combination
  const mapMarkers = useMemo(() => {
    const subMarkers = substations.map((s) => ({
      id: s.id,
      name: s.name,
      type: "substation" as const,
      status: s.status,
      loadPercent: s.loadPercent,
      lat: s.lat,
      lng: s.lng,
      zone: s.zone,
    }));
    const resMarkers = reservoirs.map((r) => ({
      id: r.id,
      name: r.name,
      type: "reservoir" as const,
      levelPercent: r.levelPercent,
      lat: r.lat,
      lng: r.lng,
    }));
    return [...subMarkers, ...resMarkers];
  }, [substations, reservoirs]);

  // Filter and sort incidents table
  const filteredIncidents = useMemo(() => {
    return alerts
      .filter((alert) => {
        const query = searchTerm.toLowerCase();
        return (
          alert.title.toLowerCase().includes(query) ||
          alert.location.toLowerCase().includes(query) ||
          alert.category.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => {
        if (sortField === "createdAt") {
          const timeA = new Date(a.createdAt).getTime();
          const timeB = new Date(b.createdAt).getTime();
          return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
        }
        if (sortField === "title") {
          return sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
        }
        if (sortField === "severity") {
          const severityWeight: Record<string, number> = { critical: 4, high: 3, medium: 2, low: 1 };
          const weightA = severityWeight[a.severity] || 0;
          const weightB = severityWeight[b.severity] || 0;
          return sortOrder === "asc" ? weightA - weightB : weightB - weightA;
        }
        return 0;
      });
  }, [alerts, searchTerm, sortField, sortOrder]);

  const toggleSort = (field: "createdAt" | "title" | "severity") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const isGlobalError = isKpisError || isAlertsError;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">City Operations Center</h1>
          <p className="text-sm text-text-secondary">
            Real-time urban infrastructure monitoring, grid telemetry, and automated incident triage.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono-data text-text-tertiary bg-surface px-3 py-1.5 rounded-chip border border-border self-start">
          <Clock className="w-3.5 h-3.5 text-primary" />
          <span>Updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Global Error Handler */}
      {isGlobalError && (
        <ErrorState
          title="Telemetry Connection Issue"
          message="Failed to load live city KPIs or alerts from local SQLite database."
          onRetry={() => {
            refetchKpis();
            refetchAlerts();
          }}
        />
      )}

      {/* 6 Real Dynamic KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {isKpisLoading ? (
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} height="h-28" />)
        ) : (
          <>
            <div className="bg-surface border border-border rounded-card p-4 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-text-secondary">City Health</span>
                <Activity className="w-4 h-4 text-emerald-good" />
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold font-mono-data text-text-primary">
                  {kpis?.cityHealth}%
                </span>
                <span className="text-[11px] text-emerald-good block font-medium mt-0.5">Optimal Index</span>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-card p-4 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-text-secondary">Grid Health</span>
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold font-mono-data text-text-primary">
                  {kpis?.gridHealth}%
                </span>
                <span className="text-[11px] text-text-tertiary block font-medium mt-0.5">
                  Avg Load: {kpis?.avgGridLoad}%
                </span>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-card p-4 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-text-secondary">Water Reserve</span>
                <Droplets className="w-4 h-4 text-blue-600" />
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold font-mono-data text-text-primary">
                  {kpis?.waterReserveLevel}%
                </span>
                <span className="text-[11px] text-text-tertiary block font-medium mt-0.5">
                  {kpis?.totalReservoirs} Active Basins
                </span>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-card p-4 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-text-secondary">Critical Incidents</span>
                <AlertTriangle className="w-4 h-4 text-red-critical" />
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold font-mono-data text-red-critical">
                  {kpis?.activeCriticalAlerts}
                </span>
                <span className="text-[11px] text-red-critical block font-medium mt-0.5">Requires Action</span>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-card p-4 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-text-secondary">Air Quality (AQI)</span>
                <Wind className="w-4 h-4 text-emerald-good" />
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold font-mono-data text-text-primary">
                  {kpis?.airQualityAqi}
                </span>
                <span className="text-[11px] text-emerald-good block font-medium mt-0.5">Good Air Quality</span>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-card p-4 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-text-secondary">Total Open Alerts</span>
                <ShieldAlert className="w-4 h-4 text-amber-warning" />
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold font-mono-data text-amber-warning">
                  {kpis?.totalOpenAlerts}
                </span>
                <span className="text-[11px] text-text-tertiary block font-medium mt-0.5">Active Logs</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* AI Daily Briefing Card & City Map Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Infrastructure Map */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" /> Live Infrastructure Map
            </h2>
            <span className="text-xs text-text-tertiary">
              {mapMarkers.length} Active Nodes Plotted
            </span>
          </div>
          <CityMap markers={mapMarkers} />
        </div>

        {/* Right 1 Col: AI Daily Briefing Card & Critical Alerts */}
        <div className="space-y-6">
          {/* AI Daily Briefing Card */}
          <div className="bg-gradient-to-br from-blue-50/80 to-surface border border-primary/20 rounded-card p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary fill-primary" />
                <h3 className="text-xs font-bold text-primary uppercase tracking-wider">AI Daily Operations Briefing</h3>
              </div>
              <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-chip font-medium">Auto-Generated</span>
            </div>
            <p className="text-xs text-text-primary leading-relaxed">
              <strong>Morning Dispatch Summary:</strong> Chennai grid operates at nominal stability with isolated peak loads at <strong>Adyar Central (98.7%)</strong> and <strong>Panagal Park (96.5%)</strong>. Poondi Reservoir volume sits below threshold (42.1%) with an active pipe pressure leak under repair.
            </p>
          </div>

          {/* Critical Alerts Summary Box */}
          <div className="bg-surface border border-border rounded-card p-4 space-y-3 shadow-sm">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <h3 className="text-xs font-bold text-text-primary flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-critical" /> Critical Action Items
              </h3>
              <span className="text-[11px] font-mono-data font-semibold text-red-critical">
                {alerts.filter((a) => a.severity === "critical" && a.status !== "resolved").length} Critical
              </span>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {alerts
                .filter((a) => a.severity === "critical" && a.status !== "resolved")
                .map((alert) => (
                  <div key={alert.id} className="p-2.5 bg-red-bg border border-red-critical/20 rounded-btn space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-semibold text-red-critical leading-tight">{alert.title}</span>
                      <span className="text-[10px] uppercase font-bold text-red-critical bg-white/80 px-1.5 py-0.5 rounded shrink-0">
                        {alert.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-text-secondary">
                      <span>{alert.location}</span>
                      <span className="font-mono-data">{new Date(alert.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Incidents Table with Search and Column Sort */}
      <div className="bg-surface border border-border rounded-card p-5 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <h2 className="text-base font-bold text-text-primary">Recent Incidents & Logged Events</h2>
            <p className="text-xs text-text-secondary">Search, sort, and inspect active city incident tickets.</p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-text-tertiary absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search incidents or locations..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-bg border border-border rounded-btn focus:outline-none focus:border-primary text-text-primary placeholder:text-text-tertiary"
            />
          </div>
        </div>

        {/* Table Body */}
        {isAlertsLoading ? (
          <SkeletonTable rows={5} />
        ) : filteredIncidents.length === 0 ? (
          <EmptyState
            title="No matching incidents"
            description={`No incidents found matching query "${searchTerm}".`}
            onResetFilters={() => setSearchTerm("")}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-[11px] font-semibold uppercase text-text-tertiary bg-bg/50">
                  <th className="py-3 px-4">
                    <button onClick={() => toggleSort("title")} className="flex items-center gap-1 hover:text-text-primary">
                      Incident Title <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">
                    <button onClick={() => toggleSort("severity")} className="flex items-center gap-1 hover:text-text-primary">
                      Severity <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Assigned Team</th>
                  <th className="py-3 px-4 text-right">
                    <button onClick={() => toggleSort("createdAt")} className="flex items-center gap-1 hover:text-text-primary justify-end ml-auto">
                      Timestamp <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs text-text-primary">
                {filteredIncidents.slice(0, 8).map((incident) => (
                  <tr key={incident.id} className="hover:bg-bg/60 transition-colors">
                    <td className="py-3 px-4 font-semibold text-text-primary">{incident.title}</td>
                    <td className="py-3 px-4 capitalize text-text-secondary">{incident.category.replace("_", " ")}</td>
                    <td className="py-3 px-4 text-text-secondary">{incident.location}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-chip text-[11px] font-bold capitalize ${
                          incident.severity === "critical"
                            ? "bg-red-bg text-red-critical border border-red-critical/20"
                            : incident.severity === "high"
                            ? "bg-amber-bg text-amber-warning border border-amber-warning/20"
                            : incident.severity === "medium"
                            ? "bg-blue-50 text-blue-600 border border-blue-200"
                            : "bg-gray-100 text-text-secondary"
                        }`}
                      >
                        {incident.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 font-semibold text-[11px] ${
                          incident.status === "resolved"
                            ? "text-emerald-good"
                            : incident.status === "assigned"
                            ? "text-primary"
                            : "text-amber-warning"
                        }`}
                      >
                        {incident.status === "resolved" && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {incident.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-text-secondary font-mono-data text-[11px]">
                      {incident.assignedTeam || "Unassigned"}
                    </td>
                    <td className="py-3 px-4 text-right font-mono-data text-text-tertiary">
                      {new Date(incident.createdAt).toLocaleDateString()} {new Date(incident.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
