import React, { useState } from 'react';
import { Search, Building2, Zap, Droplets, Car, Sun, ShieldCheck, MapPin, ArrowUpRight } from 'lucide-react';
import { soundFX } from '../../utils/soundFX';
import type { AgentCard } from '../../types';
import { AGENT_CARDS } from '../../data/mockData';

interface InfrastructureSearchProps {
  onSelectAgent?: (agent: AgentCard) => void;
}

export const InfrastructureSearch: React.FC<InfrastructureSearchProps> = ({ onSelectAgent }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const assets = [
    { id: 'T-102', agentId: 'predictive-maintenance', name: 'Primary Substation Transformer #12', type: 'Substation', area: 'District 4 Industrial', status: 'Nominal', metric: '60.00 Hz', load: '84.2%', icon: Zap, color: '#2563EB' },
    { id: 'SOL-A4', agentId: 'solar-optimization', name: 'Solar Farm Array Alpha (12,000 Panels)', type: 'Solar Farm', area: 'Northern Basin', status: 'Optimal', metric: '+31.4% Yield', load: '98.9%', icon: Sun, color: '#F59E0B' },
    { id: 'WTR-P9', agentId: 'water-management', name: 'District 3 Acoustic Hydro-Pump', type: 'Pipeline', area: 'District 3 Aquifer', status: 'Sealed', metric: '4.8 Bar', load: '88.4%', icon: Droplets, color: '#0284C7' },
    { id: 'EV-H88', agentId: 'ev-charging', name: 'Central Hospital EV Mobility Hub', type: 'EV Station', area: 'Medical District', status: 'Active V2G', metric: '420 MW Feed', load: '100.0%', icon: Car, color: '#8B5CF6' },
    { id: 'BAT-B7', agentId: 'energy-monitoring', name: 'Utility Battery Storage Reserve B7', type: 'Battery', area: 'Substation 4 Yard', status: 'Balanced', metric: '1.42 GW/h', load: '92.0%', icon: ShieldCheck, color: '#16A34A' },
    { id: 'DT-HQ', agentId: 'digital-twin', name: 'Spatial Digital Twin Command Center', type: 'Building', area: 'Civic Plaza', status: 'Syncing', metric: '1mm LiDAR', load: '60 FPS', icon: Building2, color: '#0284C7' }
  ];

  const categories = ['ALL', 'Substation', 'Solar Farm', 'Pipeline', 'EV Station', 'Battery', 'Building'];

  const filteredAssets = assets.filter(a => {
    const matchesCategory = selectedCategory === 'ALL' || a.type === selectedCategory;
    const matchesQuery = a.name.toLowerCase().includes(query.toLowerCase()) || a.area.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="explorer" className="w-full py-32 px-6 md:px-12 bg-white select-none border-t border-slate-100">
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="linear-badge bg-blue-50 text-blue-700 border-blue-200 mb-4">
            <Search className="w-4 h-4 text-blue-600" />
            <span>Sub-Meter Spatial Asset Search Engine</span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.02] mb-6">
            Infrastructure Explorer
          </h2>
          <p className="text-lg text-slate-600 font-normal leading-relaxed">
            Instantly search and fly to any municipal asset in 3D spatial space. Inspect live telemetry, sensor diagnostics, and remaining useful life predictions.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-5 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Transformer, Solar Farm, Pipeline, Battery, Hospital, Substation..."
              className="w-full pl-14 pr-6 py-4 rounded-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white shadow-sm transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  soundFX.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Asset Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map(asset => {
            const Icon = asset.icon;
            const matchedAgent = AGENT_CARDS.find(a => a.id === asset.agentId);
            return (
              <div
                key={asset.id}
                onClick={() => {
                  soundFX.playClick();
                  if (matchedAgent && onSelectAgent) {
                    onSelectAgent(matchedAgent);
                  }
                }}
                className="apple-card p-6 flex flex-col justify-between cursor-pointer group hover:border-blue-500 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" style={{ color: asset.color }} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                      {asset.status}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-slate-400 mb-1">{asset.id} • {asset.type}</div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug mb-2 group-hover:text-blue-600 transition-colors">
                    {asset.name}
                  </h3>
                  <div className="text-xs text-slate-500 flex items-center gap-1 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{asset.area}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 font-mono">Live Telemetry</div>
                    <div className="text-sm font-bold text-slate-900 font-mono">{asset.metric}</div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                    <span>Inspect Agent Suite</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
