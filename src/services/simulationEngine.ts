import {
  MainTelemetry,
  PipelineRoute,
  LeakAlert,
  FloodPredictionData,
  ReservoirData,
  WaterQualitySector,
  SmartFarmField,
  RainwaterAnalyticsData,
  AIInsight,
  IoTSensor,
} from '../types/waterSystem';

export class WaterSystemSimulation {
  public telemetry: MainTelemetry;
  public pipelines: PipelineRoute[];
  public leaks: LeakAlert[];
  public floods: FloodPredictionData[];
  public reservoirs: ReservoirData[];
  public qualitySectors: WaterQualitySector[];
  public farms: SmartFarmField[];
  public rainwater: RainwaterAnalyticsData[];
  public insights: AIInsight[];
  public sensors: IoTSensor[];

  constructor() {
    this.telemetry = {
      totalWaterAvailableMGL: 1450.8,
      dailyConsumptionMGL: 184.2,
      reservoirCapacityPct: 82.4,
      activeLeaksCount: 3,
      floodRiskPct: 38.5,
      floodRiskLevel: 'Warning',
      waterQualityIndex: 91.2,
      smartIrrigationSavedLiters: 425000,
      rainwaterHarvestedLiters: 1280000,
      activeSensorsCount: 488,
      totalSensorsCount: 500,
      aiPredictionSummary: 'High flood probability in Zone C due to upstream dam release. Leak detected in Sector 4.',
    };

    this.pipelines = [
      {
        id: 'PIPE-101',
        name: 'Trunk Line Alpha (Main City)',
        sector: 'Sector 1 - Central Metro',
        lengthKm: 14.2,
        pressurePsi: 68.4,
        targetPressurePsi: 70.0,
        flowSpeedMs: 3.4,
        distributionEfficiencyPct: 96.8,
        status: 'Operational',
        startCoord: [37.7749, -122.4194],
        endCoord: [37.7850, -122.4080],
        isUnderground: true,
      },
      {
        id: 'PIPE-102',
        name: 'Aqueduct Feeder Beta',
        sector: 'Sector 2 - East Industrial',
        lengthKm: 22.8,
        pressurePsi: 74.1,
        targetPressurePsi: 75.0,
        flowSpeedMs: 4.1,
        distributionEfficiencyPct: 98.2,
        status: 'Operational',
        startCoord: [37.7850, -122.4080],
        endCoord: [37.7950, -122.3950],
        isUnderground: true,
      },
      {
        id: 'PIPE-103',
        name: 'Sector 4 Sub-Main (Leak Detected)',
        sector: 'Sector 4 - South Valley',
        lengthKm: 8.6,
        pressurePsi: 41.2, // Pressure drop!
        targetPressurePsi: 65.0,
        flowSpeedMs: 1.8,
        distributionEfficiencyPct: 71.4,
        status: 'Leaking',
        startCoord: [37.7600, -122.4300],
        endCoord: [37.7500, -122.4400],
        isUnderground: true,
        leakSeverity: 'High',
        estimatedLossLh: 14200,
      },
      {
        id: 'PIPE-104',
        name: 'Agri-Feed Pipe Delta',
        sector: 'Sector 5 - Agro Zone',
        lengthKm: 18.5,
        pressurePsi: 58.9,
        targetPressurePsi: 60.0,
        flowSpeedMs: 2.9,
        distributionEfficiencyPct: 94.1,
        status: 'Operational',
        startCoord: [37.7400, -122.4500],
        endCoord: [37.7300, -122.4700],
        isUnderground: true,
      },
      {
        id: 'PIPE-105',
        name: 'Reservoir Link Gamma',
        sector: 'Sector 3 - North Heights',
        lengthKm: 11.4,
        pressurePsi: 62.0,
        targetPressurePsi: 65.0,
        flowSpeedMs: 3.1,
        distributionEfficiencyPct: 93.5,
        status: 'Warning',
        startCoord: [37.7950, -122.3950],
        endCoord: [37.8100, -122.4100],
        isUnderground: true,
        leakSeverity: 'Medium',
        estimatedLossLh: 3800,
      },
    ];

    this.leaks = [
      {
        id: 'LK-8091',
        pipeId: 'PIPE-103',
        pipeName: 'Sector 4 Sub-Main',
        sector: 'Sector 4 - South Valley',
        locationName: 'Junction B-42, South Avenue',
        latitude: 37.7550,
        longitude: -122.4350,
        severity: 'High',
        pressureDropPsi: 23.8,
        estimatedLossLh: 14200,
        repairPriority: 'P1 - Immediate',
        detectedAt: '12 mins ago',
        leakProbabilityPct: 94.2,
        status: 'Detected',
      },
      {
        id: 'LK-8092',
        pipeId: 'PIPE-105',
        pipeName: 'Reservoir Link Gamma',
        sector: 'Sector 3 - North Heights',
        locationName: 'Highland Bypass Valve #9',
        latitude: 37.8020,
        longitude: -122.4050,
        severity: 'Medium',
        pressureDropPsi: 3.0,
        estimatedLossLh: 3800,
        repairPriority: 'P2 - High',
        detectedAt: '45 mins ago',
        leakProbabilityPct: 82.0,
        status: 'Dispatched',
      },
      {
        id: 'LK-8088',
        pipeId: 'PIPE-104',
        pipeName: 'Agri-Feed Pipe Delta',
        sector: 'Sector 5 - Agro Zone',
        locationName: 'Farm Station Gate 3',
        latitude: 37.7350,
        longitude: -122.4600,
        severity: 'Low',
        pressureDropPsi: 1.1,
        estimatedLossLh: 950,
        repairPriority: 'P3 - Moderate',
        detectedAt: '2 hours ago',
        leakProbabilityPct: 68.5,
        status: 'Detected',
      },
    ];

    this.floods = [
      {
        id: 'FLD-ZONE-C',
        zoneName: 'Zone C - Riverside Basin',
        sector: 'Sector 4 South Basin',
        overallRiskPct: 78.4,
        riskLevel: 'Critical',
        flashFloodRiskPct: 85.0,
        riverOverflowRiskPct: 72.0,
        damOverflowRiskPct: 68.0,
        urbanFloodRiskPct: 88.0,
        predictedPeakTime: 'Today at 18:30',
        forecastTimeline: [
          { hour: '12:00', riskPct: 35, rainfallMm: 12 },
          { hour: '14:00', riskPct: 52, rainfallMm: 28 },
          { hour: '16:00', riskPct: 68, rainfallMm: 45 },
          { hour: '18:00', riskPct: 85, rainfallMm: 62 },
          { hour: '20:00', riskPct: 74, rainfallMm: 38 },
          { hour: '22:00', riskPct: 58, rainfallMm: 15 },
        ],
        evacuationRecommended: true,
      },
      {
        id: 'FLD-ZONE-A',
        zoneName: 'Zone A - Metro Downtown',
        sector: 'Sector 1 Central',
        overallRiskPct: 24.1,
        riskLevel: 'Safe',
        flashFloodRiskPct: 15.0,
        riverOverflowRiskPct: 20.0,
        damOverflowRiskPct: 10.0,
        urbanFloodRiskPct: 30.0,
        predictedPeakTime: 'Tomorrow at 04:00',
        forecastTimeline: [
          { hour: '12:00', riskPct: 10, rainfallMm: 2 },
          { hour: '14:00', riskPct: 15, rainfallMm: 5 },
          { hour: '16:00', riskPct: 20, rainfallMm: 8 },
          { hour: '18:00', riskPct: 28, rainfallMm: 14 },
          { hour: '20:00', riskPct: 24, rainfallMm: 9 },
          { hour: '22:00', riskPct: 18, rainfallMm: 4 },
        ],
        evacuationRecommended: false,
      },
    ];

    this.reservoirs = [
      {
        id: 'RES-01',
        name: 'Grand Canyon Dam & Reservoir',
        location: 'North Highland Range',
        currentLevelM: 42.8,
        maxLevelM: 45.0,
        currentCapacityMGL: 856.0,
        maxCapacityMGL: 900.0,
        fillPercentage: 95.1,
        dailyInflowMGL: 45.2,
        dailyOutflowMGL: 32.8,
        expectedDaysToFull: 4,
        healthScore: 98,
        damGateOpenPct: 35,
        status: 'High Level',
        coordinates: [37.8100, -122.4100],
      },
      {
        id: 'RES-02',
        name: 'Blue Basin Storage Hub',
        location: 'East Industrial Valley',
        currentLevelM: 28.4,
        maxLevelM: 35.0,
        currentCapacityMGL: 426.0,
        maxCapacityMGL: 525.0,
        fillPercentage: 81.1,
        dailyInflowMGL: 22.4,
        dailyOutflowMGL: 24.1,
        expectedDaysToFull: 18,
        healthScore: 92,
        damGateOpenPct: 15,
        status: 'Normal',
        coordinates: [37.7850, -122.3950],
      },
      {
        id: 'RES-03',
        name: 'Agri-Reserve Tank Delta',
        location: 'South Farming Complex',
        currentLevelM: 14.2,
        maxLevelM: 22.0,
        currentCapacityMGL: 168.8,
        maxCapacityMGL: 264.0,
        fillPercentage: 63.9,
        dailyInflowMGL: 12.0,
        dailyOutflowMGL: 15.6,
        expectedDaysToFull: 45,
        healthScore: 86,
        damGateOpenPct: 0,
        status: 'Normal',
        coordinates: [37.7300, -122.4700],
      },
    ];

    this.qualitySectors = [
      {
        id: 'QUAL-SEC-1',
        sectorName: 'Sector 1 - Central Metro',
        location: 'Downtown Potable Supply',
        pH: 7.4,
        tdsPpm: 142,
        turbidityNtu: 0.28,
        temperatureC: 18.5,
        dissolvedOxygenMgL: 7.8,
        contaminationPct: 0.8,
        qualityScore: 96,
        statusColor: 'Green',
        alerts: [],
      },
      {
        id: 'QUAL-SEC-4',
        sectorName: 'Sector 4 - South Valley',
        location: 'Residential Sub-grid 4B',
        pH: 6.2, // slightly acidic drop
        tdsPpm: 385, // elevated TDS
        turbidityNtu: 1.84, // high turbidity
        temperatureC: 22.1,
        dissolvedOxygenMgL: 5.4,
        contaminationPct: 14.5,
        qualityScore: 68,
        statusColor: 'Yellow',
        alerts: ['Turbidity spike detected', 'High Total Dissolved Solids'],
      },
      {
        id: 'QUAL-SEC-2',
        sectorName: 'Sector 2 - East Industrial',
        location: 'Industrial Effluent Buffer Zone',
        pH: 7.9,
        tdsPpm: 210,
        turbidityNtu: 0.65,
        temperatureC: 20.4,
        dissolvedOxygenMgL: 7.1,
        contaminationPct: 3.2,
        qualityScore: 89,
        statusColor: 'Green',
        alerts: [],
      },
    ];

    this.farms = [
      {
        id: 'FARM-01',
        fieldName: 'Green Valley Wheat Field',
        cropType: 'Wheat',
        areaHectares: 120,
        soilMoisturePct: 32, // Low
        targetMoisturePct: 65,
        recommendedTime: '19:00 (Sunset - Low Evaporation)',
        recommendedVolumeLiters: 185000,
        savedWaterTodayLiters: 42000,
        weatherCondition: 'Sunny, 28°C',
        irrigationStatus: 'Needs Watering',
        coordinates: [37.7350, -122.4650],
      },
      {
        id: 'FARM-02',
        fieldName: 'Sunrise Citrus Orchard',
        cropType: 'Citrus',
        areaHectares: 85,
        soilMoisturePct: 70,
        targetMoisturePct: 68,
        recommendedTime: 'None (Moisture Optimal)',
        recommendedVolumeLiters: 0,
        savedWaterTodayLiters: 65000,
        weatherCondition: 'Partly Cloudy, 24°C',
        irrigationStatus: 'Optimal',
        coordinates: [37.7280, -122.4800],
      },
    ];

    this.rainwater = [
      {
        id: 'RAIN-01',
        zoneName: 'North Catchment Basin',
        currentRainfallMm: 38.5,
        harvestedLitersToday: 840000,
        collectionEfficiencyPct: 92.4,
        storageCapacityLiters: 2000000,
        storageFilledPct: 74.0,
        predictedRainfall24hMm: 55.0,
        hourlyRainfall: [
          { time: '06:00', actualMm: 2.0, predictedMm: 2.5 },
          { time: '09:00', actualMm: 8.5, predictedMm: 9.0 },
          { time: '12:00', actualMm: 16.0, predictedMm: 15.0 },
          { time: '15:00', actualMm: 12.0, predictedMm: 18.0 },
          { time: '18:00', actualMm: 0, predictedMm: 8.0 },
          { time: '21:00', actualMm: 0, predictedMm: 2.5 },
        ],
      },
    ];

    this.insights = [
      {
        id: 'INS-101',
        timestamp: 'Just now',
        title: 'Leak Probability Increased by 82%',
        description: 'Pressure drop of 23.8 PSI detected at Sector 4 Sub-Main pipe. Automated isolation valve recommended.',
        category: 'Leak',
        severity: 'Critical',
        confidencePct: 94.2,
        suggestedAction: 'Isolate Valve #14 and dispatch repair crew',
      },
      {
        id: 'INS-102',
        timestamp: '5 mins ago',
        title: 'Reservoir Reaching High Capacity',
        description: 'Grand Canyon Dam expected to reach 95% capacity within 4 days due to heavy rainfall upstream.',
        category: 'Reservoir',
        severity: 'Warning',
        confidencePct: 91.0,
        suggestedAction: 'Increase spillway discharge by 12%',
      },
      {
        id: 'INS-103',
        timestamp: '15 mins ago',
        title: 'Flash Flood Warning for Zone C',
        description: 'Combined rainfall and river rise creates 78.4% flood risk for Sector 4 South Basin.',
        category: 'Flood',
        severity: 'Critical',
        confidencePct: 88.5,
        suggestedAction: 'Trigger public early warning siren in Zone C',
      },
      {
        id: 'INS-104',
        timestamp: '1 hour ago',
        title: 'Water Quality Dropping in Sector 4',
        description: 'Turbidity spiked to 1.84 NTU following pipe pressure fluctuation.',
        category: 'Quality',
        severity: 'Warning',
        confidencePct: 95.0,
        suggestedAction: 'Activate auxiliary filtration unit in Sub-grid 4B',
      },
    ];

    this.sensors = Array.from({ length: 12 }).map((_, i) => ({
      id: `SENS-${100 + i}`,
      name: `Telemetry Node #${100 + i}`,
      type: (['Pressure', 'Flow', 'Quality', 'Moisture', 'Level'] as const)[i % 5],
      location: `Sector ${(i % 5) + 1}`,
      batteryPct: Math.floor(75 + Math.random() * 25),
      signalStrengthPct: Math.floor(80 + Math.random() * 20),
      status: i === 3 ? 'Degraded' : 'Optimal',
      lastReading: 'Live streaming',
      coordinates: [37.75 + (i * 0.005), -122.43 + (i * 0.004)],
    }));
  }

