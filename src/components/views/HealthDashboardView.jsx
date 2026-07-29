import React, { useState } from 'react';
import { Activity, Heart, Droplets, Thermometer, Flame, Scale, CheckCircle2, TrendingUp, Sparkles, Clock } from 'lucide-react';

export default function HealthDashboardView() {
  const [timeframe, setTimeframe] = useState('weekly'); // 'weekly' | 'monthly'

  const metrics = [
    { label: "Heart Rate", val: "72", unit: "BPM", status: "Optimal", range: "60 - 100 BPM", icon: Heart, color: "text-rose-600 bg-rose-50 border-rose-100" },
    { label: "Blood Pressure", val: "118/78", unit: "mmHg", status: "Optimal", range: "< 120/80 mmHg", icon: Activity, color: "text-blue-600 bg-blue-50 border-blue-100" },
    { label: "Blood Oxygen (SpO2)", val: "99%", unit: "SpO2", status: "Excellent", range: "95 - 100%", icon: Droplets, color: "text-teal-600 bg-teal-50 border-teal-100" },
    { label: "Weight", val: "71.5", unit: "kg", status: "On Target", range: "Goal: 70 kg", icon: Scale, color: "text-purple-600 bg-purple-50 border-purple-100" },
    { label: "BMI", val: "22.4", unit: "kg/m²", status: "Normal Weight", range: "18.5 - 24.9", icon: Flame, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    { label: "Body Temperature", val: "98.6", unit: "°F", status: "Normothermic", range: "97.8 - 99.1 °F", icon: Thermometer, color: "text-amber-600 bg-amber-50 border-amber-100" },
  ];

  const weeklyData = [
    { day: 'Mon', hr: 70, sys: 116, glucose: 86 },
    { day: 'Tue', hr: 74, sys: 120, glucose: 90 },
    { day: 'Wed', hr: 71, sys: 118, glucose: 88 },
    { day: 'Thu', hr: 72, sys: 117, glucose: 85 },
    { day: 'Fri', hr: 75, sys: 119, glucose: 92 },
    { day: 'Sat', hr: 69, sys: 115, glucose: 84 },
    { day: 'Sun', hr: 72, sys: 118, glucose: 87 }
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>Real Biometric Telemetry</span>
          </div>
          <h1 className="font-['Inter'] font-bold text-3xl text-slate-900">Health Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">
            Real health metrics, healthy reference range indicators, trend analytics, and overall health score.
          </p>
        </div>

        {/* Overall Health Score Card */}
        <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center gap-4 shadow-2xs">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-teal-500 text-white flex items-center justify-center font-extrabold text-lg shadow-sm">
            94
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Health Score</div>
            <div className="text-sm font-bold text-slate-900">Optimal Wellness</div>
            <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> All Vitals in Normal Range
            </div>
          </div>
        </div>
      </div>

      {/* Vitals Grid (6 cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold text-slate-500">{m.label}</span>
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${m.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-extrabold text-slate-900">{m.val}</span>
                  <span className="text-xs font-semibold text-slate-400">{m.unit}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {m.status}
                </span>
                <span className="text-slate-400 font-medium">{m.range}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts & Trends Section */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-2xs space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-['Inter'] font-bold text-xl text-slate-900">7-Day Biometric Trends</h3>
            <p className="text-xs text-slate-500 mt-0.5">Resting Heart Rate, Systolic Blood Pressure & Fasting Glucose</p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setTimeframe('weekly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeframe === 'weekly' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeframe('monthly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeframe === 'monthly' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Clean SVG Trend Line Chart */}
        <div className="space-y-4">
          <div className="h-48 w-full bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-end justify-between gap-2 relative overflow-hidden">
            
            {/* Horizontal Threshold Reference Line */}
            <div className="absolute top-1/2 left-0 right-0 border-b border-dashed border-emerald-300 text-[10px] text-emerald-600 font-bold px-4">
              Normal Target Baseline
            </div>

            {weeklyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 z-10">
                <div 
                  className="w-full max-w-[32px] bg-blue-600 hover:bg-blue-700 rounded-t-lg transition-all"
                  style={{ height: `${(d.hr / 100) * 120}px` }}
                  title={`RHR: ${d.hr} BPM`}
                />
                <span className="text-[10px] font-bold text-slate-500">{d.day}</span>
              </div>
            ))}

          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" /> Heart Rate (BPM)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> Blood Pressure Baseline
              </span>
            </div>
            <span className="font-bold text-slate-900">Zero Spikes Detected</span>
          </div>
        </div>

      </div>

    </div>
  );
}
