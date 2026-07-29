"use client";

import React, { useEffect, useRef, useState } from "react";
import { Zap, Droplets, MapPin, Layers } from "lucide-react";

export interface MapMarker {
  id: string;
  name: string;
  type: "substation" | "reservoir";
  status?: string;
  levelPercent?: number;
  loadPercent?: number;
  lat: number;
  lng: number;
  zone?: string;
}

interface CityMapProps {
  markers?: MapMarker[];
  onSelectMarker?: (marker: MapMarker) => void;
  selectedId?: string;
}

export function CityMap({ markers = [], onSelectMarker, selectedId }: CityMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState(false);
  const [activeMarker, setActiveMarker] = useState<MapMarker | null>(null);

  // Initialize MapLibre GL map safely
  useEffect(() => {
    let mapInstance: any = null;

    async function initMap() {
      if (!mapContainerRef.current) return;

      try {
        const maplibre = await import("maplibre-gl");

        mapInstance = new maplibre.Map({
          container: mapContainerRef.current,
          style: {
            version: 8,
            sources: {
              "osm-tiles": {
                type: "raster",
                tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
                tileSize: 256,
                attribution: "© OpenStreetMap contributors",
              },
            },
            layers: [
              {
                id: "osm-tiles-layer",
                type: "raster",
                source: "osm-tiles",
                minzoom: 0,
                maxzoom: 19,
              },
            ],
          },
          center: [80.22, 13.04], // Chennai coordinates
          zoom: 11,
        });

        mapInstance.on("error", () => {
          setMapError(true);
        });

        // Add markers
        markers.forEach((marker) => {
          const el = document.createElement("div");
          el.className = `w-7 h-7 rounded-full flex items-center justify-center cursor-pointer shadow-md transition-transform hover:scale-125 ${
            marker.type === "substation"
              ? marker.status === "critical"
                ? "bg-red-critical text-white ring-4 ring-red-critical/20"
                : marker.status === "warning"
                ? "bg-amber-warning text-white"
                : "bg-primary text-white"
              : "bg-blue-600 text-white"
          }`;
          el.innerHTML = marker.type === "substation" ? "⚡" : "💧";

          el.addEventListener("click", () => {
            setActiveMarker(marker);
            if (onSelectMarker) onSelectMarker(marker);
          });

          new maplibre.Marker({ element: el })
            .setLngLat([marker.lng, marker.lat])
            .addTo(mapInstance);
        });
      } catch (err) {
        console.warn("MapLibre GL failed to initialize, switching to SVG Fallback:", err);
        setMapError(true);
      }
    }

    initMap();

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [markers]);

  // Handle fallback click
  const handleMarkerClick = (marker: MapMarker) => {
    setActiveMarker(marker);
    if (onSelectMarker) onSelectMarker(marker);
  };

  return (
    <div className="relative w-full h-[400px] rounded-card overflow-hidden border border-border bg-surface shadow-sm">
      {/* Map Header Overlay */}
      <div className="absolute top-3 left-3 z-10 bg-surface/95 backdrop-blur-sm border border-border rounded-btn px-3 py-1.5 flex items-center gap-2 text-xs font-semibold text-text-primary shadow-sm">
        <Layers className="w-4 h-4 text-primary" />
        <span>Chennai Metropolitan Infrastructure Map</span>
        {mapError && (
          <span className="text-[10px] px-1.5 py-0.5 bg-amber-bg text-amber-warning rounded-chip font-normal">
            Vector Graphic Engine
          </span>
        )}
      </div>

      {/* Map Canvas or Styled SVG Fallback */}
      {!mapError ? (
        <div ref={mapContainerRef} className="w-full h-full" />
      ) : (
        <div className="w-full h-full bg-[#E5E9F0] relative overflow-hidden flex items-center justify-center select-none">
          {/* Vector City Roads & Districts */}
          <svg className="w-full h-full absolute inset-0 opacity-40 pointer-events-none" viewBox="0 0 800 500">
            {/* Grid & Roads */}
            <path d="M 50 0 L 50 500 M 150 0 L 150 500 M 250 0 L 250 500 M 350 0 L 350 500 M 450 0 L 450 500 M 550 0 L 550 500 M 650 0 L 650 500 M 750 0 L 750 500" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M 0 100 L 800 100 M 0 200 L 800 200 M 0 300 L 800 300 M 0 400 L 800 400" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 4" />

            {/* Arterial Highways */}
            <path d="M 100 0 C 200 150, 400 200, 750 450" fill="none" stroke="#94A3B8" strokeWidth="5" />
            <path d="M 0 250 C 300 220, 500 350, 800 280" fill="none" stroke="#94A3B8" strokeWidth="5" />

            {/* Zone Districts */}
            <rect x="180" y="80" width="180" height="130" rx="16" fill="#2563EB" fillOpacity="0.06" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="6 3" />
            <text x="200" y="105" fill="#1E40AF" fontSize="11" fontWeight="bold">ANNA NAGAR ZONE</text>

            <rect x="420" y="240" width="180" height="130" rx="16" fill="#059669" fillOpacity="0.06" stroke="#059669" strokeWidth="1.5" strokeDasharray="6 3" />
            <text x="440" y="265" fill="#065F46" fontSize="11" fontWeight="bold">ADYAR ZONE</text>

            <rect x="360" y="120" width="160" height="110" rx="16" fill="#B45309" fillOpacity="0.06" stroke="#B45309" strokeWidth="1.5" strokeDasharray="6 3" />
            <text x="380" y="145" fill="#92400E" fontSize="11" fontWeight="bold">T. NAGAR ZONE</text>

            <rect x="220" y="280" width="170" height="120" rx="16" fill="#7C3AED" fillOpacity="0.06" stroke="#7C3AED" strokeWidth="1.5" strokeDasharray="6 3" />
            <text x="240" y="305" fill="#5B21B6" fontSize="11" fontWeight="bold">VELACHERY ZONE</text>

            {/* Coastline / Bay of Bengal */}
            <path d="M 720 0 Q 690 250 780 500 L 800 500 L 800 0 Z" fill="#3B82F6" fillOpacity="0.15" />
            <text x="735" y="250" fill="#2563EB" fontSize="10" fontWeight="bold" transform="rotate(90 735 250)">BAY OF BENGAL</text>
          </svg>

          {/* Render Asset Markers on Vector Map */}
          <div className="absolute inset-0">
            {markers.map((marker, idx) => {
              // Approximate map positioning from lat/lng bounding box for Chennai (Lat ~12.9-13.2, Lng ~79.9-80.3)
              const posX = Math.max(10, Math.min(88, ((marker.lng - 79.9) / (80.3 - 79.9)) * 100));
              const posY = Math.max(10, Math.min(88, (1 - (marker.lat - 12.9) / (13.25 - 12.9)) * 100));
              const isSelected = selectedId === marker.id || activeMarker?.id === marker.id;

              return (
                <button
                  key={marker.id || idx}
                  onClick={() => handleMarkerClick(marker)}
                  style={{ left: `${posX}%`, top: `${posY}%` }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 group z-20 focus:outline-none`}
                >
                  <div
                    className={`relative p-2 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
                      isSelected ? "scale-125 ring-4 ring-primary/40 z-30" : "hover:scale-110"
                    } ${
                      marker.type === "substation"
                        ? marker.status === "critical"
                          ? "bg-red-critical text-white"
                          : marker.status === "warning"
                          ? "bg-amber-warning text-white"
                          : "bg-primary text-white"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    {marker.type === "substation" ? (
                      <Zap className="w-3.5 h-3.5 fill-current" />
                    ) : (
                      <Droplets className="w-3.5 h-3.5 fill-current" />
                    )}

                    {/* Tooltip on Hover */}
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-text-primary text-white text-[11px] font-medium px-2 py-1 rounded shadow-lg whitespace-nowrap z-40">
                      {marker.name}
                      {marker.loadPercent !== undefined && ` (${marker.loadPercent}% Load)`}
                      {marker.levelPercent !== undefined && ` (${marker.levelPercent}% Vol)`}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected Marker Detail Toast Overlay */}
      {activeMarker && (
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto z-20 bg-surface border border-border rounded-btn p-3 shadow-lg flex items-center justify-between gap-4 max-w-sm animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-btn ${activeMarker.type === "substation" ? "bg-blue-50 text-primary" : "bg-emerald-50 text-emerald-good"}`}>
              {activeMarker.type === "substation" ? <Zap className="w-5 h-5" /> : <Droplets className="w-5 h-5" />}
            </div>
            <div>
              <h4 className="text-xs font-bold text-text-primary">{activeMarker.name}</h4>
              <span className="text-[11px] text-text-secondary">
                {activeMarker.zone ? `Zone: ${activeMarker.zone} • ` : ""}
                {activeMarker.loadPercent !== undefined && `Load: ${activeMarker.loadPercent}%`}
                {activeMarker.levelPercent !== undefined && `Capacity: ${activeMarker.levelPercent}%`}
              </span>
            </div>
          </div>
          <button
            onClick={() => setActiveMarker(null)}
            className="text-text-tertiary hover:text-text-primary text-xs font-semibold px-2 py-1 rounded bg-bg"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
