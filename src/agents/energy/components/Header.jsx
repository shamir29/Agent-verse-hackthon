import React, { useState } from 'react';
import { 
  Zap, 
  Search, 
  Bell, 
  User, 
  Activity, 
  ChevronDown,
  Wifi,
  ShieldCheck,
  Sliders,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function Header({ 
  activeTab, 
  telemetry, 
  notifications, 
  onOpenSearch, 
  onOpenNotifications, 
  isLiveStreaming, 
  setIsLiveStreaming 
}) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const unreadAlerts = notifications.filter(n => !n.acknowledged).length;

  return (
    <header className="top-header">
      {/* Brand & Logo */}
      <div className="brand-section">
        <div className="brand-logo">
          <Zap size={22} color="#ffffff" />
        </div>
        <div className="brand-titles">
          <span className="platform-name">Smart Energy Platform</span>
          <h1 className="app-title">Energy Monitoring Agent</h1>
        </div>
      </div>

      {/* Global Search Bar Trigger */}
      <div className="header-center">
        <div className="search-bar-trigger" onClick={onOpenSearch}>
          <Search size={16} />
          <span>Search devices, anomalies, forecast, reports...</span>
          <span className="kbd-shortcut">Ctrl + K</span>
        </div>
      </div>

      {/* Right Action Icons & Status */}
      <div className="header-actions">
        {/* Live Telemetry Stream Indicator & Toggle */}
        <div 
          className="status-badge-live" 
          onClick={() => setIsLiveStreaming(!isLiveStreaming)}
          title="Click to pause/resume live 1s telemetry telemetry stream"
          style={{ cursor: 'pointer' }}
        >
          <span className={`live-dot ${isLiveStreaming ? '' : 'paused'}`} style={{ backgroundColor: isLiveStreaming ? '#059669' : '#d97706' }} />
          <span>{isLiveStreaming ? 'LIVE 1s Stream' : 'STREAM PAUSED'}</span>
        </div>

        {/* System Health Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 6, color: '#334155', background: '#f1f5f9', padding: '4px 10px', borderRadius: '16px' }}>
          <Wifi size={14} color="#059669" />
          <span>Modbus TCP: Active</span>
        </div>

        {/* Notifications Button */}
        <button 
          className="icon-btn" 
          onClick={onOpenNotifications}
          title="View Notifications & Energy Alerts"
        >
          <Bell size={18} />
          {unreadAlerts > 0 && <span className="badge-count">{unreadAlerts}</span>}
        </button>

        {/* User Profile Dropdown Trigger */}
        <div style={{ position: 'relative' }}>
          <div className="user-profile-btn" onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <div className="avatar-circle">SE</div>
            <div className="user-info">
              <span className="user-name">Dr. Aris Thorne</span>
              <span className="user-role">Chief Energy Officer</span>
            </div>
            <ChevronDown size={14} color="#64748b" />
          </div>

          {showProfileMenu && (
            <div 
              style={{
                position: 'absolute',
                top: '48px',
                right: 0,
                width: '240px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 10px 15px -3px rgba(15, 23, 42, 0.1)',
                padding: '12px',
                zIndex: 50
              }}
            >
              <div style={{ paddingBottom: '8px', borderBottom: '1px solid #f1f5f9', marginBottom: '8px' }}>
                <p style={{ fontSize: '13px', fontWeight: 700 }}>Smart Grid Control Room</p>
                <p style={{ fontSize: '11px', color: '#64748b' }}>Role: Admin / Grid Operator</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '13px' }}>
                <div style={{ padding: '6px 8px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', hover: { background: '#f8fafc' } }}>
                  <ShieldCheck size={15} color="#2563eb" /> Security & Protocol Access
                </div>
                <div style={{ padding: '6px 8px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sliders size={15} color="#059669" /> Telemetry Thresholds
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
