import React from 'react';
import { 
  Zap, 
  Sun, 
  Brain, 
  Scale, 
  Activity, 
  ShieldAlert, 
  CheckCircle2, 
  BarChart3 
} from 'lucide-react';

const WORKFLOW_STEPS = [
  {
    step: 1,
    title: "1. Power Generated",
    subtitle: "Clean energy harnessed at scale",
    description: "Hydro dam baseload and offshore wind parks feed 500kV transmission corridors.",
    icon: <Zap className="w-5 h-5 text-blue-600" />
  },
  {
    step: 2,
    title: "2. Renewables Integrated",
    subtitle: "Solar & Wind synchronization",
    description: "High-speed inverters dynamic VAR compensation aligns solar and wind wave frequencies.",
    icon: <Sun className="w-5 h-5 text-emerald-600" />
  },
  {
    step: 3,
    title: "3. AI Forecasts Demand",
    subtitle: "Deep Transformer Neural Models",
    description: "Neural net predicts 24-hour city consumption curves with 99.4% accuracy.",
    icon: <Brain className="w-5 h-5 text-indigo-600" />
  },
  {
    step: 4,
    title: "4. Grid Load Analysis",
    subtitle: "Phase & Transformer Thermal Scan",
    description: "Real-time thermal monitoring computes headroom margins across all 142 substations.",
    icon: <Scale className="w-5 h-5 text-amber-600" />
  },
  {
    step: 5,
    title: "5. Dynamic Power Distribution",
    subtitle: "Zero-Downtime Switching",
    description: "Smart switches direct power away from congested bottlenecks to industrial zones.",
    icon: <Activity className="w-5 h-5 text-blue-600" />
  },
  {
    step: 6,
    title: "6. Fault Detection",
    subtitle: "3.4ms Transient Wave Scan",
    description: "Micro-PMU sensors catch tree strikes or short circuits instantaneously.",
    icon: <ShieldAlert className="w-5 h-5 text-rose-600" />
  },
  {
    step: 7,
    title: "7. Self-Healing Grid",
    subtitle: "34.2ms Automated Power Rerouting",
    description: "Grid agent trips vacuum breakers and reroutes power along backup loops without customer outage.",
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />
  },
  {
    step: 8,
    title: "8. Performance Analytics",
    subtitle: "Continuous Telemetry Audit",
    description: "Cost savings, carbon offset metrics, and equipment health stored for enterprise compliance.",
    icon: <BarChart3 className="w-5 h-5 text-blue-600" />
  }
];

export const UserJourneyStoryline: React.FC = () => {
  return (
    <section id="storyline" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
            <span>Autonomous Grid Lifecycle</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How The Smart Grid AI Agent Operates
          </h2>
          <p className="text-slate-600 text-sm">
            From generation to sub-millisecond self-healing: experience the continuous 8-step lifecycle of autonomous power distribution.
          </p>
        </div>

        {/* Vertical Storyline Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Connecting Line */}
          <div className="absolute top-8 bottom-8 left-6 md:left-1/2 -translate-x-1/2 w-1 bg-slate-200 rounded-full z-0"></div>

          <div className="space-y-10 relative z-10">
            {WORKFLOW_STEPS.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={item.step}
                  className={`flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card */}
                  <div className="w-full md:w-1/2 pl-14 md:pl-0 md:px-8">
                    <div className="p-6 rounded-[20px] bg-slate-50 border border-slate-200/80 shadow-apple hover:border-blue-300 transition-all space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-sm">
                          {item.icon}
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.subtitle}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  {/* Center Node Badge */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-4 border-blue-600 flex items-center justify-center font-bold text-xs text-slate-900 shadow-md">
                    {item.step}
                  </div>

                  {/* Spacer for 2-column alignment */}
                  <div className="hidden md:block w-1/2"></div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
