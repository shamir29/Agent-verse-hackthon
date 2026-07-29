import React, { useState, useEffect } from 'react';
import type { AgentCard } from '../../types';
import { soundFX } from '../../utils/soundFX';
import { 
  X, Zap, Sun, Droplets, Play, Pause, CheckCircle2, ShieldCheck,
  BarChart3, Trash2, Wind, Car, Wrench, Globe, Layout, Cpu
} from 'lucide-react';
import { SolarAgentDashboard } from '../../agents/solar/SolarAgentDashboard';
import { EnergyAgentDashboard } from '../../agents/energy/EnergyAgentDashboard';
import { PredictiveAgentDashboard } from '../../agents/predictive/PredictiveAgentDashboard';
import { DigitalTwinAgentDashboard } from '../../agents/digital-twin/DigitalTwinAgentDashboard';

interface AgentDeepDiveModalProps {
  agent: AgentCard;
  onClose: () => void;
}

export const AgentDeepDiveModal: React.FC<AgentDeepDiveModalProps> = ({ agent, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [simTime, setSimTime] = useState(12);
  const [zoomLevel, setZoomLevel] = useState<'City' | 'District' | 'Building' | 'Equipment'>('City');
  
  const handleClose = () => {
    soundFX.playClick();
    onClose();
  };

  const hasEnterpriseDashboard = ['solar-optimization', 'energy-monitoring', 'predictive-maintenance', 'digital-twin'].includes(agent.id);
  const [viewMode, setViewMode] = useState<'simulation' | 'dashboard'>(
    hasEnterpriseDashboard ? 'dashboard' : 'simulation'
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-900/80 backdrop-blur-xl animate-fade-in select-none">
      <div className="relative w-full max-w-6xl h-[90vh] bg-white rounded-[24px] shadow-2xl border border-slate-200 overflow-hidden flex flex-col justify-between">
        
        <div className="p-6 md:px-8 border-b border-slate-100 flex items-center justify-between bg-white z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xl">
              {agent.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold text-slate-900">{agent.name} AI Agent</h3>
                <span className="linear-badge bg-emerald-50 text-emerald-700 border-emerald-200 text-xs py-0.5 px-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping mr-1" />
                  Live Consensus Active
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{agent.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {hasEnterpriseDashboard && (
              <div className="flex items-center p-1 bg-slate-100 rounded-full border border-slate-200">
                <button
                  onClick={() => {
                    soundFX.playClick();
                    setViewMode('simulation');
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewMode === 'simulation' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>3D Live Simulation</span>
                </button>
                <button
                  onClick={() => {
                    soundFX.playClick();
                    setViewMode('dashboard');
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewMode === 'dashboard' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Layout className="w-3.5 h-3.5" />
                  <span>Enterprise Agent Suite</span>
                </button>
              </div>
            )}

            <button
              onClick={handleClose}
              className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative flex-1 bg-slate-950 p-6 flex flex-col justify-between overflow-hidden">
          
          {viewMode === 'dashboard' ? (
            <div className="w-full h-full">
              {agent.id === 'solar-optimization' && <SolarAgentDashboard />}
              {agent.id === 'energy-monitoring' && <EnergyAgentDashboard />}
              {agent.id === 'predictive-maintenance' && <PredictiveAgentDashboard />}
              {agent.id === 'digital-twin' && <DigitalTwinAgentDashboard />}
            </div>
          ) : (
            <>
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 p-2 px-4 rounded-full text-white text-xs backdrop-blur-md">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <span className="font-mono text-slate-300">
                    Time: {Math.floor(simTime).toString().padStart(2, '0')}:{(Math.floor((simTime % 1) * 60)).toString().padStart(2, '0')}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="24"
                    step="0.1"
                    value={simTime}
                    onChange={e => setSimTime(parseFloat(e.target.value))}
                    className="w-28 accent-blue-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1.5 rounded-full backdrop-blur-md">
                  {(['City', 'District', 'Building', 'Equipment'] as const).map(level => (
                    <button
                      key={level}
                      onClick={() => setZoomLevel(level)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        zoomLevel === level ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

          <div className="relative flex-1 my-4 flex items-center justify-center">
            {/* 1. SMART GRID */}
            {agent.id === 'smart-grid' && (
              <div className="w-full h-full flex flex-col items-center justify-center text-center">
                <div className="relative w-80 h-80 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-500/40 animate-spin" style={{ animationDuration: '20s' }} />
                  <div className="absolute inset-6 rounded-full border border-blue-500/20" />
                  
                  <div className="absolute -top-4 bg-blue-600/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-400 animate-pulse shadow-lg">
                    ⚡ Auto Phase Balancing: 4.2 GW Peak
                  </div>
                  <div className="absolute -bottom-4 bg-emerald-600/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-400 shadow-lg">
                    ✓ Substation 4 Isolated (Zero Outage)
                  </div>

                  <div className="text-center text-white">
                    <Zap className="w-16 h-16 text-blue-400 mx-auto mb-2 animate-bounce" />
                    <div className="text-4xl font-extrabold font-mono text-blue-400">99.998%</div>
                    <div className="text-xs text-slate-400 uppercase tracking-widest mt-1">Grid Frequency 60.00 Hz</div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. SOLAR OPTIMIZATION */}
            {agent.id === 'solar-optimization' && (
              <div className="w-full h-full flex flex-col items-center justify-center text-center">
                <div className="relative w-72 h-72 rounded-full border-2 border-amber-500/30 flex items-center justify-center bg-amber-950/20">
                  <Sun className="w-24 h-24 text-amber-400 animate-spin" style={{ animationDuration: '30s' }} />
                  <div className="absolute bottom-6 bg-slate-900/90 border border-amber-500/40 text-amber-400 text-xs px-4 py-1.5 rounded-full font-mono">
                    Dual-Axis Tilt Angle: {(simTime * 3.5).toFixed(1)}°
                  </div>
                </div>
              </div>
            )}

            {/* 3. ENERGY MONITORING */}
            {agent.id === 'energy-monitoring' && (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="relative w-full max-w-lg bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 text-white text-center">
                  <BarChart3 className="w-16 h-16 text-emerald-400 mx-auto mb-3 animate-pulse" />
                  <div className="text-3xl font-bold font-mono text-emerald-400 mb-1">2.4 TB/s Ingestion</div>
                  <p className="text-xs text-slate-400 mb-4">1,400,000 Realtime Telemetry Endpoints Scanned</p>
                  
                  {/* Waveform graphic */}
                  <div className="flex items-end justify-center gap-1.5 h-20 px-4 bg-slate-950 rounded-xl border border-slate-800">
                    {[40, 65, 80, 50, 90, 75, 45, 85, 95, 60, 70, 88, 55, 78, 92].map((height, idx) => (
                      <div
                        key={idx}
                        className="w-3 bg-emerald-500 rounded-t transition-all duration-300"
                        style={{ height: `${(height * (1 + Math.sin(simTime + idx))) / 2}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4. WATER MANAGEMENT */}
            {agent.id === 'water-management' && (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="relative w-full max-w-md bg-slate-900 border border-sky-500/30 rounded-2xl p-6 text-white text-center">
                  <Droplets className="w-16 h-16 text-sky-400 mx-auto mb-4 animate-pulse" />
                  <div className="text-3xl font-bold font-mono text-sky-400 mb-2">4.8 Bar Hydro-Pressure</div>
                  <p className="text-xs text-slate-400">Acoustic Pipe Leak Sensor Network: All 12,400 Nodes Sealed</p>
                  
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden mt-6">
                    <div className="bg-sky-500 h-full rounded-full transition-all duration-500" style={{ width: '88%' }} />
                  </div>
                </div>
              </div>
            )}

            {/* 5. WASTE MANAGEMENT */}
            {agent.id === 'waste-management' && (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="relative w-full max-w-lg bg-slate-900 border border-teal-500/30 rounded-2xl p-6 text-white text-center">
                  <Trash2 className="w-16 h-16 text-teal-400 mx-auto mb-3 animate-pulse" />
                  <div className="text-3xl font-bold font-mono text-teal-400 mb-2">42% Fleet Miles Saved</div>
                  <p className="text-xs text-slate-400 mb-4">Dynamic Route Generation Active for Electric Refuse Fleet</p>

                  <div className="grid grid-cols-3 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div>
                      <div className="text-[10px] text-slate-400">Zone A Fill</div>
                      <div className="text-base font-bold font-mono text-teal-400">84% (Routed)</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-mono">Zone B Fill</div>
                      <div className="text-base font-bold font-mono text-amber-400">42% (Standby)</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Zone C Fill</div>
                      <div className="text-base font-bold font-mono text-emerald-400">91% (Dispatched)</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 6. AIR POLLUTION */}
            {agent.id === 'air-pollution' && (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="relative w-full max-w-md bg-slate-900 border border-purple-500/30 rounded-2xl p-6 text-white text-center">
                  <Wind className="w-16 h-16 text-purple-400 mx-auto mb-3 animate-spin" style={{ animationDuration: '15s' }} />
                  <div className="text-3xl font-bold font-mono text-purple-400 mb-1">AQI 18 (Good)</div>
                  <p className="text-xs text-slate-400 mb-4">3D PM2.5 Aerosol Vector Mapping & Active Bio-Filter Towers</p>

                  <div className="flex items-center justify-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Clean Corridor Enforced Around All 48 School Zones</span>
                  </div>
                </div>
              </div>
            )}

            {/* 7. EV CHARGING */}
            {agent.id === 'ev-charging' && (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="relative w-full max-w-lg bg-slate-900 border border-indigo-500/30 rounded-2xl p-6 text-white text-center">
                  <Car className="w-16 h-16 text-indigo-400 mx-auto mb-3 animate-bounce" />
                  <div className="text-3xl font-bold font-mono text-indigo-400 mb-1">420 MW V2G Feed</div>
                  <p className="text-xs text-slate-400 mb-4">45,200 Connected Electric Vehicles Discharging into Reserve Grid</p>

                  <div className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800 text-left space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Bidirectional V2G Balance</span>
                      <span className="text-indigo-400 font-bold">+420.5 MW</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full animate-pulse" style={{ width: '92%' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 8. PREDICTIVE MAINTENANCE */}
            {agent.id === 'predictive-maintenance' && (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="relative w-full max-w-lg bg-slate-900 border border-rose-500/30 rounded-2xl p-6 text-white text-center">
                  <Wrench className="w-16 h-16 text-rose-400 mx-auto mb-3 animate-pulse" />
                  <div className="text-3xl font-bold font-mono text-rose-400 mb-1">0.00% Downtime</div>
                  <p className="text-xs text-slate-400 mb-4">84,000 Vibration & Thermal Telemetry Sensors Online</p>

                  <div className="grid grid-cols-2 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-left">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">RUL Horizon</div>
                      <div className="text-base font-bold font-mono text-emerald-400">99.7% Accuracy</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">Transformer #12</div>
                      <div className="text-base font-bold font-mono text-blue-400">Nominal Spectrum</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 9. DIGITAL TWIN */}
            {agent.id === 'digital-twin' && (
              <div className="w-full h-full flex flex-col items-center justify-center text-center">
                <div className="relative w-full max-w-lg bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 text-white">
                  <Globe className="w-16 h-16 text-cyan-400 mx-auto mb-3 animate-spin" style={{ animationDuration: '25s' }} />
                  <div className="text-3xl font-bold font-mono text-cyan-400 mb-1">100,000x Sim Speed</div>
                  <p className="text-xs text-slate-400 mb-4">1 mm LiDAR Spatial Resolution & 50-Year Horizon Time Machine</p>

                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Scenario Time Horizon:</span>
                    <span className="text-cyan-400 font-bold">+50 Years (Climate Stress Test)</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
            <div>
              <div className="text-xs text-slate-400 font-medium mb-2 uppercase tracking-wider">Autonomous Capabilities</div>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-200">
                {agent.capabilities.map((cap, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="truncate">{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs text-slate-400 font-medium mb-2 uppercase tracking-wider">Live Metrics</div>
              <div className="grid grid-cols-3 gap-2">
                {agent.metrics.map((m, i) => (
                  <div key={i} className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-500">{m.label}</div>
                    <div className="text-sm font-bold text-white font-mono">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </>
      )}

        </div>

      </div>
    </div>
  );
};

