import React from 'react';
import { Settings, Radio, Cpu, Database, Server, RefreshCw, CheckCircle2, ShieldCheck } from 'lucide-react';

export const BackendIntegration = () => {
  const PROTOCOLS = [
    { name: 'MQTT Broker (IoT Nodes)', status: 'CONNECTED', port: '8883 (TLS)', rate: '42,850 msgs/s', latency: '4ms' },
    { name: 'Modbus / TCP (Substation SCADA)', status: 'CONNECTED', port: '502', rate: '1,200 msgs/s', latency: '12ms' },
    { name: 'OPC-UA (Industrial PLC)', status: 'CONNECTED', port: '4840', rate: '850 msgs/s', latency: '8ms' },
    { name: 'WebSocket Telemetry Stream', status: 'ACTIVE', endpoint: 'wss://api.smartcity.gov/twin/v4/live', rate: '60 FPS', latency: '2ms' },
    { name: 'REST GIS / ArcGIS Map Engine', status: 'SYNCHRONIZED', endpoint: 'https://gis.smartcity.gov/arcgis/rest', rate: 'On Demand', latency: '18ms' },
    { name: 'Smart Meter SCADA Connector', status: 'CONNECTED', port: '102 (IEC 60870-5)', rate: '18,400 meters', latency: '15ms' },
    { name: 'Weather API (MeteoHub)', status: 'CONNECTED', endpoint: 'https://api.weather.gov/v1', rate: '1 min refresh', latency: '45ms' },
    { name: '3D WebGL Mesh Engine Adapter', status: 'READY', driver: 'HTML5 Canvas 2D/3D Shader', rate: '60 FPS', latency: '1ms' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Settings size={24} style={{ color: 'var(--accent-blue)' }} /> Backend API & Telemetry Protocol Readiness Console
          </h2>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            Configured protocol connectors for industrial SCADA, IoT MQTT brokers, GIS Services, Modbus, OPC-UA, and WebSockets.
          </p>
        </div>

        <span className="badge badge-green" style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
          <CheckCircle2 size={14} /> All 8 Protocol Connectors Online
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '16px'
      }}>
        {PROTOCOLS.map((p, idx) => (
          <div key={idx} className="card" style={{ padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {p.name}
                </h4>
                <span className="badge badge-green">{p.status}</span>
              </div>

              <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', fontFamily: 'monospace', backgroundColor: 'var(--bg-app)', padding: '6px 10px', borderRadius: 'var(--radius-sm)', marginBottom: '10px' }}>
                Endpoint/Port: {p.port || p.endpoint || p.driver}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span>Data Throughput: <strong style={{ color: 'var(--text-main)' }}>{p.rate}</strong></span>
              <span>Latency: <strong style={{ color: 'var(--accent-green)' }}>{p.latency}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
