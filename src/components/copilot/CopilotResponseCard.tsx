"use client";

import React, { useState } from "react";
import { CopilotResponse, CopilotAction, CopilotGISMarker } from "@/types/copilot";
import { GISMapOverlay } from "@/components/copilot/GISMapOverlay";
import { ActionModals } from "@/components/copilot/ActionModals";
import {
  Sparkles,
  CheckCircle2,
  Radio,
  Clock,
  Layers,
  Activity,
  MapPin,
  TrendingDown,
  ShieldCheck,
  Zap,
  Droplets,
  Wind,
  Cpu,
  ChevronRight,
  ExternalLink,
  Table as TableIcon,
  BarChart3,
  GitCommit,
  FileText,
  Users,
  Send,
  AlertOctagon,
} from "lucide-react";
import { CopilotChart } from "@/components/copilot/CopilotChart";

interface CopilotResponseCardProps {
  response: CopilotResponse;
}

export function CopilotResponseCard({ response }: CopilotResponseCardProps) {
  const [activeTab, setActiveTab] = useState<"table" | "chart" | "timeline">("table");
  const [selectedAction, setSelectedAction] = useState<CopilotAction | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const {
    intent,
    modules,
    liveSources,
    metrics,
    table,
    chart,
    timeline,
    gisMap,
    recommendations,
    actions,
    latencyMs,
    timestamp,
  } = response;

  const handleActionClick = (action: CopilotAction) => {
    if (action.type === "view_map" && gisMap) {
      // Scroll smoothly to map section if present
      const mapEl = document.getElementById(`map_${response.id}`);
      if (mapEl) {
        mapEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setToastMessage("Focused GIS Map view on location target.");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    setSelectedAction(action);
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case "create_work_order":
        return <FileText className="w-3.5 h-3.5" />;
      case "assign_team":
        return <Users className="w-3.5 h-3.5" />;
      case "notify_ops":
        return <Send className="w-3.5 h-3.5" />;
      case "isolate_valve":
        return <AlertOctagon className="w-3.5 h-3.5 text-red-400" />;
      case "view_map":
        return <MapPin className="w-3.5 h-3.5 text-cyan-400" />;
      default:
        return <ChevronRight className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="w-full bg-surface border border-border rounded-card p-5 shadow-lg space-y-6 text-text-primary transition-all animate-in fade-in duration-300">
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div className="p-3 bg-primary/10 border border-primary/30 rounded-btn text-xs font-semibold text-primary flex items-center justify-between animate-in fade-in">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {toastMessage}
          </span>
          <button onClick={() => setToastMessage(null)} className="text-text-tertiary hover:text-text-primary">
            ✕
          </button>
        </div>
      )}

      {/* 1. INTENT DETECTED HEADER */}
      <div className="border-b border-border/80 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-chip text-[10px] font-extrabold uppercase tracking-wider bg-primary/15 text-primary border border-primary/25 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" /> Intent Detected
            </span>
            <span className="text-[11px] font-bold text-text-tertiary font-mono">{intent.category}</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-text-tertiary font-mono">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-emerald-good" /> {latencyMs}ms
            </span>
            <span className="px-2 py-0.5 rounded bg-bg border border-border font-bold text-primary">
              {intent.confidence}% Confidence
            </span>
          </div>
        </div>

        <h2 className="text-lg font-bold tracking-tight text-text-primary flex items-center gap-2">
          {intent.title}
        </h2>
        <p className="text-xs text-text-secondary mt-1">{intent.description}</p>
      </div>

      {/* 2. MODULES USED */}
      <div className="space-y-2">
        <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider block">
          Modules Used & Operational Status
        </span>
        <div className="flex flex-wrap gap-2">
          {modules.map((mod) => (
            <div
              key={mod.id}
              className="px-3 py-1.5 rounded-btn bg-bg border border-border flex items-center gap-2 text-xs font-semibold text-text-primary shadow-2xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-good shrink-0" />
              <span>{mod.name}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-good animate-pulse ml-0.5" />
            </div>
          ))}
        </div>
      </div>

      {/* 3. LIVE DATA SOURCES */}
      <div className="space-y-2">
        <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider block">
          Live Telemetry Data Sources Ingested
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {liveSources.map((src) => (
            <div
              key={src.id}
              className="p-2.5 rounded-btn bg-bg/50 border border-border/80 flex items-start justify-between gap-2 text-[11px]"
            >
              <div>
                <span className="font-bold text-text-primary block truncate">{src.name}</span>
                <span className="text-[10px] text-text-tertiary block font-mono">{src.type} Feed</span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-good/10 text-emerald-good font-extrabold uppercase shrink-0">
                {src.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. STRUCTURED RESULTS */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <span className="text-[11px] font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" /> Structured Telemetry Results
          </span>

          {/* View Mode Toggle Tabs */}
          <div className="flex items-center gap-1 bg-bg p-1 rounded-btn border border-border">
            <button
              onClick={() => setActiveTab("table")}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors flex items-center gap-1 ${
                activeTab === "table" ? "bg-surface text-primary shadow-xs" : "text-text-tertiary hover:text-text-primary"
              }`}
            >
              <TableIcon className="w-3 h-3" /> Data Table
            </button>
            {chart && (
              <button
                onClick={() => setActiveTab("chart")}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors flex items-center gap-1 ${
                  activeTab === "chart" ? "bg-surface text-primary shadow-xs" : "text-text-tertiary hover:text-text-primary"
                }`}
              >
                <BarChart3 className="w-3 h-3" /> Graph
              </button>
            )}
            {timeline && (
              <button
                onClick={() => setActiveTab("timeline")}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors flex items-center gap-1 ${
                  activeTab === "timeline" ? "bg-surface text-primary shadow-xs" : "text-text-tertiary hover:text-text-primary"
                }`}
              >
                <GitCommit className="w-3 h-3" /> Timeline
              </button>
            )}
          </div>
        </div>

        {/* Structured KPI Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-card border shadow-xs transition-all ${
                m.status === "critical"
                  ? "bg-red-critical/5 border-red-critical/30 text-text-primary"
                  : m.status === "warning"
                  ? "bg-amber-warning/5 border-amber-warning/30 text-text-primary"
                  : "bg-bg border-border text-text-primary"
              }`}
            >
              <span className="text-[10px] font-semibold text-text-tertiary uppercase block">{m.label}</span>
              <div className="text-xl font-extrabold tracking-tight mt-1 flex items-baseline gap-1">
                <span>{m.value}</span>
                {m.unit && <span className="text-xs font-semibold text-text-secondary">{m.unit}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Tab 1: Enterprise Data Table */}
        {activeTab === "table" && table && (
          <div className="overflow-x-auto border border-border rounded-card bg-surface shadow-xs">
            {table.title && (
              <div className="px-4 py-2.5 bg-bg/80 border-b border-border text-xs font-bold text-text-primary">
                {table.title}
              </div>
            )}
            <table className="w-full text-left text-xs">
              <thead className="bg-bg border-b border-border text-[10px] font-bold uppercase tracking-wider text-text-tertiary">
                <tr>
                  {table.headers.map((h, i) => (
                    <th key={i} className="px-4 py-2.5">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {table.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-bg/40 transition-colors">
                    {table.headers.map((h, cIdx) => {
                      const val = row[h];
                      const isStatusCol = h.toLowerCase().includes("status") || h.toLowerCase().includes("severity") || h.toLowerCase().includes("priority");
                      const isCritical = String(val).toUpperCase().includes("CRITICAL") || String(val).toUpperCase().includes("HIGH");

                      return (
                        <td key={cIdx} className="px-4 py-3 font-medium whitespace-nowrap">
                          {isStatusCol ? (
                            <span
                              className={`px-2 py-0.5 rounded-chip text-[10px] font-extrabold uppercase ${
                                isCritical
                                  ? "bg-red-critical/15 text-red-critical border border-red-critical/20"
                                  : "bg-emerald-good/15 text-emerald-good border border-emerald-good/20"
                              }`}
                            >
                              {val}
                            </span>
                          ) : (
                            val
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Recharts Graph */}
        {activeTab === "chart" && chart && <CopilotChart chart={chart} />}

        {/* Tab 3: Timeline */}
        {activeTab === "timeline" && timeline && (
          <div className="p-4 border border-border rounded-card bg-surface shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-text-primary">Operational Incident Timeline Propagation</h4>
            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
              {timeline.map((item, i) => (
                <div key={i} className="relative flex items-start justify-between gap-3 text-xs">
                  <span className="absolute -left-6 top-0.5 w-3 h-3 rounded-full bg-primary ring-4 ring-surface" />
                  <div>
                    <span className="font-bold text-text-primary block">{item.event}</span>
                    <span className="text-[10px] text-text-tertiary font-mono">Module: {item.module}</span>
                  </div>
                  <span className="text-[10px] font-bold text-text-secondary bg-bg px-2 py-0.5 rounded border border-border shrink-0">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 5. INTERACTIVE MAP (WHEN LOCATION BASED) */}
      {gisMap && (
        <div id={`map_${response.id}`} className="space-y-2 pt-2">
          <span className="text-[11px] font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
            <MapPin className="w-4 h-4 text-cyan-600" /> Interactive GIS Location Map & Spatial Overlays
          </span>
          <GISMapOverlay
            overlayTitle={gisMap.overlayTitle}
            center={gisMap.center}
            zoom={gisMap.zoom}
            markers={gisMap.markers}
            polylines={gisMap.polylines}
          />
        </div>
      )}

      {/* 6. AI RECOMMENDATIONS & CROSS-MODULE REASONING */}
      {recommendations.length > 0 && (
        <div className="space-y-3 pt-2">
          <span className="text-[11px] font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-warning" /> AI Recommendations & Cross-Module Reasoning
          </span>

          <div className="space-y-3">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="p-4 rounded-card bg-gradient-to-r from-blue-950/20 via-surface to-surface border border-primary/30 shadow-xs space-y-2"
              >
                <h4 className="text-sm font-bold text-primary flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-good" /> {rec.title}
                </h4>

                <p className="text-xs text-text-secondary leading-relaxed">{rec.reasoning}</p>

                <div className="p-2.5 rounded-btn bg-bg/80 border border-border/80 text-[11px] space-y-1">
                  <div className="font-semibold text-text-primary">
                    <span className="text-emerald-good font-bold">Estimated Operational Impact: </span>
                    {rec.impact}
                  </div>
                  <div className="text-[10px] text-text-tertiary font-mono pt-1 border-t border-border/50">
                    🔗 <span className="font-bold text-primary">Cross-Module Correlation:</span> {rec.crossModuleInsight}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. SUGGESTED NEXT ACTIONS */}
      {actions.length > 0 && (
        <div className="border-t border-border pt-4 space-y-2">
          <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider block">
            Suggested Next Actions & One-Click Workflows
          </span>
          <div className="flex flex-wrap gap-2">
            {actions.map((act) => (
              <button
                key={act.id}
                onClick={() => handleActionClick(act)}
                className={`px-3.5 py-2 rounded-btn text-xs font-semibold transition-all flex items-center gap-2 shadow-2xs ${
                  act.primary
                    ? "bg-primary text-white hover:bg-primary-hover shadow-primary/20"
                    : "bg-surface border border-border text-text-primary hover:border-primary/50 hover:bg-bg"
                }`}
              >
                {getActionIcon(act.type)}
                <span>{act.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Execution Modal Popup */}
      <ActionModals
        action={selectedAction}
        onClose={() => setSelectedAction(null)}
        onExecuteSuccess={(msg) => {
          setToastMessage(msg);
          setTimeout(() => setToastMessage(null), 4000);
        }}
      />
    </div>
  );
}
