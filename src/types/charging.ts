export interface ChargingStation {
  id: string;
  name: string;
  district: string;
  lat: number;
  lng: number;
  type: 'fast' | 'ultra_fast';
  powerKw: number; // e.g. 150, 350
  status: 'available' | 'occupied' | 'maintenance';
  totalPorts: number;
  availablePorts: number;
  renewablePct: number;
  queueTimeMin: number;
  tariffPerKwh: number;
  connectors: ('CCS2' | 'NACS' | 'Type2' | 'CHAdeMO')[];
  temperatureC: number;
  efficiencyPct: number;
  rulDays: number; // Remaining useful life
}

export interface EVVehicle {
  id: string;
  model: string;
  batteryCapacityKwh: number;
  currentSocPct: number;
  targetSocPct: number;
  maxChargeKw: number;
  routeProgress: number; // 0 to 1
  destinationStationId: string;
  status: 'en_route' | 'charging' | 'departing';
  x: number;
  y: number;
  pathIndex: number;
}

export interface GridLoadMetric {
  timestamp: string;
  unmanagedKw: number;
  aiBalancedKw: number;
  capacityKw: number;
  renewableKw: number;
  solarKw: number;
  windKw: number;
  batteryStorageKw: number;
}

export interface NotificationItem {
  id: string;
  type: 'charging_completed' | 'station_available' | 'reservation_confirmed' | 'peak_pricing' | 'grid_optimization' | 'maintenance_detected' | 'renewable_available';
  title: string;
  message: string;
  timestamp: string;
  severity: 'info' | 'success' | 'warning' | 'ai';
  read: boolean;
}

export interface DriverJourneyStep {
  id: number;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  hudMetrics: {
    label: string;
    value: string;
  }[];
}
