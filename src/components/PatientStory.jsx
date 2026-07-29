import React, { useState } from 'react';
import { AlertCircle, Bot, UserCheck, FileSearch, Stethoscope, Pill, Heart, ShieldCheck, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

const storyStages = [
  {
    step: 1,
    title: "Symptoms Signal",
    subtitle: "Subtle Biomarker Shift",
    icon: AlertCircle,
    color: "bg-amber-100 text-amber-800 border-amber-200",
    details: "Continuous PPG wrist sensor logs a subtle 4% reduction in heart rate variability during rest, paired with elevated nocturnal skin temperature (+0.3°C)."
  },
  {
    step: 2,
    title: "AI Screening",
    subtitle: "Autonomous Risk Prediction",
    icon: Bot,
    color: "bg-sky-100 text-sky-800 border-sky-200",
    details: "AURA AI algorithms cross-reference 100,000 anonymized clinical trajectories, flagging a 94.2% probability of transient inflammatory immune response."
  },
  {
    step: 3,
    title: "Doctor Review",
    subtitle: "Virtual Specialist Sign-Off",
    icon: UserCheck,
    color: "bg-indigo-100 text-indigo-800 border-indigo-200",
    details: "Attending Tele-Physician reviews automated AI triage package, approving a non-invasive confirmatory blood work panel."
  },
  {
    step: 4,
    title: "Lab Tests",
    subtitle: "Optical Scanner & Biomarkers",
    icon: FileSearch,
    color: "bg-teal-100 text-teal-800 border-teal-200",
    details: "Patient uploads blood work PDF. AI optical OCR extracts hs-CRP (0.4 mg/L) and Vitamin D3 (28 ng/mL) with instant reference range tagging."
  },
  {
    step: 5,
    title: "Diagnosis",
    subtitle: "High-Confidence Synthesis",
    icon: Stethoscope,
    color: "bg-purple-100 text-purple-800 border-purple-200",
    details: "AI engine generates precise diagnosis of sub-clinical vitamin D deficiency with zero endothelial inflammatory risk."
  },
  {
    step: 6,
    title: "Treatment",
    subtitle: "Personalized Micro-Protocol",
    icon: Pill,
    color: "bg-rose-100 text-rose-800 border-rose-200",
    details: "Smart pillbox dispatched with 5,000 IU Vitamin D3 + K2 and CoQ10 Ubiquinol, calibrated specifically to the patient's MTHFR genomic profile."
  },
  {
    step: 7,
    title: "Recovery",
    subtitle: "Digital Twin Verification",
    icon: Heart,
    color: "bg-pink-100 text-pink-800 border-pink-200",
    details: "Over 14 days, continuous sensors log a +18% increase in resting HRV and complete restoration of deep sleep REM cycles."
  },
  {
    step: 8,
    title: "Preventive Care",
    subtitle: "Long-Term Health Span Shield",
    icon: ShieldCheck,
    color: "bg-emerald-100 text-emerald-800 border-emerald-200",
    details: "Patient enters lifelong preventive maintenance mode. AI continuously adapts micro-nutritional intake to keep biological age 4.2 years younger."
  }
];

export default function PatientStory() {
  const [activeStep, setActiveStep] = useState(1);
  const currentStage = storyStages.find(s => s.step === activeStep) || storyStages[0];

  return (
    <section id="journey" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Section 14 • The Complete Patient Healthcare Story</span>
          </div>
          <h2 className="font-['Outfit'] font-bold text-3xl sm:text-5xl text-slate-950 tracking-tight mb-4">
            A journey built on trust, intelligence, & care.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Follow the 8-stage interactive lifecycle of how AURA AI accompanies every patient from early symptom detection to lifelong preventive wellness.
          </p>
        </div>

        {/* Stepper Node Progress Bar */}
        <div className="mb-12 overflow-x-auto pb-4">
          <div className="flex items-center justify-between min-w-[700px] relative px-4">
            
            {/* Connecting line behind buttons */}
            <div className="absolute top-1/2 left-8 right-8 h-1 bg-slate-100 -translate-y-1/2 z-0" />

            {storyStages.map((stage) => {
              const Icon = stage.icon;
              const isActive = activeStep === stage.step;
              const isPast = activeStep > stage.step;
              return (
                <button
                  key={stage.step}
                  onClick={() => setActiveStep(stage.step)}
                  className={`relative z-10 flex flex-col items-center group focus:outline-none`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white border-slate-900 scale-110 shadow-lg shadow-slate-900/20'
                      : isPast
                      ? 'bg-emerald-500 text-white border-emerald-500'
                      : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-bold mt-2 uppercase tracking-wider ${
                    isActive ? 'text-slate-900' : 'text-slate-400'
                  }`}>
                    Stage {stage.step}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Detailed Story Card */}
        <div className="max-w-4xl mx-auto bg-[#FAF9F6] border border-sky-100/90 rounded-3xl p-8 sm:p-10 shadow-organic">
          
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200/60">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${currentStage.color} shadow-sm`}>
                <currentStage.icon className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Stage 0{currentStage.step} of 08</span>
                <h3 className="font-['Outfit'] font-bold text-2xl sm:text-3xl text-slate-900">{currentStage.title}</h3>
                <div className="text-xs font-semibold text-sky-700 mt-0.5">{currentStage.subtitle}</div>
              </div>
            </div>

            {/* Step Navigation Controls */}
            <div className="flex items-center gap-2">
              <button
                disabled={activeStep === 1}
                onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 disabled:opacity-40"
              >
                Previous
              </button>
              <button
                disabled={activeStep === 8}
                onClick={() => setActiveStep(prev => Math.min(8, prev + 1))}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-md hover:bg-sky-600 transition-colors flex items-center gap-1 disabled:opacity-40"
              >
                <span>Next Stage</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-slate-700 text-base leading-relaxed bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm mb-6">
            "{currentStage.details}"
          </p>

          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5 text-emerald-600">
              <ShieldCheck className="w-4 h-4" /> HIPAA Certified & Encrypted Journey
            </span>
            <span>Step {activeStep} / 8 Completed</span>
          </div>

        </div>

      </div>
    </section>
  );
}
