import React from 'react';
import { AGENT_CARDS } from '../../data/mockData';
import type { AgentCard } from '../../types';
import { soundFX } from '../../utils/soundFX';
import { 
  Zap, Sun, BarChart3, Droplets, Trash2, Wind, Car, Wrench, Globe, ArrowRight, Sparkles 
} from 'lucide-react';

interface AgentWorkforceProps {
  onSelectAgent: (agent: AgentCard) => void;
}

export const AgentWorkforce: React.FC<AgentWorkforceProps> = ({ onSelectAgent }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-6 h-6 text-blue-600" />;
      case 'Sun': return <Sun className="w-6 h-6 text-amber-500" />;
      case 'BarChart3': return <BarChart3 className="w-6 h-6 text-emerald-600" />;
      case 'Droplets': return <Droplets className="w-6 h-6 text-sky-600" />;
      case 'Trash2': return <Trash2 className="w-6 h-6 text-teal-600" />;
      case 'Wind': return <Wind className="w-6 h-6 text-purple-600" />;
      case 'Car': return <Car className="w-6 h-6 text-indigo-600" />;
      case 'Wrench': return <Wrench className="w-6 h-6 text-rose-600" />;
      case 'Globe': return <Globe className="w-6 h-6 text-cyan-600" />;
      default: return <Sparkles className="w-6 h-6 text-blue-600" />;
    }
  };

  const handleCardClick = (agent: AgentCard) => {
    soundFX.playMorph();
    onSelectAgent(agent);
  };

  return (
    <section id="workforce" className="w-full min-h-screen py-32 px-6 md:px-12 bg-[#FAFAFA] flex flex-col justify-center select-none">
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="linear-badge mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Autonomous Intelligence Swarm</span>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.02] mb-6">
            Meet Your AI Workforce
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
            Nine specialized autonomous agents working in zero-latency consensus to monitor, balance, and optimize every square meter of your city.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AGENT_CARDS.map((agent, index) => (
            <div
              key={agent.id}
              onMouseEnter={() => soundFX.playHover()}
              onClick={() => handleCardClick(agent)}
              className={`apple-card p-8 flex flex-col justify-between relative overflow-hidden cursor-pointer group transition-all duration-500 min-h-[380px] ${
                index % 2 === 0 ? 'animate-float' : 'animate-float-reverse'
              }`}
              style={{ animationDelay: `${index * 0.4}s` }}
            >
              <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${agent.bgGradient} rounded-full blur-3xl opacity-60 group-hover:scale-150 transition-transform duration-700 pointer-events-none`} />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-md shadow-slate-900/5 flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                    {getIcon(agent.icon)}
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 bg-slate-100/80 px-3 py-1 rounded-full">
                    {agent.category}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-2 group-hover:text-blue-600 transition-colors">
                  {agent.name}
                </h3>
                <p className="text-sm font-medium text-slate-500 mb-6">
                  {agent.tagline}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                  {agent.description}
                </p>
              </div>

              <div>
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 mb-6">
                  {agent.metrics.slice(0, 2).map((m, i) => (
                    <div key={i}>
                      <div className="text-[11px] text-slate-400 font-medium">{m.label}</div>
                      <div className="text-base font-bold text-slate-900">{m.value}</div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundFX.playClick();
                    handleCardClick(agent);
                  }}
                  className="w-full py-3 px-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-blue-500/20 group-hover:scale-[1.02]"
                >
                  <span>Launch Agent Suite</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
