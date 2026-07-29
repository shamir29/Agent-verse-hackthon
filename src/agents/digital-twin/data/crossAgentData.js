export const AI_AGENTS = [
  {
    id: 'smart_grid',
    name: 'Smart Grid Agent',
    icon: 'Zap',
    color: '#0284c7',
    status: 'Autonomous',
    health: '99.4%',
    latency: '12ms',
    messagesSentSec: 420,
    role: 'Grid stability, frequency control, load balancing, & outage response.',
    lastAction: 'Balanced Phase A voltage on Feeder 4',
    connectedTo: ['solar_opt', 'ev_charging', 'energy_mon', 'orchestrator']
  },
  {
    id: 'solar_opt',
    name: 'Solar Optimization Agent',
    icon: 'Sun',
    color: '#eab308',
    status: 'Autonomous',
    health: '98.8%',
    latency: '15ms',
    messagesSentSec: 280,
    role: 'Solar forecasting, inverter MPPT tuning, BESS charge scheduling.',
    lastAction: 'Adjusted panel pitch +4° for afternoon sun angle',
    connectedTo: ['smart_grid', 'battery_opt', 'orchestrator']
  },
  {
    id: 'energy_mon',
    name: 'Energy Monitoring Agent',
    icon: 'Activity',
    color: '#6366f1',
    status: 'Autonomous',
    health: '99.9%',
    latency: '8ms',
    messagesSentSec: 1450,
    role: 'High-frequency sub-metering, building energy telemetry, carbon accounting.',
    lastAction: 'Recorded 485.2 MW city aggregate demand',
    connectedTo: ['smart_grid', 'water_mgmt', 'orchestrator']
  },
  {
    id: 'water_mgmt',
    name: 'Water Management Agent',
    icon: 'Droplets',
    color: '#06b6d4',
    status: 'Autonomous',
    health: '97.2%',
    latency: '18ms',
    messagesSentSec: 310,
    role: 'Pressure regulation, leak detection, pump schedule optimization.',
    lastAction: 'Shifted pump schedule to off-peak 02:00 AM window',
    connectedTo: ['energy_mon', 'predictive_maint', 'orchestrator']
  },
  {
    id: 'waste_mgmt',
    name: 'Waste Management Agent',
    icon: 'Trash2',
    color: '#f97316',
    status: 'Active',
    health: '96.5%',
    latency: '24ms',
    messagesSentSec: 140,
    role: 'Fill-level monitoring, dynamic collection truck routing, recycling optimization.',
    lastAction: 'Generated 4 optimized collection routes for District 3',
    connectedTo: ['orchestrator']
  },
  {
    id: 'air_pollution',
    name: 'Air Pollution Agent',
    icon: 'Wind',
    color: '#14b8a6',
    status: 'Autonomous',
    health: '98.0%',
    latency: '16ms',
    messagesSentSec: 510,
    role: 'AQI dispersion modeling, industrial emission monitoring, traffic mitigation signals.',
    lastAction: 'Triggered HVAC pre-filter alert in North Zone',
    connectedTo: ['orchestrator', 'traffic_agent']
  },
  {
    id: 'ev_charging',
    name: 'EV Charging Agent',
    icon: 'Car',
    color: '#10b981',
    status: 'Autonomous',
    health: '99.1%',
    latency: '14ms',
    messagesSentSec: 640,
    role: 'Smart EV charge throttling, V2G bi-directional discharge, station queue management.',
    lastAction: 'Throttled Plaza charger #6 to prevent local feeder peak',
    connectedTo: ['smart_grid', 'solar_opt', 'orchestrator']
  },
  {
    id: 'predictive_maint',
    name: 'Predictive Maintenance Agent',
    icon: 'Wrench',
    color: '#ef4444',
    status: 'Autonomous',
    health: '98.5%',
    latency: '22ms',
    messagesSentSec: 390,
    role: 'Vibration analysis, thermal anomaly detection, remaining useful life (RUL) estimation.',
    lastAction: 'Flagged Transformer T-08 bearing fault probability 74%',
    connectedTo: ['smart_grid', 'water_mgmt', 'orchestrator']
  }
];

export const CROSS_AGENT_WORKFLOWS = [
  {
    id: 'wf-1',
    from: 'Solar Optimization Agent',
    to: 'Smart Grid Agent',
    protocol: 'gRPC / MQTT',
    status: 'ACTIVE',
    topic: 'grid/renewables/surplus',
    message: 'Surplus 14.5 MW solar generation predicted at Bay Farm from 11:00 AM - 02:00 PM. Reroute to BESS-01.',
    latency: '4ms'
  },
  {
    id: 'wf-2',
    from: 'Smart Grid Agent',
    to: 'EV Charging Agent',
    protocol: 'REST / WebSocket',
    status: 'ACTIVE',
    topic: 'grid/demand/response',
    message: 'Substation Sub-A approaching 85% load limit. Reduce EV Supercharger draw by 1.2 MW.',
    latency: '6ms'
  },
  {
    id: 'wf-3',
    from: 'Water Management Agent',
    to: 'Energy Monitoring Agent',
    protocol: 'Modbus / TCP',
    status: 'ACTIVE',
    topic: 'water/pumps/energy',
    message: 'Coordinating high-draw reservoir pumps with solar generation peak to minimize grid cost.',
    latency: '9ms'
  },
  {
    id: 'wf-4',
    from: 'Predictive Maintenance Agent',
    to: 'Digital Twin Agent',
    protocol: 'OPC-UA / MQTT',
    status: 'WARNING',
    topic: 'twin/assets/t08/health',
    message: 'Transformer T-08 thermal vibration score reached warning threshold (74.2%). Update Digital Twin status.',
    latency: '5ms'
  },
  {
    id: 'wf-5',
    from: 'Digital Twin Agent',
    to: 'AI Orchestrator',
    protocol: 'Internal Bus',
    status: 'OPTIMIZING',
    topic: 'orchestrator/city/health',
    message: 'City-wide Digital Twin Health Score updated: 96.4/100. 1 active simulation executing.',
    latency: '1ms'
  }
];
