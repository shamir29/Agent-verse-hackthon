import React from 'react';
import { Sun, Wind, Battery, Leaf, Award } from 'lucide-react';

export const RenewableEnergySection: React.FC = () => {
  return (
    <section id="renewables" className="w-full py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
            <Leaf className="w-4 h-4" />
            <span>Zero-Carbon Microgrid Telemetry</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Renewable Energy Integration
          </h2>
          <p className="mt-3 text-lg text-slate-600 font-medium leading-relaxed">
            Real-time synchronization with solar, wind, and industrial battery energy storage system (BESS) microgrids.
          </p>
        </div>

        {/* Infographic Generation Strip */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Solar Generation Card */}
          <div className="card-20 p-6 relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                <Sun className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                Peak Generation
              </span>
            </div>

            <h3 className="mt-6 text-sm font-bold text-slate-500 uppercase tracking-wider">Solar Array Generation</h3>
            <p className="mt-1 text-3xl font-extrabold text-slate-900 font-mono">
              2.48 <span className="text-lg font-bold text-slate-500">MW</span>
            </p>

            <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between text-xs text-slate-600 font-medium">
              <span>Capacity Factor: <strong className="text-slate-900 font-mono">94.2%</strong></span>
              <span>Efficiency: <strong className="text-emerald-600 font-mono">99.1%</strong></span>
            </div>
          </div>

          {/* Wind Generation Card */}
          <div className="card-20 p-6 relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                <Wind className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                14.2 m/s Wind
              </span>
            </div>

            <h3 className="mt-6 text-sm font-bold text-slate-500 uppercase tracking-wider">Wind Turbine Output</h3>
            <p className="mt-1 text-3xl font-extrabold text-slate-900 font-mono">
              1.85 <span className="text-lg font-bold text-slate-500">MW</span>
            </p>

            <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between text-xs text-slate-600 font-medium">
              <span>Active Turbines: <strong className="text-slate-900 font-mono">12 / 12</strong></span>
              <span>Grid Share: <strong className="text-blue-600 font-mono">42%</strong></span>
            </div>
          </div>

          {/* Battery Storage BESS Card */}
          <div className="card-20 p-6 relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                <Battery className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Ready to Buffer
              </span>
            </div>

            <h3 className="mt-6 text-sm font-bold text-slate-500 uppercase tracking-wider">BESS Battery Storage</h3>
            <p className="mt-1 text-3xl font-extrabold text-slate-900 font-mono">
              4.20 <span className="text-lg font-bold text-slate-500">MWh</span>
            </p>

            <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between text-xs text-slate-600 font-medium">
              <span>State of Charge: <strong className="text-slate-900 font-mono">92.4%</strong></span>
              <span>Response: <strong className="text-emerald-600 font-mono">&lt;20ms</strong></span>
            </div>
          </div>

        </div>

        {/* Renewable Forecast & Green Charging Score Cards */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Green Score & Impact Banner */}
          <div className="lg:col-span-4 card-20 p-8 flex flex-col justify-between bg-gradient-to-br from-emerald-50/50 via-white to-blue-50/50">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">NeuraGrid Eco Rating</span>
                <Award className="w-6 h-6 text-emerald-600" />
              </div>

              <div className="mt-6 text-center">
                <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-emerald-500 text-white font-extrabold text-4xl shadow-xl shadow-emerald-500/20 font-mono">
                  98
                </div>
                <h4 className="mt-3 text-xl font-extrabold text-slate-900">
                  Grade A+ Clean Score
                </h4>
                <p className="mt-1 text-xs font-medium text-slate-600">
                  98% of all electricity delivered to EVs this month was sourced directly from local zero-emission renewables.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-2 gap-4 text-center">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase">Monthly CO₂ Avoided</span>
                <p className="mt-1 text-xl font-extrabold text-emerald-600 font-mono">142.8 Tons</p>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase">Trees Equivalent</span>
                <p className="mt-1 text-xl font-extrabold text-slate-900 font-mono">6,400 🌱</p>
              </div>
            </div>
          </div>

          {/* 24-Hour Renewable Availability Forecast SVG Chart */}
          <div className="lg:col-span-8 card-white p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h4 className="text-base font-extrabold text-slate-900">Renewable Energy Availability Forecast</h4>
                <p className="text-xs text-slate-500">AI predicts solar irradiance and wind velocity to schedule ultra-fast charging windows.</p>
              </div>
              <div className="flex items-center space-x-3 text-xs font-bold">
                <span className="flex items-center space-x-1 text-amber-500">
                  <Sun className="w-3.5 h-3.5" />
                  <span>Solar</span>
                </span>
                <span className="flex items-center space-x-1 text-blue-600">
                  <Wind className="w-3.5 h-3.5" />
                  <span>Wind</span>
                </span>
              </div>
            </div>

            {/* SVG Chart */}
            <div className="h-56 w-full relative pt-4">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 600 160">
                {/* Background Grid */}
                <line x1="0" y1="40" x2="600" y2="40" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="0" y1="90" x2="600" y2="90" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="0" y1="140" x2="600" y2="140" stroke="#F1F5F9" strokeWidth="1" />

                {/* Solar Curve (Amber) */}
                <path
                  d="M 0,150 Q 150,150 250,20 T 380,40 Q 480,140 600,150"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Wind Curve (Electric Blue) */}
                <path
                  d="M 0,80 Q 120,60 220,100 T 400,50 Q 520,80 600,60"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="flex justify-between text-xs font-mono text-slate-400 mt-2">
              <span>06:00 (Sunrise)</span>
              <span>10:00</span>
              <span>13:00 (Solar Peak)</span>
              <span>17:00</span>
              <span>21:00 (Wind Surge)</span>
              <span>03:00</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
