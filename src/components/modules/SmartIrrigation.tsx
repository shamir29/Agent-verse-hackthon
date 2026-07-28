import React from 'react';
import { SmartFarmField } from '../../types/waterSystem';
import { Sprout, Sun, Clock } from 'lucide-react';

interface SmartIrrigationProps {
  farms: SmartFarmField[];
}

export const SmartIrrigation: React.FC<SmartIrrigationProps> = ({ farms }) => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between glass-panel rounded-2xl p-4 border border-cyan-500/30">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-green-100 dark:bg-green-950/80 border border-green-400 dark:border-green-500/50 text-green-600 dark:text-green-400">
            <Sprout className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-orbitron font-bold text-slate-900 dark:text-slate-100">
              SMART AGRICULTURAL IRRIGATION & SOIL AI
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              AI crop evapotranspiration model, weather-based precision scheduling & soil moisture telemetry
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Farm Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {farms.map((farm) => {
          const needsWater = farm.irrigationStatus === 'Needs Watering';
          return (
            <div
              key={farm.id}
              className={`glass-panel rounded-2xl p-5 border relative overflow-hidden space-y-4 ${
                needsWater
                  ? 'border-amber-300 dark:border-amber-500/40 bg-white/90 dark:bg-slate-900/80 shadow-neon-blue'
                  : 'border-emerald-300 dark:border-emerald-500/40 bg-white/90 dark:bg-slate-900/80'
              }`}
            >
              {/* Top Accent Line */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${needsWater ? 'bg-amber-500' : 'bg-emerald-500'}`} />

              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-500/30">
                    {farm.cropType} Field ({farm.areaHectares} Hectares)
                  </span>
                  <h3 className="text-base font-orbitron font-bold text-slate-900 dark:text-slate-100 mt-1">
                    {farm.fieldName}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                    <Sun className="w-3.5 h-3.5 text-amber-500" /> {farm.weatherCondition}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold font-orbitron ${
                    needsWater
                      ? 'bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-500/40 animate-pulse'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-500/40'
                  }`}
                >
                  {farm.irrigationStatus}
                </span>
              </div>

              {/* Soil Moisture Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500 dark:text-slate-400">Soil Moisture Telemetry</span>
                  <span className={needsWater ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-emerald-600 dark:text-emerald-400 font-bold'}>
                    {farm.soilMoisturePct}% / Target {farm.targetMoisturePct}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-950 rounded-full overflow-hidden border border-slate-300 dark:border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      needsWater ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${farm.soilMoisturePct}%` }}
                  />
                </div>
              </div>

              {/* AI Recommendation Box */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-black/50 border border-cyan-200 dark:border-cyan-500/20 text-xs space-y-2">
                <div className="font-orbitron font-bold text-cyan-700 dark:text-cyan-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" /> AI Watering Window & Volume
                </div>
                <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Best Time:</span>
                    <div className="text-slate-800 dark:text-cyan-200 font-bold">{farm.recommendedTime}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Recommended Volume:</span>
                    <div className="text-slate-800 dark:text-cyan-200 font-bold">
                      {farm.recommendedVolumeLiters > 0
                        ? `${farm.recommendedVolumeLiters.toLocaleString()} Liters`
                        : '0 Liters (Optimal)'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Trigger */}
              {needsWater && (
                <button className="w-full py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-orbitron text-xs font-bold shadow-neon-blue hover:opacity-90 transition">
                  TRIGGER AUTOMATED SMART DRIP IRRIGATION
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
