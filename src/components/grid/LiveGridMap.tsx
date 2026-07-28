import React, { useEffect, useRef, useState } from 'react';
import {
  GridNode,
  PowerLine,
  DistrictBuilding,
  TelemetryStats,
  ViewMode
} from '../../types/powerGrid';
import { FrequencyOscilloscope } from '../hud/FrequencyOscilloscope';
import {
  Zap,
  Building2,
  Sun,
  Wind,
  Battery,
  AlertTriangle,
  Radio,
  CheckCircle2,
  Info,
  Layers,
  Sparkles,
  Activity,
  Flame,
  PlusCircle,
  Move3d,
  SlidersHorizontal,
  X,
  Eye,
  Maximize2,
  Compass,
  MapPin
} from 'lucide-react';

interface LiveGridMapProps {
  nodes: GridNode[];
  powerLines: PowerLine[];
  buildings: DistrictBuilding[];
  telemetry: TelemetryStats;
  onTriggerFailure: (type: 'substation_trip' | 'transformer_overload' | 'line_break' | 'solar_flare') => void;
  onRunAiHealing: () => void;
  onAddPowerLine: (fromId: string, toId: string) => void;
  onSetBuildingDemand: (bId: string, demandMW: number) => void;
}

export const LiveGridMap: React.FC<LiveGridMapProps> = ({
  nodes,
  powerLines,
  buildings,
  telemetry,
  onTriggerFailure,
  onRunAiHealing,
  onAddPowerLine,
  onSetBuildingDemand
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('node_bldg_hosp');
  const [viewMode, setViewMode] = useState<ViewMode>('2d'); // Default to ultra-clean 2D layout
  const [particleSpeed, setParticleSpeed] = useState(1.2);
  const [showGlowEffects, setShowGlowEffects] = useState(true);
  const [showDistrictZones, setShowDistrictZones] = useState(true);
  const [cleanMinimalMode, setCleanMinimalMode] = useState(false);

  // Manual Cable Connection Tool state
  const [isConnectToolActive, setIsConnectToolActive] = useState(false);
  const [connectSourceNodeId, setConnectSourceNodeId] = useState<string | null>(null);

  // Floating HUD Building Sliders Drawer
  const [showDemandSliders, setShowDemandSliders] = useState(false);

  // Canvas Neon Stream Particle Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      lineId: string;
      progress: number;
      speed: number;
      color: string;
      size: number;
    }> = [];

    const initParticles = () => {
      particles = [];
      powerLines.forEach(line => {
        if (line.status === 'tripped') return;
        const count = cleanMinimalMode ? 2 : Math.max(3, Math.floor(line.currentFlowMW / 30));
        for (let i = 0; i < count; i++) {
          particles.push({
            lineId: line.id,
            progress: Math.random(),
            speed: (0.0025 + Math.random() * 0.003) * particleSpeed,
            color: line.status === 'rerouted' ? '#f59e0b' : (line.status === 'user_created' ? '#00d2ff' : '#10b981'),
            size: cleanMinimalMode ? 2.5 : (2.5 + Math.random() * 2)
          });
        }
      });
    };

    initParticles();

    const render = () => {
      const width = canvas.width = canvas.parentElement?.clientWidth || 900;
      const height = canvas.height = canvas.parentElement?.clientHeight || 600;

      ctx.clearRect(0, 0, width, height);

      // Render Clean Transmission Lines
      powerLines.forEach(line => {
        const fromNode = nodes.find(n => n.id === line.fromId);
        const toNode = nodes.find(n => n.id === line.toId);
        if (!fromNode || !toNode) return;

        const x1 = (fromNode.x / 100) * width;
        const y1 = (fromNode.y / 100) * height;
        const x2 = (toNode.x / 100) * width;
        const y2 = (toNode.y / 100) * height;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);

        if (line.status === 'tripped') {
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.9)';
          ctx.lineWidth = 3;
          ctx.setLineDash([8, 8]);
          ctx.stroke();
          ctx.setLineDash([]);
        } else if (line.status === 'user_created') {
          ctx.strokeStyle = '#00d2ff';
          ctx.lineWidth = 3;
          ctx.shadowColor = '#00d2ff';
          ctx.shadowBlur = showGlowEffects ? 12 : 0;
          ctx.stroke();
          ctx.shadowBlur = 0;
        } else if (line.status === 'rerouted') {
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 3;
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = showGlowEffects ? 10 : 0;
          ctx.stroke();
          ctx.shadowBlur = 0;
        } else {
          ctx.strokeStyle = line.voltageKV > 200 ? 'rgba(2, 132, 199, 0.45)' : 'rgba(16, 185, 129, 0.4)';
          ctx.lineWidth = cleanMinimalMode ? 2 : 2.5;
          ctx.shadowColor = line.voltageKV > 200 ? '#0284c7' : '#10b981';
          ctx.shadowBlur = showGlowEffects ? 6 : 0;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      });

      // Render Smooth Stream Particles
      particles.forEach(p => {
        const line = powerLines.find(l => l.id === p.lineId);
        if (!line || line.status === 'tripped') return;

        const fromNode = nodes.find(n => n.id === line.fromId);
        const toNode = nodes.find(n => n.id === line.toId);
        if (!fromNode || !toNode) return;

        p.progress = (p.progress + p.speed) % 1.0;

        const x1 = (fromNode.x / 100) * width;
        const y1 = (fromNode.y / 100) * height;
        const x2 = (toNode.x / 100) * width;
        const y2 = (toNode.y / 100) * height;

        const px = x1 + (x2 - x1) * p.progress;
        const py = y1 + (y2 - y1) * p.progress;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        if (showGlowEffects) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [nodes, powerLines, particleSpeed, showGlowEffects, viewMode, cleanMinimalMode]);

  const handleNodeClick = (nodeId: string) => {
    if (isConnectToolActive) {
      if (!connectSourceNodeId) {
        setConnectSourceNodeId(nodeId);
      } else {
        if (connectSourceNodeId !== nodeId) {
          onAddPowerLine(connectSourceNodeId, nodeId);
        }
        setConnectSourceNodeId(null);
        setIsConnectToolActive(false);
      }
    } else {
      setSelectedNodeId(nodeId);
    }
  };

  const selectedNode = nodes.find(n => n.id === selectedNodeId);
  const selectedBuilding = buildings.find(b => b.nodeId === selectedNodeId);

  const getNodeIcon = (type: string, category?: string) => {
    if (type === 'solar') return Sun;
    if (type === 'wind') return Wind;
    if (type === 'battery') return Battery;
    if (type === 'hydro') return Flame;
    if (type === 'substation') return Zap;
    if (category === 'hospital') return Radio;
    return Building2;
  };

  return (
    <div className="space-y-6">
      
      {/* Clean Header Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-200">
            <Compass className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-slate-900">Clean Interactive Power Map</h2>
              <span className="px-2.5 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
                Ultra-Clean Design
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              High-definition crisp map layout with district zoning, glowing vector nodes, and power flow pathing.
            </p>
          </div>
        </div>

        {/* Clean Map View Controls */}
        <div className="flex flex-wrap items-center space-x-2 text-xs">
          
          <button
            onClick={() => setCleanMinimalMode(!cleanMinimalMode)}
            className={`px-3 py-1.5 rounded-xl font-bold border transition-all flex items-center space-x-1.5 ${
              cleanMinimalMode
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{cleanMinimalMode ? 'Minimalist Mode: ON' : 'Minimalist View'}</span>
          </button>

          <button
            onClick={() => setShowDistrictZones(!showDistrictZones)}
            className={`px-3 py-1.5 rounded-xl font-bold border transition-all flex items-center space-x-1.5 ${
              showDistrictZones
                ? 'bg-cyan-50 text-cyan-700 border-cyan-300'
                : 'bg-slate-50 text-slate-500 border-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>District Zones</span>
          </button>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 font-bold">
            <button
              onClick={() => setViewMode('2d')}
              className={`px-3 py-1 rounded-lg transition-all ${
                viewMode === '2d' ? 'bg-white text-cyan-600 shadow-sm' : 'text-slate-600'
              }`}
            >
              Clean 2D
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={`px-3 py-1 rounded-lg transition-all ${
                viewMode === '3d' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-600'
              }`}
            >
              3D Isometric
            </button>
          </div>

          <button
            onClick={() => setIsConnectToolActive(!isConnectToolActive)}
            className={`px-3 py-1.5 rounded-xl font-bold border transition-all flex items-center space-x-1.5 ${
              isConnectToolActive
                ? 'bg-cyan-600 text-white border-cyan-600 shadow-md shadow-cyan-500/20 animate-pulse'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-cyan-400" />
            <span>{isConnectToolActive ? 'Selecting Target...' : 'Add Feeder Cable'}</span>
          </button>

          <button
            onClick={() => setShowDemandSliders(!showDemandSliders)}
            className={`p-1.5 rounded-xl border font-bold transition-all ${
              showDemandSliders ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-700 border-slate-200'
            }`}
            title="Load Demand Sliders"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

        </div>

      </div>

      {/* Main Map Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Canvas & Map Viewport (2 Cols) */}
        <div className="lg:col-span-2 relative min-h-[600px] bg-slate-50 rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex items-center justify-center">
          
          {/* Crisp Light Grid Blueprint Background */}
          {!cleanMinimalMode && (
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-60"></div>
          )}

          {/* District Region Boundaries (Subtle Translucent Pastel Fills) */}
          {showDistrictZones && !cleanMinimalMode && (
            <div className="absolute inset-0 pointer-events-none z-0">
              {/* Generation Zone (North-West) */}
              <div className="absolute left-[5%] top-[10%] w-[38%] h-[40%] rounded-3xl bg-amber-500/5 border border-dashed border-amber-300/60 p-3">
                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider bg-amber-100/80 px-2 py-0.5 rounded-full border border-amber-200">
                  ☀️ Renewable Generation Hub
                </span>
              </div>

              {/* Substation & Storage Zone (Center) */}
              <div className="absolute left-[30%] top-[25%] w-[45%] h-[45%] rounded-3xl bg-indigo-500/5 border border-dashed border-indigo-300/60 p-3">
                <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider bg-indigo-100/80 px-2 py-0.5 rounded-full border border-indigo-200">
                  🔋 Substation & BESS Storage Center
                </span>
              </div>

              {/* Metropolitan City District Zone (South-East) */}
              <div className="absolute left-[50%] top-[35%] w-[45%] h-[55%] rounded-3xl bg-emerald-500/5 border border-dashed border-emerald-300/60 p-3">
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-200">
                  🏙️ Metropolitan City Districts
                </span>
              </div>
            </div>
          )}

          {/* Canvas Neon Streams Layer */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

          {/* Floating Top-Right Oscilloscope */}
          <div className="absolute top-4 right-4 z-30 w-64 pointer-events-auto">
            <FrequencyOscilloscope frequencyHz={telemetry.gridFrequencyHz} stabilityScore={telemetry.gridStabilityScore} />
          </div>

          {/* Floating Connecting Cable Banner */}
          {isConnectToolActive && (
            <div className="absolute top-4 left-4 z-30 bg-cyan-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg animate-bounce flex items-center space-x-2">
              <Zap className="w-4 h-4 animate-spin" />
              <span>
                {connectSourceNodeId
                  ? `Click TARGET node to connect cable from ${nodes.find(n => n.id === connectSourceNodeId)?.name}`
                  : 'Click SOURCE node to start drawing feeder cable'}
              </span>
            </div>
          )}

          {/* Clean Vector Node Cards Overlay */}
          <div className={`absolute inset-0 z-20 pointer-events-auto transition-transform duration-700 ${
            viewMode === '3d' ? '[transform:rotateX(48deg)_rotateZ(-25deg)_scale(0.88)] origin-center' : ''
          }`}>
            {nodes.map(node => {
              const isSelected = selectedNodeId === node.id;
              const isConnectSource = connectSourceNodeId === node.id;
              const building = buildings.find(b => b.nodeId === node.id);
              const NodeIcon = getNodeIcon(node.type, building?.category);

              let cardStyle = 'bg-white text-slate-800 border-slate-300 shadow-sm';
              if (node.status === 'failed') {
                cardStyle = 'bg-red-50 text-red-600 border-red-500 glow-red animate-bounce';
              } else if (building) {
                if (building.powerPct === 0) cardStyle = 'bg-red-50 text-red-600 border-red-500 glow-red';
                else if (building.powerPct < 75) cardStyle = 'bg-amber-50 text-amber-800 border-amber-400 glow-amber';
                else if (building.powerPct > 105) cardStyle = 'bg-cyan-50 text-cyan-800 border-cyan-400 glow-cyan';
                else cardStyle = 'bg-emerald-50 text-emerald-800 border-emerald-400 glow-green';
              } else if (node.type === 'solar') cardStyle = 'bg-amber-50 text-amber-800 border-amber-400 glow-amber';
              else if (node.type === 'wind') cardStyle = 'bg-cyan-50 text-cyan-800 border-cyan-400 glow-cyan';
              else if (node.type === 'battery') cardStyle = 'bg-indigo-50 text-indigo-800 border-indigo-400 glow-purple';
              else if (node.type === 'substation') cardStyle = 'bg-blue-50 text-blue-800 border-blue-400 glow-cyan';

              const hExtrusion = node.heightExtrusion || 40;

              return (
                <div
                  key={node.id}
                  onClick={() => handleNodeClick(node.id)}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 group"
                >
                  {/* 3D Height Extrusion Column */}
                  {viewMode === '3d' && (
                    <div
                      className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-t from-slate-300 to-white/90 rounded-t-md opacity-80 border-x border-t border-slate-300 shadow-md pointer-events-none"
                      style={{ height: `${hExtrusion}px` }}
                    ></div>
                  )}

                  {/* Clean Vector Node Badge */}
                  <div
                    style={{ transform: viewMode === '3d' ? `translateY(-${hExtrusion}px)` : 'none' }}
                    className={`relative p-3 rounded-2xl border-2 flex items-center justify-center transition-transform group-hover:scale-110 ${cardStyle} ${
                      isSelected ? 'ring-4 ring-cyan-500/40 scale-110 z-30' : ''
                    } ${isConnectSource ? 'ring-4 ring-amber-500 animate-pulse' : ''}`}
                  >
                    <NodeIcon className="w-5 h-5" />

                    {building && (
                      <span className={`absolute -top-2 -right-2 px-1.5 py-0.5 text-[9px] font-extrabold rounded-full text-white shadow-sm ${
                        building.powerPct === 0 ? 'bg-red-600' : (building.powerPct < 75 ? 'bg-amber-500' : 'bg-emerald-600')
                      }`}>
                        {building.powerPct}%
                      </span>
                    )}
                  </div>

                  {/* Clean Node Label */}
                  {!cleanMinimalMode && (
                    <div
                      style={{ transform: viewMode === '3d' ? `translateY(-${hExtrusion}px)` : 'none' }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md border border-slate-200 shadow-md text-center pointer-events-none group-hover:z-50"
                    >
                      <div className="text-[11px] font-bold text-slate-800">{node.name}</div>
                      <div className="text-[10px] text-slate-500 font-medium">
                        {node.type === 'building' ? `${building?.suppliedMW || 0} / ${building?.demandMW || 0} MW` : `${node.currentMW} MW`}
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

          {/* Floating Building Demand Sliders Drawer Overlay */}
          {showDemandSliders && (
            <div className="absolute top-4 left-4 z-40 w-72 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-4 h-4 text-cyan-600" />
                  Adjust District Load Demand
                </span>
                <button onClick={() => setShowDemandSliders(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {buildings.map(b => (
                  <div key={b.id} className="text-xs space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <div className="flex justify-between font-semibold text-slate-800">
                      <span>{b.name}</span>
                      <span className="text-cyan-600 font-bold">{b.demandMW} MW</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="250"
                      value={b.demandMW}
                      onChange={e => onSetBuildingDemand(b.id, parseInt(e.target.value))}
                      className="w-full accent-cyan-600 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Clean Map Legend */}
          <div className="absolute bottom-3 left-3 right-3 z-30 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
            <div className="flex items-center space-x-4">
              <span className="font-bold text-slate-800">Grid Glow Indicators:</span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>100% Electrified</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                <span>Surge Capacity</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>Sub-optimal</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                <span>Failure Trip</span>
              </span>
            </div>
            <div className="text-slate-400 font-medium">
              Click nodes to view full telemetry diagnostics
            </div>
          </div>

        </div>

        {/* Selected Node Details Side Card (1 Col) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
          {selectedNode ? (
            <div className="space-y-5">
              
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-cyan-600 tracking-wider">
                    {selectedNode.type} NODE DIAGNOSTICS
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">{selectedNode.name}</h3>
                </div>
                <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${
                  selectedNode.status === 'online'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-red-50 text-red-600 border-red-200 animate-pulse'
                }`}>
                  {selectedNode.status.toUpperCase()}
                </span>
              </div>

              {selectedBuilding && (
                <div className={`p-4 rounded-xl border transition-all ${
                  selectedBuilding.powerPct === 0
                    ? 'bg-red-50/70 border-red-200 text-red-900'
                    : selectedBuilding.powerPct < 75
                    ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                    : 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase">Building Glow Luminescence</span>
                    <span className="text-sm font-extrabold">{selectedBuilding.powerPct}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        selectedBuilding.powerPct === 0 ? 'bg-red-500' : selectedBuilding.powerPct < 75 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, selectedBuilding.powerPct)}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="text-slate-400 font-medium">Active Load / Supply</div>
                  <div className="text-sm font-bold text-slate-800 mt-1">{selectedNode.currentMW} MW</div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="text-slate-400 font-medium">Design Capacity</div>
                  <div className="text-sm font-bold text-slate-800 mt-1">{selectedNode.capacityMW} MW</div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="text-slate-400 font-medium">Voltage</div>
                  <div className="text-sm font-bold text-slate-800 mt-1">{selectedNode.voltageKV} kV</div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="text-slate-400 font-medium">Frequency</div>
                  <div className="text-sm font-bold text-slate-800 mt-1">{selectedNode.frequencyHz} Hz</div>
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <Info className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-sm">Click on any glowing building or node on the map to inspect live metrics.</p>
            </div>
          )}

          <div className="pt-4 border-t border-slate-200 space-y-2">
            <button
              onClick={onRunAiHealing}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700 text-white font-bold text-xs shadow-md shadow-cyan-500/20 flex items-center justify-center space-x-2 transition-all"
            >
              <Zap className="w-4 h-4 animate-pulse" />
              <span>Run Simple AI Grid Auto-Healing</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
