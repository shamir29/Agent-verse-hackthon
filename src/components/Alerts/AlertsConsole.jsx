import React, { useState } from 'react';
import { useDigitalTwin } from '../../context/DigitalTwinContext';
import { AlertTriangle, ShieldAlert, CheckCircle2, Filter, Search, Volume2, VolumeX } from 'lucide-react';

export const AlertsConsole = () => {
  const { alerts, resolveAlert } = useDigitalTwin();
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [soundEnabled, setSoundEnabled] = useState(true);

  const filteredAlerts = alerts.filter(a => {
    if (filterSeverity !== 'ALL' && a.severity !== filterSeverity) return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertTriangle size={24} style={{ color: 'var(--accent-red)' }} /> Real-Time City Alerts & Emergency Response Console
          </h2>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            Real-time alarm matrix capturing grid faults, water leaks, solar drops, EV charger offline events, and cyber anomalies.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            {soundEnabled ? 'Alarm Sound: ON' : 'Alarm Sound: OFF'}
          </button>

          <div style={{ display: 'flex', gap: '4px' }}>
            {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map(sev => (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                className={`btn ${filterSeverity === sev ? 'btn-primary' : 'btn-secondary'} btn-sm`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredAlerts.map((alt) => {
          const isResolved = alt.status === 'RESOLVED';

          return (
            <div 
              key={alt.id}
              className="card"
              style={{
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: isResolved ? 'var(--bg-app)' : alt.severity === 'CRITICAL' ? '#fef2f2' : alt.severity === 'HIGH' ? '#fff7ed' : '#ffffff',
                borderColor: isResolved ? 'var(--border-color)' : alt.severity === 'CRITICAL' ? '#fca5a5' : alt.severity === 'HIGH' ? '#fed7aa' : 'var(--border-color)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: alt.severity === 'CRITICAL' ? '#fee2e2' : alt.severity === 'HIGH' ? '#ffedd5' : '#e0f2fe',
                  color: alt.severity === 'CRITICAL' ? '#b91c1c' : alt.severity === 'HIGH' ? '#c2410c' : '#0369a1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700
                }}>
                  <AlertTriangle size={18} />
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className={`badge ${alt.severity === 'CRITICAL' ? 'badge-red' : alt.severity === 'HIGH' ? 'badge-orange' : 'badge-blue'}`}>
                      {alt.severity}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                      ID: {alt.id} • {alt.system}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                    {alt.title}
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Location: <strong>{alt.location}</strong> • Received: {alt.timestamp}
                  </span>
                </div>
              </div>

              <div>
                {isResolved ? (
                  <span className="badge badge-green">
                    <CheckCircle2 size={12} /> RESOLVED
                  </span>
                ) : (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => resolveAlert(alt.id)}
                  >
                    <CheckCircle2 size={14} /> Resolve Alert
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
