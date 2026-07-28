import React, { useEffect, useRef } from 'react';
import { Activity, ShieldCheck, AlertTriangle } from 'lucide-react';

interface FrequencyOscilloscopeProps {
  frequencyHz: number;
  stabilityScore: number;
}

export const FrequencyOscilloscope: React.FC<FrequencyOscilloscopeProps> = ({
  frequencyHz,
  stabilityScore
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const render = () => {
      const width = canvas.width = canvas.parentElement?.clientWidth || 240;
      const height = canvas.height = canvas.parentElement?.clientHeight || 70;

      ctx.clearRect(0, 0, width, height);

      // Subtle Background Grid Lines
      ctx.strokeStyle = 'rgba(203, 213, 225, 0.4)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Calculate Waveform Sine Parameters
      const delta = frequencyHz - 60.0;
      const amplitude = Math.min(height / 2.5, 18 + Math.abs(delta) * 40);
      const frequencyScale = 0.05 + (delta * 0.02);

      phase += 0.1;

      // Draw Glowing Oscilloscope Sine Wave
      ctx.beginPath();
      ctx.moveTo(0, height / 2);

      for (let x = 0; x < width; x++) {
        const y = height / 2 + Math.sin(x * frequencyScale + phase) * amplitude;
        ctx.lineTo(x, y);
      }

      const waveColor = Math.abs(delta) > 0.35 ? '#ef4444' : (Math.abs(delta) > 0.1 ? '#f59e0b' : '#00d2ff');
      ctx.strokeStyle = waveColor;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = waveColor;
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [frequencyHz, stabilityScore]);

  const delta = (frequencyHz - 60.0).toFixed(2);

  return (
    <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-2">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-1.5 font-bold text-slate-800">
          <Activity className="w-4 h-4 text-cyan-600 animate-pulse" />
          <span>Grid Frequency Waveform</span>
        </div>
        <span className={`px-2 py-0.5 rounded-full font-extrabold text-[10px] ${
          Math.abs(frequencyHz - 60.0) < 0.15 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
        }`}>
          {frequencyHz} Hz ({delta.startsWith('-') ? delta : `+${delta}`})
        </span>
      </div>

      {/* Canvas Oscilloscope Waveform */}
      <div className="h-16 w-full relative bg-slate-50/80 rounded-xl overflow-hidden border border-slate-200/80">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
        <span>Target: 60.00 Hz</span>
        <span>Stability: {stabilityScore}/100</span>
      </div>
    </div>
  );
};
