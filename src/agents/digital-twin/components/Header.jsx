import React, { useState } from 'react';
import { 
  Activity, 
  Search, 
  Play, 
  Bell, 
  User, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  Sliders,
  Layers
} from 'lucide-react';
import { useDigitalTwin } from '../context/DigitalTwinContext';

export const Header = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    activeTab, 
    setActiveTab, 
    runSimulation, 
    alerts 
  } = useDigitalTwin();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unresolvedAlertsCount = alerts.filter(a => a.status !== 'RESOLVED').length;

  return (
    <header className="header-bar" style={{
      height: '64px',
      backgroundColor: 'var(--bg-header)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      zIndex: 40,
      position: 'relative'
    }}>
      {/* Left Branding & Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #0284c7 0%, #10b981 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          boxShadow: '0 2px 4px rgba(2, 132, 199, 0.25)'
        }}>
          <Cpu size={22} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.15rem',
              fontWeight: 700,
              color: 'var(--text-main)',
              letterSpacing: '-0.01em'
            }}>
              Digital Twin Agent
            </h1>
            <span className="badge badge-blue" style={{ fontSize: '0.65rem' }}>Enterprise v4.2</span>
          </div>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
            Smart City & Smart Energy AI Platform
          </p>
        </div>
      </div>

      {/* Center Search & Quick Simulation Trigger */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, maxWidth: '520px', margin: '0 24px' }}>
        <div style={{
          position: 'relative',
          width: '100%'
        }}>
          <Search size={16} style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)'
          }} />
          <input 
            type="text"
            placeholder="Search city assets, grid nodes, layers, alerts, or AI models..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-text"
            style={{
              width: '100%',
              paddingLeft: '36px',
              height: '38px',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'var(--bg-app)',
              border: '1px solid var(--border-color)',
              fontSize: '0.825rem'
            }}
          />
          {searchQuery && (
            <X 
              size={14} 
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: 'var(--text-muted)'
              }}
            />
          )}
        </div>

        <button 
          className="btn btn-primary"
          onClick={() => {
            setActiveTab('simulation');
            runSimulation('sim_power_outage', 7);
          }}
          style={{
            height: '38px',
            whiteSpace: 'nowrap',
            padding: '0 16px',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.8rem',
            boxShadow: '0 2px 4px rgba(2, 132, 199, 0.2)'
          }}
        >
          <Play size={14} fill="currentColor" /> Quick Simulation
        </button>
      </div>

      {/* Right Actions: AI Status, Notifications, Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* AI Autonomous Status Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          backgroundColor: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: 'var(--radius-pill)',
          fontSize: '0.75rem',
          color: '#15803d',
          fontWeight: 600
        }}>
          <span className="pulse-dot green"></span>
          AI Autonomous Mode
        </div>

        {/* Notifications Bell */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-app)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              position: 'relative'
            }}
          >
            <Bell size={18} />
            {unresolvedAlertsCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                backgroundColor: 'var(--accent-red)',
                color: '#ffffff',
                fontSize: '0.65rem',
                fontWeight: 700,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #ffffff'
              }}>
                {unresolvedAlertsCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Drawer */}
          {showNotifications && (
            <div className="animate-fade-in" style={{
              position: 'absolute',
              right: 0,
              top: '48px',
              width: '340px',
              backgroundColor: '#ffffff',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)',
              padding: '16px',
              zIndex: 50
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600 }}>Real-Time System Alerts</h4>
                <span className="badge badge-red">{unresolvedAlertsCount} Active</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '280px', overflowY: 'auto' }}>
                {alerts.map(alt => (
                  <div key={alt.id} style={{
                    padding: '10px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: alt.severity === 'CRITICAL' ? '#fef2f2' : alt.severity === 'HIGH' ? '#fff7ed' : '#f8fafc',
                    border: `1px solid ${alt.severity === 'CRITICAL' ? '#fca5a5' : alt.severity === 'HIGH' ? '#fed7aa' : '#e2e8f0'}`
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, marginBottom: '2px' }}>
                      <span style={{ color: alt.severity === 'CRITICAL' ? '#b91c1c' : '#c2410c' }}>{alt.severity}</span>
                      <span style={{ color: 'var(--text-muted)' }}>{alt.timestamp}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-main)' }}>{alt.title}</div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>{alt.location}</div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => {
                  setActiveTab('alerts');
                  setShowNotifications(false);
                }}
                className="btn btn-secondary btn-sm" 
                style={{ width: '100%', marginTop: '12px' }}
              >
                View Alerts Console
              </button>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 8px 4px 4px',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'var(--bg-app)',
              border: '1px solid var(--border-color)',
              cursor: 'pointer'
            }}
          >
            <div style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.8rem'
            }}>
              OP
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)' }}>Cmdr. Vance</span>
          </button>

          {showUserMenu && (
            <div className="animate-fade-in" style={{
              position: 'absolute',
              right: 0,
              top: '44px',
              width: '200px',
              backgroundColor: '#ffffff',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-md)',
              padding: '8px',
              zIndex: 50
            }}>
              <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-color)', marginBottom: '4px' }}>
                <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Chief City Operator</div>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>vance@smartcity.gov</div>
              </div>
              <button 
                onClick={() => { setActiveTab('settings'); setShowUserMenu(false); }}
                className="btn btn-secondary btn-sm" 
                style={{ width: '100%', justifyContent: 'flex-start', border: 'none' }}
              >
                <Sliders size={14} /> Platform Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
