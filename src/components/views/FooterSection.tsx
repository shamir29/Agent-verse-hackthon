import React from 'react';
import { Cpu, Globe, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';

export const FooterSection: React.FC = () => {
  return (
    <footer className="w-full bg-white text-slate-900 pt-24 pb-12 px-6 md:px-12 border-t border-slate-100 select-none">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Massive Headline Typography */}
        <div className="pb-16 border-b border-slate-100 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <div className="linear-badge mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>NeuraGrid AI Kernel v4.0.8 Live</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-none">
              The AI Brain for <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                Tomorrow's Smart Cities
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/shamir29/Agent-verse-hackthon"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>View GitHub Repository</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Footer Links Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-b border-slate-100 text-xs">
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-slate-500 font-medium">
              <li><a href="#workforce" className="hover:text-blue-600 transition-colors">AI Workforce (9 Swarms)</a></li>
              <li><a href="#city-3d" className="hover:text-blue-600 transition-colors">3D Spatial Engine</a></li>
              <li><a href="#brain" className="hover:text-blue-600 transition-colors">Consensus Neural Core</a></li>
              <li><a href="#simulator" className="hover:text-blue-600 transition-colors">Crisis Scenario Simulator</a></li>
              <li><a href="#explorer" className="hover:text-blue-600 transition-colors">Sub-Meter Asset Explorer</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-4">Agents</h4>
            <ul className="space-y-2.5 text-slate-500 font-medium">
              <li><a href="#workforce" className="hover:text-blue-600 transition-colors">Smart Grid AI</a></li>
              <li><a href="#workforce" className="hover:text-blue-600 transition-colors">Solar Optimization AI</a></li>
              <li><a href="#workforce" className="hover:text-blue-600 transition-colors">Energy Monitoring AI</a></li>
              <li><a href="#workforce" className="hover:text-blue-600 transition-colors">Predictive Maintenance AI</a></li>
              <li><a href="#workforce" className="hover:text-blue-600 transition-colors">Digital Twin Core</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-4">Developers</h4>
            <ul className="space-y-2.5 text-slate-500 font-medium">
              <li><a href="#analytics" className="hover:text-blue-600 transition-colors">Storytelling Analytics</a></li>
              <li><a href="#playground" className="hover:text-blue-600 transition-colors">Drag & Drop Playground</a></li>
              <li><a href="https://github.com/shamir29/Agent-verse-hackthon" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">TypeScript & Python SDKs</a></li>
              <li><a href="#timeline" className="hover:text-blue-600 transition-colors">Consensus Log Stream</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-4">Compliance</h4>
            <ul className="space-y-2.5 text-slate-500 font-medium">
              <li><span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> SOC2 Type II Certified</span></li>
              <li><span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> ISO 27001 Verified</span></li>
              <li><span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> mTLS 1.3 Zero-Trust Mesh</span></li>
              <li><span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 99.999% High Availability</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-600" />
            <span>© 2026 NeuraGrid.ai Inc. All municipal rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security Statement</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
