import React, { useState, useEffect } from 'react';
import {
  Activity,
  Sun,
  Zap,
  Thermometer,
  ShieldCheck,
  BatteryCharging,
  Building,
  Radio,
} from 'lucide-react';
import { useSolar } from '../context/SolarContext';

export const LiveMonitoringSection: React.FC = () => {
  const { telemetry } = useSolar();

  // Dynamic live historical telemetry points array for the chart
  const [history, setHistory] = useState<Array<{ time: string; power: number; irradiance: number }>>([
    { time: '14:00', power: 460, irradiance: 900 },
    { time: '14:05', power: 472, irradiance: 920 },
    { time: '14:10', power: 480, irradiance: 935 },
    { time: '14:15', power: 485, irradiance: 945 },
  ]);

  useEffect(() => {
    setHistory((prev) => {
      const next = [
        ...prev.slice(-14),
        {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          power: telemetry.currentPowerKw,
          irradiance: telemetry.solarIrradianceWm2,
        },
      ];
      return next;
    });
  }, [telemetry.timestamp]);

  // Calculations for SVG charts
  const maxPower = 550;
  const chartHeight = 160;
  const chartWidth = 500;

  const pointsString = history
    .map((d, i) => {
      const x = (i / (history.length - 1 || 1)) * chartWidth;
      const y = chartHeight - (d.power / maxPower) * chartHeight;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <section style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={22} color="var(--green-600)" />
            Section 1 — Live Solar Telemetry & Grid Flow
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Real-time power generation telemetry, string level efficiency, and grid distribution
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <Radio size={14} color="var(--green-500)" className="animate-pulse-slow" />
          <span>Polling interval: 2.0s</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.25rem' }}>
        {/* Left Column: Live Power Chart & Flow Diagram */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Animated Solar Energy Flow Diagram */}
          <div className="card-solid" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Interactive Plant Energy Distribution Flow
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem',
              backgroundColor: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              position: 'relative',
            }}>
              {/* Solar Array Node */}
              <div style={{ textAlign: 'center', zIndex: 2 }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--yellow-100)',
                  border: '2px solid var(--yellow-500)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.4rem auto',
                  color: 'var(--yellow-600)',
                }}>
                  <Sun size={26} />
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>Solar Array</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--green-600)', fontWeight: 600 }}>{telemetry.currentPowerKw} kW</div>
              </div>

              {/* Connecting Flow 1 */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 0.5rem' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>DC Power</div>
                <svg width="100%" height="12">
                  <line x1="0" y1="6" x2="100%" y2="6" stroke="var(--yellow-500)" strokeWidth="3" className="animate-flow" />
                </svg>
              </div>

              {/* Inverter Node */}
              <div style={{ textAlign: 'center', zIndex: 2 }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--green-100)',
                  border: '2px solid var(--green-500)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.4rem auto',
                  color: 'var(--green-700)',
                }}>
                  <Zap size={26} />
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>Inverter Bank</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{telemetry.inverterEfficiencyPct}% Eff.</div>
              </div>

              {/* Connecting Flow 2 */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 0.5rem' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>AC Power</div>
                <svg width="100%" height="12">
                  <line x1="0" y1="6" x2="100%" y2="6" stroke="var(--green-500)" strokeWidth="3" className="animate-flow" />
                </svg>
              </div>

              {/* Output Destination Nodes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', zIndex: 2 }}>
                {/* Battery */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'var(--bg-surface)',
                  padding: '0.4rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.75rem',
                }}>
                  <BatteryCharging size={16} color="var(--green-600)" />
                  <div>
                    <div style={{ fontWeight: 700 }}>Battery Bank</div>
                    <div style={{ color: 'var(--green-600)' }}>+{telemetry.batteryPowerKw} kW</div>
                  </div>
                </div>

                {/* Grid */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'var(--bg-surface)',
                  padding: '0.4rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.75rem',
                }}>
                  <Building size={16} color="var(--blue-500)" />
                  <div>
                    <div style={{ fontWeight: 700 }}>Utility Grid Export</div>
                    <div style={{ color: 'var(--blue-500)' }}>+{telemetry.gridExportKw} kW</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Power Output Line Chart */}
          <div className="card-solid" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Live Power Output Trend (kW)
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--green-600)', fontWeight: 600 }}>
                Peak Today: 492 kW
              </span>
            </div>

            <div style={{ position: 'relative', width: '100%', height: `${chartHeight}px` }}>
              <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
                {/* Background Grid Lines */}
                <line x1="0" y1="40" x2={chartWidth} y2="40" stroke="var(--border-light)" strokeDasharray="3 3" />
                <line x1="0" y1="80" x2={chartWidth} y2="80" stroke="var(--border-light)" strokeDasharray="3 3" />
                <line x1="0" y1="120" x2={chartWidth} y2="120" stroke="var(--border-light)" strokeDasharray="3 3" />

                {/* Area Gradient */}
                <defs>
                  <linearGradient id="powerGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--green-500)" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="var(--green-500)" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                <polygon points={`0,${chartHeight} ${pointsString} ${chartWidth},${chartHeight}`} fill="url(#powerGrad)" />

                {/* Trend Polyline */}
                <polyline points={pointsString} fill="none" stroke="var(--green-500)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {history.map((h, i) => (
                <span key={i}>{h.time}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Gauges & Telemetry Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Circular System Efficiency Gauge */}
          <div className="card-solid" style={{ padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              Plant Performance Ratio Gauge
            </div>

            <div style={{ position: 'relative', width: '130px', height: '130px', margin: '0 auto' }}>
              <svg width="130" height="130" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="var(--bg-subtle)" strokeWidth="10" />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="var(--green-500)"
                  strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 42 * (telemetry.systemEfficiencyPct / 100)} 999`}
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  style={{ transition: 'stroke-dasharray 0.5s ease' }}
                />
              </svg>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
                  {telemetry.systemEfficiencyPct}%
                </span>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--green-600)', textTransform: 'uppercase', marginTop: '0.2rem' }}>
                  OPTIMAL
                </span>
              </div>
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Target benchmark: ≥ 95.0% PR
            </div>
          </div>

          {/* Environmental Sensor Telemetry List */}
          <div className="card-solid" style={{ padding: '1rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              Telemetry Sensors Breakdown
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {/* Solar Irradiance */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.4rem 0.6rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                  <Sun size={16} color="var(--yellow-600)" />
                  <span>Solar Irradiance</span>
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{telemetry.solarIrradianceWm2} W/m²</span>
              </div>

              {/* Panel Temp */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.4rem 0.6rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                  <Thermometer size={16} color="var(--red-500)" />
                  <span>Panel Surface Temp</span>
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{telemetry.panelTempC} °C</span>
              </div>

              {/* Inverter Status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.4rem 0.6rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                  <ShieldCheck size={16} color="var(--green-600)" />
                  <span>Inverter Bank Status</span>
                </div>
                <span className="badge-green">{telemetry.inverterStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
