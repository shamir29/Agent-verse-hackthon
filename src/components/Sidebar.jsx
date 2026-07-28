import React from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  BarChart3, 
  Cpu, 
  LineChart, 
  TrendingUp, 
  ZapOff, 
  AlertTriangle, 
  DollarSign, 
  Leaf, 
  Bot, 
  FileText, 
  Server
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, activeAnomaliesCount, aiSuggestionsCount }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'live_monitoring', label: 'Live Monitoring', icon: Activity, badge: '1s Tick', badgeClass: 'info' },
    { id: 'consumption', label: 'Consumption Analytics', icon: BarChart3 },
    { id: 'device_monitoring', label: 'Device Monitoring', icon: Cpu },
    { id: 'load_analysis', label: 'Load Analysis', icon: LineChart },
    { id: 'demand_forecast', label: 'Demand Forecast', icon: TrendingUp },
    { id: 'energy_efficiency', label: 'Energy Efficiency', icon: ZapOff, badge: `${aiSuggestionsCount} AI`, badgeClass: 'info' },
    { id: 'anomaly_detection', label: 'Anomaly Detection', icon: AlertTriangle, badge: activeAnomaliesCount > 0 ? `${activeAnomaliesCount} Active` : null, badgeClass: 'alert' },
    { id: 'cost_analytics', label: 'Cost Analytics', icon: DollarSign },
    { id: 'sustainability', label: 'Sustainability & Carbon', icon: Leaf },
    { id: 'ai_insights', label: 'AI Insights & Assistant', icon: Bot },
    { id: 'reports', label: 'Reports & Export', icon: FileText },
    { id: 'backend_integration', label: 'Backend & Protocols', icon: Server }
  ];

  return (
    <aside className="sidebar">
      <div className="nav-section-label">MAIN NAVIGATION</div>
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = activeTab === item.id;
        return (
          <div
            key={item.id}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <IconComponent size={18} />
            <span>{item.label}</span>
            {item.badge && (
              <span className={`nav-badge ${item.badgeClass}`}>
                {item.badge}
              </span>
            )}
          </div>
        );
      })}

      <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
        <div style={{ padding: '12px', background: '#ecfdf5', borderRadius: '10px', border: '1px solid #a7f3d0' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#059669', textTransform: 'uppercase' }}>System Status</p>
          <p style={{ fontSize: '12px', fontWeight: 600, color: '#0f172a', marginTop: '2px' }}>Smart Grid: 99.98% Up</p>
          <p style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>Modbus & MQTT Sync OK</p>
        </div>
      </div>
    </aside>
  );
}
