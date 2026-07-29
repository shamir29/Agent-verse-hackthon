import type { AgentCard, CrisisScenario, TechNode } from '../types';

export const AGENT_CARDS: AgentCard[] = [
  {
    id: 'smart-grid',
    name: 'Smart Grid',
    tagline: 'Autonomous Load Dispatch & Phase Balancing',
    icon: 'Zap',
    category: 'Energy',
    metrics: [
      { label: 'Grid Stability', value: '99.998%', trend: '+0.12%' },
      { label: 'Loss Reduction', value: '-18.4%', trend: 'Optimal' },
      { label: 'Peak Reroute Time', value: '4.2 ms', trend: 'Ultra-fast' }
    ],
    description: 'Dynamic load balancing across high-voltage substations, transformer phase syncing, and zero-latency line fault isolation.',
    highlight: 'Rerouted 4.2 GW during heatwave peak',
    color: '#2563EB',
    bgGradient: 'from-blue-50 to-blue-100/50',
    capabilities: [
      'Sub-millisecond line fault auto-isolation',
      'Harmonic distortion suppression engine',
      'Dynamic transformer oil heat modulation',
      'Peer-to-peer microgrid energy trading'
    ]
  },
  {
    id: 'solar-optimization',
    name: 'Solar Optimization',
    tagline: 'Predictive Sun-Tracking & Storage Feed',
    icon: 'Sun',
    category: 'Renewables',
    metrics: [
      { label: 'Yield Gain', value: '+31.4%', trend: 'Peak' },
      { label: 'Storage Feed Rate', value: '1.42 GW/h', trend: 'Active' },
      { label: 'Inverter Efficiency', value: '98.9%', trend: 'Nominal' }
    ],
    description: 'Autonomous dual-axis photovoltaic panel tilt adjustments based on hyper-local cloud vector forecasting and thermal sensor maps.',
    highlight: 'Optimizing 12,000 panel arrays in real time',
    color: '#F59E0B',
    bgGradient: 'from-amber-50 to-amber-100/50',
    capabilities: [
      'Cloud trajectory micro-shadow prediction',
      'Dual-axis solar tracker angle optimization',
      'Hotspot prevention via string current throttling',
      'Direct grid/battery dynamic output splitting'
    ]
  },
  {
    id: 'energy-monitoring',
    name: 'Energy Monitoring',
    tagline: 'Hyper-Scale Telemetry & Carbon Accounting',
    icon: 'BarChart3',
    category: 'Analytics',
    metrics: [
      { label: 'Sensors Online', value: '1.4M', trend: 'Live' },
      { label: 'Carbon Offset', value: '42,190 Tons', trend: 'Annual' },
      { label: 'Data Ingestion', value: '2.4 TB/s', trend: 'Sub-10ms' }
    ],
    description: 'Continuous real-time telemetry streaming across industrial, commercial, and residential smart meters with sub-second carbon intensity scoring.',
    highlight: 'Tracking 1,400,000 city node endpoints',
    color: '#16A34A',
    bgGradient: 'from-emerald-50 to-emerald-100/50',
    capabilities: [
      'Instantaneous carbon intensity calculation',
      'Non-intrusive load monitoring (NILM)',
      'Substation-level demand anomaly alerts',
      'Automated ESG compliance report generation'
    ]
  },
  {
    id: 'water-management',
    name: 'Water Management',
    tagline: 'Aquifer Conservation & Burst Detection',
    icon: 'Droplets',
    category: 'Resource',
    metrics: [
      { label: 'Leak Isolation', value: '99.4%', trend: '< 2 mins' },
      { label: 'Reservoir Level', value: '88.4%', trend: 'Balanced' },
      { label: 'Pressure Uniformity', value: '4.8 Bar', trend: 'Constant' }
    ],
    description: 'Acoustic sensing and hydrodynamic flow AI that isolates subterranean pipe micro-cracks before main bursts occur.',
    highlight: 'Saved 1.2 Billion gallons of water in 2025',
    color: '#0284C7',
    bgGradient: 'from-sky-50 to-sky-100/50',
    capabilities: [
      'Acoustic resonance pipe defect detection',
      'Dynamic variable-speed pump synchronization',
      'Stormwater runoff diversion algorithms',
      'Aquifer recharge rate optimization'
    ]
  },
  {
    id: 'waste-management',
    name: 'Waste Management',
    tagline: 'Autonomous Fleet Logistics & Volume AI',
    icon: 'Trash2',
    category: 'Logistics',
    metrics: [
      { label: 'Fleet Miles Saved', value: '42%', trend: '-12,400 mi' },
      { label: 'Bin Fill Accuracy', value: '99.1%', trend: 'Ultra-precise' },
      { label: 'Recycling Purity', value: '94.2%', trend: '+8.3%' }
    ],
    description: 'Computer vision sensors in urban waste containers trigger dynamic collection routes only when containers reach optimal fill capacity.',
    highlight: 'Eliminated 42% unnecessary truck dispatches',
    color: '#059669',
    bgGradient: 'from-teal-50 to-teal-100/50',
    capabilities: [
      'Real-time ultrasonic bin fill monitoring',
      'Dynamic route generation for electric refuse trucks',
      'Automated optical sorting at processing plants',
      'Hazardous material thermal sensor alerts'
    ]
  },
  {
    id: 'air-pollution',
    name: 'Air Pollution',
    tagline: 'Micro-Particle Vector & Clean Air Filters',
    icon: 'Wind',
    category: 'Environment',
    metrics: [
      { label: 'Citywide AQI', value: '18 (Good)', trend: '-34% PM2.5' },
      { label: 'Clean Corridors', value: '89 Active', trend: 'Filtered' },
      { label: 'Bio-Filter Output', value: '1.8M m³/h', trend: 'Max' }
    ],
    description: 'Predictive aerosol dispersion models that dynamically trigger urban green bio-filter towers and reroute heavy traffic away from schools.',
    highlight: 'Maintaining sub-20 AQI across 12 districts',
    color: '#8B5CF6',
    bgGradient: 'from-purple-50 to-purple-100/50',
    capabilities: [
      '3D atmospheric PM2.5 & NO2 flow mapping',
      'Dynamic low-emission zone traffic gating',
      'Urban canopy moisture mist activation',
      'Industrial stack emission counter-phasing'
    ]
  },
  {
    id: 'ev-charging',
    name: 'EV Charging',
    tagline: 'Grid-Aware Fleet Fast Charging Network',
    icon: 'Car',
    category: 'Mobility',
    metrics: [
      { label: 'Ports Active', value: '45,200', trend: '100% Online' },
      { label: 'Avg Charge Speed', value: '280 kW', trend: 'Ultra-fast' },
      { label: 'V2G Power Feed', value: '420 MW', trend: 'Discharging' }
    ],
    description: 'Bidirectional vehicle-to-grid (V2G) coordination that transforms idling EVs into distributed grid stabilization batteries.',
    highlight: '420 MW dynamic battery buffer delivered to grid',
    color: '#2563EB',
    bgGradient: 'from-indigo-50 to-indigo-100/50',
    capabilities: [
      'Dynamic surge pricing balancing',
      'Vehicle-to-grid (V2G) frequency stabilization',
      'Automated charger queue reservation',
      'Solar canopy direct-dc coupling'
    ]
  },
  {
    id: 'predictive-maintenance',
    name: 'Predictive Maintenance',
    tagline: 'Vibration, Thermal & Acoustic RUL Engine',
    icon: 'Wrench',
    category: 'Infrastructure',
    metrics: [
      { label: 'Unplanned Downtime', value: '0.00%', trend: 'Zero Faults' },
      { label: 'RUL Precision', value: '99.7%', trend: '±2 Hours' },
      { label: 'Active Monitors', value: '84,000', trend: 'Operational' }
    ],
    description: 'Machine learning vibration telemetry that estimates Remaining Useful Life (RUL) for key municipal pumps, turbines, and elevators.',
    highlight: 'Prevented 84 critical transformer failures',
    color: '#DC2626',
    bgGradient: 'from-rose-50 to-rose-100/50',
    capabilities: [
      'Ultrasonic bearing degradation detection',
      'Thermal imaging hot-spot isolation',
      'Automated spare part logistics ordering',
      'Digital twin stress-strain simulation'
    ]
  },
  {
    id: 'digital-twin',
    name: 'Digital Twin',
    tagline: 'Full-City Spatial Simulation & Scenario Time Machine',
    icon: 'Globe',
    category: 'Core',
    metrics: [
      { label: 'Spatial Accuracy', value: '1 mm', trend: 'LiDAR Sync' },
      { label: 'Time Horizon', value: '±50 Years', trend: 'Predictive' },
      { label: 'Simulation Speed', value: '100,000x', trend: 'Real-time' }
    ],
    description: 'High-fidelity 3D spatial replica of urban geography, underground utilities, and environmental vectors with instant simulation playback.',
    highlight: 'Simulates 50 years of urban climate in 4 seconds',
    color: '#0284C7',
    bgGradient: 'from-cyan-50 to-cyan-100/50',
    capabilities: [
      'City → District → Building → Component zoom',
      'Historical weather & flood impact playback',
      'Zoning and urban expansion heatmaps',
      'Autonomous agent swarm stress-testing'
    ]
  }
];

