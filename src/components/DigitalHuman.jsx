import React, { useState } from 'react';
import { Brain, Heart, Wind, Shield, Activity, Sparkles, AlertTriangle, Pill, CheckCircle2, ChevronRight, RefreshCw } from 'lucide-react';


const organData = {
  brain: {
    name: "Brain & Neurological Network",
    icon: Brain,
    score: 96,
    status: "Optimal Neural Plasticity",
    color: "from-purple-500 to-indigo-600",
    bgColor: "bg-purple-50 text-purple-600 border-purple-200",
    currentHealth: "Alpha wave synchronization is optimal (10.4 Hz). Neurotransmitter activity exhibits strong serotonin and dopamine equilibrium.",
    possibleRisks: "Sub-clinical circadian rhythm disruption detected due to late-night blue light exposure (-8% REM quality).",
    recommendedActions: [
      "Integrate 20-min morning light therapy (10,000 lux)",
      "Maintain magnesium L-threonate supplementation prior to sleep",
      "Perform cognitive resonance micro-breaks every 90 minutes"
    ],
    predictions: "Predicting zero cognitive fatigue events over the next 14 days under current workload parameters.",
    medication: ["Magnesium L-Threonate (400mg)", "Omega-3 DHA/EPA (1200mg)"]
  },
  heart: {
    name: "Heart & Cardiovascular System",
    icon: Heart,
    score: 94,
    status: "Ideal Hemodynamic Balance",
    color: "from-rose-500 to-red-600",
    bgColor: "bg-rose-50 text-rose-600 border-rose-200",
    currentHealth: "Left ventricular ejection fraction at 65%. Resting pulse is steady at 72 BPM with high HRV (68 ms).",
    possibleRisks: "Transient arterial wall micro-stiffness detected after intense interval training.",
    recommendedActions: [
      "Maintain active zone-2 cardio 3x weekly (130 BPM target)",
      "Hydrate with electrolyte-dense mineral water post-workout",
      "Monitor arterial compliance via continuous photoplethysmography"
    ],
    predictions: "10-year Cardiovascular event risk estimated at < 0.8% (Lowest decile).",
    medication: ["CoQ10 Ubiquinol (100mg)", "Low-dose Potassium (99mg)"]
  },
  lungs: {
    name: "Lungs & Respiratory System",
    icon: Wind,
    score: 98,
    status: "Peak Oxygenation Efficiency",
    color: "from-sky-500 to-blue-600",
    bgColor: "bg-sky-50 text-sky-600 border-sky-200",
    currentHealth: "VO2 Max measured at 52 ml/kg/min. Pulmonary diffusion rate is 99% with clean bronchial passage clearance.",
    possibleRisks: "Mild seasonal allergen sensitivity detected in upper nasal airway.",
    recommendedActions: [
      "Maintain deep diaphragm breathing exercises (4-7-8 method)",
      "Utilize HEPA air filtration during peak pollen counts"
    ],
    predictions: "Zero lung volume degradation predicted over next 5 years.",
    medication: ["N-Acetyl Cysteine (600mg)", "Quercetin Phytosome"]
  },
  liver: {
    name: "Liver & Metabolic Engine",
    icon: Activity,
    score: 92,
    status: "Healthy Metabolic Clearance",
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50 text-amber-600 border-amber-200",
    currentHealth: "ALT (18 U/L) and AST (21 U/L) are well within optimal reference ranges. Glycogen storage capacity is balanced.",
    possibleRisks: "Intermittent hepatic lipid accumulation risk during high refined carb consumption.",
    recommendedActions: [
      "Incorporate milk thistle extract (silymarin) into daily protocol",
      "Maintain a 14-hour intermittent fasting window twice weekly"
    ],
    predictions: "Metabolic flexibility expected to increase by +12% over 60 days.",
    medication: ["Milk Thistle Silymarin (150mg)", "Alpha Lipoic Acid (300mg)"]
  },
  kidneys: {
    name: "Kidneys & Renal Filtration",
    icon: Shield,
    score: 95,
    status: "Optimal eGFR Filtration",
    color: "from-teal-500 to-emerald-600",
    bgColor: "bg-teal-50 text-teal-600 border-teal-200",
    currentHealth: "eGFR > 105 mL/min/1.73m². Sodium-potassium renal balance is tightly regulated by autonomous endocrine feedback.",
    possibleRisks: "Dehydration index spikes during mid-afternoon hours.",
    recommendedActions: [
      "Increase liquid intake to 2.8L daily with pinch of sea salt",
      "Avoid excess sodium consumption above 2,300mg/day"
    ],
    predictions: "Renal filtration efficiency projected to remain above 95% threshold.",
    medication: ["Hydration Electrolyte Matrix", "Cranberry Extract"]
  },
  bones: {
    name: "Skeletal & Bone Density Matrix",
    icon: Sparkles,
    score: 91,
    status: "High Trabecular Strength",
    color: "from-slate-600 to-slate-800",
    bgColor: "bg-slate-100 text-slate-700 border-slate-200",
    currentHealth: "T-Score +1.2 DEXA baseline. Calcium ion channel deposition in lumbar spine is optimal.",
    possibleRisks: "Sub-optimal Vitamin D3 conversion during winter months.",
    recommendedActions: [
      "Supplement Vitamin D3 + K2 (MK-7) daily with fat-containing meal",
      "Perform progressive resistance weight-bearing exercises"
    ],
    predictions: "Osteopenia risk over lifetime evaluated at < 1.2%.",
    medication: ["Vitamin D3 (5000 IU)", "Vitamin K2 MK-7 (100mcg)"]
  },
  muscles: {
    name: "Musculoskeletal & Recovery Engine",
    icon: Activity,
    score: 89,
    status: "Hypertrophic Recovery Active",
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
    currentHealth: "Lean muscle mass index is 84th percentile. Creatine kinase levels normal post-resistance session.",
    possibleRisks: "Mild hamstrings tightness leading to pelvic tilt compensation.",
    recommendedActions: [
      "Targeted foam rolling & myofascial release on posterior chain",
      "Consume 1.8g protein per kg of bodyweight daily"
    ],
    predictions: "Skeletal muscle synthesis rate predicted to peak 4 hours post-nutrition.",
    medication: ["Essential Amino Acids (EAA)", "Creatine Monohydrate (5g)"]
  }
};

