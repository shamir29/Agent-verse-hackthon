import React from 'react';
import { Sparkles, AlertTriangle, Clock, DollarSign, ArrowRight, Wrench, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AiRecommendations = () => {
  const { mockAiRecommendations, setSelectedAssetModal, assets, scheduleTask, setActiveTab } = useApp();

  const handleExecuteRecommendation = (rec) => {
    const targetAsset = assets.find((a) => a.id === rec.assetId);
    if (targetAsset) {
      scheduleTask({
        id: `TSK-${Math.floor(1000 + Math.random() * 9000)}`,
        assetId: targetAsset.id,
        equipment: targetAsset.name,
        category: 'Critical Maintenance',
        priority: rec.priority.startsWith('P1') ? 'P1 - Critical' : 'P2 - High',
        estimatedTime: '4.0 Hours',
        technicianRequired: 'Specialized Engineer',
        technicianAssigned: 'David Miller',
        estimatedCost: targetAsset.estimatedRepairCost || 3000,
        expectedImprovement: rec.expectedSavings + ' Avoidance Saved',
        status: 'Scheduled',
        dueDate: new Date().toISOString().split('T')[0],
        location: targetAsset.location,
      });
      setActiveTab('planner');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="card-enterprise p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">AI Prescriptive Recommendations</h2>
            <span className="bg-indigo-100 text-indigo-800 text-xs px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Generative Prescriptive Insights
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Prioritized maintenance directives automatically synthesized from cross-agent telemetry streams.
          </p>
        </div>

        <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200">
          Total Potential Savings: <strong>$194,500</strong>
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {mockAiRecommendations.map((rec) => {
          const isUrgent = rec.priority.startsWith('P1');
          const targetAsset = assets.find((a) => a.id === rec.assetId);

          return (
            <div
              key={rec.id}
              className={`card-enterprise p-6 flex flex-col justify-between hover:shadow-md transition border-l-4 ${
                isUrgent ? 'border-l-red-500 bg-red-50/5' : 'border-l-indigo-500'
              }`}
            >
              <div>
                
                {/* Header: Category & Priority */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                      {rec.category}
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-500">{rec.assetId}</span>
                  </div>

                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      isUrgent ? 'bg-red-100 text-red-700' : 'bg-indigo-100 text-indigo-700'
                    }`}
                  >
                    {rec.priority}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-slate-900 mt-1">{rec.title}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{rec.description}</p>

                {/* ROI Badges */}
                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100 mt-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <div>
                      <span className="text-[10px] text-slate-400 block">Est. Downtime Avoided</span>
                      <span className="font-bold text-slate-900">{rec.estimatedDowntime}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="text-[10px] text-slate-400 block">Expected Cost Savings</span>
                      <span className="font-bold text-emerald-600 font-mono">{rec.expectedSavings}</span>
                    </div>
                  </div>
                </div>

                {/* Recommended Action */}
                <div className="mt-3 p-3 rounded-lg bg-blue-50/60 border border-blue-100 text-xs">
                  <span className="font-bold text-blue-900 block mb-0.5">Recommended Action:</span>
                  <span className="text-blue-800">{rec.recommendedAction}</span>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                {targetAsset && (
                  <button
                    onClick={() => setSelectedAssetModal(targetAsset)}
                    className="text-xs text-slate-600 hover:text-slate-900 font-semibold"
                  >
                    Inspect Telemetry →
                  </button>
                )}

                <button
                  onClick={() => handleExecuteRecommendation(rec)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-2xs transition flex items-center gap-1.5"
                >
                  <Wrench className="w-3.5 h-3.5" /> Execute Prescriptive Plan
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
