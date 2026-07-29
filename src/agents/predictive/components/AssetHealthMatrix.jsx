import React, { useState } from 'react';
import { 
  HeartPulse, 
  ShieldCheck, 
  AlertTriangle, 
  Wrench, 
  XCircle, 
  Filter, 
  Grid, 
  List, 
  ArrowUpDown,
  Search
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AssetHealthMatrix = () => {
  const { filteredAssets, setSelectedAssetModal } = useApp();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('healthScore');

  const statuses = [
    { label: 'All Assets', value: 'All', color: 'bg-slate-100 text-slate-700' },
    { label: '🟢 Healthy', value: 'Healthy', color: 'bg-emerald-100 text-emerald-800' },
    { label: '🟡 Warning', value: 'Warning', color: 'bg-amber-100 text-amber-800' },
    { label: '🟠 Maintenance Required', value: 'Maintenance Required', color: 'bg-orange-100 text-orange-800' },
    { label: '🔴 Critical', value: 'Critical', color: 'bg-red-100 text-red-800' },
  ];

  const displayedAssets = filteredAssets
    .filter((a) => selectedStatus === 'All' || a.status === selectedStatus)
    .sort((a, b) => {
      if (sortBy === 'healthScore') return a.healthScore - b.healthScore;
      if (sortBy === 'rul') return a.rulDays - b.rulDays;
      if (sortBy === 'failureProb') return b.failureProb - a.failureProb;
      return 0;
    });

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="card-enterprise p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">AI Equipment Health Matrix</h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time equipment degradation monitoring, health scoring, and remaining useful life metrics.
          </p>
        </div>

        {/* View Toggle & Sorting */}
        <div className="flex flex-wrap items-center gap-3">
          
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500 font-medium">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border-none p-0 focus:ring-0 font-bold text-slate-800 cursor-pointer"
            >
              <option value="healthScore">Lowest Health Score</option>
              <option value="rul">Shortest RUL Days</option>
              <option value="failureProb">Highest Failure Probability</option>
            </select>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition ${
                viewMode === 'grid' ? 'bg-white text-blue-600 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition ${
                viewMode === 'table' ? 'bg-white text-blue-600 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {statuses.map((st) => (
          <button
            key={st.value}
            onClick={() => setSelectedStatus(st.value)}
            className={`text-xs px-3.5 py-2 rounded-xl font-medium transition ${
              selectedStatus === st.value
                ? 'bg-slate-900 text-white font-bold shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {st.label}
          </button>
        ))}
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {displayedAssets.map((asset) => {
            const isCritical = asset.status === 'Critical';
            const isMaint = asset.status === 'Maintenance Required';
            const isWarn = asset.status === 'Warning';

            return (
              <div
                key={asset.id}
                onClick={() => setSelectedAssetModal(asset)}
                className={`card-enterprise p-5 cursor-pointer hover:shadow-md transition-all border-l-4 ${
                  isCritical
                    ? 'border-l-red-500 bg-red-50/10'
                    : isMaint
                    ? 'border-l-orange-500 bg-orange-50/10'
                    : isWarn
                    ? 'border-l-amber-500'
                    : 'border-l-emerald-500'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {asset.id}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1">{asset.name}</h3>
                    <p className="text-xs text-slate-500">{asset.agentSource}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-2xl font-extrabold font-mono ${
                        asset.healthScore >= 85
                          ? 'text-emerald-600'
                          : asset.healthScore >= 65
                          ? 'text-amber-600'
                          : 'text-red-600'
                      }`}
                    >
                      {asset.healthScore}%
                    </span>
                    <div className="text-[10px] text-slate-400 font-medium">Health Score</div>
                  </div>
                </div>

                {/* Health Metric Progress */}
                <div className="mt-4 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      asset.healthScore >= 85
                        ? 'bg-emerald-500'
                        : asset.healthScore >= 65
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${asset.healthScore}%` }}
                  />
                </div>

                {/* Health Metrics Details */}
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Remaining Useful Life</span>
                    <span className="font-bold text-blue-600 font-mono text-sm">{asset.rulDays} Days</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Operating Efficiency</span>
                    <span className="font-bold text-slate-800 font-mono text-sm">{asset.efficiency}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Failure Probability</span>
                    <span
                      className={`font-bold font-mono text-sm ${
                        asset.failureProb > 80 ? 'text-red-600' : asset.failureProb > 50 ? 'text-amber-600' : 'text-emerald-600'
                      }`}
                    >
                      {asset.failureProb}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Last Inspection</span>
                    <span className="font-semibold text-slate-700">{asset.lastInspection}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="card-enterprise overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px] tracking-wider">
                <th className="p-3">Asset ID & Name</th>
                <th className="p-3">Agent Source</th>
                <th className="p-3">Status</th>
                <th className="p-3">Health Score</th>
                <th className="p-3">RUL (Days)</th>
                <th className="p-3">Efficiency</th>
                <th className="p-3">Failure Prob</th>
                <th className="p-3">Last Inspection</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayedAssets.map((asset) => (
                <tr
                  key={asset.id}
                  onClick={() => setSelectedAssetModal(asset)}
                  className="hover:bg-slate-50 cursor-pointer transition"
                >
                  <td className="p-3">
                    <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 mr-2">
                      {asset.id}
                    </span>
                    <span className="font-bold text-slate-900">{asset.name}</span>
                  </td>
                  <td className="p-3 text-slate-600 font-medium">{asset.agentSource}</td>
                  <td className="p-3 font-semibold">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] ${
                        asset.status === 'Healthy'
                          ? 'badge-healthy'
                          : asset.status === 'Warning'
                          ? 'badge-warning'
                          : asset.status === 'Maintenance Required'
                          ? 'badge-maintenance'
                          : 'badge-critical'
                      }`}
                    >
                      {asset.status}
                    </span>
                  </td>
                  <td className="p-3 font-mono font-bold text-slate-900">{asset.healthScore}%</td>
                  <td className="p-3 font-mono font-bold text-blue-600">{asset.rulDays} d</td>
                  <td className="p-3 font-mono text-slate-800">{asset.efficiency}%</td>
                  <td
                    className={`p-3 font-mono font-bold ${
                      asset.failureProb > 80 ? 'text-red-600' : asset.failureProb > 50 ? 'text-amber-600' : 'text-emerald-600'
                    }`}
                  >
                    {asset.failureProb}%
                  </td>
                  <td className="p-3 text-slate-500">{asset.lastInspection}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};
