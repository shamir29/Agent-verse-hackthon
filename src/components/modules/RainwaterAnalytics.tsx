import React from 'react';
import { RainwaterAnalyticsData } from '../../types/waterSystem';
import { CloudRain, Sparkles } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface RainwaterAnalyticsProps {
  rainwater: RainwaterAnalyticsData[];
}

export const RainwaterAnalytics: React.FC<RainwaterAnalyticsProps> = ({ rainwater }) => {
  const data = rainwater[0];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between glass-panel rounded-2xl p-4 border border-cyan-500/30">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-950/80 border border-blue-400 text-cyan-600 dark:text-cyan-400">
            <CloudRain className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-orbitron font-bold text-slate-900 dark:text-slate-100">
              RAINWATER HARVESTING & ATMOSPHERIC ANALYTICS
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Urban catchment yield calculation, collection efficiency matrix & precipitation forecasting
            </p>
          </div>
        </div>
      </div>

      {/* Grid: 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-4 border border-cyan-500/20">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 font-space uppercase">Current Rainfall</span>
          <div className="text-2xl font-orbitron font-bold text-cyan-700 dark:text-cyan-300 my-1">{data.currentRainfallMm} mm</div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">Last 24 hours precipitation</span>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-cyan-500/20">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 font-space uppercase">Harvested Yield</span>
          <div className="text-2xl font-orbitron font-bold text-emerald-600 dark:text-emerald-400 my-1">
            {(data.harvestedLitersToday / 1000).toLocaleString()}k Liters
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">Stored in underground vaults</span>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-cyan-500/20">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 font-space uppercase">Collection Efficiency</span>
          <div className="text-2xl font-orbitron font-bold text-cyan-700 dark:text-cyan-300 my-1">{data.collectionEfficiencyPct}%</div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">Optimal roof & basin filters</span>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-cyan-500/20">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 font-space uppercase">Storage Filled</span>
          <div className="text-2xl font-orbitron font-bold text-cyan-700 dark:text-cyan-300 my-1">{data.storageFilledPct}%</div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">1.48M L out of 2.0M L</span>
        </div>
      </div>

      {/* Bar Chart: Actual vs Predicted Rainfall */}
      <div className="glass-panel rounded-2xl p-5 border border-cyan-500/20">
        <h3 className="text-sm font-orbitron font-bold text-cyan-700 dark:text-cyan-300 mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Hourly Precipitation: Actual vs AI Predicted (mm)
        </h3>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.hourlyRainfall}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(2, 132, 199, 0.15)" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#0284c7', borderRadius: '12px', fontSize: '12px', color: '#0f172a' }}
              />
              <Bar dataKey="actualMm" fill="#0284c7" radius={[4, 4, 0, 0]} name="Actual Rainfall (mm)" />
              <Bar dataKey="predictedMm" fill="#9d4edd" radius={[4, 4, 0, 0]} name="AI Predicted (mm)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
