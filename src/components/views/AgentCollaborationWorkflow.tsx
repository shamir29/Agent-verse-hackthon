import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, Zap, BarChart3, Globe, Sun, Wrench, Droplets, Trash2, Wind, Car, ArrowRight, ShieldCheck } from 'lucide-react';
import { soundFX } from '../../utils/soundFX';
import type { AgentCard } from '../../types';
import { AGENT_CARDS } from '../../data/mockData';

interface AgentCollaborationWorkflowProps {
  onSelectAgent?: (agent: AgentCard) => void;
}

export const AgentCollaborationWorkflow: React.FC<AgentCollaborationWorkflowProps> = ({ onSelectAgent }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const workflowSteps = [
    {
      id: 'smart-grid',
      name: 'Smart Grid AI',
      icon: Zap,
      color: '#2563EB',
      output: 'Load reroute vector (4.2 GW peak balance)',
      transfersTo: 'Energy Monitoring',
      metric: '60.000 Hz'
    },
    {
      id: 'energy-monitoring',
      name: 'Energy Monitoring AI',
      icon: BarChart3,
      color: '#16A34A',
      output: '2.4 TB/s smart meter carbon index',
      transfersTo: 'Digital Twin',
      metric: '1.4M Endpoints'
    },
    {
      id: 'digital-twin',
      name: 'Digital Twin AI',
      icon: Globe,
      color: '#0284C7',
      output: '1 mm spatial thermal digital replica',
      transfersTo: 'Solar Optimization',
      metric: '100,000x Sim Speed'
    },
    {
      id: 'solar-optimization',
      name: 'Solar Optimization AI',
      icon: Sun,
      color: '#F59E0B',
      output: 'Dual-axis phototropic tracker shift',
      transfersTo: 'Predictive Maintenance',
      metric: '+31.4% Yield'
    },
    {
      id: 'predictive-maintenance',
      name: 'Predictive Maintenance AI',
      icon: Wrench,
      color: '#DC2626',
      output: 'Vibration & RUL acoustic health score',
      transfersTo: 'Water Management',
      metric: '99.7% RUL'
    },
    {
      id: 'water-management',
      name: 'Water Management AI',
      icon: Droplets,
      color: '#0284C7',
      output: 'Subterranean pressure pipe valve lock',
      transfersTo: 'Waste Management',
      metric: '4.8 Bar'
    },
    {
      id: 'waste-management',
      name: 'Waste Management AI',
      icon: Trash2,
      color: '#059669',
      output: 'Ultrasonic container fill route dispatch',
      transfersTo: 'Air Pollution',
      metric: '-42% Fleet Mi'
    },
    {
      id: 'air-pollution',
      name: 'Air Pollution AI',
      icon: Wind,
      color: '#8B5CF6',
      output: '3D aerosol vector bio-filter mist tower',
      transfersTo: 'EV Charging Network',
      metric: 'AQI 18 (Good)'
    },
    {
      id: 'ev-charging',
      name: 'EV Charging Network AI',
      icon: Car,
      color: '#2563EB',
      output: 'Bidirectional V2G battery buffer feed',
      transfersTo: 'Smart Grid AI (Consensus Loop)',
      metric: '420 MW Discharge'
    }
  ];

  return (
    <section className="w-full py-32 px-6 md:px-12 bg-[#FAFAFA] select-none border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="linear-badge mb-4">
            <Network className="w-4 h-4 text-blue-600 animate-pulse" />
            <span>Zero-Latency Inter-Agent Mesh</span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.02] mb-6">
            Autonomous Collaboration Pipeline
          </h2>
          <p className="text-lg text-slate-600 font-normal leading-relaxed">
            Observe how state vectors flow seamlessly across all 9 agents in deterministic sequence to maintain 100% municipal zero-blackout reliability.
          </p>
        </div>

        {/* Workflow Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === index;
            const matchedAgent = AGENT_CARDS.find(a => a.id === step.id);
            return (
              <motion.div
                key={step.id}
                onClick={() => {
                  soundFX.playHover();
                  setActiveStep(index);
                  if (matchedAgent && onSelectAgent) {
                    onSelectAgent(matchedAgent);
                  }
                }}
                className={`apple-card p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                  isActive ? 'ring-2 ring-blue-500 bg-blue-50/20 translate-y--1 shadow-xl' : 'hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center">
                      <Icon className="w-5 h-5" style={{ color: step.color }} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                      Step 0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1">{step.name}</h3>
                  <p className="text-xs text-slate-500 font-mono mb-4">
                    Live Status: <span className="font-bold text-slate-800">{step.metric}</span>
                  </p>

                  <div className="bg-white p-3 rounded-xl border border-slate-100 text-xs font-mono text-slate-600 mb-4">
                    <div className="text-[10px] text-slate-400 uppercase mb-1">State Vector Output</div>
                    <div>{step.output}</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                    <span>To:</span>
                    <span className="font-bold text-slate-800">{step.transfersTo.split(' ')[0]}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundFX.playClick();
                      if (matchedAgent && onSelectAgent) {
                        onSelectAgent(matchedAgent);
                      }
                    }}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>Run Suite</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Summary Banner */}
        <div className="mt-12 p-6 apple-card bg-slate-900 text-white rounded-3xl border border-slate-800 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <div>
              <div className="text-sm font-bold">Consensus Pipeline Active</div>
              <div className="text-xs text-slate-400 font-mono">
                {workflowSteps[activeStep].name} passing state vector to {workflowSteps[activeStep].transfersTo} with zero latency.
              </div>
            </div>
          </div>

          <div className="linear-badge bg-blue-950 border-blue-800 text-blue-400 font-mono text-xs">
            Consensus Verified: 100%
          </div>
        </div>

      </div>
    </section>
  );
};
