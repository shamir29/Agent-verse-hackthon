import React, { useState } from 'react';
import { Server, Wifi, Cpu, Layers, Activity, RefreshCw, CheckCircle2, ShieldCheck, Terminal } from 'lucide-react';

export default function BackendIntegrationView({ protocolRegisters }) {
  const [activeProtocol, setActiveProtocol] = useState('Modbus');

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 className="section-title">Backend Protocol & IoT Integration Matrix</h2>
          <p className="section-desc">Connectors for SCADA, Smart Meters, Modbus TCP, MQTT topics, OPC-UA nodes, and Weather API</p>
        </div>
        <div className="status-badge-live">
          <span className="live-dot" />
          <span>All 12 Protocols Connected</span>
        </div>
      </div>

      {/* Protocol Tabs */}
      <div className="tab-filter-bar" style={{ marginBottom: '20px' }}>
        {['Modbus', 'MQTT', 'OPC-UA', 'SCADA / BMS', 'WebSockets', 'Weather API'].map((proto) => (
          <button
            key={proto}
            className={`tab-btn ${activeProtocol === proto ? 'active' : ''}`}
            onClick={() => setActiveProtocol(proto)}
          >
            {proto}
          </button>
        ))}
      </div>

      {/* Protocol Live Data Table & Register Viewer */}
      {activeProtocol === 'Modbus' && (
        <div className="card">
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
                <Server size={18} />
              </div>
              <div>
                <h3 className="card-title">Modbus TCP Register Mapping</h3>
                <p className="card-subtitle">IP: 192.168.1.100 • Port: 502 • Unit ID: 1</p>
              </div>
            </div>
            <span className="badge badge-green">Polling @ 1000ms</span>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Holding Register</th>
                <th>Signal Name</th>
                <th>Value</th>
                <th>Data Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {protocolRegisters.modbus.map((reg) => (
                <tr key={reg.register}>
                  <td style={{ fontWeight: 700, color: '#2563eb' }}>{reg.register}</td>
                  <td style={{ fontWeight: 600, color: '#0f172a' }}>{reg.name}</td>
                  <td style={{ fontWeight: 800, color: '#059669' }}>{reg.value}</td>
                  <td style={{ color: '#64748b' }}>{reg.type}</td>
                  <td><span className="badge badge-green">{reg.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeProtocol === 'MQTT' && (
        <div className="card">
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-icon" style={{ background: '#ecfdf5', color: '#059669' }}>
                <Wifi size={18} />
              </div>
              <div>
                <h3 className="card-title">MQTT Telemetry Topics</h3>
                <p className="card-subtitle">Broker: mqtt://smartgrid.internal:1883 • QoS: 1</p>
              </div>
            </div>
            <span className="badge badge-green">Connected</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {protocolRegisters.mqtt.map((mq, idx) => (
              <div key={idx} style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontFamily: 'monospace', fontSize: '12.5px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, color: '#2563eb' }}>{mq.topic}</span>
                  <span style={{ color: '#64748b' }}>Interval: {mq.rate}</span>
                </div>
                <div style={{ background: '#0f172a', color: '#38bdf8', padding: '8px', borderRadius: '6px' }}>
                  {mq.payload}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeProtocol === 'OPC-UA' && (
        <div className="card">
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-icon" style={{ background: '#f5f3ff', color: '#7c3aed' }}>
                <Layers size={18} />
              </div>
              <div>
                <h3 className="card-title">OPC-UA Address Space Nodes</h3>
                <p className="card-subtitle">Server: opc.tcp://10.0.4.15:4840</p>
              </div>
            </div>
            <span className="badge badge-blue">Security: Basic256Sha256</span>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Node Identifier</th>
                <th>Value</th>
                <th>Quality</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {protocolRegisters.opcua.map((opc, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600, color: '#0f172a' }}>{opc.node}</td>
                  <td style={{ fontWeight: 700, color: '#059669' }}>{opc.value}</td>
                  <td><span className="badge badge-green">{opc.quality}</span></td>
                  <td style={{ color: '#64748b' }}>{opc.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {['SCADA / BMS', 'WebSockets', 'Weather API'].includes(activeProtocol) && (
        <div className="card" style={{ padding: '30px', textAlign: 'center' }}>
          <CheckCircle2 size={40} color="#059669" style={{ margin: '0 auto 12px auto' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{activeProtocol} Interface Active</h3>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
            Bi-directional telemetry sync established. Telemetry buffer size: 10,000 samples/sec.
          </p>
        </div>
      )}
    </div>
  );
}
