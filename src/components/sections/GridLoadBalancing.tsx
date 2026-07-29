import React from 'react';
import { 
  Scale, 
  Sliders, 
  AlertOctagon, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { useGrid } from '../../context/GridContext';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const DEMAND_SUPPLY_DATA = [
  { time: '00:00', demand: 3.2, supply: 3.6, renewable: 2.1 },
  { time: '04:00', demand: 2.9, supply: 3.4, renewable: 1.8 },
  { time: '08:00', demand: 4.1, supply: 4.5, renewable: 3.2 },
  { time: '12:00', demand: 4.8, supply: 5.1, renewable: 4.2 },
  { time: '16:00', demand: 4.9, supply: 5.2, renewable: 3.8 },
  { time: '20:00', demand: 4.4, supply: 4.8, renewable: 2.4 },
  { time: '23:59', demand: 3.5, supply: 3.8, renewable: 2.0 },
];

export const GridLoadBalancing: React.FC = () => {
  const { 
    telemetry, 
    activeSectorOverload, 
    setActiveSectorOverload, 
    controlState, 
    setDispatchStrategy 
  } = useGrid();

  return (
    <section id="load-balancing" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 space-y-4 md:space-y-0">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3 border border-blue-200">
              <Scale className="w-3.5 h-3.5" />
              <span>AI Dynamic Balancing</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Grid Load Balancing & Demand Management
            </h2>
            <p className="text-slate-600 mt-1 max-w-2xl text-sm">
              AI agents dynamically redistribute transformer loads, route power around congestion, and execute sub-millisecond emergency switching.
            </p>
          </div>

          {/* Strategy Toggle */}
          <div className="flex items-center space-x-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm text-xs">
            <button
              onClick={() => setDispatchStrategy('max_renewables')}
              className={`px-3 py-1.5 rounded-lg transition-colors font-medium cursor-pointer ${controlState.dispatchStrategy === 'max_renewables' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Max Renewables
            </button>
            <button
              onClick={() => setDispatchStrategy('max_reliability')}
              className={`px-3 py-1.5 rounded-lg transition-colors font-medium cursor-pointer ${controlState.dispatchStrategy === 'max_reliability' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Max Reliability
            </button>
            <button
              onClick={() => setDispatchStrategy('cost_optimized')}
              className={`px-3 py-1.5 rounded-lg transition-colors font-medium cursor-pointer ${controlState.dispatchStrategy === 'cost_optimized' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Cost Optimized
            </button>
          </div>
        </div>

        {/* Main Grid Card: Interactive Overload Simulator & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Cols: Demand vs Supply Live Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-[20px] border border-slate-200 shadow-apple space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Demand vs Supply Horizon (24 Hours)</h3>
                <p className="text-xs text-slate-500">Autonomous headroom balancing in real-time</p>
              </div>
              <div className="flex items-center space-x-4 text-xs font-semibold">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                  <span className="text-slate-700">Demand (GW)</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <span className="text-slate-700">Supply Capacity</span>
                </div>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DEMAND_SUPPLY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSupply" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="time" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} domain={[0, 6]} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="demand" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorDemand)" />
                  <Area type="monotone" dataKey="supply" stroke="#10B981" strokeWidth={2.5} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorSupply)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-slate-100 text-xs">
              <div className="p-3 rounded-xl bg-slate-50">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Active Demand</span>
                <span className="text-base font-bold text-slate-900">{telemetry.currentDemandGW} GW</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Supply Available</span>
                <span className="text-base font-bold text-emerald-600">{telemetry.totalSupplyGW} GW</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Operating Reserve</span>
                <span className="text-base font-bold text-blue-600">0.28 GW (5.8%)</span>
              </div>
            </div>
          </div>

          {/* Right Col: Interactive Load Spike Simulator Slider */}
          <div className="bg-white p-6 rounded-[20px] border border-slate-200 shadow-apple space-y-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Interactive Sector Load Simulator</h3>
                <p className="text-xs text-slate-500">Inject simulated heavy load spike into city sectors</p>
              </div>
            </div>

            <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-700">Industrial Sector Demand Spike:</span>
                <span className={`px-2 py-0.5 rounded-md font-bold ${activeSectorOverload > 30 ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                  +{activeSectorOverload}% ({Math.round(920 * (1 + activeSectorOverload / 100))} MW)
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="80"
                value={activeSectorOverload}
                onChange={(e) => setActiveSectorOverload(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />

              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>0% (Nominal)</span>
                <span>40% (High Demand)</span>
                <span>80% (Extreme Spike)</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 tracking-wider uppercase">AI Load Redistribution Action</h4>
              
              <div className={`p-3.5 rounded-xl border text-xs space-y-2 transition-all ${
                activeSectorOverload > 30 
                  ? 'bg-amber-50/80 border-amber-200 text-amber-900'
                  : 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
              }`}>
                <div className="flex items-center space-x-2 font-bold">
                  {activeSectorOverload > 30 ? <AlertOctagon className="w-4 h-4 text-amber-600" /> : <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  <span>{activeSectorOverload > 30 ? 'AI Load Rerouting In Progress' : 'Grid Operating Under Nominal Load'}</span>
                </div>
                <p className="text-[11px] leading-snug">
                  {activeSectorOverload > 30 
                    ? `AI Agent dispatching NeuraBank BESS battery storage (+120 MW) and throttling non-critical HVAC to prevent transformer overload.`
                    : `Optimal phase balancing across all 142 substations. Transformer thermal margins within safe tolerances.`}
                </p>
              </div>

              {activeSectorOverload > 0 && (
                <button
                  onClick={() => setActiveSectorOverload(0)}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Load Simulator</span>
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
