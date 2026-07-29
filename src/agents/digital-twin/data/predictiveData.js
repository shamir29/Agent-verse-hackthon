export const FORECAST_SERIES_24H = [
  { hour: '00:00', demandMW: 320, forecastMW: 318, lowerMW: 305, upperMW: 330, solarMW: 0, waterKgal: 120, aqi: 34 },
  { hour: '02:00', demandMW: 290, forecastMW: 288, lowerMW: 275, upperMW: 300, solarMW: 0, waterKgal: 95, aqi: 32 },
  { hour: '04:00', demandMW: 280, forecastMW: 282, lowerMW: 270, upperMW: 295, solarMW: 0, waterKgal: 90, aqi: 30 },
  { hour: '06:00', demandMW: 340, forecastMW: 345, lowerMW: 330, upperMW: 360, solarMW: 8, waterKgal: 180, aqi: 45 },
  { hour: '08:00', demandMW: 430, forecastMW: 428, lowerMW: 410, upperMW: 445, solarMW: 24, waterKgal: 260, aqi: 58 },
  { hour: '10:00', demandMW: 470, forecastMW: 475, lowerMW: 455, upperMW: 490, solarMW: 42, waterKgal: 290, aqi: 62 },
  { hour: '12:00', demandMW: 495, forecastMW: 490, lowerMW: 470, upperMW: 510, solarMW: 50, waterKgal: 310, aqi: 65 },
  { hour: '14:00', demandMW: 510, forecastMW: 512, lowerMW: 490, upperMW: 530, solarMW: 46, waterKgal: 320, aqi: 68 },
  { hour: '16:00', demandMW: 530, forecastMW: 528, lowerMW: 505, upperMW: 545, solarMW: 32, waterKgal: 340, aqi: 72 },
  { hour: '18:00', demandMW: 520, forecastMW: 522, lowerMW: 500, upperMW: 540, solarMW: 12, waterKgal: 330, aqi: 66 },
  { hour: '20:00', demandMW: 460, forecastMW: 462, lowerMW: 440, upperMW: 480, solarMW: 0, waterKgal: 280, aqi: 52 },
  { hour: '22:00', demandMW: 390, forecastMW: 388, lowerMW: 370, upperMW: 405, solarMW: 0, waterKgal: 190, aqi: 40 }
];

export const PREDICTIVE_MODELS = [
  {
    id: 'pred-demand',
    title: 'City Energy Demand Forecast (24h)',
    metric: '485.2 MW → Peak 530 MW at 16:00',
    confidence: 99.1,
    status: 'OPTIMAL',
    recommendation: 'Pre-charge BESS-01 between 10:00 AM - 01:00 PM during maximum solar availability.'
  },
  {
    id: 'pred-water',
    title: 'Water Consumption Trend',
    metric: '320 kGal Peak Expected',
    confidence: 97.4,
    status: 'STABLE',
    recommendation: 'Maintain primary pump pressure at 68 PSI until 18:00 PM.'
  },
  {
    id: 'pred-solar',
    title: 'Solar Production Forecast',
    metric: '340 MWh Total Daily Output',
    confidence: 98.6,
    status: 'OPTIMAL',
    recommendation: 'Expect surplus energy window 11:00 AM - 02:00 PM. Shift EV charging load.'
  },
  {
    id: 'pred-t08',
    title: 'Transformer T-08 Failure Risk (7 days)',
    metric: '74.2% Probability of Fault in 48h',
    confidence: 94.8,
    status: 'HIGH_RISK',
    recommendation: 'Schedule proactive maintenance shutdown during low-demand 02:00 AM window.'
  },
  {
    id: 'pred-bess',
    title: 'Battery Capacity Degradation',
    metric: '97.2% Health (0.02% / month decay)',
    confidence: 98.9,
    status: 'HEALTHY',
    recommendation: 'Maintain C-rate below 0.8C during peak discharge to extend life.'
  },
  {
    id: 'pred-ev-traffic',
    title: 'EV Charging Surge Prediction',
    metric: '+45% Demand Surge at 17:30 PM',
    confidence: 96.2,
    status: 'MODERATE_RISK',
    recommendation: 'Activate smart queueing protocol at Downtown Supercharger Hub.'
  }
];

export const AI_INSIGHTS = [
  {
    id: 'ins-1',
    priority: 'HIGH',
    confidence: 98.4,
    title: 'Downtown energy demand will increase by 18% in 2 hours',
    affectedSystems: ['Downtown Power Grid', 'Substation Sub-B', 'Apex Financial Tower'],
    recommendedAction: 'Pre-cool commercial office towers by 1.5°C before peak electricity rate window.',
    expectedBenefit: 'Reduces peak demand load by 6.4 MW, saving ~$4,200/hr.'
  },
  {
    id: 'ins-2',
    priority: 'CRITICAL',
    confidence: 94.2,
    title: 'Transformer T-08 has a high probability of failure (74.2%)',
    affectedSystems: ['North Industrial Zone', 'Substation Sub-A'],
    recommendedAction: 'Transfer 40% load to Transformer T-09 and dispatch maintenance team.',
    expectedBenefit: 'Prevents estimated $240,000 catastrophic outage downtime.'
  },
  {
    id: 'ins-3',
    priority: 'MEDIUM',
    confidence: 99.1,
    title: 'Solar Farm A will generate surplus energy from 11:00 AM to 2:00 PM',
    affectedSystems: ['Bay Solar Farm Alpha', 'BESS Storage Facility 1'],
    recommendedAction: 'Route 15 MW surplus power directly to charge BESS storage battery.',
    expectedBenefit: 'Maximizes clean energy utilization to 72% daily average.'
  },
  {
    id: 'ins-4',
    priority: 'MEDIUM',
    confidence: 97.8,
    title: 'Shift EV charging to renewable energy window',
    affectedSystems: ['Downtown Supercharger Plaza', 'Westside Transit EV Hub'],
    recommendedAction: 'Broadcast $0.08/kWh discount rate for EV charging between 11:00 AM - 02:00 PM.',
    expectedBenefit: 'Shifts 4.2 MWh demand away from fossil fuel evening peak.'
  },
  {
    id: 'ins-5',
    priority: 'HIGH',
    confidence: 96.5,
    title: 'District 5 water consumption is above normal (+34%)',
    affectedSystems: ['District 5 Water Trunk Main', 'Grand Summit Reservoir'],
    recommendedAction: 'Isolate section V-401 to verify sub-surface main leakage anomaly.',
    expectedBenefit: 'Saves estimated 280 GPM freshwater loss.'
  }
];

export const SUSTAINABILITY_METRICS = {
  renewableEnergyPercent: 68.4,
  carbonEmissionsHourly: 12.4, // tCO2e/h
  carbonEmissionsReductionPct: 14.2,
  energySavedMWh: 1420,
  waterSavedGallons: 850000,
  wasteRecycledPct: 64.8,
  aqiScore: 38, // Good
  gridEfficiencyPct: 98.2,
  greenUtilizationPct: 89.4,
  carbonTrend30Days: [
    { day: 'Day 1', emissions: 18.2, renewablePct: 52 },
    { day: 'Day 5', emissions: 17.5, renewablePct: 55 },
    { day: 'Day 10', emissions: 16.1, renewablePct: 60 },
    { day: 'Day 15', emissions: 15.0, renewablePct: 63 },
    { day: 'Day 20', emissions: 14.2, renewablePct: 65 },
    { day: 'Day 25', emissions: 13.1, renewablePct: 67 },
    { day: 'Day 30', emissions: 12.4, renewablePct: 68.4 }
  ]
};
