import React, { useState } from 'react';
import { TrendingUp, CloudSun, Calendar, ShieldCheck, Sparkles, Activity } from 'lucide-react';

export default function DemandForecastView({ forecastData }) {
  const [horizon, setHorizon] = useState('Next 24 Hours');

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 className="section-title">Section 5 — Predictive Demand Forecast</h2>
          <p className="section-desc">Machine Learning forecast powered by weather telemetry, shift schedules, and historical load profiles</p>
        </div>
        <div className="tab-filter-bar">
          {['Next Hour', 'Next 24 Hours', 'Next Week', 'Next Month'].map((h) => (
            <button
              key={h}
              className={`tab-btn ${horizon === h ? 'active' : ''}`}
              onClick={() => setHorizon(h)}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      {/* Confidence Score & AI Factors Grid */}
      <div className="grid-4" style={{ marginBottom: '24px' }}>
        <div className="card" style={{ background: 'linear-gradient(135deg, #ffffff, #eff6ff)', border: '1px solid #bfdbfe' }}>
          <span className="kpi-label">AI CONFIDENCE SCORE</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0' }}>
            <span className="kpi-value" style={{ color: '#2563eb', fontSize: '32px' }}>96.2%</span>
          </div>
          <span className="badge badge-blue">Narrow Confidence Interval</span>
        </div>

        <div className="card">
          <span className="kpi-label">EXPECTED PEAK DEMAND</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0' }}>
            <span className="kpi-value" style={{ color: '#d97706', fontSize: '28px' }}>512 kW</span>
          </div>
          <span className="badge badge-amber">Forecast at 17:00 PM</span>
        </div>

        <div className="card">
          <span className="kpi-label">WEATHER IMPACT FACTOR</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0' }}>
            <span className="kpi-value" style={{ color: '#059669', fontSize: '28px' }}>+8.4%</span>
          </div>
          <span className="badge badge-green">32°C Heat Wave Correlation</span>
        </div>

        <div className="card">
          <span className="kpi-label">SHIFT SCHEDULE IMPACT</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0' }}>
            <span className="kpi-value" style={{ color: '#7c3aed', fontSize: '28px' }}>Shift B</span>
          </div>
          <span className="badge badge-blue">Manufacturing Line Active</span>
        </div>
      </div>

      {/* Forecast vs Actual Chart */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <div className="card-title-group">
            <div className="card-icon" style={{ background: '#f5f3ff', color: '#7c3aed' }}>
              <TrendingUp size={18} />
            </div>
            <div>
              <h3 className="card-title">Forecast vs Actual Demand Curve ({horizon})</h3>
              <p className="card-subtitle">Predicted Load Bounds (Upper 95% Confidence / Lower 95% Confidence)</p>
            </div>
          </div>
          <span className="badge badge-blue">Model: XGBoost + LSTM Hybrid</span>
        </div>

        <div style={{ height: '230px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
          {forecastData.map((item, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>
                {item.actual ? `${item.actual} kW` : `${item.forecast} kW*`}
              </span>
              <div 
                style={{ 
                  width: '100%', 
                  height: `${(item.forecast / 600) * 160}px`, 
                  background: item.actual ? '#2563eb' : 'repeating-linear-gradient(45deg, #7c3aed, #7c3aed 10px, #a78bfa 10px, #a78bfa 20px)',
                  borderRadius: '4px',
                  opacity: item.actual ? 1 : 0.85
                }} 
              />
              <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>{item.period}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
