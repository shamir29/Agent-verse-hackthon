import React from 'react';
import {
  X,
  Sparkles,
  Droplets,
  ShieldAlert,
} from 'lucide-react';
import { useSolar } from '../context/SolarContext';

export const PanelDetailModal: React.FC = () => {
  const { selectedPanel, setSelectedPanel, runDeepDiagnostics, cleanPanelArray } = useSolar();

  if (!selectedPanel) return null;

  return (
    <div className="modal-overlay" onClick={() => setSelectedPanel(null)}>
      <div
        className="card-solid"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '540px',
          maxWidth: '92vw',
          padding: '1.5rem',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className={selectedPanel.status === 'FAULT' ? 'badge-red' : selectedPanel.status === 'WARNING' ? 'badge-yellow' : 'badge-green'}>
                {selectedPanel.status}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{selectedPanel.stringId}</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
              {selectedPanel.id} Diagnostic Inspector
            </h3>
          </div>

          <button
            onClick={() => setSelectedPanel(null)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Fault Description Banner (if present) */}
        {selectedPanel.faultDescription && (
          <div style={{
            backgroundColor: selectedPanel.status === 'FAULT' ? 'var(--red-50)' : 'var(--yellow-50)',
            border: `1px solid ${selectedPanel.status === 'FAULT' ? 'var(--red-100)' : 'var(--yellow-100)'}`,
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem',
          }}>
            <ShieldAlert size={18} color={selectedPanel.status === 'FAULT' ? 'var(--red-600)' : 'var(--yellow-600)'} style={{ marginTop: '2px', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: selectedPanel.status === 'FAULT' ? 'var(--red-600)' : 'var(--yellow-600)' }}>
                Detected Anomaly
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-primary)', marginTop: '0.1rem' }}>
                {selectedPanel.faultDescription}
              </div>
            </div>
          </div>
        )}

        {/* Detailed Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1.25rem' }}>
          <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Power Output</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{selectedPanel.powerOutputW} W</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--green-600)' }}>Target: 400 W</div>
          </div>

          <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Health Score</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: selectedPanel.healthScorePct < 80 ? 'var(--red-500)' : 'var(--green-600)' }}>
              {selectedPanel.healthScorePct}%
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>IV-Curve Nominal</div>
          </div>

          <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Voltage & Current</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{selectedPanel.voltageV}V / {selectedPanel.currentA}A</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>MPPT Input 1</div>
          </div>

          <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Surface Temperature</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: selectedPanel.temperatureC > 50 ? 'var(--red-500)' : 'var(--text-primary)' }}>
              {selectedPanel.temperatureC} °C
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Max Limit: 65°C</div>
          </div>

          <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Soiling / Dirt Accumulation</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: selectedPanel.dirtLevelPct > 20 ? 'var(--yellow-600)' : 'var(--text-primary)' }}>
              {selectedPanel.dirtLevelPct}%
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Last Cleaned: {selectedPanel.lastCleanedDate}</div>
          </div>

          <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Shading Detection</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: selectedPanel.shadingLevelPct > 15 ? 'var(--yellow-600)' : 'var(--text-primary)' }}>
              {selectedPanel.shadingLevelPct}%
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>West Horizon Shadow</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button
            onClick={() => runDeepDiagnostics(selectedPanel.id)}
            className="btn-secondary"
            style={{ fontSize: '0.8rem' }}
          >
            <Sparkles size={16} color="var(--green-600)" />
            <span>Run Deep AI Diagnostics</span>
          </button>

          <button
            onClick={() => {
              cleanPanelArray(selectedPanel.stringId);
              setSelectedPanel(null);
            }}
            className="btn-primary"
            style={{ fontSize: '0.8rem' }}
          >
            <Droplets size={16} />
            <span>Clean String {selectedPanel.stringId}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
