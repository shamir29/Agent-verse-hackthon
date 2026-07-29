import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { BarChart3, PieChart, Activity, ShieldCheck, Zap } from 'lucide-react';
import { soundFX } from '../../utils/soundFX';

export const InteractiveAnalytics: React.FC = () => {
  const [activeChart, setActiveChart] = useState<'energy' | 'radar'>('energy');

  const energyFlowData = [
    { time: '00:00', solar: 0, grid: 280, hydro: 140, evBuffer: 40 },
    { time: '04:00', solar: 0, grid: 240, hydro: 180, evBuffer: 60 },
    { time: '08:00', solar: 180, grid: 320, hydro: 120, evBuffer: 90 },
    { time: '12:00', solar: 490, grid: 110, hydro: 80, evBuffer: 140 },
    { time: '16:00', solar: 380, grid: 210, hydro: 100, evBuffer: 180 },
    { time: '20:00', solar: 40, grid: 390, hydro: 150, evBuffer: 210 },
    { time: '24:00', solar: 0, grid: 290, hydro: 160, evBuffer: 100 }
  ];

  const radarData = [
    { subject: 'Grid Frequency', A: 100, fullMark: 100 },
    { subject: 'Solar Yield', A: 98, fullMark: 100 },
    { subject: 'Hydro Pressure', A: 96, fullMark: 100 },
    { subject: 'EV Dispatch', A: 92, fullMark: 100 },
    { subject: 'Air Quality', A: 95, fullMark: 100 },
    { subject: 'Predictive RUL', A: 99, fullMark: 100 }
  ];

  return (
    <section id="analytics" className="w-full py-32 px-6 md:px-12 bg-white select-none border-t border-slate-100">
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="linear-badge bg-blue-50 text-blue-700 border-blue-200 mb-4">
            <BarChart3 className="w-4 h-4 text-blue-600 animate-pulse" />
            <span>Storytelling Data Analytics</span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.02] mb-6">
            Real-Time Infrastructure Analytics
          </h2>
          <p className="text-lg text-slate-600 font-normal leading-relaxed">
            Morphing data visualizers tracking energy flows, battery buffers, air quality vectors, and system-wide consensus safety scores.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <button
            onClick={() => {
              soundFX.playClick();
              setActiveChart('energy');
            }}
            className={`px-5 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeChart === 'energy' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Temporal Energy Stream</span>
          </button>
          <button
            onClick={() => {
              soundFX.playClick();
              setActiveChart('radar');
            }}
            className={`px-5 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeChart === 'radar' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <PieChart className="w-4 h-4" />
            <span>Consensus Safety Radar</span>
          </button>
        </div>

        {/* Chart View Area */}
        <div className="apple-card p-8 bg-slate-950 text-white rounded-3xl border border-slate-800 shadow-2xl min-h-[420px] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-400" />
              <span className="font-bold text-sm">
                {activeChart === 'energy' ? 'Municipal 24H Power Flow Telemetry (MW)' : 'Multi-Agent Consensus Performance Matrix'}
              </span>
            </div>
            <span className="linear-badge bg-emerald-950 text-emerald-400 border-emerald-800 text-[11px]">
              Live Ingestion Active
            </span>
          </div>

          <div className="w-full h-72">
            {activeChart === 'energy' ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={energyFlowData}>
                  <defs>
                    <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorGrid" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }} />
                  <Area type="monotone" dataKey="solar" stroke="#F59E0B" fillOpacity={1} fill="url(#colorSolar)" />
                  <Area type="monotone" dataKey="grid" stroke="#2563EB" fillOpacity={1} fill="url(#colorGrid)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" stroke="#94a3b8" />
                  <PolarRadiusAxis stroke="#475569" />
                  <Radar name="Safety Score" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
