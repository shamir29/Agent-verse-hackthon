import type {
  TelemetryData,
  PanelData,
  FaultAlert,
  BatterySchedule,
  MaintenanceTask,
  ForecastHour,
  NotificationItem,
  AIInsight,
  FinancialMetric,
  EnvironmentalMetric,
  TelemetryConfig,
} from '../types/solar';

export const initialTelemetry: TelemetryData = {
  currentPowerKw: 485.4,
  todayEnergyKwh: 2840,
  systemEfficiencyPct: 96.8,
  co2SavedKg: 2140,
  costSavingsUsd: 426.5,
  batteryChargePct: 84,
  solarIrradianceWm2: 945,
  panelTempC: 41.2,
  ambientTempC: 28.5,
  inverterStatus: 'OPTIMAL',
  inverterEfficiencyPct: 98.6,
  gridExportKw: 310.2,
  gridImportKw: 0,
  batteryChargingStatus: 'CHARGING',
  batteryPowerKw: 45.0,
  timestamp: new Date().toLocaleTimeString(),
};

// Generate 48 realistic panels across 4 Strings (A, B, C, D)
export const initialPanels: PanelData[] = Array.from({ length: 48 }, (_, i) => {
  const stringIdx = Math.floor(i / 12);
  const stringName = ['String A', 'String B', 'String C', 'String D'][stringIdx];
  const stringChar = ['A', 'B', 'C', 'D'][stringIdx];
  const row = Math.floor((i % 12) / 4) + 1;
  const col = ((i % 12) % 4) + 1;
  const id = `Panel-${stringChar}${row}-${col}`;

  // Default values
  let status: 'HEALTHY' | 'WARNING' | 'FAULT' = 'HEALTHY';
  let healthScorePct = Math.floor(92 + Math.random() * 8);
  let powerOutputW = Math.floor(390 + Math.random() * 15);
  let dirtLevelPct = Math.floor(3 + Math.random() * 8);
  let shadingLevelPct = Math.floor(0 + Math.random() * 4);
  let temperatureC = parseFloat((38 + Math.random() * 4).toFixed(1));
  let faultDescription: string | undefined = undefined;

  // Specific simulation anomalies to make UI dynamic & realistic
  if (id === 'Panel-B2-1') {
    status = 'FAULT';
    healthScorePct = 64;
    powerOutputW = 185;
    temperatureC = 58.4;
    dirtLevelPct = 12;
    shadingLevelPct = 5;
    faultDescription = 'Cell Hotspot Detected & Bypass Diode Thermal Spike';
  } else if (id === 'Panel-C1-3') {
    status = 'WARNING';
    healthScorePct = 78;
    powerOutputW = 310;
    dirtLevelPct = 34;
    shadingLevelPct = 18;
    faultDescription = 'Dust & Bird Dropping Accumulation (Clean Array C)';
  } else if (id === 'Panel-D3-2') {
    status = 'WARNING';
    healthScorePct = 81;
    powerOutputW = 335;
    dirtLevelPct = 15;
    shadingLevelPct = 25;
    faultDescription = 'Tree Branch Partial Shading during peak sun';
  }

  const voltageV = parseFloat((38.5 + (powerOutputW / 400) * 4).toFixed(1));
  const currentA = parseFloat((powerOutputW / voltageV).toFixed(2));

  return {
    id,
    stringId: stringName,
    row,
    col,
    powerOutputW,
    voltageV,
    currentA,
    temperatureC,
    healthScorePct,
    dirtLevelPct,
    shadingLevelPct,
    status,
    faultDescription,
    lastCleanedDate: '2026-07-15',
    modelNumber: 'TSL-500W-PERC-V2',
  };
});

