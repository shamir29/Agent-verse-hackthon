import React from 'react';
import { SmartCityCanvas } from '../3d/SmartCityCanvas';
import { MagneticButton } from '../ui/MagneticButton';
import { ArrowDown, Sparkles, Activity, ShieldCheck, Zap } from 'lucide-react';
import type { CrisisType } from '../../types';

interface HeroSectionProps {
  isNight: boolean;
  activeCrisis: CrisisType | null;
  selectedAgentId?: string | null;
  onExploreCity: () => void;
  onOpenCommandCenter?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  isNight,
  activeCrisis,
  selectedAgentId,
  onExploreCity,
  onOpenCommandCenter
}) => {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 overflow-hidden select-none">
      {/* Background 3D Canvas with controlled opacity */}
      <div className="absolute inset-0 z-0 opacity-90 pointer-events-auto">
        <SmartCityCanvas isNight={isNight} activeCrisis={activeCrisis} selectedAgentId={selectedAgentId} />
      </div>

      {/* Hero Central Text Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center justify-center my-auto py-8 pointer-events-none">
        
        {/* Floating Release Badge */}
        <div className="linear-badge mb-6 animate-float shadow-sm pointer-events-auto">
          <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
          <span>NeuraGrid 4.0 Autonomous OS</span>
          <span className="text-slate-400 font-mono">|</span>
          <span className="text-blue-600 font-semibold">9-Agent Swarm Active</span>
        </div>

        {/* Massive Headline formatted for zero overflow */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-slate-900 leading-[1.0] mb-6 drop-shadow-sm pointer-events-auto">
          The Autonomous Operating System <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
            for Tomorrow's Cities
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed mb-8 pointer-events-auto">
          Nine intelligent AI agents continuously monitor, predict, optimize and protect every layer of urban infrastructure.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
          <MagneticButton size="lg" onClick={onExploreCity}>
            <span>Explore City</span>
            <ArrowDown className="w-4 h-4 ml-2 animate-bounce" />
          </MagneticButton>

          {onOpenCommandCenter && (
            <button
              onClick={onOpenCommandCenter}
              className="px-6 py-3.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-sm font-semibold transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-blue-400" />
              <span>Launch Command Center</span>
            </button>
          )}
        </div>
      </div>

      {/* Hero Bottom Telemetry Grid */}
      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pointer-events-auto">
        <div className="apple-card p-4 flex items-center gap-3.5 bg-white/95 backdrop-blur-md">
          <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-medium">Grid Stability</div>
            <div className="text-lg font-bold text-slate-900">99.998%</div>
          </div>
        </div>

        <div className="apple-card p-4 flex items-center gap-3.5 bg-white/95 backdrop-blur-md">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-medium">Auto Isolation</div>
            <div className="text-lg font-bold text-slate-900">&lt; 4.2 ms</div>
          </div>
        </div>

        <div className="apple-card p-4 flex items-center gap-3.5 bg-white/95 backdrop-blur-md">
          <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-medium">Solar Yield</div>
            <div className="text-lg font-bold text-slate-900">98.9%</div>
          </div>
        </div>

        <div className="apple-card p-4 flex items-center gap-3.5 bg-white/95 backdrop-blur-md">
          <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-medium">Carbon Offset</div>
            <div className="text-lg font-bold text-slate-900">42.1K Tons</div>
          </div>
        </div>
      </div>
    </section>
  );
};
