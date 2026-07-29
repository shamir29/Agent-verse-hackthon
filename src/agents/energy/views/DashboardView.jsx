import React from 'react';
import { 
  Zap, 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShieldAlert, 
  Sparkles, 
  ArrowRight, 
  Battery, 
  Sun, 
  Cpu, 
  FileText,
  CheckCircle2
} from 'lucide-react';

import { INITIAL_TELEMETRY, ANOMALIES_LIST, AI_SUGGESTIONS } from '../data/mockData';

export default function DashboardView({ 
  telemetry = INITIAL_TELEMETRY, 
  anomalies = ANOMALIES_LIST, 
  aiInsights = AI_SUGGESTIONS, 
  onNavigate = () => {}, 
  onSelectDevice = () => {},
  onOpenReportModal = () => {}
}) {
  const activeAnomalies = (anomalies || []).filter(a => a.status === 'ACTIVE');

  return (
    <div>
      {/* Top Banner / Hero Welcome */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 className="section-title">Facility Energy Dashboard</h2>
          <p className="section-desc">Real-time smart grid telemetry, load distribution, and AI optimization</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={onOpenReportModal}>
            <FileText size={16} /> Export Audit Report
          </button>
          <button className="btn btn-primary" onClick={() => onNavigate('ai_insights')}>
            <Sparkles size={16} /> Open AI Assistant
          </button>
        </div>
      </div>

      {/* Hero Section — 6 KPI Cards */}
      <div className="kpi-grid">
        {/* Card 1: Current Power Consumption */}
        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">CURRENT POWER</span>
            <div className="kpi-icon-box" style={{ background: '#eff6ff', color: '#2563eb' }}>
              <Zap size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value">{telemetry.powerKw.toFixed(1)}</span>
            <span className="kpi-unit">kW</span>
          </div>
          <div className="kpi-bottom">
            <span className="trend-indicator trend-up">
              <TrendingUp size={14} /> +3.2% vs 1h ago
            </span>
            <span className="badge badge-blue">1s Live</span>
          </div>
        </div>

        {/* Card 2: Today's Energy Usage */}
        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">TODAY'S USAGE</span>
            <div className="kpi-icon-box" style={{ background: '#ecfdf5', color: '#059669' }}>
              <Activity size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value">{telemetry.energyKwhToday.toLocaleString()}</span>
            <span className="kpi-unit">kWh</span>
          </div>
          <div className="kpi-bottom">
            <span className="trend-indicator trend-down">
              <TrendingDown size={14} /> -1.8% vs yesterday
            </span>
            <span className="badge badge-green">Target Met</span>
          </div>
        </div>

        {/* Card 3: Peak Demand */}
        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">PEAK DEMAND</span>
            <div className="kpi-icon-box" style={{ background: '#fffbe6', color: '#d97706' }}>
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value">{telemetry.peakDemandKw.toFixed(1)}</span>
            <span className="kpi-unit">kW</span>
          </div>
          <div className="kpi-bottom">
            <span style={{ fontSize: '11.5px', color: '#64748b' }}>
              Occurred at {telemetry.peakDemandTime}
            </span>
            <span className="badge badge-amber">Cap: 600kW</span>
          </div>
        </div>

        {/* Card 4: Average Load */}
        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">AVERAGE LOAD</span>
            <div className="kpi-icon-box" style={{ background: '#f5f3ff', color: '#7c3aed' }}>
              <Cpu size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value">{telemetry.avgLoadPercent.toFixed(1)}</span>
            <span className="kpi-unit">%</span>
          </div>
          <div className="kpi-bottom">
            <span className="trend-indicator trend-down">
              Optimal Load Factor
            </span>
            <span className="badge badge-blue">Normal</span>
          </div>
        </div>

        {/* Card 5: Total Cost Today */}
        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">TOTAL COST TODAY</span>
            <div className="kpi-icon-box" style={{ background: '#ecfdf5', color: '#059669' }}>
              <DollarSign size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-unit" style={{ fontSize: '20px', fontWeight: 800 }}>$</span>
            <span className="kpi-value">{telemetry.costTodayUsd.toFixed(2)}</span>
          </div>
          <div className="kpi-bottom">
            <span style={{ fontSize: '11.5px', color: '#059669', fontWeight: 600 }}>
              $42.50 saved via BESS
            </span>
            <span className="badge badge-green">Tariff TOU</span>
          </div>
        </div>

        {/* Card 6: Energy Efficiency Score */}
        <div className="kpi-card" style={{ background: 'linear-gradient(135deg, #ffffff 60%, #eff6ff 100%)' }}>
          <div className="kpi-top">
            <span className="kpi-label">EFFICIENCY SCORE</span>
            <div className="kpi-icon-box" style={{ background: '#059669', color: '#ffffff' }}>
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value" style={{ color: '#059669' }}>{telemetry.efficiencyScore}</span>
            <span className="kpi-unit">/ 100</span>
          </div>
          <div className="kpi-bottom">
            <span style={{ fontSize: '11.5px', color: '#059669', fontWeight: 700 }}>
              Grade A (Optimal)
            </span>
            <span className="badge badge-green">ISO 50001</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Live Telemetry Summary + AI Insights Stream */}
      <div className="grid-2-1" style={{ marginBottom: '24px' }}>
        {/* Real-time Telemetry Overview */}
        <div className="card">
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
                <Activity size={18} />
              </div>
              <div>
                <h3 className="card-title">Live Grid & Power Telemetry</h3>
                <p className="card-subtitle">Voltage, Frequency, Power Factor & Battery Status</p>
              </div>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('live_monitoring')}>
              Full Telemetry <ArrowRight size={14} />
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="telemetry-pill-row">
            <div className="telemetry-pill">
              <span className="label">Grid Voltage</span>
              <span className="val">{telemetry.voltage.toFixed(1)} V</span>
            </div>
            <div className="telemetry-pill">
              <span className="label">Frequency</span>
              <span className="val">{telemetry.frequency.toFixed(2)} Hz</span>
            </div>
            <div className="telemetry-pill">
              <span className="label">Power Factor</span>
              <span className="val">{telemetry.powerFactor.toFixed(2)}</span>
            </div>
            <div className="telemetry-pill">
              <span className="label">Solar Power</span>
              <span className="val" style={{ color: '#059669' }}>{telemetry.solarPowerKw.toFixed(0)} kW</span>
            </div>
            <div className="telemetry-pill">
              <span className="label">Battery SoC</span>
              <span className="val" style={{ color: '#2563eb' }}>{telemetry.batterySocPercent.toFixed(0)}%</span>
            </div>
          </div>

          {/* Mini Live Load Profile Visualization */}
          <div style={{ height: '140px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', padding: '16px', display: 'flex', alignItems: 'flex-end', gap: '6px' }}>
            {Array.from({ length: 18 }, (_, i) => {
              const heightPct = Math.min(100, Math.max(20, 40 + Math.sin(i / 2) * 35 + (i === 12 ? 35 : 0)));
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div 
                    style={{ 
                      width: '100%', 
                      height: `${heightPct}%`, 
                      background: i === 12 ? '#dc2626' : 'linear-gradient(180deg, #2563eb, #60a5fa)',
                      borderRadius: '4px',
                      transition: 'all 0.3s ease'
                    }} 
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Insights & Assistant Highlights */}
        <div className="card">
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-icon" style={{ background: '#f5f3ff', color: '#7c3aed' }}>
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="card-title">AI Energy Assistant</h3>
                <p className="card-subtitle">Real-time explainable insights</p>
              </div>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('ai_insights')}>
              View All
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {aiInsights.slice(0, 3).map((item) => (
              <div key={item.id} style={{ padding: '12px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#7c3aed' }}>{item.type}</span>
                  <span style={{ fontSize: '10px', color: '#64748b' }}>{item.timestamp}</span>
                </div>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>{item.headline}</p>
                <p style={{ fontSize: '12px', color: '#334155' }}>{item.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Anomalies & Energy Spikes Section */}
      <div className="card">
        <div className="card-header">
          <div className="card-title-group">
            <div className="card-icon" style={{ background: '#fef2f2', color: '#dc2626' }}>
              <ShieldAlert size={18} />
            </div>
            <div>
              <h3 className="card-title">Active Energy Anomalies ({activeAnomalies.length})</h3>
              <p className="card-subtitle">Automated spike & power quality detection</p>
            </div>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('anomaly_detection')}>
            Anomaly Management Hub <ArrowRight size={14} />
          </button>
        </div>

        <table className="custom-table">
          <thead>
            <tr>
              <th>Severity</th>
              <th>Anomaly Title</th>
              <th>Affected System</th>
              <th>Root Cause</th>
              <th>Est. Waste</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {anomalies.map((ano) => (
              <tr key={ano.id}>
                <td>
                  <span className={`badge ${ano.severity === 'CRITICAL' ? 'badge-red' : ano.severity === 'WARNING' ? 'badge-amber' : 'badge-blue'}`}>
                    {ano.severity}
                  </span>
                </td>
                <td style={{ fontWeight: 600, color: '#0f172a' }}>{ano.title}</td>
                <td style={{ color: '#64748b' }}>{ano.affectedSystem}</td>
                <td style={{ fontSize: '12px', maxWidth: '280px', color: '#334155' }}>{ano.rootCause}</td>
                <td style={{ fontWeight: 700, color: '#dc2626' }}>${ano.estimatedWasteUsd.toFixed(2)}</td>
                <td>
                  <button 
                    className="btn btn-secondary btn-sm" 
                    onClick={() => onNavigate('anomaly_detection')}
                  >
                    Resolve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
