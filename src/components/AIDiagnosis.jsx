import React, { useState } from 'react';
import { Stethoscope, ShieldAlert, Sparkles, CheckCircle2, ChevronRight, Pill, UserCheck, FileText, AlertCircle } from 'lucide-react';

const diagnosisCards = [
  {
    id: 1,
    title: "Sub-clinical Dyslipidemia & Endothelial Risk",
    confidence: "98.4%",
    riskLevel: "Mild Risk",
    riskColor: "bg-amber-100 text-amber-800 border-amber-200",
    symptoms: ["Elevated ApoB particle count", "Post-prandial sluggishness", "Slight arterial compliance dip"],
    test: "Advanced NMR Lipoprofile & hs-CRP Inflammatory Panel",
    medicine: ["Rosuvastatin (5mg Microdose)", "Omega-3 Ethyl Esters (2g)", "CoQ10 Ubiquinol"],
    doctor: "Dr. Elena Rostova, Preventive Cardiology Specialist",
    summary: "AI detected an early elevation in atherogenic lipoprotein particle concentration prior to any arterial plaque formation."
  },
  {
    id: 2,
    title: "Circadian Phase Delay & Cortisol Dysregulation",
    confidence: "96.2%",
    riskLevel: "Low Risk",
    riskColor: "bg-sky-100 text-sky-800 border-sky-200",
    symptoms: ["Delayed REM onset", "Elevated evening heart rate (+6 BPM)", "Morning grogginess"],
    test: "4-Point Salivary Cortisol Rhythm Test & Blue-Light Sensitivity Assay",
    medicine: ["Micro-dose Melatonin (0.3mg)", "Ashwagandha KSM-66 (600mg)", "L-Theanine"],
    doctor: "Dr. Marcus Vance, Somnology & Sleep Medicine",
    summary: "Autonomic biometrics reveal a 45-minute shift in endogenous melatonin secretion triggered by screen illumination."
  },
  {
    id: 3,
    title: "Benign Post-Exercise Lactic Accumulation",
    confidence: "99.1%",
    riskLevel: "Optimal Recovery",
    riskColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    symptoms: ["Transient quadriceps soreness", "Elevated Creatine Kinase (Normal post-workout)"],
    test: "Continuous Lactate Threshold PPG Sensor",
    medicine: ["Electrolyte Rehydration Complex", "Magnesium Glycinate (400mg)"],
    doctor: "Dr. Sarah Jenkins, Sports & Performance Medicine",
    summary: "Normal muscular adaptation following high-intensity training. No structural tissue micro-tears detected."
  }
];

export default function AIDiagnosis() {
  const [activeCardId, setActiveCardId] = useState(1);
  const activeCard = diagnosisCards.find(c => c.id === activeCardId) || diagnosisCards[0];

  return (
    <section id="diagnosis" className="py-24 bg-[#FAF9F6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold mb-4">
            <Stethoscope className="w-3.5 h-3.5 text-sky-600" />
            <span>Section 05 • Autonomous AI Diagnosis Engine</span>
          </div>
          <h2 className="font-['Outfit'] font-bold text-3xl sm:text-5xl text-slate-950 tracking-tight mb-4">
            Diagnosis built on prediction, not guesswork.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Instead of raw data tables, floating diagnosis cards synthesize thousands of continuous inputs into high-confidence diagnostic summaries.
          </p>
        </div>

        {/* Diagnosis Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {diagnosisCards.map((card) => (
            <button
              key={card.id}
              onClick={() => setActiveCardId(card.id)}
              className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeCardId === card.id
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10 scale-102'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>{card.title}</span>
              <span className="ml-1 opacity-70">({card.confidence})</span>
            </button>
          ))}
        </div>

        {/* Floating Active Diagnosis Detail Card */}
        <div className="max-w-4xl mx-auto bg-white border border-sky-100/90 rounded-3xl p-8 sm:p-10 shadow-organic">
          
          {/* Card Top Title Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mb-2 ${activeCard.riskColor}`}>
                {activeCard.riskLevel}
              </span>
              <h3 className="font-['Outfit'] font-bold text-2xl sm:text-3xl text-slate-900">{activeCard.title}</h3>
            </div>

            {/* Confidence Dial Badge */}
            <div className="bg-sky-50 border border-sky-100 px-5 py-3 rounded-2xl text-right">
              <div className="text-[10px] uppercase font-bold text-slate-400">AI Confidence</div>
              <div className="text-2xl font-extrabold text-sky-700">{activeCard.confidence}</div>
            </div>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-200/50">
            {activeCard.summary}
          </p>

          {/* Grid Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            
            {/* Symptoms Detected */}
            <div className="bg-[#FAF9F6] border border-slate-200/60 p-5 rounded-2xl">
              <h4 className="text-xs font-bold uppercase text-slate-400 mb-3 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500" /> Detected Biomarkers & Symptoms
              </h4>
              <ul className="space-y-2">
                {activeCard.symptoms.map((s, idx) => (
                  <li key={idx} className="text-xs font-medium text-slate-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Diagnostic Test */}
            <div className="bg-[#FAF9F6] border border-slate-200/60 p-5 rounded-2xl">
              <h4 className="text-xs font-bold uppercase text-slate-400 mb-3 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-sky-600" /> Confirmatory Diagnostic Test
              </h4>
              <div className="text-xs font-bold text-slate-900 bg-white p-3 rounded-xl border border-slate-200/60 shadow-sm">
                {activeCard.test}
              </div>
            </div>

          </div>

          {/* Bottom Bar: Medicine Suggestions & Doctor Recommendation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
            
            {/* Medicine Suggestions */}
            <div>
              <h4 className="text-xs font-bold uppercase text-slate-400 mb-2 flex items-center gap-1.5">
                <Pill className="w-3.5 h-3.5 text-emerald-600" /> AI Pharmacological Suggestions
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeCard.medicine.map((m, i) => (
                  <span key={i} className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Doctor Recommendation */}
            <div>
              <h4 className="text-xs font-bold uppercase text-slate-400 mb-2 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-sky-600" /> Recommended Specialist Review
              </h4>
              <div className="text-xs font-semibold text-slate-800 bg-sky-50/60 border border-sky-100 p-3 rounded-xl flex items-center justify-between">
                <span>{activeCard.doctor}</span>
                <ChevronRight className="w-4 h-4 text-sky-600" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
