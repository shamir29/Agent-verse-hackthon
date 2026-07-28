import React, { useState } from 'react';
import { X, FileText, Download, CheckCircle2 } from 'lucide-react';
import { MainTelemetry, PipelineRoute, LeakAlert, ReservoirData, WaterQualitySector } from '../../types/waterSystem';
import { ReportGenerator } from '../../services/reportGenerator';

interface ReportGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  telemetry: MainTelemetry;
  pipelines: PipelineRoute[];
  leaks: LeakAlert[];
  reservoirs: ReservoirData[];
  qualitySectors: WaterQualitySector[];
}

export const ReportGeneratorModal: React.FC<ReportGeneratorModalProps> = ({
  isOpen,
  onClose,
  telemetry,
  pipelines,
  leaks,
  reservoirs,
  qualitySectors,
}) => {
  const [selectedReportType, setSelectedReportType] = useState('Daily Overview');
  const [format, setFormat] = useState<'pdf' | 'excel'>('pdf');
  const [isGenerating, setIsGenerating] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const reportOptions = [
    'Daily Overview',
    'Weekly Summary',
    'Monthly Executive Report',
    'Water Usage & Demand',
    'Leak & Pipe Anomaly Report',
    'Flood Prediction Report',
    'Water Quality Index Report',
    'Reservoir & Dam Status Report',
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setSuccessMsg('');

    setTimeout(() => {
      if (format === 'pdf') {
        ReportGenerator.generatePdfReport(
          selectedReportType,
          telemetry,
          pipelines,
          leaks,
          reservoirs,
          qualitySectors
        );
      } else {
        ReportGenerator.generateExcelReport(
          selectedReportType,
          telemetry,
          pipelines,
          leaks,
          reservoirs,
          qualitySectors
        );
      }

      setIsGenerating(false);
      setSuccessMsg(`Successfully generated ${format.toUpperCase()} report: ${selectedReportType}`);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg glass-panel rounded-3xl border border-cyan-500/40 p-6 space-y-6 shadow-2xl relative bg-white dark:bg-[#0b1226] text-slate-900 dark:text-slate-100">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-cyan-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-100 dark:bg-cyan-950 border border-cyan-300 dark:border-cyan-400 text-cyan-700 dark:text-cyan-300">
              <FileText className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-orbitron font-bold text-slate-900 dark:text-slate-100 text-base">
                GENERATE SYSTEM REPORTS
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Download formatted PDF & Excel data exports</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Controls */}
        <div className="space-y-4 text-xs font-mono">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 mb-2 font-orbitron text-xs">
              1. Select Report Focus:
            </label>
            <select
              value={selectedReportType}
              onChange={(e) => setSelectedReportType(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-cyan-500/30 rounded-xl p-3 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              {reportOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-white dark:bg-slate-900">
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 mb-2 font-orbitron text-xs">
              2. Export Format:
            </label>
            <div className="grid grid-cols-2 gap-3 font-sans">
              <button
                type="button"
                onClick={() => setFormat('pdf')}
                className={`py-3 rounded-xl font-bold border transition ${
                  format === 'pdf'
                    ? 'bg-cyan-100 dark:bg-cyan-950 border-cyan-400 text-cyan-800 dark:text-cyan-300 shadow-neon-cyan'
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                PDF Executive Document
              </button>
              <button
                type="button"
                onClick={() => setFormat('excel')}
                className={`py-3 rounded-xl font-bold border transition ${
                  format === 'excel'
                    ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-400 text-emerald-800 dark:text-emerald-300 shadow-neon-blue'
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                Excel Spreadsheet (.XLSX)
              </button>
            </div>
          </div>

          {/* Success banner */}
          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-400 text-white font-orbitron text-xs font-bold shadow-neon-cyan hover:opacity-90 transition flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>{isGenerating ? 'GENERATING REPORT...' : `DOWNLOAD ${format.toUpperCase()} REPORT`}</span>
        </button>

      </div>
    </div>
  );
};
