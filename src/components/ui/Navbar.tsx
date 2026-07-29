import React, { useState, useEffect } from 'react';
import { Cpu, Sun, Moon, Volume2, VolumeX, Terminal } from 'lucide-react';
import { soundFX } from '../../utils/soundFX';
import { MagneticButton } from './MagneticButton';

interface NavbarProps {
  isNight: boolean;
  onToggleNight: () => void;
  onOpenCommandCenter: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isNight,
  onToggleNight,
  onOpenCommandCenter
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(soundFX.getMuted());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleMute = () => {
    const muted = soundFX.toggleMute();
    setIsMuted(muted);
    soundFX.playClick();
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-3.5 px-6 md:px-12 flex items-center justify-between ${
      isScrolled ? 'bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm' : 'bg-transparent'
    }`}>
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
          <Cpu className="w-4 h-4 animate-pulse" />
        </div>
        <div className="flex flex-col">
          <span className="text-base font-bold tracking-tight text-slate-900 leading-none">
            NeuraGrid<span className="text-blue-600 font-extrabold">.ai</span>
          </span>
          <span className="text-[9px] font-semibold tracking-widest uppercase text-slate-400 mt-0.5">
            Autonomous City OS
          </span>
        </div>
      </div>

      <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600">
        <a href="#workforce" className="hover:text-blue-600 transition-colors">Workforce</a>
        <a href="#city-3d" className="hover:text-blue-600 transition-colors">3D Spatial</a>
        <a href="#brain" className="hover:text-blue-600 transition-colors">Consensus Brain</a>
        <a href="#simulator" className="hover:text-blue-600 transition-colors">Simulator</a>
        <a href="#timeline" className="hover:text-blue-600 transition-colors">Timeline</a>
        <a href="#explorer" className="hover:text-blue-600 transition-colors">Explorer</a>
        <a href="#time-machine" className="hover:text-blue-600 transition-colors">Time Machine</a>
        <a href="#analytics" className="hover:text-blue-600 transition-colors">Analytics</a>
        <a href="#playground" className="hover:text-blue-600 transition-colors">Playground</a>
      </nav>

      <div className="flex items-center gap-3">
        <button
          onClick={handleToggleMute}
          title="Toggle Sound Effects"
          className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-blue-600" />}
        </button>

        <button
          onClick={onToggleNight}
          title="Toggle Day/Night Environment"
          className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
        >
          {isNight ? <Moon className="w-4 h-4 text-indigo-600" /> : <Sun className="w-4 h-4 text-amber-500" />}
        </button>

        <MagneticButton size="sm" onClick={onOpenCommandCenter}>
          <Terminal className="w-3.5 h-3.5 mr-1.5" />
          <span>Command Center</span>
        </MagneticButton>
      </div>
    </header>
  );
};
