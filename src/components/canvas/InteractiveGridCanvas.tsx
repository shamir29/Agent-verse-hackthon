import React, { useRef, useEffect } from 'react';
import { useGrid } from '../../context/GridContext';
import type { GridNode } from '../../types/grid';

interface InteractiveGridCanvasProps {
  height?: number;
  interactive?: boolean;
}

export const InteractiveGridCanvas: React.FC<InteractiveGridCanvasProps> = ({ 
  height = 540,
  interactive = true 
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { nodes, lines, setSelectedNode, selectedNode, controlState } = useGrid();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particleOffset = 0;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const heightPx = rect.height;

      ctx.clearRect(0, 0, width, heightPx);

      ctx.strokeStyle = '#F1F5F9';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, heightPx);
        ctx.stroke();
      }
      for (let y = 0; y < heightPx; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      particleOffset += 0.8 * controlState.simSpeed;

      const nodeCoords: Record<string, { x: number; y: number; node: GridNode }> = {};
      nodes.forEach(n => {
        nodeCoords[n.id] = {
          x: (n.x / 100) * width,
          y: (n.y / 100) * heightPx,
          node: n
        };
      });

      lines.forEach(line => {
        const from = nodeCoords[line.fromNodeId];
        const to = nodeCoords[line.toNodeId];

        if (!from || !to) return;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);

        if (line.isFaulted) {
          ctx.strokeStyle = '#EF4444';
          ctx.lineWidth = 3;
          ctx.setLineDash([8, 6]);
        } else if (line.isRerouted) {
          ctx.strokeStyle = '#F59E0B';
          ctx.lineWidth = 3;
          ctx.setLineDash([10, 4]);
        } else {
          ctx.strokeStyle = '#E2E8F0';
          ctx.lineWidth = 2;
          ctx.setLineDash([]);
        }
        ctx.stroke();
        ctx.restore();

        if (controlState.activeLayers.flowParticles && !line.isFaulted) {
          const dx = to.x - from.x;
          const dy = to.y - from.y;
          const dist = Math.hypot(dx, dy);
          const numParticles = Math.max(3, Math.floor(dist / 40));

          for (let i = 0; i < numParticles; i++) {
            const progress = ((particleOffset + (i * (dist / numParticles))) % dist) / dist;
            const px = from.x + dx * progress;
            const py = from.y + dy * progress;

            ctx.beginPath();
            ctx.arc(px, py, line.isRerouted ? 3.5 : 2.5, 0, Math.PI * 2);
            ctx.fillStyle = line.isRerouted ? '#F59E0B' : '#2563EB';
            ctx.shadowColor = '#2563EB';
            ctx.shadowBlur = 4;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      });

      nodes.forEach(node => {
        const coords = nodeCoords[node.id];
        if (!coords) return;

        const { x, y } = coords;
        const isSelected = selectedNode?.id === node.id;

        ctx.save();

        if (node.status === 'critical') {
          const pulse = (Math.sin(Date.now() / 150) + 1) * 12;
          ctx.beginPath();
          ctx.arc(x, y, 16 + pulse, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
          ctx.fill();
        } else if (node.status === 'rerouted') {
          const pulse = (Math.sin(Date.now() / 200) + 1) * 8;
          ctx.beginPath();
          ctx.arc(x, y, 14 + pulse, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
          ctx.fill();
        }

        if (isSelected) {
          ctx.beginPath();
          ctx.arc(x, y, 18, 0, Math.PI * 2);
          ctx.strokeStyle = '#2563EB';
          ctx.lineWidth = 2.5;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        
        if (node.status === 'critical') {
          ctx.fillStyle = '#EF4444';
        } else if (node.status === 'warning' || node.status === 'rerouted') {
          ctx.fillStyle = '#F59E0B';
        } else if (node.type === 'solar_farm' || node.type === 'wind_farm') {
          ctx.fillStyle = '#10B981';
        } else if (node.type === 'battery_storage') {
          ctx.fillStyle = '#6366F1';
        } else {
          ctx.fillStyle = '#2563EB';
        }
        
        ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetY = 2;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = node.status === 'critical' ? '#EF4444' : '#1E293B';
        ctx.textAlign = 'center';
        ctx.fillText(node.name.split(' ')[0], x, y + 24);

        ctx.font = '500 10px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#64748B';
        ctx.fillText(`${node.loadMW} MW`, x, y + 36);

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleClick = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const width = rect.width;
      const heightPx = rect.height;

      let clicked: GridNode | null = null;
      nodes.forEach(node => {
        const nx = (node.x / 100) * width;
        const ny = (node.y / 100) * heightPx;
        const dist = Math.hypot(clickX - nx, clickY - ny);
        if (dist <= 18) {
          clicked = node;
        }
      });

      setSelectedNode(clicked);
    };

    canvas.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [nodes, lines, selectedNode, controlState, interactive, setSelectedNode]);

  return (
    <div className="relative w-full overflow-hidden rounded-[20px] bg-slate-50 border border-slate-200/80 shadow-sm">
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-pointer"
        style={{ height: `${height}px` }}
      />
    </div>
  );
};
