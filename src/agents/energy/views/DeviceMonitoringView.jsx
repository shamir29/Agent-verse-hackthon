import React, { useState } from 'react';
import { DEVICES_DATA } from '../data/mockData';

export default function DeviceMonitoringView({ devices = DEVICES_DATA, onSelectDevice = () => {} }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchFilter, setSearchFilter] = useState('');

  const categories = ['ALL', 'HVAC', 'Solar Inverter', 'Battery', 'Motors', 'EV Chargers', 'Water Pumps', 'Lighting', 'Industrial Machines'];

  const filteredDevices = (devices || []).filter(device => {
    const matchesCat = selectedCategory === 'ALL' || device.category === selectedCategory;
    const matchesSearch = device.name.toLowerCase().includes(searchFilter.toLowerCase()) || 
                          device.building.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 className="section-title">Section 3 — Device Monitoring Hub</h2>
          <p className="section-desc">Submetering telemetry, asset health scores, and operational state per device</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative', width: '260px' }}>
            <Search size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '11px' }} />
            <input 
              type="text"
              className="form-input"
              placeholder="Search devices..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{ paddingLeft: '36px', height: '38px', width: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="tab-filter-bar" style={{ marginBottom: '20px', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`tab-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Device Cards Grid */}
      <div className="grid-3">
        {filteredDevices.map(device => (
          <div 
            key={device.id} 
            className="card"
            onClick={() => onSelectDevice(device)}
            style={{ cursor: 'pointer', border: device.status === 'WARNING' ? '1px solid #fecaca' : '1px solid #e2e8f0' }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ padding: '8px', borderRadius: '8px', background: '#eff6ff', color: '#2563eb' }}>
                  <Cpu size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0f172a' }}>{device.name}</h4>
                  <p style={{ fontSize: '11px', color: '#64748b' }}>{device.building}</p>
                </div>
              </div>
              <span className={`badge ${device.status === 'ONLINE' || device.status === 'CHARGING' ? 'badge-green' : 'badge-amber'}`}>
                {device.status}
              </span>
            </div>

            {/* Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', background: '#f8fafc', padding: '12px', borderRadius: '8px', marginBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 600 }}>POWER DRAW</span>
                <p style={{ fontSize: '17px', fontWeight: 800, color: '#2563eb' }}>{device.powerKw} kW</p>
              </div>
              <div>
                <span style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 600 }}>DAILY ENERGY</span>
                <p style={{ fontSize: '17px', fontWeight: 800, color: '#059669' }}>{device.dailyKwh} kWh</p>
              </div>
              <div>
                <span style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 600 }}>VOLTAGE / AMPS</span>
                <p style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a' }}>{device.voltage}V / {device.current}A</p>
              </div>
              <div>
                <span style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 600 }}>HEALTH SCORE</span>
                <p style={{ fontSize: '14px', fontWeight: 800, color: device.healthScore > 90 ? '#059669' : '#d97706' }}>{device.healthScore}%</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: '#2563eb', fontWeight: 600 }}>
              <span>View Historical Usage & Faults</span>
              <ArrowUpRight size={14} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
