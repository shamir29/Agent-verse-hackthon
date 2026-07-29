import React from 'react';
import { Zap, ShieldCheck, Activity } from 'lucide-react';

interface NavbarProps {
  onOpenNotifications: () => void;
  notificationCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenNotifications, notificationCount }) => {
  const [time, setTime] = React.useState<string>('');

  React.useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20 text-white font-bold text-lg">
            <Zap className="w-6 h-6 fill-current text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-xl tracking-tight text-slate-900">NeuraGrid</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-blue-50 text-blue-600 border border-blue-200">.ai</span>
            </div>
            <p className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase">Smart City Ecosystem</p>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-sm font-semibold text-slate-600">
          <button onClick={() => scrollToSection('city-map')} className="hover:text-blue-600 transition-colors">City Map</button>
          <button onClick={() => scrollToSection('smart-charging')} className="hover:text-blue-600 transition-colors">Smart Charge</button>
          <button onClick={() => scrollToSection('grid-load')} className="hover:text-blue-600 transition-colors">Grid AI</button>
          <button onClick={() => scrollToSection('renewables')} className="hover:text-blue-600 transition-colors">Renewables</button>
          <button onClick={() => scrollToSection('analytics')} className="hover:text-blue-600 transition-colors">Analytics</button>
          <button onClick={() => scrollToSection('maintenance')} className="hover:text-blue-600 transition-colors">Maintenance</button>
          <button onClick={() => scrollToSection('driver-journey')} className="hover:text-blue-600 transition-colors">Driver Journey</button>
        </nav>

        {/* Right Status Pill & Actions */}
        <div className="flex items-center space-x-4">
          
          {/* Live Telemetry Pill */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Grid: <strong className="text-slate-900">99.8%</strong></span>
            <span className="text-slate-300">|</span>
            <span className="text-emerald-600 font-bold">89.2% Green</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 font-mono">{time}</span>
          </div>

          {/* Notification Toast Trigger */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-all cursor-pointer"
            title="Live Notification Feed"
          >
            <Activity className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-white">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => scrollToSection('city-map')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center space-x-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Launch Agent</span>
          </button>
        </div>

      </div>
    </header>
  );
};
