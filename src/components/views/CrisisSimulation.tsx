import React from 'react';
import { CRISIS_SCENARIOS } from '../../data/mockData';
import type { CrisisType } from '../../types';
import { soundFX } from '../../utils/soundFX';
import { 
  Flame, CloudRain, ZapOff, BatteryWarning, Droplet, Moon, AlertTriangle, ShieldCheck, Activity, Play 
} from 'lucide-react';

interface CrisisSimulationProps {
  activeCrisis: CrisisType | null;
  onTriggerCrisis: (crisis: CrisisType | null) => void;
}

export const CrisisSimulation: React.FC<CrisisSimulationProps> = ({
  activeCrisis,
  onTriggerCrisis
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-5 h-5 text-amber-500" />;
      case 'CloudRain': return <CloudRain className="w-5 h-5 text-blue-500" />;
      case 'ZapOff': return <ZapOff className="w-5 h-5 text-rose-500" />;
      case 'BatteryWarning': return <BatteryWarning className="w-5 h-5 text-purple-500" />;
      case 'Droplet': return <Droplet className="w-5 h-5 text-sky-500" />;
      case 'Moon': return <Moon className="w-5 h-5 text-indigo-500" />;
      default: return <AlertTriangle className="w-5 h-5 text-rose-500" />;
    }
  };

  const currentScenario = CRISIS_SCENARIOS.find(c => c.id === activeCrisis);

  const handleSelectCrisis = (id: CrisisType) => {
    if (activeCrisis === id) {
      soundFX.playClick();
      onTriggerCrisis(null);
    } else {
      soundFX.playCrisis();
      onTriggerCrisis(id);
    }
  };

  return (
    <section id="simulation" className="w-full min-h-screen py-32 px-6 md:px-12 bg-white flex flex-col justify-center select-none border-t border-slate-100">
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="linear-badge bg-rose-50 border-rose-200 text-rose-700 mb-4">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Interactive City Disaster Simulator</span>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.02] mb-6">
            Real-Time Resilience Engine
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed">
            Test NeuraGrid AI against catastrophic urban crises. Select a scenario below to observe real-time automated load rerouting, emergency isolation, and zero-blackout guarantees.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {CRISIS_SCENARIOS.map(crisis => {
            const isActive = activeCrisis === crisis.id;
            return (
              <button
                key={crisis.id}
                onClick={() => handleSelectCrisis(crisis.id)}
                className={`apple-card p-5 text-left flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                  isActive ? 'ring-2 ring-rose-500 bg-rose-50/30 shadow-lg' : 'hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                    {getIcon(crisis.icon)}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    crisis.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-700' :
                    crisis.severity === 'HIGH' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {crisis.severity}
                  </span>
                </div>

                <div className="font-bold text-sm text-slate-900 leading-snug mb-2">
                  {crisis.title.split('(')[0]}
                </div>
                <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                  <span>{isActive ? 'Simulating...' : 'Click to Inject'}</span>
                  <Play className="w-3 h-3 text-blue-600 fill-current" />
                </div>
              </button>
            );
          })}
        </div>

        {currentScenario ? (
          <div className="apple-card p-8 bg-slate-900 text-white rounded-[24px] border border-slate-800 animate-fade-in shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                  <AlertTriangle className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-rose-400 font-bold">Active Event Simulation</div>
                  <h3 className="text-2xl font-bold text-white">{currentScenario.title}</h3>
                </div>
              </div>

              <button
                onClick={() => onTriggerCrisis(null)}
                className="px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
              >
                Reset Simulation
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">Grid Load Impact</div>
                <div className="text-lg font-bold text-amber-400 font-mono">{currentScenario.impactMetrics.gridLoad}</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">Solar Output</div>
                <div className="text-lg font-bold text-sky-400 font-mono">{currentScenario.impactMetrics.solarCap}</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">Water Network</div>
                <div className="text-lg font-bold text-blue-400 font-mono">{currentScenario.impactMetrics.waterPressure}</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">EV Fleet Buffer</div>
                <div className="text-lg font-bold text-emerald-400 font-mono">{currentScenario.impactMetrics.evStatus}</div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-blue-950/40 border border-blue-800/60 flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
                  NeuraGrid AI Autonomous Mitigation Response:
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-mono">
                  {currentScenario.aiResponseAction}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="apple-card p-12 text-center bg-slate-50 border border-dashed border-slate-300">
            <Activity className="w-12 h-12 text-slate-400 mx-auto mb-4 animate-pulse" />
            <h4 className="text-xl font-bold text-slate-800 mb-2">City Infrastructure Operating Nominally</h4>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Select any of the 6 urban crisis scenario cards above to observe live automated AI mitigation routines.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
