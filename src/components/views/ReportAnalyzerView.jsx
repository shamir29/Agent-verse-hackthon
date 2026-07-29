import React, { useState } from 'react';
import { FileText, Upload, Download, CheckCircle2, AlertTriangle, ArrowUpRight, ArrowDownRight, Sparkles, RefreshCw, FileCheck } from 'lucide-react';

const mockReports = [
  {
    id: 'report-1',
    title: "Comprehensive Metabolic & Lipid Panel",
    date: "July 28, 2026",
    lab: "Mayo Medical Laboratories",
    metrics: [
      { name: "Fasting Blood Glucose", val: "88 mg/dL", ref: "70 - 99 mg/dL", status: "Normal", color: "text-emerald-700 bg-emerald-50 border-emerald-200", rec: "Optimal glycemic control. Maintain current balanced diet." },
      { name: "ApoB (Apolipoprotein B)", val: "62 mg/dL", ref: "< 80 mg/dL", status: "Normal", color: "text-emerald-700 bg-emerald-50 border-emerald-200", rec: "Excellent low atherogenic particle count." },
      { name: "Vitamin D3 (25-Hydroxy)", val: "24 ng/mL", ref: "30 - 80 ng/mL", status: "Low", color: "text-amber-700 bg-amber-50 border-amber-200", rec: "Sub-optimal level. Supplement 5,000 IU Vitamin D3 + K2 daily." },
      { name: "hs-CRP (Inflammatory Marker)", val: "0.4 mg/L", ref: "< 1.0 mg/L", status: "Normal", color: "text-emerald-700 bg-emerald-50 border-emerald-200", rec: "Zero systemic vascular inflammation detected." },
      { name: "Serum Creatinine", val: "1.35 mg/dL", ref: "0.6 - 1.2 mg/dL", status: "High", color: "text-rose-700 bg-rose-50 border-rose-200", rec: "Slight elevation secondary to exercise breakdown. Increase water intake to 2.8L daily." }
    ]
  },
  {
    id: 'report-2',
    title: "Thyroid & Endocrine Function Test",
    date: "July 12, 2026",
    lab: "Quest Diagnostics AI Lab",
    metrics: [
      { name: "TSH (Thyroid Stimulating Hormone)", val: "1.85 mIU/L", ref: "0.45 - 4.5 mIU/L", status: "Normal", color: "text-emerald-700 bg-emerald-50 border-emerald-200", rec: "Thyroid feedback loop is tightly regulated." },
      { name: "Free T3", val: "3.4 pg/mL", ref: "2.0 - 4.4 pg/mL", status: "Normal", color: "text-emerald-700 bg-emerald-50 border-emerald-200", rec: "Active hormone conversion rate optimal." }
    ]
  }
];

export default function ReportAnalyzerView() {
  const [selectedReportId, setSelectedReportId] = useState('report-1');
  const [isUploading, setIsUploading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  
  const report = mockReports.find(r => r.id === selectedReportId) || mockReports[0];

  const handleSimulateUpload = (e) => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
    }, 1800);
  };

  const handleDownloadSummary = () => {
    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 2500);
  };

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>OCR & PDF Medical Parser</span>
          </div>
          <h1 className="font-['Inter'] font-bold text-3xl text-slate-900">Medical Report Analyzer</h1>
          <p className="text-slate-500 text-sm mt-1">
            Upload any lab PDF or blood work report to extract values, highlight abnormal markers, and generate AI physician summaries.
          </p>
        </div>

        <button
          onClick={handleDownloadSummary}
          className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>{isDownloaded ? 'Summary Downloaded!' : 'Download Report Summary'}</span>
        </button>
      </div>

      {/* Upload Drag & Drop Box */}
      <div className="bg-white border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-3xl p-8 text-center space-y-4 transition-colors cursor-pointer group">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
          {isUploading ? <RefreshCw className="w-7 h-7 animate-spin" /> : <Upload className="w-7 h-7" />}
        </div>

        <div>
          <h3 className="font-['Inter'] font-bold text-slate-900 text-base">
            {isUploading ? 'Parsing Report & Extracting Biomarkers...' : 'Drag & drop your medical report PDF or Image'}
          </h3>
          <p className="text-slate-500 text-xs mt-1">Supports PDF, PNG, JPG files up to 25MB (HIPAA Compliant)</p>
        </div>

        <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-blue-600 transition-colors cursor-pointer">
          <span>Select File from Computer</span>
          <input type="file" className="hidden" accept=".pdf,.png,.jpg" onChange={handleSimulateUpload} />
        </label>
      </div>

      {/* Report Selector Tabs */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-bold uppercase text-slate-400">Report Library:</span>
        {mockReports.map((rep) => (
          <button
            key={rep.id}
            onClick={() => setSelectedReportId(rep.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedReportId === rep.id
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {rep.title} ({rep.date})
          </button>
        ))}
      </div>

      {/* Extracted Values & AI Analysis Table */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-2xs space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-['Inter'] font-bold text-xl text-slate-900">{report.title}</h3>
            <div className="text-xs text-slate-500 font-medium flex items-center gap-3 mt-1">
              <span>Facility: {report.lab}</span>
              <span>•</span>
              <span>Processed Date: {report.date}</span>
            </div>
          </div>
          <div className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>OCR Data Extracted</span>
          </div>
        </div>

        {/* Biomarkers Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider bg-slate-50/50">
                <th className="py-3 px-4">Biomarker Parameter</th>
                <th className="py-3 px-4">Result Value</th>
                <th className="py-3 px-4">Reference Range</th>
                <th className="py-3 px-4">Status Flag</th>
                <th className="py-3 px-4">AI Physician Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {report.metrics.map((m, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900">{m.name}</td>
                  <td className="py-4 px-4 font-extrabold text-sm text-slate-900">{m.val}</td>
                  <td className="py-4 px-4 text-slate-500">{m.ref}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-block text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${m.color}`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-600 max-w-xs">{m.rec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
