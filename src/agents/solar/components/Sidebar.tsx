import React from 'react';
import {
  LayoutDashboard,
  Activity,
  Sun,
  Grid,
  BatteryCharging,
  AlertTriangle,
  Wrench,
  DollarSign,
  Leaf,
  Sparkles,
  FileText,
  Settings,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useSolar } from '../context/SolarContext';

export const Sidebar: React.FC = () => {
  const { activeSection, setActiveSection, faultAlerts, maintenanceTasks, telemetry } = useSolar();

  const activeAlertsCount = faultAlerts.filter((a) => !a.acknowledged).length;
  const activeTasksCount = maintenanceTasks.filter((t) => t.status === 'RECOMMENDED').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'live', label: 'Live Monitoring', icon: Activity },
    { id: 'forecast', label: 'Solar Forecast', icon: Sun },
    { id: 'panels', label: 'Panel Health', icon: Grid },
    { id: 'battery', label: 'Battery Optimization', icon: BatteryCharging },
    { id: 'faults', label: 'Fault Detection', icon: AlertTriangle, badge: activeAlertsCount, badgeColor: 'var(--red-500)' },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench, badge: activeTasksCount, badgeColor: 'var(--yellow-500)' },
    { id: 'financial', label: 'Financial Analytics', icon: DollarSign },
    { id: 'environmental', label: 'Environmental Impact', icon: Leaf },
    { id: 'ai-insights', label: 'AI Insights', icon: Sparkles },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings & API Config', icon: Settings },
  ];

  return (
    <aside style={{
      width: '260px',
      backgroundColor: 'var(--bg-surface)',
      borderRight: '1px solid var(--border-light)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '1.25rem 0.75rem',
      userSelect: 'none',
      flexShrink: 0,
    }}>
      {/* Navigation List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <div style={{ padding: '0 0.75rem 0.5rem 0.75rem', fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Navigation Menu
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.6rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isActive ? 'var(--green-50)' : 'transparent',
                color: isActive ? 'var(--green-700)' : 'var(--text-secondary)',
                border: isActive ? '1px solid var(--green-100)' : '1px solid transparent',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                width: '100%',
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Icon size={18} color={isActive ? 'var(--green-600)' : 'var(--text-muted)'} />
                <span>{item.label}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                {item.badge !== undefined && item.badge > 0 && (
                  <span style={{
                    backgroundColor: item.badgeColor,
                    color: '#FFFFFF',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    padding: '0.1rem 0.4rem',
                    borderRadius: '9999px',
                  }}>
                    {item.badge}
                  </span>
                )}
                {isActive && <ChevronRight size={14} color="var(--green-600)" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom Solar Grid Status Footer Pill */}
      <div style={{
        backgroundColor: 'var(--bg-subtle)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        padding: '0.85rem 1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <ShieldCheck size={16} color="var(--green-600)" />
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Grid Synchronization
          </span>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
          <span>Net Export Flow:</span>
          <span style={{ fontWeight: 700, color: 'var(--green-600)' }}>+{telemetry.gridExportKw} kW</span>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', marginTop: '0.2rem' }}>
          <span>Grid Frequency:</span>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>60.02 Hz</span>
        </div>
      </div>
    </aside>
  );
};
