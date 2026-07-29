import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { History, Calendar, Sun, Car, Activity, Zap, Play, Pause, FastForward } from 'lucide-react';
import { soundFX } from '../../utils/soundFX';

export const DigitalTwinTimeMachine: React.FC = () => {
  const [yearOffset, setYearOffset] = useState<number>(0); // -10 (Past 2016) to +30 (Future 2056)
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const currentYear = 2026 + yearOffset;

  // Calculate dynamic city evolution stats based on yearOffset slider
  const population = (1.4 + yearOffset * 0.025).toFixed(2);
  const solarGen = Math.max(10, Math.round(1420 + yearOffset * 65));
  const evPercentage = Math.min(100, Math.max(8, Math.round(48 + yearOffset * 1.8)));
  const gridBlackouts = yearOffset > 0 ? '0.00' : (0.12 - yearOffset * 0.01).toFixed(2);

  return (
    <section id="time-machine" className="w-full py-32 px-6 md:px-12 bg-[#FAFAFA] select-none border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="linear-badge mb-4">
            <History className="w-4 h-4 text-blue-600 animate-pulse" />
            <span>Temporal Scenario Predictor</span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.02] mb-6">
            Digital Twin Time Machine
          </h2>
          <p className="text-lg text-slate-600 font-normal leading-relaxed">
            Drag the time slider across past records and future climate scenarios to observe 50 years of urban growth, traffic density, grid stress, and AI mitigation forecasts.
          </p>
        </div>

        {/* Time Slider Card */}
        <div className="apple-card p-8 bg-white rounded-3xl border border-slate-200 shadow-xl mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  soundFX.playClick();
                  setIsPlaying(!isPlaying);
                }}
                className="p-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white shadow-md cursor-pointer transition-all"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <div>
                <div className="text-xs uppercase font-mono text-slate-400">Simulation Horizon</div>
                <div className="text-4xl font-extrabold font-mono text-slate-900">
                  Year {currentYear}
                  <span className="text-xs font-sans text-blue-600 ml-2 font-bold bg-blue-50 px-2.5 py-1 rounded-full">
                    {yearOffset < 0 ? 'Historical Record' : yearOffset === 0 ? 'Present State' : 'AI Predictive Forecast'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-slate-500 bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Horizon: 2016 ↔ 2056 (+50 Yrs)</span>
            </div>
          </div>

          {/* Interactive Range Slider */}
          <div className="space-y-4 px-2">
            <input
              type="range"
              min="-10"
              max="30"
              step="1"
              value={yearOffset}
              onChange={(e) => {
                soundFX.playClick();
                setYearOffset(parseInt(e.target.value));
              }}
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />

            <div className="flex justify-between text-xs font-mono text-slate-400 font-medium">
              <span>2016 (Legacy Grid)</span>
              <span>2026 (Present Day)</span>
              <span>2040 (Zero Carbon Goal)</span>
              <span>2056 (Full Autonomy)</span>
            </div>
          </div>
        </div>

        {/* Dynamic Future Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <motion.div
            key={`pop-${yearOffset}`}
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            className="apple-card p-6 bg-white border border-slate-100"
          >
            <div className="text-xs text-slate-500 font-medium mb-1">Urban Population</div>
            <div className="text-3xl font-extrabold font-mono text-slate-900">{population}M</div>
            <div className="text-[11px] text-blue-600 font-medium mt-1">Smart District Expansion</div>
          </motion.div>

          <motion.div
            key={`sol-${yearOffset}`}
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            className="apple-card p-6 bg-white border border-slate-100"
          >
            <div className="text-xs text-slate-500 font-medium mb-1">Solar & Clean Yield</div>
            <div className="text-3xl font-extrabold font-mono text-amber-600">{solarGen} MW</div>
            <div className="text-[11px] text-amber-700 font-medium mt-1">Dual-Axis Photovoltaic</div>
          </motion.div>

          <motion.div
            key={`ev-${yearOffset}`}
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            className="apple-card p-6 bg-white border border-slate-100"
          >
            <div className="text-xs text-slate-500 font-medium mb-1">EV V2G Grid Buffer</div>
            <div className="text-3xl font-extrabold font-mono text-purple-600">{evPercentage}%</div>
            <div className="text-[11px] text-purple-700 font-medium mt-1">Bidirectional Storage</div>
          </motion.div>

          <motion.div
            key={`blk-${yearOffset}`}
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            className="apple-card p-6 bg-white border border-slate-100"
          >
            <div className="text-xs text-slate-500 font-medium mb-1">Outage Rate</div>
            <div className="text-3xl font-extrabold font-mono text-emerald-600">{gridBlackouts}%</div>
            <div className="text-[11px] text-emerald-700 font-medium mt-1">Deterministic Zero-Outage</div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
