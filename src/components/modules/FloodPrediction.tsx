import React from 'react';
import { FloodPredictionData } from '../../types/waterSystem';
import {
  CloudRain,
  AlertTriangle,
  Clock,
  Zap,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface FloodPredictionProps {
  floods: FloodPredictionData[];
}

export const FloodPrediction: React.FC<FloodPredictionProps> = ({ floods }) => {
  const mainZone = floods[0]; // Zone C

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between glass-panel rounded-2xl p-4 border border-cyan-500/30">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-950/80 border border-amber-400 dark:border-amber-500/50 text-amber-600 dark:text-amber-400">
            <CloudRain className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <h2 className="text-xl font-orbitron font-bold text-slate-900 dark:text-slate-100">
              AI FLOOD RISK PREDICTION & TIMELINE FORECAST
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Multi-variable neural risk forecast combining river gauge sensors, dam capacity & rainfall radar
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-950/80 border border-red-300 dark:border-red-500/50 text-red-800 dark:text-red-300 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
            <span>OVERALL FLOOD RISK: <strong className="text-red-600 dark:text-red-400 text-sm">{mainZone.overallRiskPct}% ({mainZone.riskLevel})</strong></span>
          </div>
        </div>
      </div>

      {/* Main Grid: 4 Risk Factors + Prediction Timeline Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {[
          { label: 'Flash Flood Risk', pct: mainZone.flashFloodRiskPct, detail: 'High intensity rainfall runoff' },
          { label: 'River Overflow Risk', pct: mainZone.riverOverflowRiskPct, detail: 'River gauge 4.2m above normal' },
          { label: 'Dam Overflow Risk', pct: mainZone.damOverflowRiskPct, detail: 'Spillway operating at 35%' },
          { label: 'Urban Flooding Risk', pct: mainZone.urbanFloodRiskPct, detail: 'Drainage network bottleneck' },
        ].map((item, idx) => (
          <div
            key={idx}
            className="glass-panel rounded-2xl p-4 border border-cyan-500/20 text-center relative overflow-hidden"
          >
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-space uppercase">
              {item.label}
            </span>
            <div className="text-3xl font-orbitron font-black text-red-600 dark:text-red-400 my-2 text-glow-red">
              {item.pct}%
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.detail}</p>

            {/* Gauge bar */}
            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-red-500 rounded-full"
                style={{ width: `${item.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Chart & Evacuation Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Timeline Chart */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-5 border border-cyan-500/20">
          <h3 className="text-sm font-orbitron font-bold text-cyan-700 dark:text-cyan-300 mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> 12-Hour Flood Risk & Rainfall Prediction Timeline
          </h3>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mainZone.forecastTimeline}>
                <defs>
                  <linearGradient id="floodGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff3b30" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ff3b30" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="rainGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(2, 132, 199, 0.15)" />
                <XAxis dataKey="hour" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#ff3b30', borderRadius: '12px', fontSize: '12px', color: '#0f172a' }}
                />
                <Area type="monotone" dataKey="riskPct" stroke="#ff3b30" fillOpacity={1} fill="url(#floodGrad)" name="Flood Risk %" />
                <Area type="monotone" dataKey="rainfallMm" stroke="#0284c7" fillOpacity={1} fill="url(#rainGrad)" name="Rainfall (mm)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Evacuation Action Panel */}
        <div className="glass-panel rounded-2xl p-5 border border-red-300 dark:border-red-500/40 bg-gradient-to-br from-red-50 via-white to-red-50/50 dark:from-red-950/40 dark:to-slate-900/80 space-y-4">
          <h3 className="text-sm font-orbitron font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
            <Zap className="w-4 h-4 text-red-500" /> Flood Mitigation & Siren Protocols
          </h3>

          <div className="p-4 rounded-xl bg-white/80 dark:bg-black/40 border border-red-200 dark:border-red-500/30 text-xs space-y-2">
            <div className="font-bold text-red-700 dark:text-red-300">Evacuation Warning: Zone C</div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              Peak flood water level predicted today at 18:30 (85% Risk). AI recommends opening Dam Gate #2 spillway by 15%.
            </p>
          </div>

          <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 text-white font-orbitron text-xs font-bold shadow-neon-red hover:opacity-90 transition">
            TRIGGER EARLY WARNING SIREN
          </button>
        </div>

      </div>
    </div>
  );
};
