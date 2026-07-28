import React from 'react';
import { 
  SearchCode, 
  BrainCircuit, 
  CheckCircle2, 
  AlertOctagon, 
  Wrench, 
  DollarSign,
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RootCauseAnalysis = () => {
  const { assets, setSelectedAssetModal, scheduleTask, setActiveTab } = useApp();

  // Root cause categories defined by system
  const rootCauseCategories = [
    'Overheating',
    'Dust Accumulation',
    'Loose Connections',
    'Water Leakage',
    'High Vibration',
    'Voltage Fluctuation',
    'Current Imbalance',
    'Bearing Wear',
    'Fan Failure',
    'Corrosion',
  ];

  // Assets with flagged root causes
  const flaggedAssets = assets.filter(
    (a) => a.status === 'Critical' || a.status === 'Maintenance Required' || a.status === 'Warning'
  );

  const handleCreateWorkOrder = (asset) => {
    scheduleTask({
      id: `TSK-${Math.floor(1000 + Math.random() * 9000)}`,
      assetId: asset.id,
      equipment: asset.name,
      category: 'Critical Maintenance',
      priority: asset.status === 'Critical' ? 'P1 - Critical' : 'P2 - High',
      estimatedTime: '4.0 Hours',
      technicianRequired: 'Certified Reliability Engineer',
      technicianAssigned: 'David Miller',
      estimatedCost: asset.estimatedRepairCost || 3000,
      expectedImprovement: 'Resolve Root Cause & Prevent Outage',
      status: 'Scheduled',
      dueDate: new Date().toISOString().split('T')[0],
      location: asset.location,
    });
    setActiveTab('planner');
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="card-enterprise p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">Explainable AI Root Cause Analysis (XAI)</h2>
            <span className="bg-indigo-100 text-indigo-800 text-xs px-2.5 py-0.5 rounded-full font-bold">
              Causal Inference Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Automated fault diagnostic trees mapping multi-sensor telemetry anomalies to root physical component degradation.
          </p>
        </div>

        {/* Legend of Cause Types */}
        <div className="flex flex-wrap items-center gap-1.5 max-w-xl">
          {rootCauseCategories.map((cause) => (
            <span
              key={cause}
              className="text-[10px] bg-slate-100 border border-slate-200 text-slate-700 font-semibold px-2 py-0.5 rounded-full"
            >
              {cause}
            </span>
          ))}
        </div>
      </div>

      {/* Root Cause Cards List */}
      <div className="grid grid-cols-1 gap-5">
        {flaggedAssets.map((asset) => (
          <div
            key={asset.id}
            className={`card-enterprise p-6 hover:shadow-md transition border-l-4 ${
              asset.status === 'Critical'
                ? 'border-l-red-500 bg-red-50/10'
                : asset.status === 'Maintenance Required'
                ? 'border-l-orange-500 bg-orange-50/10'
                : 'border-l-amber-500'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              
              {/* Asset Info & AI Confidence */}
              <div className="space-y-2 lg:w-1/3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                    {asset.id}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                    {asset.agentSource}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">{asset.name}</h3>
                <p className="text-xs text-slate-500">{asset.location}</p>

                {/* AI Confidence Meter */}
                <div className="pt-2">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-slate-500 font-medium flex items-center gap-1">
                      <BrainCircuit className="w-3.5 h-3.5 text-indigo-600" /> AI Confidence Score
                    </span>
                    <span className="font-bold text-indigo-700 font-mono">{asset.confidenceScore}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full"
                      style={{ width: `${asset.confidenceScore}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Root Cause & Affected Components Breakdown */}
              <div className="space-y-3 lg:w-1/2 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="font-bold text-slate-900 text-sm block">Identified Root Cause</span>
                  <span className="text-slate-700 mt-0.5 block font-medium text-xs leading-relaxed">
                    {asset.rootCause}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-700 block mb-1">Affected Sub-Components:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {asset.affectedComponents.map((comp) => (
                      <span
                        key={comp}
                        className="bg-white border border-slate-200 px-2.5 py-1 rounded-md text-slate-800 font-medium text-[11px]"
                      >
                        • {comp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="font-bold text-blue-900 block mb-0.5">AI Recommended Solution:</span>
                  <span className="text-blue-800">{asset.recommendedSolution}</span>
                </div>
              </div>

              {/* Financial & Action Box */}
              <div className="lg:w-1/4 flex flex-col justify-between space-y-4 bg-white p-4 rounded-xl border border-slate-200">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Est. Repair Cost</span>
                    <span className="font-bold text-slate-900 font-mono">
                      ${asset.estimatedRepairCost?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Downtime Avoidance</span>
                    <span className="font-bold text-emerald-600 font-mono">
                      ${asset.downtimeAvoidanceValue?.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedAssetModal(asset)}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition"
                  >
                    View Diagnostic Waveforms
                  </button>
                  <button
                    onClick={() => handleCreateWorkOrder(asset)}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition flex items-center justify-center gap-1"
                  >
                    <Wrench className="w-3.5 h-3.5" /> Execute Repair Work Order
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
