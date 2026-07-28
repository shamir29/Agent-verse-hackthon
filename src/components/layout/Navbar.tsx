import React from 'react';
import {
  Zap,
  Activity,
  Sun,
  Wind,
  BatteryCharging,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Bot,
  FileSpreadsheet,
  Gauge,
  Sliders,
  ShieldCheck,
  Building2,
  PieChart,
  Move3d
} from 'lucide-react';
import { TelemetryStats, ActiveTab } from '../../types/powerGrid';

interface NavbarProps {
  telemetry: TelemetryStats;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isSimulating: boolean;
  onToggleSim: () => void;
  simSpeed: number;
  onSetSpeed: (speed: number) => void;
  timeOfDayHours: number;
  weatherCondition: string;
  isAgentOpen: boolean;
  onToggleAgent: () => void;
  onTriggerFailure: (type: 'substation_trip' | 'transformer_overload' | 'line_break' | 'solar_flare') => void;
  onOpenReportModal: () => void;
  onRunAiHealing: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  telemetry,
  activeTab,
  setActiveTab,
  isSimulating,
  onToggleSim,
  simSpeed,
  onSetSpeed,
  timeOfDayHours,
  weatherCondition,
  isAgentOpen,
  onToggleAgent,
  onTriggerFailure,
  onOpenReportModal,
  onRunAiHealing
}) => {
  const formatTime = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.floor((hours - h) * 60);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    return `${displayH}:${m < 10 ? '0' : ''}${m} ${ampm}`;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between py-3 gap-3">
          
          {/* Logo & Identity */}
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-500 text-white shadow-md shadow-cyan-500/20">
              <Zap className="w-6 h-6 animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold tracking-tight text-slate-900">
                  Power Grid <span className="text-cyan-600">AI</span>
                </h1>
                <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-full border border-emerald-200 flex items-center gap-1">
                  <Move3d className="w-3 h-3 text-emerald-600" />
                  COMMAND CENTER
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Smart Electricity Distribution & Load Balancing</p>
            </div>
          </div>

          {/* Quick Telemetry Tickers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 lg:gap-3">
            
            <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 flex items-center space-x-2.5">
              <Activity className="w-4 h-4 text-cyan-600" />
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Gen / Demand</div>
                <div className="text-xs font-bold text-slate-800">
                  <span className="text-emerald-600">{telemetry.totalGenerationMW}</span> / {telemetry.totalDemandMW} MW
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 flex items-center space-x-2.5">
              <Sun className="w-4 h-4 text-amber-500" />
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Renewable Share</div>
                <div className="text-xs font-bold text-emerald-600">
                  {telemetry.renewableSharePct}% <span className="text-[10px] font-normal text-slate-500">Green</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 flex items-center space-x-2.5">
              <Gauge className="w-4 h-4 text-indigo-500" />
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Frequency</div>
                <div className="text-xs font-bold text-slate-800">
                  {telemetry.gridFrequencyHz} <span className="text-[10px] font-medium text-slate-400">Hz</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 flex items-center space-x-2.5">
              <ShieldCheck className={`w-4 h-4 ${telemetry.gridStabilityScore > 80 ? 'text-emerald-500' : 'text-amber-500'}`} />
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Stability Index</div>
                <div className="text-xs font-bold text-slate-800">
                  {telemetry.gridStabilityScore}/100
                </div>
              </div>
            </div>

          </div>

          {/* Action Buttons & Simulation Speed */}
          <div className="flex items-center space-x-2">
            
            {telemetry.activeFailuresCount > 0 ? (
              <button
                onClick={onRunAiHealing}
                className="px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold text-xs flex items-center space-x-1.5 shadow-md shadow-red-500/20 animate-bounce"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>{telemetry.activeFailuresCount} Trip - Auto AI Repair</span>
              </button>
            ) : (
              <div className="relative group">
                <button
                  onClick={() => onTriggerFailure('line_break')}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-300 transition-colors flex items-center space-x-1"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Test Fault</span>
                </button>
              </div>
            )}

            {/* Sim Control */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
              <button
                onClick={onToggleSim}
                className={`p-1.5 rounded ${isSimulating ? 'bg-white text-cyan-600 shadow-sm' : 'text-slate-500'}`}
                title={isSimulating ? 'Pause Engine' : 'Resume Engine'}
              >
                {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <div className="flex items-center ml-1 space-x-1">
                {[1, 2, 5].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => onSetSpeed(speed)}
                    className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                      simSpeed === speed ? 'bg-cyan-500 text-white' : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden xl:flex items-center px-2.5 py-1.5 bg-cyan-50 text-cyan-800 rounded-lg text-xs font-semibold border border-cyan-200">
              <Sun className="w-3.5 h-3.5 mr-1 text-amber-500" />
              {formatTime(timeOfDayHours)}
            </div>

            {/* Simple AI Agent Toggle Button */}
            <button
              onClick={onToggleAgent}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-sm ${
                isAgentOpen
                  ? 'bg-cyan-600 text-white shadow-cyan-500/20'
                  : 'bg-gradient-to-r from-slate-900 to-slate-800 text-white hover:from-cyan-700 hover:to-emerald-700'
              }`}
            >
              <Bot className="w-4 h-4 text-cyan-300 animate-spin" style={{ animationDuration: '6s' }} />
              <span>AI Console</span>
            </button>

            <button
              onClick={onOpenReportModal}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300"
              title="Export Grid Analytics Report"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            </button>

          </div>

        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex space-x-1 border-t border-slate-200/80 pt-1 overflow-x-auto no-scrollbar">
          {[
            { id: 'grid_view', label: '3D Command Grid', icon: Move3d },
            { id: 'renewables', label: 'Renewable Energy', icon: Sun },
            { id: 'failures', label: 'Grid Failures & AI', icon: AlertTriangle, badge: telemetry.activeFailuresCount },
            { id: 'battery', label: 'Battery Storage (BESS)', icon: BatteryCharging },
            { id: 'analytics', label: 'Consumption Analytics', icon: PieChart }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-cyan-600 text-cyan-600 bg-cyan-50/50'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 text-[10px] font-extrabold bg-red-500 text-white rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
