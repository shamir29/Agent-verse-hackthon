import React, { useState } from 'react';
import { Search, Stethoscope, FileText, Calendar, Activity, Pill, MapPin, Bot, X, ChevronRight } from 'lucide-react';

export default function CommandSearchModal({ isOpen, onClose, setActiveView }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const quickLinks = [
    { label: 'AI Symptom Checker', view: 'symptom-checker', icon: Stethoscope },
    { label: 'Medical Report Analyzer', view: 'report-analyzer', icon: FileText },
    { label: 'Book Appointment with Cardiologist', view: 'appointments', icon: Calendar },
    { label: 'View Health Dashboard & Vitals', view: 'dashboard', icon: Activity },
    { label: 'Check Medication Reminders & Refills', view: 'medications', icon: Pill },
    { label: 'Find Nearby Hospitals & Emergency SOS', view: 'hospitals', icon: MapPin },
    { label: 'Consult Dr. AURA AI Assistant', view: 'ai-assistant', icon: Bot },
  ];

  const filteredLinks = quickLinks.filter(l => l.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs flex items-start justify-center pt-24 z-50 p-4">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-xl w-full shadow-2xl space-y-4 animate-in zoom-in-95">
        
        {/* Search Bar Input */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command, search doctor, report, or symptom..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-xs font-medium text-slate-900 bg-transparent outline-none"
          />
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="space-y-1 max-h-80 overflow-y-auto">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
            Quick Navigation & Commands
          </div>

          {filteredLinks.map((link, idx) => {
            const Icon = link.icon;
            return (
              <button
                key={idx}
                onClick={() => {
                  setActiveView(link.view);
                  onClose();
                }}
                className="w-full text-left flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-slate-50 text-xs font-semibold text-slate-800 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{link.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>
            );
          })}
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Press ESC to exit</span>
          <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-[10px]">Cmd + K</span>
        </div>

      </div>
    </div>
  );
}
