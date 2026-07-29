import React from 'react';
import { SUSTAINABILITY_METRICS } from '../../data/predictiveData';
import { Globe2, Sun, Leaf, Droplets, Trash2, Wind, Zap, Award, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const SustainabilityDashboard = () => {
  const m = SUSTAINABILITY_METRICS;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Globe2 size={24} style={{ color: 'var(--accent-green)' }} /> Smart City Sustainability & Decarbonization Dashboard
          </h2>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            Real-time tracking of renewable energy mix, carbon offset, resource conservation, and ESG compliance.
          </p>
        </div>

        <div className="badge badge-green" style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
          <Award size={14} /> ISO 50001 & Net-Zero Certified
        </div>
      </div>

      {/* 8 Sustainability KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '14px'
      }}>
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sun size={16} style={{ color: '#eab308' }} /> Renewable Energy %
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
            {m.renewableEnergyPercent}%
          </div>
          <div style={{ fontSize: '0.725rem', color: 'var(--accent-green)', marginTop: '2px', fontWeight: 600 }}>
            +4.8% vs last month
          </div>
        </div>

        <div className="card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Leaf size={16} style={{ color: 'var(--accent-green)' }} /> Carbon Emissions
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
            {m.carbonEmissionsHourly} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>tCO2e/h</span>
          </div>
          <div style={{ fontSize: '0.725rem', color: 'var(--accent-green)', marginTop: '2px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
            <ArrowDownRight size={12} /> {m.carbonEmissionsReductionPct}% Reduction
          </div>
        </div>

        <div className="card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Zap size={16} style={{ color: 'var(--accent-blue)' }} /> Clean Energy Saved
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
            {m.energySavedMWh} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>MWh</span>
          </div>
          <div style={{ fontSize: '0.725rem', color: 'var(--accent-blue)', marginTop: '2px', fontWeight: 600 }}>
            Saved via AI Peak Shaving
          </div>
        </div>

        <div className="card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Droplets size={16} style={{ color: '#06b6d4' }} /> Water Conserved
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
            850 <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>kGal</span>
          </div>
          <div style={{ fontSize: '0.725rem', color: 'var(--accent-green)', marginTop: '2px', fontWeight: 600 }}>
            Smart Pump Optimization
          </div>
        </div>

        <div className="card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Trash2 size={16} style={{ color: '#f97316' }} /> Waste Recycled %
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
            {m.wasteRecycledPct}%
          </div>
          <div style={{ fontSize: '0.725rem', color: 'var(--accent-green)', marginTop: '2px', fontWeight: 600 }}>
            Circular Economy Target Met
          </div>
        </div>

        <div className="card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Wind size={16} style={{ color: '#14b8a6' }} /> Air Quality Index
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
            AQI {m.aqiScore}
          </div>
          <div style={{ fontSize: '0.725rem', color: 'var(--accent-green)', marginTop: '2px', fontWeight: 600 }}>
            Good Air Quality Category
          </div>
        </div>

        <div className="card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Zap size={16} style={{ color: '#8b5cf6' }} /> Grid Efficiency
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
            {m.gridEfficiencyPct}%
          </div>
          <div style={{ fontSize: '0.725rem', color: 'var(--accent-green)', marginTop: '2px', fontWeight: 600 }}>
            Minimal Transmission Loss
          </div>
        </div>

        <div className="card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Leaf size={16} style={{ color: '#84cc16' }} /> Green Utilization
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
            {m.greenUtilizationPct}%
          </div>
          <div style={{ fontSize: '0.725rem', color: 'var(--accent-green)', marginTop: '2px', fontWeight: 600 }}>
            EV + BESS Green Load Match
          </div>
        </div>
      </div>

      {/* 30-Day Carbon Reduction Trend Chart */}
      <div className="card" style={{ padding: '20px' }}>
        <h3 className="card-title" style={{ marginBottom: '16px' }}>
          <Leaf size={18} style={{ color: 'var(--accent-green)' }} /> 30-Day Carbon Reduction & Renewable Integration Trend
        </h3>

        <div style={{ width: '100%', height: '280px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={m.carbonTrend30Days}>
              <defs>
                <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} unit=" tCO2e" />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="emissions" name="Carbon Emissions (tCO2e/h)" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorEmissions)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
