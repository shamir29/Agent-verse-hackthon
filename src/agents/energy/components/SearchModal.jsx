import React, { useState } from 'react';
import { Search, X, Cpu, AlertTriangle, ArrowRight, Zap, FileText } from 'lucide-react';

export default function SearchModal({ isOpen, onClose, onNavigate, devices, anomalies }) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredDevices = devices.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.building.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAnomalies = anomalies.filter(a =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.affectedSystem.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #e2e8f0', gap: '12px' }}>
          <Search size={20} color="#2563eb" />
          <input
            type="text"
            placeholder="Search devices, anomalies, forecast, reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              fontSize: '16px',
              fontWeight: 500,
              color: '#0f172a'
            }}
          />
          <button 
            onClick={onClose} 
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ maxHeight: '420px', overflowY: 'auto', padding: '16px 20px' }}>
          {searchTerm.trim() === '' ? (
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>Quick Navigation Jump</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                <div 
                  onClick={() => { onNavigate('live_monitoring'); onClose(); }}
                  style={{ padding: '10px 14px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <Zap size={16} color="#2563eb" />
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>Live Telemetry Curve</span>
                </div>
                <div 
                  onClick={() => { onNavigate('anomaly_detection'); onClose(); }}
                  style={{ padding: '10px 14px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <AlertTriangle size={16} color="#dc2626" />
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>Active Energy Spikes</span>
                </div>
                <div 
                  onClick={() => { onNavigate('demand_forecast'); onClose(); }}
                  style={{ padding: '10px 14px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <Cpu size={16} color="#059669" />
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>24h Demand Forecast</span>
                </div>
                <div 
                  onClick={() => { onNavigate('reports'); onClose(); }}
                  style={{ padding: '10px 14px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <FileText size={16} color="#7c3aed" />
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>Export Energy Report</span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* Devices Section */}
              {filteredDevices.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Devices ({filteredDevices.length})</p>
                  {filteredDevices.map(device => (
                    <div 
                      key={device.id} 
                      onClick={() => { onNavigate('device_monitoring'); onClose(); }}
                      style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Cpu size={16} color="#2563eb" />
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{device.name}</p>
                          <p style={{ fontSize: '11px', color: '#64748b' }}>{device.building} • {device.category}</p>
                        </div>
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#059669' }}>{device.powerKw} kW</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Anomalies Section */}
              {filteredAnomalies.length > 0 && (
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Alerts & Anomalies ({filteredAnomalies.length})</p>
                  {filteredAnomalies.map(ano => (
                    <div 
                      key={ano.id} 
                      onClick={() => { onNavigate('anomaly_detection'); onClose(); }}
                      style={{ padding: '10px', borderRadius: '8px', border: '1px solid #fecaca', background: '#fef2f2', marginBottom: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <AlertTriangle size={16} color="#dc2626" />
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{ano.title}</p>
                          <p style={{ fontSize: '11px', color: '#dc2626' }}>{ano.affectedSystem}</p>
                        </div>
                      </div>
                      <ArrowRight size={14} color="#dc2626" />
                    </div>
                  ))}
                </div>
              )}

              {filteredDevices.length === 0 && filteredAnomalies.length === 0 && (
                <div style={{ textAlign: 'center', padding: '30px 0', color: '#64748b' }}>
                  <p style={{ fontSize: '14px', fontWeight: 500 }}>No results found matching "{searchTerm}"</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
