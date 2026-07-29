import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Activity, Compass } from 'lucide-react';

interface HeroSectionProps {
  onStartMonitoring: () => void;
  onExploreNetwork: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartMonitoring, onExploreNetwork }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animated KPI state numbers
  const [activeChargers, setActiveChargers] = useState(1400);
  const [availableStations, setAvailableStations] = useState(330);
  const [gridLoad, setGridLoad] = useState(60);
  const [renewablePct, setRenewablePct] = useState(85.0);
  const [evsCharging, setEvsCharging] = useState(1100);
  const [todayEnergy, setTodayEnergy] = useState(45.0);

  // Count up animation effect
  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

      setActiveChargers(Math.floor(1400 + easeProgress * (1482 - 1400)));
      setAvailableStations(Math.floor(330 + easeProgress * (346 - 330)));
      setGridLoad(Math.floor(60 + easeProgress * (64 - 60)));
      setRenewablePct(parseFloat((85.0 + easeProgress * (89.2 - 85.0)).toFixed(1)));
      setEvsCharging(Math.floor(1100 + easeProgress * (1136 - 1100)));
      setTodayEnergy(parseFloat((45.0 + easeProgress * (48.5 - 45.0)).toFixed(1)));

      if (step >= steps) clearInterval(timer);
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // HTML5 Canvas animation for background energy flow & moving vehicle nodes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1200);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Grid Nodes
    const nodes = Array.from({ length: 18 }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 4 + 3,
      isCharger: i % 3 === 0,
    }));

    // Animated particles flowing along lines
    const particles = Array.from({ length: 25 }, () => ({
      from: Math.floor(Math.random() * nodes.length),
      to: Math.floor(Math.random() * nodes.length),
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.004,
      color: Math.random() > 0.4 ? '#2563EB' : '#10B981', // Blue vs Emerald
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle grid map pattern background
      ctx.strokeStyle = '#F1F5F9';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update node positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 50 || node.x > width - 50) node.vx *= -1;
        if (node.y < 50 || node.y > height - 50) node.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        if (node.isCharger) {
          ctx.fillStyle = '#2563EB';
          ctx.fill();
          // Soft outer glow
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(37, 99, 235, 0.08)';
          ctx.fill();
        } else {
          ctx.fillStyle = '#94A3B8';
          ctx.fill();
        }
      });

      // Draw power line connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 220) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(226, 232, 240, ${1 - dist / 220})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      }

      // Draw animated energy flow particles
      particles.forEach((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          p.from = Math.floor(Math.random() * nodes.length);
          p.to = (p.from + 1 + Math.floor(Math.random() * (nodes.length - 1))) % nodes.length;
        }

        const start = nodes[p.from];
        const end = nodes[p.to];
        const px = start.x + (end.x - start.x) * p.progress;
        const py = start.y + (end.y - start.y) * p.progress;

        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative w-full pt-12 pb-20 overflow-hidden bg-white border-b border-slate-200">
      
      {/* Background Interactive Canvas */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Top Badge */}
        <div className="flex justify-center sm:justify-start">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wide uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span>NeuraGrid.ai • Autonomous Smart City Layer</span>
          </div>
        </div>

        {/* Hero Headline & Subtitle */}
        <div className="mt-8 max-w-4xl text-center sm:text-left">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
            Autonomous EV <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600">
              Charging Intelligence
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-2.5xl">
            Optimize charging, reduce grid stress, minimize waiting time, and maximize renewable energy usage using AI.
          </p>
        </div>

        {/* Primary & Secondary CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4">
          <button
            onClick={onStartMonitoring}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full text-base shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3 cursor-pointer"
          >
            <Activity className="w-5 h-5" />
            <span>Start Monitoring</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onExploreNetwork}
            className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-8 py-4 rounded-full text-base border border-slate-200 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Compass className="w-5 h-5 text-slate-600" />
            <span>Explore Network</span>
          </button>

          {/* Quick AI Agent Status Indicator */}
          <div className="hidden xl:flex items-center space-x-2 pl-4 border-l border-slate-200 text-xs font-semibold text-slate-500">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>AI Orchestrator: <strong className="text-slate-900 font-mono">ACTIVE (v4.8)</strong></span>
          </div>
        </div>

        {/* Live KPI Strip (6 Apple-style cards with 20px rounded corners) */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          
          <div className="card-20 p-5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Chargers</p>
            <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
              {activeChargers.toLocaleString()}
            </p>
            <span className="mt-1 inline-flex items-center text-[11px] font-semibold text-emerald-600">
              ↑ +12.4% vs last week
            </span>
          </div>

          <div className="card-20 p-5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Available Stations</p>
            <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
              {availableStations}
            </p>
            <span className="mt-1 inline-flex items-center text-[11px] font-semibold text-blue-600">
              ● 23.4% capacity free
            </span>
          </div>

          <div className="card-20 p-5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Current Grid Load</p>
            <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
              {gridLoad}%
            </p>
            <span className="mt-1 inline-flex items-center text-[11px] font-semibold text-emerald-600">
              Optimal AI balance
            </span>
          </div>

          <div className="card-20 p-5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Renewable Energy</p>
            <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-emerald-600 tracking-tight font-mono">
              {renewablePct}%
            </p>
            <span className="mt-1 inline-flex items-center text-[11px] font-semibold text-emerald-600">
              ☀️ Solar & Wind Peak
            </span>
          </div>

          <div className="card-20 p-5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">EVs Charging</p>
            <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
              {evsCharging.toLocaleString()}
            </p>
            <span className="mt-1 inline-flex items-center text-[11px] font-semibold text-slate-600">
              Avg speed: 280 kW
            </span>
          </div>

          <div className="card-20 p-5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Today's Energy</p>
            <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight font-mono">
              {todayEnergy} <span className="text-sm font-bold text-slate-600">MWh</span>
            </p>
            <span className="mt-1 inline-flex items-center text-[11px] font-semibold text-blue-600">
              🌱 -38.2 tons CO₂
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
