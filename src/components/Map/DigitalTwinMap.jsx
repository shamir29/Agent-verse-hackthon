import React, { useRef, useEffect, useState } from 'react';
import { MOCK_ASSETS, CONNECTED_GRID_LINES, CITY_DISTRICTS } from '../../data/mockCityAssets';
import { useDigitalTwin } from '../../context/DigitalTwinContext';
import { LayerControlPanel } from './LayerControlPanel';
import { AssetDetailPanel } from './AssetDetailPanel';
import { 
  Maximize2, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Box, 
  Layers, 
  Filter,
  Navigation,
  Eye,
  Zap,
  Sun,
  Building2,
  Car,
  Droplets,
  Trash2,
  Wind,
  Cpu,
  BatteryCharging,
  Radio,
  Gauge,
  CloudSun
} from 'lucide-react';

export const DigitalTwinMap = () => {
  const canvasRef = useRef(null);
  const { 
    activeLayers, 
    selectedDistrict, 
    setSelectedDistrict, 
    selectedAsset, 
    setSelectedAsset,
    mapMode,
    setMapMode,
    searchQuery,
    activeSimulation,
    isSimulating
  } = useDigitalTwin();

  const [showLayerPanel, setShowLayerPanel] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredAsset, setHoveredAsset] = useState(null);

  // Filter assets based on district, active layers, and search query
  const filteredAssets = MOCK_ASSETS.filter(asset => {
    if (!activeLayers.includes(asset.category)) return false;
    if (selectedDistrict !== 'all' && asset.district !== selectedDistrict) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        asset.name.toLowerCase().includes(q) ||
        asset.id.toLowerCase().includes(q) ||
        asset.type.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Canvas drawing effect & animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight || 620;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationFrameId;
    let particleOffset = 0;
    let turbineAngle = 0;

    const render = () => {
      particleOffset = (particleOffset + 0.8) % 100;
      turbineAngle = (turbineAngle + 0.05) % (Math.PI * 2);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      ctx.translate(centerX + panOffset.x, centerY + panOffset.y);
      ctx.scale(zoomLevel, zoomLevel);
      ctx.translate(-centerX, -centerY);

      // 1. Draw City Base & Water Bay Terrain
      drawMapBackground(ctx, canvas.width, canvas.height);

      // 2. Draw District Boundary Areas & Labels
      drawDistrictBoundaries(ctx);

      // 3. Draw Infrastructure Flow Lines (Power Grid Cables & Water Pipelines)
      drawFlowLines(ctx, particleOffset);

      // 4. Draw Animated Wind Turbines & Solar Panel Arrays
      drawRenewableFeatures(ctx, turbineAngle);

      // 5. Draw City Buildings (Isometric 3D vs 2D Flat)
      drawCityEnvironment(ctx, mapMode === '3d');

      // 6. Draw Asset Markers with Status Rings & Category Badges
      filteredAssets.forEach(asset => {
        drawAssetMarker(ctx, asset, selectedAsset?.id === asset.id, hoveredAsset?.id === asset.id, mapMode === '3d');
      });

      // 7. Draw Simulation Stress Ripples & Disaster Overlays
      if (activeSimulation || isSimulating) {
        drawSimulationOverlay(ctx, particleOffset);
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [zoomLevel, panOffset, activeLayers, selectedDistrict, selectedAsset, hoveredAsset, mapMode, searchQuery, activeSimulation, isSimulating]);

  // Map Drawing Sub-routines
  const drawMapBackground = (ctx, w, h) => {
    // Soft Gray Terrain Base
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, 1100, 700);

    // Subtle Satellite Grid Lines
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let x = 0; x < 1100; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0); ctx.lineTo(x, 700);
      ctx.stroke();
    }
    for (let y = 0; y < 700; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y); ctx.lineTo(1100, y);
      ctx.stroke();
    }

    // Coastal Water Bay on Left
    ctx.fillStyle = '#e0f2fe';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(280, 0);
    ctx.bezierCurveTo(250, 220, 340, 420, 230, 700);
    ctx.lineTo(0, 700);
    ctx.closePath();
    ctx.fill();

    // Water Shoreline Highlight
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Road Network (Main Arterials & Connectors)
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 14;
    ctx.beginPath();

    // Expressway Arterials
    ctx.moveTo(260, 280); ctx.lineTo(950, 280); // East-West Main
    ctx.moveTo(500, 60); ctx.lineTo(500, 620);   // North-South Main
    ctx.moveTo(340, 140); ctx.lineTo(820, 520); // Diagonal Trunk
    ctx.stroke();

    // Yellow Dashed Centerlines
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.moveTo(260, 280); ctx.lineTo(950, 280);
    ctx.moveTo(500, 60); ctx.lineTo(500, 620);
    ctx.stroke();
    ctx.setLineDash([]); // Reset line dash
  };

  const drawDistrictBoundaries = (ctx) => {
    const districts = [
      { name: 'BAY RENEWABLE HUB', x: 210, y: 550, color: '#eab308' },
      { name: 'WEST RESIDENTIAL GRID', x: 260, y: 320, color: '#06b6d4' },
      { name: 'NORTH INDUSTRIAL ZONE', x: 380, y: 100, color: '#ef4444' },
      { name: 'DOWNTOWN CORE', x: 560, y: 310, color: '#0284c7' },
      { name: 'INNOVATION TECH PARK', x: 760, y: 200, color: '#8b5cf6' }
    ];

    districts.forEach(d => {
      ctx.font = '700 11px Outfit, sans-serif';
      ctx.fillStyle = d.color;
      ctx.globalAlpha = 0.6;
      ctx.fillText(d.name, d.x, d.y);
      ctx.globalAlpha = 1.0;
    });
  };

  const drawFlowLines = (ctx, offset) => {
    CONNECTED_GRID_LINES.forEach(line => {
      const fromAsset = MOCK_ASSETS.find(a => a.id === line.from);
      const toAsset = MOCK_ASSETS.find(a => a.id === line.to);
      if (!fromAsset || !toAsset) return;

      // Draw Main Cable / Pipeline Track
      ctx.beginPath();
      ctx.moveTo(fromAsset.location.x, fromAsset.location.y);
      ctx.lineTo(toAsset.location.x, toAsset.location.y);
      ctx.strokeStyle = line.color;
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.5;
      ctx.stroke();
      ctx.globalAlpha = 1.0;

      // Draw Animated Pulsing Flow Particles
      const dx = toAsset.location.x - fromAsset.location.x;
      const dy = toAsset.location.y - fromAsset.location.y;
      const numParticles = 4;

      for (let i = 0; i < numParticles; i++) {
        const progress = ((offset + (i * (100 / numParticles))) % 100) / 100;
        const px = fromAsset.location.x + dx * progress;
        const py = fromAsset.location.y + dy * progress;

        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = line.color;
        ctx.shadowColor = line.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });
  };

  const drawRenewableFeatures = (ctx, angle) => {
    // Solar Panel Farm Grid Visual at Bay Hub
    ctx.fillStyle = '#0284c7';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 5; c++) {
        ctx.fillRect(170 + c * 20, 460 + r * 14, 16, 10);
        ctx.strokeRect(170 + c * 20, 460 + r * 14, 16, 10);
      }
    }

    // 2 Offshore Wind Turbines with Rotating Blades
    const turbines = [{ x: 140, y: 220 }, { x: 180, y: 160 }];
    turbines.forEach(t => {
      // Tower Pole
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(t.x, t.y);
      ctx.lineTo(t.x, t.y - 30);
      ctx.stroke();

      // Nacelle Hub
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(t.x, t.y - 30, 3, 0, Math.PI * 2);
      ctx.fill();

      // 3 Blades
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 2;
      for (let b = 0; b < 3; b++) {
        const bladeAngle = angle + (b * (Math.PI * 2 / 3));
        const bx = t.x + Math.cos(bladeAngle) * 16;
        const by = (t.y - 30) + Math.sin(bladeAngle) * 16;
        ctx.beginPath();
        ctx.moveTo(t.x, t.y - 30);
        ctx.lineTo(bx, by);
        ctx.stroke();
      }
    });
  };

  const drawCityEnvironment = (ctx, is3D) => {
    const buildings = [
      { x: 480, y: 250, w: 48, h: 58, height3D: 42, label: 'Apex Tower' },
      { x: 550, y: 210, w: 52, h: 42, height3D: 32, label: 'Financial Hub' },
      { x: 740, y: 170, w: 64, h: 54, height3D: 36, label: 'Quantum AI Tech' },
      { x: 330, y: 110, w: 72, h: 48, height3D: 28, label: 'Industrial Plant' }
    ];

    buildings.forEach(b => {
      if (is3D) {
        const topX = b.x - b.height3D * 0.4;
        const topY = b.y - b.height3D * 0.6;

        // Shadow
        ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
        ctx.fillRect(b.x + 8, b.y + 8, b.w, b.h);

        // Front Facade
        ctx.fillStyle = '#94a3b8';
        ctx.beginPath();
        ctx.moveTo(b.x, b.y + b.h);
        ctx.lineTo(b.x + b.w, b.y + b.h);
        ctx.lineTo(topX + b.w, topY + b.h);
        ctx.lineTo(topX, topY + b.h);
        ctx.closePath();
        ctx.fill();

        // Top Roof
        ctx.fillStyle = '#e2e8f0';
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(topX, topY);
        ctx.lineTo(topX + b.w, topY);
        ctx.lineTo(topX + b.w, topY + b.h);
        ctx.lineTo(topX, topY + b.h);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.fillStyle = '#e2e8f0';
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.5;
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.strokeRect(b.x, b.y, b.w, b.h);
      }
    });
  };

  const drawAssetMarker = (ctx, asset, isSelected, isHovered, is3D) => {
    const { x, y } = asset.location;

    let color = '#10b981'; // Green
    if (asset.status === 'warning') color = '#eab308'; // Yellow
    if (asset.status === 'maintenance') color = '#f97316'; // Orange
    if (asset.status === 'critical') color = '#ef4444'; // Red

    ctx.save();

    // Pulse Ring for Warning / Critical or Selected Pin
    if (asset.status === 'critical' || asset.status === 'warning' || isSelected) {
      ctx.beginPath();
      ctx.arc(x, y, isSelected ? 24 : 18, 0, Math.PI * 2);
      ctx.fillStyle = `${color}33`;
      ctx.fill();
    }

    // Outer Circle White Marker Pin
    ctx.beginPath();
    ctx.arc(x, y, isHovered ? 15 : 12, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 3;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Inner Colored Ring
    ctx.beginPath();
    ctx.arc(x, y, isHovered ? 11 : 9, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    // Asset ID Label
    ctx.font = '700 10px Inter, sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.textAlign = 'center';
    ctx.fillText(asset.id, x, y + 24);

    ctx.restore();
  };

  const drawSimulationOverlay = (ctx, offset) => {
    const cx = 380;
    const cy = 220;
    const radius = 50 + (offset % 70);

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(239, 68, 68, ${1 - (radius - 50) / 70})`;
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
    ctx.beginPath();
    ctx.arc(cx, cy, 50, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  // Mouse Handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPanOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
      return;
    }

    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const mapX = (mouseX - (centerX + panOffset.x)) / zoomLevel + centerX;
    const mapY = (mouseY - (centerY + panOffset.y)) / zoomLevel + centerY;

    const hit = filteredAssets.find(asset => {
      const dx = asset.location.x - mapX;
      const dy = asset.location.y - mapY;
      return Math.sqrt(dx * dx + dy * dy) < 20;
    });

    setHoveredAsset(hit || null);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCanvasClick = () => {
    if (hoveredAsset) {
      setSelectedAsset(hoveredAsset);
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    setZoomLevel(prev => Math.min(Math.max(prev * zoomFactor, 0.6), 2.5));
  };

  return (
    <div className="map-canvas-container" style={{ position: 'relative', width: '100%', height: '620px' }}>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleCanvasClick}
        onWheel={handleWheel}
        style={{
          cursor: isDragging ? 'grabbing' : hoveredAsset ? 'pointer' : 'grab',
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />

      {/* Floating Controls Overlay - Top Left */}
      <div style={{
        position: 'absolute',
        top: '16px',
        left: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        zIndex: 20
      }}>
        {/* District Selector */}
        <div style={{ position: 'relative' }}>
          <select 
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="input-text"
            style={{
              paddingLeft: '32px',
              height: '38px',
              fontSize: '0.825rem',
              fontWeight: 600,
              boxShadow: 'var(--shadow-md)',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: '#ffffff'
            }}
          >
            {CITY_DISTRICTS.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
          <Filter size={14} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--accent-blue)' }} />
        </div>

        {/* 2D / 3D Perspective Toggle */}
        <button
          className={`btn ${mapMode === '3d' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setMapMode(mapMode === '3d' ? '2d' : '3d')}
          style={{
            height: '38px',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.8rem',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <Box size={14} /> {mapMode === '3d' ? '3D Perspective' : '2D Blueprint'}
        </button>

        {/* Layer Controls Dropdown Button */}
        <div style={{ position: 'relative' }}>
          <button
            className="btn btn-secondary"
            onClick={() => setShowLayerPanel(!showLayerPanel)}
            style={{
              height: '38px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.8rem',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <Layers size={14} /> Layers ({activeLayers.length})
          </button>

          {showLayerPanel && (
            <div style={{ position: 'absolute', top: '46px', left: 0, zIndex: 30 }}>
              <LayerControlPanel />
            </div>
          )}
        </div>
      </div>

      {/* Floating Zoom / Reset Controls - Bottom Right */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        zIndex: 20
      }}>
        <button 
          onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 2.5))}
          className="btn btn-secondary" 
          style={{ width: '38px', height: '38px', borderRadius: '50%', padding: 0, boxShadow: 'var(--shadow-md)' }}
        >
          <ZoomIn size={16} />
        </button>
        <button 
          onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.6))}
          className="btn btn-secondary" 
          style={{ width: '38px', height: '38px', borderRadius: '50%', padding: 0, boxShadow: 'var(--shadow-md)' }}
        >
          <ZoomOut size={16} />
        </button>
        <button 
          onClick={() => { setZoomLevel(1); setPanOffset({ x: 0, y: 0 }); }}
          className="btn btn-secondary" 
          style={{ width: '38px', height: '38px', borderRadius: '50%', padding: 0, boxShadow: 'var(--shadow-md)' }}
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Legend Overlay - Bottom Left */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        fontSize: '0.725rem',
        boxShadow: 'var(--shadow-sm)',
        zIndex: 20
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} /> Healthy
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#eab308' }} /> Warning
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f97316' }} /> Maintenance
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }} /> Critical
        </div>
      </div>

      {/* Floating Asset Inspection Card when selected */}
      <AssetDetailPanel />
    </div>
  );
};
