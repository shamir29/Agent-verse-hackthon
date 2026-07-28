import React, { useState } from 'react';
import { 
  Activity, 
  Zap, 
  Battery, 
  Sun, 
  Wifi, 
  Pause, 
  Play, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle,
  Layers
} from 'lucide-react';

export default function LiveMonitoringView({ 
  telemetry, 
  history, 
  isLiveStreaming, 
  setIsLiveStreaming 
}) {
  const [refreshRate, setRefreshRate] = useState('1s');

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 className="section-title">Section 1 — Live Energy Monitoring</h2>
          <p className="section-desc">High-frequency sub-second power quality, grid sync, and load profile telemetry</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', background: '#ffffff', padding: '4px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b', fontWeight: 600 }}>Polling Interval:</span>
            <select 
              value={refreshRate} 
              onChange={(e) => setRefreshRate(e.target.value)}
              style={{ border: 'none', outline: 'none', fontWeight: 700, color: '#2563eb', cursor: 'pointer' }}
            >
              <option value="1s">1 Second (Real-time)</option>
              <option value="5s">5 Seconds</option>
              <option value="15s">15 Seconds</option>
            </select>
          </div>
          <button 
            className={`btn ${isLiveStreaming ? 'btn-secondary' : 'btn-primary'}`}
            onClick={() => setIsLiveStreaming(!isLiveStreaming)}
          >
            {isLiveStreaming ? <><Pause size={16} /> Pause Stream</> : <><Play size={16} /> Resume Stream</>}
          </button>
        </div>
      </div>

      {/* 8 Metric Telemetry Cards Grid */}
      <div className="grid-4" style={{ marginBottom: '24px' }}>
        {/* 1. Real-time Total Load */}
        <div className="card" style={{ borderLeft: '4px solid #2563eb' }}>
          <span className="kpi-label">TOTAL FACILITY LOAD</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0' }}>
            <span className="kpi-value" style={{ fontSize: '28px', color: '#2563eb' }}>{telemetry.powerKw.toFixed(1)}</span>
            <span className="kpi-unit">kW</span>
          </div>
          <span className="badge badge-blue">Active Draw</span>
        </div>

        {/* 2. Voltage */}
        <div className="card" style={{ borderLeft: '4px solid #059669' }}>
          <span className="kpi-label">3-PHASE VOLTAGE</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0' }}>
            <span className="kpi-value" style={{ fontSize: '28px', color: '#059669' }}>{telemetry.voltage.toFixed(1)}</span>
            <span className="kpi-unit">V</span>
          </div>
          <span className="badge badge-green">Nominal (400V ±1%)</span>
        </div>

        {/* 3. Current */}
        <div className="card" style={{ borderLeft: '4px solid #7c3aed' }}>
          <span className="kpi-label">TOTAL CURRENT</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0' }}>
            <span className="kpi-value" style={{ fontSize: '28px', color: '#7c3aed' }}>{telemetry.current.toFixed(1)}</span>
            <span className="kpi-unit">A</span>
          </div>
          <span className="badge badge-blue">Balanced Phases</span>
        </div>

        {/* 4. Frequency */}
        <div className="card" style={{ borderLeft: '4px solid #0891b2' }}>
          <span className="kpi-label">GRID FREQUENCY</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0' }}>
            <span className="kpi-value" style={{ fontSize: '28px', color: '#0891b2' }}>{telemetry.frequency.toFixed(2)}</span>
            <span className="kpi-unit">Hz</span>
          </div>
          <span className="badge badge-green">Synced (50.00 Hz)</span>
        </div>

        {/* 5. Power Factor */}
        <div className="card" style={{ borderLeft: '4px solid #d97706' }}>
          <span className="kpi-label">POWER FACTOR</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0' }}>
            <span className="kpi-value" style={{ fontSize: '28px', color: '#d97706' }}>{telemetry.powerFactor.toFixed(2)}</span>
            <span className="kpi-unit">cos φ</span>
          </div>
          <span className="badge badge-amber">Capacitor Active</span>
        </div>

        {/* 6. Grid Status */}
        <div className="card" style={{ borderLeft: '4px solid #059669' }}>
          <span className="kpi-label">GRID INTERCONNECT</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0' }}>
            <span className="kpi-value" style={{ fontSize: '22px', color: '#059669' }}>{telemetry.gridStatus}</span>
          </div>
          <span className="badge badge-green">Utility Grid Synced</span>
        </div>

        {/* 7. Renewable Contribution */}
        <div className="card" style={{ borderLeft: '4px solid #059669' }}>
          <span className="kpi-label">RENEWABLE CONTRIBUTION</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0' }}>
            <span className="kpi-value" style={{ fontSize: '28px', color: '#059669' }}>{telemetry.renewableContributionPercent.toFixed(1)}</span>
            <span className="kpi-unit">%</span>
          </div>
          <span className="badge badge-green">Solar: {telemetry.solarPowerKw.toFixed(0)} kW</span>
        </div>

        {/* 8. Battery Status */}
        <div className="card" style={{ borderLeft: '4px solid #2563eb' }}>
          <span className="kpi-label">BATTERY STORAGE (BESS)</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0' }}>
            <span className="kpi-value" style={{ fontSize: '28px', color: '#2563eb' }}>{telemetry.batterySocPercent.toFixed(0)}</span>
            <span className="kpi-unit">% SoC</span>
          </div>
          <span className="badge badge-blue">Charging ({telemetry.batteryPowerKw} kW)</span>
        </div>
      </div>

      {/* 4 Live Interactive Telemetry Charts */}
      <div className="grid-2" style={{ marginBottom: '24px' }}>
        {/* Chart 1: Live Energy Usage */}
        <div className="card">
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
                <Zap size={18} />
              </div>
              <div>
                <h3 className="card-title">Live Energy Usage (kW vs Time)</h3>
                <p className="card-subtitle">Real-time facility load curve</p>
              </div>
            </div>
            <span className="badge badge-blue">Updated Just Now</span>
          </div>
          <div style={{ height: '220px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', padding: '16px', display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
            {history.slice(-12).map((item, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>{item.totalLoadKw}kW</span>
                <div 
                  style={{ 
                    width: '100%', 
                    height: `${(item.totalLoadKw / 550) * 150}px`, 
                    background: 'linear-gradient(180deg, #2563eb, #3b82f6)',
                    borderRadius: '4px'
                  }} 
                />
                <span style={{ fontSize: '10px', color: '#64748b' }}>{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Real-time Load Curve Breakdown */}
        <div className="card">
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-icon" style={{ background: '#ecfdf5', color: '#059669' }}>
                <Sun size={18} />
              </div>
              <div>
                <h3 className="card-title">Real-time Load Curve & Generation</h3>
                <p className="card-subtitle">Grid Power vs Solar Generation vs Battery</p>
              </div>
            </div>
            <span className="badge badge-green">Multi-Source Sync</span>
          </div>
          <div style={{ height: '220px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', padding: '16px', display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
            {history.slice(-12).map((item, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '2px', alignItems: 'center' }}>
                  <div style={{ width: '100%', height: `${(item.solarKw / 550) * 150}px`, background: '#059669', borderRadius: '2px' }} title={`Solar: ${item.solarKw} kW`} />
                  <div style={{ width: '100%', height: `${(item.gridKw / 550) * 150}px`, background: '#2563eb', borderRadius: '2px' }} title={`Grid: ${item.gridKw} kW`} />
                </div>
                <span style={{ fontSize: '10px', color: '#64748b' }}>{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 3: Voltage Stability */}
        <div className="card">
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-icon" style={{ background: '#fffbe6', color: '#d97706' }}>
                <Activity size={18} />
              </div>
              <div>
                <h3 className="card-title">Voltage Stability Monitoring</h3>
                <p className="card-subtitle">3-Phase Voltage Deviation Curve (Nominal 400V)</p>
              </div>
            </div>
            <span className="badge badge-amber">Variance &lt;0.8%</span>
          </div>
          <div style={{ height: '200px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600 }}>
                <span>Phase A-B: 401.2 V</span>
                <span>Phase B-C: 400.8 V</span>
                <span>Phase C-A: 401.5 V</span>
              </div>
              <div style={{ height: '80px', borderBottom: '2px dashed #94a3b8', borderTop: '2px dashed #94a3b8', background: '#ffffff', borderRadius: '6px', position: 'relative', display: 'flex', alignItems: 'center', padding: '0 10px' }}>
                <div style={{ position: 'absolute', width: '96%', height: '4px', background: '#059669', borderRadius: '2px' }} />
                <div style={{ zIndex: 2, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <span style={{ background: '#059669', color: '#ffffff', padding: '2px 6px', borderRadius: '4px', fontSize: '10px' }}>401.2V</span>
                  <span style={{ background: '#059669', color: '#ffffff', padding: '2px 6px', borderRadius: '4px', fontSize: '10px' }}>400.8V</span>
                  <span style={{ background: '#059669', color: '#ffffff', padding: '2px 6px', borderRadius: '4px', fontSize: '10px' }}>401.5V</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart 4: Frequency Monitoring */}
        <div className="card">
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-icon" style={{ background: '#f5f3ff', color: '#7c3aed' }}>
                <Layers size={18} />
              </div>
              <div>
                <h3 className="card-title">Grid Frequency Stability (Hz)</h3>
                <p className="card-subtitle">Real-time sub-Hz frequency deviation tracking</p>
              </div>
            </div>
            <span className="badge badge-blue">Nominal 50.00 Hz</span>
          </div>
          <div style={{ height: '200px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '32px', fontWeight: 800, color: '#7c3aed' }}>{telemetry.frequency.toFixed(2)} Hz</span>
              <p style={{ fontSize: '12px', color: '#64748b' }}>Frequency Tolerance Range: 49.80 Hz – 50.20 Hz</p>
            </div>
            <div style={{ width: '100%', height: '12px', background: '#e2e8f0', borderRadius: '6px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ width: '50%', height: '100%', background: '#7c3aed', borderRadius: '6px' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
