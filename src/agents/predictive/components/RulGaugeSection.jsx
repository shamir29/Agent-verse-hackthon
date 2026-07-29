import React from 'react';
import { Hourglass, Calendar, Clock, RotateCcw, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useApp } from '../context/AppContext';

export const RulGaugeSection = () => {
  const { assets, setSelectedAssetModal } = useApp();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="card-enterprise p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Remaining Useful Life (RUL) & Lifecycle Estimation</h2>
          <p className="text-xs text-slate-500 mt-1">
            Physics-informed neural models estimate component wear, fatigue, and end-of-life replacement timelines.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-lg border border-blue-200 font-semibold">
          <Hourglass className="w-4 h-4 text-blue-600" /> Continuous Survival Analysis Model
        </div>
      </div>

      {/* RUL Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {assets.map((asset) => {
          // Calculate lifecycle metrics
          const installYear = parseInt(asset.installationDate.split('-')[0], 10);
          const currentYear = 2026;
          const currentAgeYears = Math.max(1, currentYear - installYear);
          const totalLifeYears = asset.expectedLifetimeYears;
          const percentageUsed = Math.min(100, Math.round((currentAgeYears / totalLifeYears) * 100));

          // Mock degradation curve data
          const degradationData = [
            { year: `${installYear}`, health: 100 },
            { year: `${installYear + Math.round(totalLifeYears * 0.3)}`, health: 90 },
            { year: `${installYear + Math.round(totalLifeYears * 0.6)}`, health: 80 },
            { year: '2026 (Now)', health: asset.healthScore },
            { year: `2026 + ${asset.rulDays}d`, health: 20 },
          ];

          return (
            <div
              key={asset.id}
              onClick={() => setSelectedAssetModal(asset)}
              className="card-enterprise p-5 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all space-y-4"
            >
              
              {/* Header: Name & Circular Progress Indicator */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {asset.id}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">{asset.name}</h3>
                  <span className="text-xs text-slate-500">{asset.agentSource}</span>
                </div>

                {/* Circular RUL Days Display */}
                <div className="flex flex-col items-center justify-center w-16 h-16 rounded-full border-4 border-blue-100 bg-blue-50 text-blue-700 shadow-2xs">
                  <span className="text-base font-extrabold font-mono leading-none">{asset.rulDays}</span>
                  <span className="text-[9px] font-bold uppercase mt-0.5">Days RUL</span>
                </div>
              </div>

              {/* Age vs Expected Lifetime Meter */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Current Age: <strong className="text-slate-900">{currentAgeYears} yrs</strong></span>
                  <span>Expected Life: <strong className="text-slate-900">{totalLifeYears} yrs</strong></span>
                </div>
                
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      percentageUsed > 85 ? 'bg-red-500' : percentageUsed > 70 ? 'bg-amber-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${percentageUsed}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Installed: {asset.installationDate}</span>
                  <span>{percentageUsed}% of Lifespan</span>
                </div>
              </div>

              {/* Health Degradation Trend Curve */}
              <div className="space-y-1">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Health Degradation Trajectory</span>
                <div className="h-24 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={degradationData}>
                      <CartesianGrid strokeDasharray="2 2" stroke="#f1f5f9" />
                      <XAxis dataKey="year" tick={{ fontSize: 9, fill: '#94a3b8' }} />
                      <YAxis domain={[0, 100]} hide />
                      <Tooltip contentStyle={{ borderRadius: '6px', fontSize: '11px' }} />
                      <Line type="monotone" dataKey="health" name="Health %" stroke="#2563eb" strokeWidth={2} dot={{ r: 3, fill: '#2563eb' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Replacement Recommendation */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Replacement Rec:</span>
                <span
                  className={`font-bold ${
                    asset.rulDays < 15
                      ? 'text-red-600'
                      : asset.rulDays < 45
                      ? 'text-amber-600'
                      : 'text-emerald-600'
                  }`}
                >
                  {asset.rulDays < 15 ? 'Immediate Overhaul' : asset.rulDays < 45 ? 'Schedule Q3 2026' : 'Optimal Operating Window'}
                </span>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
