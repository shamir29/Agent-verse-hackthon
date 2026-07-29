"use client";

import React, { useState } from "react";

interface DataPoint {
  time: string;
  load: number;
}

interface GridLoadChartProps {
  data: DataPoint[];
}

export function GridLoadChart({ data }: GridLoadChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);

  if (!data || data.length === 0) return null;

  const width = 800;
  const height = 240;
  const paddingX = 40;
  const paddingY = 30;

  const maxLoad = 100;
  const minLoad = 0;

  // Calculate coordinates
  const points = data.map((d, index) => {
    const x = paddingX + (index / (data.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - ((d.load - minLoad) / (maxLoad - minLoad)) * (height - paddingY * 2);
    return { x, y, ...d };
  });

  // SVG Area path
  const pathD = points.reduce((acc, point, i) => {
    return i === 0 ? `M ${point.x} ${point.y}` : `${acc} L ${point.x} ${point.y}`;
  }, "");

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  return (
    <div className="relative w-full bg-surface border border-border rounded-card p-4 space-y-2">
      <div className="relative w-full h-60">
        <svg className="w-full h-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="gridLoadGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#2563EB" stopOpacity={0.0} />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((val) => {
            const y = height - paddingY - (val / 100) * (height - paddingY * 2);
            return (
              <g key={val}>
                <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="#E6E8EC" strokeDasharray="3 3" />
                <text x={paddingX - 8} y={y + 4} textAnchor="end" fill="#96A0AC" fontSize="10" className="font-mono">
                  {val}%
                </text>
              </g>
            );
          })}

          {/* Gradient Fill Area */}
          <path d={areaD} fill="url(#gridLoadGradient)" />

          {/* Line Stroke */}
          <path d={pathD} fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {/* Interactive Data Points */}
          {points.map((pt, i) => (
            <g key={i} className="cursor-pointer group" onMouseEnter={() => setHoveredPoint(pt)} onMouseLeave={() => setHoveredPoint(null)}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoveredPoint?.time === pt.time ? "6" : "4"}
                fill="#2563EB"
                stroke="#FFFFFF"
                strokeWidth="2"
                className="transition-all"
              />
            </g>
          ))}

          {/* Time Labels */}
          {points.map((pt, i) => (
            <text key={i} x={pt.x} y={height - 8} textAnchor="middle" fill="#96A0AC" fontSize="10" className="font-mono">
              {pt.time}
            </text>
          ))}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredPoint && (
          <div className="absolute top-2 right-4 bg-text-primary text-white text-xs px-3 py-1.5 rounded-chip shadow-md font-mono flex items-center gap-2 animate-in fade-in">
            <span>Time: {hoveredPoint.time}</span>
            <span className="text-blue-300 font-bold">Load: {hoveredPoint.load}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
