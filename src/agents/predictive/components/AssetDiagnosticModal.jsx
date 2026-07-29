import React from 'react';
import { 
  X, 
  Activity, 
  Thermometer, 
  Zap, 
  Clock, 
  Wrench, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2,
  Download,
  Calendar,
  Hourglass,
  Gauge,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useApp } from '../context/AppContext';

export const AssetDiagnosticModal = () => {
  const { selectedAssetModal, setSelectedAssetModal, setActiveTab, scheduleTask } = useApp();

  if (!selectedAssetModal) return null;

  const asset = selectedAssetModal;

  // Generate mock live waveform data for this modal
  const waveformData = Array.from({ length: 15 }, (_, i) => ({
    time: `${i * 2}s ago`,
    temp: asset.temperature + Math.sin(i * 0.7) * 2.5,
    vibration: asset.vibration + Math.cos(i * 0.5) * 0.8,
    voltage: asset.voltage + (Math.random() - 0.5) * 10,
  })).reverse();

  const handleQuickSchedule = () => {
    scheduleTask({
      id: `TSK-${Math.floor(1000 + Math.random() * 9000)}`,
      assetId: asset.id,
      equipment: asset.name,
      category: 'Critical Maintenance',
      priority: asset.status === 'Critical' ? 'P1 - Critical' : 'P2 - High',
      estimatedTime: '3.5 Hours',
      technicianRequired: 'Certified Reliability Specialist',
      technicianAssigned: 'David Miller',
      estimatedCost: asset.estimatedRepairCost || 2500,
      expectedImprovement: '+40% Health Score',
      status: 'Scheduled',
      dueDate: new Date().toISOString().split('T')[0],
      location: asset.location,
    });
    setSelectedAssetModal(null);
    setActiveTab('planner');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 flex items-start justify-between bg-slate-50 rounded-t-2xl">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                {asset.id}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                {asset.agentSource}
              </span>
              <span className="text-xs text-slate-500 font-medium">• {asset.category}</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">{asset.name}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{asset.location}</p>
          </div>

          <button
            onClick={() => setSelectedAssetModal(null)}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-xl transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Top Status Banner & Gauges */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Health Gauge Box */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-center items-center text-center">
              <span className="text-xs font-medium text-slate-500">Asset Health Score</span>
              <div className="relative mt-2">
                <span
                  className={`text-3xl font-extrabold ${
                    asset.healthScore >= 85
                      ? 'text-emerald-600'
                      : asset.healthScore >= 65
                      ? 'text-amber-600'
                      : 'text-red-600'
                  }`}
                >
                  {asset.healthScore}%
                </span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1">Status: {asset.status}</span>
            </div>

            {/* RUL Countdown Box */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-center items-center text-center">
              <span className="text-xs font-medium text-slate-500">Remaining Useful Life (RUL)</span>
              <div className="text-3xl font-extrabold text-blue-600 mt-2 font-mono">
                {asset.rulDays} Days
              </div>
              <span className="text-[10px] text-slate-400 mt-1">Predicted EOL: Aug 2026</span>
            </div>

            {/* Failure Probability */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-center items-center text-center">
              <span className="text-xs font-medium text-slate-500">Failure Probability</span>
              <div
                className={`text-3xl font-extrabold mt-2 font-mono ${
                  asset.failureProb > 80 ? 'text-red-600' : asset.failureProb > 50 ? 'text-amber-600' : 'text-emerald-600'
                }`}
              >
                {asset.failureProb}%
              </div>
              <span className="text-[10px] text-slate-400 mt-1">Risk Level: {asset.riskLevel}</span>
            </div>

            {/* Operating Efficiency */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-center items-center text-center">
              <span className="text-xs font-medium text-slate-500">Operating Efficiency</span>
              <div className="text-3xl font-extrabold text-slate-800 mt-2 font-mono">
                {asset.efficiency}%
              </div>
              <span className="text-[10px] text-slate-400 mt-1">Last Inspection: {asset.lastInspection}</span>
            </div>

          </div>

          {/* Live Waveform Telemetry Chart */}
          <div className="card-enterprise p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-600" /> Live High-Frequency Waveform (Vibration & Temperature)
                </h4>
                <p className="text-xs text-slate-500">Real-time SCADA / Modbus sensor stream feed</p>
              </div>
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                <span className="live-pulse" /> Live Telemetry 100Hz
              </span>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={waveformData}>
                  <defs>
                    <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="vibGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                  <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="temp" name="Temperature (°C)" stroke="#ef4444" fillOpacity={1} fill="url(#tempGrad)" strokeWidth={2} />
                  <Area type="monotone" dataKey="vibration" name="Vibration (mm/s)" stroke="#2563eb" fillOpacity={1} fill="url(#vibGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Telemetry Sensor Parameter Dials */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg border border-slate-200 bg-white">
              <div className="text-slate-400 text-[10px]">Temperature Threshold</div>
              <div className="text-sm font-bold text-slate-800 mt-0.5">{asset.temperature}°C / {asset.tempThreshold}°C Limit</div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className={`h-full ${asset.temperature > asset.tempThreshold ? 'bg-red-500' : 'bg-blue-500'}`} 
                  style={{ width: `${Math.min(100, (asset.temperature / (asset.tempThreshold * 1.2)) * 100)}%` }} 
                />
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-white">
              <div className="text-slate-400 text-[10px]">Acoustic Vibration</div>
              <div className="text-sm font-bold text-slate-800 mt-0.5">{asset.vibration} mm/s</div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className={`h-full ${asset.vibration > 7.0 ? 'bg-red-500' : 'bg-emerald-500'}`} 
                  style={{ width: `${Math.min(100, (asset.vibration / 15) * 100)}%` }} 
                />
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-white">
              <div className="text-slate-400 text-[10px]">Operating Voltage & Current</div>
              <div className="text-sm font-bold text-slate-800 mt-0.5">{asset.voltage} V / {asset.current} A</div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-indigo-500" style={{ width: '85%' }} />
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-white">
              <div className="text-slate-400 text-[10px]">Oil Level & Cooling Eff.</div>
              <div className="text-sm font-bold text-slate-800 mt-0.5">{asset.oilLevel}% Oil / {asset.coolingEfficiency}% Cool</div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-teal-500" style={{ width: `${asset.coolingEfficiency}%` }} />
              </div>
            </div>
          </div>

          {/* AI Explainability & Recommended Action */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600" /> AI Root Cause Diagnostics (Confidence: {asset.confidenceScore}%)
            </div>
            <p className="text-xs text-amber-900 font-medium">
              <span className="font-bold">Root Cause:</span> {asset.rootCause}
            </p>
            <p className="text-xs text-amber-900">
              <span className="font-bold">AI Recommended Action:</span> {asset.recommendedSolution}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-amber-800">
              <span>Est. Repair Cost: ${asset.estimatedRepairCost?.toLocaleString()}</span>
              <span>•</span>
              <span className="text-emerald-700">Downtime Avoidance Savings: ${asset.downtimeAvoidanceValue?.toLocaleString()}</span>
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 rounded-b-2xl flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => setSelectedAssetModal(null)}
            className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium text-xs rounded-lg hover:bg-slate-200 transition"
          >
            Close
          </button>

          <div className="flex items-center gap-3">
            <button 
              onClick={handleQuickSchedule}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition flex items-center gap-2"
            >
              <Wrench className="w-3.5 h-3.5" /> Schedule Maintenance Task
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
