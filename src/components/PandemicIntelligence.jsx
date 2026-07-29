import React, { useState } from 'react';
import { Globe, ShieldCheck, AlertTriangle, TrendingDown, Users, Sparkles, Activity, CheckCircle2 } from 'lucide-react';

const regions = [
  { name: "North America", risk: "Low (0.12 R0)", capacity: "88% Available", vaccine: "92.4% Immune", status: "Nominal Guard" },
  { name: "Western Europe", risk: "Sub-clinical (0.18 R0)", capacity: "84% Available", vaccine: "94.1% Immune", status: "Nominal Guard" },
  { name: "East Asia & Pacific", risk: "Low (0.10 R0)", capacity: "91% Available", vaccine: "96.2% Immune", status: "Optimal Shield" },
  { name: "Latin America", risk: "Moderate Watch", capacity: "78% Available", vaccine: "87.5% Immune", status: "Active Surveillance" }
];

export default function PandemicIntelligence() {
  const [activeRegion, setActiveRegion] = useState(0);

  return (
    <section id="pandemic" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold mb-4">
            <Globe className="w-3.5 h-3.5 text-sky-600" />
            <span>Section 12 • Global Pandemic & Outbreak Intelligence</span>
          </div>
          <h2 className="font-['Outfit'] font-bold text-3xl sm:text-5xl text-slate-950 tracking-tight mb-4">
            Global biosecurity, predicted early.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Worldwide epidemiological AI tracking genomic mutations, disease transmission vectors, regional hospital capacity, and global vaccination progress.
          </p>
        </div>

        {/* World Map Visualization Card */}
        <div className="bg-[#FAF9F6] border border-sky-100/90 rounded-3xl p-8 sm:p-10 shadow-organic">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: World Graphic with Floating Prediction Bubbles */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm relative min-h-[340px] flex flex-col justify-between">
              
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-500" /> WHO Global Bio-Grid Surveillance
                </div>
                <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Global R0 &lt; 0.25 (Sub-Epidemic)
                </div>
              </div>

              {/* Vector World Grid Simulation with Floating Bubbles */}
              <div className="relative h-48 my-4 flex items-center justify-center">
                
                {/* World Vector Lines */}
                <div className="w-full h-full border border-dashed border-sky-200 rounded-2xl flex items-center justify-center relative overflow-hidden bg-sky-50/20">
                  <Globe className="w-40 h-40 text-sky-200/60 animate-pulse" />

                  {/* Hotspot Prediction Bubbles */}
                  <div className="absolute top-8 left-16 bg-emerald-500/20 text-emerald-700 border border-emerald-300 px-3 py-1 rounded-full text-[10px] font-bold animate-float">
                    NA: R0 0.12 (Safe)
                  </div>
                  <div className="absolute top-12 right-24 bg-emerald-500/20 text-emerald-700 border border-emerald-300 px-3 py-1 rounded-full text-[10px] font-bold animate-float-delayed">
                    EU: R0 0.18 (Normal)
                  </div>
                  <div className="absolute bottom-8 right-16 bg-teal-500/20 text-teal-700 border border-teal-300 px-3 py-1 rounded-full text-[10px] font-bold animate-float">
                    ASIA: R0 0.10 (Optimal)
                  </div>
                </div>

              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
                <span>194 Member Nations Monitored</span>
                <span className="font-semibold text-slate-900">Zero Critical Outbreak Triggers</span>
              </div>

            </div>

            {/* Right: Regional Breakdown Cards */}
            <div className="lg:col-span-5 space-y-3">
              {regions.map((reg, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveRegion(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    activeRegion === idx
                      ? 'bg-white border-sky-300 shadow-md ring-2 ring-sky-400/20'
                      : 'bg-white/60 border-slate-200/60 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-['Outfit'] font-bold text-base text-slate-900">{reg.name}</h4>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {reg.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mt-2">
                    <div>Transmission Risk: <span className="font-bold text-slate-900">{reg.risk}</span></div>
                    <div>Capacity: <span className="font-bold text-slate-900">{reg.capacity}</span></div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
