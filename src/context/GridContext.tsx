import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  GridNode, 
  TransmissionLine, 
  GridTelemetry, 
  FaultEvent, 
  MaintenanceAsset, 
  AIInsight, 
  ControlState 
} from '../types/grid';

// Initial Mock Data
const INITIAL_NODES: GridNode[] = [
  {
    id: 'node-solar-alpha',
    name: 'NeuraSolar MegaArray Alpha',
    type: 'solar_farm',
    lat: 37.7749,
    lng: -122.4194,
    x: 18,
    y: 28,
    loadMW: 420,
    capacityMW: 500,
    voltagekV: 230,
    frequencyHz: 60.01,
    health: 99,
    status: 'optimal',
    aiStatus: 'Peak Solar Tracking Active',
    region: 'North Sector',
    connectedNodes: ['node-sub-north', 'node-battery-main']
  },
  {
    id: 'node-wind-coastal',
    name: 'Oceania Wind Park 1',
    type: 'wind_farm',
    lat: 37.7833,
    lng: -122.4167,
    x: 82,
    y: 22,
    loadMW: 680,
    capacityMW: 800,
    voltagekV: 230,
    frequencyHz: 60.02,
    health: 97,
    status: 'optimal',
    aiStatus: 'Turbine Pitch Optimized',
    region: 'East Coastal',
    connectedNodes: ['node-sub-east', 'node-transmission-hub-1']
  },
  {
    id: 'node-plant-hydro',
    name: 'Cascade Hydro Dam & Reserve',
    type: 'power_plant',
    lat: 37.7690,
    lng: -122.4480,
    x: 50,
    y: 12,
    loadMW: 1200,
    capacityMW: 1500,
    voltagekV: 500,
    frequencyHz: 60.00,
    health: 98,
    status: 'optimal',
    aiStatus: 'Baseload Synchronized',
    region: 'Highland Ridge',
    connectedNodes: ['node-transmission-hub-1', 'node-sub-north', 'node-sub-west']
  },
  {
    id: 'node-battery-main',
    name: 'NeuraBank 400MWh BESS',
    type: 'battery_storage',
    lat: 37.7550,
    lng: -122.4350,
    x: 32,
    y: 48,
    loadMW: 250,
    capacityMW: 400,
    voltagekV: 115,
    frequencyHz: 60.01,
    health: 100,
    status: 'optimal',
    aiStatus: 'Fast Frequency Response (FFR) Ready',
    region: 'Central Core',
    connectedNodes: ['node-sub-north', 'node-sub-central', 'node-solar-alpha']
  },
  {
    id: 'node-transmission-hub-1',
    name: 'Sector 5 High-Voltage Nexus',
    type: 'transmission_tower',
    lat: 37.7600,
    lng: -122.4100,
    x: 65,
    y: 35,
    loadMW: 1850,
    capacityMW: 2200,
    voltagekV: 500,
    frequencyHz: 60.01,
    health: 96,
    status: 'optimal',
    aiStatus: 'Dynamic Line Rating (DLR) Active',
    region: 'Central Gateway',
    connectedNodes: ['node-plant-hydro', 'node-wind-coastal', 'node-sub-central', 'node-industrial-zone']
  },
  {
    id: 'node-sub-north',
    name: 'North Metro Primary Substation',
    type: 'substation',
    lat: 37.7800,
    lng: -122.4300,
    x: 25,
    y: 42,
    loadMW: 380,
    capacityMW: 450,
    voltagekV: 115,
    frequencyHz: 60.00,
    health: 94,
    status: 'optimal',
    aiStatus: 'VAR Voltage Compensated',
    region: 'North Sector',
    connectedNodes: ['node-solar-alpha', 'node-battery-main', 'node-residential-north']
  },
  {
    id: 'node-sub-central',
    name: 'Downtown Financial Substation',
    type: 'substation',
    lat: 37.7500,
    lng: -122.4200,
    x: 52,
    y: 58,
    loadMW: 720,
    capacityMW: 800,
    voltagekV: 115,
    frequencyHz: 59.99,
    health: 92,
    status: 'optimal',
    aiStatus: 'Peak Demand Smoothing',
    region: 'Downtown Core',
    connectedNodes: ['node-transmission-hub-1', 'node-commercial-district', 'node-battery-main']
  },
  {
    id: 'node-sub-east',
    name: 'East Innovation Grid Station',
    type: 'substation',
    lat: 37.7700,
    lng: -122.3900,
    x: 78,
    y: 52,
    loadMW: 490,
    capacityMW: 600,
    voltagekV: 115,
    frequencyHz: 60.01,
    health: 95,
    status: 'optimal',
    aiStatus: 'Thermal Load Balance OK',
    region: 'East Waterfront',
    connectedNodes: ['node-wind-coastal', 'node-industrial-zone', 'node-sub-south']
  },
  {
    id: 'node-industrial-zone',
    name: 'Silicon Heavy Industrial District',
    type: 'industrial',
    lat: 37.7400,
    lng: -122.3950,
    x: 75,
    y: 72,
    loadMW: 920,
    capacityMW: 1100,
    voltagekV: 34.5,
    frequencyHz: 60.00,
    health: 96,
    status: 'optimal',
    aiStatus: 'Flexible Demand Contract Active',
    region: 'South East Industrial',
    connectedNodes: ['node-transmission-hub-1', 'node-sub-east']
  },
  {
    id: 'node-commercial-district',
    name: 'Metro Center Commercial Towers',
    type: 'commercial',
    lat: 37.7450,
    lng: -122.4250,
    x: 48,
    y: 75,
    loadMW: 580,
    capacityMW: 700,
    voltagekV: 34.5,
    frequencyHz: 60.01,
    health: 98,
    status: 'optimal',
    aiStatus: 'HVAC Smart Modulation',
    region: 'Central Business',
    connectedNodes: ['node-sub-central']
  },
  {
    id: 'node-residential-north',
    name: 'Heights Eco-Residential Community',
    type: 'residential',
    lat: 37.7900,
    lng: -122.4400,
    x: 18,
    y: 65,
    loadMW: 310,
    capacityMW: 400,
    voltagekV: 12,
    frequencyHz: 60.01,
    health: 99,
    status: 'optimal',
    aiStatus: 'V2G EV Battery Syncing',
    region: 'North Sector',
    connectedNodes: ['node-sub-north']
  },
  {
    id: 'node-sub-south',
    name: 'South Port Microgrid Substation',
    type: 'substation',
    lat: 37.7300,
    lng: -122.4100,
    x: 62,
    y: 85,
    loadMW: 290,
    capacityMW: 350,
    voltagekV: 115,
    frequencyHz: 60.02,
    health: 98,
    status: 'optimal',
    aiStatus: 'Islanding Capability Standby',
    region: 'South Bay',
    connectedNodes: ['node-sub-east', 'node-industrial-zone']
  }
];

