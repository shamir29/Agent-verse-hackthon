import React from 'react';
import { LeakAlert, PipelineRoute } from '../../types/waterSystem';
import {
  AlertTriangle,
  Droplets,
  Zap,
  Wrench,
  Radio,
  CheckCircle2,
  Gauge,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';

interface LeakDetectionAIProps {
  leaks: LeakAlert[];
  pipelines: PipelineRoute[];
  onIsolatePipe: (pipeId: string) => void;
}

export const LeakDetectionAI: React.FC<LeakDetectionAIProps> = ({
  leaks,
  pipelines,
  onIsolatePipe,
}) => {
  const totalWaterLossLh = leaks.reduce((acc, curr) => acc + curr.estimatedLossLh, 0);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between glass-panel rounded-2xl p-5 border border-red-300/40 dark:border-red-500/30 bg-gradient-to-r from-white via-red-50/30 to-white dark:from-slate-900 dark:via-red-950/20 dark:to-slate-900">
        <div className="flex items-center gap-3.5">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-neon-red">
            <ShieldAlert className="w-7 h-7 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-orbitron font-extrabold bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 dark:from-red-400 dark:via-rose-400 dark:to-amber-400 bg-clip-text text-transparent tracking-wide">
              AI LEAK DETECTION & PIPE ANOMALY SENTINEL
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Continuous neural acoustic monitoring, pressure differential analysis & automated valve isolation
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="px-3.5 py-2 rounded-xl bg-red-100 dark:bg-red-950/80 border border-red-300 dark:border-red-500/50 text-red-900 dark:text-red-200 flex items-center gap-2 shadow-sm">
            <Droplets className="w-4 h-4 text-red-600 dark:text-red-400 animate-bounce" />
            <span>CUMULATIVE LOSS: <strong className="text-red-700 dark:text-red-400 font-extrabold text-sm">{totalWaterLossLh.toLocaleString()} L/hr</strong></span>
          </div>
        </div>
      </div>

      {/* Grid Layout: Active Leaks Cards + AI Anomaly Model Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Active Leak Cards Highlighted in Glowing Red & Vibrant Accent Colors */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-orbitron font-bold text-slate-800 dark:text-cyan-300 flex items-center gap-2">
              <Zap className="w-4.5 h-4.5 text-red-500" /> Active Pipe Anomalies & Pressure Drops ({leaks.length})
            </h3>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Real-time Acoustic Neural Mesh</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leaks.map((leak) => {
              const isHigh = leak.severity === 'High' || leak.severity === 'Critical';
              const isMedium = leak.severity === 'Medium';

              return (
                <div
                  key={leak.id}
                  className={`glass-panel rounded-2xl p-5 border relative overflow-hidden transition-all duration-300 hover:scale-[1.01] ${
                    isHigh
                      ? 'border-red-400 dark:border-red-500/60 bg-gradient-to-br from-white via-red-50/40 to-white dark:from-slate-900 dark:via-red-950/30 dark:to-slate-950 shadow-lg shadow-red-500/10'
                      : isMedium
                      ? 'border-amber-400 dark:border-amber-500/50 bg-gradient-to-br from-white via-amber-50/40 to-white dark:from-slate-900 dark:via-amber-950/20 dark:to-slate-950 shadow-md shadow-amber-500/10'
                      : 'border-sky-300 dark:border-sky-500/40 bg-gradient-to-br from-white via-sky-50/30 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 shadow-sm'
                  }`}
                >
                  {/* Glowing Top Accent Line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1.5 ${
                      isHigh
                        ? 'bg-gradient-to-r from-red-500 to-rose-600 shadow-neon-red'
                        : isMedium
                        ? 'bg-gradient-to-r from-amber-400 to-orange-500'
                        : 'bg-gradient-to-r from-sky-400 to-cyan-500'
                    }`}
                  />

                  {/* Header info */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          isHigh
                            ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400 border border-red-300 dark:border-red-500/40'
                            : isMedium
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40'
                            : 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border border-sky-300 dark:border-sky-500/40'
                        }`}>
                          {leak.id}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                          Sector: {leak.sector}
                        </span>
                      </div>
                      <h4 className="text-sm font-orbitron font-bold text-slate-900 dark:text-slate-100 mt-1.5">
                        {leak.pipeName}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">{leak.locationName}</p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-orbitron font-bold uppercase tracking-wider ${
                        isHigh
                          ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-neon-red animate-pulse'
                          : isMedium
                          ? 'bg-amber-500 text-slate-950 font-extrabold'
                          : 'bg-sky-500 text-white font-bold'
                      }`}
                    >
                      {leak.severity}
                    </span>
                  </div>

                  {/* 4 Metric Telemetry Breakdown */}
                  <div className="grid grid-cols-2 gap-2.5 my-3 p-3 rounded-xl bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-slate-800 text-xs font-mono">
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400 text-[10px] flex items-center gap-1">
                        <Gauge className="w-3 h-3 text-red-500" /> Pressure Drop:
                      </span>
                      <div className="text-red-600 dark:text-red-400 font-extrabold text-sm mt-0.5">
                        -{leak.pressureDropPsi} PSI
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400 text-[10px] flex items-center gap-1">
                        <Droplets className="w-3 h-3 text-red-500" /> Est. Loss:
                      </span>
                      <div className="text-red-600 dark:text-red-400 font-extrabold text-sm mt-0.5">
                        {leak.estimatedLossLh.toLocaleString()} L/h
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400 text-[10px] flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-cyan-500" /> AI Probability:
                      </span>
                      <div className="text-cyan-700 dark:text-cyan-300 font-extrabold text-sm mt-0.5">
                        {leak.leakProbabilityPct}%
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400 text-[10px] flex items-center gap-1">
                        <Wrench className="w-3 h-3 text-amber-500" /> Priority:
                      </span>
                      <div className="text-amber-700 dark:text-amber-300 font-extrabold text-sm mt-0.5">
                        {leak.repairPriority}
                      </div>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                      <Radio className="w-3 h-3 text-red-500 animate-ping" /> {leak.status}
                    </span>
                    {leak.status !== 'Isolated' ? (
                      <button
                        onClick={() => onIsolatePipe(leak.pipeId)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-orbitron text-xs font-bold shadow-neon-red hover:opacity-90 transition active:scale-95 flex items-center gap-1.5"
                      >
                        <Zap className="w-3.5 h-3.5 text-white" />
                        <span>ISOLATE PIPE VALVE</span>
                      </button>
                    ) : (
                      <span className="px-3.5 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center gap-1 border border-emerald-300 dark:border-emerald-500/40">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> ISOLATED
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: AI Model Explanation & Insights */}
        <div className="glass-panel rounded-2xl p-5 border border-cyan-500/20 space-y-4">
          <h3 className="text-sm font-orbitron font-bold text-cyan-700 dark:text-cyan-300 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> AI Anomaly Detection Logic
          </h3>

          <div className="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-500/30 text-xs space-y-2 text-cyan-900 dark:text-cyan-200">
            <div className="font-bold font-orbitron text-cyan-800 dark:text-cyan-400">Scikit-learn / TensorFlow Model</div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              The AI model continuously analyzes acoustic vibration frequency (20Hz - 2kHz), hydro-pressure gradients, and flow meter discrepancies across 500 IoT nodes.
            </p>
            <div className="pt-2 border-t border-cyan-200 dark:border-cyan-500/20 font-mono text-[10px] text-cyan-800 dark:text-cyan-400 space-y-1">
              <div>✓ Pressure Drop Delta &gt; 15 PSI Trigger</div>
              <div>✓ Flow Discrepancy &gt; 35 L/s Trigger</div>
              <div>✓ Automated Valve Isolation Protocol Active</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
            <div className="font-bold text-slate-800 dark:text-slate-200">Unauthorized Usage Monitoring</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Zero unauthorized bypass tapping detected in Sector 1 & Sector 2 over the past 24 hours.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