export const CRISIS_SCENARIOS: CrisisScenario[] = [
  {
    id: 'heatwave',
    title: 'Extreme Heatwave (48°C / 118°F)',
    severity: 'CRITICAL',
    description: 'AC energy demand spikes 340%. Primary transformer bank #4 over-temperature alert.',
    icon: 'Flame',
    impactMetrics: {
      gridLoad: '98.4% (Critical)',
      solarCap: '100% (Maximum Output)',
      waterPressure: 'Normal',
      evStatus: 'V2G Discharge Active (320 MW Feed)'
    },
    aiResponseAction: 'Rerouting 1.2 GW from industrial sector to residential grid; engaging EV fleet discharge and activating solar shading canopies.'
  },
  {
    id: 'flood',
    title: 'Flash Coastal Flood (Category 4 Storm)',
    severity: 'CRITICAL',
    description: 'Sub-surface water mains flooded in District 7. Lower substation water level rising.',
    icon: 'CloudRain',
    impactMetrics: {
      gridLoad: 'Safe Isolation',
      solarCap: '12% (Cloud Heavy)',
      waterPressure: 'Backflow Valves Engaged',
      evStatus: 'Rerouting to Elevated Chargers'
    },
    aiResponseAction: 'Automated floodgates deployed in 1.4 seconds; electric pumps powered via dedicated battery storage reserve.'
  },
  {
    id: 'blackout',
    title: 'External Transmission Line Severed',
    severity: 'HIGH',
    description: 'Main 500kV inter-city grid feed cut due to physical line fault outside municipal boundary.',
    icon: 'ZapOff',
    impactMetrics: {
      gridLoad: 'Island Mode (100% Self-Sustaining)',
      solarCap: 'Max Capacity',
      waterPressure: 'Nominal',
      evStatus: 'Priority Medical Facility Feed'
    },
    aiResponseAction: 'Seamlessly switched city to Island Mode within 3.8 milliseconds using rooftop solar + community battery storage buffers.'
  },
  {
    id: 'battery_failure',
    title: 'Central Battery Bank Thermal Runaway Alert',
    severity: 'HIGH',
    description: 'Battery Module B7 sensor detects localized temperature anomaly of +65°C.',
    icon: 'BatteryWarning',
    impactMetrics: {
      gridLoad: 'Balanced via Alternative Cells',
      solarCap: 'Re-directed to Grid Direct',
      waterPressure: 'Cooling Loop Engaged',
      evStatus: 'Normal'
    },
    aiResponseAction: 'Isolated Module B7 within 20ms; engaged liquid nitrogen cooling shroud and diverted energy stream to Module C.'
  },
  {
    id: 'water_leak',
    title: 'Catastrophic Water Main Burst (District 3)',
    severity: 'MEDIUM',
    description: 'Main trunk line pressure drop detected (loss of 8,000 L/min). Risk of sinkhole formation.',
    icon: 'Droplet',
    impactMetrics: {
      gridLoad: 'Normal',
      solarCap: 'Normal',
      waterPressure: 'Bypassed Line 3A',
      evStatus: 'Traffic Rerouted'
    },
    aiResponseAction: 'Shut motorized control valve CV-84; rerouted municipal water through secondary loops 4B & 5C in 45 seconds.'
  },
  {
    id: 'solar_eclipse',
    title: 'Total Solar Eclipse Solar Drop',
    severity: 'MEDIUM',
    description: 'Solar power output collapses from 1.8 GW to 0 GW over 12 minutes.',
    icon: 'Moon',
    impactMetrics: {
      gridLoad: 'Ramp-up Hydro & Battery (1.8 GW)',
      solarCap: '0% (Eclipsed)',
      waterPressure: 'Hydro Generation Active',
      evStatus: 'Charging Paused temporarily'
    },
    aiResponseAction: 'Pre-charged utility hydro-reservoirs and ramped up battery storage output to perfectly counteract the solar reduction curve.'
  }
];

