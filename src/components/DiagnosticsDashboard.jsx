import React, { useState } from 'react';
import { 
  LineChart as LineIcon, 
  Thermometer, 
  Activity, 
  Zap, 
  Gauge, 
  Battery, 
  Clock, 
  SlidersHorizontal,
  Droplet,
  Fan
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { mockDiagnosticsTrendData } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const DiagnosticsDashboard = () => {
  const { diagnosticsTimeRange, setDiagnosticsTimeRange, isLiveStreaming, assets } = useApp();
  const [selectedAssetId, setSelectedAssetId] = useState('PMP-202');

  const timeRanges = ['Live', '24 Hours', '7 Days', '30 Days', '1 Year'];

  const chartData = mockDiagnosticsTrendData[diagnosticsTimeRange] || mockDiagnosticsTrendData['Live'];
  const currentAsset = assets.find((a) => a.id === selectedAssetId) || assets[0];

  return (
    <div className="space-y-6">
      
      {/* Header & Range Selector */}
      <div className="card-enterprise p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Multi-Parametric Diagnostics Dashboard</h2>
          <p className="text-xs text-slate-500 mt-1">
            Analyze time-series telemetry trends for thermal, mechanical vibration, electrical power quality, and fluid dynamics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          
          {/* Target Asset Selector */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs">
            <span className="text-slate-500 font-semibold">Target Asset:</span>
            <select
              value={selectedAssetId}
              onChange={(e) => setSelectedAssetId(e.target.value)}
              className="bg-transparent border-none p-0 focus:ring-0 font-bold text-slate-900 cursor-pointer"
            >
              {assets.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.id} - {a.name}
                </option>
              ))}
            </select>
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
            {timeRanges.map((range) => (
              <button
                key={range}
                onClick={() => setDiagnosticsTimeRange(range)}
                className={`text-xs px-3 py-1 rounded-md font-semibold transition ${
                  diagnosticsTimeRange === range
                    ? 'bg-white text-blue-600 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Grid of 4 Core Multi-Metric Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Thermal & Vibration Trend */}
        <div className="card-enterprise p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-red-500" /> Temperature (°C) & Vibration (mm/s)
              </h3>
              <p className="text-[11px] text-slate-400">High-frequency thermal drift and bearing vibration frequency</p>
            </div>
            <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              Limit: 80°C / 7.0 mm/s
            </span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', pt: '10px' }} />
                <Area type="monotone" dataKey="temperature" name="Temperature (°C)" stroke="#ef4444" fill="#fee2e2" fillOpacity={0.6} strokeWidth={2} />
                <Line type="monotone" dataKey="vibration" name="Vibration (mm/s)" stroke="#2563eb" strokeWidth={2.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Voltage Stability & Current Trend */}
        <div className="card-enterprise p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" /> Voltage (V) & Current Draw (A)
              </h3>
              <p className="text-[11px] text-slate-400">Power quality stability and phase load balancing</p>
            </div>
            <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              THD: 0.8%
            </span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis yAxisId="left" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', pt: '10px' }} />
                <Line yAxisId="left" type="monotone" dataKey="voltage" name="Voltage (V)" stroke="#f59e0b" strokeWidth={2} dot={false} />
                <Line yAxisId="right" type="monotone" dataKey="current" name="Current (A)" stroke="#6366f1" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Pressure Monitoring & Motor RPM */}
        <div className="card-enterprise p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Gauge className="w-4 h-4 text-emerald-600" /> Hydraulic Pressure & Motor Shaft RPM
              </h3>
              <p className="text-[11px] text-slate-400">Pump discharge pressure (PSI/bar) & rotational speed</p>
            </div>
            <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              Rated: 1,750 RPM
            </span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis yAxisId="left" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', pt: '10px' }} />
                <Line yAxisId="left" type="monotone" dataKey="pressure" name="Pressure (bar)" stroke="#10b981" strokeWidth={2} dot={false} />
                <Line yAxisId="right" type="monotone" dataKey="rpm" name="Motor RPM" stroke="#0ea5e9" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Battery Degradation & Cooling Efficiency */}
        <div className="card-enterprise p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Battery className="w-4 h-4 text-purple-600" /> Battery Health (%) & Cooling Efficiency (%)
              </h3>
              <p className="text-[11px] text-slate-400">State of Health (SoH) degradation curve and HVAC chiller performance</p>
            </div>
            <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              SoH Baseline: 100%
            </span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', pt: '10px' }} />
                <Area type="monotone" dataKey="batteryDegradation" name="Battery SoH (%)" stroke="#8b5cf6" fill="#f3e8ff" fillOpacity={0.5} strokeWidth={2} />
                <Line type="monotone" dataKey="coolingEfficiency" name="Cooling Efficiency (%)" stroke="#06b6d4" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
