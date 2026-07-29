import React, { useState } from 'react';
import { Stethoscope, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, Activity, ChevronRight, ShieldAlert, RefreshCw } from 'lucide-react';

export default function SymptomCheckerView({ setActiveView }) {
  const [symptomText, setSymptomText] = useState('');
  const [duration, setDuration] = useState('1-3 days');
  const [severity, setSeverity] = useState(4);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState(null);

  const sampleSymptoms = [
    "Throbbing headache with light sensitivity",
    "Tightness in chest after exercise",
    "Sore throat and fever for 2 days",
    "Persistent lower back stiffness"
  ];

  const handleEvaluate = (textToUse) => {
    const text = textToUse || symptomText;
    if (!text.trim()) return;

    setIsEvaluating(true);
    setAssessmentResult(null);

    setTimeout(() => {
      const lower = text.toLowerCase();
      let urgency = "Routine Doctor Visit";
      let urgencyColor = "bg-amber-50 text-amber-800 border-amber-200";
      let conditions = [];
      let nextSteps = [];

      if (lower.includes('chest') || lower.includes('breath') || lower.includes('heart') || severity > 8) {
        urgency = "Urgent / Immediate Medical Attention";
        urgencyColor = "bg-rose-50 text-rose-800 border-rose-200";
        conditions = [
          { name: "Possible Acute Coronary Syndrome", prob: "78%", severity: "High" },
          { name: "Intercostal Muscle Strain", prob: "18%", severity: "Low" },
          { name: "Vascular Angina Spasm", prob: "4%", severity: "Moderate" }
        ];
        nextSteps = [
          "Seek emergency medical evaluation or click Emergency SOS",
          "Avoid physical exertion or driving yourself to the clinic",
          "Keep continuous biometric PPG watch sync active"
        ];
      } else if (lower.includes('headache') || lower.includes('migraine')) {
        urgency = "Self-Care & Routine Consultation";
        urgencyColor = "bg-blue-50 text-blue-800 border-blue-200";
        conditions = [
          { name: "Primary Migraine without Complications", prob: "86%", severity: "Mild" },
          { name: "Tension-Type Cervical Headache", prob: "11%", severity: "Mild" },
          { name: "Dehydration & Circadian Fatigue", prob: "3%", severity: "Low" }
        ];
        nextSteps = [
          "Hydrate with 500ml electrolyte water",
          "Rest in a quiet, darkened room",
          "Take 400mg Magnesium if cleared by physician"
        ];
      } else {
        urgency = "Standard Outpatient Care";
        urgencyColor = "bg-emerald-50 text-emerald-800 border-emerald-200";
        conditions = [
          { name: "Mild Viral Upper Respiratory Response", prob: "82%", severity: "Mild" },
          { name: "Seasonal Allergic Inflammation", prob: "14%", severity: "Low" }
        ];
        nextSteps = [
          "Monitor body temperature over next 24 hours",
          "Book a virtual consultation with a General Physician"
        ];
      }

      setAssessmentResult({
        symptom: text,
        urgency,
        urgencyColor,
        conditions,
        nextSteps,
        followUps: [
          "Did symptoms begin suddenly or gradually?",
          "Are you taking any prescription medications?",
          "Does rest or hydration relieve the discomfort?"
        ]
      });

      setIsEvaluating(false);
    }, 1200);
  };

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold mb-2">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>AI Clinical Triage Engine</span>
          </div>
          <h1 className="font-['Inter'] font-bold text-3xl text-slate-900">AI Symptom Checker</h1>
          <p className="text-slate-500 text-sm mt-1">
            Describe your symptoms to receive an instant risk assessment, possible conditions, and medical recommendations.
          </p>
        </div>
      </div>

      {/* Main Form & Interactive Input */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-2xs space-y-6">
        
        {/* Presets */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 block">
            Select a common symptom or type below:
          </label>
          <div className="flex flex-wrap gap-2">
            {sampleSymptoms.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSymptomText(preset);
                  handleEvaluate(preset);
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-slate-700 border border-slate-200/60 transition-all text-left"
              >
                "{preset}"
              </button>
            ))}
          </div>
        </div>

        {/* Input Textarea */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">
            Describe how you are feeling in detail:
          </label>
          <textarea
            rows={3}
            value={symptomText}
            onChange={(e) => setSymptomText(e.target.value)}
            placeholder="E.g., I have a throbbing headache behind my left eye that started yesterday..."
            className="w-full text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-2xl p-4 outline-none focus:border-blue-500 focus:bg-white transition-all"
          />
        </div>

        {/* Form Controls: Duration & Severity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">
              Symptom Duration:
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none"
            >
              <option value="Less than 24 hours">Less than 24 hours</option>
              <option value="1-3 days">1 - 3 days</option>
              <option value="1 week">1 week</option>
              <option value="More than 2 weeks">More than 2 weeks</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Discomfort Severity (1 to 10):
              </label>
              <span className="text-xs font-bold text-blue-600">{severity} / 10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={severity}
              onChange={(e) => setSeverity(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={() => handleEvaluate()}
          disabled={!symptomText.trim() || isEvaluating}
          className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
        >
          {isEvaluating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analyzing Clinical Parameters...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Run AI Clinical Triage</span>
            </>
          )}
        </button>

      </div>

      {/* Assessment Output Card */}
      {assessmentResult && (
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 shadow-sm space-y-6 animate-in fade-in">
          
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Triage Status</span>
              <h3 className="font-['Inter'] font-bold text-xl text-slate-900">Clinical Evaluation Result</h3>
            </div>
            <span className={`text-xs font-extrabold px-4 py-1.5 rounded-full border ${assessmentResult.urgencyColor}`}>
              {assessmentResult.urgency}
            </span>
          </div>

          {/* Differential Diagnosis Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Possible Differential Conditions (AI Confidence)
            </h4>
            <div className="space-y-2">
              {assessmentResult.conditions.map((cond, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60">
                  <div>
                    <div className="text-xs font-bold text-slate-900">{cond.name}</div>
                    <div className="text-[10px] text-slate-500">Risk Profile: {cond.severity}</div>
                  </div>
                  <span className="text-xs font-extrabold text-blue-600 bg-white border border-slate-200 px-3 py-1 rounded-full">
                    {cond.prob} Match
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Next Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            <div className="bg-blue-50/60 border border-blue-100 p-5 rounded-2xl">
              <h4 className="text-xs font-bold uppercase text-blue-900 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" /> Recommended Action Protocol
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {assessmentResult.nextSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-900 mb-1">Book Specialist Consultation</h4>
                <p className="text-xs text-slate-500">Connect with a verified physician or cardiologist to confirm diagnostic findings.</p>
              </div>
              <button
                onClick={() => setActiveView('appointments')}
                className="mt-4 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <span>Search Available Doctors</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
