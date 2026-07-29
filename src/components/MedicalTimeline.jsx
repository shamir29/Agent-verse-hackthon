import React, { useState } from 'react';
import { Sun, Sunset, Moon, Sunrise, Pill, Stethoscope, Watch, Utensils, Droplets, Dumbbell, Zap, CheckCircle, Clock } from 'lucide-react';

const timelinePeriods = [
  { id: 'morning', name: 'Morning', time: '07:00 AM - 11:59 AM', icon: Sunrise, color: 'bg-amber-100 text-amber-700 border-amber-200' },
  { id: 'afternoon', name: 'Afternoon', time: '12:00 PM - 04:59 PM', icon: Sun, color: 'bg-sky-100 text-sky-700 border-sky-200' },
  { id: 'evening', name: 'Evening', time: '05:00 PM - 08:59 PM', icon: Sunset, color: 'bg-teal-100 text-teal-700 border-teal-200' },
  { id: 'night', name: 'Night', time: '09:00 PM - 06:59 AM', icon: Moon, color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
];

const timelineEvents = {
  morning: [
    {
      time: "07:15 AM",
      type: "Wearable Sync",
      title: "Apple Watch & Oura Sync Completed",
      desc: "Restorative sleep index logged at 92/100. HRV 68ms.",
      icon: Watch,
      badge: "Completed",
      badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-200"
    },
    {
      time: "08:00 AM",
      type: "Medication",
      title: "Morning Longevity Protocol",
      desc: "CoQ10 Ubiquinol (100mg) + Vitamin D3/K2. Confirmed via smart pillbox.",
      icon: Pill,
      badge: "Taken",
      badgeColor: "bg-sky-50 text-sky-600 border-sky-200"
    },
    {
      time: "08:30 AM",
      type: "Nutritional Macro",
      title: "Metabolic Breakfast Intake",
      desc: "35g Protein, 12g Healthy Fats, 25g Low-GI Carbs. Blood glucose impact: +8 mg/dL.",
      icon: Utensils,
      badge: "Optimal Glucose",
      badgeColor: "bg-teal-50 text-teal-600 border-teal-200"
    },
    {
      time: "10:30 AM",
      type: "Hydration Sync",
      title: "Smart Bottle Hydration Trigger",
      desc: "500ml mineral water consumed. Daily goal: 42% reached.",
      icon: Droplets,
      badge: "Hydrated",
      badgeColor: "bg-sky-50 text-sky-600 border-sky-200"
    }
  ],
  afternoon: [
    {
      time: "01:15 PM",
      type: "AI Doctor Visit",
      title: "Cardiology Virtual Check-in",
      desc: "Dr. AI Assistant reviewed continuous ECG strips. All intervals normal.",
      icon: Stethoscope,
      badge: "Verified",
      badgeColor: "bg-indigo-50 text-indigo-600 border-indigo-200"
    },
    {
      time: "03:00 PM",
      type: "Exercise Event",
      title: "Zone-2 Aerobic Session",
      desc: "35-min treadmill incline walk. Target heart rate maintained at 128 BPM.",
      icon: Dumbbell,
      badge: "+340 kcal",
      badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-200"
    },
    {
      time: "04:30 PM",
      type: "Stress Alert",
      title: "Autonomic Stress Spike Detected",
      desc: "Galvanic skin response elevated briefly during video call. AI triggered 2-min box breathing.",
      icon: Zap,
      badge: "Resolved",
      badgeColor: "bg-amber-50 text-amber-600 border-amber-200"
    }
  ],
  evening: [
    {
      time: "06:30 PM",
      type: "Nutritional Intake",
      title: "Anti-Inflammatory Dinner",
      desc: "Wild salmon, quinoa, dark leafy greens, avocado oil. Omega-3 rich.",
      icon: Utensils,
      badge: "Anti-Inflammatory",
      badgeColor: "bg-teal-50 text-teal-600 border-teal-200"
    },
    {
      time: "08:00 PM",
      type: "Medication",
      title: "Evening Magnesium Protocol",
      desc: "Magnesium L-Threonate + Ashwagandha for nervous system recovery.",
      icon: Pill,
      badge: "Taken",
      badgeColor: "bg-sky-50 text-sky-600 border-sky-200"
    }
  ],
  night: [
    {
      time: "09:30 PM",
      type: "Sleep Preparation",
      title: "Melatonin Signaling Activation",
      desc: "Smart lights dimmed to warm 2200K. Ambient temperature lowered to 67°F.",
      icon: Moon,
      badge: "Automated",
      badgeColor: "bg-indigo-50 text-indigo-600 border-indigo-200"
    },
    {
      time: "10:30 PM",
      type: "Continuous Monitoring",
      title: "Nocturnal Vitals & Apnea Tracking",
      desc: "AI continuous monitoring active. Oxygen saturation & respiratory rate steady.",
      icon: Watch,
      badge: "Active Guard",
      badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-200"
    }
  ]
};

export default function MedicalTimeline() {
  const [activePeriod, setActivePeriod] = useState('morning');
  const events = timelineEvents[activePeriod];

  return (
    <section id="timeline" className="py-24 bg-[#FAF9F6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold mb-4">
            <Clock className="w-3.5 h-3.5 text-teal-600" />
            <span>Section 03 • AI Medical Timeline</span>
          </div>
          <h2 className="font-['Outfit'] font-bold text-3xl sm:text-5xl text-slate-950 tracking-tight mb-4">
            A day in your personalized healthcare.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Instead of complex analytics charts, scroll through a continuous narrative of your daily health events, AI interventions, and biometric milestones.
          </p>
        </div>

        {/* Horizontal Timeline Period Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {timelinePeriods.map((period) => {
            const Icon = period.icon;
            const isActive = activePeriod === period.id;
            return (
              <button
                key={period.id}
                onClick={() => setActivePeriod(period.id)}
                className={`p-5 rounded-3xl border transition-all text-left flex items-center justify-between group ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/10 scale-102'
                    : 'bg-white text-slate-800 border-slate-200/60 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${isActive ? 'text-sky-300' : 'text-slate-400'}`}>
                    {period.name}
                  </div>
                  <div className={`text-sm font-semibold ${isActive ? 'text-slate-200' : 'text-slate-600'}`}>
                    {period.time}
                  </div>
                </div>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${
                  isActive ? 'bg-slate-800 border-slate-700 text-sky-300' : period.color
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Horizontal Scrollable Event Flow Line */}
        <div className="relative">
          
          {/* Connector Line behind events */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-200 via-teal-200 to-indigo-200 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
            {events.map((evt, idx) => {
              const Icon = evt.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-sky-100/80 rounded-3xl p-6 shadow-organic hover:shadow-organic-hover transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Time & Badge */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-xs font-bold text-slate-900 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/60">
                        {evt.time}
                      </span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${evt.badgeColor}`}>
                        {evt.badge}
                      </span>
                    </div>

                    {/* Icon & Event Type */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{evt.type}</span>
                    </div>

                    {/* Title & Description */}
                    <h4 className="font-['Outfit'] font-bold text-base text-slate-900 mb-2 leading-snug">
                      {evt.title}
                    </h4>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {evt.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-sky-600">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> AI Verified
                    </span>
                    <span>Logged to Twin</span>
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
