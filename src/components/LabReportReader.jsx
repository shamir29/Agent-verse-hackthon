import React, { useState } from 'react';
import { FileSearch, Upload, CheckCircle2, AlertTriangle, ArrowUpRight, ArrowDownRight, Sparkles, RefreshCw, FileText } from 'lucide-react';

const sampleReports = [
  {
    id: 'comprehensive',
    title: "Comprehensive Metabolic & Lipid Panel",
    date: "July 28, 2026",
    lab: "Mayo Medical Laboratories",
    metrics: [
      { name: "ApoB (Apolipoprotein B)", val: "62 mg/dL", ref: "< 80 mg/dL", status: "Normal", color: "text-emerald-700 bg-emerald-50 border-emerald-200", icon: CheckCircle2, rec: "Optimal atherogenic particle count. Maintain current dietary fiber and unsaturated lipid balance.", detail: "ApoB measures the exact count of potentially damaging LDL and VLDL particles circulating in the bloodstream." },
      { name: "hs-CRP (High-Sensitivity C-Reactive Protein)", val: "0.4 mg/L", ref: "< 1.0 mg/L", status: "Normal", color: "text-emerald-700 bg-emerald-50 border-emerald-200", icon: CheckCircle2, rec: "Zero systemic vascular inflammation detected.", detail: "hs-CRP is a key acute-phase protein biomarker indicating systemic arterial wall inflammation." },
      { name: "Vitamin D (25-Hydroxy D3)", val: "28 ng/mL", ref: "30 - 80 ng/mL", status: "Low", color: "text-amber-700 bg-amber-50 border-amber-200", icon: ArrowDownRight, rec: "Sub-optimal vitamin D status. Increase D3 supplementation to 5,000 IU daily with K2.", detail: "Vitamin D3 regulates calcium homeostasis, bone density, and genomic immune transcription." },
      { name: "Fasting Blood Glucose", val: "84 mg/dL", ref: "70 - 99 mg/dL", status: "Normal", color: "text-emerald-700 bg-emerald-50 border-emerald-200", icon: CheckCircle2, rec: "Excellent insulin sensitivity and hepatic glucose regulation.", detail: "Measures blood sugar concentration after an overnight 10-hour fasting window." },
      { name: "Serum Creatinine", val: "1.4 mg/dL", ref: "0.6 - 1.2 mg/dL", status: "High", color: "text-rose-700 bg-rose-50 border-rose-200", icon: ArrowUpRight, rec: "Mild elevation secondary to post-workout muscle breakdown. Hydrate with extra 750ml water.", detail: "Serum creatinine is a metabolic byproduct of muscle creatine phosphate catabolism." }
    ]
  },
  {
    id: 'thyroid',
    title: "Endocrine & Thyroid Function Panel",
    date: "July 15, 2026",
    lab: "Quest Diagnostics AI Lab",
    metrics: [
      { name: "TSH (Thyroid Stimulating Hormone)", val: "1.85 mIU/L", ref: "0.45 - 4.5 mIU/L", status: "Normal", color: "text-emerald-700 bg-emerald-50 border-emerald-200", icon: CheckCircle2, rec: "Optimal pituitary-thyroid feedback loop.", detail: "TSH stimulates thyroid production of T4 and T3 hormones to regulate basal metabolic rate." },
      { name: "Free T3 (Triiodothyronine)", val: "3.4 pg/mL", ref: "2.0 - 4.4 pg/mL", status: "Normal", color: "text-emerald-700 bg-emerald-50 border-emerald-200", icon: CheckCircle2, rec: "Active thyroid hormone conversion is high.", detail: "Free T3 represents the biologically active thyroid hormone responsible for cellular energy." }
    ]
  }
];

export default function LabReportReader() {
  const [selectedReportId, setSelectedReportId] = useState('comprehensive');
  const [isScanning, setIsScanning] = useState(false);
  const report = sampleReports.find(r => r.id === selectedReportId) || sampleReports[0];

  const handleScanTrigger = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 2500);
  };

  return (
    <section id="lab-reader" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold mb-4">
            <FileSearch className="w-3.5 h-3.5 text-emerald-600" />
            <span>Section 06 • Live AI Lab Report Scanner</span>
          </div>
          <h2 className="font-['Outfit'] font-bold text-3xl sm:text-5xl text-slate-950 tracking-tight mb-4">
            Turn complex lab reports into plain actions.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Upload or select any blood test PDF. Our AI optical scanner instantly highlights abnormal ranges, explains medical terminology, and delivers personalized recommendations.
          </p>
        </div>

        {/* Document Viewer Container */}
        <div className="bg-[#FAF9F6] border border-sky-100/90 rounded-3xl p-8 shadow-organic">
          
          {/* Document Header Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200/70">
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-['Outfit'] font-bold text-xl text-slate-900">{report.title}</h3>
                <div className="text-xs text-slate-500 font-medium flex items-center gap-3 mt-0.5">
                  <span>Lab: {report.lab}</span>
                  <span>•</span>
                  <span>Date: {report.date}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleScanTrigger}
                disabled={isScanning}
                className="flex items-center gap-2 text-xs font-bold text-white px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                <span>{isScanning ? 'Scanning Live...' : 'Re-Scan Document'}</span>
              </button>

              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 px-4 py-2.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 cursor-pointer shadow-sm">
                <Upload className="w-3.5 h-3.5 text-sky-600" />
                <span>Upload PDF</span>
                <input type="file" className="hidden" accept=".pdf,.png,.jpg" onChange={handleScanTrigger} />
              </label>
            </div>

          </div>

          {/* Document Content & Scanning Effect Container */}
          <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm">
            
            {/* Live Scanning Laser Overlay */}
            {isScanning && (
              <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none z-20 flex flex-col justify-between animate-scan">
                <div className="h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-lg shadow-emerald-500" />
              </div>
            )}

            <div className="space-y-6">
              {report.metrics.map((m, idx) => {
                const StatusIcon = m.icon;
                return (
                  <div 
                    key={idx}
                    className="p-5 rounded-2xl border border-slate-100 bg-[#FAF9F6]/60 hover:bg-white transition-all shadow-sm group"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      
                      {/* Metric Name & Status */}
                      <div className="md:col-span-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${m.color} flex items-center gap-1`}>
                            <StatusIcon className="w-3 h-3" /> {m.status}
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium">Ref: {m.ref}</span>
                        </div>
                        <h4 className="font-['Outfit'] font-bold text-base text-slate-900">{m.name}</h4>
                      </div>

                      {/* Measured Value */}
                      <div className="md:col-span-2">
                        <div className="text-[10px] uppercase font-bold text-slate-400">Result</div>
                        <div className="text-xl font-extrabold text-slate-900">{m.val}</div>
                      </div>

                      {/* AI Recommendation & Explanation */}
                      <div className="md:col-span-6 bg-white p-4 rounded-xl border border-slate-200/60 shadow-xs">
                        <div className="text-xs font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-sky-600" /> AI Recommendation
                        </div>
                        <p className="text-xs text-slate-600 mb-2">{m.rec}</p>
                        <div className="text-[11px] text-slate-400 italic border-t border-slate-100 pt-1.5">
                          "{m.detail}"
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
