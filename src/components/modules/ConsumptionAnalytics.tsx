import React from 'react';
import { TelemetryStats, DistrictBuilding } from '../../types/powerGrid';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { TrendingUp, PieChart, Zap, Activity, Building2, ShieldCheck, Sun } from 'lucide-react';

interface ConsumptionAnalyticsProps {
  telemetry: TelemetryStats;
  buildings: DistrictBuilding[];
  timeOfDayHours: number;
}

export const ConsumptionAnalytics: React.FC<ConsumptionAnalyticsProps> = ({
  telemetry,
  buildings,
  timeOfDayHours
}) => {
  // Generate 24-hour simulated curve data for Recharts
  const hourlyData = React.useMemo(() => {
    const data = [];
    for (let h = 0; h < 24; h += 2) {
      const sunFactor = Math.max(0, Math.sin(((h - 6) / 12) * Math.PI));
      const solar = Math.round(240 * sunFactor);
      const wind = Math.round(140 + Math.sin(h / 3) * 30);
      const hydro = 110;
      const thermal = h >= 18 && h <= 22 ? 80 : 25;
      const demand = Math.round(360 + Math.sin((h - 8) / 4) * 120 + (h >= 17 && h <= 21 ? 90 : 0));

      data.push({
        time: `${h === 0 ? '12' : h > 12 ? h - 12 : h} ${h >= 12 ? 'PM' : 'AM'}`,
        Solar: solar,
        Wind: wind,
        Hydro: hydro,
        Thermal: thermal,
        TotalGeneration: solar + wind + hydro + thermal,
        Demand: demand
      });
    }
    return data;
  }, []);

  const districtData = buildings.map(b => ({
    name: b.name.replace(' District', '').replace(' Campus', '').replace(' Towers', ''),
    Demand: b.demandMW,
    Supplied: b.suppliedMW,
    PowerPct: b.powerPct
  }));

  return (
    <div className="space-y-6">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <PieChart className="w-6 h-6 text-cyan-600" />
            Grid Consumption Analytics & AI Predictive Demand
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Real-time supply vs demand dynamics, district level power breakdown, and 24-hour predictive load forecasting.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-2 rounded-xl border border-emerald-200">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <span>Grid Efficiency: 98.4%</span>
        </div>
      </div>

      {/* 24-Hour Supply vs Demand Area Chart */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">24-Hour Electricity Supply vs Demand Curve</h3>
            <p className="text-xs text-slate-500">Generation composition (Solar, Wind, Hydro, Thermal) vs City Load Demand (MW)</p>
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <span className="flex items-center space-x-1">
              <span className="w-3 h-3 bg-amber-400 rounded"></span>
              <span className="text-slate-600">Solar</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-3 h-3 bg-cyan-400 rounded"></span>
              <span className="text-slate-600">Wind</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-3 h-3 bg-red-400 rounded"></span>
              <span className="text-slate-600">City Demand</span>
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hourlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorWind" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} unit=" MW" />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="Solar" stackId="1" stroke="#f59e0b" fillOpacity={1} fill="url(#colorSolar)" />
              <Area type="monotone" dataKey="Wind" stackId="1" stroke="#06b6d4" fillOpacity={1} fill="url(#colorWind)" />
              <Area type="monotone" dataKey="Demand" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorDemand)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* District Load Breakdown Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">District Power Consumption Breakdown</h3>
          <p className="text-xs text-slate-500">Demanded MW vs Actual Supplied MW per city sector</p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districtData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} interval={0} angle={-15} textAnchor="end" />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="Demand" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Supplied" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Load Forecast Insights */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center space-x-2 text-cyan-600">
              <Zap className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900">AI Predictive Load Insights</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Machine learning forecasting engine trained on 5 years of municipal grid telemetry.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-3">
              <Activity className="w-4 h-4 text-cyan-600 mt-0.5" />
              <div>
                <strong className="text-slate-800">Peak Evening Surge Prediction:</strong>
                <p className="text-slate-500 mt-0.5">
                  Residential consumption expected to rise by +28% at 7:00 PM. BESS auto-discharge programmed.
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-3">
              <Sun className="w-4 h-4 text-amber-500 mt-0.5" />
              <div>
                <strong className="text-slate-800">Solar Ramp-Down Protection:</strong>
                <p className="text-slate-500 mt-0.5">
                  Sunset transition smoothly buffered by Cascade Hydro ramp-up to maintain 60.0Hz grid frequency.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs font-semibold">
            🌱 Carbon Neutrality Goal: 84.2% Clean Energy achieved over last 24 hours.
          </div>
        </div>

      </div>

    </div>
  );
};
