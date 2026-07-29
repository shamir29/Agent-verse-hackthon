import React, { useState } from 'react';
import { Zap, Bell, Sliders, Menu, X } from 'lucide-react';
import { useGrid } from '../../context/GridContext';

interface NavbarProps {
  onOpenAlerts: () => void;
  onOpenControlCenter: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAlerts, onOpenControlCenter }) => {
  const { telemetry, faults, controlState } = useGrid();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeAlertCount = faults.filter(f => f.status !== 'resolved').length;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 ring-4 ring-blue-50">
              <Zap className="w-6 h-6 fill-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
                  NeuraGrid<span className="text-blue-600">.ai</span>
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  Smart Grid Agent
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                NeuraGrid Smart City Autonomous Infrastructure
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <a href="#hero" className="hover:text-blue-600 transition-colors">Overview</a>
            <a href="#grid-map" className="hover:text-blue-600 transition-colors">Digital Grid Map</a>
            <a href="#power-flow" className="hover:text-blue-600 transition-colors">Power Flow</a>
            <a href="#load-balancing" className="hover:text-blue-600 transition-colors font-semibold text-blue-600">Load Balancing</a>
            <a href="#renewables" className="hover:text-blue-600 transition-colors">Renewables</a>
            <a href="#fault-healing" className="hover:text-blue-600 transition-colors">Self-Healing</a>
            <a href="#analytics" className="hover:text-blue-600 transition-colors">Analytics</a>
          </nav>

          {/* Right Status Badges & Controls */}
          <div className="flex items-center space-x-3">
            
            {/* Live AI Status Badge */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium">AI Autopilot:</span>
              <span className="font-semibold text-emerald-600">{controlState.aiAutopilot ? 'Active' : 'Manual'}</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500">{telemetry.frequencyHz} Hz</span>
            </div>

            {/* Live Alert Trigger */}
            <button
              onClick={onOpenAlerts}
              className="relative p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition-all hover:scale-105"
              title="Live Alerts Center"
            >
              <Bell className="w-5 h-5" />
              {activeAlertCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white shadow-sm animate-pulse">
                  {activeAlertCount}
                </span>
              )}
            </button>

            {/* Floating Control Center Dock Button */}
            <button
              onClick={onOpenControlCenter}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm shadow-md shadow-blue-500/20 transition-all transform hover:scale-[1.02]"
            >
              <Sliders className="w-4 h-4" />
              <span className="hidden sm:inline">Grid Control Dock</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 font-medium">Overview</a>
          <a href="#grid-map" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 font-medium">Digital Grid Map</a>
          <a href="#power-flow" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 font-medium">Power Flow</a>
          <a href="#load-balancing" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-blue-600 font-semibold">Load Balancing</a>
          <a href="#renewables" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 font-medium">Renewables</a>
          <a href="#fault-healing" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 font-medium">Self-Healing Grid</a>
          <a href="#analytics" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 font-medium">Analytics</a>
        </div>
      )}
    </header>
  );
};
