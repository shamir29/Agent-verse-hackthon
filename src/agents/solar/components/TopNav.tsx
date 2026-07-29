import React, { useState } from 'react';
import {
  Sun,
  Search,
  Bell,
  SunMedium,
  CheckCircle2,
  AlertTriangle,
  Info,
  Pause,
  Play,
  ChevronDown,
  Zap,
} from 'lucide-react';
import { useSolar } from '../context/SolarContext';

export const TopNav: React.FC = () => {
  const {
    telemetry,
    notifications,
    telemetryConfig,
    toggleSimulation,
    setIsSearchOpen,
    markNotificationRead,
    clearNotifications,
  } = useSolar();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header style={{
      backgroundColor: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-light)',
      height: '68px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1.5rem',
      position: 'sticky',
      top: 0,
      zIndex: 40,
    }}>
      {/* Brand & Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          backgroundColor: 'var(--green-500)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          boxShadow: '0 2px 8px rgba(16, 185, 129, 0.25)',
        }}>
          <Sun size={24} strokeWidth={2.2} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--green-600)', textTransform: 'uppercase' }}>
              SmartEnergy OS
            </span>
            <span style={{ fontSize: '0.7rem', backgroundColor: 'var(--yellow-100)', color: 'var(--yellow-600)', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 600 }}>
              ENTERPRISE v4.2
            </span>
          </div>
          <h1 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>
            Solar Optimization Agent
          </h1>
        </div>
      </div>

      {/* Center Search Bar & Telemetry Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Global Search Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-md)',
            padding: '0.45rem 1rem',
            width: '280px',
            color: 'var(--text-secondary)',
            fontSize: '0.875rem',
            cursor: 'pointer',
          }}
        >
          <Search size={16} color="var(--text-muted)" />
          <span style={{ flex: 1, textAlign: 'left' }}>Search panels, faults, metrics...</span>
          <kbd style={{
            fontSize: '0.7rem',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-strong)',
            borderRadius: '4px',
            padding: '0.1rem 0.35rem',
            color: 'var(--text-muted)',
            fontFamily: 'monospace',
          }}>
            /
          </kbd>
        </button>

        {/* Live Simulation Indicator Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: telemetryConfig.simulationMode ? 'var(--green-50)' : 'var(--bg-subtle)',
          border: `1px solid ${telemetryConfig.simulationMode ? 'var(--green-100)' : 'var(--border-light)'}`,
          padding: '0.4rem 0.8rem',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.8rem',
          fontWeight: 600,
          color: telemetryConfig.simulationMode ? 'var(--green-700)' : 'var(--text-muted)',
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: telemetryConfig.simulationMode ? 'var(--green-500)' : 'var(--text-muted)',
            boxShadow: telemetryConfig.simulationMode ? '0 0 8px var(--green-500)' : 'none',
          }} className={telemetryConfig.simulationMode ? 'animate-pulse-slow' : ''} />
          <span>{telemetryConfig.simulationMode ? 'LIVE TELEMETRY ACTIVE' : 'STREAM PAUSED'}</span>
          <button
            onClick={toggleSimulation}
            title={telemetryConfig.simulationMode ? 'Pause Live Telemetry' : 'Resume Live Telemetry'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              color: 'inherit',
              padding: '0.1rem',
              marginLeft: '0.25rem',
            }}
          >
            {telemetryConfig.simulationMode ? <Pause size={14} /> : <Play size={14} />}
          </button>
        </div>

        {/* Weather Telemetry Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          backgroundColor: 'var(--yellow-50)',
          border: '1px solid var(--yellow-100)',
          padding: '0.4rem 0.75rem',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.8rem',
          fontWeight: 600,
          color: 'var(--yellow-600)',
        }}>
          <SunMedium size={16} />
          <span>{telemetry.ambientTempC}°C Clear</span>
          <span style={{ opacity: 0.5 }}>|</span>
          <Zap size={14} />
          <span>{telemetry.solarIrradianceWm2} W/m²</span>
        </div>
      </div>

      {/* Right User & Notification Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative' }}>
        {/* Notification Bell Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              position: 'relative',
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-primary)',
            }}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                backgroundColor: 'var(--red-500)',
                color: '#FFFFFF',
                fontSize: '0.65rem',
                fontWeight: 700,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid var(--bg-surface)',
              }}>
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Modal Drawer */}
          {showNotifications && (
            <div style={{
              position: 'absolute',
              top: '48px',
              right: 0,
              width: '360px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-strong)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 50,
              overflow: 'hidden',
            }}>
              <div style={{
                padding: '0.75rem 1rem',
                borderBottom: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'var(--bg-subtle)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Bell size={16} color="var(--green-600)" />
                  <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>System Alerts & Reminders</span>
                </div>
                <button
                  onClick={clearNotifications}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '0.75rem',
                    color: 'var(--green-600)',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  Clear All
                </button>
              </div>

              <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    <CheckCircle2 size={32} style={{ margin: '0 auto 0.5rem auto', color: 'var(--green-500)' }} />
                    No active notifications. All systems operating normally!
                  </div>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => markNotificationRead(item.id)}
                      style={{
                        padding: '0.75rem 1rem',
                        borderBottom: '1px solid var(--border-light)',
                        backgroundColor: item.read ? 'transparent' : 'var(--green-50)',
                        cursor: 'pointer',
                        display: 'flex',
                        gap: '0.75rem',
                        alignItems: 'flex-start',
                      }}
                    >
                      {item.type === 'CRITICAL' ? (
                        <AlertTriangle size={18} color="var(--red-500)" style={{ marginTop: '2px', flexShrink: 0 }} />
                      ) : item.type === 'WARNING' ? (
                        <AlertTriangle size={18} color="var(--yellow-500)" style={{ marginTop: '2px', flexShrink: 0 }} />
                      ) : (
                        <Info size={18} color="var(--blue-500)" style={{ marginTop: '2px', flexShrink: 0 }} />
                      )}

                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                            {item.title}
                          </span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.timestamp}</span>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0 0' }}>
                          {item.message}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '0.35rem 0.75rem',
              cursor: 'pointer',
            }}
          >
            <div style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: 'var(--green-600)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.8rem',
            }}>
              MV
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, lineHeight: 1.1, color: 'var(--text-primary)' }}>
                Dr. Marcus Vance
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.1 }}>
                Lead Energy Engineer
              </div>
            </div>
            <ChevronDown size={14} color="var(--text-muted)" />
          </button>
        </div>
      </div>
    </header>
  );
};
