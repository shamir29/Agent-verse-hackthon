"use client";

import React, { useState } from "react";
import { CopilotGISMarker, CopilotGISPolyline } from "@/types/copilot";
import { MapPin, Layers, Zap, Droplets, AlertTriangle, Wind, ShieldAlert, Radio, Eye } from "lucide-react";

interface GISMapOverlayProps {
  overlayTitle: string;
  center: [number, number];
  zoom: number;
  markers: CopilotGISMarker[];
  polylines?: CopilotGISPolyline[];
  onSelectMarker?: (marker: CopilotGISMarker) => void;
}

export function GISMapOverlay({
  overlayTitle,
  center,
  zoom,
  markers = [],
  polylines = [],
  onSelectMarker,
}: GISMapOverlayProps) {
  const [selectedMarker, setSelectedMarker] = useState<CopilotGISMarker | null>(markers[0] || null);
  const [showPipelines, setShowPipelines] = useState(true);
  const [showHeatmaps, setShowHeatmaps] = useState(true);
  const [showGridLines, setShowGridLines] = useState(true);

  const handleMarkerClick = (marker: CopilotGISMarker) => {
    setSelectedMarker(marker);
    if (onSelectMarker) onSelectMarker(marker);
  };

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case "leak":
        return <Droplets className="w-4 h-4 text-white animate-bounce" />;
      case "substation":
        return <Zap className="w-4 h-4 text-white" />;
      case "reservoir":
        return <Droplets className="w-4 h-4 text-white" />;
      case "aqi_sensor":
        return <Wind className="w-4 h-4 text-white" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-white" />;
    }
  };

  return (
    <div className="relative w-full h-[380px] rounded-card overflow-hidden border border-border bg-[#0F172A] text-white shadow-md select-none">
      {/* Top Map Bar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-btn border border-slate-700/60 shadow-lg text-xs">
        <div className="flex items-center gap-2 font-bold text-slate-100">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>{overlayTitle}</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono border border-cyan-500/30">
            GIS LIVE OVERLAY
          </span>
        </div>

        {/* Map Layer Toggles */}
        <div className="flex items-center gap-2 text-[11px]">
          <button
            onClick={() => setShowPipelines(!showPipelines)}
            className={`px-2 py-1 rounded transition-colors flex items-center gap-1 border ${
              showPipelines ? "bg-cyan-950 text-cyan-300 border-cyan-600/50" : "bg-slate-800 text-slate-400 border-slate-700"
            }`}
          >
            <Radio className="w-3 h-3" /> Vectors
          </button>

          <button
            onClick={() => setShowHeatmaps(!showHeatmaps)}
            className={`px-2 py-1 rounded transition-colors flex items-center gap-1 border ${
              showHeatmaps ? "bg-red-950 text-red-300 border-red-600/50" : "bg-slate-800 text-slate-400 border-slate-700"
            }`}
          >
            <ShieldAlert className="w-3 h-3" /> Heatmaps
          </button>
        </div>
      </div>

      {/* Vector GIS Dark Map Engine */}
      <div className="w-full h-full relative overflow-hidden bg-[#0A0F1D] flex items-center justify-center">
        {/* Background Grid Mesh */}
        {showGridLines && (
          <svg className="w-full h-full absolute inset-0 opacity-20 pointer-events-none" viewBox="0 0 800 400">
            <defs>
              <pattern id="gisGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#38BDF8" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gisGrid)" />
          </svg>
        )}

        {/* Dynamic Vector Lines (Pipelines, Power Feeders) */}
        {showPipelines && (
          <svg className="w-full h-full absolute inset-0 opacity-80 pointer-events-none" viewBox="0 0 800 400">
            {polylines.map((poly) => {
              // Convert coordinates to SVG positions
              const pointsStr = poly.points
                .map(([lat, lng]) => {
                  const x = ((lng - 79.85) / (80.35 - 79.85)) * 800;
                  const y = (1 - (lat - 12.95) / (13.25 - 12.95)) * 400;
                  return `${x},${y}`;
                })
                .join(" ");

              return (
                <g key={poly.id}>
                  <polyline
                    points={pointsStr}
                    fill="none"
                    stroke={poly.color || "#38BDF8"}
                    strokeWidth={poly.dashed ? "3" : "4"}
                    strokeDasharray={poly.dashed ? "6,6" : "none"}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                  {/* Flow Animation Dots */}
                  <polyline
                    points={pointsStr}
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeDasharray="4,12"
                    strokeDashoffset="0"
                    className="animate-pulse"
                  />
                </g>
              );
            })}
          </svg>
        )}

        {/* Heatmap / Radius Buffer Circles */}
        {showHeatmaps && (
          <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 800 400">
            {markers
              .filter((m) => m.radiusKm)
              .map((m) => {
                const cx = Math.max(50, Math.min(750, ((m.lng - 79.85) / (80.35 - 79.85)) * 800));
                const cy = Math.max(40, Math.min(360, (1 - (m.lat - 12.95) / (13.25 - 12.95)) * 400));
                const radiusPx = (m.radiusKm || 1) * 35;

                return (
                  <g key={`radius_${m.id}`}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={radiusPx}
                      fill={m.severity === "critical" ? "#EF4444" : "#F59E0B"}
                      fillOpacity="0.18"
                      stroke={m.severity === "critical" ? "#EF4444" : "#F59E0B"}
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                    />
                    <circle
                      cx={cx}
                      cy={cy}
                      r={radiusPx * 1.3}
                      fill="none"
                      stroke={m.severity === "critical" ? "#EF4444" : "#F59E0B"}
                      strokeWidth="0.8"
                      strokeOpacity="0.4"
                      className="animate-ping"
                      style={{ animationDuration: "3s" }}
                    />
                  </g>
                );
              })}
          </svg>
        )}

        {/* GIS Asset Markers */}
        <div className="absolute inset-0">
          {markers.map((marker) => {
            const posX = Math.max(8, Math.min(92, ((marker.lng - 79.85) / (80.35 - 79.85)) * 100));
            const posY = Math.max(10, Math.min(90, (1 - (marker.lat - 12.95) / (13.25 - 12.95)) * 100));
            const isSelected = selectedMarker?.id === marker.id;

            return (
              <button
                key={marker.id}
                onClick={() => handleMarkerClick(marker)}
                style={{ left: `${posX}%`, top: `${posY}%` }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-30 focus:outline-none"
              >
                <div className="relative">
                  {/* Glowing Radar Ring */}
                  {marker.severity === "critical" && (
                    <div className="absolute inset-0 rounded-full bg-red-500/40 animate-ping" />
                  )}

                  {/* Marker Pin Icon */}
                  <div
                    className={`relative p-2.5 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
                      isSelected ? "scale-125 ring-4 ring-cyan-400 z-40" : "hover:scale-110"
                    } ${
                      marker.severity === "critical"
                        ? "bg-red-600 text-white shadow-red-500/50"
                        : marker.severity === "warning"
                        ? "bg-amber-500 text-white shadow-amber-500/50"
                        : "bg-cyan-600 text-white shadow-cyan-500/50"
                    }`}
                  >
                    {getMarkerIcon(marker.type)}
                  </div>

                  {/* Hover Tooltip */}
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-slate-900 text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-btn shadow-xl border border-slate-700 whitespace-nowrap z-50">
                    <div className="font-bold text-cyan-300">{marker.name}</div>
                    {marker.value && <div className="text-[10px] text-slate-300">{marker.value}</div>}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Marker Detail Card Bottom Bar */}
      {selectedMarker && (
        <div className="absolute bottom-3 left-3 right-3 z-20 bg-slate-900/95 border border-slate-700 rounded-btn p-3 shadow-xl backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-btn ${
                selectedMarker.severity === "critical"
                  ? "bg-red-500/20 text-red-400 border border-red-500/40"
                  : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
              }`}
            >
              {getMarkerIcon(selectedMarker.type)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-slate-100">{selectedMarker.name}</h4>
                {selectedMarker.severity && (
                  <span
                    className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-chip ${
                      selectedMarker.severity === "critical"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-amber-500/20 text-amber-300"
                    }`}
                  >
                    {selectedMarker.severity}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                {selectedMarker.detail || `Location: Lat ${selectedMarker.lat}, Lng ${selectedMarker.lng}`}
                {selectedMarker.zone ? ` • Zone: ${selectedMarker.zone}` : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-[11px] font-mono text-cyan-300 bg-slate-800 px-2 py-1 rounded border border-slate-700">
              {selectedMarker.value || "SCADA Telemetry Active"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