export const initialFaultAlerts: FaultAlert[] = [
  {
    id: 'ALT-101',
    title: 'Hotspot Thermal Failure on Panel B2-1',
    severity: 'CRITICAL',
    component: 'String B - Panel B2-1',
    rootCause: 'Bypass diode micro-fracture causing localized thermal overheating (58.4°C)',
    recommendedAction: 'Isolate Panel B2-1 string bypass and replace MC4 inline junction box.',
    estimatedLossUsdDay: 14.8,
    detectedAt: '10:42 AM Today',
    acknowledged: false,
  },
  {
    id: 'ALT-102',
    title: 'High Soiling / Dirt Level on Array C',
    severity: 'WARNING',
    component: 'String C (Panels C1-1 to C1-4)',
    rootCause: 'Heavy particulate and dust accumulation reducing irradiance absorption by 18%',
    recommendedAction: 'Deploy automated robotic cleaning or schedule manual wash team.',
    estimatedLossUsdDay: 8.5,
    detectedAt: '08:15 AM Today',
    acknowledged: false,
  },
  {
    id: 'ALT-103',
    title: 'Partial Shading Anomaly String D',
    severity: 'MODERATE',
    component: 'String D - Panel D3-2',
    rootCause: 'Overhanging tree branch obstruction during 11:00 AM - 13:30 PM window',
    recommendedAction: 'Trim perimeter vegetation on West side of Array D.',
    estimatedLossUsdDay: 4.2,
    detectedAt: '11:10 AM Today',
    acknowledged: true,
  },
  {
    id: 'ALT-104',
    title: 'Inverter MPPT Tracker Ripple Jitter',
    severity: 'MODERATE',
    component: 'Inverter #2 - Input 3',
    rootCause: 'Capacitance drift causing MPPT tracking efficiency drop by 1.2%',
    recommendedAction: 'Re-calibrate MPPT firmware or inspect input capacitor bank.',
    estimatedLossUsdDay: 3.1,
    detectedAt: '07:30 AM Today',
    acknowledged: true,
  },
];

export const initialBatterySchedule: BatterySchedule[] = [
  { timeSlot: '06:00 - 09:00', mode: 'CHARGE_SOLAR', plannedPowerKw: 25.0, tariffRateUsdKwh: 0.12 },
  { timeSlot: '09:00 - 11:00', mode: 'CHARGE_SOLAR', plannedPowerKw: 45.0, tariffRateUsdKwh: 0.15 },
  { timeSlot: '11:00 - 13:00', mode: 'EXPORT_GRID', plannedPowerKw: 60.0, tariffRateUsdKwh: 0.28, isCurrentSlot: true },
  { timeSlot: '13:00 - 16:00', mode: 'CHARGE_SOLAR', plannedPowerKw: 35.0, tariffRateUsdKwh: 0.22 },
  { timeSlot: '16:00 - 19:00', mode: 'EXPORT_GRID', plannedPowerKw: 80.0, tariffRateUsdKwh: 0.35 },
  { timeSlot: '19:00 - 23:00', mode: 'DISCHARGE_LOAD', plannedPowerKw: 50.0, tariffRateUsdKwh: 0.38 },
  { timeSlot: '23:00 - 06:00', mode: 'CHARGE_GRID', plannedPowerKw: 20.0, tariffRateUsdKwh: 0.08 },
];

export const initialMaintenanceTasks: MaintenanceTask[] = [
  {
    id: 'MNT-201',
    title: 'Clean Solar Panel Array C & String B',
    targetComponent: 'String B & String C Arrays',
    priority: 'HIGH',
    estimatedGainPct: 4.8,
    estimatedCostUsd: 120,
    timeRequiredHours: 1.5,
    status: 'RECOMMENDED',
    dueDate: '2026-07-29',
    description: 'Perform automated robotic de-soiling and distilled water rinse on String C.',
  },
  {
    id: 'MNT-202',
    title: 'Replace Faulty MC4 Connector on Panel B2-1',
    targetComponent: 'Panel B2-1 Bypass Diode',
    priority: 'HIGH',
    estimatedGainPct: 2.5,
    estimatedCostUsd: 45,
    timeRequiredHours: 0.5,
    status: 'RECOMMENDED',
    dueDate: '2026-07-28',
    description: 'Swap inline bypass junction box and re-torque MC4 solar crimp connector.',
  },
  {
    id: 'MNT-203',
    title: 'Recalibrate Inverter #2 MPPT Tracker',
    targetComponent: 'Inverter #2 MPPT Unit',
    priority: 'MEDIUM',
    estimatedGainPct: 1.2,
    estimatedCostUsd: 0,
    timeRequiredHours: 1.0,
    status: 'SCHEDULED',
    dueDate: '2026-07-30',
    description: 'Execute OTA firmware calibration for Maximum Power Point Tracker on Inverter #2.',
  },
  {
    id: 'MNT-204',
    title: 'Quarterly Battery Management System (BMS) Diagnostic',
    targetComponent: 'LiFePO4 Storage Bank #1',
    priority: 'LOW',
    estimatedGainPct: 0.8,
    estimatedCostUsd: 150,
    timeRequiredHours: 2.0,
    status: 'SCHEDULED',
    dueDate: '2026-08-05',
    description: 'Verify cell voltage balancing, thermal management coolant, and contactor resistance.',
  },
];

