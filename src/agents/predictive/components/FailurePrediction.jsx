import React, { useState } from 'react';
import { 
  TrendingDown, 
  AlertTriangle, 
  Clock, 
  Calendar, 
  ShieldAlert, 
  Wrench, 
  ChevronRight,
  Filter,
  DollarSign
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FailurePrediction = () => {
  const { mockFailurePredictions, setSelectedAssetModal, assets, scheduleTask, setActiveTab } = useApp();
  const [selectedRisk, setSelectedRisk] = useState('All');

  const risks = ['All', 'Critical', 'High', 'Medium', 'Low'];

  const filteredPredictions = mockFailurePredictions.filter(
    (p) => selectedRisk === 'All' || p.riskLevel === selectedRisk
  );

  const handleCreateWorkOrder = (pred) => {
    scheduleTask({
      id: `TSK-${Math.floor(1000 + Math.random() * 9000)}`,
      assetId: pred.assetId,
      equipment: pred.equipment,
      category: 'Critical Maintenance',
      priority: pred.riskLevel === 'Critical' ? 'P1 - Critical' : 'P2 - High',
      estimatedTime: '4.0 Hours',
      technicianRequired: 'Reliability Engineer',
      technicianAssigned: 'David Miller',
      estimatedCost: pred.estimatedCost || 3000,
      expectedImprovement: 'Prevent Failure & Reset RUL',
      status: 'Scheduled',
      dueDate: new Date().toISOString().split('T')[0],
      location: 'Smart City Facility',
    });
    setActiveTab('planner');
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="card-enterprise p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">AI Failure Prediction & Risk Forecasting</h2>
            <span className="bg-purple-100 text-purple-800 text-xs px-2.5 py-0.5 rounded-full font-bold">
              Neural Ensemble RUL Model
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Predictive machine learning models continuously analyze vibration, thermal, current, and acoustic telemetry.
          </p>
        </div>

        {/* Risk Filter Pills */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Risk Filter:</span>
          {risks.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRisk(r)}
              className={`text-xs px-3 py-1 rounded-lg font-medium transition ${
                selectedRisk === r
                  ? 'bg-blue-600 text-white font-semibold shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Failure Prediction Cards List */}
      <div className="space-y-4">
        {filteredPredictions.map((pred) => {
          const isCritical = pred.riskLevel === 'Critical';
          const isHigh = pred.riskLevel === 'High';
          const targetAsset = assets.find((a) => a.id === pred.assetId);

          return (
            <div
              key={pred.id}
              className={`card-enterprise p-5 hover:shadow-md transition border-l-4 ${
                isCritical
                  ? 'border-l-red-500 bg-red-50/10'
                  : isHigh
                  ? 'border-l-amber-500 bg-amber-50/10'
                  : 'border-l-blue-500'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                {/* Left: Asset info & failure mode */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {pred.assetId}
                    </span>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {pred.agentSource}
                    </span>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        isCritical
                          ? 'bg-red-100 text-red-700 border border-red-200'
                          : isHigh
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {pred.riskLevel} Risk
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{pred.equipment}</h3>
                  <div className="text-xs font-semibold text-red-600 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Predicted Mode: {pred.failureType}
                  </div>
                </div>

                {/* Center: Probability & Expected Date */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Failure Probability</span>
                    <span className={`text-xl font-extrabold font-mono ${isCritical ? 'text-red-600' : 'text-amber-600'}`}>
                      {pred.probability}%
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block">Expected Failure Date</span>
                    <span className="font-bold text-slate-900">{pred.expectedDate}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block">Remaining Useful Life</span>
                    <span className="text-lg font-bold text-blue-600 font-mono">{pred.rulDays} Days</span>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2">
                  {targetAsset && (
                    <button
                      onClick={() => setSelectedAssetModal(targetAsset)}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition"
                    >
                      Diagnose Asset
                    </button>
                  )}
                  <button
                    onClick={() => handleCreateWorkOrder(pred)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition flex items-center gap-1.5"
                  >
                    <Wrench className="w-3.5 h-3.5" /> Schedule Maintenance
                  </button>
                </div>

              </div>

              {/* Bottom: Root Cause & AI Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-lg">
                  <span className="font-bold text-slate-700 block mb-0.5">Identified Root Cause:</span>
                  <span className="text-slate-600">{pred.rootCause}</span>
                </div>
                <div className="bg-blue-50/50 p-2.5 rounded-lg border border-blue-100">
                  <span className="font-bold text-blue-900 block mb-0.5">AI Recommended Action:</span>
                  <span className="text-blue-800">{pred.recommendedAction}</span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
