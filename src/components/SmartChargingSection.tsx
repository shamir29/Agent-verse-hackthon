import React, { useState } from 'react';
import { EV_MODELS } from '../data/mockData';
import { BatteryCharging, Sliders } from 'lucide-react';

export const SmartChargingSection: React.FC = () => {
  const [selectedEvIndex, setSelectedEvIndex] = useState(0);
  const [targetSoc, setTargetSoc] = useState(80);
  const [currentSoc, setCurrentSoc] = useState(24);

  const selectedModel = EV_MODELS[selectedEvIndex];

  // Dynamic calculations
  const batteryNeededKwh = ((targetSoc - currentSoc) / 100) * selectedModel.capacity;
  const currentChargingPowerKw = currentSoc < 70 ? selectedModel.maxKw : Math.max(50, Math.round(selectedModel.maxKw * (1 - (currentSoc - 70) / 30)));
  const estimatedTimeMins = Math.max(1, Math.round((batteryNeededKwh / currentChargingPowerKw) * 60));
  const electricityTariff = 0.24; // $0.24 per kWh
  const estimatedCost = (batteryNeededKwh * electricityTariff).toFixed(2);
  const peakCost = (batteryNeededKwh * 0.42).toFixed(2);
  const costSavings = (parseFloat(peakCost) - parseFloat(estimatedCost)).toFixed(2);
  const carbonOffsetKg = (batteryNeededKwh * 0.52).toFixed(1); // 0.52 kg CO2 saved per kWh vs fossil fuel grid



  return (
    <section id="smart-charging" className="w-full py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
            <BatteryCharging className="w-4 h-4" />
            <span>AI Smart Charging Engine</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Dynamic Adaptive Charging
          </h2>
          <p className="mt-3 text-lg text-slate-600 font-medium leading-relaxed">
            Real-time battery SOC monitoring, dynamic power curve matching, and smart tariff optimization for maximum efficiency.
          </p>
        </div>

        {/* EV Model Picker Selector Pills */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {EV_MODELS.map((model, idx) => (
            <button
              key={model.name}
              onClick={() => setSelectedEvIndex(idx)}
              className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer flex items-center space-x-2 border ${
                selectedEvIndex === idx
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20 scale-105'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <span className="text-lg">{model.image}</span>
              <span>{model.name}</span>
              <span className="text-xs opacity-75 font-mono">({model.capacity} kWh)</span>
            </button>
          ))}
        </div>

        {/* Main Interactive Grid View */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Battery & Controls */}
          <div className="lg:col-span-5 card-20 p-8 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{selectedModel.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">Max Charge Speed: {selectedModel.maxKw} kW</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  96% Clean Solar
                </span>
              </div>

              {/* Animated Battery Bar Visualization */}
              <div className="mt-8">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">State of Charge (SoC)</span>
                  <span className="text-3xl font-extrabold text-slate-900 font-mono">{currentSoc}%</span>
                </div>

                <div className="relative w-full h-12 bg-slate-200 rounded-2xl overflow-hidden p-1 border border-slate-300">
                  <div
                    className="h-full rounded-xl bg-gradient-to-r from-blue-500 via-emerald-400 to-emerald-500 transition-all duration-500 ease-out relative flex items-center justify-end pr-3"
                    style={{ width: `${currentSoc}%` }}
                  >
                    <span className="text-xs font-extrabold text-white drop-shadow font-mono">
                      {currentSoc}%
                    </span>
                  </div>
                </div>

                {/* Target SoC Interactive Slider */}
                <div className="mt-6">
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                    <span>Current SoC: {currentSoc}%</span>
                    <span>Target SoC Limit: <strong className="text-blue-600">{targetSoc}%</strong></span>
                  </div>
                  <input
                    type="range"
                    min={currentSoc + 5}
                    max={100}
                    value={targetSoc}
                    onChange={(e) => setTargetSoc(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                    <span>50%</span>
                    <span>80% (Optimum)</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulation Action Toggle */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
              <div className="text-xs text-slate-500 font-medium">
                AI Optimization: <strong className="text-slate-900">Cell Lifespan Guard Active</strong>
              </div>
              <button
                onClick={() => setCurrentSoc((prev) => (prev >= targetSoc ? 15 : prev + 10))}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow transition-all cursor-pointer flex items-center space-x-1.5"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Simulate Charge (+10%)</span>
              </button>
            </div>

          </div>

          {/* Right Column: Charging Curve & Real-Time Metrics */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Dynamic Telemetry Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              <div className="card-20 p-5">
                <span className="text-xs font-semibold text-slate-500 uppercase">Power Rate</span>
                <p className="mt-2 text-2xl font-extrabold text-blue-600 font-mono">{currentChargingPowerKw} <span className="text-xs text-slate-600 font-normal">kW</span></p>
                <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Dynamic peak</span>
              </div>

              <div className="card-20 p-5">
                <span className="text-xs font-semibold text-slate-500 uppercase">Est. Completion</span>
                <p className="mt-2 text-2xl font-extrabold text-slate-900 font-mono">{estimatedTimeMins} <span className="text-xs text-slate-600 font-normal">mins</span></p>
                <span className="text-[11px] text-slate-500 font-semibold mt-1 block">To {targetSoc}% limit</span>
              </div>

              <div className="card-20 p-5">
                <span className="text-xs font-semibold text-slate-500 uppercase">Smart Tariff</span>
                <p className="mt-2 text-2xl font-extrabold text-emerald-600 font-mono">${estimatedCost}</p>
                <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Saved ${costSavings}</span>
              </div>

              <div className="card-20 p-5">
                <span className="text-xs font-semibold text-slate-500 uppercase">Carbon Saved</span>
                <p className="mt-2 text-2xl font-extrabold text-emerald-600 font-mono">{carbonOffsetKg} <span className="text-xs text-slate-600 font-normal">kg</span></p>
                <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">100% offset</span>
              </div>

            </div>

            {/* Charging Curve Graph Card */}
            <div className="card-white p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Real-Time Charging Power Curve (kW vs SoC)</h4>
                  <p className="text-xs text-slate-500">NeuraGrid AI mitigates lithium-ion battery degradation by tapering power past 70% SoC.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-mono font-bold border border-blue-200">
                  {selectedModel.maxKw} kW Max
                </span>
              </div>

              {/* Visual Power Curve Chart SVG */}
              <div className="h-44 w-full relative pt-4">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120">
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="500" y2="20" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="0" y1="60" x2="500" y2="60" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="#F1F5F9" strokeWidth="1" />

                  {/* Charging Curve Path */}
                  <path
                    d="M 0,30 Q 150,15 320,25 T 450,90 L 500,105"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Area fill under curve */}
                  <path
                    d="M 0,30 Q 150,15 320,25 T 450,90 L 500,105 L 500,120 L 0,120 Z"
                    fill="url(#blueGradient)"
                    opacity="0.15"
                  />

                  {/* Current Position Marker */}
                  <circle
                    cx={currentSoc * 5}
                    cy={currentSoc < 70 ? 25 : 25 + (currentSoc - 70) * 1.5}
                    r="6"
                    fill="#10B981"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="animate-pulse"
                  />

                  <defs>
                    <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563EB" />
                      <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="flex justify-between text-xs font-semibold text-slate-400 mt-2 font-mono">
                <span>0% SoC</span>
                <span>25%</span>
                <span>50%</span>
                <span>75% (Taper Start)</span>
                <span>100% SoC</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