  // Live simulation tick step
  public tick() {
    // Slight random drift for live metrics
    this.telemetry.dailyConsumptionMGL = +(
      this.telemetry.dailyConsumptionMGL + (Math.random() - 0.5) * 0.4
    ).toFixed(1);

    // Fluctuate pipeline pressures
    this.pipelines.forEach((p) => {
      if (p.status === 'Leaking') {
        p.pressurePsi = +(p.pressurePsi + (Math.random() - 0.5) * 0.8).toFixed(1);
      } else {
        p.pressurePsi = +(p.targetPressurePsi + (Math.random() - 0.5) * 0.3).toFixed(1);
      }
    });

    // Micro adjust reservoir inflow
    this.reservoirs[0].dailyInflowMGL = +(
      this.reservoirs[0].dailyInflowMGL + (Math.random() - 0.5) * 0.2
    ).toFixed(1);

    return {
      telemetry: { ...this.telemetry },
      pipelines: [...this.pipelines],
      reservoirs: [...this.reservoirs],
      leaks: [...this.leaks],
      floods: [...this.floods],
      insights: [...this.insights],
    };
  }

  // Isolate a leaking pipe
  public isolatePipe(pipeId: string) {
    const pipe = this.pipelines.find((p) => p.id === pipeId);
    if (pipe) {
      pipe.status = 'Isolated';
      pipe.pressurePsi = 0;
    }
    const leak = this.leaks.find((l) => l.pipeId === pipeId);
    if (leak) {
      leak.status = 'Isolated';
    }
    this.telemetry.activeLeaksCount = Math.max(0, this.telemetry.activeLeaksCount - 1);
  }
}
