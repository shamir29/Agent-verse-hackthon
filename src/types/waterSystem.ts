export type UserRole = 'Admin' | 'Engineer' | 'Operator' | 'Viewer';
export type Language = 'EN' | 'ES' | 'FR' | 'HI';

export type RiskLevel = 'Safe' | 'Warning' | 'Critical';
export type LeakSeverity = 'Low' | 'Medium' | 'High' | 'Critical';
export type HealthStatus = 'Optimal' | 'Degraded' | 'Fault' | 'Offline';

export interface MainTelemetry {
  totalWaterAvailableMGL: number; // Million Gallons
  dailyConsumptionMGL: number;
  reservoirCapacityPct: number;
  activeLeaksCount: number;
  floodRiskPct: number;
  floodRiskLevel: RiskLevel;
  waterQualityIndex: number; // 0 - 100
  smartIrrigationSavedLiters: number;
  rainwaterHarvestedLiters: number;
  activeSensorsCount: number;
  totalSensorsCount: number;
  aiPredictionSummary: string;
}

export interface PipelineRoute {
  id: string;
  name: string;
  sector: string;
  lengthKm: number;
  pressurePsi: number;
  targetPressurePsi: number;
  flowSpeedMs: number; // m/s
  distributionEfficiencyPct: number;
  status: 'Operational' | 'Warning' | 'Leaking' | 'Isolated';
  startCoord: [number, number]; // lat, lng
  endCoord: [number, number];
  isUnderground: boolean;
  leakSeverity?: LeakSeverity;
  estimatedLossLh?: number;
}

export interface LeakAlert {
  id: string;
  pipeId: string;
  pipeName: string;
  sector: string;
  locationName: string;
  latitude: number;
  longitude: number;
  severity: LeakSeverity;
  pressureDropPsi: number;
  estimatedLossLh: number; // liters per hour
  repairPriority: 'P1 - Immediate' | 'P2 - High' | 'P3 - Moderate' | 'P4 - Scheduled';
  detectedAt: string;
  leakProbabilityPct: number;
  status: 'Detected' | 'Dispatched' | 'Isolated' | 'Repaired';
}

export interface FloodPredictionData {
  id: string;
  zoneName: string;
  sector: string;
  overallRiskPct: number;
  riskLevel: RiskLevel;
  flashFloodRiskPct: number;
  riverOverflowRiskPct: number;
  damOverflowRiskPct: number;
  urbanFloodRiskPct: number;
  predictedPeakTime: string;
  forecastTimeline: { hour: string; riskPct: number; rainfallMm: number }[];
  evacuationRecommended: boolean;
}

export interface ReservoirData {
  id: string;
  name: string;
  location: string;
  currentLevelM: number;
  maxLevelM: number;
  currentCapacityMGL: number;
  maxCapacityMGL: number;
  fillPercentage: number;
  dailyInflowMGL: number;
  dailyOutflowMGL: number;
  expectedDaysToFull: number;
  healthScore: number; // 0 - 100
  damGateOpenPct: number;
  status: 'Normal' | 'High Level' | 'Critical High' | 'Low Level';
  coordinates: [number, number];
}

export interface WaterQualitySector {
  id: string;
  sectorName: string;
  location: string;
  pH: number; // ideal 6.5 - 8.5
  tdsPpm: number; // ideal < 300
  turbidityNtu: number; // ideal < 1.0
  temperatureC: number;
  dissolvedOxygenMgL: number; // ideal 6.5 - 8
  contaminationPct: number;
  qualityScore: number; // 0 - 100
  statusColor: 'Green' | 'Yellow' | 'Red';
  alerts: string[];
}

export interface SmartFarmField {
  id: string;
  fieldName: string;
  cropType: string;
  areaHectares: number;
  soilMoisturePct: number;
  targetMoisturePct: number;
  recommendedTime: string;
  recommendedVolumeLiters: number;
  savedWaterTodayLiters: number;
  weatherCondition: string;
  irrigationStatus: 'Optimal' | 'Needs Watering' | 'Irrigating Now' | 'Rain Expected';
  coordinates: [number, number];
}

export interface RainwaterAnalyticsData {
  id: string;
  zoneName: string;
  currentRainfallMm: number;
  harvestedLitersToday: number;
  collectionEfficiencyPct: number;
  storageCapacityLiters: number;
  storageFilledPct: number;
  predictedRainfall24hMm: number;
  hourlyRainfall: { time: string; actualMm: number; predictedMm: number }[];
}

export interface AIInsight {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  category: 'Leak' | 'Flood' | 'Quality' | 'Reservoir' | 'Irrigation';
  severity: 'Info' | 'Warning' | 'Critical';
  confidencePct: number;
  suggestedAction: string;
}

export interface IoTSensor {
  id: string;
  name: string;
  type: 'Pressure' | 'Flow' | 'Quality' | 'Moisture' | 'Level';
  location: string;
  batteryPct: number;
  signalStrengthPct: number;
  status: HealthStatus;
  lastReading: string;
  coordinates: [number, number];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  quickActions?: { label: string; actionTab: string }[];
  telemetryCard?: { title: string; value: string; detail: string };
}
