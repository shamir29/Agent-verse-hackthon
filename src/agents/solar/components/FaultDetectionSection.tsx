import React from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Wrench,
  Sparkles,
} from 'lucide-react';
import { useSolar } from '../context/SolarContext';

export const FaultDetectionSection: React.FC = () => {
  const { faultAlerts, acknowledgeAlert, resolveAlert } = useSolar();

  return (
    <section style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle size={22} color="var(--red-500)" />
            Section 4 — AI Anomaly & Fault Detection Engine
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Autonomous real-time pattern analysis for panel hotspotting, impedance spikes, and efficiency drops
          </p>
        </div>

        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--red-600)', backgroundColor: 'var(--red-50)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--red-100)' }}>
          {faultAlerts.filter((a) => !a.acknowledged).length} Unacknowledged Alerts
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {faultAlerts.length === 0 ? (
          <div className="card-solid" style={{ padding: '2.5rem', textAlign: 'center' }}>
            <CheckCircle2 size={42} color="var(--green-500)" style={{ margin: '0 auto 0.75rem auto' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Zero System Faults Active</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              All 48 solar panel strings and hybrid inverter banks are operating at maximum nominal performance.
            </p>
          </div>
        ) : (
          faultAlerts.map((alert) => {
            const isCritical = alert.severity === 'CRITICAL';
            const isWarning = alert.severity === 'WARNING';

            return (
              <div
                key={alert.id}
                className="card-solid"
                style={{
                  padding: '1.25rem',
                  borderLeft: `4px solid ${isCritical ? 'var(--red-500)' : isWarning ? 'var(--yellow-500)' : 'var(--blue-500)'}`,
                  opacity: alert.acknowledged ? 0.75 : 1,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ flex: 1, minWidth: '280px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
                      <span className={isCritical ? 'badge-red' : isWarning ? 'badge-yellow' : 'badge-green'}>
                        {alert.severity}
                      </span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                        {alert.component}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        Detected: {alert.detectedAt}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0.2rem 0 0.5rem 0' }}>
                      {alert.title}
                    </h3>

                    {/* Root Cause & AI Action */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginTop: '0.75rem' }}>
                      <div style={{ backgroundColor: 'var(--bg-subtle)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                          Root Cause Analysis:
                        </div>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0 0' }}>
                          {alert.rootCause}
                        </p>
                      </div>

                      <div style={{ backgroundColor: 'var(--green-50)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--green-100)' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--green-700)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Sparkles size={12} /> AI Recommended Action:
                        </div>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-primary)', margin: '0.2rem 0 0 0' }}>
                          {alert.recommendedAction}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right side: Estimated Loss & Action Controls */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        ESTIMATED REVENUE LOSS
                      </div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--red-600)' }}>
                        -${alert.estimatedLossUsdDay.toFixed(2)} <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>/day</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {!alert.acknowledged && (
                        <button
                          onClick={() => acknowledgeAlert(alert.id)}
                          className="btn-secondary"
                          style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
                        >
                          Acknowledge
                        </button>
                      )}

                      <button
                        onClick={() => resolveAlert(alert.id)}
                        className="btn-primary"
                        style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
                      >
                        <Wrench size={14} />
                        <span>Dispatch Repair</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
