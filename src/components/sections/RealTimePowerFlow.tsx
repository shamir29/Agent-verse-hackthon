import React from 'react';
import { 
  Zap, 
  Activity, 
  Radio, 
  Building2, 
  Sun 
} from 'lucide-react';
import { useGrid } from '../../context/GridContext';

export const RealTimePowerFlow: React.FC = () => {
  const { telemetry } = useGrid();

  return (
    <section id="power-flow" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
            <Zap className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
            <span>Continuous Energy Telemetry</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Real-Time Power Flow & Grid Dynamics
          </h2>
          <p className="text-slate-600 text-sm">
            Continuous energy transfers across high-voltage transmission, regional substations, and citywide end consumers monitored at 60 Hz sampling rate.
          </p>
        </div>

        {/* Animated Power Flow Pipeline Nodes */}
        <div className="relative p-8 rounded-[24px] bg-slate-50 border border-slate-200/80 shadow-apple overflow-hidden">
          
          <div className="absolute top-1/2 left-10 right-10 -translate-y-1/2 h-1.5 bg-slate-200 rounded-full z-0 hidden lg:block overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-blue-500 via-emerald-500 to-blue-600 animate-grid-dash opacity-80"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            
            {/* Stage 1: Generation */}
            <div className="bg-white p-6 rounded-[20px] border border-slate-200 shadow-sm space-y-4 hover:border-blue-300 transition-all">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <Sun className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">Stage 1</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">1. Generation</h3>
                <p className="text-xs text-slate-500 mt-0.5">Renewables + Hydro + Baseload</p>
              </div>
              <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Output:</span>
                  <span className="font-bold text-slate-900">{telemetry.totalSupplyGW} GW</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Renewable Mix:</span>
                  <span className="font-bold text-emerald-600">{telemetry.renewablePercent}%</span>
                </div>
              </div>
            </div>

            {/* Stage 2: Transmission */}
            <div className="bg-white p-6 rounded-[20px] border border-slate-200 shadow-sm space-y-4 hover:border-blue-300 transition-all">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
                  <Activity className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">Stage 2</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">2. Transmission</h3>
                <p className="text-xs text-slate-500 mt-0.5">500kV High-Voltage Lines</p>
              </div>
              <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Voltage Stability:</span>
                  <span className="font-bold text-slate-900">{telemetry.voltageStability} V</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Line Losses:</span>
                  <span className="font-bold text-emerald-600">{telemetry.powerLossPercent}% (Low)</span>
                </div>
              </div>
            </div>

            {/* Stage 3: Distribution */}
            <div className="bg-white p-6 rounded-[20px] border border-slate-200 shadow-sm space-y-4 hover:border-blue-300 transition-all">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                  <Radio className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800">Stage 3</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">3. Distribution</h3>
                <p className="text-xs text-slate-500 mt-0.5">142 Active Substations</p>
              </div>
              <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Grid Frequency:</span>
                  <span className="font-bold text-blue-600">{telemetry.frequencyHz} Hz</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Transformer Health:</span>
                  <span className="font-bold text-emerald-600">98% Avg</span>
                </div>
              </div>
            </div>

            {/* Stage 4: Consumption */}
            <div className="bg-white p-6 rounded-[20px] border border-slate-200 shadow-sm space-y-4 hover:border-blue-300 transition-all">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-800">Stage 4</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">4. Consumption</h3>
                <p className="text-xs text-slate-500 mt-0.5">Industrial, Commercial, Res.</p>
              </div>
              <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">City Load:</span>
                  <span className="font-bold text-slate-900">{telemetry.currentDemandGW} GW</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Peak Demand:</span>
                  <span className="font-bold text-slate-700">5.02 GW expected</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
