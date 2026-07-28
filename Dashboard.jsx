import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Search, MapPin, Wind, Thermometer, Droplets, Compass, 
  ShieldAlert, Trees, Sparkles, RefreshCw, BarChart2, Info,
  Bell, BellOff, Settings, Check, Flame, Sun, AlertOctagon,
  Calendar
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import MapView from './MapView';
import ThreeCanvas from './ThreeCanvas';
import HealthRiskCard from './HealthRiskCard';
import TrendsReport from './TrendsReport';
import { 
  getPollutionData, 
  getForecastData, 
  searchLocations, 
  getSearchHistory, 
  saveSearchLocation,
  getAlertLogs,
  clearAlertLogs,
  getAlertThresholds,
  updateAlertThresholds
} from '../services/api';

export default function Dashboard() {
  const queryClient = useQueryClient();
  
  // Default coordinates (New York City)
  const [coords, setCoords] = useState({ lat: 40.7128, lon: -74.0060, name: 'New York' });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [activeTab, setActiveTab] = useState('3d'); // '3d', '2d', or 'trends'
  
  // Advanced Features State
  const [showAlertSettings, setShowAlertSettings] = useState(false);
  const [showAlertLogs, setShowAlertLogs] = useState(false);

  // Fetch search history
  const { data: searchHistory = [] } = useQuery({
    queryKey: ['searchHistory'],
    queryFn: getSearchHistory
  });

  // Save search mutation
  const saveSearchMutation = useMutation({
    mutationFn: ({ name, lat, lon }) => saveSearchLocation(name, lat, lon),
    onSuccess: () => {
      queryClient.invalidateQueries(['searchHistory']);
    }
  });

  // Fetch current pollution data
  const { data: pollution, isLoading: isPollutionLoading } = useQuery({
    queryKey: ['pollution', coords.lat, coords.lon],
    queryFn: () => getPollutionData(coords.lat, coords.lon, coords.name),
    enabled: true
  });

  // Fetch forecast data
  const { data: forecast, isLoading: isForecastLoading } = useQuery({
    queryKey: ['forecast', coords.lat, coords.lon],
    queryFn: () => getForecastData(coords.lat, coords.lon, coords.name),
    enabled: true
  });

  // Fetch alert thresholds
  const { data: thresholds = { aqiEnabled: true, aqiLimit: 120, noiseEnabled: false, noiseLimit: 75, co2Enabled: false, co2Limit: 500 } } = useQuery({
    queryKey: ['thresholds'],
    queryFn: getAlertThresholds
  });

  // Save thresholds mutation
  const saveThresholdsMutation = useMutation({
    mutationFn: updateAlertThresholds,
    onSuccess: () => {
      queryClient.invalidateQueries(['thresholds']);
    }
  });

  // Fetch alert notifications logs (polls every 10 seconds for real-time notifications)
  const { data: alerts = [] } = useQuery({
    queryKey: ['alerts'],
    queryFn: getAlertLogs,
    refetchInterval: 10000
  });

  // Clear alerts mutation
  const clearAlertsMutation = useMutation({
    mutationFn: clearAlertLogs,
    onSuccess: () => {
      queryClient.invalidateQueries(['alerts']);
    }
  });

  // Ask for browser notification permission on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
  }, []);

  // Trigger Native browser push alerts when new alerts are added
  const [lastAlertCount, setLastAlertCount] = useState(0);
  useEffect(() => {
    if (alerts.length > lastAlertCount) {
      const newAlert = alerts[alerts.length - 1];
      if (Notification.permission === 'granted') {
        new Notification("Pollution AI Alert", {
          body: newAlert.message,
          icon: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png'
        });
      }
      setLastAlertCount(alerts.length);
    }
  }, [alerts, lastAlertCount]);

  // Handle autocomplete query geocoding
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length > 2) {
        try {
          const results = await searchLocations(searchQuery);
          setSearchResults(results);
        } catch (err) {
          console.error(err);
        }
      } else {
        setSearchResults([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Selection of searched city
  const handleSelectLocation = (loc) => {
    const newCoords = {
      lat: parseFloat(loc.lat),
      lon: parseFloat(loc.lon),
      name: loc.name
    };
    setCoords(newCoords);
    setSearchQuery('');
    setSearchResults([]);
    setShowHistory(false);
    
    saveSearchMutation.mutate(newCoords);
  };

  // Browser Geolocation
  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const name = `My Location`;
          const newLoc = { lat, lon, name };
          setCoords(newLoc);
          saveSearchMutation.mutate(newLoc);
        },
        (err) => {
          alert('Failed to get your location. Please check browser permissions.');
        }
      );
    }
  };

  // Helper values for Green Zone calculations
  const [greenZones, setGreenZones] = useState([]);
  const [heatIslands, setHeatIslands] = useState([]);

  // Generate green zones & heat island anomalies relative to map center
  useEffect(() => {
    if (!pollution) return;
    const baseLat = coords.lat;
    const baseLon = coords.lon;
    const baseAqi = pollution.aqi;
    const baseTemp = pollution.temp;
    const baseNoise = pollution.noise;

    setGreenZones([
      {
        name: 'Central Eco Park',
        lat: baseLat + 0.006,
        lon: baseLon - 0.005,
        aqi: Math.max(5, Math.round(baseAqi * 0.55)),
        noise: Math.max(30, Math.round(baseNoise * 0.65)),
        tempDiff: -2,
        score: Math.min(100, Math.round(100 - (baseAqi * 0.55 * 0.25) - (baseNoise * 0.65 * 0.3) + 5))
      },
      {
        name: 'Botanical Woodlands',
        lat: baseLat - 0.008,
        lon: baseLon + 0.007,
        aqi: Math.max(5, Math.round(baseAqi * 0.45)),
        noise: Math.max(30, Math.round(baseNoise * 0.55)),
        tempDiff: -3,
        score: Math.min(100, Math.round(100 - (baseAqi * 0.45 * 0.25) - (baseNoise * 0.55 * 0.3) + 8))
      }
    ]);

    setHeatIslands([
      {
        name: 'Industrial Corridor',
        lat: baseLat + 0.012,
        lon: baseLon + 0.012,
        aqi: Math.round(baseAqi * 1.6),
        noise: Math.round(baseNoise * 1.4),
        tempDiff: 4
      },
      {
        name: 'Commercial Hub',
        lat: baseLat - 0.004,
        lon: baseLon - 0.008,
        aqi: Math.round(baseAqi * 1.3),
        noise: Math.round(baseNoise * 1.25),
        tempDiff: 3
      }
    ]);
  }, [pollution, coords]);

  // AQI color scale descriptors (Light theme)
  const getAqiInfo = (val) => {
    if (val <= 50) return { label: 'Good', color: 'text-emerald-700', bg: 'bg-emerald-100', border: 'border-emerald-300', description: 'Air quality is satisfactory, and air pollution poses little or no risk.' };
    if (val <= 100) return { label: 'Moderate', color: 'text-amber-800', bg: 'bg-amber-100', border: 'border-amber-300', description: 'Air quality is acceptable. Sensitives may experience minor irritation.' };
    if (val <= 150) return { label: 'Unhealthy (Sensitives)', color: 'text-orange-800', bg: 'bg-orange-100', border: 'border-orange-300', description: 'Members of sensitive groups may experience health effects.' };
    if (val <= 200) return { label: 'Unhealthy', color: 'text-rose-800', bg: 'bg-rose-100', border: 'border-rose-300', description: 'Everyone may begin to experience health effects.' };
    return { label: 'Hazardous', color: 'text-purple-800', bg: 'bg-purple-100', border: 'border-purple-300', description: 'Health warnings of emergency conditions. The entire population is affected.' };
  };

  const getNoiseInfo = (val) => {
    if (val <= 45) return { label: 'Quiet', color: 'text-emerald-600', desc: 'Restful environment, perfect for sleep and concentration.' };
    if (val <= 60) return { label: 'Moderate', color: 'text-amber-600', desc: 'Normal conversation level, typical residential noise.' };
    if (val <= 75) return { label: 'Loud', color: 'text-orange-600', desc: 'Traffic noise or busy office. Annoying over long exposure.' };
    return { label: 'Harmful', color: 'text-rose-600', desc: 'Sustained exposure leads to risk of hearing impairment.' };
  };

  const getCo2Info = (val) => {
    if (val <= 400) return { label: 'Excellent', color: 'text-emerald-600', desc: 'Typical outdoor baseline air quality level.' };
    if (val <= 450) return { label: 'Normal', color: 'text-emerald-600', desc: 'Standard ambient outdoor air with moderate traffic.' };
    if (val <= 600) return { label: 'Elevated', color: 'text-amber-600', desc: 'High concentration, commonly found in congested city centers.' };
    return { label: 'Stuffy', color: 'text-rose-600', desc: 'Heavy traffic or indoor stagnation. Can cause minor drowsiness.' };
  };

  // Pollen status descriptors
  const getPollenStatus = (val) => {
    if (val < 15) return { label: 'Low', color: 'text-emerald-600' };
    if (val < 50) return { label: 'Moderate', color: 'text-amber-600' };
    return { label: 'High', color: 'text-rose-600 font-bold' };
  };

  // UV status descriptors
  const getUvStatus = (val) => {
    if (val <= 2) return { label: 'Low', color: 'text-emerald-600', advice: 'Safe to stay outdoors.' };
    if (val <= 5) return { label: 'Moderate', color: 'text-amber-600', advice: 'Wear hat & sunglasses. Seek shade.' };
    if (val <= 7) return { label: 'High', color: 'text-orange-600', advice: 'Apply SPF 30+ sunscreen. Cover up.' };
    return { label: 'Very High', color: 'text-rose-600 font-bold', advice: 'Limit sun exposure between 10 AM - 4 PM.' };
  };

  const unreadAlerts = alerts.filter(a => !a.read);
  const aqiInfo = pollution ? getAqiInfo(pollution.aqi) : getAqiInfo(0);

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      
      {/* Header Panel */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 glass-panel p-6 rounded-2xl relative overflow-hidden">
        {/* Atmosphere decoration */}
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-sky-500/10 blur-3xl" />
        
        <div className="flex items-center space-x-3 z-10">
          <div className="p-2.5 bg-gradient-to-tr from-emerald-500 to-teal-500 text-white rounded-xl shadow-md shadow-emerald-500/20">
            <Wind className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
              Pollution AI
            </h1>
            <p className="text-xs text-slate-500 font-medium">Intelligence & Predictive Health Monitor</p>
          </div>
        </div>

        {/* Toolbar: Notification log bell and Search query */}
        <div className="w-full md:w-auto flex items-center gap-3 relative z-50">
          
          {/* Notification bell */}
          <div className="relative">
            <button
              onClick={() => {
                setShowAlertLogs(!showAlertLogs);
                setShowAlertSettings(false);
                if (!showAlertLogs) {
                  // Mark as read on open
                  clearAlertsMutation.mutate();
                }
              }}
              className="p-2.5 rounded-xl glass-input hover:bg-slate-200/60 transition flex items-center justify-center text-slate-700 relative"
            >
              <Bell className="w-4 h-4" />
              {unreadAlerts.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[8px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center animate-bounce shadow">
                  {unreadAlerts.length}
                </span>
              )}
            </button>

            {/* Notification logs list dropdown */}
            {showAlertLogs && (
              <div className="absolute right-0 mt-2 w-80 glass-panel-heavy rounded-xl overflow-hidden shadow-xl z-50 divide-y divide-slate-100 border border-slate-200">
                <div className="px-3 py-2 bg-slate-50 flex justify-between items-center text-[10px] text-slate-500 font-bold border-b border-slate-200">
                  <span>Environmental Alerts Log</span>
                  <button 
                    onClick={() => clearAlertsMutation.mutate()}
                    className="hover:text-slate-800 text-slate-500"
                  >
                    Clear All
                  </button>
                </div>
                <div className="max-h-60 overflow-y-auto divide-y divide-slate-100">
                  {alerts.length > 0 ? (
                    alerts.slice().reverse().map((al) => (
                      <div key={al.id} className="p-3 text-xs hover:bg-slate-50 transition flex items-start space-x-2">
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-slate-800 font-semibold">{al.message}</p>
                          <span className="text-[9px] text-slate-400">{new Date(al.timestamp).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center text-xs text-slate-400 flex flex-col items-center gap-1.5">
                      <BellOff className="w-5 h-5 text-slate-400" />
                      <span>No active threshold alerts.</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Settings panel trigger */}
          <div>
            <button
              onClick={() => {
                setShowAlertSettings(!showAlertSettings);
                setShowAlertLogs(false);
              }}
              className="p-2.5 rounded-xl glass-input hover:bg-slate-200/60 transition flex items-center justify-center text-slate-700"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Settings panel details */}
            {showAlertSettings && (
              <div className="absolute right-0 mt-2 w-72 glass-panel-heavy p-4 rounded-xl shadow-xl z-50 border border-slate-200 text-xs space-y-3.5 text-slate-800">
                <h4 className="font-bold text-slate-900 uppercase tracking-widest text-[10px] border-b border-slate-200 pb-1.5">Alert Thresholds Settings</h4>
                
                <div className="space-y-3">
                  {/* AQI Setting */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-700 font-medium">AQI limit trigger</label>
                      <input 
                        type="checkbox" 
                        checked={thresholds.aqiEnabled}
                        onChange={(e) => saveThresholdsMutation.mutate({ ...thresholds, aqiEnabled: e.target.checked })}
                      />
                    </div>
                    {thresholds.aqiEnabled && (
                      <input 
                        type="range" min="30" max="250" value={thresholds.aqiLimit}
                        onChange={(e) => saveThresholdsMutation.mutate({ ...thresholds, aqiLimit: parseInt(e.target.value) })}
                        className="w-full accent-emerald-600"
                      />
                    )}
                    <span className="text-[10px] text-slate-500 block text-right">AQI: {thresholds.aqiLimit}</span>
                  </div>

                  {/* Noise Setting */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-700 font-medium">Noise decibel limit</label>
                      <input 
                        type="checkbox" 
                        checked={thresholds.noiseEnabled}
                        onChange={(e) => saveThresholdsMutation.mutate({ ...thresholds, noiseEnabled: e.target.checked })}
                      />
                    </div>
                    {thresholds.noiseEnabled && (
                      <input 
                        type="range" min="40" max="95" value={thresholds.noiseLimit}
                        onChange={(e) => saveThresholdsMutation.mutate({ ...thresholds, noiseLimit: parseInt(e.target.value) })}
                        className="w-full accent-emerald-600"
                      />
                    )}
                    <span className="text-[10px] text-slate-500 block text-right">Noise: {thresholds.noiseLimit} dB</span>
                  </div>

                  {/* CO2 Setting */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-700 font-medium">CO₂ greenhouse limit</label>
                      <input 
                        type="checkbox" 
                        checked={thresholds.co2Enabled}
                        onChange={(e) => saveThresholdsMutation.mutate({ ...thresholds, co2Enabled: e.target.checked })}
                      />
                    </div>
                    {thresholds.co2Enabled && (
                      <input 
                        type="range" min="400" max="800" value={thresholds.co2Limit}
                        onChange={(e) => saveThresholdsMutation.mutate({ ...thresholds, co2Limit: parseInt(e.target.value) })}
                        className="w-full accent-emerald-600"
                      />
                    )}
                    <span className="text-[10px] text-slate-500 block text-right">CO₂: {thresholds.co2Limit} ppm</span>
                  </div>
                </div>

                <div className="text-[9px] text-slate-500 leading-relaxed border-t border-slate-100 pt-2">
                  Triggers native browser notifications when coordinates poll above these limits.
                </div>
              </div>
            )}
          </div>

          {/* Search bar */}
          <div className="w-56 md:w-72 relative">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search city (e.g. London)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowHistory(true)}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-xl glass-input placeholder-slate-400 text-slate-900"
                />
                {searchResults.length > 0 && (
                  <div className="absolute w-full mt-2 glass-panel-heavy rounded-xl overflow-hidden shadow-xl z-50 divide-y divide-slate-100 border border-slate-200">
                    {searchResults.map((res, index) => (
                      <button
                        key={index}
                        onClick={() => handleSelectLocation(res)}
                        className="w-full text-left px-4 py-2.5 text-xs hover:bg-slate-50 flex items-center space-x-2 transition"
                      >
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate text-slate-800">{res.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={handleUseMyLocation}
                title="Use current location"
                className="p-2.5 rounded-xl glass-input hover:bg-slate-200/60 transition shrink-0 flex items-center justify-center text-slate-700"
              >
                <MapPin className="w-4 h-4 text-emerald-600" />
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Main Grid */}
      {isPollutionLoading ? (
        <div className="flex-1 flex flex-col justify-center items-center py-20 space-y-4">
          <RefreshCw className="w-10 h-10 text-emerald-400 animate-spin" />
          <p className="text-sm text-slate-400">Aggregating environmental coordinates...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* LEFT COLUMN: Personal health score, Metric Cards, Visualizers */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Personal Health Risk Score Card (Above AQI numbers) */}
            {pollution && (
              <HealthRiskCard 
                aqi={pollution.aqi}
                pm25={pollution.pm25}
                no2={pollution.no2}
                co2={pollution.co2}
                noise={pollution.noise}
                temp={pollution.temp}
                uvIndex={pollution.uvIndex}
                pollen={pollution.pollen}
              />
            )}

            {/* Wildfire smoke warning banner */}
            {pollution && pollution.fires && pollution.fires.length > 0 && (
              <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl flex items-start space-x-3 text-xs text-rose-800">
                <Flame className="w-5 h-5 text-rose-600 shrink-0 animate-pulse mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-rose-900">NASA FIRMS: Wildfire Hotspot Detected!</span>
                  <p className="text-[11px] leading-relaxed text-rose-700">
                    Active thermal anomaly detected within 30km ({pollution.fires[0].name}). Translucent smoke plumes are projected downwind. Avoid breathing outdoor air in the downwind corridor.
                  </p>
                </div>
              </div>
            )}

            {/* Standard Metrics cards (AQI, CO2, Noise, Heat, Pollen, UV) */}
            {pollution && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. Generic AQI Card */}
                <div className="glass-panel p-5 rounded-2xl relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Air Quality (AQI)</span>
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${aqiInfo.bg} ${aqiInfo.color} border ${aqiInfo.border}`}>
                      {aqiInfo.label}
                    </span>
                  </div>
                  <div className="mt-4 flex items-baseline space-x-2">
                    <span className="text-4xl font-extrabold text-slate-900 tracking-tight">{pollution.aqi}</span>
                    <span className="text-xs text-slate-500 font-medium">US-AQI</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-4 overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 transition-all duration-1000"
                      style={{ width: `${Math.min(100, (pollution.aqi / 300) * 100)}%` }}
                    />
                  </div>
                  <div className="mt-4 border-t border-slate-200/80 pt-3 grid grid-cols-3 gap-2 text-center text-xs">
                    <div>
                      <div className="text-[10px] text-slate-500">PM2.5</div>
                      <div className="font-bold text-slate-800">{pollution.pm25}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500">PM10</div>
                      <div className="font-bold text-slate-800">{pollution.pm10}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500">NO₂</div>
                      <div className="font-bold text-slate-800">{pollution.no2}</div>
                    </div>
                  </div>
                </div>

                {/* 2. Pollen index card */}
                {pollution.pollen && (
                  <div className="glass-panel p-5 rounded-2xl relative overflow-hidden">
                    <div className="flex justify-between items-start">
                      <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Pollen Allergen Index</span>
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700`}>
                        Allergens
                      </span>
                    </div>
                    <div className="mt-4 flex items-baseline space-x-2">
                      <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                        {pollution.pollen.tree + pollution.pollen.grass + pollution.pollen.weed}
                      </span>
                      <span className="text-xs text-slate-500">grains/m³</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full mt-4 overflow-hidden">
                      <div 
                        className="h-full bg-amber-500 transition-all duration-1000"
                        style={{ width: `${Math.min(100, ((pollution.pollen.tree + pollution.pollen.grass + pollution.pollen.weed) / 150) * 100)}%` }}
                      />
                    </div>
                    <div className="mt-4 border-t border-slate-200/80 pt-3 grid grid-cols-3 gap-2 text-center text-xs">
                      <div>
                        <div className="text-[10px] text-slate-500">Tree</div>
                        <div className={`font-bold ${getPollenStatus(pollution.pollen.tree).color}`}>
                          {pollution.pollen.tree}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500">Grass</div>
                        <div className={`font-bold ${getPollenStatus(pollution.pollen.grass).color}`}>
                          {pollution.pollen.grass}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500">Weed</div>
                        <div className={`font-bold ${getPollenStatus(pollution.pollen.weed).color}`}>
                          {pollution.pollen.weed}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. UV Index card */}
                <div className="glass-panel p-5 rounded-2xl relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Solar Radiation (UV Index)</span>
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                      {getUvStatus(pollution.uvIndex).label}
                    </span>
                  </div>
                  <div className="mt-4 flex items-baseline space-x-2">
                    <span className="text-4xl font-extrabold text-slate-900 tracking-tight">{pollution.uvIndex}</span>
                    <span className="text-xs text-slate-500">of 11+ (SPF advised)</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-4 overflow-hidden">
                    <div 
                      className="h-full bg-amber-500 transition-all duration-1000"
                      style={{ width: `${Math.min(100, (pollution.uvIndex / 11) * 100)}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-600 mt-3 leading-relaxed flex items-center gap-1.5 font-medium">
                    <Sun className="w-3.5 h-3.5 text-amber-600" />
                    <span>{getUvStatus(pollution.uvIndex).advice}</span>
                  </p>
                </div>

                {/* 4. Acoustic noise card */}
                <div className="glass-panel p-5 rounded-2xl relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Acoustic Levels</span>
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-300">
                      {getNoiseInfo(pollution.noise).label}
                    </span>
                  </div>
                  <div className="mt-4 flex items-baseline space-x-2">
                    <span className="text-4xl font-extrabold text-slate-900 tracking-tight">{pollution.noise}</span>
                    <span className="text-xs text-slate-500">decibels (dB)</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-4 overflow-hidden">
                    <div 
                      className="h-full bg-sky-500 transition-all duration-1000"
                      style={{ width: `${Math.min(100, (pollution.noise / 100) * 100)}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-600 mt-3 leading-relaxed font-medium">{getNoiseInfo(pollution.noise).desc}</p>
                </div>

              </div>
            )}

            {/* Visualizer Block (Three tabs: 3D visual, 2D map, Historical Trends) */}
            <div className="glass-panel p-5 rounded-2xl space-y-4">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <div>
                  <h3 className="font-bold text-slate-900">Environmental Visualizer Matrix</h3>
                  <p className="text-[10px] text-slate-500">Map layers, 3D grids, and historical week/month charts</p>
                </div>
                <div className="flex space-x-1.5 bg-slate-200/80 p-1 rounded-lg border border-slate-300">
                  <button
                    onClick={() => setActiveTab('3d')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-md flex items-center space-x-1.5 transition-all ${
                      activeTab === '3d' 
                        ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <BarChart2 className="w-3.5 h-3.5" />
                    <span>3D View</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('2d')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-md flex items-center space-x-1.5 transition-all ${
                      activeTab === '2d' 
                        ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>2D GIS Map</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('trends')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-md flex items-center space-x-1.5 transition-all ${
                      activeTab === 'trends' 
                        ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Historical Trends</span>
                  </button>
                </div>
              </div>

              {/* Viewport Box */}
              <div className="w-full h-[400px] relative rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                {pollution && activeTab === '3d' && (
                  <ThreeCanvas 
                    aqi={pollution.aqi} 
                    temp={pollution.temp}
                    windSpeed={pollution.windSpeed} 
                    windDeg={pollution.windDeg}
                    pm25={pollution.pm25}
                    pm10={pollution.pm10}
                  />
                )}
                
                {pollution && activeTab === '2d' && (
                  <MapView 
                    center={[coords.lat, coords.lon]} 
                    locationName={coords.name} 
                    aqi={pollution.aqi}
                    greenZones={greenZones}
                    heatIslands={heatIslands}
                    onLocationChange={(newLat, newLon) => {
                      setCoords({
                        lat: parseFloat(newLat),
                        lon: parseFloat(newLon),
                        name: `Measured Coord (${newLat.toFixed(3)}, ${newLon.toFixed(3)})`
                      });
                    }}
                    // Wildfire & wind props
                    fires={pollution.fires}
                    windDeg={pollution.windDeg}
                  />
                )}

                {activeTab === 'trends' && (
                  <div className="p-2 w-full h-full overflow-y-auto">
                    <TrendsReport lat={coords.lat} lon={coords.lon} />
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Weather correlations & Green Zone analysis */}
          <div className="space-y-6">

            {/* Weather Correlation Widget */}
            {pollution && (
              <div className="glass-panel p-5 rounded-2xl relative overflow-hidden">
                <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                  <Wind className="w-4 h-4 text-emerald-600" />
                  <span>Weather Correlation</span>
                </h3>
                <p className="text-[10px] text-slate-500 mt-0.5">Atmospheric pressure, dispersion, and heat dynamics</p>
                
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center space-x-3">
                    <Thermometer className="w-5 h-5 text-rose-500 shrink-0" />
                    <div>
                      <div className="text-[9px] text-slate-500">Temperature</div>
                      <div className="text-sm font-bold text-slate-900">{pollution.temp}°C</div>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center space-x-3">
                    <Droplets className="w-5 h-5 text-sky-500 shrink-0" />
                    <div>
                      <div className="text-[9px] text-slate-500">Humidity</div>
                      <div className="text-sm font-bold text-slate-900">{pollution.humidity}%</div>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center space-x-3">
                    <Compass className="w-5 h-5 text-teal-500 shrink-0" />
                    <div>
                      <div className="text-[9px] text-slate-500">Wind Direction</div>
                      <div className="text-sm font-bold text-slate-900">{pollution.windDeg}° (N)</div>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center space-x-3">
                    <Wind className="w-5 h-5 text-emerald-500 shrink-0" />
                    <div>
                      <div className="text-[9px] text-slate-500">Wind Speed</div>
                      <div className="text-sm font-bold text-slate-900">{pollution.windSpeed} m/s</div>
                    </div>
                  </div>
                </div>

                <div className="mt-3.5 p-2.5 bg-sky-50 rounded-lg border border-sky-200 text-[10px] text-sky-900 leading-relaxed flex items-start space-x-2">
                  <Info className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                  <span>
                    {pollution.windSpeed > 5 
                      ? 'High wind velocity (dispersion active). Pollution is blowing away from the emission center, lowering current AQI concentration.' 
                      : 'Low wind velocity (stagnation active). Pollutants are accumulating near local heat islands and roadways.'}
                  </span>
                </div>
              </div>
            )}

            {/* Green Zone Recommendation Panel */}
            <div className="glass-panel p-5 rounded-2xl relative">
              <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                <Trees className="w-4 h-4 text-emerald-600" />
                <span>Green Zone Analysis</span>
              </h3>
              <p className="text-[10px] text-slate-500 mt-0.5">Safest areas nearby categorized by composite health score</p>

              <div className="mt-4 space-y-3">
                {greenZones.map((zone, idx) => (
                  <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 hover:border-emerald-300 transition group shadow-sm">
                    <div className="flex justify-between items-start mb-1.5">
                      <h4 className="font-semibold text-xs text-slate-800 group-hover:text-emerald-700 transition">{zone.name}</h4>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                        Score {zone.score}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-1 rounded-full mb-2.5">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${zone.score}%` }} />
                    </div>
                    <div className="grid grid-cols-3 gap-1 text-[9px] text-slate-500">
                      <div>AQI: <span className="font-bold text-slate-800">{zone.aqi}</span></div>
                      <div>Noise: <span className="font-bold text-slate-800">{zone.noise} dB</span></div>
                      <div>Temp: <span className="font-bold text-emerald-600">{zone.tempDiff}°C</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
