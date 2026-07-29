export interface AgentCard {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  category: string;
  metrics: { label: string; value: string; trend: string }[];
  description: string;
  highlight: string;
  color: string;
  bgGradient: string;
  capabilities: string[];
}

export type CrisisType = 'heatwave' | 'flood' | 'blackout' | 'battery_failure' | 'water_leak' | 'solar_eclipse';

export interface CrisisScenario {
  id: CrisisType;
  title: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  description: string;
  icon: string;
  impactMetrics: {
    gridLoad: string;
    solarCap: string;
    waterPressure: string;
    evStatus: string;
  };
  aiResponseAction: string;
}

export interface TechNode {
  id: string;
  title: string;
  subtitle: string;
  layer: 'Cloud' | 'IoT' | 'Agents' | 'Digital Twin' | 'Decision Core' | 'Smart City';
  icon: string;
  latency: string;
  throughput: string;
  description: string;
}
