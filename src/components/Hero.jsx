import React, { useEffect, useRef, useState } from 'react';
import { Heart, Activity, Thermometer, Droplets, Moon, Brain, ShieldAlert, Sparkles, ArrowRight, Play, CheckCircle2, Zap } from 'lucide-react';

export default function Hero() {
  const canvasRef = useRef(null);

  // Floating vitals state for dynamic pulse simulation
  const [heartRate, setHeartRate] = useState(72);
  const [hydration, setHydration] = useState(85);

  useEffect(() => {
    // Dynamic heartbeat fluctuation
    const interval = setInterval(() => {
      setHeartRate(prev => Math.floor(70 + Math.random() * 5));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Canvas animation for DNA, floating health particles & heartbeat waves
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Health Particles
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.4 ? '#0284C7' : Math.random() > 0.5 ? '#10B981' : '#38BDF8'
    }));

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // 1. Soft Breathing Gradient overlay
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2.2, 50,
        width / 2, height / 2.2, Math.max(width, height) * 0.7
      );
      gradient.addColorStop(0, 'rgba(224, 242, 254, 0.45)'); // sky 100 soft
      gradient.addColorStop(0.5, 'rgba(236, 253, 245, 0.3)'); // emerald soft
      gradient.addColorStop(1, 'rgba(250, 249, 246, 0.0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Heartbeat Wave lines across background
      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(2, 132, 199, 0.12)';
      for (let x = 0; x < width; x += 5) {
        // Pulse peak calculation
        const cycle = (x + time * 120) % 400;
        let yPulse = 0;
        if (cycle > 180 && cycle < 200) {
          yPulse = Math.sin((cycle - 180) / 20 * Math.PI) * -35;
        } else if (cycle >= 200 && cycle < 220) {
          yPulse = Math.sin((cycle - 200) / 20 * Math.PI) * 50;
        } else if (cycle >= 220 && cycle < 240) {
          yPulse = Math.sin((cycle - 220) / 20 * Math.PI) * -15;
        }
        const y = height * 0.45 + Math.sin(x * 0.005 + time) * 15 + yPulse;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 3. DNA Double Helix Canvas Animation
      const helixCenterX = width * 0.5;
      const helixCenterY = height * 0.48;
      const helixNodes = 28;
      const helixHeight = Math.min(height * 0.7, 500);

      for (let i = 0; i < helixNodes; i++) {
        const progress = i / helixNodes;
        const yNode = helixCenterY - helixHeight / 2 + progress * helixHeight;
        const angle = progress * Math.PI * 4 + time;

        const x1 = helixCenterX + Math.cos(angle) * 110;
        const x2 = helixCenterX - Math.cos(angle) * 110;

        const z1 = Math.sin(angle);
        const z2 = -Math.sin(angle);

        // Strand connector line
        ctx.beginPath();
        ctx.strokeStyle = `rgba(14, 165, 233, ${0.08 + (z1 + 1) * 0.08})`;
        ctx.lineWidth = 1.5;
        ctx.moveTo(x1, yNode);
        ctx.lineTo(x2, yNode);
        ctx.stroke();

        // Node 1 (Blue)
        ctx.beginPath();
        const r1 = 3.5 + (z1 + 1) * 1.5;
        ctx.arc(x1, yNode, Math.max(1, r1), 0, Math.PI * 2);
        ctx.fillStyle = z1 > 0 ? '#0284C7' : '#93C5FD';
        ctx.globalAlpha = 0.35 + (z1 + 1) * 0.25;
        ctx.fill();

        // Node 2 (Mint)
        ctx.beginPath();
        const r2 = 3.5 + (z2 + 1) * 1.5;
        ctx.arc(x2, yNode, Math.max(1, r2), 0, Math.PI * 2);
        ctx.fillStyle = z2 > 0 ? '#10B981' : '#6EE7B7';
        ctx.globalAlpha = 0.35 + (z2 + 1) * 0.25;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      // 4. Floating health particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      
      {/* Background Interactive Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Floating Curved Vitals Cards around the perimeter */}
      <div className="absolute inset-0 max-w-7xl mx-auto pointer-events-none z-10 hidden md:block">
        
        {/* Top Left: Heart Rate Card */}
        <div className="absolute top-32 left-8 animate-float pointer-events-auto bg-white/95 border border-sky-100 p-4 rounded-3xl shadow-organic hover:shadow-organic-hover flex items-center gap-4 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500">
            <Heart className="w-6 h-6 animate-heartbeat fill-rose-100" />
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Heart Rate</div>
            <div className="text-xl font-bold text-slate-900 flex items-baseline gap-1">
              <span>{heartRate}</span> <span className="text-xs font-normal text-slate-500">BPM</span>
            </div>
            <div className="text-[10px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3 h-3" /> Normal Sinus Rhythm
            </div>
          </div>
        </div>

        {/* Top Right: Blood Pressure Card */}
        <div className="absolute top-36 right-10 animate-float-delayed pointer-events-auto bg-white/95 border border-sky-100 p-4 rounded-3xl shadow-organic hover:shadow-organic-hover flex items-center gap-4 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Blood Pressure</div>
            <div className="text-xl font-bold text-slate-900 flex items-baseline gap-1">
              <span>118/78</span> <span className="text-xs font-normal text-slate-500">mmHg</span>
            </div>
            <div className="text-[10px] text-sky-600 font-medium flex items-center gap-1 mt-0.5">
              <Sparkles className="w-3 h-3" /> Optimal Hemodynamics
            </div>
          </div>
        </div>

        {/* Mid Left: Blood Oxygen Card */}
        <div className="absolute top-1/2 -translate-y-12 left-4 animate-float-delayed pointer-events-auto bg-white/95 border border-sky-100 p-4 rounded-3xl shadow-organic hover:shadow-organic-hover flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-400">Blood Oxygen (SpO2)</div>
            <div className="text-lg font-bold text-slate-900">99.2% <span className="text-xs font-medium text-emerald-600">Optimal</span></div>
          </div>
        </div>

        {/* Mid Right: Temperature Card */}
        <div className="absolute top-1/2 translate-y-6 right-6 animate-float pointer-events-auto bg-white/95 border border-sky-100 p-4 rounded-3xl shadow-organic hover:shadow-organic-hover flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Thermometer className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-400">Body Temperature</div>
            <div className="text-lg font-bold text-slate-900">98.6 °F <span className="text-xs font-medium text-slate-500">Normothermic</span></div>
          </div>
        </div>

        {/* Bottom Left: Sleep & Recovery */}
        <div className="absolute bottom-16 left-16 animate-float pointer-events-auto bg-white/95 border border-sky-100 p-4 rounded-3xl shadow-organic hover:shadow-organic-hover flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Moon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-400">Restorative Sleep</div>
            <div className="text-lg font-bold text-slate-900">92 / 100 <span className="text-xs font-medium text-indigo-600">Deep REM</span></div>
          </div>
        </div>

        {/* Bottom Right: Stress & Immunity */}
        <div className="absolute bottom-20 right-20 animate-float-delayed pointer-events-auto bg-white/95 border border-sky-100 p-4 rounded-3xl shadow-organic hover:shadow-organic-hover flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-400">Autonomic Stress</div>
            <div className="text-lg font-bold text-slate-900">14% <span className="text-xs font-medium text-emerald-600">Calm</span></div>
          </div>
        </div>

      </div>

      {/* Hero Center Text & Interactive Elements */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
        
        {/* Patient-First Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100/70 border border-sky-200/80 text-sky-800 text-xs font-semibold mb-8 animate-fade-in shadow-sm">
          <Sparkles className="w-4 h-4 text-sky-600 animate-spin-slow" />
          <span>Predictive • Autonomous • Patient-Centric</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
        </div>

        {/* Main Headline */}
        <h1 className="font-['Outfit'] font-bold text-4xl sm:text-6xl md:text-7xl leading-[1.08] tracking-tight text-slate-950 mb-8">
          Healthcare that <br />
          <span className="bg-gradient-to-r from-sky-600 via-teal-600 to-sky-700 bg-clip-text text-transparent">
            thinks before illness
          </span> begins.
        </h1>

        {/* Subtitle */}
        <p className="text-slate-600 text-lg sm:text-xl font-normal max-w-2xl mx-auto leading-relaxed mb-10">
          AI continuously predicts health risks, assists doctors, personalizes treatments, and improves patient outcomes across the entire healthcare ecosystem.
        </p>

        {/* Primary & Secondary Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#journey"
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-slate-900 hover:bg-sky-600 text-white font-semibold text-base shadow-xl shadow-slate-900/10 hover:shadow-sky-600/30 transition-all transform hover:-translate-y-0.5 group"
          >
            <span>Explore Patient Journey</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#assistant"
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-semibold text-base shadow-sm hover:shadow-md transition-all"
          >
            <div className="w-7 h-7 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
              <Play className="w-3.5 h-3.5 fill-sky-600 ml-0.5" />
            </div>
            <span>Meet the AI Doctors</span>
          </a>
        </div>

        {/* Live System Pulse Bar */}
        <div className="inline-flex flex-wrap items-center justify-center gap-6 px-6 py-3 rounded-2xl bg-white/70 border border-slate-200/60 shadow-sm backdrop-blur-sm text-xs font-medium text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AI Triage Active</span>
          </div>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-2">
            <span className="text-slate-700 font-semibold">14,200+</span>
            <span>Genomic Models</span>
          </div>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-2">
            <span className="text-slate-700 font-semibold">0.02s</span>
            <span>Predictive Latency</span>
          </div>
        </div>

      </div>

    </section>
  );
}
