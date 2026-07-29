import React from 'react';
import { Leaf, Sun, Award, Trees, Wind, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function SustainabilityView({ metrics }) {
  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 className="section-title">Section 9 — Sustainability & Carbon Dashboard</h2>
          <p className="section-desc">ESG compliance, carbon footprint reduction tracking, and green energy certification</p>
        </div>
      </div>

      {/* 6 Animated Sustainability Cards */}
      <div className="grid-3" style={{ marginBottom: '24px' }}>
        <div className="card" style={{ background: 'linear-gradient(135deg, #ffffff 60%, #ecfdf5 100%)', border: '1px solid #a7f3d0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Sun size={20} color="#059669" />
            <span className="kpi-label" style={{ color: '#059669' }}>RENEWABLE ENERGY %</span>
          </div>
          <p style={{ fontSize: '32px', fontWeight: 800, color: '#059669' }}>{metrics.renewablePercent}%</p>
          <span className="badge badge-green" style={{ marginTop: '6px' }}>Target: 50% Green Energy</span>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Leaf size={20} color="#7c3aed" />
            <span className="kpi-label">CO₂ EMISSIONS MONTHLY</span>
          </div>
          <p style={{ fontSize: '32px', fontWeight: 800, color: '#7c3aed' }}>{metrics.co2EmissionsTonMonth} <span style={{ fontSize: '16px', fontWeight: 600 }}>tCO₂e</span></p>
          <span className="badge badge-blue">Scope 2 Market-Based</span>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Award size={20} color="#059669" />
            <span className="kpi-label">CARBON REDUCTION</span>
          </div>
          <p style={{ fontSize: '32px', fontWeight: 800, color: '#059669' }}>-{metrics.co2ReductionPercent}%</p>
          <span className="badge badge-green">vs 2025 Baseline</span>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Wind size={20} color="#0891b2" />
            <span className="kpi-label">GREEN ENERGY CONSUMED</span>
          </div>
          <p style={{ fontSize: '32px', fontWeight: 800, color: '#0891b2' }}>{metrics.greenEnergyKwhMonth.toLocaleString()} <span style={{ fontSize: '16px', fontWeight: 600 }}>kWh</span></p>
          <span className="badge badge-blue">Zero Carbon Source</span>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <CheckCircle2 size={20} color="#2563eb" />
            <span className="kpi-label">ENERGY SAVED YTD</span>
          </div>
          <p style={{ fontSize: '32px', fontWeight: 800, color: '#2563eb' }}>{metrics.energySavedMwhYear} <span style={{ fontSize: '16px', fontWeight: 600 }}>MWh</span></p>
          <span className="badge badge-blue">ISO 50001 Verified</span>
        </div>

        <div className="card" style={{ background: 'linear-gradient(135deg, #ffffff 60%, #f0fdf4 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Trees size={20} color="#059669" />
            <span className="kpi-label" style={{ color: '#059669' }}>EQUIVALENT TREES PLANTED</span>
          </div>
          <p style={{ fontSize: '32px', fontWeight: 800, color: '#059669' }}>{metrics.treesPlantedEquivalent.toLocaleString()}</p>
          <span className="badge badge-green">Environmental Offset</span>
        </div>
      </div>
    </div>
  );
}
