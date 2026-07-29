import React, { useState } from 'react';
import { NeuralSphere } from '../3d/NeuralSphere';
import { AGENT_CARDS } from '../../data/mockData';
import type { AgentCard } from '../../types';
import { soundFX } from '../../utils/soundFX';
import { Brain, Activity, ShieldCheck } from 'lucide-react';

interface NeuralOrchestratorProps {
  onSelectAgent?: (agent: AgentCard) => void;
}

export const NeuralOrchestrator: React.FC<NeuralOrchestratorProps> = ({ onSelectAgent }) => {
  const [activeAgentId, setActiveAgentId] = useState<string | null>(null);

  const handleAgentClick = (agent: AgentCard) => {
    soundFX.playClick();
    if (onSelectAgent) {
      onSelectAgent(agent);
    }
  };

  return (
    <section id="orchestrator" className="w-full min-h-screen py-32 px-6 md:px-12 bg-[#FAFAFA] flex flex-col justify-center select-none border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="linear-badge mb-4">
            <Brain className="w-4 h-4 text-blue-600 animate-pulse" />
            <span>Central Brain Architecture</span>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.02] mb-6">
            The AI Orchestrator
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed">
            Every autonomous agent continuously exchanges state vectors across a high-speed neural mesh, establishing real-time urban consensus. Click any node to inspect telemetry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 apple-card p-6 bg-white flex flex-col items-center justify-center relative overflow-hidden min-h-[520px]">
            <div className="absolute top-6 left-6 linear-badge">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              <span>Living 3D Consensus Graph</span>
            </div>
            
            <NeuralSphere activeAgentId={activeAgentId} onSelectAgent={onSelectAgent} />

            <div className="text-xs text-slate-400 font-mono text-center mt-4">
              Pulsing energy channels transmit 45,000 state vectors/sec
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" />
              <span>Real-Time Inter-Agent Collaboration</span>
            </h3>

            <div className="max-h-[380px] overflow-y-auto pr-2 space-y-3">
              {AGENT_CARDS.map((agent, i) => (
                <div
                  key={agent.id}
                  onMouseEnter={() => {
                    setActiveAgentId(agent.id);
                    soundFX.playHover();
                  }}
                  onMouseLeave={() => setActiveAgentId(null)}
                  onClick={() => handleAgentClick(agent)}
                  className={`apple-card p-4 transition-all duration-300 cursor-pointer ${
                    activeAgentId === agent.id ? 'ring-2 ring-blue-500 bg-blue-50/20 translate-x-2' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: agent.color }} />
                      <span className="font-bold text-slate-900 text-sm">{agent.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">Node #{i + 1}</span>
                  </div>
                  <p className="text-xs text-slate-600 font-mono leading-relaxed truncate">
                    ⇄ Sharing telemetry ({agent.metrics[0].label}: {agent.metrics[0].value})
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-xs text-emerald-800 font-medium">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>Formally verified zero-blackout safety proof validated across all 9 agent nodes.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
