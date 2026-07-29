import React, { useState, useEffect } from 'react';
import { DRIVER_JOURNEY_STEPS } from '../data/mockData';
import { Search, CalendarCheck, Navigation, ShieldCheck, Zap, CreditCard, CheckCircle2, Car, Play, Pause, ChevronRight } from 'lucide-react';

export const DriverJourneySection: React.FC = () => {
  const [activeStepId, setActiveStepId] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-play driver journey animation sequence
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStepId((prev) => (prev >= DRIVER_JOURNEY_STEPS.length ? 1 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeStep = DRIVER_JOURNEY_STEPS.find((s) => s.id === activeStepId) || DRIVER_JOURNEY_STEPS[0];

  const getIcon = (id: number) => {
    switch (id) {
      case 1: return Search;
      case 2: return CalendarCheck;
      case 3: return Navigation;
      case 4: return ShieldCheck;
      case 5: return Zap;
      case 6: return CreditCard;
      case 7: return CheckCircle2;
      case 8: return Car;
      default: return Zap;
    }
  };

  return (
    <section id="driver-journey" className="w-full py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
              <Car className="w-4 h-4" />
              <span>Frictionless Autonomous Experience</span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              End-to-End Driver Journey
            </h2>
            <p className="mt-2 text-slate-600 max-w-2xl text-base font-medium">
              From intelligent queue reservation to Plug & Charge authentication and automated zero-carbon billing.
            </p>
          </div>

          {/* Auto-Play Controller Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition-all cursor-pointer flex items-center space-x-2 border shadow-sm ${
              isPlaying
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? 'Pause Auto Tour' : 'Auto Play Journey'}</span>
          </button>
        </div>

        {/* Horizontal Step Timeline Selector */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {DRIVER_JOURNEY_STEPS.map((step) => {
            const Icon = getIcon(step.id);
            const isActive = step.id === activeStepId;
            return (
              <button
                key={step.id}
                onClick={() => {
                  setActiveStepId(step.id);
                  setIsPlaying(false);
                }}
                className={`p-3 rounded-2xl text-left transition-all duration-300 cursor-pointer border ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20 scale-105'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                    0{step.id}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white fill-current' : 'text-slate-500'}`} />
                </div>
                <p className="mt-2 text-xs font-extrabold tracking-tight truncate">{step.title}</p>
              </button>
            );
          })}
        </div>

        {/* Step Walkthrough Main Showcase Box */}
        <div className="mt-8 card-white p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Active Step Details */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold font-mono border border-blue-200">
              <span>Step 0{activeStep.id} of 08</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {activeStep.title}
            </h3>

            <p className="text-base text-slate-600 font-medium leading-relaxed">
              {activeStep.fullDesc}
            </p>

            <div className="pt-4 border-t border-slate-100 flex items-center space-x-4">
              <button
                onClick={() => setActiveStepId((prev) => (prev <= 1 ? 8 : prev - 1))}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Previous Step
              </button>
              <button
                onClick={() => setActiveStepId((prev) => (prev >= 8 ? 1 : prev + 1))}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer flex items-center space-x-1"
              >
                <span>Next Step</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Driver HUD Dashboard Card Preview */}
          <div className="lg:col-span-6 card-20 p-6 bg-slate-900 text-white border-slate-900 shadow-xl">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">Vehicle HUD Telemetry</span>
              </div>
              <span className="text-xs font-mono text-blue-400 font-bold">NeuraGrid OS v4.8</span>
            </div>

            {/* HUD Metrics List */}
            <div className="mt-6 space-y-3.5">
              {activeStep.hudMetrics.map((m) => (
                <div key={m.label} className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex justify-between items-center">
                  <span className="text-xs font-medium text-slate-400">{m.label}</span>
                  <span className="text-sm font-extrabold text-white font-mono">{m.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400 font-mono">
              <span>Status: <strong className="text-emerald-400 font-sans">Handshake Active</strong></span>
              <span>Encrypted via ISO 15118</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
