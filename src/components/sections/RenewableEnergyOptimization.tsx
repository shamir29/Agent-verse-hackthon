import React from 'react';
import { 
  Sun, 
  Wind, 
  BatteryCharging, 
  Leaf, 
  Sliders, 
  Zap 
} from 'lucide-react';
import { useGrid } from '../../context/GridContext';

export const RenewableEnergyOptimization: React.FC = () => {
  const { telemetry, controlState, setWeather } = useGrid();

  const sunVal = controlState.weatherOverride.sunIntensity;
  const windVal = controlState.weatherOverride.windSpeedKmh;

  const solarMw = Math.round(500 * (sunVal / 100));
  const windMw = Math.round(800 * (windVal / 80));
  const hydroMw = 1200;

  return (
    <section id="renewables" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 space-y-4 md:space-y-0">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-3 border border-emerald-200">
              <Leaf className="w-3.5 h-3.5" />
              <span>Clean Energy Integration</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Renewable Energy AI Optimization
            </h2>
            <p className="text-slate-600 mt-1 max-w-2xl text-sm">
              Real-time solar irradiance tracking, wind turbine pitch control, and hydro reservoir dispatch powered by atmospheric AI predictions.
            </p>
          </div>

          {/* Renewable Metric Badge */}
          <div className="flex items-center space-x-3 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl">
            <Leaf className="w-5 h-5 text-emerald-600" />
            <div>
              <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider block">Renewable Contribution</span>
              <span className="text-xl font-bold text-emerald-700">{telemetry.renewablePercent}% Clean Power</span>
            </div>
          </div>
        </div>

        {/* Live Renewable Assets Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          
          {/* Solar Asset Card */}
          <div className="bg-slate-50 p-6 rounded-[20px] border border-slate-200 shadow-apple space-y-4 hover:border-emerald-300 transition-all">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
                <Sun className="w-6 h-6 animate-spin" style={{ animationDuration: '20s' }} />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">{sunVal}% Sunlight</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Solar MegaArrays</h3>
              <p className="text-xs text-slate-500">NeuraSolar Alpha & Beta</p>
            </div>
            <div className="pt-2 border-t border-slate-200/80 space-y-1">
              <div className="text-2xl font-bold text-slate-900">{solarMw} <span className="text-sm font-normal text-slate-500">MW</span></div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full transition-all duration-500" style={{ width: `${(solarMw / 500) * 100}%` }}></div>
              </div>
              <div className="text-[10px] text-slate-400 pt-1">Capacity: 500 MW</div>
            </div>
          </div>

          {/* Wind Asset Card */}
          <div className="bg-slate-50 p-6 rounded-[20px] border border-slate-200 shadow-apple space-y-4 hover:border-emerald-300 transition-all">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
                <Wind className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">{windVal} km/h Wind</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Oceania Wind Farms</h3>
              <p className="text-xs text-slate-500">Offshore & Coastal Turbines</p>
            </div>
            <div className="pt-2 border-t border-slate-200/80 space-y-1">
              <div className="text-2xl font-bold text-slate-900">{windMw} <span className="text-sm font-normal text-slate-500">MW</span></div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${(windMw / 800) * 100}%` }}></div>
              </div>
              <div className="text-[10px] text-slate-400 pt-1">Capacity: 800 MW</div>
            </div>
          </div>

          {/* Hydro Asset Card */}
          <div className="bg-slate-50 p-6 rounded-[20px] border border-slate-200 shadow-apple space-y-4 hover:border-emerald-300 transition-all">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200">
                <Zap className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">Hydro Baseload</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Cascade Hydro Dam</h3>
              <p className="text-xs text-slate-500">Reservoir Water Flow</p>
            </div>
            <div className="pt-2 border-t border-slate-200/80 space-y-1">
              <div className="text-2xl font-bold text-slate-900">{hydroMw} <span className="text-sm font-normal text-slate-500">MW</span></div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full" style={{ width: '80%' }}></div>
              </div>
              <div className="text-[10px] text-slate-400 pt-1">Capacity: 1500 MW</div>
            </div>
          </div>

          {/* Battery BESS Card */}
          <div className="bg-slate-50 p-6 rounded-[20px] border border-slate-200 shadow-apple space-y-4 hover:border-indigo-300 transition-all">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200">
                <BatteryCharging className="w-6 h-6 animate-pulse" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800">88% SOC</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">NeuraBank 400MWh BESS</h3>
              <p className="text-xs text-slate-500">Grid Scale Battery Reserve</p>
            </div>
            <div className="pt-2 border-t border-slate-200/80 space-y-1">
              <div className="text-2xl font-bold text-indigo-600">352 <span className="text-sm font-normal text-slate-500">MWh Stored</span></div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full" style={{ width: '88%' }}></div>
              </div>
              <div className="text-[10px] text-slate-400 pt-1">Discharging 250 MW to Grid</div>
            </div>
          </div>

        </div>

        {/* Interactive Weather Simulator Sandbox */}
        <div className="p-6 rounded-[20px] bg-slate-50 border border-slate-200 shadow-apple grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div>
            <div className="flex items-center space-x-2 text-slate-900 font-bold mb-1">
              <Sliders className="w-4 h-4 text-emerald-600" />
              <span>Interactive Weather & Sun Simulator</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Adjust simulated cloud cover and wind speed below to observe real-time AI grid adaptation and battery dispatch.
            </p>
          </div>

          {/* Sliders */}
          <div className="space-y-4 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2 bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700 flex items-center"><Sun className="w-3.5 h-3.5 mr-1 text-amber-500" /> Sunlight Intensity:</span>
                <span className="text-amber-600 font-bold">{sunVal}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={sunVal}
                onChange={(e) => setWeather(Number(e.target.value), windVal)}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            <div className="space-y-2 bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700 flex items-center"><Wind className="w-3.5 h-3.5 mr-1 text-emerald-500" /> Coastal Wind Speed:</span>
                <span className="text-emerald-600 font-bold">{windVal} km/h</span>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                value={windVal}
                onChange={(e) => setWeather(sunVal, Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
