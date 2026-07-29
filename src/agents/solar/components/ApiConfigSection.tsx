import React from 'react';
import {
  Settings,
  Sliders,
  Code,
} from 'lucide-react';
import { useSolar } from '../context/SolarContext';

export const ApiConfigSection: React.FC = () => {
  const { telemetryConfig, updateTelemetryConfig } = useSolar();

  return (
    <section style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Settings size={22} color="var(--green-600)" />
            Section 11 — Backend Telemetry, MQTT/WebSocket & Simulation Config
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Configure smart grid MQTT brokers, WebSocket streaming frequency, and interactive environmental simulation parameters
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        {/* Simulation & Hardware Control Panel */}
        <div className="card-solid" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Sliders size={16} color="var(--green-600)" />
            Environmental & Hardware Simulation Controls
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {/* Telemetry Polling Rate */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Telemetry Sensor Frequency</span>
                <span style={{ fontWeight: 700, color: 'var(--green-600)' }}>{telemetryConfig.sensorFrequencySeconds}s Interval</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={telemetryConfig.sensorFrequencySeconds}
                onChange={(e) => updateTelemetryConfig({ sensorFrequencySeconds: parseInt(e.target.value) })}
                style={{ width: '100%', accentColor: 'var(--green-600)', cursor: 'pointer' }}
              />
            </div>

            {/* Cloud Cover Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 0.85rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>Simulate Passing Cloud Cover</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Reduces solar irradiance by 35% dynamically</div>
              </div>
              <input
                type="checkbox"
                checked={telemetryConfig.cloudCoverSimulation}
                onChange={(e) => updateTelemetryConfig({ cloudCoverSimulation: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: 'var(--green-600)', cursor: 'pointer' }}
              />
            </div>

            {/* Dust Storm Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 0.85rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>Simulate Heavy Dust Accumulation</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Increases Array C dirt level to 45%</div>
              </div>
              <input
                type="checkbox"
                checked={telemetryConfig.dustAccumulationSimulation}
                onChange={(e) => updateTelemetryConfig({ dustAccumulationSimulation: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: 'var(--green-600)', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>

        {/* REST API & MQTT Schema Documentation */}
        <div className="card-solid" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Code size={16} color="var(--blue-500)" />
            Backend REST & MQTT Endpoint Specs
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontFamily: 'monospace', fontSize: '0.75rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
              <span style={{ color: 'var(--green-600)', fontWeight: 700 }}>GET</span> /api/v1/telemetry/live
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Returns real-time kW output, ambient temp, irradiance</div>
            </div>

            <div style={{ padding: '0.5rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
              <span style={{ color: 'var(--blue-500)', fontWeight: 700 }}>GET</span> /api/v1/panels/health
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Returns 48 string panels health score & thermal IV metrics</div>
            </div>

            <div style={{ padding: '0.5rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
              <span style={{ color: 'var(--yellow-600)', fontWeight: 700 }}>POST</span> /api/v1/bms/optimize
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Dispatches peak-shaving export schedule commands</div>
            </div>

            <div style={{ padding: '0.5rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
              <span style={{ color: 'var(--green-600)', fontWeight: 700 }}>MQTT</span> {telemetryConfig.mqttBrokerUrl}
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Subscribed to string sensor telemetry payload</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