const INITIAL_LINES: TransmissionLine[] = [
  { id: 'line-1', fromNodeId: 'node-solar-alpha', toNodeId: 'node-sub-north', voltagekV: 230, currentLoadMW: 420, maxCapacityMW: 600, powerFlowDirection: 'forward' },
  { id: 'line-2', fromNodeId: 'node-solar-alpha', toNodeId: 'node-battery-main', voltagekV: 230, currentLoadMW: 180, maxCapacityMW: 300, powerFlowDirection: 'forward' },
  { id: 'line-3', fromNodeId: 'node-wind-coastal', toNodeId: 'node-transmission-hub-1', voltagekV: 500, currentLoadMW: 680, maxCapacityMW: 900, powerFlowDirection: 'forward' },
  { id: 'line-4', fromNodeId: 'node-wind-coastal', toNodeId: 'node-sub-east', voltagekV: 230, currentLoadMW: 340, maxCapacityMW: 500, powerFlowDirection: 'forward' },
  { id: 'line-5', fromNodeId: 'node-plant-hydro', toNodeId: 'node-transmission-hub-1', voltagekV: 500, currentLoadMW: 1200, maxCapacityMW: 1600, powerFlowDirection: 'forward' },
  { id: 'line-6', fromNodeId: 'node-transmission-hub-1', toNodeId: 'node-sub-central', voltagekV: 500, currentLoadMW: 850, maxCapacityMW: 1200, powerFlowDirection: 'forward' },
  { id: 'line-7', fromNodeId: 'node-transmission-hub-1', toNodeId: 'node-industrial-zone', voltagekV: 500, currentLoadMW: 920, maxCapacityMW: 1200, powerFlowDirection: 'forward' },
  { id: 'line-8', fromNodeId: 'node-battery-main', toNodeId: 'node-sub-central', voltagekV: 115, currentLoadMW: 250, maxCapacityMW: 400, powerFlowDirection: 'forward' },
  { id: 'line-9', fromNodeId: 'node-sub-north', toNodeId: 'node-residential-north', voltagekV: 115, currentLoadMW: 310, maxCapacityMW: 450, powerFlowDirection: 'forward' },
  { id: 'line-10', fromNodeId: 'node-sub-central', toNodeId: 'node-commercial-district', voltagekV: 115, currentLoadMW: 580, maxCapacityMW: 800, powerFlowDirection: 'forward' },
  { id: 'line-11', fromNodeId: 'node-sub-east', toNodeId: 'node-industrial-zone', voltagekV: 115, currentLoadMW: 490, maxCapacityMW: 700, powerFlowDirection: 'forward' },
  { id: 'line-12', fromNodeId: 'node-sub-east', toNodeId: 'node-sub-south', voltagekV: 115, currentLoadMW: 290, maxCapacityMW: 400, powerFlowDirection: 'forward' },
];

