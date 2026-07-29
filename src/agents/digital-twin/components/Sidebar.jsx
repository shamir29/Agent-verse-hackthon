import React from 'react';
import { 
  LayoutDashboard, 
  Globe2, 
  Zap, 
  FlaskConical, 
  Layers, 
  Lightbulb, 
  TrendingUp, 
  FileSpreadsheet, 
  AlertTriangle, 
  Settings,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { useDigitalTwin } from '../context/DigitalTwinContext';

export const Sidebar = () => {
  const { activeTab, setActiveTab, alerts, insights } = useDigitalTwin();

  const unresolvedAlerts = alerts.filter(a => a.status !== 'RESOLVED').length;
  const criticalInsights = insights.filter(i => i.priority === 'CRITICAL' || i.priority === 'HIGH').length;

  const NAV_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'city_twin', label: 'City Twin Map', icon: Globe2, badge: '2D/3D' },
    { id: 'monitoring', label: 'Live Infrastructure', icon: Zap },
    { id: 'simulation', label: 'Simulation Center', icon: FlaskConical, badge: 'AI Engine' },
    { id: 'layers', label: 'Infrastructure Layers', icon: Layers, count: 12 },
    { id: 'prediction', label: 'Predictive Analytics', icon: TrendingUp },
    { id: 'collaboration', label: 'Cross-Agent Hub', icon: Sparkles },
    { id: 'insights', label: 'AI Insights', icon: Lightbulb, badge: criticalInsights > 0 ? `${criticalInsights} New` : null, badgeColor: 'orange' },
    { id: 'sustainability', label: 'Sustainability', icon: Globe2 },
    { id: 'playback', label: 'Historical Playback', icon: TrendingUp },
    { id: 'reports', label: 'Reports & Export', icon: FileSpreadsheet },
    { id: 'alerts', label: 'Alerts Console', icon: AlertTriangle, count: unresolvedAlerts > 0 ? unresolvedAlerts : null, badgeColor: 'red' },
    { id: 'settings', label: 'API & Protocols', icon: Settings }
  ];

  return (
    <aside style={{
      width: '240px',
      backgroundColor: 'var(--bg-sidebar)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '16px 12px',
      overflowY: 'auto'
    }}>
      {/* Navigation List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ padding: '0 8px 8px 8px', fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Navigation Center
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '9px 12px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isActive ? 'var(--accent-blue-light)' : 'transparent',
                color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.85rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Icon size={18} style={{ color: isActive ? 'var(--accent-blue)' : '#64748b' }} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className={`badge ${item.badgeColor ? `badge-${item.badgeColor}` : 'badge-blue'}`} style={{ fontSize: '0.65rem', padding: '2px 6px' }}>
                  {item.badge}
                </span>
              )}
              {item.count && (
                <span className={`badge ${item.badgeColor ? `badge-${item.badgeColor}` : 'badge-green'}`} style={{ fontSize: '0.65rem', padding: '2px 6px' }}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Live System Health Card */}
      <div className="card" style={{ padding: '12px', backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-color)', marginTop: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <ShieldAlert size={16} style={{ color: 'var(--accent-green)' }} />
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)' }}>Digital Twin Sync</span>
        </div>
        <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
          8/8 AI Agents connected. Latency &lt; 15ms.
        </div>
        <div style={{ height: '4px', backgroundColor: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ width: '99.4%', height: '100%', backgroundColor: 'var(--accent-green)' }}></div>
        </div>
      </div>
    </aside>
  );
};