export default function DigitalHuman() {
  const [selectedOrgan, setSelectedOrgan] = useState('heart');
  const organ = organData[selectedOrgan];

  return (
    <section id="digital-human" className="py-24 bg-white relative overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-sky-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold mb-4">
            <Activity className="w-3.5 h-3.5 text-sky-600" />
            <span>Section 02 • Digital Human Visualizer</span>
          </div>
          <h2 className="font-['Outfit'] font-bold text-3xl sm:text-5xl text-slate-950 tracking-tight mb-4">
            Your body, illuminated by AI.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Instead of static charts and confusing tables, hover or select any organ to inspect continuous AI biomechanical insights, risk forecasts, and live prescriptions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Full-Body Human Model Visualizer */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-[#FAF9F6] border border-sky-100/80 rounded-3xl p-8 shadow-organic relative min-h-[520px]">
            
            {/* Rotation subtle indicator */}
            <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-medium text-slate-400 bg-white/80 px-3 py-1.5 rounded-full border border-slate-200/60">
              <RefreshCw className="w-3 h-3 text-sky-500 animate-spin-slow" />
              <span>Full-Body Biometric Rotation</span>
            </div>

            {/* Organ Selector Buttons Pill Toolbar */}
            <div className="flex flex-wrap justify-center gap-2 mb-8 z-10 w-full">
              {Object.keys(organData).map((key) => {
                const isSelected = selectedOrgan === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedOrgan(key)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-105'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                    }`}
                  >
                    {key}
                  </button>
                );
              })}
            </div>

            {/* Animated SVG Human Body Silhouette with Interactive Hotspots */}
            <div className="relative w-64 h-96 flex items-center justify-center">
              
              {/* Outer Pulsing Radar Aura */}
              <div className="absolute inset-0 rounded-full border border-sky-200/40 animate-ping opacity-25 pointer-events-none" />

              {/* Human Body Vector Outline */}
              <svg viewBox="0 0 200 400" className="w-full h-full drop-shadow-md">
                {/* Head & Neck */}
                <ellipse cx="100" cy="45" rx="22" ry="28" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
                <path d="M92 73 L108 73 L106 88 L94 88 Z" fill="#E2E8F0" />

                {/* Torso */}
                <path d="M65 90 C 65 90, 135 90, 135 90 C 145 120, 140 180, 130 220 C 130 220, 70 220, 70 220 C 60 180, 55 120, 65 90 Z" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2" />

                {/* Arms */}
                <path d="M60 92 L35 180 L45 185 L65 110 Z" fill="#E2E8F0" />
                <path d="M140 92 L165 180 L155 185 L135 110 Z" fill="#E2E8F0" />

                {/* Legs */}
                <path d="M72 222 L76 350 L92 350 L96 222 Z" fill="#E2E8F0" />
                <path d="M128 222 L124 350 L108 350 L104 222 Z" fill="#E2E8F0" />

                {/* --- ORGAN HOTSPOTS (Clickable & Glowing) --- */}

                {/* 1. Brain */}
                <g 
                  onClick={() => setSelectedOrgan('brain')}
                  className="cursor-pointer group"
                >
                  <circle cx="100" cy="42" r={selectedOrgan === 'brain' ? "14" : "10"} className={`transition-all duration-300 ${selectedOrgan === 'brain' ? 'fill-purple-500 stroke-purple-200 stroke-4' : 'fill-purple-400/60 hover:fill-purple-500'}`} />
                  <circle cx="100" cy="42" r="4" fill="#FFFFFF" />
                </g>

                {/* 2. Lungs */}
                <g 
                  onClick={() => setSelectedOrgan('lungs')}
                  className="cursor-pointer group"
                >
                  <path d="M82 120 C 78 120, 76 145, 84 150 C 88 145, 88 125, 82 120 Z" className={selectedOrgan === 'lungs' ? 'fill-sky-500 stroke-sky-200 stroke-2' : 'fill-sky-400/60'} />
                  <path d="M118 120 C 122 120, 124 145, 116 150 C 112 145, 112 125, 118 120 Z" className={selectedOrgan === 'lungs' ? 'fill-sky-500 stroke-sky-200 stroke-2' : 'fill-sky-400/60'} />
                </g>

                {/* 3. Heart */}
                <g 
                  onClick={() => setSelectedOrgan('heart')}
                  className="cursor-pointer group"
                >
                  <circle cx="106" cy="132" r={selectedOrgan === 'heart' ? "12" : "9"} className={`transition-all duration-300 ${selectedOrgan === 'heart' ? 'fill-rose-500 stroke-rose-200 stroke-4 animate-pulse' : 'fill-rose-400/70 hover:fill-rose-500'}`} />
                  <circle cx="106" cy="132" r="3" fill="#FFFFFF" />
                </g>

                {/* 4. Liver */}
                <g 
                  onClick={() => setSelectedOrgan('liver')}
                  className="cursor-pointer group"
                >
                  <path d="M84 155 Q 96 150 102 165 Q 86 172 84 155 Z" className={selectedOrgan === 'liver' ? 'fill-amber-500 stroke-amber-200 stroke-2' : 'fill-amber-400/60'} />
                </g>

                {/* 5. Kidneys */}
                <g 
                  onClick={() => setSelectedOrgan('kidneys')}
                  className="cursor-pointer group"
                >
                  <ellipse cx="88" cy="175" rx="5" ry="7" className={selectedOrgan === 'kidneys' ? 'fill-teal-500 stroke-teal-200 stroke-2' : 'fill-teal-400/60'} />
                  <ellipse cx="112" cy="175" rx="5" ry="7" className={selectedOrgan === 'kidneys' ? 'fill-teal-500 stroke-teal-200 stroke-2' : 'fill-teal-400/60'} />
                </g>

                {/* 6. Muscles & Legs */}
                <g 
                  onClick={() => setSelectedOrgan('muscles')}
                  className="cursor-pointer group"
                >
                  <rect x="74" y="240" width="16" height="40" rx="8" className={selectedOrgan === 'muscles' ? 'fill-emerald-500 opacity-80' : 'fill-emerald-400/40'} />
                  <rect x="110" y="240" width="16" height="40" rx="8" className={selectedOrgan === 'muscles' ? 'fill-emerald-500 opacity-80' : 'fill-emerald-400/40'} />
                </g>
              </svg>
            </div>

            <div className="text-[11px] text-slate-400 font-medium mt-4">
              Click any organ hotspot to zoom in & analyze
            </div>

          </div>

          {/* Right Column: AI Organ Telemetry Card */}
          <div className="lg:col-span-7 bg-[#FAF9F6] border border-sky-100 rounded-3xl p-8 shadow-organic">
            
            {/* Header with Organ Name & Health Score */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200/60">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm ${organ.bgColor}`}>
                  <organ.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-['Outfit'] font-bold text-2xl text-slate-900">{organ.name}</h3>
                  <div className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {organ.status}
                  </div>
                </div>
              </div>

              {/* Health Score Pill */}
              <div className="bg-white border border-slate-200/80 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-sm">
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Health Score</div>
                  <div className="text-xl font-bold text-slate-900">{organ.score} <span className="text-xs text-slate-400 font-normal">/ 100</span></div>
                </div>
                <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${organ.color} flex items-center justify-center text-white text-xs font-bold shadow-md`}>
                  {organ.score}%
                </div>
              </div>
            </div>

            {/* Current Health Status */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-sky-600" /> Current Biomechanical State
              </h4>
              <p className="text-slate-700 text-sm leading-relaxed bg-white border border-slate-200/60 p-4 rounded-2xl shadow-sm">
                {organ.currentHealth}
              </p>
            </div>

            {/* Possible Risks */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Early Risk Warnings
              </h4>
              <p className="text-slate-700 text-sm leading-relaxed bg-amber-50/50 border border-amber-200/60 p-4 rounded-2xl text-amber-950">
                {organ.possibleRisks}
              </p>
            </div>

            {/* Recommended AI Actions */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Recommended AI Action Protocol
              </h4>
              <div className="space-y-2">
                {organ.recommendedActions.map((action, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs font-medium text-slate-700 bg-white p-3 rounded-xl border border-slate-200/60 shadow-sm">
                    <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Predictive & Active Prescriptions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-sky-50/60 border border-sky-100 p-4 rounded-2xl">
                <div className="text-[11px] font-bold uppercase text-sky-700 mb-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> AI 30-Day Forecast
                </div>
                <p className="text-xs text-slate-700 font-medium">
                  {organ.predictions}
                </p>
              </div>

              <div className="bg-emerald-50/60 border border-emerald-100 p-4 rounded-2xl">
                <div className="text-[11px] font-bold uppercase text-emerald-700 mb-1 flex items-center gap-1">
                  <Pill className="w-3.5 h-3.5" /> Precision Supplementation
                </div>
                <ul className="text-xs text-slate-700 font-medium list-disc list-inside space-y-0.5">
                  {organ.medication.map((med, i) => (
                    <li key={i}>{med}</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
