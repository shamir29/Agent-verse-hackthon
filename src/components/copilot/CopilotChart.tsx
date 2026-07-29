"use client";

import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface CopilotChartProps {
  chart: {
    title: string;
    type: "bar" | "area" | "line";
    dataKey: string;
    data: any[];
    unit?: string;
  };
}

export function CopilotChart({ chart }: CopilotChartProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="p-4 border border-border rounded-card bg-surface shadow-xs space-y-3 h-60 flex items-center justify-center text-xs text-text-tertiary">
        Initializing telemetry graph...
      </div>
    );
  }

  return (
    <div className="p-4 border border-border rounded-card bg-surface shadow-xs space-y-3">
      <h4 className="text-xs font-bold text-text-primary">{chart.title}</h4>
      <div className="h-60 w-full min-h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          {chart.type === "area" ? (
            <AreaChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" opacity={0.5} />
              <XAxis dataKey="time" stroke="#64748B" fontSize={11} />
              <YAxis stroke="#64748B" fontSize={11} />
              <Tooltip />
              <Area type="monotone" dataKey={chart.dataKey} stroke="#2563EB" fill="#3B82F6" fillOpacity={0.2} strokeWidth={2} />
            </AreaChart>
          ) : chart.type === "bar" ? (
            <BarChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" opacity={0.5} />
              <XAxis dataKey="time" stroke="#64748B" fontSize={11} />
              <YAxis stroke="#64748B" fontSize={11} />
              <Tooltip />
              <Bar dataKey={chart.dataKey} fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" opacity={0.5} />
              <XAxis dataKey="time" stroke="#64748B" fontSize={11} />
              <YAxis stroke="#64748B" fontSize={11} />
              <Tooltip />
              <Line type="monotone" dataKey={chart.dataKey} stroke="#2563EB" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
