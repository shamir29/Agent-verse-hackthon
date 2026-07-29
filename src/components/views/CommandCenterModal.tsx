import React, { useState } from 'react';
import { soundFX } from '../../utils/soundFX';
import { X, Terminal, ShieldCheck, Radio, Eye } from 'lucide-react';
import { AGENT_CARDS } from '../../data/mockData';
import type { AgentCard } from '../../types';

interface CommandCenterModalProps {
  onClose: () => void;
  onSelectAgent?: (agent: AgentCard) => void;
}

export const CommandCenterModal: React.FC<CommandCenterModalProps> = ({ onClose, onSelectAgent }) => {
  const [isEmergencyOverride, setIsEmergencyOverride] = useState(false);
  const [activeFilterId, setActiveFilterId] = useState<string | null>(null);

  const handleClose = () => {
    soundFX.playClick();
    onClose();
  };

  const handleToggleEmergency = () => {
    soundFX.playCrisis();
    setIsEmergencyOverride(!isEmergencyOverride);
  };

  const handleAgentClick = (agent: AgentCard) => {
    soundFX.playClick();
    if (activeFilterId === agent.id) {
      setActiveFilterId(null);
    } else {
      setActiveFilterId(agent.id);
    }
  };

  const handleInspectAgent = (e: React.MouseEvent, agent: AgentCard) => {
    e.stopPropagation();
    soundFX.playMorph();
    onClose();
    if (onSelectAgent) {
      onSelectAgent(agent);
    }
  };

  const logs = [
    { id: 'smart-grid', color: 'text-emerald-400', time: '[16:00:21.042]', tag: '[SMART_GRID]', text: 'Hydro generation balanced against solar duck curve (+120 MW).' },
    { id: 'solar-optimization', color: 'text-blue-400', time: '[16:00:21.085]', tag: '[SOLAR_OPT]', text: 'Cloud vector prediction: shifting dual-axis angle by +2.4°.' },
    { id: 'water-management', color: 'text-slate-300', time: '[16:00:21.120]', tag: '[WATER_MGMT]', text: 'District 4 pump synchronized to off-peak hydro tariff.' },
    { id: 'ev-charging', color: 'text-purple-400', time: '[16:00:21.198]', tag: '[EV_CHARGING]', text: 'Vehicle-to-grid (V2G) discharging 420 MW into municipal reserve.' },
    { id: 'predictive-maintenance', color: 'text-amber-400', time: '[16:00:21.250]', tag: '[PRED_MAINT]', text: 'Transformer #12 bearing vibration spectrum normal.' },
    { id: 'waste-management', color: 'text-teal-400', time: '[16:00:21.310]', tag: '[WASTE_MGMT]', text: 'Ultrasonic fill sensor in District 2 triggers EV refuse route.' },
    { id: 'air-pollution', color: 'text-indigo-400', time: '[16:00:21.385]', tag: '[AIR_POLLUTION]', text: 'PM2.5 bio-filter mist tower activated; school zone AQI cleared to 16.' },
    { id: 'energy-monitoring', color: 'text-sky-400', time: '[16:00:21.440]', tag: '[ENERGY_MONITOR]', text: 'Telemetry sync clean across 1.4M endpoints (2.4 TB/s throughput).' },
    { id: 'digital-twin', color: 'text-cyan-400', time: '[16:00:21.512]', tag: '[DIGITAL_TWIN]', text: '1mm spatial LiDAR consensus frame rendered at 60 FPS.' }
  ];

  const filteredLogs = activeFilterId ? logs.filter(l => l.id === activeFilterId) : logs;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-950/90 backdrop-blur-2xl animate-fade-in select-none">
      <div className="relative w-full max-w-6xl h-[90vh] bg-slate-900 text-white rounded-[24px] shadow-2xl border border-slate-800 flex flex-col justify-between overflow-hidden">
        
        <div className="p-6 px-8 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">NeuraGrid AI Autonomous Command Center</h3>
                <span className="linear-badge bg-blue-950 text-blue-400 border-blue-800 text-[11px] py-0.5 px-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping mr-1" />
                  Kernel v4.0.8 Live
                </span>
              </div>
              <p className="text-xs text-slate-400">Direct Municipal Control Mesh Interface</p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto">
          
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              <span>Workforce Swarm (9 Agents)</span>
              {activeFilterId && (
                <button
                  onClick={() => setActiveFilterId(null)}
                  className="text-[10px] text-blue-400 hover:underline cursor-pointer"
                >
                  Clear Filter
                </button>
              )}
            </div>

            <div className="space-y-2 max-h-[440px] overflow-y-auto pr-1">
              {AGENT_CARDS.map(agent => {
                const isFiltered = activeFilterId === agent.id;
                return (
                  <div
                    key={agent.id}
                    onClick={() => handleAgentClick(agent)}
                    className={`p-3 rounded-2xl bg-slate-950 border transition-all cursor-pointer flex items-center justify-between group ${
                      isFiltered ? 'border-blue-500 bg-blue-950/30' : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: agent.color }} />
                      <div>
                        <div className="text-xs font-bold text-slate-200 group-hover:text-blue-400 transition-colors">{agent.name}</div>
                        <div className="text-[10px] text-slate-500">{agent.category}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-900">
                        NOMINAL
                      </span>
                      {onSelectAgent && (
                        <button
                          onClick={(e) => handleInspectAgent(e, agent)}
                          className="p-1 rounded bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white transition-colors cursor-pointer"
                          title="Deep Dive Inspection"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">City Power Frequency</div>
                <div className="text-2xl font-bold font-mono text-blue-400">60.000 Hz</div>
                <div className="text-[10px] text-emerald-400 mt-1">✓ ±0.001 Hz Deviation</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">Microgrid Response Time</div>
                <div className="text-2xl font-bold font-mono text-emerald-400">3.8 ms</div>
                <div className="text-[10px] text-slate-500 mt-1">Zero latency mode</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">Consensus Safety Score</div>
                <div className="text-2xl font-bold font-mono text-amber-400">100 / 100</div>
                <div className="text-[10px] text-emerald-400 mt-1">Formally Verified</div>
              </div>
            </div>

            <div className="flex-1 p-6 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-3 min-h-[220px] overflow-y-auto">
              <div className="flex items-center justify-between text-slate-500 pb-2 border-b border-slate-900">
                <span>SYSTEM CONSENSUS STREAM {activeFilterId ? `(FILTERED: ${activeFilterId.toUpperCase()})` : ''}</span>
                <Radio className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              </div>

              {filteredLogs.map((log, index) => (
                <div key={index} className={log.color}>
                  {log.time} {log.tag} {log.text}
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-blue-400" />
                <div>
                  <div className="text-xs font-bold text-white">Manual Agent Override Lock</div>
                  <div className="text-[11px] text-slate-400">NeuraGrid AI handles 100% of decisions automatically by default</div>
                </div>
              </div>

              <button
                onClick={handleToggleEmergency}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  isEmergencyOverride
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {isEmergencyOverride ? 'OVERRIDE ENGAGED' : 'ENGAGE MANUAL LOCK'}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
