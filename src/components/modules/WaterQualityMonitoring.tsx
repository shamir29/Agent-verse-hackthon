import React from 'react';
import { WaterQualitySector } from '../../types/waterSystem';
import { Activity, AlertCircle } from 'lucide-react';

interface WaterQualityProps {
  qualitySectors: WaterQualitySector[];
}

export const WaterQualityMonitoring: React.FC<WaterQualityProps> = ({ qualitySectors }) => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between glass-panel rounded-2xl p-4 border border-cyan-500/30">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-400 dark:border-emerald-500/50 text-emerald-600 dark:text-emerald-400">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-orbitron font-bold text-slate-900 dark:text-slate-100">
              WATER QUALITY & CHEMICAL PARAMETER SENTINEL
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Real-time spectrographic monitoring of pH, TDS, Turbidity, Dissolved Oxygen & biological purity
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Quality Sectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {qualitySectors.map((sector) => {
          const isGreen = sector.statusColor === 'Green';
          const isYellow = sector.statusColor === 'Yellow';
          return (
            <div
              key={sector.id}
              className={`glass-panel rounded-2xl p-5 border relative overflow-hidden space-y-4 ${
                isGreen
                  ? 'border-emerald-400 dark:border-emerald-500/40 bg-white/90 dark:bg-slate-900/80'
                  : isYellow
                  ? 'border-amber-300 dark:border-amber-500/40 bg-white/90 dark:bg-slate-900/80 shadow-neon-blue'
                  : 'border-red-400 dark:border-red-500/40 bg-white/90 dark:bg-slate-900/80 shadow-neon-red'
              }`}
            >
              {/* Top Accent Line */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 ${
                  isGreen ? 'bg-emerald-500' : isYellow ? 'bg-amber-500' : 'bg-red-500'
                }`}
              />

              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 border border-cyan-300 dark:border-cyan-500/30">
                    {sector.id}
                  </span>
                  <h3 className="text-sm font-orbitron font-bold text-slate-900 dark:text-slate-100 mt-1">
                    {sector.sectorName}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{sector.location}</p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-bold font-orbitron ${
                    isGreen
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-500/40'
                      : isYellow
                      ? 'bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-500/40'
                      : 'bg-red-100 text-red-800 border border-red-300 dark:bg-red-950 dark:text-red-300 dark:border-red-500/40'
                  }`}
                >
                  Score: {sector.qualityScore} / 100
                </div>
              </div>

              {/* 6 Key Chemical Metrics */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">pH Level</span>
                  <div className="text-cyan-700 dark:text-cyan-300 font-bold text-sm">{sector.pH}</div>
                  <span className="text-[9px] text-slate-500">Ideal: 6.5 - 8.5</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">TDS (Total Solids)</span>
                  <div className="text-cyan-700 dark:text-cyan-300 font-bold text-sm">{sector.tdsPpm} ppm</div>
                  <span className="text-[9px] text-slate-500">Ideal: &lt; 300</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Turbidity</span>
                  <div className={`font-bold text-sm ${sector.turbidityNtu > 1.0 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                    {sector.turbidityNtu} NTU
                  </div>
                  <span className="text-[9px] text-slate-500">Ideal: &lt; 1.0</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Temperature</span>
                  <div className="text-cyan-700 dark:text-cyan-300 font-bold text-sm">{sector.temperatureC}°C</div>
                  <span className="text-[9px] text-slate-500">Ambient</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Dissolved Oxygen</span>
                  <div className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">{sector.dissolvedOxygenMgL} mg/L</div>
                  <span className="text-[9px] text-slate-500">Ideal: &gt; 6.5</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Contamination</span>
                  <div className={`font-bold text-sm ${sector.contaminationPct > 5 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                    {sector.contaminationPct}%
                  </div>
                  <span className="text-[9px] text-slate-500">Purity index</span>
                </div>
              </div>

              {/* Sector Alert Badges */}
              {sector.alerts.length > 0 && (
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-mono space-y-1">
                  <div className="font-bold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-500" /> Active Quality Warnings:
                  </div>
                  {sector.alerts.map((alt, idx) => (
                    <div key={idx} className="text-[10px]">• {alt}</div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
