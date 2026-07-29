import React from 'react';
import { ANOMALIES_LIST } from '../data/mockData';

export default function AnomalyDetectionView({ anomalies = ANOMALIES_LIST, onResolveAnomaly = () => {} }) {
  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 className="section-title">Section 7 — Anomaly & Power Quality Detection</h2>
          <p className="section-desc">Automated detection of power spikes, idle equipment, voltage dips, phase imbalance, and PF drop</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid-4" style={{ marginBottom: '24px' }}>
        <div className="card" style={{ borderLeft: '4px solid #dc2626' }}>
          <span className="kpi-label">ACTIVE ANOMALIES</span>
          <p style={{ fontSize: '28px', fontWeight: 800, color: '#dc2626', margin: '6px 0' }}>
            {anomalies.filter(a => a.status === 'ACTIVE').length}
          </p>
          <span className="badge badge-red">Immediate Attention</span>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #059669' }}>
          <span className="kpi-label">RESOLVED TODAY</span>
          <p style={{ fontSize: '28px', fontWeight: 800, color: '#059669', margin: '6px 0' }}>
            {anomalies.filter(a => a.status === 'RESOLVED').length}
          </p>
          <span className="badge badge-green">Auto-cleared</span>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #d97706' }}>
          <span className="kpi-label">TOTAL ESTIMATED WASTE</span>
          <p style={{ fontSize: '28px', fontWeight: 800, color: '#d97706', margin: '6px 0' }}>
            ${anomalies.reduce((sum, a) => sum + (a.status === 'ACTIVE' ? a.estimatedWasteUsd : 0), 0).toFixed(2)}
          </p>
          <span className="badge badge-amber">Recoverable Cost</span>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #2563eb' }}>
          <span className="kpi-label">DETECTION MODEL</span>
          <p style={{ fontSize: '20px', fontWeight: 800, color: '#2563eb', margin: '6px 0' }}>Isolation Forest</p>
          <span className="badge badge-blue">99.4% Accuracy</span>
        </div>
      </div>

      {/* Anomaly Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {anomalies.map((ano) => (
          <div 
            key={ano.id}
            className="card"
            style={{
              border: `1px solid ${ano.severity === 'CRITICAL' ? '#fecaca' : ano.severity === 'WARNING' ? '#fef08a' : '#bfdbfe'}`,
              background: ano.status === 'RESOLVED' ? '#f8fafc' : ano.severity === 'CRITICAL' ? '#ffffff' : '#ffffff'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ padding: '10px', borderRadius: '10px', background: ano.severity === 'CRITICAL' ? '#fef2f2' : '#fffbe6', color: ano.severity === 'CRITICAL' ? '#dc2626' : '#d97706' }}>
                  <AlertTriangle size={22} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{ano.title}</h3>
                    <span className={`badge ${ano.severity === 'CRITICAL' ? 'badge-red' : ano.severity === 'WARNING' ? 'badge-amber' : 'badge-blue'}`}>
                      {ano.severity}
                    </span>
                    <span className={`badge ${ano.status === 'ACTIVE' ? 'badge-amber' : 'badge-green'}`}>
                      {ano.status}
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                    Logged at {ano.timestamp} • Affected System: <strong style={{ color: '#0f172a' }}>{ano.affectedSystem}</strong>
                  </p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>ESTIMATED ENERGY WASTE</span>
                <p style={{ fontSize: '18px', fontWeight: 800, color: '#dc2626' }}>${ano.estimatedWasteUsd.toFixed(2)}</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: '#f8fafc', padding: '14px', borderRadius: '8px', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#dc2626', textTransform: 'uppercase' }}>Identified Root Cause</span>
                <p style={{ fontSize: '13px', color: '#334155', marginTop: '2px', lineHeight: 1.4 }}>{ano.rootCause}</p>
              </div>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#059669', textTransform: 'uppercase' }}>Recommended AI Solution</span>
                <p style={{ fontSize: '13px', color: '#334155', marginTop: '2px', lineHeight: 1.4 }}>{ano.recommendation}</p>
              </div>
            </div>

            {ano.status === 'ACTIVE' && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button className="btn btn-secondary btn-sm">Dispatch Work Order</button>
                <button className="btn btn-primary btn-sm" onClick={() => onResolveAnomaly(ano.id)}>
                  <CheckCircle2 size={14} /> Mark Resolved & Apply Fix
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
