import React from 'react';
import { ZapOff, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, RefreshCw, Cpu, Layers } from 'lucide-react';

export default function EnergyEfficiencyView({ suggestions, onApplySuggestion }) {
  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 className="section-title">Section 6 — Energy Efficiency & Optimization Engine</h2>
          <p className="section-desc">ISO 50001 efficiency metrics, carbon intensity, and automated AI saving rules</p>
        </div>
      </div>

      {/* 5 Core Efficiency Metric Cards */}
      <div className="grid-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div className="card">
          <span className="kpi-label">BUILDING EFFICIENCY</span>
          <p style={{ fontSize: '24px', fontWeight: 800, color: '#059669', margin: '6px 0' }}>91.4%</p>
          <span className="badge badge-green">Grade A Facility</span>
        </div>

        <div className="card">
          <span className="kpi-label">EQUIPMENT EFFICIENCY</span>
          <p style={{ fontSize: '24px', fontWeight: 800, color: '#2563eb', margin: '6px 0' }}>88.2%</p>
          <span className="badge badge-blue">Chiller #2 Needs Maintenance</span>
        </div>

        <div className="card">
          <span className="kpi-label">RENEWABLE UTILIZATION</span>
          <p style={{ fontSize: '24px', fontWeight: 800, color: '#059669', margin: '6px 0' }}>94.6%</p>
          <span className="badge badge-green">Low Curtailment</span>
        </div>

        <div className="card">
          <span className="kpi-label">GRID DEPENDENCY</span>
          <p style={{ fontSize: '24px', fontWeight: 800, color: '#d97706', margin: '6px 0' }}>61.5%</p>
          <span className="badge badge-amber">Grid Draw 263kW</span>
        </div>

        <div className="card">
          <span className="kpi-label">CARBON INTENSITY</span>
          <p style={{ fontSize: '24px', fontWeight: 800, color: '#7c3aed', margin: '6px 0' }}>210 g</p>
          <span className="badge badge-blue">gCO₂ / kWh</span>
        </div>
      </div>

      {/* AI Efficiency Suggestions List */}
      <div className="card">
        <div className="card-header">
          <div className="card-title-group">
            <div className="card-icon" style={{ background: '#f5f3ff', color: '#7c3aed' }}>
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="card-title">AI Prescriptive Optimization Suggestions</h3>
              <p className="card-subtitle">Automated actions to eliminate energy waste and reduce monthly utility costs</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {suggestions.map((sug) => (
            <div 
              key={sug.id}
              style={{
                padding: '18px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                background: sug.applied ? '#f8fafc' : '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{ maxWidth: '680px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <span className="badge badge-blue">{sug.category}</span>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>{sug.title}</h4>
                </div>
                <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.45, marginBottom: '8px' }}>
                  {sug.description}
                </p>
                <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#64748b' }}>
                  <span>Est. Savings: <strong style={{ color: '#059669' }}>${sug.savingsUsdMonth}/mo</strong></span>
                  <span>CO₂ Reduction: <strong style={{ color: '#059669' }}>{sug.co2ReductionKgMonth} kg/mo</strong></span>
                  <span>Execution: <strong>{sug.effort}</strong></span>
                </div>
              </div>

              <div>
                {sug.applied ? (
                  <span className="badge badge-green" style={{ padding: '8px 14px', fontSize: '12px' }}>
                    <CheckCircle2 size={14} /> Rule Applied
                  </span>
                ) : (
                  <button className="btn btn-primary" onClick={() => onApplySuggestion(sug.id)}>
                    Apply Rule <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
