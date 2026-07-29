import React from 'react';
import { ASSET_CATEGORIES, MOCK_ASSETS } from '../../data/mockCityAssets';
import { useDigitalTwin } from '../../context/DigitalTwinContext';
import { Layers, Check, X, Eye, EyeOff, Radio } from 'lucide-react';

export const InfrastructureLayersView = () => {
  const { activeLayers, toggleLayer, selectAllLayers, clearAllLayers, setActiveTab } = useDigitalTwin();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Layers size={24} style={{ color: 'var(--accent-blue)' }} /> Smart City Infrastructure Layers Control
          </h2>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            Toggle 12 independent geospatial infrastructure layers on the digital twin canvas. Filter asset overlays in real time.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={selectAllLayers}>
            <Eye size={14} /> Enable All Layers
          </button>
          <button className="btn btn-secondary" onClick={clearAllLayers}>
            <EyeOff size={14} /> Disable All Layers
          </button>
          <button className="btn btn-primary" onClick={() => setActiveTab('city_twin')}>
            View on Map
          </button>
        </div>
      </div>

      {/* 12 Layer Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        {ASSET_CATEGORIES.map((cat) => {
          const isEnabled = activeLayers.includes(cat.id);
          const layerAssets = MOCK_ASSETS.filter(a => a.category === cat.id);

          return (
            <div 
              key={cat.id}
              className="card"
              style={{
                padding: '18px',
                border: '1px solid',
                borderColor: isEnabled ? 'var(--accent-blue)' : 'var(--border-color)',
                backgroundColor: isEnabled ? '#ffffff' : 'var(--bg-app)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: `${cat.color}15`,
                      color: cat.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700
                    }}>
                      <Radio size={18} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        {cat.name}
                      </h3>
                      <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                        {layerAssets.length} Connected Nodes
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleLayer(cat.id)}
                    style={{
                      width: '44px',
                      height: '24px',
                      borderRadius: '12px',
                      backgroundColor: isEnabled ? 'var(--accent-blue)' : '#cbd5e1',
                      border: 'none',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'background-color 0.2s ease'
                    }}
                  >
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: '#ffffff',
                      position: 'absolute',
                      top: '3px',
                      left: isEnabled ? '23px' : '3px',
                      transition: 'left 0.2s ease'
                    }} />
                  </button>
                </div>

                <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                  Overlay layer status: {isEnabled ? <strong style={{ color: 'var(--accent-green)' }}>ACTIVE ON MAP</strong> : <span style={{ color: 'var(--text-muted)' }}>Hidden</span>}
                </div>
              </div>

              {/* Sample assets preview in layer */}
              <div style={{
                backgroundColor: 'var(--bg-app)',
                padding: '8px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.725rem',
                color: 'var(--text-secondary)'
              }}>
                Assets: {layerAssets.slice(0, 2).map(a => a.id).join(', ')} {layerAssets.length > 2 ? `+${layerAssets.length - 2} more` : ''}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
