import React from 'react';
import { 
  ShieldAlert, 
  Search, 
  Bell, 
  Activity, 
  User, 
  Pause, 
  Play, 
  Cpu, 
  Layers,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header = () => {
  const {
    searchQuery,
    setSearchQuery,
    isLiveStreaming,
    setIsLiveStreaming,
    notifications,
    setNotificationsOpen,
    userRole,
    setUserRole,
    activeTab,
    setActiveTab,
    filteredAssets,
  } = useApp();

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left: Platform Logo & Agent Branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm font-bold text-xl">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Smart City AI Platform</span>
              <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200">Enterprise v2.4</span>
            </div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">Predictive Maintenance Agent</h1>
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <div className="flex-1 max-w-xl relative">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assets (e.g., T-08, Pump P-11, Inverter, High Voltage)..."
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg pl-10 pr-12 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono">
                {filteredAssets.length} found
              </span>
            )}
          </div>
        </div>

        {/* Right: AI Status, Live Toggle, Notifications, User Profile */}
        <div className="flex items-center gap-4">

          {/* Cross-Agent Status Indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
            <div className="relative flex items-center justify-center">
              {isLiveStreaming ? (
                <span className="live-pulse" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-slate-400" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-slate-700 leading-none">AI Telemetry Hub</span>
              <span className="text-[10px] text-slate-500">6 Agents Connected • 99.8% Acc</span>
            </div>
            <button
              onClick={() => setIsLiveStreaming(!isLiveStreaming)}
              className="ml-2 text-slate-500 hover:text-slate-800 p-1 hover:bg-slate-200 rounded transition"
              title={isLiveStreaming ? 'Pause Live Stream' : 'Resume Live Stream'}
            >
              {isLiveStreaming ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-600" />}
            </button>
          </div>

          {/* Notification Bell */}
          <button
            onClick={() => setNotificationsOpen(true)}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Profile Selector */}
          <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center font-bold text-xs">
              RE
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-800 leading-none">Sarah Chen</span>
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="text-[10px] text-slate-500 bg-transparent border-none p-0 focus:ring-0 cursor-pointer font-medium hover:text-blue-600"
              >
                <option value="Lead Reliability Engineer">Lead Reliability Engineer</option>
                <option value="Field Ops Specialist">Field Ops Specialist</option>
                <option value="Smart City Director">Smart City Director</option>
              </select>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
