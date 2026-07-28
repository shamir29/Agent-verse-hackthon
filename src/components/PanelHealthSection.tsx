import React from 'react';
import {
  Grid,
  Filter,
  Droplets,
} from 'lucide-react';
import { useSolar } from '../context/SolarContext';
import type { PanelData } from '../types/solar';

export const PanelHealthSection: React.FC = () => {
  const {
    panels,
    setSelectedPanel,
    heatmapMode,
    setHeatmapMode,
    cleanPanelArray,
  } = useSolar();

  const [statusFilter, setStatusFilter] = React.useState<'ALL' | 'HEALTHY' | 'WARNING' | 'FAULT'>('ALL');

  const filteredPanels = panels.filter((p) => {
    if (statusFilter === 'HEALTHY') return p.status === 'HEALTHY';
    if (statusFilter === 'WARNING') return p.status === 'WARNING';
    if (statusFilter === 'FAULT') return p.status === 'FAULT';
    return true;
  });

  // Render cell color based on heatmap mode
  const getPanelBg = (p: PanelData) => {
    if (heatmapMode === 'STATUS') {
      if (p.status === 'FAULT') return '#FEE2E2';
      if (p.status === 'WARNING') return '#FEF3C7';
      return '#DCFCE7';
    }
    if (heatmapMode === 'DIRT') {
      if (p.dirtLevelPct > 30) return '#FEF3C7';
      if (p.dirtLevelPct > 15) return '#FEF9C3';
      return '#DCFCE7';
    }
    if (heatmapMode === 'TEMP') {
      if (p.temperatureC > 50) return '#FEE2E2';
      if (p.temperatureC > 42) return '#FEF3C7';
      return '#DCFCE7';
    }
    if (heatmapMode === 'SHADING') {
      if (p.shadingLevelPct > 20) return '#FEF3C7';
      return '#DCFCE7';
    }
    // POWER
    if (p.powerOutputW < 250) return '#FEE2E2';
    if (p.powerOutputW < 350) return '#FEF3C7';
    return '#DCFCE7';
  };

  const getPanelBorder = (p: PanelData) => {
    if (p.status === 'FAULT') return 'var(--red-500)';
    if (p.status === 'WARNING') return 'var(--yellow-500)';
    return 'var(--green-500)';
  };

  return (
    <section style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Grid size={22} color="var(--green-600)" />
            Section 3 — Interactive Panel Health Matrix (48 Strings)
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Real-time panel array matrix. Select any panel for deep thermal and electrical diagnostics.
          </p>
        </div>

        {/* Clean Array Action Button */}
        <button
          onClick={() => cleanPanelArray()}
          className="btn-primary"
          style={{ fontSize: '0.8rem' }}
        >
          <Droplets size={16} />
          <span>Execute Automated Array Wash</span>
        </button>
      </div>

      <div className="card-solid" style={{ padding: '1.25rem' }}>
        {/* Controls: Heatmap Mode & Filters */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          {/* Heatmap Toggles */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Heatmap:</span>
            {(['STATUS', 'POWER', 'DIRT', 'TEMP', 'SHADING'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setHeatmapMode(mode)}
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '0.3rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: heatmapMode === mode ? 'var(--green-600)' : 'var(--bg-subtle)',
                  color: heatmapMode === mode ? '#FFFFFF' : 'var(--text-secondary)',
                  border: '1px solid var(--border-light)',
                  cursor: 'pointer',
                }}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Status Filter Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Filter size={14} color="var(--text-muted)" />
            {(['ALL', 'HEALTHY', 'WARNING', 'FAULT'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '0.3rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: statusFilter === filter ? 'var(--text-primary)' : 'var(--bg-subtle)',
                  color: statusFilter === filter ? '#FFFFFF' : 'var(--text-secondary)',
                  border: '1px solid var(--border-light)',
                  cursor: 'pointer',
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Panel Array Grid Matrix (4 Strings: String A, B, C, D) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {['String A', 'String B', 'String C', 'String D'].map((strName) => {
            const stringPanels = filteredPanels.filter((p) => p.stringId === strName);
            if (stringPanels.length === 0) return null;

            return (
              <div
                key={strName}
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>{strName}</span>
                  <button
                    onClick={() => cleanPanelArray(strName)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '0.7rem',
                      color: 'var(--green-600)',
                      cursor: 'pointer',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.2rem',
                    }}
                  >
                    <Droplets size={12} />
                    Clean String
                  </button>
                </div>

                {/* 3 Rows x 4 Cols panel cells */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem' }}>
                  {stringPanels.map((panel) => (
                    <button
                      key={panel.id}
                      onClick={() => setSelectedPanel(panel)}
                      title={`Click for diagnostics: ${panel.id} (${panel.powerOutputW}W, ${panel.status})`}
                      style={{
                        backgroundColor: getPanelBg(panel),
                        border: `2px solid ${getPanelBorder(panel)}`,
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.4rem 0.2rem',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                      }}
                    >
                      <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {panel.id.split('-')[1]}
                      </div>
                      <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {panel.powerOutputW}W
                      </div>
                      <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>
                        {heatmapMode === 'DIRT' ? `${panel.dirtLevelPct}% dirt` : heatmapMode === 'TEMP' ? `${panel.temperatureC}°C` : `${panel.healthScorePct}% health`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '1.25rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#DCFCE7', border: '1px solid var(--green-500)' }} />
            <span>Healthy ({panels.filter((p) => p.status === 'HEALTHY').length})</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#FEF3C7', border: '1px solid var(--yellow-500)' }} />
            <span>Warning / Dirt ({panels.filter((p) => p.status === 'WARNING').length})</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#FEE2E2', border: '1px solid var(--red-500)' }} />
            <span>Fault / Hotspot ({panels.filter((p) => p.status === 'FAULT').length})</span>
          </div>
        </div>
      </div>
    </section>
  );
};