const INITIAL_TELEMETRY: GridTelemetry = {
  gridStability: 99.98,
  currentDemandGW: 4.82,
  totalSupplyGW: 5.10,
  renewablePercent: 68.4,
  activeSubstations: 142,
  totalSubstations: 142,
  healthScore: 98,
  frequencyHz: 60.02,
  voltageStability: 120.4,
  powerLossPercent: 2.38,
  co2OffsetTons: 128450,
  costSavingsUSD: 4250000
};

const INITIAL_FAULTS: FaultEvent[] = [
  {
    id: 'fault-history-1',
    timestamp: '09:14:22',
    locationName: 'Transmission Tower Sector 5 (Line 7)',
    nodeId: 'node-transmission-hub-1',
    lineId: 'line-7',
    type: 'tree_strike',
    severity: 'major',
    status: 'resolved',
    detectionTimeMs: 3.8,
    isolationTimeMs: 11.2,
    rerouteTimeMs: 29.4,
    impactDescription: 'Branch contact isolated. Power rerouted via East Substation Loop B in 29.4ms.'
  }
];

const INITIAL_MAINTENANCE: MaintenanceAsset[] = [
  {
    id: 'maint-1',
    assetName: 'Main Step-Up Transformer T-4',
    category: 'Transformer',
    healthScore: 91,
    remainingUsefulLifeDays: 142,
    failureProbability: 3.2,
    temperatureCelsius: 64.5,
    vibrationMmPerSec: 1.4,
    priority: 'Low',
    nextInspectionDate: '2026-08-15',
    aiRecommendation: 'Schedule thermal fluid exchange during Q3 low-demand window.'
  },
  {
    id: 'maint-2',
    assetName: 'Downtown Central Vacuum Breaker CB-12',
    category: 'Breaker',
    healthScore: 84,
    remainingUsefulLifeDays: 48,
    failureProbability: 8.7,
    temperatureCelsius: 58.2,
    vibrationMmPerSec: 2.8,
    priority: 'Medium',
    nextInspectionDate: '2026-08-04',
    aiRecommendation: 'Contact resistance micro-drift detected. Lubricate mechanical actuator.'
  },
  {
    id: 'maint-3',
    assetName: 'Solar Alpha Central Inverter Group 3',
    category: 'Solar Inverter',
    healthScore: 97,
    remainingUsefulLifeDays: 310,
    failureProbability: 1.1,
    temperatureCelsius: 42.0,
    vibrationMmPerSec: 0.5,
    priority: 'Low',
    nextInspectionDate: '2026-10-01',
    aiRecommendation: 'All IGBT switching modules operating at optimal thermal equilibrium.'
  },
  {
    id: 'maint-4',
    assetName: 'Coastal Wind Turbine #14 Pitch Drive',
    category: 'Wind Turbine',
    healthScore: 78,
    remainingUsefulLifeDays: 22,
    failureProbability: 14.5,
    temperatureCelsius: 72.8,
    vibrationMmPerSec: 4.2,
    priority: 'High',
    nextInspectionDate: '2026-08-01',
    aiRecommendation: 'Elevated bearing vibration frequency harmonics. Autonomous load capping active.'
  }
];