export const TECH_NODES: TechNode[] = [
  {
    id: 'node-cloud',
    title: 'Edge Cloud Cluster',
    subtitle: 'Ultra-low latency edge compute instances',
    layer: 'Cloud',
    icon: 'Cloud',
    latency: '< 1.2 ms',
    throughput: '100 Gbps',
    description: 'Distributed Kubernetes micro-clusters deployed at key municipal substations for zero-latency local control.'
  },
  {
    id: 'node-iot',
    title: 'IoT Mesh Sensors',
    subtitle: '1.4M Smart Sensors & Actuators',
    layer: 'IoT',
    icon: 'Cpu',
    latency: '< 5 ms',
    throughput: '2.4 TB/s',
    description: 'Sensors measuring grid harmonics, acoustic vibration, thermal spectrums, and fluid pressure across 100% of municipal assets.'
  },
  {
    id: 'node-agents',
    title: 'Autonomous AI Swarm',
    subtitle: '9 Specialised Micro-Agents',
    layer: 'Agents',
    icon: 'Bot',
    latency: '< 0.5 ms',
    throughput: '45,000 Inf/s',
    description: 'Reinforcement learning neural agents specialized in microgrid dispatch, hydrological routing, and thermal balancing.'
  },
  {
    id: 'node-twin',
    title: 'Spatial Digital Twin',
    subtitle: 'Realtime 3D City Spatial Engine',
    layer: 'Digital Twin',
    icon: 'Box',
    latency: '< 16 ms (60 FPS)',
    throughput: '10 M Polygons',
    description: 'GPU-accelerated spatial state machine tracking position, energy density, and fluid dynamics of every city asset.'
  },
  {
    id: 'node-core',
    title: 'Neural Decision Engine',
    subtitle: 'Central Consensus & Safety Validator',
    layer: 'Decision Core',
    icon: 'BrainCircuit',
    latency: '< 2 ms',
    throughput: 'Deterministic',
    description: 'Formally verified constraint validator ensuring all AI agent actions adhere to municipal safety bounds and zero-blackout guarantees.'
  },
  {
    id: 'node-city',
    title: 'Smart City Infrastructure',
    subtitle: 'Power, Water, Mobility, Air',
    layer: 'Smart City',
    icon: 'Building2',
    latency: 'Real-time',
    throughput: '100% Operational',
    description: 'The physical city hardware: substations, solar farms, reservoirs, EV chargers, and automated building HVAC management.'
  }
];
