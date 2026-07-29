import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Droplets, 
  Sun, 
  BatteryCharging, 
  Car, 
  Trash2, 
  Wind, 
  Building2, 
  Users, 
  CloudSun,
  Activity,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

export const LiveMonitoring = () => {
  const [isLiveStreaming, setIsLiveStreaming] = useState(true);
  const [telemetryTicks, setTelemetryTicks] = useState(0);

  // Live updating telemetry simulated state
  const [electricityFlow, setElectricityFlow] = useState(485.2);
  const [waterFlow, setWaterFlow] = useState(1450);
  const [solarGen, setSolarGen] = useState(50.9);
  const [bessSoc, setBessSoc] = useState(84);
  const [evActiveSessions, setEvActiveSessions] = useState(28);
  const [aqiIndex, setAqiIndex] = useState(38);

  useEffect(() => {
    if (!isLiveStreaming) return;
    const interval = setInterval(() => {
      setTelemetryTicks(t => t + 1);
      setElectricityFlow(prev => parseFloat((prev + (Math.random() * 4 - 2)).toFixed(1)));
      setWaterFlow(prev => Math.floor(prev + (Math.random() * 20 - 10)));
      setSolarGen(prev => parseFloat((prev + (Math.random() * 1.5 - 0.75)).toFixed(1)));
      setEvActiveSessions(prev => Math.min(Math.max(prev + Math.floor(Math.random() * 3 - 1), 10), 50));
    }, 2000);
    return () => clearInterval(interval);
  }, [isLiveStreaming]);

  const LIVE_CHART_DATA = [
    { time: '14:00', electricity: 472, water: 1410, solar: 48, aqi: 35 },
    { time: '14:10', electricity: 478, water: 1425, solar: 49, aqi: 36 },
    { time: '14:20', electricity: 482, water: 1438, solar: 50, aqi: 37 },
    { time: '14:30', electricity: 485, water: 1450, solar: 51, aqi: 38 },
    { time: '14:40', electricity: electricityFlow, water: waterFlow, solar: solarGen, aqi: aqiIndex }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Control Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700 }}>
            Live City Infrastructure Monitoring
          </h2>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            Real-time telemetry feeds synchronized across smart grid, water, solar, EV, and environmental sensors.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.8rem',
            fontWeight: 600
          }}>
            <span className={`pulse-dot ${isLiveStreaming ? 'green' : 'red'}`}></span>
            {isLiveStreaming ? 'Live Streaming (2s)' : 'Paused'}
          </div>

          <button 
            className="btn btn-secondary"
            onClick={() => setIsLiveStreaming(!isLiveStreaming)}
          >
            {isLiveStreaming ? <Pause size={14} /> : <Play size={14} />}
            {isLiveStreaming ? 'Pause Feed' : 'Resume Feed'}
          </button>
        </div>
      </div>

      {/* 10 Live Telemetry Stat Widgets */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '14px'
      }}>
        {/* Electricity Flow */}
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Electricity Flow</span>
            <Zap size={18} style={{ color: 'var(--accent-blue)' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800 }}>
            {electricityFlow} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>MW</span>
          </div>
          <div style={{ fontSize: '0.725rem', color: 'var(--accent-green)', fontWeight: 600, marginTop: '4px' }}>
            ● Grid Balanced (60.0 Hz)
          </div>
        </div>

        {/* Water Flow */}
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Water Flow</span>
            <Droplets size={18} style={{ color: '#06b6d4' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800 }}>
            {waterFlow} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>MGD</span>
          </div>
          <div style={{ fontSize: '0.725rem', color: 'var(--accent-red)', fontWeight: 600, marginTop: '4px' }}>
            ▲ Anomaly in District 5
          </div>
        </div>

        {/* Solar Generation */}
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Solar Generation</span>
            <Sun size={18} style={{ color: '#eab308' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800 }}>
            {solarGen} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>MW</span>
          </div>
          <div style={{ fontSize: '0.725rem', color: 'var(--accent-green)', fontWeight: 600, marginTop: '4px' }}>
            ▲ Peak Efficiency 22.4%
          </div>
        </div>

        {/* Battery BESS */}
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Battery Storage</span>
            <BatteryCharging size={18} style={{ color: '#84cc16' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800 }}>
            {bessSoc}% <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>SOC</span>
          </div>
          <div style={{ fontSize: '0.725rem', color: 'var(--accent-blue)', fontWeight: 600, marginTop: '4px' }}>
            ⚡ Charging +15 MW
          </div>
        </div>

        {/* EV Charging */}
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>EV Charging</span>
            <Car size={18} style={{ color: '#10b981' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800 }}>
            {evActiveSessions} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Bays</span>
          </div>
          <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            2.25 MW total draw
          </div>
        </div>

        {/* Waste Collection */}
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Waste Status</span>
            <Trash2 size={18} style={{ color: '#f97316' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800 }}>
            64.8% <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Fill Avg</span>
          </div>
          <div style={{ fontSize: '0.725rem', color: 'var(--accent-orange)', fontWeight: 600, marginTop: '4px' }}>
            14 Bins Need Pickup
          </div>
        </div>

        {/* AQI */}
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Air Quality</span>
            <Wind size={18} style={{ color: '#14b8a6' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800 }}>
            AQI {aqiIndex} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Good</span>
          </div>
          <div style={{ fontSize: '0.725rem', color: 'var(--accent-green)', fontWeight: 600, marginTop: '4px' }}>
            PM2.5: 12 µg/m³
          </div>
        </div>

        {/* Building Consumption */}
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Building HVAC</span>
            <Building2 size={18} style={{ color: '#6366f1' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800 }}>
            218.4 <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>MW</span>
          </div>
          <div style={{ fontSize: '0.725rem', color: 'var(--accent-green)', fontWeight: 600, marginTop: '4px' }}>
            450 Towers Smart HVAC
          </div>
        </div>

        {/* Population Demand */}
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Population Load</span>
            <Users size={18} style={{ color: '#8b5cf6' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800 }}>
            842,000 <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Citizens</span>
          </div>
          <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Peak evening load ahead
          </div>
        </div>

        {/* Weather */}
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Weather</span>
            <CloudSun size={18} style={{ color: '#f59e0b' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800 }}>
            26.8°C <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Clear</span>
          </div>
          <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Solar Irradiance: 980 W/m²
          </div>
        </div>
      </div>

      {/* Live Stream Telemetry Chart */}
      <div className="card" style={{ padding: '20px' }}>
        <h3 className="card-title" style={{ marginBottom: '16px' }}>
          <Activity size={18} style={{ color: 'var(--accent-blue)' }} /> Real-Time Telemetry Stream (Electricity vs Solar Generation)
        </h3>
        <div style={{ width: '100%', height: '280px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={LIVE_CHART_DATA}>
              <defs>
                <linearGradient id="colorElectricity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eab308" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              <Area type="monotone" dataKey="electricity" name="City Demand (MW)" stroke="#0284c7" fillOpacity={1} fill="url(#colorElectricity)" />
              <Area type="monotone" dataKey="solar" name="Solar Gen (MW)" stroke="#eab308" fillOpacity={1} fill="url(#colorSolar)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
