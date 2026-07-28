import React from 'react';
import { BatteryBESS, TelemetryStats } from '../../types/powerGrid';
import { BatteryCharging, Battery, Zap, ShieldCheck, Thermometer, RefreshCw, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface BatteryStorageProps {
  battery: BatteryBESS;
  telemetry: TelemetryStats;
  onSetBatteryMode: (mode: 'auto' | 'charge' | 'discharge' | 'reserve') => void;
}

export const BatteryStorage: React.FC<BatteryStorageProps> = ({
  battery,
  telemetry,
  onSetBatteryMode
}) => {
  const isDischarging = battery.currentPowerMW > 0;
  const isCharging = battery.currentPowerMW < 0;

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-200">
            <BatteryCharging className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-slate-900">{battery.name}</h2>
              <span className="px-2.5 py-0.5 text-xs font-bold bg-indigo-100 text-indigo-700 rounded-full border border-indigo-200">
                BESS STORAGE
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              High-density Lithium Iron Phosphate (LiFePO4) Battery Energy Storage System for frequency response & peak shaving.
            </p>
          </div>
        </div>

        {/* Operating Mode Buttons */}
        <div className="flex items-center bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs">
          {[
            { id: 'auto', label: '⚡ Smart AI Auto' },
            { id: 'charge', label: '📥 Force Charge' },
            { id: 'discharge', label: '📤 Force Discharge' },
            { id: 'reserve', label: '🔒 Lock Reserve' }
          ].map(m => (
            <button
              key={m.id}
              onClick={() => onSetBatteryMode(m.id as any)}
              className={`px-3 py-2 rounded-lg font-bold transition-all ${
                battery.mode === m.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Storage Metric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* State of Charge Gauge */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase">
            <span>State of Charge (SoC)</span>
            <Battery className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="my-4">
            <div className="text-4xl font-extrabold text-slate-900">{battery.stateOfChargePct}%</div>
            <div className="text-xs text-slate-500 font-semibold mt-1">
              {Math.round(battery.currentChargeMWh)} / {battery.maxCapacityMWh} MWh Capacity
            </div>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                battery.stateOfChargePct > 40 ? 'bg-indigo-600' : 'bg-amber-500'
              }`}
              style={{ width: `${battery.stateOfChargePct}%` }}
            ></div>
          </div>
        </div>

        {/* Current Power Flow MW */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase">
            <span>Active Power Stream</span>
            {isDischarging ? <ArrowUpRight className="w-5 h-5 text-emerald-500" /> : <ArrowDownRight className="w-5 h-5 text-indigo-500" />}
          </div>
          <div className="my-4">
            <div className={`text-4xl font-extrabold ${isDischarging ? 'text-emerald-600' : (isCharging ? 'text-indigo-600' : 'text-slate-700')}`}>
              {Math.abs(battery.currentPowerMW)} MW
            </div>
            <div className="text-xs font-semibold mt-1 text-slate-500">
              {isDischarging ? '📤 Discharging to Grid' : (isCharging ? '📥 Charging from Renewables' : '⏸️ Idle Reserve')}
            </div>
          </div>
          <div className="text-[11px] text-slate-400 font-medium">
            Max Power Rate: {battery.maxPowerMW} MW
          </div>
        </div>

        {/* Cell Health */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase">
            <span>Battery Health Index</span>
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="my-4">
            <div className="text-4xl font-extrabold text-emerald-600">{battery.healthPct}%</div>
            <div className="text-xs font-semibold mt-1 text-slate-500">
              Total Life Cycles: {battery.cycleCount}
            </div>
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold">
            Optimal cell balance maintained
          </div>
        </div>

        {/* System Temperature */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase">
            <span>Thermal Safety</span>
            <Thermometer className="w-5 h-5 text-amber-500" />
          </div>
          <div className="my-4">
            <div className="text-4xl font-extrabold text-slate-900">{battery.temperatureC} °C</div>
            <div className="text-xs font-semibold mt-1 text-slate-500">
              Cooling Loop: Active Liquid
            </div>
          </div>
          <div className="text-[11px] text-slate-400 font-medium">
            Safe operating range (15°C - 35°C)
          </div>
        </div>

      </div>

      {/* Peak Shaving AI Explanation Card */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-lg space-y-4">
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-cyan-400" />
          <h3 className="text-base font-bold">Autonomous Peak Shaving & Frequency Response</h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          When grid demand surges during evening hours (5:00 PM – 10:00 PM), the BESS bank automatically discharges stored solar & wind power to prevent thermal plant spin-up. During off-peak afternoon hours, surplus solar energy charges the BESS at zero incremental carbon cost.
        </p>
      </div>

    </div>
  );
};
