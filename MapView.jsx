import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle, Polygon, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default leaflet marker icon issue in react build
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom Icons for Green & Heat Hotspots
const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const heatIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Wildfire Flame Marker
const fireIcon = L.divIcon({
  html: '<span style="font-size: 26px; filter: drop-shadow(0 0 4px rgba(239, 68, 68, 0.6));">🔥</span>',
  className: 'custom-div-icon',
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

function ChangeMapView({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 13, { animate: true, duration: 1 });
    }
  }, [center, map]);
  return null;
}

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    }
  });
  return null;
}

export default function MapView({ 
  center, locationName, aqi, greenZones = [], heatIslands = [], onLocationChange,
  fires = [], windDeg = 0
}) {
  const mapCenter = center || [40.7128, -74.0060];

  // Helper: calculate smoke plume polygon coordinates based on wind vector
  const getSmokePlumeCoordinates = (fireLat, fireLon) => {
    // Wind direction is where wind is coming FROM. Smoke blows to: windDeg + 180
    const blowAngle = ((windDeg + 180) * Math.PI) / 180;
    const distance = 0.055; // length of plume (~6km)
    const spread = (30 * Math.PI) / 180; // 30-degree cone width

    // Calculate core downwind heading
    const p1Angle = blowAngle - spread / 2;
    const p2Angle = blowAngle + spread / 2;

    const p1 = [
      fireLat + distance * Math.cos(p1Angle),
      fireLon + distance * Math.sin(p1Angle)
    ];
    
    const p2 = [
      fireLat + distance * Math.cos(p2Angle),
      fireLon + distance * Math.sin(p2Angle)
    ];

    return [
      [fireLat, fireLon], // vertex
      p1,
      p2
    ];
  };

  return (
    <div className="w-full h-full relative rounded-xl overflow-hidden shadow-md border border-slate-200">
      <MapContainer 
        center={mapCenter} 
        zoom={13} 
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        <ChangeMapView center={mapCenter} />
        
        <MapClickHandler onMapClick={onLocationChange} />

        {/* Main Location Pin */}
        <Marker position={mapCenter}>
          <Popup>
            <div className="p-1 text-slate-900">
              <h3 className="font-bold text-sm">{locationName}</h3>
              <p className="text-xs mt-1">AQI: <span className="font-semibold text-emerald-600">{aqi}</span></p>
            </div>
          </Popup>
        </Marker>

        {/* Wildfire active markers & smoke cones */}
        {fires && fires.map((fire, idx) => {
          const smokePolygon = getSmokePlumeCoordinates(fire.lat, fire.lon);
          return (
            <React.Fragment key={`wildfire-${idx}`}>
              <Marker position={[fire.lat, fire.lon]} icon={fireIcon}>
                <Popup>
                  <div className="p-1 text-slate-900 font-sans">
                    <h4 className="font-bold text-xs text-rose-600">Active Wildfire (FIRMS)</h4>
                    <p className="text-[10px] mt-0.5">Fire Radiative Power: <span className="font-bold">{fire.frp} MW</span></p>
                    <p className="text-[10px]">Confidence: {fire.confidence}%</p>
                  </div>
                </Popup>
              </Marker>
              
              {/* Translucent Smoke Cone Polygon */}
              <Polygon 
                positions={smokePolygon}
                pathOptions={{
                  fillColor: '#475569',
                  fillOpacity: 0.25,
                  color: '#475569',
                  weight: 1,
                  dashArray: '3,3'
                }}
              />
            </React.Fragment>
          );
        })}

        {/* Green Zones */}
        {greenZones.map((zone, idx) => (
          <React.Fragment key={`green-zone-${idx}`}>
            <Marker position={[zone.lat, zone.lon]} icon={greenIcon}>
              <Popup>
                <div className="p-1 text-slate-900">
                  <h4 className="font-bold text-xs text-emerald-600">Green Zone: {zone.name}</h4>
                  <p className="text-[10px]">Health Score: <span className="font-bold text-emerald-600">{zone.score}/100</span></p>
                </div>
              </Popup>
            </Marker>
            <Circle 
              center={[zone.lat, zone.lon]}
              radius={400}
              pathOptions={{ fillColor: '#10b981', fillOpacity: 0.15, color: '#10b981', weight: 1.5, dashArray: '4,4' }}
            />
          </React.Fragment>
        ))}

        {/* Heat Islands */}
        {heatIslands.map((zone, idx) => (
          <React.Fragment key={`heat-island-${idx}`}>
            <Marker position={[zone.lat, zone.lon]} icon={heatIcon}>
              <Popup>
                <div className="p-1 text-slate-900">
                  <h4 className="font-bold text-xs text-rose-600">Heat Core: {zone.name}</h4>
                  <p className="text-[10px]">Temperature: <span className="font-semibold text-rose-600">+{zone.tempDiff}°C</span></p>
                </div>
              </Popup>
            </Marker>
            <Circle 
              center={[zone.lat, zone.lon]}
              radius={600}
              pathOptions={{ fillColor: '#ef4444', fillOpacity: 0.2, color: '#ef4444', weight: 1 }}
            />
          </React.Fragment>
        ))}
      </MapContainer>

      {/* Map Overlays Legend */}
      <div className="absolute bottom-3 left-3 z-[1000] glass-panel p-3 rounded-lg text-xs space-y-1.5 pointer-events-none text-slate-700 shadow-md">
        <h4 className="font-bold border-b border-slate-200 pb-1 mb-1.5 text-slate-900">Map Legends</h4>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </span>
          <span className="text-slate-800 font-medium">Green Zone</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
          </span>
          <span className="text-slate-800 font-medium">Heat Island</span>
        </div>
        {fires.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded bg-slate-200 border border-slate-400 flex items-center justify-center text-[10px]">🔥</span>
            <span className="text-slate-800 font-medium">Wildfire Plume</span>
          </div>
        )}
        <div className="text-[10px] text-slate-500 mt-1 italic">Click on map to sample air conditions</div>
      </div>
    </div>
  );
}
