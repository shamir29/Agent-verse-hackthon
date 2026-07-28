import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  Zap,
  Grid,
  Sun,
  BatteryCharging,
  AlertTriangle,
  FileText,
  ChevronRight,
} from 'lucide-react';
import { useSolar } from '../context/SolarContext';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setActiveSection, setSelectedPanel, panels } = useSolar();
  const [query, setQuery] = useState('');

  // Keyboard shortcut '/' to trigger search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isSearchOpen) {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const searchItems = [
    { id: 'dashboard', title: 'Dashboard Overview', type: 'Section', icon: Zap },
    { id: 'live', title: 'Live Solar Telemetry Chart & Grid Flow', type: 'Section', icon: Zap },
    { id: 'forecast', title: 'Solar Forecast & Generation Prediction', type: 'Section', icon: Sun },
    { id: 'panels', title: 'Interactive Panel Health Matrix (48 Strings)', type: 'Section', icon: Grid },
    { id: 'battery', title: 'Battery Optimization & BMS Schedule', type: 'Section', icon: BatteryCharging },
    { id: 'faults', title: 'AI Anomaly Fault Detection Engine', type: 'Section', icon: AlertTriangle },
    { id: 'reports', title: 'Automated Reports Generator & CSV Export', type: 'Section', icon: FileText },
  ];

  const matchedPanels = panels.filter((p) => p.id.toLowerCase().includes(query.toLowerCase()) || p.stringId.toLowerCase().includes(query.toLowerCase()));
  const matchedSections = searchItems.filter((s) => s.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="modal-overlay" onClick={() => setIsSearchOpen(false)}>
      <div
        className="card-solid"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '560px',
          maxWidth: '92vw',
          padding: '1.25rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Search Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem', marginBottom: '0.85rem' }}>
          <Search size={20} color="var(--green-600)" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search metrics, sections, strings (e.g. Panel B2-1, Battery, Forecast)..."
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '0.95rem',
              backgroundColor: 'transparent',
              color: 'var(--text-primary)',
            }}
          />
          <button onClick={() => setIsSearchOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <X size={18} />
          </button>
        </div>

        {/* Search Results */}
        <div style={{ maxHeight: '320px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {matchedSections.length > 0 && (
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Sections & Dashboards
              </div>
              {matchedSections.map((sec) => {
                const Icon = sec.icon;
                return (
                  <div
                    key={sec.id}
                    onClick={() => {
                      setActiveSection(sec.id);
                      setIsSearchOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.6rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-subtle)',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <Icon size={16} color="var(--green-600)" />
                      <span>{sec.title}</span>
                    </div>
                    <ChevronRight size={14} color="var(--text-muted)" />
                  </div>
                );
              })}
            </div>
          )}

          {query.trim() && matchedPanels.length > 0 && (
            <div style={{ marginTop: '0.5rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Solar Panel String Matrix
              </div>
              {matchedPanels.slice(0, 6).map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setActiveSection('panels');
                    setSelectedPanel(p);
                    setIsSearchOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.5rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-subtle)',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    marginBottom: '0.3rem',
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 700 }}>{p.id}</span> ({p.stringId})
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                      {p.powerOutputW}W | {p.status}
                    </span>
                  </div>
                  <span className={p.status === 'FAULT' ? 'badge-red' : p.status === 'WARNING' ? 'badge-yellow' : 'badge-green'}>
                    Inspect
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
