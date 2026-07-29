import React, { useState } from 'react';
import { SlidersHorizontal, Leaf, ChevronUp, ChevronDown } from 'lucide-react';

interface ControlCenterPanelProps {
  onToggleRenewablesOnly: (val: boolean) => void;
  renewablesOnly: boolean;
  activeAiMode: string;
  onChangeAiMode: (mode: string) => void;
}

export const ControlCenterPanel: React.FC<ControlCenterPanelProps> = ({
  onToggleRenewablesOnly,
  renewablesOnly,
  activeAiMode,
  onChangeAiMode,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside aria-label="Control Center" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-4xl">
      <div className="bg-white/95 backdrop-blur-md rounded-full border border-slate-200 shadow-xl p-2 sm:p-2.5 flex items-center justify-between transition-all duration-300">
        
        {/* Left Status Label */}
        <div className="flex items-center space-x-3 px-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div className="hidden sm:block">
            <span className="text-xs font-extrabold text-slate-900 tracking-tight block">NeuraGrid Floating Control Panel</span>
            <span className="text-[10px] text-slate-500 font-semibold font-mono">Agent Mode: {activeAiMode}</span>
          </div>
        </div>

        {/* Quick Filter Action Pills */}
        <div className="flex items-center space-x-2">
          
          {/* AI Optimizer Preset Modes */}
          <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200">
            <button
              onClick={() => onChangeAiMode('Max Speed')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeAiMode === 'Max Speed' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Max Speed (350kW)
            </button>
            <button
              onClick={() => onChangeAiMode('Max Savings')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeAiMode === 'Max Savings' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Max Savings
            </button>
            <button
              onClick={() => onChangeAiMode('100% Green')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeAiMode === '100% Green' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              100% Green
            </button>
          </div>

          {/* Renewable Priority Filter Toggle */}
          <button
            onClick={() => onToggleRenewablesOnly(!renewablesOnly)}
            className={`hidden md:flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer ${
              renewablesOnly
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Leaf className="w-3.5 h-3.5" />
            <span>Clean Energy Priority</span>
          </button>

        </div>

        {/* Expand Details Trigger */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
          title="Toggle Control Center Options"
        >
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>

      </div>

      {/* Expanded Quick Options Bar */}
      {isExpanded && (
        <div className="mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl p-5 animate-in fade-in slide-in-from-bottom duration-200 text-xs space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100 font-bold text-slate-900">
            <span>Quick Agent Overrides</span>
            <span className="text-slate-400 font-mono text-[11px]">System Latency: 12ms</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-700 font-medium">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600" />
              <span>Auto-Queue Reservation</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600" />
              <span>Pre-charge Thermal Conditioning</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600" />
              <span>Substation Transformer Safeguard</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600" />
              <span>ISO 15118 Plug & Charge</span>
            </label>
          </div>
        </div>
      )}
    </aside>
  );
};
