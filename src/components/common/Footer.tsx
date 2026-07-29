import React from 'react';
import { Zap, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
                <Zap className="w-5 h-5 fill-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                NeuraGrid<span className="text-blue-600">.ai</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              Autonomous grid intelligence powering resilient, zero-carbon smart cities. Real-time predictive power balancing, fault isolation, and renewable dispatch.
            </p>

            {/* Live Uptime Strip */}
            <div className="pt-2 flex items-center space-x-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-700 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-semibold text-slate-900">System Status:</span>
                <span className="text-emerald-600 font-medium">100% Operational</span>
              </div>
              <span className="text-xs text-slate-400">v4.8.2 Enterprise</span>
            </div>
          </div>

          {/* Platform Navigation */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 tracking-wider uppercase mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#hero" className="hover:text-blue-600 transition-colors">Grid Agent Overview</a></li>
              <li><a href="#grid-map" className="hover:text-blue-600 transition-colors">Digital Twin Grid Map</a></li>
              <li><a href="#power-flow" className="hover:text-blue-600 transition-colors">Power Flow Engine</a></li>
              <li><a href="#fault-healing" className="hover:text-blue-600 transition-colors">Self-Healing Grid</a></li>
              <li><a href="#maintenance" className="hover:text-blue-600 transition-colors">Predictive RUL</a></li>
            </ul>
          </div>

          {/* Developers & API */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 tracking-wider uppercase mb-4">Developers & API</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-blue-600 transition-colors flex items-center space-x-1"><span>Documentation</span> <ArrowUpRight className="w-3 h-3 text-slate-400" /></a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors flex items-center space-x-1"><span>GraphQL / REST API</span> <ArrowUpRight className="w-3 h-3 text-slate-400" /></a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors flex items-center space-x-1"><span>SCADA / IEC 61850 Sync</span> <ArrowUpRight className="w-3 h-3 text-slate-400" /></a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors flex items-center space-x-1"><span>GitHub Repository</span> <ArrowUpRight className="w-3 h-3 text-slate-400" /></a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Security Architecture</a></li>
            </ul>
          </div>

          {/* NeuraGrid Ecosystem */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 tracking-wider uppercase mb-4">Ecosystem</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-blue-600 transition-colors">EV Charging Agent</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Smart Traffic AI</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Building Automation</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Water & Resource Agent</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">NeuraGrid Cloud</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} NeuraGrid.ai Inc. All rights reserved. Designed for NeuraGrid Smart City Infrastructure.</p>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Grid Compliance</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Contact Engineering</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