const INITIAL_INSIGHTS: AIInsight[] = [
  {
    id: 'insight-1',
    title: 'Pre-Charge Battery Reserve for Evening Peak',
    category: 'Renewables',
    description: 'Solar generation peak predicted in 2 hours. Recommended to charge NeuraBank BESS to 95% capacity.',
    impact: '+420 MWh stored @ $0 CO₂ footprint',
    actionText: 'Execute Pre-Charge Sequence',
    confidenceScore: 99.4,
    applied: false
  },
  {
    id: 'insight-2',
    title: 'Dynamic Line Rating (DLR) Capacity Expansion',
    category: 'Efficiency',
    description: 'Ambient coastal wind provides 14°C convective cooling on Line 3. Safe capacity increased by +18%.',
    impact: 'Avoided $140,000 thermal curtailment',
    actionText: 'Enable DLR Auto-Boost',
    confidenceScore: 98.7,
    applied: true
  },
  {
    id: 'insight-3',
    title: 'Industrial Heavy Sector Load Modulation',
    category: 'Stability',
    description: 'Automated demand response signal sent to Silicon Heavy Industrial. 40MW non-critical HVAC shed.',
    impact: 'Grid frequency stabilized to 60.01 Hz',
    actionText: 'Maintain Demand Response',
    confidenceScore: 99.8,
    applied: true
  }
];

interface GridContextType {
  nodes: GridNode[];
  lines: TransmissionLine[];
  telemetry: GridTelemetry;
  faults: FaultEvent[];
  maintenance: MaintenanceAsset[];
  insights: AIInsight[];
  controlState: ControlState;
  selectedNode: GridNode | null;
  setSelectedNode: (node: GridNode | null) => void;
  triggerFaultSimulation: (type: FaultEvent['type']) => void;
  toggleLayer: (layerKey: keyof ControlState['activeLayers']) => void;
  setDispatchStrategy: (strategy: ControlState['dispatchStrategy']) => void;
  setAutopilot: (active: boolean) => void;
  setWeather: (sun: number, wind: number) => void;
  applyInsight: (id: string) => void;
  activeSectorOverload: number;
  setActiveSectorOverload: (val: number) => void;
}

const GridContext = createContext<GridContextType | undefined>(undefined);

