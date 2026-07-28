export interface TelemetryData {
  currentPowerKw: number;
  todayEnergyKwh: number;
  systemEfficiencyPct: number;
  co2SavedKg: number;
  costSavingsUsd: number;
  batteryChargePct: number;
  solarIrradianceWm2: number;
  panelTempC: number;
  ambientTempC: number;
  inverterStatus: 'OPTIMAL' | 'WARNING' | 'FAULT';
  inverterEfficiencyPct: number;
  gridExportKw: number;
  gridImportKw: number;
  batteryChargingStatus: 'CHARGING' | 'DISCHARGING' | 'IDLE' | 'RESERVED';
  batteryPowerKw: number;
  timestamp: string;
}

export interface PanelData {
  id: string;
  stringId: string;
  row: number;
  col: number;
  powerOutputW: number;
  voltageV: number;
  currentA: number;
  temperatureC: number;
  healthScorePct: number;
  dirtLevelPct: number;
  shadingLevelPct: number;
  status: 'HEALTHY' | 'WARNING' | 'FAULT';
  faultDescription?: string;
  lastCleanedDate: string;
  modelNumber: string;
}

export interface FaultAlert {
  id: string;
  title: string;
  severity: 'CRITICAL' | 'WARNING' | 'MODERATE';
  component: string;
  rootCause: string;
  recommendedAction: string;
  estimatedLossUsdDay: number;
  detectedAt: string;
  acknowledged: boolean;
}

export interface BatterySchedule {
  timeSlot: string;
  mode: 'CHARGE_SOLAR' | 'CHARGE_GRID' | 'DISCHARGE_LOAD' | 'EXPORT_GRID';
  plannedPowerKw: number;
  tariffRateUsdKwh: number;
  isCurrentSlot?: boolean;
}

export interface MaintenanceTask {
  id: string;
  title: string;
  targetComponent: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  estimatedGainPct: number;
  estimatedCostUsd: number;
  timeRequiredHours: number;
  status: 'RECOMMENDED' | 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED';
  dueDate: string;
  description: string;
}

export interface ForecastHour {
  timeLabel: string;
  expectedKwh: number;
  actualKwh?: number;
  irradianceWm2: number;
  cloudCoverPct: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'CRITICAL' | 'WARNING' | 'INFO';
  timestamp: string;
  read: boolean;
}

export interface AIInsight {
  id: string;
  category: 'PERFORMANCE' | 'MAINTENANCE' | 'BATTERY' | 'FINANCIAL';
  content: string;
  timestamp: string;
  actionRequired?: string;
  confidenceScorePct: number;
}

export interface FinancialMetric {
  todaySavingsUsd: number;
  monthlySavingsUsd: number;
  annualSavingsUsd: number;
  systemRoiPct: number;
  paybackPeriodYears: number;
  standardBillUsd: number;
  solarOptimizedBillUsd: number;
}

export interface EnvironmentalMetric {
  co2ReductionTons: number;
  renewableEnergyGeneratedMwh: number;
  treesPlantedEquivalent: number;
  fossilFuelOffsetGallons: number;
  sustainabilityScore: number;
}

export interface TelemetryConfig {
  sensorFrequencySeconds: number;
  mqttBrokerUrl: string;
  wsEndpoint: string;
  simulationMode: boolean;
  cloudCoverSimulation: boolean;
  dustAccumulationSimulation: boolean;
  inverterFaultSimulation: boolean;
}
