import React, { useState } from 'react';
import { GitCommit, Calendar, CheckCircle2, Wrench, AlertTriangle, ShieldCheck, Hourglass } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AssetLifecycleTimeline = () => {
  const { assets } = useApp();
  const [selectedAssetId, setSelectedAssetId] = useState('TRF-101');

  const asset = assets.find((a) => a.id === selectedAssetId) || assets[0];

  // Lifecycle events for selected asset
  const timelineEvents = [
    {
      stage: 'Installation & Commissioning',
      date: asset.installationDate,
      status: 'Completed',
      description: 'Factory testing, SF6 gas fill, primary winding impedance calibration, SCADA node registration.',
      icon: CheckCircle2,
      color: 'bg-emerald-500 text-white',
    },
    {
      stage: 'Historical Maintenance #1',
      date: '2022-05-14',
      status: 'Completed',
      description: 'Annual scheduled thermography scan, bushing cleaning, gasket torque inspection.',
      icon: Wrench,
      color: 'bg-blue-500 text-white',
    },
    {
      stage: 'Component Repair #1',
      date: '2024-03-20',
      status: 'Completed',
      description: 'Replaced secondary tap-changer relay board and upgraded SCADA gateway firmware.',
      icon: Wrench,
      color: 'bg-indigo-500 text-white',
    },
    {
      stage: 'Historical Maintenance #2',
      date: asset.lastServiceDate,
      status: 'Completed',
      description: 'Oil dielectric breakdown voltage test (34 kV/mm) and DGA dissolved gas analysis.',
      icon: Wrench,
      color: 'bg-blue-500 text-white',
    },
    {
      stage: 'Current Health State',
      date: '2026-07-28 (Today)',
      status: asset.status,
      description: `Operating at ${asset.healthScore}% health score. AI detected radiator fan motor bearing wear.`,
      icon: ShieldCheck,
      color: asset.status === 'Critical' ? 'bg-red-500 text-white' : 'bg-amber-500 text-white',
    },
    {
      stage: 'Predicted End-of-Life (EOL)',
      date: `2026-08-06 (RUL: ${asset.rulDays} days)`,
      status: 'AI Forecasted',
      description: `AI model predicts dielectric insulation breakdown without radiator fan replacement.`,
      icon: AlertTriangle,
      color: 'bg-red-600 text-white animate-pulse',
    },
    {
      stage: 'Planned Replacement Window',
      date: '2026-08-15',
      status: 'Scheduled',
      description: 'Planned 500MVA Transformer overhaul or synthetic ester oil flushing operation.',
      icon: Hourglass,
      color: 'bg-slate-700 text-white',
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header & Asset Picker */}
      <div className="card-enterprise p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Asset Lifecycle & Historical Timeline</h2>
          <p className="text-xs text-slate-500 mt-1">
            Track asset evolution from original commissioning through past maintenance, current health, and predicted replacement.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs">
          <span className="text-slate-500 font-semibold">Select Asset:</span>
          <select
            value={selectedAssetId}
            onChange={(e) => setSelectedAssetId(e.target.value)}
            className="bg-transparent border-none p-0 focus:ring-0 font-bold text-slate-900 cursor-pointer"
          >
            {assets.map((a) => (
              <option key={a.id} value={a.id}>
                {a.id} - {a.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Asset Summary Banner */}
      <div className="card-enterprise p-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
              {asset.id}
            </span>
            <span className="text-xs text-slate-300">{asset.category}</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">{asset.name}</h3>
          <p className="text-xs text-slate-400 mt-0.5">{asset.location} • {asset.agentSource}</p>
        </div>

        <div className="flex items-center gap-6 text-xs border-t md:border-t-0 md:border-l border-slate-700 pt-3 md:pt-0 md:pl-6">
          <div>
            <div className="text-slate-400 text-[10px]">Current Health</div>
            <div className="text-2xl font-bold font-mono text-emerald-400">{asset.healthScore}%</div>
          </div>
          <div>
            <div className="text-slate-400 text-[10px]">RUL Days</div>
            <div className="text-2xl font-bold font-mono text-blue-400">{asset.rulDays}d</div>
          </div>
          <div>
            <div className="text-slate-400 text-[10px]">Expected Life</div>
            <div className="text-2xl font-bold font-mono text-slate-200">{asset.expectedLifetimeYears} yrs</div>
          </div>
        </div>
      </div>

      {/* Vertical Interactive Timeline */}
      <div className="card-enterprise p-6 relative">
        <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-slate-200" />

        <div className="space-y-8 relative">
          {timelineEvents.map((evt, idx) => {
            const Icon = evt.icon;
            return (
              <div key={idx} className="flex items-start gap-6 group">
                
                {/* Timeline Icon Node */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm z-10 ${evt.color}`}>
                  <Icon className="w-4 h-4" />
                </div>

                {/* Event Details Card */}
                <div className="card-enterprise p-4 flex-1 hover:border-blue-300 transition-all bg-white">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h4 className="text-sm font-bold text-slate-900">{evt.stage}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-500 font-mono flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {evt.date}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {evt.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">{evt.description}</p>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
