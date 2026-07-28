import React, { useState } from 'react';
import { 
  X, 
  Activity, 
  Thermometer, 
  Zap, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  Wrench, 
  Play, 
  ShieldAlert,
  Radio,
  Cpu,
  TrendingUp,
  FileText
} from 'lucide-react';
import { useDigitalTwin } from '../../context/DigitalTwinContext';

export const AssetDetailPanel = () => {
  const { selectedAsset, setSelectedAsset, runSimulation, setActiveTab } = useDigitalTwin();
  const [activeSubTab, setActiveSubTab] = useState('telemetry'); // 'telemetry', 'diagnostics', 'actions'

  if (!selectedAsset) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'healthy': return <span className="badge badge-green"><span className="pulse-dot green"></span> Healthy</span>;
      case 'warning': return <span className="badge badge-yellow"><span className="pulse-dot yellow"></span> Warning</span>;
      case 'maintenance': return <span className="badge badge-orange"><span className="pulse-dot orange"></span> Maintenance</span>;
      case 'critical': return <span className="badge badge-red"><span className="pulse-dot red"></span> Critical</span>;
      default: return <span className="badge badge-blue">Operational</span>;
    }
  };

  return (
    <div className="animate-fade-in" style={{
      position: 'absolute',
      right: '16px',
      top: '16px',
      width: '360px',
      backgroundColor: '#ffffff',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-floating)',
      zIndex: 30,
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 16px',
        backgroundColor: 'var(--bg-app)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-blue)', textTransform: 'uppercase' }}>
            ID: {selectedAsset.id} • {selectedAsset.type}
          </span>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
            {selectedAsset.name}
          </h3>
        </div>
        <button 
          onClick={() => setSelectedAsset(null)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            padding: '4px'
          }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: '#ffffff'
      }}>
        {['telemetry', 'diagnostics', 'actions'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            style={{
              flex: 1,
              padding: '8px 0',
              fontSize: '0.75rem',
              fontWeight: activeSubTab === tab ? 700 : 500,
              color: activeSubTab === tab ? 'var(--accent-blue)' : 'var(--text-secondary)',
              borderBottom: activeSubTab === tab ? '2px solid var(--accent-blue)' : 'none',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Body Content */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {activeSubTab === 'telemetry' && (
          <>
            {/* Status & Health Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginBottom: '2px' }}>Live Status</div>
                {getStatusBadge(selectedAsset.status)}
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginBottom: '2px' }}>AI Health Index</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: selectedAsset.healthScore > 80 ? 'var(--accent-green)' : selectedAsset.healthScore > 60 ? 'var(--accent-yellow)' : 'var(--accent-red)' }}>
                  {selectedAsset.aiHealthScore}
                </div>
              </div>
            </div>

            {/* Telemetry Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              backgroundColor: 'var(--bg-app)',
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)'
            }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Zap size={12} style={{ color: 'var(--accent-blue)' }} /> Current Load
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                  {selectedAsset.load}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Thermometer size={12} style={{ color: 'var(--accent-orange)' }} /> Temperature
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                  {selectedAsset.temperature}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Radio size={12} style={{ color: 'var(--accent-purple)' }} /> Power Output
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                  {selectedAsset.power || 'N/A'}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} style={{ color: 'var(--accent-green)' }} /> Last Service
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                  {selectedAsset.lastMaintenance}
                </div>
              </div>
            </div>

            {/* Location & GPS */}
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={14} style={{ color: 'var(--accent-red)' }} />
              <span>District: <strong style={{ color: 'var(--text-main)' }}>{selectedAsset.district}</strong> ({selectedAsset.location.lat}, {selectedAsset.location.lng})</span>
            </div>

            {/* Active Warnings */}
            {selectedAsset.alerts && selectedAsset.alerts.length > 0 && (
              <div style={{
                padding: '10px',
                backgroundColor: '#fff7ed',
                border: '1px solid #fed7aa',
                borderRadius: 'var(--radius-md)'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#c2410c', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <AlertTriangle size={14} /> Active Warnings ({selectedAsset.alerts.length})
                </div>
                {selectedAsset.alerts.map((alt, idx) => (
                  <div key={idx} style={{ fontSize: '0.725rem', color: '#9a3412', marginLeft: '18px' }}>
                    • {alt}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeSubTab === 'diagnostics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.775rem' }}>
            <div style={{ backgroundColor: 'var(--bg-app)', padding: '10px', borderRadius: 'var(--radius-md)' }}>
              <strong>Remaining Useful Life (RUL):</strong> 4,280 Operating Hours (94.2% Structural Integrity)
            </div>
            <div style={{ backgroundColor: 'var(--bg-app)', padding: '10px', borderRadius: 'var(--radius-md)' }}>
              <strong>Vibration Spectrum:</strong> 3.8 mm/s RMS (Harmonic Peak @ 60 Hz)
            </div>
            <div style={{ backgroundColor: 'var(--bg-app)', padding: '10px', borderRadius: 'var(--radius-md)' }}>
              <strong>Thermal Anomaly Detection:</strong> AI Neural Net confidence 96.8%
            </div>
          </div>
        )}

        {activeSubTab === 'actions' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setActiveTab('simulation');
                runSimulation('sim_transformer_failure', 8);
              }}
              style={{ width: '100%', fontSize: '0.8rem' }}
            >
              <Play size={14} /> Run Failure Simulation
            </button>
            
            <button 
              className="btn btn-secondary"
              onClick={() => {
                setActiveTab('alerts');
              }}
              style={{ width: '100%', fontSize: '0.8rem' }}
            >
              <Wrench size={14} /> Dispatch Maintenance Team
            </button>

            <button 
              className="btn btn-secondary"
              onClick={() => {
                setActiveTab('reports');
              }}
              style={{ width: '100%', fontSize: '0.8rem' }}
            >
              <FileText size={14} /> Generate Asset Audit Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
