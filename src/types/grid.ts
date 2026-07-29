export type NodeType = 
  | 'power_plant'
  | 'substation'
  | 'transmission_tower'
  | 'solar_farm'
  | 'wind_farm'
  | 'battery_storage'
  | 'industrial'
  | 'residential'
  | 'commercial';

export type NodeStatus = 'optimal' | 'warning' | 'critical' | 'rerouted' | 'maintenance';

export interface GridNode {
  id: string;
  name: string;
  type: NodeType;
  lat: number;
  lng: number;
  x: number; // SVG/Canvas percentage position (0-100)
  y: number;
  loadMW: number;
  capacityMW: number;
  voltagekV: number;
  frequencyHz: number;
  health: number; // 0 - 100
  status: NodeStatus;
  aiStatus: string;
  region: string;
  connectedNodes: string[];
}

export interface TransmissionLine {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  voltagekV: number;
  currentLoadMW: number;
  maxCapacityMW: number;
  powerFlowDirection: 'forward' | 'reverse' | 'idle';
  isFaulted?: boolean;
  isRerouted?: boolean;
}

export interface GridTelemetry {
  gridStability: number; // e.g. 99.98%
  currentDemandGW: number; // e.g. 4.82 GW
  totalSupplyGW: number; // e.g. 5.10 GW
  renewablePercent: number; // e.g. 68.4%
  activeSubstations: number; // e.g. 142
  totalSubstations: number; // 142
  healthScore: number; // 98/100
  frequencyHz: number; // 60.02 Hz
  voltageStability: number; // 120.4 V
  powerLossPercent: number; // 2.4%
  co2OffsetTons: number; // 128,450
  costSavingsUSD: number; // $4.2M
}

export interface FaultEvent {
  id: string;
  timestamp: string;
  locationName: string;
  nodeId: string;
  lineId?: string;
  type: 'transformer_overload' | 'voltage_drop' | 'frequency_deviation' | 'tree_strike' | 'short_circuit';
  severity: 'minor' | 'major' | 'critical';
  status: 'detecting' | 'isolating' | 'rerouted' | 'resolved';
  detectionTimeMs: number;
  isolationTimeMs: number;
  rerouteTimeMs: number;
  impactDescription: string;
}

export interface MaintenanceAsset {
  id: string;
  assetName: string;
  category: 'Transformer' | 'Breaker' | 'Solar Inverter' | 'Wind Turbine' | 'Battery Pack';
  healthScore: number;
  remainingUsefulLifeDays: number;
  failureProbability: number; // %
  temperatureCelsius: number;
  vibrationMmPerSec: number;
  priority: 'High' | 'Medium' | 'Low';
  nextInspectionDate: string;
  aiRecommendation: string;
}

export interface AIInsight {
  id: string;
  title: string;
  category: 'Efficiency' | 'Stability' | 'Renewables' | 'Prevention';
  description: string;
  impact: string;
  actionText: string;
  confidenceScore: number;
  applied?: boolean;
}

export interface ControlState {
  aiAutopilot: boolean;
  dispatchStrategy: 'max_renewables' | 'max_reliability' | 'cost_optimized' | 'emergency';
  simSpeed: 1 | 2 | 5;
  activeLayers: {
    transmission: boolean;
    substations: boolean;
    renewables: boolean;
    battery: boolean;
    consumers: boolean;
    flowParticles: boolean;
  };
  weatherOverride: {
    sunIntensity: number; // 0 - 100%
    windSpeedKmh: number; // 0 - 100 km/h
  };
  isFaultSimulationActive: boolean;
}
