import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitCommit, ArrowRight, ShieldCheck, Zap, Droplets, Sun, Activity, CheckCircle2, Clock } from 'lucide-react';
import { soundFX } from '../../utils/soundFX';

export const MissionTimeline: React.FC = () => {
  const [selectedCommit, setSelectedCommit] = useState<number>(0);

  const decisions = [
    {
      time: '16:04:12',
      agent: 'Smart Grid AI',
      color: '#2563EB',
      action: 'Phase Angle Synchronization (+120 MW Rerouted)',
      reason: 'Industrial duck-curve demand spike detected in District 4 substation.',
      confidence: '99.98%',
      status: 'EXECUTED',
      details: 'Diverted 120 MW from secondary steel smelting arc to residential grid within 3.8ms.'
    },
    {
      time: '16:03:45',
      agent: 'Solar Optimization AI',
      color: '#F59E0B',
      action: 'Photovoltaic Array Tilt Shift (+4.2° East)',
      reason: 'Predictive aerosol cloud vector trajectory shift over Solar Array Alpha.',
      confidence: '99.42%',
      status: 'EXECUTED',
      details: 'Adjusted 12,000 dual-axis motor trackers to intercept indirect sky radiation.'
    },
    {
      time: '16:02:19',
      agent: 'Water Management AI',
      color: '#0284C7',
      action: 'Hydro-Pressure Valve Modulation (CV-84 Bypass)',
      reason: 'Acoustic micro-resonance frequency anomaly in subterranean pipe #14.',
      confidence: '100.00%',
      status: 'VERIFIED',
      details: 'Iso-pressurized loop 3B; sealed 4.8 Bar hydraulic line preventing main burst.'
    },
    {
      time: '16:01:04',
      agent: 'EV Mobility AI',
      color: '#8B5CF6',
      action: 'V2G Fleet Discharging Engaged (420 MW Delivered)',
      reason: 'Peak cooling load surge across commercial high-rises.',
      confidence: '98.85%',
      status: 'ACTIVE',
      details: 'Aggregated reserve power from 45,200 connected EVs at municipal fast stations.'
    },
    {
      time: '15:58:30',
      agent: 'Predictive Maintenance AI',
      color: '#DC2626',
      action: 'Substation Transformer #12 Thermal Shroud Active',
      reason: 'Ultrasonic bearing vibration spectrum reached warning threshold.',
      confidence: '99.70%',
      status: 'COMPLETED',
      details: 'Engaged active liquid-nitrogen cooling loop; RUL extended by +1,200 hours.'
    }
  ];

  return (
    <section id="timeline" className="w-full py-32 px-6 md:px-12 bg-white select-none border-t border-slate-100">
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="linear-badge bg-blue-50 text-blue-700 border-blue-200 mb-4">
            <GitCommit className="w-4 h-4 text-blue-600" />
            <span>Deterministic Consensus History</span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.02] mb-6">
            Real-Time Decision Tree
          </h2>
          <p className="text-lg text-slate-600 font-normal leading-relaxed">
            Every autonomous municipal action is logged in an immutable, formally verified consensus tree. Click any entry to inspect AI reasoning chains.
          </p>
        </div>

        {/* Horizontal Timeline Bar */}
        <div className="relative mb-12 overflow-x-auto pb-4">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />

          <div className="relative z-10 flex items-center justify-between min-w-[700px] px-8">
            {decisions.map((d, index) => {
              const isSelected = selectedCommit === index;
              return (
                <button
                  key={index}
                  onClick={() => {
                    soundFX.playClick();
                    setSelectedCommit(index);
                  }}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div
                    className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
                      isSelected
                        ? 'bg-blue-600 border-blue-600 ring-4 ring-blue-100 scale-125'
                        : 'bg-white border-slate-300 group-hover:border-blue-500'
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>

                  <span className={`text-xs font-mono font-bold mt-3 transition-colors ${
                    isSelected ? 'text-blue-600 font-extrabold' : 'text-slate-500 group-hover:text-slate-900'
                  }`}>
                    {d.time}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">{d.agent.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Decision Card */}
        <motion.div
          key={selectedCommit}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="apple-card p-8 bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-2xl"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: decisions[selectedCommit].color }} />
              <div>
                <div className="text-xs uppercase font-mono tracking-wider text-slate-400">
                  {decisions[selectedCommit].agent} • {decisions[selectedCommit].time}
                </div>
                <h3 className="text-2xl font-bold text-white mt-0.5">
                  {decisions[selectedCommit].action}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-full">
                Confidence: {decisions[selectedCommit].confidence}
              </span>
              <span className="text-xs font-mono text-blue-400 bg-blue-950/80 border border-blue-800 px-3 py-1 rounded-full">
                {decisions[selectedCommit].status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>Trigger Reasoning</span>
              </div>
              <p className="text-sm text-slate-300 font-mono leading-relaxed">
                {decisions[selectedCommit].reason}
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Deterministic Execution Proof</span>
              </div>
              <p className="text-sm text-slate-300 font-mono leading-relaxed">
                {decisions[selectedCommit].details}
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
