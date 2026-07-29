import React from 'react';
import { 
  Home, 
  Stethoscope, 
  FileText, 
  Calendar, 
  Activity, 
  Pill, 
  MapPin, 
  Bot, 
  User, 
  Shield, 
  AlertTriangle,
  ChevronRight,
  Sparkles,
  Building2
} from 'lucide-react';

export default function Sidebar({ activeView, setActiveView, onOpenSOS }) {
  const navItems = [
    { id: 'home', label: 'Home Overview', icon: Home, badge: null },
    { id: 'symptom-checker', label: 'AI Symptom Checker', icon: Stethoscope, badge: 'AI' },
    { id: 'report-analyzer', label: 'Medical Reports', icon: FileText, badge: 'OCR' },
    { id: 'appointments', label: 'Appointments', icon: Calendar, badge: '3' },
    { id: 'dashboard', label: 'Health Dashboard', icon: Activity, badge: null },
    { id: 'medications', label: 'Medications', icon: Pill, badge: 'Refill' },
    { id: 'hospitals', label: 'Nearby Hospitals', icon: MapPin, badge: 'Maps' },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot, badge: 'Pro' },
    { id: 'profile', label: 'Patient Profile', icon: User, badge: null },
    { id: 'admin', label: 'Admin Portal', icon: Shield, badge: 'Ops' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-600/30 font-bold text-lg">
              N
            </div>
            <div className="flex flex-col">
              <span className="font-['Inter'] font-bold text-base tracking-tight text-slate-900 flex items-center gap-1.5">
                NeuraHealth <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700">AI</span>
              </span>
              <span className="text-[10px] font-medium text-slate-400">NeuraGrid.ai Ecosystem</span>
            </div>
          </div>
        </div>

        {/* SOS Emergency Callout Button */}
        <div className="p-4">
          <button
            onClick={onOpenSOS}
            className="w-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold text-xs px-4 py-3 rounded-2xl flex items-center justify-between transition-all group shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
              <span>Emergency SOS</span>
            </div>
            <AlertTriangle className="w-4 h-4 text-rose-600 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Main Navigation Links */}
        <nav className="px-3 space-y-1 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : item.badge === 'AI' || item.badge === 'Pro'
                      ? 'bg-blue-50 text-blue-700 border border-blue-100'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Patient Profile Footer Card */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-700">
              JS
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Johnathan Smith</div>
              <div className="text-[10px] text-slate-500">ID: #NH-94820</div>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500" title="Connected" />
        </div>
      </div>
    </aside>
  );
}
