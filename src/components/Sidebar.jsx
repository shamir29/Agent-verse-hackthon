import React from 'react';
import {
  LayoutDashboard,
  HeartPulse,
  Activity,
  AlertTriangle,
  LineChart,
  SearchCode,
  Hourglass,
  CalendarCheck,
  Sparkles,
  GitCommit,
  FileText,
  Radio,
  Sliders
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Sidebar = () => {
  const { activeTab, setActiveTab, assets, maintenanceTasks, mockFailurePredictions } = useApp();

  const criticalAssetCount = assets.filter((a) => a.status === 'Critical').length;
  const pendingTaskCount = maintenanceTasks.filter((t) => t.status !== 'Completed').length;
  const highRiskPredictionCount = mockFailurePredictions.filter((p) => p.riskLevel === 'Critical' || p.riskLevel === 'High').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'monitoring', label: 'Live Monitoring', icon: Activity, badge: assets.length },
    { id: 'health', label: 'Asset Health', icon: HeartPulse, badge: criticalAssetCount ? `${criticalAssetCount} Critical` : null, badgeColor: 'bg-red-100 text-red-700' },
    { id: 'prediction', label: 'Failure Prediction', icon: AlertTriangle, badge: highRiskPredictionCount ? `${highRiskPredictionCount} High` : null, badgeColor: 'bg-orange-100 text-orange-700' },
    { id: 'diagnostics', label: 'Diagnostics', icon: LineChart },
    { id: 'rootcause', label: 'Root Cause Analysis', icon: SearchCode },
    { id: 'rul', label: 'Remaining Useful Life', icon: Hourglass },
    { id: 'planner', label: 'Maintenance Planner', icon: CalendarCheck, badge: pendingTaskCount, badgeColor: 'bg-blue-100 text-blue-700' },
    { id: 'recommendations', label: 'AI Insights', icon: Sparkles, badge: '5 AI', badgeColor: 'bg-indigo-100 text-indigo-700' },
    { id: 'lifecycle', label: 'Asset Lifecycle', icon: GitCommit },
    { id: 'reports', label: 'Reports & Export', icon: FileText },
    { id: 'integration', label: 'Cross-Agent Hub', icon: Radio, badge: '6 Agents', badgeColor: 'bg-emerald-100 text-emerald-700' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 min-h-[calc(100vh-65px)]">
      <div className="py-4 px-3 space-y-1">
        <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Core Operations
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-600 shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.badgeColor || 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Sidebar Footer System Health */}
      <div className="p-3 m-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
        <div className="flex items-center justify-between text-slate-700 font-semibold">
          <span>AI Engine Status</span>
          <span className="text-emerald-600 font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
            Online
          </span>
        </div>
        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
          <div className="bg-blue-600 h-full w-[98.4%]" />
        </div>
        <div className="flex justify-between text-[10px] text-slate-500">
          <span>RUL Model Accuracy</span>
          <span className="font-bold text-slate-700">98.4%</span>
        </div>
      </div>
    </aside>
  );
};
