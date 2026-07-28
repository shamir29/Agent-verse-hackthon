import React from 'react';
import { PipelineRoute } from '../../types/waterSystem';
import {
  Activity,
  Zap,
  Sliders,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface WaterDistributionProps {
  pipelines: PipelineRoute[];
  onIsolatePipe: (pipeId: string) => void;
}

export const WaterDistribution: React.FC<WaterDistributionProps> = ({
  pipelines,
  onIsolatePipe,
}) => {
  const chartData = [
    { time: '00:00', pressurePsi: 68.2, flowRate: 140 },
    { time: '04:00', pressurePsi: 70.1, flowRate: 110 },
    { time: '08:00', pressurePsi: 65.4, flowRate: 210 },
    { time: '12:00', pressurePsi: 68.9, flowRate: 240 },
    { time: '16:00', pressurePsi: 64.2, flowRate: 220 },
    { time: '20:00', pressurePsi: 69.5, flowRate: 185 },
    { time: '24:00', pressurePsi: 71.0, flowRate: 130 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Module Title Header */}
      <div className="flex items-center justify-between glass-panel rounded-2xl p-4 border border-cyan-500/30">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-400 text-cyan-600 dark:text-cyan-400">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-orbitron font-bold text-slate-900 dark:text-slate-100">
              WATER DISTRIBUTION & SUPPLY MONITORING
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Real-time monitoring of water supply routes, main pressures, flow velocity & distribution efficiency
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-400 text-emerald-800 dark:text-emerald-400 text-xs font-mono font-bold">
            DISTRIBUTION EFFICIENCY: 94.2%
          </span>
        </div>
      </div>

      {/* Grid: Animated Underground Flow Viz + Telemetry Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Animated Pipeline Water Flow Visualizer Card */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-5 border border-cyan-500/20 relative overflow-hidden">
          <h3 className="text-sm font-orbitron font-bold text-cyan-700 dark:text-cyan-300 mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Underground Pipeline Flow Animation
          </h3>

          {/* SVG Animated Pipe Stream Diagram */}
          <div className="relative w-full h-48 bg-slate-100 dark:bg-[#050914] rounded-xl border border-cyan-500/30 p-4 flex items-center justify-between overflow-hidden">
            
            {/* Animated Blue Streams SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#00f2fe" stopOpacity="1" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Main Trunk Pipe */}
              <line x1="20" y1="50" x2="350" y2="50" stroke="#cbd5e1" strokeWidth="18" strokeLinecap="round" className="dark:stroke-[#1e293b]" />
              <line x1="20" y1="50" x2="350" y2="50" stroke="url(#pipeGrad)" strokeWidth="10" strokeDasharray="12 6" className="animate-flow-water" />

              {/* Branch Pipe 1 */}
              <path d="M 150 50 L 150 140 L 300 140" fill="none" stroke="#cbd5e1" strokeWidth="14" className="dark:stroke-[#1e293b]" />
              <path d="M 150 50 L 150 140 L 300 140" fill="none" stroke="#00f2fe" strokeWidth="8" strokeDasharray="10 5" className="animate-flow-water" />

              {/* Leaking Branch 2 (Red Pulse) */}
              <path d="M 260 50 L 260 110" fill="none" stroke="#ff3b30" strokeWidth="12" />
              <circle cx="260" cy="110" r="10" fill="#ff3b30" className="animate-ping" opacity="0.6" />
              <circle cx="260" cy="110" r="5" fill="#ff3b30" />
            </svg>

            {/* Overlay Station Labels */}
            <div className="relative z-10 flex justify-between w-full text-xs font-mono">
              <div className="bg-white/90 dark:bg-slate-900/90 border border-cyan-500/40 p-2 rounded-xl text-slate-800 dark:text-cyan-300 shadow-sm">
                Main Reservoir Pumping Stn<br/><span className="text-emerald-600 dark:text-emerald-400 font-bold">74.2 PSI</span>
              </div>
              <div className="bg-white/90 dark:bg-slate-900/90 border border-red-500/40 p-2 rounded-xl text-slate-800 dark:text-red-300 shadow-sm">
                Sector 4 Sub-Main<br/><span className="text-red-600 dark:text-red-400 font-bold animate-pulse">41.2 PSI (LEAK)</span>
              </div>
              <div className="bg-white/90 dark:bg-slate-900/90 border border-cyan-500/40 p-2 rounded-xl text-slate-800 dark:text-cyan-300 shadow-sm">
                Metro Hub #1<br/><span className="text-emerald-600 dark:text-emerald-400 font-bold">68.4 PSI</span>
              </div>
            </div>
          </div>

          {/* Pressure & Speed Chart */}
          <div className="mt-4 h-44">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(2, 132, 199, 0.15)" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#0284c7', borderRadius: '12px', fontSize: '12px', color: '#0f172a' }}
                />
                <Line type="monotone" dataKey="pressurePsi" stroke="#0284c7" strokeWidth={2.5} name="Pressure (PSI)" />
                <Line type="monotone" dataKey="flowRate" stroke="#10b981" strokeWidth={2.5} name="Flow Speed (m/s)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Stats & Route Control Card */}
        <div className="glass-panel rounded-2xl p-5 border border-cyan-500/20 space-y-4">
          <h3 className="text-sm font-orbitron font-bold text-cyan-700 dark:text-cyan-300 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Water Routes Overview
          </h3>

          <div className="space-y-3">
            {pipelines.map((pipe) => (
              <div
                key={pipe.id}
                className={`p-3 rounded-xl border text-xs ${
                  pipe.status === 'Leaking'
                    ? 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-500/40 text-red-900 dark:text-red-200'
                    : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-cyan-500/20 text-slate-800 dark:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between font-bold mb-1">
                  <span>{pipe.name}</span>
                  <span className={pipe.status === 'Leaking' ? 'text-red-600 dark:text-red-400 animate-pulse' : 'text-emerald-600 dark:text-emerald-400'}>
                    {pipe.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>Length: {pipe.lengthKm} km</span>
                  <span className="font-mono text-cyan-700 dark:text-cyan-300">{pipe.pressurePsi} PSI / {pipe.targetPressurePsi} PSI</span>
                </div>
                {pipe.status === 'Leaking' && (
                  <button
                    onClick={() => onIsolatePipe(pipe.id)}
                    className="mt-2 w-full py-1 rounded bg-red-600 text-white font-bold text-[10px] hover:bg-red-500 transition"
                  >
                    ISOLATE PIPE VALVE
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
