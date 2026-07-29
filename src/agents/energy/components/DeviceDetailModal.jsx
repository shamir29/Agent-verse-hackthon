import React, { useState } from 'react';
import { X, Cpu, Activity, AlertTriangle, Calendar, Wrench, ShieldCheck, Zap, BarChart2 } from 'lucide-react';

export default function DeviceDetailModal({ device, onClose }) {
  const [activeTab, setActiveTab] = useState('USAGE');

  if (!device) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '720px' }}>
        {/* Header */}
        <div className="modal-header" style={{ background: '#f8fafc' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '10px', background: '#eff6ff', borderRadius: '10px', color: '#2563eb' }}>
              <Cpu size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>{device.name}</h3>
                <span className={`badge ${device.status === 'ONLINE' || device.status === 'CHARGING' ? 'badge-green' : 'badge-amber'}`}>
                  {device.status}
                </span>
              </div>
              <p style={{ fontSize: '12px', color: '#64748b' }}>{device.id} • {device.building} ({device.location})</p>
            </div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}>
            <X size={20} />
          </button>
        </div>

        {/* Telemetry Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', padding: '16px 24px', background: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>CURRENT POWER</span>
            <p style={{ fontSize: '18px', fontWeight: 800, color: '#2563eb' }}>{device.powerKw} kW</p>
          </div>
          <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>DAILY ENERGY</span>
            <p style={{ fontSize: '18px', fontWeight: 800, color: '#059669' }}>{device.dailyKwh} kWh</p>
          </div>
          <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>VOLTAGE & CURRENT</span>
            <p style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>{device.voltage} V / {device.current} A</p>
          </div>
          <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>HEALTH SCORE</span>
            <p style={{ fontSize: '18px', fontWeight: 800, color: device.healthScore > 90 ? '#059669' : '#d97706' }}>{device.healthScore}%</p>
          </div>
        </div>

        {/* Modal Inner Tabs */}
        <div style={{ padding: '0 24px', borderBottom: '1px solid #e2e8f0', background: '#ffffff', display: 'flex', gap: '16px' }}>
          <button 
            className={`tab-btn ${activeTab === 'USAGE' ? 'active' : ''}`}
            onClick={() => setActiveTab('USAGE')}
            style={{ padding: '12px 4px', borderBottom: activeTab === 'USAGE' ? '2px solid #2563eb' : 'none', borderRadius: 0 }}
          >
            Historical Usage & Profile
          </button>
          <button 
            className={`tab-btn ${activeTab === 'QUALITY' ? 'active' : ''}`}
            onClick={() => setActiveTab('QUALITY')}
            style={{ padding: '12px 4px', borderBottom: activeTab === 'QUALITY' ? '2px solid #2563eb' : 'none', borderRadius: 0 }}
          >
            Power Quality Analytics
          </button>
          <button 
            className={`tab-btn ${activeTab === 'FAULTS' ? 'active' : ''}`}
            onClick={() => setActiveTab('FAULTS')}
            style={{ padding: '12px 4px', borderBottom: activeTab === 'FAULTS' ? '2px solid #2563eb' : 'none', borderRadius: 0 }}
          >
            Fault History ({device.faultHistory?.length || 0})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'MAINTENANCE' ? 'active' : ''}`}
            onClick={() => setActiveTab('MAINTENANCE')}
            style={{ padding: '12px 4px', borderBottom: activeTab === 'MAINTENANCE' ? '2px solid #2563eb' : 'none', borderRadius: 0 }}
          >
            Maintenance Log
          </button>
        </div>

        {/* Body Content based on Active Tab */}
        <div className="modal-body">
          {activeTab === 'USAGE' && (
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px' }}>24-Hour Power Demand Curve</h4>
              <div style={{ height: '180px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', padding: '16px', display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                {Array.from({ length: 12 }, (_, i) => {
                  const val = Math.sin(i / 2) * 30 + 60 + Math.random() * 10;
                  return (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '10px', color: '#64748b' }}>{Math.round(val)}kW</span>
                      <div 
                        style={{ 
                          width: '100%', 
                          height: `${(val / 100) * 120}px`, 
                          background: 'linear-gradient(180deg, #2563eb, #3b82f6)', 
                          borderRadius: '4px' 
                        }} 
                      />
                      <span style={{ fontSize: '10px', color: '#64748b' }}>{i * 2}:00</span>
                    </div>
                  );
                })}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '16px' }}>
                <div style={{ padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                  <p style={{ fontSize: '11px', color: '#64748b' }}>Peak Load Today</p>
                  <p style={{ fontSize: '14px', fontWeight: 700 }}>{Math.round(device.powerKw * 1.15)} kW</p>
                </div>
                <div style={{ padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                  <p style={{ fontSize: '11px', color: '#64748b' }}>Average Duty Cycle</p>
                  <p style={{ fontSize: '14px', fontWeight: 700 }}>78.4 %</p>
                </div>
                <div style={{ padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                  <p style={{ fontSize: '11px', color: '#64748b' }}>Estimated Running Cost</p>
                  <p style={{ fontSize: '14px', fontWeight: 700 }}>${(device.dailyKwh * 0.14).toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'QUALITY' && (
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px' }}>Power Quality & Harmonics Monitor</h4>
              <div className="grid-3" style={{ marginBottom: '16px' }}>
                <div style={{ padding: '14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
                  <p style={{ fontSize: '12px', color: '#64748b' }}>Voltage THD</p>
                  <p style={{ fontSize: '20px', fontWeight: 800, color: '#059669' }}>{device.powerQuality?.thdVoltage || '1.2%'}</p>
                  <p style={{ fontSize: '11px', color: '#059669', marginTop: '2px' }}>IEEE 519 Compliant (&lt;5%)</p>
                </div>
                <div style={{ padding: '14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
                  <p style={{ fontSize: '12px', color: '#64748b' }}>Current THD</p>
                  <p style={{ fontSize: '20px', fontWeight: 800, color: '#2563eb' }}>{device.powerQuality?.thdCurrent || '3.4%'}</p>
                  <p style={{ fontSize: '11px', color: '#059669', marginTop: '2px' }}>Nominal Harmonics</p>
                </div>
                <div style={{ padding: '14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
                  <p style={{ fontSize: '12px', color: '#64748b' }}>Power Factor</p>
                  <p style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>{device.powerQuality?.pf || '0.96'}</p>
                  <p style={{ fontSize: '11px', color: '#059669', marginTop: '2px' }}>Optimal Compensation</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'FAULTS' && (
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px' }}>Recorded Fault & Warning History</h4>
              {!device.faultHistory || device.faultHistory.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px', color: '#64748b', background: '#f8fafc', borderRadius: '10px' }}>
                  <ShieldCheck size={32} color="#059669" style={{ margin: '0 auto 8px auto' }} />
                  <p style={{ fontSize: '13px', fontWeight: 600 }}>No faults recorded for this unit.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {device.faultHistory.map((fault) => (
                    <div key={fault.id} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <AlertTriangle size={16} color={fault.severity === 'MEDIUM' ? '#d97706' : '#2563eb'} />
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{fault.title}</p>
                          <p style={{ fontSize: '11px', color: '#64748b' }}>Logged on {fault.date} • Code: {fault.id}</p>
                        </div>
                      </div>
                      <span className={`badge ${fault.resolved ? 'badge-green' : 'badge-amber'}`}>
                        {fault.resolved ? 'RESOLVED' : 'ACTIVE'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'MAINTENANCE' && (
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px' }}>Preventive Maintenance Schedule</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
                <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>LAST SERVICED</span>
                  <p style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>{device.lastMaintenance || '2026-05-15'}</p>
                </div>
                <div style={{ padding: '14px', background: '#ecfdf5', borderRadius: '10px', border: '1px solid #a7f3d0' }}>
                  <span style={{ fontSize: '11px', color: '#059669', fontWeight: 700 }}>NEXT SCHEDULED INSPECTION</span>
                  <p style={{ fontSize: '15px', fontWeight: 700, color: '#059669' }}>{device.nextMaintenance || '2026-09-15'}</p>
                </div>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <Wrench size={16} /> Create Maintenance Work Order
              </button>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
