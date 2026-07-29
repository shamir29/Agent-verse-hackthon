import React, { useState } from 'react';
import { Sparkles, Droplets, Moon, Calendar, Heart, Activity, Flame, CheckCircle2, ChevronRight } from 'lucide-react';

const initialInsights = [
  {
    id: 1,
    title: "Hydration Optimization",
    desc: "Drink 500ml mineral water with electrolytes now. Your midday sweat rate during workout elevated renal sodium excretion.",
    icon: Droplets,
    color: "bg-sky-50 text-sky-600 border-sky-200",
    action: "Log 500ml Intake",
    tag: "Hydration"
  },
  {
    id: 2,
    title: "Circadian Wind-Down",
    desc: "Begin sleep preparation by 10:15 PM tonight. Yesterday's REM sleep dipped by 12% following screen exposure after 9 PM.",
    icon: Moon,
    color: "bg-indigo-50 text-indigo-600 border-indigo-200",
    action: "Enable Wind-Down Mode",
    tag: "Sleep"
  },
  {
    id: 3,
    title: "Preventive Blood Panel",
    desc: "Schedule annual NMR lipid and ApoB re-evaluation panel. Your last report was 11 months ago.",
    icon: Calendar,
    color: "bg-emerald-50 text-emerald-600 border-emerald-200",
    action: "Schedule via Quest AI",
    tag: "Preventive"
  },
  {
    id: 4,
    title: "Cardiologist Consultation",
    desc: "Routine annual virtual check-in with Dr. Elena Rostova confirmed for Thursday 10:00 AM.",
    icon: Heart,
    color: "bg-rose-50 text-rose-600 border-rose-200",
    action: "View Appointment",
    tag: "Cardiology"
  },
  {
    id: 5,
    title: "Zone-2 Aerobic Activity",
    desc: "Target 30 minutes of low-intensity walking today to maintain high mitochondrial fat oxidation.",
    icon: Activity,
    color: "bg-teal-50 text-teal-600 border-teal-200",
    action: "Start Workout Tracking",
    tag: "Fitness"
  },
  {
    id: 6,
    title: "Dietary Sodium Target",
    desc: "Limit sodium intake to under 2,000mg today to support optimal resting blood pressure (118/78 mmHg).",
    icon: Flame,
    color: "bg-amber-50 text-amber-600 border-amber-200",
    action: "Log Meals",
    tag: "Nutrition"
  }
];

export default function AIInsights() {
  const [completedIds, setCompletedIds] = useState([]);

  const toggleComplete = (id) => {
    setCompletedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="insights" className="py-24 bg-[#FAF9F6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Section 13 • Personalized AI Micro-Insights</span>
          </div>
          <h2 className="font-['Outfit'] font-bold text-3xl sm:text-5xl text-slate-950 tracking-tight mb-4">
            Small daily adjustments, massive longevity gains.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Floating, actionable recommendation cards generated continuously by AI tailored to your live biometrics, genetics, and daily routine.
          </p>
        </div>

        {/* Floating Recommendation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialInsights.map((insight) => {
            const Icon = insight.icon;
            const isCompleted = completedIds.includes(insight.id);
            return (
              <div
                key={insight.id}
                className={`bg-white border rounded-3xl p-6 shadow-organic hover:shadow-organic-hover transition-all flex flex-col justify-between group ${
                  isCompleted ? 'border-emerald-200 opacity-75' : 'border-sky-100/90'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-xs ${insight.color} group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                      {insight.tag}
                    </span>
                  </div>

                  <h4 className="font-['Outfit'] font-bold text-lg text-slate-900 mb-2">{insight.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {insight.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => toggleComplete(insight.id)}
                    className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-900 hover:bg-sky-600 text-white shadow-sm'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isCompleted ? 'Completed' : insight.action}</span>
                  </button>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
