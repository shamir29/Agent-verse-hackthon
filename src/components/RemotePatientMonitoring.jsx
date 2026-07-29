import React from 'react';
import { Watch, Activity, Droplets, Heart, Radio, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

const wearables = [
  {
    name: "Apple Watch Ultra 2",
    category: "Continuous Biometrics",
    icon: Watch,
    metric: "72 BPM • SpO2 99%",
    freq: "Every 1 sec",
    status: "Live Streaming",
    color: "from-sky-500 to-blue-600 text-sky-600 bg-sky-50 border-sky-200"
  },
  {
    name: "Oura Ring Gen 4",
    category: "Nocturnal & Temp Matrix",
    icon: Activity,
    metric: "Temp +0.1°C • HRV 68ms",
    freq: "Continuous nocturnal",
    status: "Active Sync",
    color: "from-teal-500 to-emerald-600 text-teal-600 bg-teal-50 border-teal-200"
  },
  {
    name: "Dexcom G7 Sensor",
    category: "Continuous Glucose (CGM)",
    icon: Droplets,
    metric: "94 mg/dL Steady",
    freq: "Every 5 mins",
    status: "Optimal Range",
    color: "from-amber-500 to-orange-600 text-amber-600 bg-amber-50 border-amber-200"
  },
  {
    name: "Withings BP Connect",
    category: "Hemodynamic Monitor",
    icon: Heart,
    metric: "118 / 78 mmHg",
    freq: "Twice daily",
    status: "Nominal",
    color: "from-rose-500 to-red-600 text-rose-600 bg-rose-50 border-rose-200"
  },
  {
    name: "BioIntelliSense ECG Patch",
    category: "Clinical Arrhythmia Guard",
    icon: Radio,
    metric: "Lead-1 ECG Normal",
    freq: "Real-time telemetry",
    status: "Sub-clinical Watch",
    color: "from-purple-500 to-indigo-600 text-purple-600 bg-purple-50 border-purple-200"
  }
];

export default function RemotePatientMonitoring() {
  return (
    <section id="monitoring" className="py-24 bg-[#FAF9F6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold mb-4">
            <Radio className="w-3.5 h-3.5 text-teal-600" />
            <span>Section 09 • Remote Patient Monitoring & Wearables</span>
          </div>
          <h2 className="font-['Outfit'] font-bold text-3xl sm:text-5xl text-slate-950 tracking-tight mb-4">
            Data flows seamlessly into your Digital Twin.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Connect your favorite luxury medical sensors and consumer wearables into a unified, encrypted health stream analyzed by AI 24/7.
          </p>
        </div>

        {/* Wearables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {wearables.map((device, idx) => {
            const Icon = device.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-sky-100/90 rounded-3xl p-6 shadow-organic hover:shadow-organic-hover transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs ${device.color} group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{device.category}</span>
                  <h4 className="font-['Outfit'] font-bold text-base text-slate-900 mb-2">{device.name}</h4>
                  
                  <div className="bg-[#FAF9F6] p-3 rounded-xl border border-slate-200/50 mb-3">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Live Telemetry</div>
                    <div className="text-xs font-extrabold text-slate-900">{device.metric}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-100">
                  <span>{device.freq}</span>
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Syncing
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Central Data Stream Animation Graphic */}
        <div className="bg-white border border-sky-100 rounded-3xl p-8 shadow-organic text-center relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4 text-left">
              <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                <Sparkles className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-['Outfit'] font-bold text-xl text-slate-900">Unified Health Pipeline</h4>
                <p className="text-xs text-slate-500">HIPAA & GDPR End-to-End Encrypted Telemetry Ingestion</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-sky-700 bg-sky-50 border border-sky-100 px-5 py-3 rounded-full">
              <span>Streaming 1.2M Biometric Points / Day</span>
              <ArrowRight className="w-4 h-4 text-sky-600 animate-pulse" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
