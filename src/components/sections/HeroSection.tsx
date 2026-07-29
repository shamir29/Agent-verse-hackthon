import React from 'react';
import { 
  Zap, 
  Activity, 
  ShieldCheck, 
  ArrowRight, 
  Play, 
  Sliders, 
  CheckCircle2, 
  BatteryCharging,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { useGrid } from '../../context/GridContext';
import { InteractiveGridCanvas } from '../canvas/InteractiveGridCanvas';

interface HeroSectionProps {
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  const { telemetry, triggerFaultSimulation } = useGrid();

  return (
    <section id="hero" className="relative pt-8 pb-16 md:pt-12 md:pb-24 bg-white overflow-hidden">
      
      {/* Background Decorative Ambient Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-50/60 via-slate-50/30 to-transparent pointer-events-none -z-10 rounded-b-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Ecosystem Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm hover:border-blue-300 transition-colors">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span>NeuraGrid.ai Smart City Ecosystem</span>
            <span className="text-slate-300">|</span>
            <span className="text-blue-600 font-bold">Autonomous Smart Grid AI Agent v4.8</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
            The Autonomous Intelligence Behind <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">Tomorrow's Power Grid</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
            Monitor, predict, balance, and optimize electricity distribution across the city using autonomous AI agents operating in real time.
          </p>

          {/* Primary & Secondary CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#grid-map"
              className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-lg shadow-blue-500/25 transition-all transform hover:scale-[1.02]"
            >
              <Zap className="w-5 h-5 fill-white" />
              <span>Monitor Grid</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onExploreClick}
              className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-base shadow-sm transition-all transform hover:scale-[1.02]"
            >
              <Sliders className="w-5 h-5 text-slate-600" />
              <span>Explore Infrastructure</span>
            </button>

            <button
              onClick={() => triggerFaultSimulation('transformer_overload')}
              className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-medium text-sm transition-all"
            >
              <Play className="w-4 h-4 fill-amber-600 text-amber-600" />
              <span>Simulate Grid Overload</span>
            </button>
          </div>
        </div>

        {/* Cinematic Grid Interactive Canvas Backdrop */}
        <div className="mt-12 relative">
          <div className="absolute -top-3 left-6 z-10 inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/90 border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-md">
            <Cpu className="w-3.5 h-3.5 text-blue-600 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Interactive Autonomous Topology Visualizer</span>
            <span className="text-emerald-600 font-bold">• 60 FPS Engine</span>
          </div>

          <InteractiveGridCanvas height={480} />
        </div>

        {/* Live KPI Strip */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          
          <div className="p-4 rounded-[20px] bg-slate-50 border border-slate-200/80 shadow-apple hover:border-blue-200 transition-all">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider">Grid Stability</span>
              <Activity className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900">{telemetry.gridStability}%</div>
            <div className="text-[11px] font-medium text-emerald-600 mt-1 flex items-center">
              <CheckCircle2 className="w-3 h-3 mr-1" /> Frequency Normal
            </div>
          </div>

          <div className="p-4 rounded-[20px] bg-slate-50 border border-slate-200/80 shadow-apple hover:border-blue-200 transition-all">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider">Current Demand</span>
              <Zap className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">{telemetry.currentDemandGW} <span className="text-sm font-normal text-slate-500">GW</span></div>
            <div className="text-[11px] font-medium text-slate-500 mt-1">Real-time City Load</div>
          </div>

          <div className="p-4 rounded-[20px] bg-slate-50 border border-slate-200/80 shadow-apple hover:border-blue-200 transition-all">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Supply</span>
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">{telemetry.totalSupplyGW} <span className="text-sm font-normal text-slate-500">GW</span></div>
            <div className="text-[11px] font-medium text-emerald-600 mt-1">+0.28 GW Headroom</div>
          </div>

          <div className="p-4 rounded-[20px] bg-slate-50 border border-slate-200/80 shadow-apple hover:border-blue-200 transition-all">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider">Renewable %</span>
              <BatteryCharging className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-emerald-600">{telemetry.renewablePercent}%</div>
            <div className="text-[11px] font-medium text-slate-500 mt-1">Solar + Wind + Hydro</div>
          </div>

          <div className="p-4 rounded-[20px] bg-slate-50 border border-slate-200/80 shadow-apple hover:border-blue-200 transition-all">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider">Substations</span>
              <ShieldCheck className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">{telemetry.activeSubstations} / {telemetry.totalSubstations}</div>
            <div className="text-[11px] font-medium text-emerald-600 mt-1">100% Online</div>
          </div>

          <div className="p-4 rounded-[20px] bg-slate-50 border border-slate-200/80 shadow-apple hover:border-blue-200 transition-all">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider">Health Score</span>
              <Activity className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">{telemetry.healthScore} <span className="text-sm font-normal text-slate-400">/100</span></div>
            <div className="text-[11px] font-medium text-emerald-600 mt-1">Optimal Health</div>
          </div>

        </div>

      </div>
    </section>
  );
};
