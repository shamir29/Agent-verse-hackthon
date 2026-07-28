import React from 'react';
import {
  Zap,
  Sun,
  Activity,
  Leaf,
  DollarSign,
  BatteryCharging,
  ArrowUpRight,
} from 'lucide-react';
import { useSolar } from '../context/SolarContext';

export const HeroKpi: React.FC = () => {
  const { telemetry } = useSolar();

  const kpiList = [
    {
      id: 'current-gen',
      title: 'Current Generation',
      value: `${telemetry.currentPowerKw.toFixed(1)} kW`,
      subtext: 'Capacity: 500.0 kW (97%)',
      trend: '+4.2% vs yesterday',
      trendUp: true,
      icon: Zap,
      iconBg: 'var(--green-50)',
      iconColor: 'var(--green-600)',
      accentBorder: 'var(--green-500)',
    },
    {
      id: 'today-energy',
      title: "Today's Production",
      value: `${telemetry.todayEnergyKwh.toLocaleString()} kWh`,
      subtext: 'Daily Target: 3,200 kWh',
      trend: '+6.1% vs average',
      trendUp: true,
      icon: Sun,
      iconBg: 'var(--yellow-50)',
      iconColor: 'var(--yellow-600)',
      accentBorder: 'var(--yellow-500)',
    },
    {
      id: 'sys-efficiency',
      title: 'System Efficiency',
      value: `${telemetry.systemEfficiencyPct}%`,
      subtext: 'Inverter PR: 98.6%',
      trend: '+0.8% optimal',
      trendUp: true,
      icon: Activity,
      iconBg: 'var(--green-50)',
      iconColor: 'var(--green-600)',
      accentBorder: 'var(--green-500)',
    },
    {
      id: 'co2-saved',
      title: 'CO₂ Saved Today',
      value: `${(telemetry.co2SavedKg / 1000).toFixed(2)} Tons`,
      subtext: '142 trees equivalent',
      trend: '+0.15 Tons today',
      trendUp: true,
      icon: Leaf,
      iconBg: 'var(--green-50)',
      iconColor: 'var(--green-600)',
      accentBorder: 'var(--green-500)',
    },
    {
      id: 'cost-savings',
      title: 'Energy Cost Savings',
      value: `$${telemetry.costSavingsUsd.toFixed(2)}`,
      subtext: 'Standard rate: $0.22/kWh',
      trend: '+$52.40 peak export',
      trendUp: true,
      icon: DollarSign,
      iconBg: 'var(--yellow-50)',
      iconColor: 'var(--yellow-600)',
      accentBorder: 'var(--yellow-500)',
    },
    {
      id: 'battery-charge',
      title: 'Battery Charge Level',
      value: `${telemetry.batteryChargePct}%`,
      subtext: `${telemetry.batteryChargingStatus} (${telemetry.batteryPowerKw} kW)`,
      trend: 'Est. Backup: 14.2 hrs',
      trendUp: true,
      icon: BatteryCharging,
      iconBg: 'var(--green-50)',
      iconColor: 'var(--green-600)',
      accentBorder: 'var(--green-500)',
    },
  ];

  return (
    <section style={{ marginBottom: '1.5rem' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        gap: '1rem',
      }}>
        {kpiList.map((kpi) => {
          const Icon = kpi.icon;

          return (
            <div
              key={kpi.id}
              className="card-solid"
              style={{
                padding: '1.25rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top Accent Strip */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                backgroundColor: kpi.accentBorder,
              }} />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {kpi.title}
                </span>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: kpi.iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: kpi.iconColor,
                }}>
                  <Icon size={20} />
                </div>
              </div>

              <div style={{ fontSize: '1.65rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                {kpi.value}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem', fontSize: '0.75rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{kpi.subtext}</span>
                <span style={{
                  color: 'var(--green-600)',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.15rem',
                }}>
                  <ArrowUpRight size={14} />
                  {kpi.trend}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
