import React, { useState } from 'react';
import { Cpu, Zap, CheckCircle2, AlertCircle } from 'lucide-react';

export const GridLoadOptimization: React.FC = () => {
  const [aiMode, setAiMode] = useState<'ai_active' | 'unmanaged'>('ai_active');

  const activeLoad = aiMode === 'ai_active' ? 2450 : 3850;
  const capacityKw = 4000;
  const utilizationPct = Math.round((activeLoad / capacityKw) * 100);

  return (
    <section id="grid-load" className="w-full py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-600">
              <Cpu className="w-4 h-4" />
              <span>Smart City Substation Load Balancer</span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Grid Load Optimization
            </h2>
            <p className="mt-2 text-slate-600 max-w-2xl text-base font-medium">
              Predictive AI peak shaving shifts EV charging demand away from grid bottlenecks, preventing transformer overloads and reducing electricity costs.
            </p>
          </div>

          {/* AI vs Unmanaged Mode Toggle */}
          <div className="flex items-center bg-white p-1.5 rounded-full border border-slate-200 shadow-sm">
            <button
              onClick={() => setAiMode('ai_active')}
              className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition-all cursor-pointer flex items-center space-x-2 ${
                aiMode === 'ai_active'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-current text-white" />
              <span>NeuraGrid AI Active (Shaved)</span>
            </button>

            <button
              onClick={() => setAiMode('unmanaged')}
              className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition-all cursor-pointer flex items-center space-x-2 ${
                aiMode === 'unmanaged'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Unmanaged Charging (Peak Stress)</span>
            </button>
          </div>
        </div>

        {/* Dynamic Telemetry Banner */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-4">
          
          <div className="card-20 p-5">
            <span className="text-xs font-semibold text-slate-500 uppercase">Substation Power Demand</span>
            <p className="mt-2 text-3xl font-extrabold text-slate-900 font-mono">
              {activeLoad.toLocaleString()} <span className="text-sm font-bold text-slate-500">kW</span>
            </p>
            <span className={`text-[11px] font-bold mt-1 block ${aiMode === 'ai_active' ? 'text-emerald-600' : 'text-amber-600'}`}>
              {aiMode === 'ai_active' ? '● 36% Shaved via AI' : '⚠️ Near Peak Capacity'}
            </span>
          </div>

          <div className="card-20 p-5">
            <span className="text-xs font-semibold text-slate-500 uppercase">Transformer Utilization</span>
            <p className="mt-2 text-3xl font-extrabold text-slate-900 font-mono">
              {utilizationPct}%
            </p>
            <div className="w-full h-2 bg-slate-200 rounded-full mt-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  utilizationPct > 85 ? 'bg-amber-500' : 'bg-blue-600'
                }`}
                style={{ width: `${utilizationPct}%` }}
              ></div>
            </div>
          </div>

          <div className="card-20 p-5">
            <span className="text-xs font-semibold text-slate-500 uppercase">Peak Demand Shaved</span>
            <p className="mt-2 text-3xl font-extrabold text-emerald-600 font-mono">
              {aiMode === 'ai_active' ? `-1,400 kW` : '0 kW'}
            </p>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Prevents rolling brownouts</span>
          </div>

          <div className="card-20 p-5">
            <span className="text-xs font-semibold text-slate-500 uppercase">Grid Congestion Risk</span>
            <p className="mt-2 text-3xl font-extrabold font-mono text-slate-900">
              {aiMode === 'ai_active' ? 'Low (4%)' : 'Critical (88%)'}
            </p>
            <span className={`text-[11px] font-bold mt-1 block ${aiMode === 'ai_active' ? 'text-emerald-600' : 'text-amber-600'}`}>
              {aiMode === 'ai_active' ? 'Stable voltage' : 'Substation thermal strain'}
            </span>
          </div>

        </div>

        {/* Load Comparison Graph & Real-time AI Decisions */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 24-Hour Grid Load Graph SVG */}
          <div className="lg:col-span-8 card-white p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">24-Hour Substation Load Balancing Profile</h3>
                <p className="text-xs text-slate-500">Comparing Unmanaged Charging spikes vs. NeuraGrid AI Load Smoothing.</p>
              </div>
              
              <div className="flex items-center space-x-4 text-xs font-bold">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                  <span>AI Smoothed</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                  <span>Unmanaged Peak</span>
                </div>
              </div>
            </div>

            {/* SVG Graph View */}
            <div className="h-64 w-full relative pt-4">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 600 180">
                {/* Horizontal Gridlines */}
                <line x1="0" y1="30" x2="600" y2="30" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
                <text x="590" y="25" fill="#94A3B8" fontSize="10" textAnchor="end" fontFamily="monospace">4,000 kW (Max Capacity)</text>

                <line x1="0" y1="80" x2="600" y2="80" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="0" y1="130" x2="600" y2="130" stroke="#F1F5F9" strokeWidth="1" />

                {/* Unmanaged Peak Line (Amber Dash) */}
                <path
                  d="M 0,140 Q 100,160 200,60 T 350,25 T 480,45 L 600,120"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                />

                {/* AI Smoothed Line (Electric Blue Solid) */}
                <path
                  d="M 0,140 Q 100,145 200,110 T 350,90 T 480,95 L 600,130"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Area under AI curve */}
                <path
                  d="M 0,140 Q 100,145 200,110 T 350,90 T 480,95 L 600,130 L 600,180 L 0,180 Z"
                  fill="url(#aiGridGradient)"
                  opacity="0.1"
                />

                <defs>
                  <linearGradient id="aiGridGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="flex justify-between text-xs font-mono text-slate-400 mt-2">
              <span>00:00</span>
              <span>04:00</span>
              <span>08:00 (Commute)</span>
              <span>12:00 (Solar Peak)</span>
              <span>16:00</span>
              <span>20:00 (Evening Peak)</span>
              <span>23:59</span>
            </div>
          </div>

          {/* AI Automated Recommendation Feed */}
          <div className="lg:col-span-4 card-20 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-xs font-extrabold text-blue-600 uppercase tracking-wider">
                <Cpu className="w-4 h-4" />
                <span>AI Automated Load Actions</span>
              </div>
              <h4 className="mt-2 text-lg font-extrabold text-slate-900">
                Live Balancing Decisions
              </h4>

              <div className="mt-5 space-y-3.5">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Modulated 42 Fleet Chargers</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Reduced draw by -120 kW during 18:00 transformer peak.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Discharged 500 kWh BESS Storage</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Supplied local battery storage to prevent utility demand surge charges.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-blue-600 shrink-0 mt-0.5 fill-current" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Dispatched Green Tariff Incentive</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Offered 15% discount for drivers deferring charge to 22:00.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between items-center text-xs font-semibold text-slate-500">
              <span>Optimization Latency: <strong className="text-slate-900 font-mono">140ms</strong></span>
              <span className="text-emerald-600 font-bold">100% Automated</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
