import React, { useState } from 'react';
import { 
  Activity, 
  Thermometer, 
  Zap, 
  Clock, 
  Calendar, 
  SlidersHorizontal, 
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Wrench,
  XCircle,
  Radio
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LiveMonitoring = () => {
  const { filteredAssets, setSelectedAssetModal, isLiveStreaming } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const categories = [
    'All',
    'Transformers',
    'Solar Panels',
    'Inverters',
    'Batteries',
    'EV Chargers',
    'Water Pumps',
    'Smart Bins',
    'Motors',
    'Distribution Panels',
    'Sensors',
  ];

  const statuses = ['All', 'Healthy', 'Warning', 'Maintenance Required', 'Critical'];

  const displayedAssets = filteredAssets.filter((asset) => {
    const categoryMatch = selectedCategory === 'All' || asset.category === selectedCategory;
    const statusMatch = statusFilter === 'All' || asset.status === statusFilter;
    return categoryMatch && statusMatch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Healthy':
        return <span className="badge-healthy px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Healthy</span>;
      case 'Warning':
        return <span className="badge-warning px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> Warning</span>;
      case 'Maintenance Required':
        return <span className="badge-maintenance px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><Wrench className="w-3.5 h-3.5" /> Maint Required</span>;
      case 'Critical':
        return <span className="badge-critical px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 animate-pulse"><XCircle className="w-3.5 h-3.5" /> Critical</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="card-enterprise p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">Live Infrastructure Monitoring</h2>
            {isLiveStreaming && (
              <span className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-0.5 rounded-full border border-emerald-200 font-semibold flex items-center gap-1.5">
                <span className="live-pulse" /> Live Telemetry Feed
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time IoT sensor telemetry streams from Smart City & Energy Grid agents.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200">
            <span className="text-xs font-semibold text-slate-500 px-2 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Status:
            </span>
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`text-xs px-2.5 py-1 rounded-md font-medium transition ${
                  statusFilter === st
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs px-3.5 py-2 rounded-xl whitespace-nowrap font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Infrastructure Asset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {displayedAssets.map((asset) => (
          <div
            key={asset.id}
            onClick={() => setSelectedAssetModal(asset)}
            className="card-enterprise p-5 cursor-pointer group hover:border-blue-300 hover:shadow-md transition-all relative overflow-hidden"
          >
            {/* Top Row: Asset ID, Agent Badge & Status */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                    {asset.id}
                  </span>
                  <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {asset.agentSource}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-1.5 group-hover:text-blue-600 transition-colors">
                  {asset.name}
                </h3>
              </div>
              <div>{getStatusBadge(asset.status)}</div>
            </div>

            {/* Middle Row: Health Bar */}
            <div className="mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-slate-500 font-medium">Health Score</span>
                <span
                  className={`font-bold ${
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
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    asset.healthScore >= 85
                      ? 'bg-emerald-500'
                      : asset.healthScore >= 65
                      ? 'bg-amber-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${asset.healthScore}%` }}
                />
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-md bg-slate-50 border border-slate-100">
                <Thermometer className={`w-4 h-4 ${asset.temperature > asset.tempThreshold ? 'text-red-500 animate-pulse' : 'text-slate-400'}`} />
                <div>
                  <div className="text-[10px] text-slate-400">Temperature</div>
                  <div className={`font-bold font-mono ${asset.temperature > asset.tempThreshold ? 'text-red-600' : 'text-slate-800'}`}>
                    {asset.temperature}°C
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-md bg-slate-50 border border-slate-100">
                <Zap className="w-4 h-4 text-slate-400" />
                <div>
                  <div className="text-[10px] text-slate-400">Power Output</div>
                  <div className="font-bold font-mono text-slate-800">{asset.powerConsumption} kW</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-md bg-slate-50 border border-slate-100">
                <Clock className="w-4 h-4 text-slate-400" />
                <div>
                  <div className="text-[10px] text-slate-400">Operating Hrs</div>
                  <div className="font-bold font-mono text-slate-800">{asset.operatingHours.toLocaleString()}h</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-md bg-slate-50 border border-slate-100">
                <Calendar className="w-4 h-4 text-slate-400" />
                <div>
                  <div className="text-[10px] text-slate-400">Last Service</div>
                  <div className="font-bold text-slate-800">{asset.lastServiceDate}</div>
                </div>
              </div>
            </div>

            {/* Bottom Footer: Location & Diagnostics Action */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium truncate max-w-[180px]">{asset.location}</span>
              <span className="text-blue-600 font-semibold flex items-center gap-1 group-hover:underline">
                Diagnostics <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
