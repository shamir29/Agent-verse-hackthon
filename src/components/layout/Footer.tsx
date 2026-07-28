import React from 'react';
import { Zap, ShieldCheck, Cpu, Globe, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-cyan-50 text-cyan-600 rounded-lg border border-cyan-200">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-800">Power Grid AI</span> — Autonomous Electricity Distribution Management
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-1 text-emerald-600 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>NERC-CIP & IEEE 1547 Grid Compliant</span>
          </div>
          <span>•</span>
          <div>v2.4 AI Engine</div>
        </div>

      </div>
    </footer>
  );
};
