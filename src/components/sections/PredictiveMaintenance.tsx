import React from 'react';
import { 
  Wrench, 
  Thermometer, 
  Activity 
} from 'lucide-react';
import { useGrid } from '../../context/GridContext';

export const PredictiveMaintenance: React.FC = () => {
  const { maintenance } = useGrid();

  return (
    <section id="maintenance" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 space-y-4 md:space-y-0">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3 border border-blue-200">
              <Wrench className="w-3.5 h-3.5" />
              <span>Predictive RUL Analytics</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Predictive Asset Maintenance & RUL Timeline
            </h2>
            <p className="text-slate-600 mt-1 max-w-2xl text-sm">
              Continuous thermal imaging telemetry and acoustic vibration spectral analysis predict component degradation before hardware failure occurs.
            </p>
          </div>
        </div>

        {/* Maintenance Cards Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {maintenance.map(item => (
            <div 
              key={item.id}
              className="bg-white p-6 rounded-[20px] border border-slate-200 shadow-apple space-y-4 hover:border-blue-300 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">{item.category}</span>
                  <h3 className="text-base font-bold text-slate-900">{item.assetName}</h3>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  item.priority === 'High' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                  item.priority === 'Medium' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                  'bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}>
                  {item.priority} Priority
                </span>
              </div>

              {/* Useful Life Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-500">Remaining Useful Life (RUL):</span>
                  <span className="text-slate-900 font-bold">{item.remainingUsefulLifeDays} Days</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.remainingUsefulLifeDays < 30 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`} 
                    style={{ width: `${Math.min(100, (item.remainingUsefulLifeDays / 365) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Telemetry Chips (Temperature, Vibration, Failure Prob) */}
              <div className="grid grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Health Score</span>
                  <span className="text-sm font-bold text-slate-900">{item.healthScore}%</span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Temperature</span>
                  <span className="text-sm font-bold text-slate-900 flex items-center">
                    <Thermometer className="w-3 h-3 mr-1 text-amber-500" />
                    {item.temperatureCelsius}°C
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Vibration</span>
                  <span className="text-sm font-bold text-slate-900 flex items-center">
                    <Activity className="w-3 h-3 mr-1 text-blue-500" />
                    {item.vibrationMmPerSec} mm/s
                  </span>
                </div>
              </div>

              {/* AI Recommendation */}
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200 text-xs text-blue-900 space-y-0.5">
                <span className="font-bold text-blue-800 block">AI Maintenance Directive:</span>
                <p className="text-[11px] leading-snug">{item.aiRecommendation}</p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
