import React from 'react';
import { MagneticButton } from '../ui/MagneticButton';
import { Terminal, Sparkles, ArrowRight } from 'lucide-react';

interface FinalCTAProps {
  onOpenCommandCenter: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenCommandCenter }) => {
  return (
    <section className="w-full min-h-screen py-32 px-6 md:px-12 bg-[#FAFAFA] flex flex-col justify-center items-center text-center select-none relative overflow-hidden">
      
      {/* Radial Background Accent */}
      <div className="absolute w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-0" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Floating Badge */}
        <div className="linear-badge mb-8 shadow-sm">
          <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
          <span>The Next Era of Municipal Tech</span>
        </div>

        {/* Massive Headline */}
        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-slate-900 leading-[0.92] mb-10">
          The Future Doesn't Need More Dashboards.<br />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
            It Needs Intelligent Cities.
          </span>
        </h2>

        <p className="text-xl sm:text-2xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed mb-12">
          Experience the autonomous AI operating system powering tomorrow's sustainable infrastructure.
        </p>

        {/* Massive Expanding Command Center Button */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
          <MagneticButton size="xl" onClick={onOpenCommandCenter} className="relative shadow-2xl">
            <Terminal className="w-6 h-6 mr-3 text-blue-300" />
            <span className="text-xl font-bold">Launch AI Command Center</span>
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
          </MagneticButton>
        </div>

      </div>

      {/* Footer Info */}
      <footer className="absolute bottom-8 left-0 right-0 text-center text-xs text-slate-400 font-medium">
        NeuraGrid AI Platform © 2026. Built with Three.js & Autonomous Agent Consensus.
      </footer>
    </section>
  );
};
