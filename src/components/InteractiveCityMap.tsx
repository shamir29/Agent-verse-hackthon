import React, { useState, useEffect, useRef } from 'react';
import type { ChargingStation, EVVehicle } from '../types/charging';
import { Zap, MapPin, Navigation, X, ChevronRight, ShieldCheck } from 'lucide-react';

interface InteractiveCityMapProps {
  stations: ChargingStation[];
  onSelectStation: (station: ChargingStation) => void;
  selectedStation: ChargingStation | null;
}

export const InteractiveCityMap: React.FC<InteractiveCityMapProps> = ({
  stations,
  onSelectStation,
  selectedStation,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filters state
  const [filterType, setFilterType] = useState<'all' | 'ultra_fast' | 'fast'>('all');
  const [showRoutes, setShowRoutes] = useState<boolean>(true);
  const [activeVehicles, setActiveVehicles] = useState<EVVehicle[]>([]);

  // Initialize simulated vehicles moving along routes to stations
  useEffect(() => {
    const vehicles: EVVehicle[] = [
      {
        id: 'EV-101',
        model: 'Tesla Model Y',
        batteryCapacityKwh: 78,
        currentSocPct: 18,
        targetSocPct: 80,
        maxChargeKw: 250,
        routeProgress: 0.1,
        destinationStationId: 'ST-01',
        status: 'en_route',
        x: 180,
        y: 120,
        pathIndex: 0,
      },
      {
        id: 'EV-204',
        model: 'Rivian R1T',
        batteryCapacityKwh: 135,
        currentSocPct: 22,
        targetSocPct: 85,
        maxChargeKw: 300,
        routeProgress: 0.45,
        destinationStationId: 'ST-02',
        status: 'en_route',
        x: 420,
        y: 280,
        pathIndex: 1,
      },
      {
        id: 'EV-309',
        model: 'Porsche Taycan',
        batteryCapacityKwh: 93,
        currentSocPct: 14,
        targetSocPct: 80,
        maxChargeKw: 350,
        routeProgress: 0.75,
        destinationStationId: 'ST-05',
        status: 'en_route',
        x: 750,
        y: 180,
        pathIndex: 2,
      },
    ];
    setActiveVehicles(vehicles);
  }, []);

  // Canvas loop for smooth map graphics
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1000);
    let height = (canvas.height = 540);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 540;
    };
    window.addEventListener('resize', handleResize);

    // Fixed route paths across city
    const routes = [
      [ { x: 100, y: 100 }, { x: 250, y: 180 }, { x: 420, y: 140 } ],
      [ { x: 200, y: 450 }, { x: 380, y: 320 }, { x: 600, y: 280 } ],
      [ { x: 880, y: 420 }, { x: 740, y: 260 }, { x: 800, y: 150 } ],
    ];

    let t = 0;

    const drawMap = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.005;

      // Draw subtle Google Maps style light city background grid & road network
      ctx.fillStyle = '#F8FAFC';
      ctx.fillRect(0, 0, width, height);

      // Draw stylized city blocks
      ctx.fillStyle = '#EDF2F7';
      const blocks = [
        { x: 40, y: 40, w: 160, h: 120 },
        { x: 240, y: 40, w: 220, h: 90 },
        { x: 500, y: 40, w: 200, h: 140 },
        { x: 740, y: 40, w: 220, h: 100 },
        { x: 40, y: 200, w: 180, h: 160 },
        { x: 260, y: 180, w: 210, h: 150 },
        { x: 500, y: 220, w: 190, h: 140 },
        { x: 720, y: 180, w: 240, h: 180 },
        { x: 80, y: 400, w: 240, h: 100 },
        { x: 360, y: 380, w: 320, h: 120 },
        { x: 720, y: 400, w: 240, h: 100 },
      ];
      blocks.forEach((b) => {
        ctx.beginPath();
        ctx.roundRect(b.x, b.y, b.w, b.h, 12);
        ctx.fill();
      });

      // Draw roads (white lines with border)
      ctx.lineWidth = 14;
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Major arterial highways
      const highways = [
        [ { x: 0, y: 160 }, { x: width, y: 160 } ],
        [ { x: 0, y: 360 }, { x: width, y: 360 } ],
        [ { x: 220, y: 0 }, { x: 220, y: height } ],
        [ { x: 480, y: 0 }, { x: 480, y: height } ],
        [ { x: 700, y: 0 }, { x: 700, y: height } ],
      ];

      highways.forEach((h) => {
        ctx.beginPath();
        ctx.moveTo(h[0].x, h[0].y);
        ctx.lineTo(h[1].x, h[1].y);
        ctx.stroke();
      });

      // Draw route lines & energy flows
      if (showRoutes) {
        routes.forEach((route, idx) => {
          ctx.beginPath();
          ctx.moveTo(route[0].x, route[0].y);
          for (let i = 1; i < route.length; i++) {
            ctx.lineTo(route[i].x, route[i].y);
          }
          ctx.strokeStyle = idx % 2 === 0 ? 'rgba(37, 99, 235, 0.4)' : 'rgba(16, 185, 129, 0.4)';
          ctx.lineWidth = 4;
          ctx.setLineDash([8, 6]);
          ctx.stroke();
          ctx.setLineDash([]); // Reset
        });
      }

      // Render vehicles moving along path
      if (showRoutes) {
        activeVehicles.forEach((v, idx) => {
          const path = routes[v.pathIndex % routes.length];
          const progress = (t + idx * 0.33) % 1;
          const p1 = path[0];
          const p2 = path[path.length - 1];
          const vx = p1.x + (p2.x - p1.x) * progress;
          const vy = p1.y + (p2.y - p1.y) * progress;

          // Draw Vehicle Marker
          ctx.beginPath();
          ctx.arc(vx, vy, 8, 0, Math.PI * 2);
          ctx.fillStyle = '#0F172A';
          ctx.fill();
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Vehicle label pill
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = 'rgba(0,0,0,0.1)';
          ctx.shadowBlur = 4;
          ctx.font = 'bold 10px "Plus Jakarta Sans", sans-serif';
          const label = `${v.model} (${v.currentSocPct}%)`;
          const tw = ctx.measureText(label).width;
          ctx.beginPath();
          ctx.roundRect(vx - tw / 2 - 6, vy - 24, tw + 12, 16, 8);
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.fillStyle = '#2563EB';
          ctx.fillText(label, vx - tw / 2, vy - 12);
        });
      }

      frameId = requestAnimationFrame(drawMap);
    };

    drawMap();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [showRoutes, activeVehicles]);

  // Filter stations based on user selection
  const filteredStations = stations.filter((st) => {
    if (filterType !== 'all' && st.type !== filterType) return false;
    return true;
  });

  // Calculate coordinates mapping for static display pins over canvas
  const getStationCoordinates = (_st: ChargingStation, idx: number) => {
    const coords = [
      { x: '42%', y: '26%' },
      { x: '24%', y: '65%' },
      { x: '72%', y: '28%' },
      { x: '48%', y: '66%' },
      { x: '82%', y: '52%' },
      { x: '16%', y: '30%' },
    ];
    return coords[idx % coords.length];
  };

  return (
    <section id="city-map" className="w-full py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-600">
              <MapPin className="w-4 h-4" />
              <span>NeuraGrid Smart City Layer</span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Interactive City Charging Map
            </h2>
            <p className="mt-2 text-slate-600 max-w-2xl text-base font-medium">
              Real-time telemetry for fast & ultra-fast charging stations, autonomous vehicle routes, queue predictions, and grid load dynamics.
            </p>
          </div>

          {/* Map Layer Controls Bar */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-full border border-slate-200 shadow-sm">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                filterType === 'all' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Speed
            </button>
            <button
              onClick={() => setFilterType('ultra_fast')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                filterType === 'ultra_fast' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ultra-Fast (350kW)
            </button>
            <button
              onClick={() => setFilterType('fast')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                filterType === 'fast' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Fast (150kW)
            </button>
            <button
              onClick={() => setShowRoutes(!showRoutes)}
              className={`px-3 py-2 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer border ${
                showRoutes ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-slate-100 border-slate-200 text-slate-500'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>EV Routes</span>
            </button>
          </div>
        </div>

        {/* Map Container Viewport */}
        <div className="mt-8 relative w-full h-[540px] rounded-[24px] bg-white border border-slate-200 overflow-hidden shadow-lg shadow-slate-200/50">
          
          {/* HTML5 Canvas Vector Map Layer */}
          <div className="absolute inset-0">
            <canvas ref={canvasRef} className="w-full h-full" />
          </div>

          {/* Floating Interactive Station Pins */}
          <div className="absolute inset-0 pointer-events-auto">
            {filteredStations.map((st, idx) => {
              const pos = getStationCoordinates(st, idx);
              const isSelected = selectedStation?.id === st.id;

              return (
                <div
                  key={st.id}
                  style={{ left: pos.x, top: pos.y }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                  onClick={() => onSelectStation(st)}
                >
                  {/* Outer Glowing Ripple */}
                  <div
                    className={`absolute -inset-3 rounded-full opacity-30 animate-ping ${
                      st.status === 'available'
                        ? 'bg-emerald-500'
                        : st.status === 'occupied'
                        ? 'bg-blue-500'
                        : 'bg-amber-500'
                    }`}
                  ></div>

                  {/* Station Marker Card */}
                  <div
                    className={`relative flex items-center space-x-2 px-3 py-2 rounded-2xl border transition-all duration-300 shadow-md ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 scale-110 ring-4 ring-blue-500/20'
                        : st.status === 'available'
                        ? 'bg-white text-slate-900 border-emerald-300 hover:border-emerald-500 hover:scale-105'
                        : st.status === 'occupied'
                        ? 'bg-white text-slate-900 border-blue-300 hover:border-blue-500 hover:scale-105'
                        : 'bg-white text-slate-900 border-amber-300 hover:border-amber-500 hover:scale-105'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-white text-xs ${
                        st.type === 'ultra_fast' ? 'bg-blue-600' : 'bg-slate-800'
                      }`}
                    >
                      <Zap className="w-4 h-4 fill-current" />
                    </div>

                    <div className="text-left pr-1">
                      <p className="text-xs font-extrabold leading-none tracking-tight">{st.name}</p>
                      <p className="text-[10px] font-semibold text-slate-500 mt-0.5">
                        {st.availablePorts}/{st.totalPorts} Ports Free • {st.powerKw}kW
                      </p>
                    </div>

                    {/* Status Dot */}
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        st.status === 'available'
                          ? 'bg-emerald-500'
                          : st.status === 'occupied'
                          ? 'bg-blue-600'
                          : 'bg-amber-500'
                      }`}
                    ></span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Top Floating Map Legend */}
          <div className="absolute top-4 left-4 z-30 hidden sm:flex items-center space-x-4 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-200/80 shadow-md text-xs font-semibold text-slate-700">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-600"></span>
              <span>Occupied</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span>Maintenance</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center space-x-1.5 text-blue-600">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Ultra-Fast 350kW</span>
            </div>
          </div>

          {/* Station Details Sliding Modal Drawer */}
          {selectedStation && (
            <div className="absolute top-4 right-4 bottom-4 w-96 z-40 bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 overflow-y-auto flex flex-col justify-between animate-in slide-in-from-right duration-300">
              
              <div>
                {/* Header */}
                <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                  <div>
                    <span className="inline-flex items-center space-x-1 text-[11px] font-extrabold uppercase text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      <Zap className="w-3 h-3 fill-current" />
                      <span>{selectedStation.type === 'ultra_fast' ? 'Ultra-Fast 350 kW' : 'Fast 150 kW'}</span>
                    </span>
                    <h3 className="mt-2 text-xl font-extrabold text-slate-900 tracking-tight">
                      {selectedStation.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">{selectedStation.district}</p>
                  </div>
                  <button
                    onClick={() => onSelectStation(null as any)}
                    className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Key Status Grid */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] font-semibold text-slate-500">Available Ports</span>
                    <p className="mt-1 text-xl font-extrabold text-slate-900 font-mono">
                      {selectedStation.availablePorts} / {selectedStation.totalPorts}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] font-semibold text-slate-500">Queue Prediction</span>
                    <p className="mt-1 text-xl font-extrabold text-emerald-600 font-mono">
                      {selectedStation.queueTimeMin === 0 ? '0 mins' : `${selectedStation.queueTimeMin} mins`}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] font-semibold text-slate-500">Renewable Energy</span>
                    <p className="mt-1 text-xl font-extrabold text-emerald-600 font-mono">
                      {selectedStation.renewablePct}% Clean
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] font-semibold text-slate-500">Electricity Tariff</span>
                    <p className="mt-1 text-xl font-extrabold text-blue-600 font-mono">
                      ${selectedStation.tariffPerKwh.toFixed(2)} <span className="text-xs text-slate-500 font-normal">/kWh</span>
                    </p>
                  </div>
                </div>

                {/* Connectors & Health Diagnostics */}
                <div className="mt-5 space-y-3">
                  <div>
                    <span className="text-xs font-bold text-slate-700">Supported Connectors</span>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {selectedStation.connectors.map((c) => (
                        <span key={c} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-700">AI Equipment Telemetry</span>
                    <div className="mt-2 space-y-2 text-xs">
                      <div className="flex justify-between text-slate-600">
                        <span>Transformer Temperature</span>
                        <span className="font-mono font-bold text-slate-900">{selectedStation.temperatureC}°C</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Inverter Efficiency</span>
                        <span className="font-mono font-bold text-emerald-600">{selectedStation.efficiencyPct}%</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Remaining Useful Life (RUL)</span>
                        <span className="font-mono font-bold text-slate-900">{selectedStation.rulDays} days</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <button className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center space-x-2 cursor-pointer">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Reserve Port #04 Now</span>
                </button>

                <button className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-all flex items-center justify-center space-x-1 cursor-pointer">
                  <span>Dispatch Autonomous Route</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
