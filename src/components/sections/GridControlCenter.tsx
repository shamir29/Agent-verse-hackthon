import React from 'react';
import { 
  Sliders, 
  X, 
  Cpu, 
  Zap, 
  AlertTriangle 
} from 'lucide-react';
import { useGrid } from '../../context/GridContext';

interface GridControlCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GridControlCenter: React.FC<GridControlCenterProps> = ({ isOpen, onClose }) => {
  const { controlState, toggleLayer, setDispatchStrategy, setAutopilot, triggerFaultSimulation } = useGrid();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-200 p-6 flex flex-col justify-between overflow-y-auto space-y-6">
        
        {/* Top Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Grid Control Dock</h3>
                <p className="text-xs text-slate-500">Autonomous Agent Parameters & Override</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* AI Autopilot Master Toggle */}
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-blue-900 block flex items-center">
                <Cpu className="w-4 h-4 mr-1.5 text-blue-600" />
                AI Agent Autopilot Mode
              </span>
              <span className="text-[11px] text-blue-700 block">
                {controlState.aiAutopilot ? 'Autonomous load balancing active' : 'Manual operator control'}
              </span>
            </div>

            <button
              onClick={() => setAutopilot(!controlState.aiAutopilot)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                controlState.aiAutopilot ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  controlState.aiAutopilot ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Dispatch Strategy Selector */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-900 tracking-wider uppercase">Dispatch Strategy</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => setDispatchStrategy('max_renewables')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                controlState.dispatchStrategy === 'max_renewables' 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold' 
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Max Renewables
            </button>

            <button
              onClick={() => setDispatchStrategy('max_reliability')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                controlState.dispatchStrategy === 'max_reliability' 
                  ? 'bg-blue-50 border-blue-300 text-blue-900 font-bold' 
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Max Reliability
            </button>

            <button
              onClick={() => setDispatchStrategy('cost_optimized')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                controlState.dispatchStrategy === 'cost_optimized' 
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-bold' 
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Cost Optimized
            </button>

            <button
              onClick={() => setDispatchStrategy('emergency')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                controlState.dispatchStrategy === 'emergency' 
                  ? 'bg-rose-50 border-rose-300 text-rose-900 font-bold' 
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Emergency Mode
            </button>
          </div>
        </div>

        {/* Map Layer Visibility Toggles */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-900 tracking-wider uppercase">Active Map Layers</h4>
          <div className="space-y-2 text-xs">
            {Object.entries(controlState.activeLayers).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="capitalize text-slate-700 font-medium">{key.replace(/([A-Z])/g, ' $1')}</span>
                <button
                  onClick={() => toggleLayer(key as any)}
                  className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${val ? 'bg-blue-600' : 'bg-slate-300'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${val ? 'translate-x-4' : ''}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Simulation Sandbox Actions */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-900 tracking-wider uppercase">Fault Injection Sandbox</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => triggerFaultSimulation('transformer_overload')}
              className="py-2.5 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-xl border border-amber-200 font-medium flex items-center justify-center space-x-1 cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Overload Surge</span>
            </button>

            <button
              onClick={() => triggerFaultSimulation('tree_strike')}
              className="py-2.5 px-3 bg-rose-50 hover:bg-rose-100 text-rose-900 rounded-xl border border-rose-200 font-medium flex items-center justify-center space-x-1 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-rose-600" />
              <span>Line Cut</span>
            </button>
          </div>
        </div>

        {/* Bottom Done Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-xs transition-colors cursor-pointer"
        >
          Close Control Dock
        </button>

      </div>
    </div>
  );
};
