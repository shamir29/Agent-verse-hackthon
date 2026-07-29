import React from 'react';
import { 
  Activity, 
  Cpu, 
  Radio, 
  Sun, 
  Zap, 
  Leaf, 
  Target, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownRight,
  Sparkles
} from 'lucide-react';
import { useDigitalTwin } from '../context/DigitalTwinContext';

export const DashboardHero = () => {
  const { setActiveTab } = useDigitalTwin();

  const KPI_ITEMS = [
    {
      title: 'City Health Score',
      value: '96.4',
      unit: '/100',
      change: '+1.2%',
      isPositive: true,
      icon: Activity,
      color: '#10b981',
      bgColor: '#d1fae5',
      description: 'Aggregate stability index'
    },
    {
      title: 'Active Infrastructure',
      value: '1,482',
      unit: 'Assets',
      change: '100% Online',
      isPositive: true,
      icon: Radio,
      color: '#0284c7',
      bgColor: '#e0f2fe',
      description: 'Substations, pumps, BESS, PV'
    },
    {
      title: 'Live Connected Devices',
      value: '42,850',
      unit: 'IoT Nodes',
      change: '+450 today',
      isPositive: true,
      icon: Cpu,
      color: '#8b5cf6',
      bgColor: '#f3e8ff',
      description: 'Smart meters, sensors, SCADA'
    },
    {
      title: 'Active AI Agents',
      value: '8 / 8',
      unit: 'Sync',
      change: 'Autonomous',
      isPositive: true,
      icon: Sparkles,
      color: '#6366f1',
      bgColor: '#e0e7ff',
      description: 'Cross-agent orchestration'
    },
    {
      title: 'Renewable Energy %',
      value: '68.4%',
      unit: 'Live Mix',
      change: '+4.8% vs avg',
      isPositive: true,
      icon: Sun,
      color: '#eab308',
      bgColor: '#fef9c3',
      description: 'Solar + Hydro + Storage'
    },
    {
      title: 'Current City Demand',
      value: '485.2',
      unit: 'MW',
      change: '-2.1% peak shave',
      isPositive: true,
      icon: Zap,
      color: '#06b6d4',
      bgColor: '#cffaff',
      description: 'Real-time grid load'
    },
    {
      title: 'Carbon Emissions',
      value: '12.4',
      unit: 'tCO2e/h',
      change: '-14.2% YoY',
      isPositive: true,
      icon: Leaf,
      color: '#14b8a6',
      bgColor: '#ccfbf1',
      description: 'Decarbonization tracking'
    },
    {
      title: 'Simulation Accuracy',
      value: '99.1%',
      unit: 'Fidelity',
      change: 'Digital Twin Model',
      isPositive: true,
      icon: Target,
      color: '#f97316',
      bgColor: '#ffedd5',
      description: 'Calibrated via real-time SCADA'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Top Banner */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
        border: '1px solid #bae6fd',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 'var(--radius-lg)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, color: '#0369a1' }}>
              Smart City Command & Control Center
            </h2>
            <span className="badge badge-green">
              <ShieldCheck size={12} /> Autonomous Optimizing
            </span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Real-time digital twin replica synthesizing telemetry from 8 AI agents, predicting failures, and executing scenario simulations.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn btn-secondary"
            onClick={() => setActiveTab('city_twin')}
          >
            Explore City Map
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => setActiveTab('simulation')}
          >
            Launch Scenario Simulation
          </button>
        </div>
      </div>

      {/* 8 Animated KPI Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px'
      }}>
        {KPI_ITEMS.map((kpi, idx) => {
          const Icon = kpi.icon;

          return (
            <div 
              key={idx} 
              className="card animate-fade-in"
              style={{
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                animationDelay: `${idx * 0.04}s`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {kpi.title}
                </span>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: kpi.bgColor,
                  color: kpi.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={18} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {kpi.value}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                    {kpi.unit}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', fontSize: '0.725rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{kpi.description}</span>
                  <span style={{
                    color: kpi.isPositive ? 'var(--accent-green)' : 'var(--accent-red)',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '2px'
                  }}>
                    {kpi.isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {kpi.change}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