export const initialForecast: ForecastHour[] = [
  { timeLabel: '06:00', expectedKwh: 45, actualKwh: 42, irradianceWm2: 180, cloudCoverPct: 5 },
  { timeLabel: '08:00', expectedKwh: 160, actualKwh: 165, irradianceWm2: 450, cloudCoverPct: 2 },
  { timeLabel: '10:00', expectedKwh: 340, actualKwh: 335, irradianceWm2: 780, cloudCoverPct: 8 },
  { timeLabel: '12:00', expectedKwh: 490, actualKwh: 485, irradianceWm2: 960, cloudCoverPct: 0 },
  { timeLabel: '14:00', expectedKwh: 470, irradianceWm2: 920, cloudCoverPct: 10 },
  { timeLabel: '16:00', expectedKwh: 320, irradianceWm2: 650, cloudCoverPct: 15 },
  { timeLabel: '18:00', expectedKwh: 140, irradianceWm2: 300, cloudCoverPct: 20 },
  { timeLabel: '20:00', expectedKwh: 15, irradianceWm2: 40, cloudCoverPct: 10 },
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'NOT-1',
    title: 'Hotspot Thermal Warning',
    message: 'Panel B2-1 temperature exceeded 58°C threshold.',
    type: 'CRITICAL',
    timestamp: '10 mins ago',
    read: false,
  },
  {
    id: 'NOT-2',
    title: 'Optimal Grid Export Window',
    message: 'Peak rate active ($0.35/kWh). Exporting 310 kW to grid.',
    type: 'INFO',
    timestamp: '25 mins ago',
    read: false,
  },
  {
    id: 'NOT-3',
    title: 'Cleaning Recommendation',
    message: 'Panel String C dirt level reached 34%. Clean recommended.',
    type: 'WARNING',
    timestamp: '1 hour ago',
    read: true,
  },
];

export const initialAIInsights: AIInsight[] = [
  {
    id: 'INS-1',
    category: 'PERFORMANCE',
    content: 'Solar production is operating at 96.8% efficiency. System output is 4.2% higher than yesterday due to optimal 945 W/m² irradiance.',
    timestamp: '14:15 PM',
    confidenceScorePct: 98,
  },
  {
    id: 'INS-2',
    category: 'MAINTENANCE',
    content: 'Panel Row C requires cleaning. Washing string C will boost overall plant energy yield by ~4.8% (Est. +$20.40/day).',
    timestamp: '13:50 PM',
    actionRequired: 'Schedule Array C Washing',
    confidenceScorePct: 94,
  },
  {
    id: 'INS-3',
    category: 'BATTERY',
    content: 'Battery storage reached 84% SoC. High peak tariff window ($0.35/kWh) begins at 16:00 PM. Recommend exporting 60 kW surplus power.',
    timestamp: '12:30 PM',
    actionRequired: 'Set Export Schedule',
    confidenceScorePct: 97,
  },
  {
    id: 'INS-4',
    category: 'FINANCIAL',
    content: 'Grid dependency reduced by 94.2% today. Today net savings reached $426.50 against standard industrial utility tariff.',
    timestamp: '11:00 AM',
    confidenceScorePct: 99,
  },
];

export const initialFinancialMetrics: FinancialMetric = {
  todaySavingsUsd: 426.5,
  monthlySavingsUsd: 12840,
  annualSavingsUsd: 154200,
  systemRoiPct: 18.6,
  paybackPeriodYears: 3.4,
  standardBillUsd: 580.0,
  solarOptimizedBillUsd: 153.5,
};

export const initialEnvironmentalMetrics: EnvironmentalMetric = {
  co2ReductionTons: 2.14,
  renewableEnergyGeneratedMwh: 2.84,
  treesPlantedEquivalent: 142,
  fossilFuelOffsetGallons: 240,
  sustainabilityScore: 96,
};

export const initialTelemetryConfig: TelemetryConfig = {
  sensorFrequencySeconds: 2,
  mqttBrokerUrl: 'mqtt://energy-os.smartcity.utility:1883/solar/telemetry',
  wsEndpoint: 'wss://energy-os.smartcity.utility/ws/v1/stream',
  simulationMode: true,
  cloudCoverSimulation: false,
  dustAccumulationSimulation: false,
  inverterFaultSimulation: false,
};
