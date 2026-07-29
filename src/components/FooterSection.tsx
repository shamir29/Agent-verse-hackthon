import React from 'react';
import { Zap, ArrowUpRight } from 'lucide-react';

export const FooterSection: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-slate-200 pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-slate-200">
          
          {/* Brand Info Column */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20 text-white font-bold text-base">
                <Zap className="w-5 h-5 fill-current text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">NeuraGrid<span className="text-blue-600">.ai</span></span>
            </div>
            <p className="text-xs text-slate-500 font-medium max-w-sm leading-relaxed">
              Autonomous EV Charging Intelligence for smart city infrastructure. Optimizing grid stress, charging queues, and zero-carbon microgrids.
            </p>

            <div className="pt-2 flex items-center space-x-2 text-xs font-semibold text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>All Systems Operational • 99.98% Uptime</span>
            </div>
          </div>

          {/* Column 1: Platform */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Platform</h4>
            <ul className="mt-4 space-y-2.5 text-xs text-slate-600 font-semibold">
              <li><a href="#city-map" className="hover:text-blue-600 transition-colors">Smart City Map</a></li>
              <li><a href="#smart-charging" className="hover:text-blue-600 transition-colors">Smart Charging</a></li>
              <li><a href="#grid-load" className="hover:text-blue-600 transition-colors">Grid AI Balancer</a></li>
              <li><a href="#renewables" className="hover:text-blue-600 transition-colors">Renewables Engine</a></li>
            </ul>
          </div>

          {/* Column 2: Developers */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Developers</h4>
            <ul className="mt-4 space-y-2.5 text-xs text-slate-600 font-semibold">
              <li><a href="#" className="hover:text-blue-600 transition-colors flex items-center space-x-1"><span>Documentation</span><ArrowUpRight className="w-3 h-3 text-slate-400" /></a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors flex items-center space-x-1"><span>REST API Reference</span><ArrowUpRight className="w-3 h-3 text-slate-400" /></a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Smart Contract SDK</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">ISO 15118 Standard</a></li>
            </ul>
          </div>

          {/* Column 3: Enterprise */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Support & Legal</h4>
            <ul className="mt-4 space-y-2.5 text-xs text-slate-600 font-semibold">
              <li><a href="#" className="hover:text-blue-600 transition-colors">24/7 Ops Desk</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Security Audit</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors flex items-center space-x-1"><svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg><span>GitHub Repository</span></a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} NeuraGrid.ai Ecosystem Inc. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 font-mono">Designed with Apple + Rivian + Tesla Aesthetic</p>
        </div>

      </div>
    </footer>
  );
};
