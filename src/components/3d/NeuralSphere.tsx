import React, { useEffect, useRef } from 'react';
import { AGENT_CARDS } from '../../data/mockData';
import type { AgentCard } from '../../types';

interface NeuralSphereProps {
  activeAgentId?: string | null;
  onSelectAgent?: (agent: AgentCard) => void;
}

export const NeuralSphere: React.FC<NeuralSphereProps> = ({
  activeAgentId,
  onSelectAgent
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    let rotY = 0;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth * window.devicePixelRatio;
        canvas.height = parent.clientHeight * window.devicePixelRatio;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const sphereRadius = 130;
    const nodes = AGENT_CARDS.map((agent, i) => {
      const phi = Math.acos(-1 + (2 * i) / AGENT_CARDS.length);
      const theta = Math.sqrt(AGENT_CARDS.length * Math.PI) * phi;
      return {
        agent,
        id: agent.id,
        name: agent.name,
        color: agent.color,
        origX: sphereRadius * Math.cos(theta) * Math.sin(phi),
        origY: sphereRadius * Math.sin(theta) * Math.sin(phi),
        origZ: sphereRadius * Math.cos(phi)
      };
    });

    let currentProjectedNodes: Array<{ agent: AgentCard; x: number; y: number; radius: number }> = [];

    const handleCanvasClick = (e: MouseEvent) => {
      if (!onSelectAgent) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      let foundAgent: AgentCard | null = null;
      let minDistance = 25; // hit radius

      currentProjectedNodes.forEach(item => {
        const dist = Math.hypot(clickX - item.x, clickY - item.y);
        if (dist < minDistance) {
          minDistance = dist;
          foundAgent = item.agent;
        }
      });

      if (foundAgent) {
        onSelectAgent(foundAgent);
      }
    };

    canvas.addEventListener('click', handleCanvasClick);

    const innerNeurons = Array.from({ length: 35 }).map(() => {
      const r = Math.random() * 70;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      return {
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        size: 1.5 + Math.random() * 1.5
      };
    });

    const render = () => {
      time += 0.02;
      rotY += 0.006;

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      const project = (x: number, y: number, z: number) => {
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const rx = x * cosY - z * sinY;
        const rz = x * sinY + z * cosY;
        const scale = 360 / (360 - rz);
        return {
          x: cx + rx * scale,
          y: cy + y * scale,
          scale,
          depth: rz
        };
      };

      nodes.forEach((n1, i) => {
        const p1 = project(n1.origX, n1.origY, n1.origZ);
        nodes.forEach((n2, j) => {
          if (i < j) {
            const p2 = project(n2.origX, n2.origY, n2.origZ);
            const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
            if (dist < 200) {
              const alpha = (1 - dist / 200) * 0.3;
              ctx.lineWidth = 1;
              ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;

              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();

              const pulsePos = (time * 1.5 + i + j) % 1;
              const px = p1.x + (p2.x - p1.x) * pulsePos;
              const py = p1.y + (p2.y - p1.y) * pulsePos;
              ctx.fillStyle = '#60A5FA';
              ctx.beginPath();
              ctx.arc(px, py, 2, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        });
      });

      innerNeurons.forEach(n => {
        const p = project(n.x, n.y, n.z);
        const alpha = Math.max(0.1, (p.depth + 80) / 160);
        ctx.fillStyle = `rgba(37, 99, 235, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, n.size * p.scale, 0, Math.PI * 2);
        ctx.fill();
      });

      // Sort nodes by depth for non-overlapping rendering
      const sortedNodes = nodes.map(n => {
        const p = project(n.origX, n.origY, n.origZ);
        return { ...n, p };
      }).sort((a, b) => a.p.depth - b.p.depth);

      currentProjectedNodes = [];

      sortedNodes.forEach(({ agent, id, name, color, p }) => {
        const isActive = activeAgentId === id;
        const radius = (isActive ? 11 : 6.5) * p.scale;

        currentProjectedNodes.push({
          agent,
          x: p.x,
          y: p.y,
          radius
        });

        const auraGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 2.5);
        auraGrad.addColorStop(0, color);
        auraGrad.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Render labels for forward-facing nodes
        if (p.depth > 10) {
          ctx.fillStyle = 'rgba(255,255,255,0.9)';
          const textWidth = ctx.measureText(name).width;
          ctx.beginPath();
          ctx.roundRect(p.x - textWidth / 2 - 6, p.y + radius + 4, textWidth + 12, 16, 8);
          ctx.fillStyle = 'rgba(15,23,42,0.85)';
          ctx.fill();

          ctx.fillStyle = '#F8FAFC';
          ctx.font = `${isActive ? '600 11px' : '500 10px'} Inter, sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillText(name, p.x, p.y + radius + 15);
        }
      });

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, [activeAgentId, onSelectAgent]);

  return (
    <div className="relative w-full h-[480px] flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full block cursor-pointer" />
    </div>
  );
};
