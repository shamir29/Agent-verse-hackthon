import React, { useState, useEffect } from 'react';
import { Bot, Crosshair, Sparkles, Activity, ShieldCheck, CheckCircle2, Zap } from 'lucide-react';

export default function SurgeryAI() {
  const [precision, setPrecision] = useState(99.98);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrecision(+(99.97 + Math.random() * 0.02).toFixed(2));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="surgery" className="py-24 bg-[#FAF9F6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold mb-4">
            <Bot className="w-3.5 h-3.5 text-emerald-600" />
            <span>Section 11 • Autonomous Robotic Surgery AI</span>
          </div>
          <h2 className="font-['Outfit'] font-bold text-3xl sm:text-5xl text-slate-950 tracking-tight mb-4">
            Sub-millimeter robotic precision.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            DaVinci XI AI-assisted robotic arms execute micro-sutures and laparoscopic procedures with active tremor cancellation and live 3D anatomical overlays.
          </p>
        </div>

        {/* Interactive Surgery Visualizer Box */}
        <div className="max-w-5xl mx-auto bg-white border border-sky-100 rounded-3xl p-8 sm:p-10 shadow-organic">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Graphic Visualizer with Moving Robotic Arms & Target Scope */}
            <div className="lg:col-span-6 bg-slate-950 rounded-3xl p-8 relative overflow-hidden min-h-[380px] flex items-center justify-center border border-slate-800 shadow-xl">
              
              {/* Grid Background Lines */}
              <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

              {/* Crosshair Target Reticle */}
              <div className="relative w-56 h-56 rounded-full border border-sky-500/40 flex items-center justify-center animate-spin-slow">
                <div className="w-40 h-40 rounded-full border border-emerald-400/40 border-dashed" />
                <Crosshair className="w-8 h-8 text-sky-400 animate-pulse absolute" />
              </div>

              {/* Robotic Arm Arms (SVG overlays) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300">
                {/* Arm 1 Top Left */}
                <path d="M 20 20 L 120 100 L 170 140" fill="none" stroke="#0EA5E9" strokeWidth="4" strokeLinecap="round" />
                <circle cx="170" cy="140" r="5" fill="#38BDF8" className="animate-ping" />

                {/* Arm 2 Top Right */}
                <path d="M 380 20 L 280 100 L 230 140" fill="none" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
                <circle cx="230" cy="140" r="5" fill="#34D399" className="animate-ping" />

                {/* Arm 3 Bottom Center */}
                <path d="M 200 280 L 200 180" fill="none" stroke="#F43F5E" strokeWidth="3" strokeLinecap="round" />
              </svg>

              {/* Live Overlay Metrics */}
              <div className="absolute bottom-4 left-4 bg-slate-900/90 text-white px-3.5 py-1.5 rounded-full border border-slate-700 text-[10px] font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Tremor Cancellation: 100%</span>
              </div>

            </div>

            {/* Right: Telemetry Indicators & Predictions */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Target Anatomy</span>
                  <h4 className="font-['Outfit'] font-bold text-2xl text-slate-900">Laparoscopic Cardiac Micro-Valve Repair</h4>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#FAF9F6] border border-sky-100 p-4 rounded-2xl">
                  <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Sub-Millimeter Precision</div>
                  <div className="text-2xl font-extrabold text-sky-700">{precision}%</div>
                  <div className="text-[10px] text-emerald-600 font-semibold mt-1">± 0.02 mm Margin</div>
                </div>

                <div className="bg-[#FAF9F6] border border-emerald-100 p-4 rounded-2xl">
                  <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Predicted Success</div>
                  <div className="text-2xl font-extrabold text-emerald-700">99.4%</div>
                  <div className="text-[10px] text-emerald-600 font-semibold mt-1">Zero Complication Risk</div>
                </div>
              </div>

              {/* Realtime Safety Protocols */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-sky-50/60 p-3 rounded-xl border border-sky-100">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Sub-second 3D depth mapping active</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Autonomous blood vessel avoidance routing</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
