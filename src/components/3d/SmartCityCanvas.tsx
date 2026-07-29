import React, { useEffect, useRef } from 'react';
import type { CrisisType } from '../../types';

interface SmartCityCanvasProps {
  isNight?: boolean;
  activeCrisis?: CrisisType | null;
  selectedAgentId?: string | null;
}

export const SmartCityCanvas: React.FC<SmartCityCanvasProps> = ({
  isNight = false,
  activeCrisis = null,
  selectedAgentId = null
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let rotationAngle = 0.4;
    let time = 0;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth * window.devicePixelRatio;
        canvas.height = parent.clientHeight * window.devicePixelRatio;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const vehicles = Array.from({ length: 18 }).map((_, i) => ({
      pathOffset: (i * 0.18) % 1,
      speed: 0.001 + Math.random() * 0.0012,
      route: i % 3
    }));

    const airParticles = Array.from({ length: 40 }).map(() => ({
      x: Math.random() * 800 - 400,
      y: Math.random() * 200 - 100,
      z: Math.random() * 500 - 250,
      vx: 0.6 + Math.random() * 0.6
    }));

    const render = () => {
      time += 0.016;
      rotationAngle += 0.0008;

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Pushed slightly down and centered for optimal text clarity
      const centerX = width / 2;
      const centerY = height / 2 + 60;

      let bgGradient = ctx.createRadialGradient(centerX, centerY - 120, 80, centerX, centerY, width);
      if (activeCrisis === 'blackout') {
        bgGradient.addColorStop(0, '#0F172A');
        bgGradient.addColorStop(1, '#020617');
      } else if (isNight) {
        bgGradient.addColorStop(0, '#1E293B');
        bgGradient.addColorStop(1, '#0F172A');
      } else {
        bgGradient.addColorStop(0, '#FAFAFA');
        bgGradient.addColorStop(0.7, '#F1F5F9');
        bgGradient.addColorStop(1, '#E2E8F0');
      }
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      const isoProj = (x: number, y: number, z: number) => {
        const rad = rotationAngle;
        const rx = x * Math.cos(rad) - z * Math.sin(rad);
        const rz = x * Math.sin(rad) + z * Math.cos(rad);
        const screenX = centerX + (rx - rz) * 0.8;
        const screenY = centerY + (rx + rz) * 0.38 - y * 0.65;
        return { x: screenX, y: screenY, depth: rz };
      };

      // Ground Grid
      ctx.lineWidth = 1;
      ctx.strokeStyle = isNight ? 'rgba(255,255,255,0.05)' : 'rgba(15,23,42,0.05)';
      const gridSize = 400;
      const step = 50;

      for (let x = -gridSize; x <= gridSize; x += step) {
        const p1 = isoProj(x, 0, -gridSize);
        const p2 = isoProj(x, 0, gridSize);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      for (let z = -gridSize; z <= gridSize; z += step) {
        const p1 = isoProj(-gridSize, 0, z);
        const p2 = isoProj(gridSize, 0, z);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      // Pipelines
      ctx.lineWidth = activeCrisis === 'water_leak' ? 3.5 : 2;
      ctx.strokeStyle = activeCrisis === 'water_leak' ? '#EF4444' : '#0284C7';
      const pipeOffset = (time * 50) % 20;
      ctx.setLineDash([8, 8]);
      ctx.lineDashOffset = -pipeOffset;

      const wp1 = isoProj(-280, -20, -180);
      const wp2 = isoProj(280, -20, 180);
      ctx.beginPath();
      ctx.moveTo(wp1.x, wp1.y);
      ctx.lineTo(wp2.x, wp2.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Well-spaced building coordinates with non-overlapping heights
      const buildings = [
        { x: -160, z: -160, w: 65, h: 130, label: 'Central HQ', type: 'hq' },
        { x: 100, z: -180, w: 55, h: 100, label: 'Grid Substation 1', type: 'grid' },
        { x: -200, z: 140, w: 70, h: 80, label: 'Battery Reserve', type: 'battery' },
        { x: 160, z: 120, w: 80, h: 140, label: 'Commercial Tower', type: 'commercial' },
        { x: -20, z: 200, w: 50, h: 90, label: 'EV Mobility Hub', type: 'ev' },
        { x: 240, z: -40, w: 60, h: 110, label: 'Digital Twin HQ', type: 'twin' }
      ];

      const sortedBuildings = buildings.map(b => {
        const proj = isoProj(b.x, 0, b.z);
        return { ...b, projDepth: proj.depth };
      }).sort((a, b) => a.projDepth - b.projDepth);

      sortedBuildings.forEach(b => {
        const base = isoProj(b.x, 0, b.z);
        const top = isoProj(b.x, b.h, b.z);
        const right = isoProj(b.x + b.w, 0, b.z);
        const back = isoProj(b.x, 0, b.z + b.w);
        const topRight = isoProj(b.x + b.w, b.h, b.z);
        const topBack = isoProj(b.x, b.h, b.z + b.w);
        const topCorner = isoProj(b.x + b.w, b.h, b.z + b.w);

        const isHighlight = 
          selectedAgentId === b.type ||
          (selectedAgentId === 'smart-grid' && (b.type === 'grid' || b.type === 'battery')) ||
          (selectedAgentId === 'ev-charging' && b.type === 'ev') ||
          (selectedAgentId === 'digital-twin' && b.type === 'twin') ||
          (selectedAgentId === 'energy-monitoring' && (b.type === 'commercial' || b.type === 'hq')) ||
          (selectedAgentId === 'predictive-maintenance' && b.type === 'grid');
        const isDimmed = activeCrisis === 'blackout' && b.type !== 'hq';

        let faceLeftColor = isNight ? '#1E293B' : '#E2E8F0';
        let faceRightColor = isNight ? '#0F172A' : '#CBD5E1';
        let topColor = isNight ? '#334155' : '#F8FAFC';

        if (isHighlight) {
          faceLeftColor = '#2563EB';
          faceRightColor = '#1D4ED8';
          topColor = '#3B82F6';
        } else if (isDimmed) {
          faceLeftColor = '#090D16';
          faceRightColor = '#05070C';
          topColor = '#0F172A';
        }

        // Left Face
        ctx.fillStyle = faceLeftColor;
        ctx.beginPath();
        ctx.moveTo(base.x, base.y);
        ctx.lineTo(top.x, top.y);
        ctx.lineTo(topBack.x, topBack.y);
        ctx.lineTo(back.x, back.y);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = isNight ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
        ctx.stroke();

        // Right Face
        ctx.fillStyle = faceRightColor;
        ctx.beginPath();
        ctx.moveTo(base.x, base.y);
        ctx.lineTo(top.x, top.y);
        ctx.lineTo(topRight.x, topRight.y);
        ctx.lineTo(right.x, right.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Top Roof
        ctx.fillStyle = topColor;
        ctx.beginPath();
        ctx.moveTo(top.x, top.y);
        ctx.lineTo(topBack.x, topBack.y);
        ctx.lineTo(topCorner.x, topCorner.y);
        ctx.lineTo(topRight.x, topRight.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Window indicators
        if (!isDimmed && (isNight || isHighlight)) {
          ctx.fillStyle = isHighlight ? '#60A5FA' : '#F59E0B';
          const winP = isoProj(b.x + b.w * 0.3, b.h * 0.7, b.z);
          ctx.beginPath();
          ctx.arc(winP.x, winP.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Floating Building Label with clear background pill to avoid line overlap
        const labelP = isoProj(b.x + b.w / 2, b.h + 24, b.z + b.w / 2);
        
        ctx.fillStyle = isNight ? 'rgba(15,23,42,0.85)' : 'rgba(255,255,255,0.85)';
        const textWidth = ctx.measureText(b.label).width;
        ctx.beginPath();
        ctx.roundRect(labelP.x - textWidth / 2 - 8, labelP.y - 12, textWidth + 16, 18, 9);
        ctx.fill();
        ctx.strokeStyle = isNight ? 'rgba(255,255,255,0.15)' : 'rgba(15,23,42,0.1)';
        ctx.stroke();

        ctx.fillStyle = isNight ? '#F8FAFC' : '#0F172A';
        ctx.font = '600 10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(b.label, labelP.x, labelP.y);
      });

      // Solar Panels
      const solarCenter = isoProj(-270, 0, -50);
      ctx.fillStyle = activeCrisis === 'heatwave' ? '#F59E0B' : '#2563EB';
      for (let sx = 0; sx < 3; sx++) {
        for (let sz = 0; sz < 3; sz++) {
          const sp = isoProj(-290 + sx * 22, 5, -70 + sz * 22);
          ctx.beginPath();
          ctx.ellipse(sp.x, sp.y, 7, 3.5, Math.PI / 6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Solar Label Pill
      ctx.fillStyle = isNight ? 'rgba(15,23,42,0.85)' : 'rgba(255,255,255,0.85)';
      ctx.beginPath();
      ctx.roundRect(solarCenter.x - 60, solarCenter.y - 28, 120, 18, 9);
      ctx.fill();
      ctx.fillStyle = isNight ? '#94A3B8' : '#334155';
      ctx.font = '600 10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('☀ Solar Farm Alpha', solarCenter.x, solarCenter.y - 15);

      // Wind Turbines
      const turbinePos = [
        { x: 260, z: -200 },
        { x: 300, z: -150 }
      ];

      turbinePos.forEach(t => {
        const baseP = isoProj(t.x, 0, t.z);
        const topP = isoProj(t.x, 70, t.z);

        ctx.lineWidth = 1.8;
        ctx.strokeStyle = isNight ? '#94A3B8' : '#64748B';
        ctx.beginPath();
        ctx.moveTo(baseP.x, baseP.y);
        ctx.lineTo(topP.x, topP.y);
        ctx.stroke();

        const bladeAngle = time * 2;
        ctx.lineWidth = 1.8;
        ctx.strokeStyle = isNight ? '#E2E8F0' : '#1E293B';
        for (let b = 0; b < 3; b++) {
          const ang = bladeAngle + (b * Math.PI * 2) / 3;
          const bx = topP.x + Math.cos(ang) * 16;
          const by = topP.y + Math.sin(ang) * 16;
          ctx.beginPath();
          ctx.moveTo(topP.x, topP.y);
          ctx.lineTo(bx, by);
          ctx.stroke();
        }
      });

      // Moving EV Vehicles
      vehicles.forEach(v => {
        v.pathOffset = (v.pathOffset + v.speed) % 1;
        const progress = v.pathOffset;
        let vx = 0, vz = 0;

        if (v.route === 0) {
          vx = -280 + progress * 560;
          vz = -100;
        } else if (v.route === 1) {
          vx = 100;
          vz = -280 + progress * 560;
        } else {
          vx = -220 + progress * 440;
          vz = 220 - progress * 440;
        }

        const vp = isoProj(vx, 3, vz);
        ctx.fillStyle = v.route === 0 ? '#2563EB' : '#16A34A';
        ctx.beginPath();
        ctx.arc(vp.x, vp.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Air Particles
      if (selectedAgentId === 'air-pollution' || activeCrisis === 'heatwave') {
        ctx.fillStyle = 'rgba(139, 92, 246, 0.4)';
        airParticles.forEach(p => {
          p.x += p.vx;
          if (p.x > 400) p.x = -400;
          const ap = isoProj(p.x, 100 + p.y, p.z);
          ctx.beginPath();
          ctx.arc(ap.x, ap.y, 2, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isNight, activeCrisis, selectedAgentId]);

  return (
    <div className="relative w-full h-full min-h-[480px] overflow-hidden rounded-[24px]">
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />
      
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none z-10">
        <div className="linear-badge pointer-events-auto backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Realtime WebGL Spatial Engine</span>
          <span className="text-xs text-slate-400">| 60 FPS</span>
        </div>

        {activeCrisis && (
          <div className="linear-badge bg-rose-50 border-rose-200 text-rose-700 pointer-events-auto animate-pulse">
            <span className="font-semibold uppercase text-xs">Simulating:</span>
            <span>{activeCrisis.replace('_', ' ')}</span>
          </div>
        )}
      </div>
    </div>
  );
};
