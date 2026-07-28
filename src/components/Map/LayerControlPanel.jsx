import React from 'react';
import { ASSET_CATEGORIES } from '../../data/mockCityAssets';
import { useDigitalTwin } from '../../context/DigitalTwinContext';
import { Check, Layers } from 'lucide-react';

export const LayerControlPanel = () => {
  const { activeLayers, toggleLayer, selectAllLayers, clearAllLayers } = useDigitalTwin();

  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      padding: '14px',
      width: '260px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '0.85rem' }}>
          <Layers size={16} style={{ color: 'var(--accent-blue)' }} />
          <span>Infrastructure Layers</span>
        </div>
        <span className="badge badge-blue">{activeLayers.length}/14</span>
      </div>

      <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
        <button 
          onClick={selectAllLayers}
          className="btn btn-secondary btn-sm" 
          style={{ flex: 1, fontSize: '0.7rem', padding: '4px' }}
        >
          Select All
        </button>
        <button 
          onClick={clearAllLayers}
          className="btn btn-secondary btn-sm" 
          style={{ flex: 1, fontSize: '0.7rem', padding: '4px' }}
        >
          Clear
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '320px', overflowY: 'auto' }}>
        {ASSET_CATEGORIES.map((cat) => {
          const isSelected = activeLayers.includes(cat.id);

          return (
            <button
              key={cat.id}
              onClick={() => toggleLayer(cat.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '6px 10px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: isSelected ? 'var(--bg-app)' : 'transparent',
                border: '1px solid',
                borderColor: isSelected ? '#cbd5e1' : 'transparent',
                cursor: 'pointer',
                fontSize: '0.775rem',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: cat.color
                }} />
                <span style={{ fontWeight: isSelected ? 600 : 400, color: 'var(--text-main)' }}>
                  {cat.name}
                </span>
              </div>

              {isSelected && <Check size={14} style={{ color: 'var(--accent-blue)' }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
