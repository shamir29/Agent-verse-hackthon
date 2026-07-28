import React from 'react';
import { SolarFarm, WindFarm, TelemetryStats } from '../../types/powerGrid';
import { Sun, Wind, Cloud, Flame, RefreshCw, Sliders, ShieldCheck, Leaf, Compass, Gauge } from 'lucide-react';

interface RenewableEnergyProps {
  solarFarms: SolarFarm[];
  windFarms: WindFarm[];
  telemetry: TelemetryStats;
  weatherCondition: string;
  timeOfDayHours: number;
  onUpdateWeather: (cond: 'sunny' | 'cloudy' | 'stormy' | 'calm') => void;
}

export const RenewableEnergy: React.FC<RenewableEnergyProps> = ({
  solarFarms,
  windFarms,
  telemetry,
  weatherCondition,
  timeOfDayHours,
  onUpdateWeather
}) => {
  const solar = solarFarms[0];

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Weather Simulator */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-amber-50 text-amber-600 rounded-xl border border-amber-200">
              <Sun className="w-6 h-6 animate-spin" style={{ animationDuration: '12s' }} />
            </span>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Renewable Energy Command Hub</h2>
              <p className="text-xs text-slate-500 font-medium">
                Live solar irradiance, wind dynamics, turbine telemetry, and environmental controls.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Weather Presets */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="font-bold text-slate-500 uppercase text-[10px]">Environment Presets:</span>
          {[
            { id: 'sunny', label: '☀️ Sunny Clear', icon: Sun },
            { id: 'cloudy', label: '☁️ Overcast', icon: Cloud },
            { id: 'stormy', label: '🌩️ Gale Storm', icon: Wind },
            { id: 'calm', label: '🍃 Calm Breeze', icon: Leaf }
          ].map(w => (
            <button
              key={w.id}
              onClick={() => onUpdateWeather(w.id as any)}
              className={`px-3 py-2 rounded-xl font-semibold border transition-all ${
                weatherCondition === w.id
                  ? 'bg-cyan-600 text-white border-cyan-600 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>
      </div>

      {/* Renewable Penetration Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Green Power Share</span>
            <Sun className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2">{telemetry.renewableSharePct}%</div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${telemetry.renewableSharePct}%` }}></div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-medium">
            {telemetry.renewableSharePct > 70 ? '🟢 Exceeding 70% clean grid goal' : '🟡 Supplemented by BESS & Hydro'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Solar Output</span>
            <Sun className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-amber-600 mt-2">{telemetry.solarGenerationMW} MW</div>
          <div className="text-xs text-slate-500 mt-1 font-medium">Irradiance: {solar?.irradianceWm2} W/m²</div>
          <p className="text-[11px] text-amber-700 mt-2 font-semibold">
            Efficiency: {solar?.panelEfficiencyPct}% | Cloud: {solar?.cloudCoverPct}%
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Wind Generation</span>
            <Wind className="w-5 h-5 text-cyan-500" />
          </div>
          <div className="text-2xl font-extrabold text-cyan-600 mt-2">{telemetry.windGenerationMW} MW</div>
          <div className="text-xs text-slate-500 mt-1 font-medium">Avg Wind: {windFarms[0]?.windSpeedMs} m/s</div>
          <p className="text-[11px] text-cyan-700 mt-2 font-semibold">
            {windFarms[0]?.activeTurbines + windFarms[1]?.activeTurbines} Active Turbines online
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">CO₂ Carbon Offset</span>
            <Leaf className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-2">{telemetry.carbonOffsetTonsToday} Tons</div>
          <div className="text-xs text-slate-500 mt-1 font-medium">Prevented emissions today</div>
          <p className="text-[11px] text-emerald-700 mt-2 font-semibold">
            Equivalent to planting {Math.round(telemetry.carbonOffsetTonsToday * 45)} trees
          </p>
        </div>

      </div>

      {/* Solar & Wind Detailed Control Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Solar Farm Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <Sun className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">{solar?.name}</h3>
                <p className="text-xs text-slate-500">Dual-axis Solar Tracking Array (Capacity: {solar?.capacityMW}MW)</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-amber-50 text-amber-700 font-bold text-xs rounded-full border border-amber-200">
              {solar?.currentOutputMW} MW Output
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Solar Irradiance ({solar?.irradianceWm2} W/m²)</span>
                <span className="text-amber-600">{Math.round((solar?.irradianceWm2 || 0) / 10)}% Max</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (solar?.irradianceWm2 || 0) / 10)}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-slate-400 font-medium">Panel Temperature</div>
                <div className="text-sm font-bold text-slate-800 mt-0.5">{solar?.panelTempC} °C</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-slate-400 font-medium">Active Motor Trackers</div>
                <div className="text-sm font-bold text-slate-800 mt-0.5">{solar?.activeTrackers} Units</div>
              </div>
            </div>

            <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200 text-amber-900">
              <div className="font-bold flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-600" />
                <span>Solar AI Inverter Tuning</span>
              </div>
              <p className="text-xs text-amber-800 mt-1">
                MPPT (Maximum Power Point Tracking) algorithms are dynamically tilting panel arrays to 34.2° to capture peak afternoon irradiance.
              </p>
            </div>
          </div>
        </div>

        {/* Wind Farms Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-cyan-50 rounded-xl border border-cyan-200">
                <Wind className="w-6 h-6 text-cyan-600 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Wind Turbine Facilities</h3>
                <p className="text-xs text-slate-500">Aeolus Onshore & Zephyr Offshore Farms</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-cyan-50 text-cyan-700 font-bold text-xs rounded-full border border-cyan-200">
              {telemetry.windGenerationMW} MW Total
            </span>
          </div>

          <div className="space-y-4">
            {windFarms.map((farm) => (
              <div key={farm.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">{farm.name}</span>
                  <span className="text-xs font-bold text-cyan-600">{farm.currentOutputMW} / {farm.capacityMW} MW</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[11px]">
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-slate-400">Wind Speed</span>
                    <div className="font-bold text-slate-800 mt-0.5">{farm.windSpeedMs} m/s</div>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-slate-400">Blade Pitch</span>
                    <div className="font-bold text-slate-800 mt-0.5">{farm.bladePitchDeg}°</div>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-slate-400">Rotor Speed</span>
                    <div className="font-bold text-slate-800 mt-0.5">{farm.rotorRpm} RPM</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
