import React, { useState } from 'react';
import { Search, Bell, Shield, Sparkles, User, AlertCircle, CheckCircle2, ChevronDown, Command } from 'lucide-react';

export default function Header({ onOpenSearch, onOpenSOS, activeViewName }) {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: "Lab Report Analyzed", desc: "Lipid Panel PDF parsed successfully with zero critical markers.", time: "10 mins ago", type: "success" },
    { id: 2, title: "Medication Refill", desc: "Rosuvastatin (5mg) has 4 tablets remaining.", time: "1 hour ago", type: "warning" },
    { id: 3, title: "Appointment Confirmed", desc: "Dr. Elena Rostova (Cardiology) on Thursday 10:00 AM.", time: "3 hours ago", type: "info" },
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-8 flex items-center justify-between sticky top-0 z-30">
      
      {/* Active View Title & Breadcrumb */}
      <div className="flex items-center gap-3">
        <h1 className="font-['Inter'] font-bold text-lg text-slate-900 capitalize">
          {activeViewName || 'Overview'}
        </h1>
        <span className="text-xs text-slate-300">•</span>
        <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>System Normal</span>
        </div>
      </div>

      {/* Right Action Tools */}
      <div className="flex items-center gap-4">
        
        {/* Cmd + K Global Command Search Button */}
        <button
          onClick={onOpenSearch}
          className="hidden md:flex items-center gap-3 bg-slate-100/80 hover:bg-slate-100 text-slate-500 text-xs px-4 py-2 rounded-xl border border-slate-200/60 transition-all"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span>Search doctors, symptoms, reports...</span>
          <kbd className="hidden sm:inline-block bg-white text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded text-[10px] font-mono">
            ⌘K
          </kbd>
        </button>

        {/* Notifications Popover Toggle */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 flex items-center justify-center transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-4 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <span className="text-xs font-bold text-slate-900">Notifications</span>
                <span className="text-[10px] font-semibold text-blue-600 cursor-pointer">Mark all read</span>
              </div>
              <div className="space-y-3">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                    <div className="flex items-center justify-between font-semibold text-slate-900">
                      <span>{n.title}</span>
                      <span className="text-[10px] font-normal text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SOS Button */}
        <button
          onClick={onOpenSOS}
          className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-sm shadow-rose-600/20 flex items-center gap-1.5"
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span>SOS</span>
        </button>

      </div>

    </header>
  );
}
