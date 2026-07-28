import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from 'react-leaflet';
import L from 'leaflet';
import {
  PipelineRoute,
  LeakAlert,
  ReservoirData,
  WaterQualitySector,
  FloodPredictionData,
  IoTSensor,
} from '../../types/waterSystem';
import {
  ShieldAlert,
  Layers,
  Droplets,
  Radio,
  Filter,
} from 'lucide-react';

// Custom Leaflet Markers using inline SVG Data URIs
const createCustomIcon = (color: string, label: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="14" fill="${color}" fill-opacity="0.25" stroke="${color}" stroke-width="2"/>
      <circle cx="16" cy="16" r="6" fill="${color}"/>
    </svg>
  `;
  return L.icon({
    iconUrl: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
};

const reservoirIcon = createCustomIcon('#0284c7', 'RES');
const leakIcon = createCustomIcon('#ff3b30', 'LK');
const sensorIcon = createCustomIcon('#9d4edd', 'SENS');

interface GisMapViewerProps {
  pipelines: PipelineRoute[];
  leaks: LeakAlert[];
  reservoirs: ReservoirData[];
  qualitySectors: WaterQualitySector[];
  floods: FloodPredictionData[];
  sensors: IoTSensor[];
  onIsolatePipe: (pipeId: string) => void;
  theme?: 'dark' | 'light';
}

export const GisMapViewer: React.FC<GisMapViewerProps> = ({
  pipelines,
  leaks,
  reservoirs,
  qualitySectors,
  floods,
  sensors,
  onIsolatePipe,
  theme = 'dark',
}) => {
  const [filterLayer, setFilterLayer] = useState<'all' | 'leaks' | 'reservoirs' | 'sensors' | 'floods'>('all');

  const center: [number, number] = [37.7749, -122.4194];

  // Tile URL depending on theme
  const tileUrl = theme === 'dark'
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

  return (
    <div className="relative w-full h-[650px] glass-panel rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl">
      
      {/* Top Filter Controls */}
      <div className="absolute top-4 left-4 z-[1000] flex items-center gap-2 bg-white/90 dark:bg-[#050914]/90 backdrop-blur-xl border border-cyan-500/30 p-2 rounded-2xl shadow-neon-blue">
        <span className="text-xs font-orbitron font-bold text-cyan-600 dark:text-cyan-300 px-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" /> GIS LAYERS:
        </span>
        {[
          { id: 'all', label: 'All Assets' },
          { id: 'leaks', label: 'Active Leaks (3)' },
          { id: 'reservoirs', label: 'Reservoirs (3)' },
          { id: 'sensors', label: 'IoT Sensors' },
          { id: 'floods', label: 'Flood Risk Zones' },
        ].map((layer) => (
          <button
            key={layer.id}
            onClick={() => setFilterLayer(layer.id as any)}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition ${
              filterLayer === layer.id
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-neon-cyan'
                : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {layer.label}
          </button>
        ))}
      </div>

      {/* Leaflet Map Canvas */}
      <MapContainer
        key={theme} // Force re-render tile layer when theme changes
        center={center}
        zoom={12}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url={tileUrl}
        />

        {/* 1. Render Pipeline Polyline Routes */}
        {(filterLayer === 'all' || filterLayer === 'leaks') &&
          pipelines.map((pipe) => {
            const isLeaking = pipe.status === 'Leaking';
            const isIsolated = pipe.status === 'Isolated';
            const color = isIsolated ? '#64748b' : isLeaking ? '#ff3b30' : '#0284c7';
            return (
              <Polyline
                key={pipe.id}
                positions={[pipe.startCoord, pipe.endCoord]}
                pathOptions={{
                  color,
                  weight: isLeaking ? 6 : 4,
                  dashArray: isLeaking ? '8, 8' : undefined,
                  opacity: 0.85,
                }}
              >
                <Popup>
                  <div className="p-1 min-w-[200px]">
                    <div className="font-orbitron font-bold text-cyan-600 dark:text-cyan-300 text-xs mb-1">
                      {pipe.name}
                    </div>
                    <div className="text-[11px] text-slate-700 dark:text-slate-300 space-y-1">
                      <div>Sector: {pipe.sector}</div>
                      <div>Pressure: <span className="font-mono text-cyan-600 dark:text-cyan-400">{pipe.pressurePsi} PSI</span></div>
                      <div>Flow Speed: {pipe.flowSpeedMs} m/s</div>
                      <div>Efficiency: {pipe.distributionEfficiencyPct}%</div>
                      <div>Status: <span className={isLeaking ? 'text-red-500 font-bold' : 'text-emerald-600 dark:text-emerald-400'}>{pipe.status}</span></div>
                    </div>
                    {isLeaking && (
                      <button
                        onClick={() => onIsolatePipe(pipe.id)}
                        className="mt-2 w-full py-1 rounded bg-red-600 text-white font-bold text-[10px] hover:bg-red-500 transition"
                      >
                        ISOLATE LEAK VALVE NOW
                      </button>
                    )}
                  </div>
                </Popup>
              </Polyline>
            );
          })}

        {/* 2. Render Reservoirs */}
        {(filterLayer === 'all' || filterLayer === 'reservoirs') &&
          reservoirs.map((res) => (
            <Marker key={res.id} position={res.coordinates} icon={reservoirIcon}>
              <Popup>
                <div className="p-1 min-w-[220px]">
                  <div className="font-orbitron font-bold text-cyan-600 dark:text-cyan-300 text-xs mb-1 flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" /> {res.name}
                  </div>
                  <div className="text-[11px] text-slate-700 dark:text-slate-300 space-y-1">
                    <div>Capacity: <span className="font-bold text-cyan-600 dark:text-cyan-400">{res.currentCapacityMGL} / {res.maxCapacityMGL} MGL</span></div>
                    <div>Fill Level: {res.fillPercentage}%</div>
                    <div>Daily Inflow: {res.dailyInflowMGL} MGL</div>
                    <div>Daily Outflow: {res.dailyOutflowMGL} MGL</div>
                    <div>Health Score: {res.healthScore}/100</div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* 3. Render Leaks */}
        {(filterLayer === 'all' || filterLayer === 'leaks') &&
          leaks.map((leak) => (
            <Marker
              key={leak.id}
              position={[leak.latitude, leak.longitude]}
              icon={leakIcon}
            >
              <Popup>
                <div className="p-1 min-w-[220px]">
                  <div className="font-orbitron font-bold text-red-600 dark:text-red-400 text-xs mb-1 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" /> LEAK: {leak.pipeName}
                  </div>
                  <div className="text-[11px] text-slate-700 dark:text-slate-300 space-y-1">
                    <div>Location: {leak.locationName}</div>
                    <div>Severity: <span className="text-red-500 font-bold">{leak.severity}</span></div>
                    <div>Pressure Drop: {leak.pressureDropPsi} PSI</div>
                    <div>Estimated Loss: {leak.estimatedLossLh.toLocaleString()} L/h</div>
                    <div>Priority: {leak.repairPriority}</div>
                  </div>
                  {leak.status !== 'Isolated' && (
                    <button
                      onClick={() => onIsolatePipe(leak.pipeId)}
                      className="mt-2 w-full py-1 rounded bg-red-600 text-white font-bold text-[10px] hover:bg-red-500 transition"
                    >
                      EXECUTE AUTOMATED VALVE ISOLATION
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}

        {/* 4. Render Flood Circles */}
        {(filterLayer === 'all' || filterLayer === 'floods') &&
          floods.map((flood) => (
            <React.Fragment key={flood.id}>
              <Circle
                center={[37.7550, -122.4350]}
                radius={2500}
                pathOptions={{
                  color: flood.overallRiskPct > 70 ? '#ff3b30' : '#f59e0b',
                  fillColor: flood.overallRiskPct > 70 ? '#ff3b30' : '#f59e0b',
                  fillOpacity: 0.25,
                  weight: 2,
                }}
              >
                <Popup>
                  <div className="p-1 min-w-[200px]">
                    <div className="font-orbitron font-bold text-red-600 dark:text-red-400 text-xs mb-1">
                      {flood.zoneName} FLOOD ZONE
                    </div>
                    <div className="text-[11px] text-slate-700 dark:text-slate-300 space-y-1">
                      <div>Overall Flood Risk: <span className="font-bold text-red-500">{flood.overallRiskPct}%</span></div>
                      <div>Urban Risk: {flood.urbanFloodRiskPct}%</div>
                      <div>River Risk: {flood.riverOverflowRiskPct}%</div>
                      <div>Peak Time: {flood.predictedPeakTime}</div>
                    </div>
                  </div>
                </Popup>
              </Circle>
            </React.Fragment>
          ))}

        {/* 5. Render IoT Sensors */}
        {(filterLayer === 'all' || filterLayer === 'sensors') &&
          sensors.slice(0, 8).map((sensor) => (
            <Marker
              key={sensor.id}
              position={sensor.coordinates}
              icon={sensorIcon}
            >
              <Popup>
                <div className="p-1">
                  <div className="font-orbitron font-bold text-purple-600 dark:text-purple-300 text-xs mb-1 flex items-center gap-1">
                    <Radio className="w-3.5 h-3.5 text-purple-500" /> {sensor.name}
                  </div>
                  <div className="text-[11px] text-slate-700 dark:text-slate-300 space-y-1">
                    <div>Type: {sensor.type} Sensor</div>
                    <div>Location: {sensor.location}</div>
                    <div>Battery: {sensor.batteryPct}%</div>
                    <div>Signal: {sensor.signalStrengthPct}%</div>
                    <div>Status: <span className="text-emerald-600 font-bold">{sensor.status}</span></div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>

      {/* Bottom GIS Status Footer */}
      <div className="absolute bottom-4 left-4 right-4 z-[1000] flex items-center justify-between bg-white/90 dark:bg-[#050914]/90 backdrop-blur-xl border border-cyan-500/30 p-2.5 rounded-2xl text-xs">
        <div className="flex items-center gap-3 text-slate-800 dark:text-slate-300">
          <Layers className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
          <span>GIS Telemetry Grid Sync: <span className="text-cyan-600 dark:text-cyan-400 font-bold">500 IoT Nodes Live</span></span>
        </div>
        <div className="text-[11px] text-slate-500 dark:text-slate-400">
          Click any map marker or pipeline route to trigger diagnostic & valve actions
        </div>
      </div>
    </div>
  );
};
