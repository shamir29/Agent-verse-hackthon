import React from 'react';
import { LineChart, Zap, TrendingUp, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

export default function LoadAnalysisView({ telemetry, history }) {
  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 className="section-title">Section 4 — Facility Load Analysis</h2>
          <p className="section-desc">Base load vs peak load profiling, demand curves, and AI load balancing</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid-4" style={{ marginBottom: '24px' }}>
        <div className="card">
          <span className="kpi-label">BASE LOAD</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0' }}>
            <span className="kpi-value" style={{ color: '#2563eb' }}>184.2</span>
            <span className="kpi-unit">kW</span>
          </div>
          <span className="badge badge-blue">Constant Night Draw</span>
        </div>

        <div className="card">
          <span className="kpi-label">PEAK LOAD</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0' }}>
            <span className="kpi-value" style={{ color: '#d97706' }}>512.0</span>
            <span className="kpi-unit">kW</span>
          </div>
          <span className="badge badge-amber">14:15 PM Peak</span>
        </div>

        <div className="card">
          <span className="kpi-label">PEAK-TO-BASE RATIO</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0' }}>
            <span className="kpi-value" style={{ color: '#059669' }}>2.78</span>
            <span className="kpi-unit">x</span>
          </div>
          <span className="badge badge-green">Healthy Profile</span>
        </div>

        <div className="card">
          <span className="kpi-label">IDLE POWER WASTE</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0' }}>
            <span className="kpi-value" style={{ color: '#dc2626' }}>28.5</span>
            <span className="kpi-unit">kW</span>
          </div>
          <span className="badge badge-red">Identified by AI</span>
        </div>
      </div>

      {/* Demand Curve Chart */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <div className="card-title-group">
            <div className="card-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
              <LineChart size={18} />
            </div>
            <div>
              <h3 className="card-title">Continuous 24-Hour Demand Curve Profile</h3>
              <p className="card-subtitle">Base Load (184kW) vs Peak Load (512kW) Overlay</p>
            </div>
          </div>
          <span className="badge badge-blue">TOU Tariff Windows Active</span>
        </div>

        <div style={{ height: '220px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', padding: '16px', display: 'flex', alignItems: 'flex-end', gap: '6px' }}>
          {history.map((item, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '9px', color: '#64748b' }}>{item.totalLoadKw}</span>
              <div 
                style={{ 
                  width: '100%', 
                  height: `${(item.totalLoadKw / 550) * 150}px`, 
                  background: item.totalLoadKw > 450 ? 'linear-gradient(180deg, #d97706, #f59e0b)' : 'linear-gradient(180deg, #2563eb, #3b82f6)',
                  borderRadius: '4px'
                }} 
              />
              <span style={{ fontSize: '9px', color: '#64748b' }}>{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Identified Load Insights Grid */}
      <div className="grid-2">
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <AlertTriangle size={20} color="#d97706" />
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>AI Identified Load Inefficiencies</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '12px', background: '#fffbe6', border: '1px solid #fef08a', borderRadius: '8px' }}>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#d97706' }}>Unexpected Load Increase (14:00 – 16:00)</p>
              <p style={{ fontSize: '12px', color: '#334155', marginTop: '2px' }}>Chiller #2 ramped to 98.6 kW simultaneously with CNC Milling Machine #4, driving peak demand to 512 kW.</p>
            </div>
            <div style={{ padding: '12px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px' }}>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#dc2626' }}>Idle Equipment Consuming Power</p>
              <p style={{ fontSize: '12px', color: '#334155', marginTop: '2px' }}>Warehouse Air Compressor #2 remained in idle bypass mode (14 kW draw) for 4.5 hours while line was off.</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <CheckCircle2 size={20} color="#059669" />
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Recommended Load Balancing Actions</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '12px', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px' }}>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#059669' }}>Stagger Heavy Motor Starting Sequences</p>
              <p style={{ fontSize: '12px', color: '#334155', marginTop: '2px' }}>Delay Assembly Line Motor start by 15 mins to avoid coincidental peak with HVAC chiller pull.</p>
            </div>
            <div style={{ padding: '12px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px' }}>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#2563eb' }}>Schedule Automatic Shutdown of Idle Compressor</p>
              <p style={{ fontSize: '12px', color: '#334155', marginTop: '2px' }}>Automate zero-demand cutoff timer on compressed air header after 15 mins of idle state.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
