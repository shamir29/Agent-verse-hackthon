import React, { useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown, Sparkles, Building2, Cpu, ShieldAlert, Award } from 'lucide-react';

export default function EnergyConsumptionView({ departmentUsage, buildingUsage, devices }) {
  const [timeRange, setTimeRange] = useState('Daily');

  const topConsumingDevices = [...devices].sort((a, b) => b.powerKw - a.powerKw).slice(0, 3);
  const lowestConsumingDevices = [...devices].sort((a, b) => a.powerKw - b.powerKw).slice(0, 3);

  return (
    <div>
      {/* Header & Filter */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 className="section-title">Section 2 — Energy Consumption Analytics</h2>
          <p className="section-desc">Granular consumption analysis across departments, buildings, and individual assets</p>
        </div>
        <div className="tab-filter-bar">
          {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((range) => (
            <button
              key={range}
              className={`tab-btn ${timeRange === range ? 'active' : ''}`}
              onClick={() => setTimeRange(range)}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* AI Equipment Highlights Banner */}
      <div className="grid-3" style={{ marginBottom: '24px' }}>
        {/* Highest Consuming Equipment */}
        <div className="card" style={{ background: '#fef2f2', border: '1px solid #fecaca' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <ShieldAlert size={18} color="#dc2626" />
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#dc2626', textTransform: 'uppercase' }}>Highest Consuming Equipment</h4>
          </div>
          {topConsumingDevices.map(d => (
            <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #fca5a5', fontSize: '12.5px' }}>
              <span style={{ fontWeight: 600, color: '#0f172a' }}>{d.name}</span>
              <span style={{ fontWeight: 700, color: '#dc2626' }}>{d.powerKw} kW</span>
            </div>
          ))}
        </div>

        {/* Lowest Consuming Equipment (Optimized) */}
        <div className="card" style={{ background: '#ecfdf5', border: '1px solid #a7f3d0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Award size={18} color="#059669" />
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#059669', textTransform: 'uppercase' }}>Most Efficient Equipment</h4>
          </div>
          {lowestConsumingDevices.map(d => (
            <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #6ee7b7', fontSize: '12.5px' }}>
              <span style={{ fontWeight: 600, color: '#0f172a' }}>{d.name}</span>
              <span style={{ fontWeight: 700, color: '#059669' }}>{d.powerKw} kW</span>
            </div>
          ))}
        </div>

        {/* AI Consumption Trends Summary */}
        <div className="card" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Sparkles size={18} color="#2563eb" />
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase' }}>AI Consumption Trend</h4>
          </div>
          <p style={{ fontSize: '13px', color: '#0f172a', fontWeight: 600, lineHeight: 1.4 }}>
            Building A HVAC load increased 4.2% today due to 31°C ambient peak. BESS storage offset 140 kWh of high-tariff grid draw.
          </p>
        </div>
      </div>

      {/* Grid: Department-wise vs Building-wise */}
      <div className="grid-2" style={{ marginBottom: '24px' }}>
        {/* Department-wise Usage */}
        <div className="card">
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
                <BarChart3 size={18} />
              </div>
              <div>
                <h3 className="card-title">Department-wise Energy Share</h3>
                <p className="card-subtitle">{timeRange} kWh consumption breakdown</p>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {departmentUsage.map(dept => (
              <div key={dept.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>
                  <span>{dept.name}</span>
                  <span>{dept.usageKwh} kWh ({dept.percentage}%)</span>
                </div>
                <div style={{ width: '100%', height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{ width: `${dept.percentage}%`, height: '100%', background: dept.color, borderRadius: '5px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Building-wise Consumption */}
        <div className="card">
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-icon" style={{ background: '#ecfdf5', color: '#059669' }}>
                <Building2 size={18} />
              </div>
              <div>
                <h3 className="card-title">Building-wise Energy & Star Ratings</h3>
                <p className="card-subtitle">Facility benchmark & peak kW</p>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {buildingUsage.map(b => (
              <div key={b.name} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a' }}>{b.name}</p>
                  <p style={{ fontSize: '12px', color: '#64748b' }}>Peak Demand: {b.peakKw} kW</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '14px', fontWeight: 800, color: '#059669' }}>{b.usageKwh} kWh</p>
                  <span className="badge badge-green">Efficiency: {b.efficiency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
