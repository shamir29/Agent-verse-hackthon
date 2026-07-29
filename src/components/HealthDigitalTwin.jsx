import React, { useState, useEffect } from 'react';
import { User, Activity, Droplets, Zap, ShieldCheck, Flame, Heart, RefreshCw, Clock, Sparkles } from 'lucide-react';

export default function HealthDigitalTwin() {
  const [pulse, setPulse] = useState(true);
  const [bioAge, setBioAge] = useState(27.8);
  const [immunityScore, setImmunityScore] = useState(96);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulse(p => !p);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const metrics = [
    { name: "Vitals Stability", value: "99.4%", change: "+0.3%", icon: Activity, color: "text-sky-600 bg-sky-50 border-sky-200" },
    { name: "Hydration Level", value: "88%", change: "Optimal", icon: Droplets, color: "text-teal-600 bg-teal-50 border-teal-200" },
    { name: "Autonomic Stress", value: "12 / 100", change: "Calm State", icon: Zap, color: "text-amber-600 bg-amber-50 border-amber-200" },
    { name: "Immunity Index", value: `${immunityScore}%`, change: "High Defense", icon: ShieldCheck, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    { name: "Active Calories", value: "1,840 kcal", change: "Target Reached", icon: Flame, color: "text-orange-600 bg-orange-50 border-orange-200" },
    { name: "Heart Rhythm Variability", value: "68 ms", change: "High Adaptability", icon: Heart, color: "text-rose-600 bg-rose-50 border-rose-200" },
    { name: "Systemic Recovery", value: "94%", change: "Full Reserve", icon: RefreshCw, color: "text-indigo-600 bg-indigo-50 border-indigo-200" },
    { name: "Biological Ageing Index", value: `${bioAge} Yrs`, change: "-4.2 Yrs Younger", icon: Clock, color: "text-purple-600 bg-purple-50 border-purple-200" },
  ];

  return (
    <section id="digital-twin" className="py-24 bg-white relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold mb-4">
            <User className="w-3.5 h-3.5 text-purple-600" />
            <span>Section 04 • Health Digital Twin</span>
          </div>
          <h2 className="font-['Outfit'] font-bold text-3xl sm:text-5xl text-slate-950 tracking-tight mb-4">
            Your real-time digital double.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            A continuously updated 3D virtual avatar mirroring your real-time biology, cellular stress, immunity, and biological age.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column Metrics (4 items) */}
          <div className="lg:col-span-3 space-y-4">
            {metrics.slice(0, 4).map((m, idx) => {
              const Icon = m.icon;
              return (
                <div 
                  key={idx}
                  className="bg-[#FAF9F6] border border-sky-100/80 p-5 rounded-3xl shadow-organic hover:shadow-organic-hover transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="text-xs font-semibold text-slate-400 mb-1">{m.name}</div>
                    <div className="text-xl font-bold text-slate-900">{m.value}</div>
                    <div className="text-[11px] font-medium text-emerald-600 mt-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> {m.change}
                    </div>
                  </div>
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border ${m.color} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center Column: Animated Digital Twin Avatar Box */}
          <div className="lg:col-span-6 bg-gradient-to-b from-sky-50/50 via-[#FAF9F6] to-teal-50/30 border border-sky-100/90 rounded-3xl p-8 shadow-organic text-center relative min-h-[480px] flex flex-col items-center justify-center">
            
            {/* Live Synchronized Badge */}
            <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-white/90 px-3.5 py-1.5 rounded-full border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-sm">
              <span className={`w-2.5 h-2.5 rounded-full bg-emerald-500 ${pulse ? 'animate-ping' : ''}`} />
              <span>Digital Twin Live Sync</span>
            </div>

            {/* Avatar Graphics & Aura Ring */}
            <div className="relative w-64 h-64 flex items-center justify-center my-6">
              
              {/* Outer Radiating Concentric Waves */}
              <div className="absolute inset-0 rounded-full border border-sky-300/30 animate-ping opacity-20 pointer-events-none" />
              <div className="absolute inset-4 rounded-full border border-teal-300/40 animate-pulse pointer-events-none" />

              {/* Glowing Hologram Avatar Circle */}
              <div className="w-52 h-52 rounded-full bg-gradient-to-tr from-sky-500/10 via-teal-400/20 to-indigo-500/10 border border-sky-200 shadow-inner flex items-center justify-center relative">
                
                {/* SVG Human Avatar Silhouette with Biometric Dots */}
                <svg viewBox="0 0 100 100" className="w-36 h-36 drop-shadow-lg">
                  {/* Head */}
                  <circle cx="50" cy="25" r="14" fill="#0284C7" opacity="0.85" />
                  {/* Body Torso */}
                  <path d="M25 80 C 25 50, 75 50, 75 80 Z" fill="#0EA5E9" opacity="0.85" />
                  
                  {/* Pulsing Synapses */}
                  <circle cx="50" cy="25" r="4" fill="#FFFFFF" className="animate-pulse" />
                  <circle cx="50" cy="45" r="3" fill="#10B981" className="animate-ping" />
                  <circle cx="42" cy="55" r="2.5" fill="#38BDF8" />
                  <circle cx="58" cy="55" r="2.5" fill="#38BDF8" />
                </svg>

                {/* Floating Bio Metrics Floating Tags */}
                <div className="absolute -top-2 left-4 bg-white/95 px-3.5 py-1 rounded-full border border-sky-200 text-[10px] font-bold text-sky-700 shadow-sm animate-float">
                  HRV 68ms
                </div>
                <div className="absolute bottom-2 right-2 bg-white/95 px-3.5 py-1 rounded-full border border-teal-200 text-[10px] font-bold text-teal-700 shadow-sm animate-float-delayed">
                  Immunity Peak
                </div>
              </div>
            </div>

            {/* Digital Twin Summary Callout */}
            <div className="max-w-md bg-white border border-slate-200/60 p-4 rounded-2xl shadow-sm text-left">
              <div className="text-xs font-bold text-slate-900 mb-1 flex items-center justify-between">
                <span>Autonomous AI Twin Status</span>
                <span className="text-emerald-600 font-semibold">99.8% Fidelity</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Biomechanical twin is synchronized with 4 connected continuous sensors. Predicting optimal metabolic efficiency for the next 48 hours.
              </p>
            </div>

          </div>

          {/* Right Column Metrics (4 items) */}
          <div className="lg:col-span-3 space-y-4">
            {metrics.slice(4, 8).map((m, idx) => {
              const Icon = m.icon;
              return (
                <div 
                  key={idx}
                  className="bg-[#FAF9F6] border border-sky-100/80 p-5 rounded-3xl shadow-organic hover:shadow-organic-hover transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="text-xs font-semibold text-slate-400 mb-1">{m.name}</div>
                    <div className="text-xl font-bold text-slate-900">{m.value}</div>
                    <div className="text-[11px] font-medium text-emerald-600 mt-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> {m.change}
                    </div>
                  </div>
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border ${m.color} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
