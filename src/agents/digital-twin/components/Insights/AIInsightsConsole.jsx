import React from 'react';
import { useDigitalTwin } from '../../context/DigitalTwinContext';
import { Lightbulb, CheckCircle2, X, AlertTriangle, ShieldCheck, ArrowRight, Play } from 'lucide-react';

export const AIInsightsConsole = () => {
  const { insights, dismissInsight, runSimulation, setActiveTab } = useDigitalTwin();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Lightbulb size={24} style={{ color: 'var(--accent-orange)' }} /> AI Actionable Insights & Recommendations
          </h2>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            Real-time proactive optimization suggestions synthesised by the Digital Twin AI Reasoning Core.
          </p>
        </div>

        <span className="badge badge-orange" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
          {insights.length} Active Recommendations
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {insights.map((ins) => {
          const isCritical = ins.priority === 'CRITICAL';
          const isHigh = ins.priority === 'HIGH';

          return (
            <div 
              key={ins.id}
              className="card animate-fade-in"
              style={{
                padding: '20px',
                borderLeft: '4px solid',
                borderLeftColor: isCritical ? 'var(--accent-red)' : isHigh ? 'var(--accent-orange)' : 'var(--accent-blue)',
                display: 'flex',
                justifyContent: 'space-between',
                gap: '20px',
                alignItems: 'flex-start'
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span className={`badge ${isCritical ? 'badge-red' : isHigh ? 'badge-orange' : 'badge-blue'}`}>
                    {ins.priority} PRIORITY
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldCheck size={14} /> {ins.confidence}% AI Confidence
                  </span>
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                  "{ins.title}"
                </h3>

                <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                  <strong>Recommended Action:</strong> {ins.recommendedAction}
                </div>

                <div style={{
                  display: 'flex',
                  gap: '16px',
                  backgroundColor: 'var(--bg-app)',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.775rem'
                }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Affected Systems: </span>
                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{ins.affectedSystems.join(', ')}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Expected Benefit: </span>
                    <span style={{ fontWeight: 700, color: 'var(--accent-green)' }}>{ins.expectedBenefit}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '160px' }}>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    alert(`Applied AI Recommendation: "${ins.recommendedAction}"`);
                    dismissInsight(ins.id);
                  }}
                  style={{ width: '100%', fontSize: '0.8rem', padding: '8px 12px' }}
                >
                  <CheckCircle2 size={14} /> Apply Action
                </button>

                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setActiveTab('simulation');
                    runSimulation('sim_power_outage', 7);
                  }}
                  style={{ width: '100%', fontSize: '0.8rem', padding: '8px 12px' }}
                >
                  <Play size={14} /> Simulate First
                </button>

                <button
                  onClick={() => dismissInsight(ins.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontSize: '0.725rem',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    marginTop: '4px'
                  }}
                >
                  Dismiss Recommendation
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
