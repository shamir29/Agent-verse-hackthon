import React, { useState } from 'react';
import { ReservoirData } from '../../types/waterSystem';
import {
  Database,
  Sliders,
} from 'lucide-react';

interface ReservoirStatusProps {
  reservoirs: ReservoirData[];
}

export const ReservoirStatus: React.FC<ReservoirStatusProps> = ({ reservoirs }) => {
  const [selectedRes, setSelectedRes] = useState<ReservoirData>(reservoirs[0]);
  const [gateOpen, setGateOpen] = useState(selectedRes.damGateOpenPct);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between glass-panel rounded-2xl p-4 border border-cyan-500/30">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-950/80 border border-blue-400 text-blue-600 dark:text-blue-400">
            <Database className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-orbitron font-bold text-slate-900 dark:text-slate-100">
              RESERVOIR CAPACITY & DAM GATE MANAGEMENT
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live water storage monitoring, inflow/outflow balance & automated spillway gate positioning
            </p>
          </div>
        </div>
      </div>

      {/* Grid: 3 Reservoirs Selection + Main Reservoir Tank Animation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Interactive Animated Tank Visualizer */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 border border-cyan-500/20 flex flex-col md:flex-row items-center gap-8">
          
          {/* Animated Water Filling Tank Container */}
          <div className="relative w-48 h-72 bg-slate-100 dark:bg-slate-950 rounded-3xl border-2 border-cyan-500/50 p-2 flex flex-col justify-end overflow-hidden shadow-neon-blue">
            
            {/* Water Fill Mesh with Animated Wave */}
            <div
              className="w-full bg-gradient-to-t from-blue-700 via-cyan-500 to-sky-400 rounded-b-2xl transition-all duration-700 relative overflow-hidden"
              style={{ height: `${selectedRes.fillPercentage}%` }}
            >
              {/* Wave SVG Animation */}
              <div className="absolute top-0 left-0 right-0 h-4 bg-cyan-200/40 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-orbitron font-extrabold text-white text-glow-cyan">
                  {selectedRes.fillPercentage}%
                </span>
              </div>
            </div>

            {/* Level Markings */}
            <div className="absolute top-4 right-3 font-mono text-[9px] text-cyan-700 dark:text-cyan-300/80 space-y-4 text-right">
              <div>MAX: {selectedRes.maxCapacityMGL} MGL</div>
              <div>75%</div>
              <div>50%</div>
              <div>25%</div>
            </div>
          </div>

          {/* Reservoir Details & Gate Control Slider */}
          <div className="flex-1 space-y-4">
            <div>
              <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 border border-cyan-300 dark:border-cyan-500/30">
                {selectedRes.id}
              </span>
              <h3 className="text-xl font-orbitron font-bold text-slate-900 dark:text-slate-100 mt-1">
                {selectedRes.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{selectedRes.location}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                <div className="text-slate-500 dark:text-slate-400">Current Level</div>
                <div className="text-cyan-700 dark:text-cyan-300 font-bold text-sm">{selectedRes.currentLevelM} m / {selectedRes.maxLevelM} m</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                <div className="text-slate-500 dark:text-slate-400">Health Score</div>
                <div className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">{selectedRes.healthScore} / 100</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                <div className="text-slate-500 dark:text-slate-400">Daily Inflow</div>
                <div className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">+{selectedRes.dailyInflowMGL} MGL/day</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                <div className="text-slate-500 dark:text-slate-400">Daily Outflow</div>
                <div className="text-cyan-600 dark:text-cyan-400 font-bold text-sm">-{selectedRes.dailyOutflowMGL} MGL/day</div>
              </div>
            </div>

            {/* Dam Gate Slider */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-cyan-300 dark:border-cyan-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs font-orbitron font-bold text-cyan-700 dark:text-cyan-300">
                <span>Spillway Dam Gate Position</span>
                <span className="text-cyan-600 dark:text-cyan-400">{gateOpen}% Open</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={gateOpen}
                onChange={(e) => setGateOpen(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500 dark:accent-cyan-400"
              />
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Adjusting gate outflow releases excess pressure to prevent downstream overflow during storm surge.
              </p>
            </div>
          </div>

        </div>

        {/* Right List of Reservoirs */}
        <div className="glass-panel rounded-2xl p-5 border border-cyan-500/20 space-y-3">
          <h3 className="text-sm font-orbitron font-bold text-cyan-700 dark:text-cyan-300 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Regional Reservoir Network
          </h3>

          {reservoirs.map((res) => (
            <div
              key={res.id}
              onClick={() => {
                setSelectedRes(res);
                setGateOpen(res.damGateOpenPct);
              }}
              className={`p-3.5 rounded-xl border cursor-pointer transition ${
                selectedRes.id === res.id
                  ? 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-400 shadow-neon-cyan'
                  : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-cyan-400'
              }`}
            >
              <div className="flex items-center justify-between font-bold text-xs">
                <span className="text-slate-900 dark:text-slate-100">{res.name}</span>
                <span className="text-cyan-600 dark:text-cyan-400">{res.fillPercentage}%</span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {res.currentCapacityMGL} MGL / {res.maxCapacityMGL} MGL
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