export const GridProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nodes, setNodes] = useState<GridNode[]>(INITIAL_NODES);
  const [lines, setLines] = useState<TransmissionLine[]>(INITIAL_LINES);
  const [telemetry, setTelemetry] = useState<GridTelemetry>(INITIAL_TELEMETRY);
  const [faults, setFaults] = useState<FaultEvent[]>(INITIAL_FAULTS);
  const [maintenance] = useState<MaintenanceAsset[]>(INITIAL_MAINTENANCE);
  const [insights, setInsights] = useState<AIInsight[]>(INITIAL_INSIGHTS);
  const [selectedNode, setSelectedNode] = useState<GridNode | null>(null);
  const [activeSectorOverload, setActiveSectorOverload] = useState<number>(0);

  const [controlState, setControlState] = useState<ControlState>({
    aiAutopilot: true,
    dispatchStrategy: 'max_renewables',
    simSpeed: 1,
    activeLayers: {
      transmission: true,
      substations: true,
      renewables: true,
      battery: true,
      consumers: true,
      flowParticles: true
    },
    weatherOverride: {
      sunIntensity: 85,
      windSpeedKmh: 42
    },
    isFaultSimulationActive: false
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => {
        const noiseFreq = (Math.random() - 0.5) * 0.008;
        const noiseDemand = (Math.random() - 0.5) * 0.02;
        const noiseSupply = (Math.random() - 0.5) * 0.02;
        
        const sunFactor = controlState.weatherOverride.sunIntensity / 100;
        const windFactor = controlState.weatherOverride.windSpeedKmh / 100;
        const newRenewablePct = Math.min(95, Math.max(30, 50 + sunFactor * 25 + windFactor * 20));

        return {
          ...prev,
          frequencyHz: parseFloat((60.00 + noiseFreq).toFixed(3)),
          currentDemandGW: parseFloat((4.80 + noiseDemand + activeSectorOverload * 0.015).toFixed(2)),
          totalSupplyGW: parseFloat((5.08 + noiseSupply + activeSectorOverload * 0.015).toFixed(2)),
          renewablePercent: parseFloat(newRenewablePct.toFixed(1)),
          gridStability: parseFloat((99.95 + Math.random() * 0.04).toFixed(2))
        };
      });

      setNodes(prev => prev.map(n => {
        if (n.type === 'solar_farm') {
          const load = Math.round(n.capacityMW * (controlState.weatherOverride.sunIntensity / 100));
          return { ...n, loadMW: load };
        }
        if (n.type === 'wind_farm') {
          const load = Math.round(n.capacityMW * (controlState.weatherOverride.windSpeedKmh / 80));
          return { ...n, loadMW: load };
        }
        if (n.type === 'industrial' && activeSectorOverload > 0) {
          const load = Math.round(920 * (1 + activeSectorOverload / 100));
          return { ...n, loadMW: load, status: activeSectorOverload > 40 ? 'warning' : 'optimal' };
        }
        return n;
      }));

    }, 1200);

    return () => clearInterval(interval);
  }, [controlState.weatherOverride, activeSectorOverload]);

  const triggerFaultSimulation = (type: FaultEvent['type']) => {
    const faultId = `fault-${Date.now()}`;
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    
    const targetNodeId = type === 'transformer_overload' ? 'node-sub-central' : 'node-transmission-hub-1';
    const targetLineId = type === 'tree_strike' ? 'line-7' : 'line-6';

    const newFault: FaultEvent = {
      id: faultId,
      timestamp,
      locationName: type === 'transformer_overload' ? 'Downtown Financial Substation' : 'Sector 5 High-Voltage Nexus',
      nodeId: targetNodeId,
      lineId: targetLineId,
      type,
      severity: 'critical',
      status: 'detecting',
      detectionTimeMs: 3.4,
      isolationTimeMs: 11.8,
      rerouteTimeMs: 34.2,
      impactDescription: `AI Grid Agent detected ${type.replace('_', ' ')}. Rerouting power in real-time...`
    };

    setControlState(prev => ({ ...prev, isFaultSimulationActive: true }));
    setFaults(prev => [newFault, ...prev]);

    setNodes(prev => prev.map(n => n.id === targetNodeId ? { ...n, status: 'critical', aiStatus: 'FAULT DETECTED - Isolating Breaker' } : n));
    setLines(prev => prev.map(l => l.id === targetLineId ? { ...l, isFaulted: true } : l));

    setTimeout(() => {
      setFaults(prev => prev.map(f => f.id === faultId ? { ...f, status: 'isolating', impactDescription: 'Breaker CB-14 Tripped in 11.8ms. Isolating faulted line.' } : f));
    }, 900);

    setTimeout(() => {
      setNodes(prev => prev.map(n => n.id === targetNodeId ? { ...n, status: 'rerouted', aiStatus: 'AI Autonomous Power Rerouted via Backup Loop C' } : n));
      setLines(prev => prev.map(l => l.id === targetLineId ? { ...l, isFaulted: false, isRerouted: true } : l));
      setFaults(prev => prev.map(f => f.id === faultId ? { 
        ...f, 
        status: 'rerouted', 
        impactDescription: 'Power successfully rerouted via NeuraBank BESS & East Loop. Zero customer outage.' 
      } : f));
    }, 2200);

    setTimeout(() => {
      setNodes(prev => prev.map(n => n.id === targetNodeId ? { ...n, status: 'optimal', aiStatus: 'Grid Stabilized • Normal Operations' } : n));
      setLines(prev => prev.map(l => ({ ...l, isFaulted: false, isRerouted: false })));
      setFaults(prev => prev.map(f => f.id === faultId ? { ...f, status: 'resolved' } : f));
      setControlState(prev => ({ ...prev, isFaultSimulationActive: false }));
    }, 4500);
  };

  const toggleLayer = (layerKey: keyof ControlState['activeLayers']) => {
    setControlState(prev => ({
      ...prev,
      activeLayers: {
        ...prev.activeLayers,
        [layerKey]: !prev.activeLayers[layerKey]
      }
    }));
  };

  const setDispatchStrategy = (strategy: ControlState['dispatchStrategy']) => {
    setControlState(prev => ({ ...prev, dispatchStrategy: strategy }));
  };

  const setAutopilot = (active: boolean) => {
    setControlState(prev => ({ ...prev, aiAutopilot: active }));
  };

  const setWeather = (sun: number, wind: number) => {
    setControlState(prev => ({
      ...prev,
      weatherOverride: { sunIntensity: sun, windSpeedKmh: wind }
    }));
  };

  const applyInsight = (id: string) => {
    setInsights(prev => prev.map(i => i.id === id ? { ...i, applied: true } : i));
  };

  return (
    <GridContext.Provider value={{
      nodes,
      lines,
      telemetry,
      faults,
      maintenance,
      insights,
      controlState,
      selectedNode,
      setSelectedNode,
      triggerFaultSimulation,
      toggleLayer,
      setDispatchStrategy,
      setAutopilot,
      setWeather,
      applyInsight,
      activeSectorOverload,
      setActiveSectorOverload
    }}>
      {children}
    </GridContext.Provider>
  );
};

export const useGrid = () => {
  const context = useContext(GridContext);
  if (!context) throw new Error('useGrid must be used within GridProvider');
  return context;
};
