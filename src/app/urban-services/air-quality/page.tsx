"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Wind, AlertTriangle, ShieldCheck, Activity } from "lucide-react";
import { SkeletonCard } from "@/components/ui/SkeletonCard";

export default function AirQualityPage() {
  const { data: sensors = [], isLoading } = useQuery<any[]>({
    queryKey: ["aqSensors"],
    queryFn: async () => (await fetch("/api/air-quality")).json(),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
          <Wind className="w-6 h-6 text-emerald-good" /> Air Quality Telemetry & Pollution Mitigation
        </h1>
        <p className="text-sm text-text-secondary">
          Multi-point AQI, PM2.5, PM10, and CO2 monitoring across urban districts.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SkeletonCard height="h-36" />
          <SkeletonCard height="h-36" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sensors.map((sensor) => (
            <div key={sensor.id} className="bg-surface border border-border rounded-card p-5 space-y-3 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-text-primary">{sensor.location}</h3>
                  <span className="text-xs text-text-secondary capitalize font-semibold">{sensor.status}</span>
                </div>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold font-mono-data text-white ${
                    sensor.aqi > 150 ? "bg-red-critical" : sensor.aqi > 100 ? "bg-amber-warning" : "bg-emerald-good"
                  }`}
                >
                  {sensor.aqi}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1 bg-bg p-2 rounded-btn text-center text-[11px] font-mono-data border border-border">
                <div>
                  <span className="text-text-tertiary block text-[9px]">PM2.5</span>
                  <span className="font-bold">{sensor.pm25}</span>
                </div>
                <div>
                  <span className="text-text-tertiary block text-[9px]">PM10</span>
                  <span className="font-bold">{sensor.pm10}</span>
                </div>
                <div>
                  <span className="text-text-tertiary block text-[9px]">CO2</span>
                  <span className="font-bold">{sensor.co2}ppm</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
