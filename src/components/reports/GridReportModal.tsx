import React from 'react';
import { TelemetryStats, GridNode, DistrictBuilding, GridFailureAlert } from '../../types/powerGrid';
import { X, Download, FileSpreadsheet, Printer, CheckCircle2, ShieldCheck } from 'lucide-react';

interface GridReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  telemetry: TelemetryStats;
  nodes: GridNode[];
  buildings: DistrictBuilding[];
  alerts: GridFailureAlert[];
}

export const GridReportModal: React.FC<GridReportModalProps> = ({
  isOpen,
  onClose,
  telemetry,
  nodes,
  buildings,
  alerts
}) => {
  if (!isOpen) return null;

  const handleDownloadCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Category,Metric,Value\n";
    csvContent += `Generation,Total Generation MW,${telemetry.totalGenerationMW}\n`;
    csvContent += `Demand,Total Demand MW,${telemetry.totalDemandMW}\n`;
    csvContent += `Renewables,Solar Generation MW,${telemetry.solarGenerationMW}\n`;
    csvContent += `Renewables,Wind Generation MW,${telemetry.windGenerationMW}\n`;
    csvContent += `Renewables,Renewable Share %,${telemetry.renewableSharePct}%\n`;
    csvContent += `Grid Health,Frequency Hz,${telemetry.gridFrequencyHz}\n`;
    csvContent += `Grid Health,Stability Index,${telemetry.gridStabilityScore}/100\n`;
    csvContent += `BESS Storage,State of Charge %,${telemetry.bessChargePct}%\n`;
    csvContent += `Environmental,Carbon Offset Tons Today,${telemetry.carbonOffsetTonsToday}\n\n`;

    csvContent += "District,Demand MW,Supplied MW,Power Pct\n";
    buildings.forEach(b => {
      csvContent += `"${b.name}",${b.demandMW},${b.suppliedMW},${b.powerPct}%\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `PowerGrid_AI_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-200">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Power Grid Performance Audit Report</h3>
              <p className="text-xs text-slate-500 font-medium">Generated on {new Date().toLocaleDateString()}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-slate-400 font-medium">Total Generation</div>
              <div className="text-base font-extrabold text-slate-900 mt-1">{telemetry.totalGenerationMW} MW</div>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-slate-400 font-medium">Renewable Share</div>
              <div className="text-base font-extrabold text-emerald-600 mt-1">{telemetry.renewableSharePct}%</div>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-slate-400 font-medium">Grid Stability Score</div>
              <div className="text-base font-extrabold text-cyan-600 mt-1">{telemetry.gridStabilityScore}/100</div>
            </div>
          </div>

          {/* District Status */}
          <div>
            <h4 className="font-bold text-slate-900 mb-2">District Building Electrification Status</h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-3">District</th>
                    <th className="py-2 px-3">Category</th>
                    <th className="py-2 px-3">Demand</th>
                    <th className="py-2 px-3">Supplied</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {buildings.map(b => (
                    <tr key={b.id}>
                      <td className="py-2 px-3 font-semibold">{b.name}</td>
                      <td className="py-2 px-3 uppercase text-[10px] text-slate-500 font-bold">{b.category}</td>
                      <td className="py-2 px-3">{b.demandMW} MW</td>
                      <td className="py-2 px-3">{b.suppliedMW} MW</td>
                      <td className="py-2 px-3 font-bold text-emerald-600">{b.powerPct}% Powered</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end space-x-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-xl transition-colors flex items-center space-x-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Print PDF</span>
          </button>
          <button
            onClick={handleDownloadCSV}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-xl shadow-md transition-colors flex items-center space-x-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Download CSV Data</span>
          </button>
        </div>

      </div>
    </div>
  );
};
