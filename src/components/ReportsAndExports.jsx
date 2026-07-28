import React, { useState } from 'react';
import { FileText, Download, FileSpreadsheet, Printer, CheckCircle2, Eye, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ReportsAndExports = () => {
  const { assets, maintenanceTasks, mockFailurePredictions } = useApp();
  const [selectedReport, setSelectedReport] = useState('Daily Asset Report');
  const [exportFormat, setExportFormat] = useState('PDF');
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState(null);

  const reportTypes = [
    { id: 'daily', name: 'Daily Asset Report', description: 'Comprehensive daily telemetry snapshot, health scores, and active alarm triggers.' },
    { id: 'weekly', name: 'Weekly Maintenance Report', description: 'Summary of scheduled, pending, and completed maintenance work orders across all facilities.' },
    { id: 'failure', name: 'Failure Prediction Report', description: '30-day neural AI forecast of equipment failure probabilities and RUL countdowns.' },
    { id: 'health', name: 'Health Assessment Report', description: 'Categorized degradation matrix, efficiency benchmarks, and inspection logs.' },
    { id: 'downtime', name: 'Downtime Analysis Report', description: 'Quantified downtime avoidance hours, financial ROI, and grid SLA compliance.' },
    { id: 'lifecycle', name: 'Equipment Lifecycle Report', description: 'Long-term capital replacement planning, installation age curves, and depreciation.' },
    { id: 'cost', name: 'Maintenance Cost Report', description: 'Breakdown of labor, replacement parts, and emergency dispatch expenditures.' },
  ];

  const handleTriggerExport = (reportName, format) => {
    setDownloadSuccessMessage(`Generating & Downloading ${reportName} (${format})...`);
    setTimeout(() => {
      // Create a mock blob download
      const content = `Predictive Maintenance Agent Report\nReport Name: ${reportName}\nFormat: ${format}\nDate: ${new Date().toISOString()}\n\nAsset Count: ${assets.length}\nCritical Assets: ${assets.filter(a => a.status === 'Critical').length}\nPending Tasks: ${maintenanceTasks.filter(t => t.status !== 'Completed').length}\n`;
      const blob = new Blob([content], { type: format === 'CSV' ? 'text/csv' : 'application/text' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportName.toLowerCase().replace(/ /g, '_')}_${new Date().toISOString().split('T')[0]}.${format.toLowerCase()}`;
      a.click();
      URL.revokeObjectURL(url);
      setDownloadSuccessMessage(`${reportName} successfully downloaded as .${format.toLowerCase()}`);
      setTimeout(() => setDownloadSuccessMessage(null), 4000);
    }, 800);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="card-enterprise p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Enterprise Reports & Export Hub</h2>
          <p className="text-xs text-slate-500 mt-1">
            Generate executive summaries, reliability compliance audits, and financial downtime analytics.
          </p>
        </div>

        {downloadSuccessMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3.5 py-2 rounded-xl font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {downloadSuccessMessage}
          </div>
        )}
      </div>

      {/* Report Selector Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reportTypes.map((rep) => (
          <div
            key={rep.id}
            className={`card-enterprise p-5 flex flex-col justify-between hover:border-blue-300 transition-all ${
              selectedReport === rep.name ? 'ring-2 ring-blue-500 border-blue-500 bg-blue-50/10' : ''
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <FileText className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-bold text-slate-400 font-mono">ISO 55000 Compliant</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{rep.name}</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{rep.description}</p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  setSelectedReport(rep.name);
                  setPreviewModalOpen(true);
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" /> Preview
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleTriggerExport(rep.name, 'PDF')}
                  className="px-2.5 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 text-xs font-bold rounded-md transition"
                >
                  PDF
                </button>
                <button
                  onClick={() => handleTriggerExport(rep.name, 'Excel')}
                  className="px-2.5 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold rounded-md transition"
                >
                  Excel
                </button>
                <button
                  onClick={() => handleTriggerExport(rep.name, 'CSV')}
                  className="px-2.5 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold rounded-md transition"
                >
                  CSV
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Report Preview Modal */}
      {previewModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{selectedReport} Preview</h3>
                <p className="text-xs text-slate-500">Generated on {new Date().toLocaleDateString()}</p>
              </div>
              <button
                onClick={() => setPreviewModalOpen(false)}
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold text-slate-700"
              >
                Close Preview
              </button>
            </div>

            {/* Preview Document Content */}
            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50 font-sans text-xs space-y-4">
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <div>
                  <h1 className="text-base font-bold text-slate-900">Predictive Maintenance Agent Report</h1>
                  <span className="text-[10px] text-slate-500">Smart Energy & Smart City AI Platform</span>
                </div>
                <span className="text-xs font-bold text-blue-600 font-mono">CONFIDENTIAL</span>
              </div>

              <div className="grid grid-cols-3 gap-3 bg-white p-3 rounded-lg border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 block">Total Infrastructure Assets</span>
                  <span className="font-bold text-slate-900 text-sm font-mono">{assets.length}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Critical Failures Flagged</span>
                  <span className="font-bold text-red-600 text-sm font-mono">{assets.filter(a => a.status === 'Critical').length}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Estimated Downtime Saved</span>
                  <span className="font-bold text-emerald-600 text-sm font-mono">148 Hours ($320k)</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-slate-900 block">Asset Summary Sample Data</span>
                <table className="w-full text-left border-collapse bg-white rounded-lg overflow-hidden border border-slate-200 text-[11px]">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-2">ID</th>
                      <th className="p-2">Asset Name</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Health</th>
                      <th className="p-2">RUL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {assets.slice(0, 5).map((a) => (
                      <tr key={a.id}>
                        <td className="p-2 font-mono font-semibold">{a.id}</td>
                        <td className="p-2 font-medium">{a.name}</td>
                        <td className="p-2 font-semibold">{a.status}</td>
                        <td className="p-2 font-mono font-bold text-blue-600">{a.healthScore}%</td>
                        <td className="p-2 font-mono">{a.rulDays}d</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => handleTriggerExport(selectedReport, 'PDF')}
                className="px-4 py-2 bg-blue-600 text-white font-semibold text-xs rounded-lg shadow-2xs hover:bg-blue-700 transition flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Download Full Report
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
