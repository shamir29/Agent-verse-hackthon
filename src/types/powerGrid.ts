export type NodeType = 'solar' | 'wind' | 'hydro' | 'thermal' | 'substation' | 'battery' | 'building';

export type BuildingCategory = 'hospital' | 'tech_center' | 'residential' | 'industrial' | 'commercial' | 'defense';

export type AlertSeverity = 'critical' | 'warning' | 'info';

export type ViewMode = '2d' | '3d';

export interface GridNode {
  id: string;
  name: string;
  type: NodeType;
  x: number; // percentage in grid map (0-100)
  y: number; // percentage in grid map (0-100)
  heightExtrusion?: number; // 3D height in pixels (e.g. 40 to 120)
  capacityMW: number;
  currentMW: number;
  voltageKV: number;
  frequencyHz: number;
  status: 'online' | 'degraded' | 'failed' | 'overloaded';
  category?: BuildingCategory;
  electricitySupplyPct?: number; // 0 to 100+ %
  priorityLevel?: number; // 1 (highest - hospital) to 5
}

export interface PowerLine {
  id: string;
  fromId: string;
  toId: string;
  maxCapacityMW: number;
  currentFlowMW: number;
  status: 'active' | 'tripped' | 'rerouted' | 'user_created';
  voltageKV: number;
  efficiencyPct: number;
  color?: string;
}

export interface SolarFarm {
  id: string;
  name: string;
  capacityMW: number;
  currentOutputMW: number;
  irradianceWm2: number; // e.g. 850 W/m²
  cloudCoverPct: number; // 0 to 100%
  panelEfficiencyPct: number; // e.g. 23.5%
  panelTempC: number;
  activeTrackers: number;
}

export interface WindFarm {
  id: string;
  name: string;
  capacityMW: number;
  currentOutputMW: number;
  windSpeedMs: number; // m/s
  activeTurbines: number;
  totalTurbines: number;
  bladePitchDeg: number;
  rotorRpm: number;
}

export interface BatteryBESS {
  id: string;
  name: string;
  maxCapacityMWh: number;
  currentChargeMWh: number;
  stateOfChargePct: number; // 0 to 100%
  maxPowerMW: number;
  currentPowerMW: number; // positive = discharging to grid, negative = charging
  mode: 'auto' | 'charge' | 'discharge' | 'reserve';
  healthPct: number;
  temperatureC: number;
  cycleCount: number;
}

export interface DistrictBuilding {
  id: string;
  nodeId: string;
  name: string;
  category: BuildingCategory;
  demandMW: number;
  suppliedMW: number;
  powerPct: number; // suppliedMW / demandMW * 100
  criticality: 'High' | 'Medium' | 'Low';
  glowColor: string; // CSS neon color
}

export interface GridFailureAlert {
  id: string;
  timestamp: string;
  nodeId?: string;
  lineId?: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  status: 'active' | 'investigating' | 'resolved_by_ai' | 'manually_fixed';
  affectedLoadMW: number;
  reroutedVia?: string;
}

export interface TelemetryStats {
  totalGenerationMW: number;
  totalDemandMW: number;
  netBalanceMW: number;
  renewableSharePct: number;
  solarGenerationMW: number;
  windGenerationMW: number;
  hydroGenerationMW: number;
  thermalReserveMW: number;
  gridFrequencyHz: number;
  gridVoltageIndexPct: number;
  bessChargePct: number;
  bessNetMW: number;
  carbonOffsetTonsToday: number;
  gridStabilityScore: number; // 0 to 100
  activeFailuresCount: number;
}

export interface AgentMessage {
  id: string;
  sender: 'ai' | 'user' | 'system';
  text: string;
  timestamp: string;
  actionTaken?: {
    type: string;
    details: string;
  };
}

export type ActiveTab = 'grid_view' | 'renewables' | 'failures' | 'battery' | 'analytics';
