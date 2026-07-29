import React, { useState } from 'react';
import { 
  MapPin, 
  Layers, 
  Zap, 
  Sun, 
  Wind, 
  Battery, 
  Building2, 
  Factory, 
  Home, 
  Activity, 
  ShieldCheck, 
  X,
  Radio
} from 'lucide-react';
import { useGrid } from '../../context/GridContext';
import type { NodeType } from '../../types/grid';

export const LiveDigitalGridMap: React.FC = () => {
  const { nodes, selectedNode, setSelectedNode } = useGrid();
  const [filterType, setFilterType] = useState<string>('all');

  const getNodeIcon = (type: NodeType) => {
    switch (type) {
      case 'solar_farm': return <Sun className="w-4 h-4 text-emerald-600" />;
      case 'wind_farm': return <Wind className="w-4 h-4 text-emerald-600" />;
      case 'battery_storage': return <Battery className="w-4 h-4 text-indigo-600" />;
      case 'power_plant': return <Zap className="w-4 h-4 text-blue-600" />;
      case 'substation': return <Radio className="w-4 h-4 text-blue-600" />;
      case 'transmission_tower': return <Activity className="w-4 h-4 text-slate-700" />;
      case 'industrial': return <Factory className="w-4 h-4 text-amber-600" />;
      case 'commercial': return <Building2 className="w-4 h-4 text-blue-600" />;
      case 'residential': return <Home className="w-4 h-4 text-slate-600" />;
      default: return <MapPin className="w-4 h-4 text-blue-600" />;
    }
  };

  const filteredNodes = filterType === 'all' 
    ? nodes 
    : nodes.filter(n => filterType === 'renewables' ? (n.type === 'solar_farm' || n.type === 'wind_farm' || n.type === 'battery_storage') : n.type === filterType);

  return (
    <section id="grid-map" className="py-16 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 space-y-4 md:space-y-0">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3 border border-blue-200">
              <Layers className="w-3.5 h-3.5" />
              <span>Digital Twin Infrastructure Map</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Real-Time City Infrastructure Grid Map
            </h2>
            <p className="text-slate-600 mt-1 max-w-2xl text-sm">
              Explore every power station, high-voltage transmission tower, substation, battery reserve, and smart city energy consumer.
            </p>
          </div>

          {/* Map Layer Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm text-xs font-medium">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${filterType === 'all' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              All Assets ({nodes.length})
            </button>
            <button
              onClick={() => setFilterType('substation')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${filterType === 'substation' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Substations
            </button>
            <button
              onClick={() => setFilterType('renewables')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${filterType === 'renewables' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Renewables & Storage
            </button>
            <button
              onClick={() => setFilterType('industrial')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${filterType === 'industrial' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Consumers
            </button>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative w-full h-[580px] bg-white rounded-[20px] border border-slate-200 shadow-apple overflow-hidden">
          
          {/* Simulated Google / Apple Maps Vector Tiles Layer */}
          <div className="absolute inset-0 bg-[#F8FAFC] opacity-90">
            <svg className="w-full h-full stroke-slate-200 fill-none" opacity="0.6">
              <pattern id="city-streets" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" strokeWidth="1" />
                <circle cx="50" cy="50" r="1.5" fill="#CBD5E1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#city-streets)" />
              <path d="M 0,200 Q 400,300 1200,100" stroke="#E2E8F0" strokeWidth="6" />
              <path d="M 200,0 Q 300,500 800,600" stroke="#E2E8F0" strokeWidth="6" />
            </svg>
          </div>

          {/* Interactive Node Markers Overlay */}
          <div className="absolute inset-0">
            {filteredNodes.map(node => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                >
                  <div className={`relative flex items-center justify-center p-2 rounded-2xl transition-all duration-300 transform group-hover:scale-110 ${
                    node.status === 'critical' ? 'bg-rose-500 text-white ring-4 ring-rose-200 animate-bounce' :
                    node.status === 'warning' ? 'bg-amber-500 text-white ring-4 ring-amber-200' :
                    node.status === 'rerouted' ? 'bg-amber-500 text-white ring-4 ring-amber-200' :
                    isSelected ? 'bg-blue-600 text-white ring-4 ring-blue-200 scale-110' :
                    'bg-white text-slate-800 border border-slate-200 shadow-md group-hover:border-blue-500'
                  }`}>
                    {getNodeIcon(node.type)}
                    <span className="ml-1.5 text-xs font-bold whitespace-nowrap hidden sm:inline">{node.name.split(' ')[0]}</span>
                  </div>

                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 hidden group-hover:block bg-slate-900 text-white text-[11px] py-1 px-2.5 rounded-lg shadow-xl whitespace-nowrap z-20">
                    <div className="font-semibold">{node.name}</div>
                    <div className="text-slate-300">{node.loadMW} MW • {node.voltagekV} kV</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map Controls Dock */}
          <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-md flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-slate-700 font-medium">Optimal</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="text-slate-700 font-medium">Warning / Rerouted</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
              <span className="text-slate-700 font-medium">Fault Critical</span>
            </div>
          </div>

          {/* Selected Node Telemetry Expansion Drawer / Card */}
          {selectedNode && (
            <div className="absolute top-4 right-4 z-30 w-80 bg-white p-5 rounded-[20px] border border-slate-200 shadow-2xl space-y-4 animate-in fade-in duration-200">
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-xl bg-blue-50 border border-blue-200">
                    {getNodeIcon(selectedNode.type)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">{selectedNode.name}</h4>
                    <span className="text-[11px] text-slate-500 font-medium">{selectedNode.region}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Current Load</span>
                  <span className="text-sm font-bold text-slate-900">{selectedNode.loadMW} MW</span>
                  <span className="text-[10px] text-slate-400 block">/ {selectedNode.capacityMW} MW max</span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Voltage Level</span>
                  <span className="text-sm font-bold text-slate-900">{selectedNode.voltagekV} kV</span>
                  <span className="text-[10px] text-emerald-600 block font-medium">Normal Range</span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Frequency</span>
                  <span className="text-sm font-bold text-slate-900">{selectedNode.frequencyHz} Hz</span>
                  <span className="text-[10px] text-slate-400 block">60.00 Hz nominal</span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Asset Health</span>
                  <span className="text-sm font-bold text-emerald-600">{selectedNode.health}%</span>
                  <span className="text-[10px] text-slate-400 block">No degradation</span>
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-xs text-blue-900 space-y-1">
                <div className="flex items-center space-x-1.5 font-bold text-blue-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>AI Agent Status</span>
                </div>
                <p className="text-[11px] leading-snug">{selectedNode.aiStatus}</p>
              </div>

              <div className="pt-1">
                <button
                  onClick={() => setSelectedNode(null)}
                  className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  Close Inspection Panel
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
