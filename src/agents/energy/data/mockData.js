// Enterprise Mock Data for Energy Monitoring Agent

export const INITIAL_TELEMETRY = {
  powerKw: 428.5,
  powerKwTrend: +3.2,
  energyKwhToday: 4820.4,
  energyKwhTrend: -1.8,
  peakDemandKw: 512.0,
  peakDemandTime: "14:15 PM",
  avgLoadPercent: 74.2,
  costTodayUsd: 674.85,
  efficiencyScore: 91,
  voltage: 401.2, // Volts 3-phase
  current: 618.4, // Amperes
  frequency: 50.02, // Hz
  powerFactor: 0.97, // lag/lead
  gridStatus: "STABLE", // STABLE, WARNING, DEGRADED
  gridFrequencyHz: 50.01,
  renewableContributionPercent: 38.5,
  batterySocPercent: 82.0,
  batteryPowerKw: -45.0, // negative = charging, positive = discharging
  solarPowerKw: 165.0,
  co2SavedKgToday: 1845.2,
  treesEquivalentToday: 88,
};

export const TELEMETRY_HISTORY = Array.from({ length: 24 }, (_, i) => {
  const hourStr = `${String(i).padStart(2, '0')}:00`;
  const solar = i >= 6 && i <= 18 ? Math.sin((i - 6) / 12 * Math.PI) * 190 + (Math.random() * 10) : 0;
  const baseLoad = 180 + Math.random() * 20;
  const industrialLoad = i >= 8 && i <= 17 ? 200 + Math.sin(i / 3) * 50 + (Math.random() * 30) : 40;
  const hvacLoad = i >= 7 && i <= 20 ? 80 + Math.sin((i - 7) / 13 * Math.PI) * 60 + (Math.random() * 15) : 30;
  const totalLoad = baseLoad + industrialLoad + hvacLoad;
  const gridPower = Math.max(0, totalLoad - solar);
  const batteryPower = solar > totalLoad ? -(solar - totalLoad) * 0.7 : Math.min(50, totalLoad * 0.15);

  return {
    time: hourStr,
    totalLoadKw: Math.round(totalLoad * 10) / 10,
    solarKw: Math.round(solar * 10) / 10,
    gridKw: Math.round(gridPower * 10) / 10,
    batteryKw: Math.round(batteryPower * 10) / 10,
    voltage: Math.round((400 + Math.sin(i) * 2 + (Math.random() - 0.5) * 1.5) * 10) / 10,
    frequency: Math.round((50 + (Math.random() - 0.5) * 0.08) * 100) / 100,
    powerFactor: Math.round((0.96 + Math.random() * 0.03) * 100) / 100,
  };
});

export const DEVICES_DATA = [
  {
    id: "DEV-HVAC-01",
    name: "Central HVAC Chiller Unit #1",
    category: "HVAC",
    building: "Building A - HQ",
    location: "Rooftop Mechanical Bay 1",
    powerKw: 112.4,
    dailyKwh: 1240.5,
    voltage: 402.1,
    current: 161.8,
    healthScore: 94,
    status: "ONLINE",
    temperatureC: 4.8,
    copRating: 4.2,
    lastMaintenance: "2026-06-15",
    nextMaintenance: "2026-09-15",
    faultHistory: [
      { id: "F-101", date: "2026-05-12", severity: "LOW", title: "Refrigerant pressure slight variance", resolved: true },
      { id: "F-102", date: "2026-03-04", severity: "MEDIUM", title: "Filter differential pressure warning", resolved: true }
    ],
    powerQuality: { thdVoltage: "1.4%", thdCurrent: "3.1%", pf: 0.98 }
  },
  {
    id: "DEV-HVAC-02",
    name: "Central HVAC Chiller Unit #2",
    category: "HVAC",
    building: "Building B - Manufacturing",
    location: "Basement HVAC Room",
    powerKw: 98.6,
    dailyKwh: 980.2,
    voltage: 399.8,
    current: 142.5,
    healthScore: 78,
    status: "WARNING",
    temperatureC: 6.2,
    copRating: 3.6,
    lastMaintenance: "2026-04-10",
    nextMaintenance: "2026-08-01",
    faultHistory: [
      { id: "F-201", date: "2026-07-20", severity: "MEDIUM", title: "Vibration threshold exceeded on Motor Bearing #2", resolved: false }
    ],
    powerQuality: { thdVoltage: "2.8%", thdCurrent: "5.4%", pf: 0.92 }
  },
  {
    id: "DEV-SOLAR-01",
    name: "Main Solar Rooftop Array (450kWp)",
    category: "Solar Inverter",
    building: "Campus Rooftop",
    location: "Rooftop South Facing",
    powerKw: 165.0,
    dailyKwh: 1420.0,
    voltage: 820.0, // DC String
    current: 201.2,
    healthScore: 98,
    status: "ONLINE",
    inverterEfficiency: 98.4,
    panelTempC: 38.5,
    lastMaintenance: "2026-05-20",
    nextMaintenance: "2026-11-20",
    faultHistory: [],
    powerQuality: { thdVoltage: "0.8%", thdCurrent: "1.2%", pf: 0.99 }
  },
  {
    id: "DEV-BATT-01",
    name: "BESS Container 1 (1MWh Tesla Megapack)",
    category: "Battery",
    building: "Substation Yard",
    location: "Outdoor Pad 4",
    powerKw: -45.0, // Charging
    dailyKwh: 850.0,
    voltage: 415.0,
    current: 62.6,
    healthScore: 96,
    status: "CHARGING",
    socPercent: 82.0,
    batteryTempC: 24.2,
    cyclesCompleted: 412,
    lastMaintenance: "2026-06-01",
    nextMaintenance: "2026-12-01",
    faultHistory: [],
    powerQuality: { thdVoltage: "0.9%", thdCurrent: "1.5%", pf: 1.00 }
  },
  {
    id: "DEV-IND-01",
    name: "Robotic Assembly Motor Drive Line #1",
    category: "Motors",
    building: "Building B - Manufacturing",
    location: "Floor 1 Assembly Line A",
    powerKw: 64.2,
    dailyKwh: 580.4,
    voltage: 400.5,
    current: 92.6,
    healthScore: 89,
    status: "ONLINE",
    rpm: 1780,
    torqueNm: 345,
    lastMaintenance: "2026-07-01",
    nextMaintenance: "2026-10-01",
    faultHistory: [
      { id: "F-301", date: "2026-06-18", severity: "LOW", title: "Thermal spike during heavy batch cycle", resolved: true }
    ],
    powerQuality: { thdVoltage: "1.9%", thdCurrent: "4.0%", pf: 0.95 }
  },
  {
    id: "DEV-EV-01",
    name: "Dual DC Fast EV Charging Station #1",
    category: "EV Chargers",
    building: "Visitor Parking Lot",
    location: "Bay E1-E2",
    powerKw: 48.0,
    dailyKwh: 310.6,
    voltage: 400.0,
    current: 69.2,
    healthScore: 99,
    status: "ONLINE",
    connectedVehicles: 2,
    chargingSpeedKw: 24.0,
    lastMaintenance: "2026-05-10",
    nextMaintenance: "2026-11-10",
    faultHistory: [],
    powerQuality: { thdVoltage: "1.1%", thdCurrent: "2.3%", pf: 0.99 }
  },
  {
    id: "DEV-PUMP-01",
    name: "Chilled Water Circulation Pump #3",
    category: "Water Pumps",
    building: "Building A - Basement",
    location: "Pump Room B2",
    powerKw: 22.8,
    dailyKwh: 260.1,
    voltage: 401.0,
    current: 32.8,
    healthScore: 92,
    status: "ONLINE",
    flowRateGpm: 450,
    pressurePsi: 65,
    lastMaintenance: "2026-06-10",
    nextMaintenance: "2026-09-10",
    faultHistory: [],
    powerQuality: { thdVoltage: "1.5%", thdCurrent: "3.2%", pf: 0.94 }
  },
  {
    id: "DEV-LIGHT-01",
    name: "Smart LED High-Bay Warehouse Grid",
    category: "Lighting",
    building: "Logistics Hub",
    location: "Warehouse Hall 1-4",
    powerKw: 14.5,
    dailyKwh: 165.2,
    voltage: 230.1,
    current: 63.0,
    healthScore: 100,
    status: "ONLINE",
    dimmingLevelPercent: 70,
    motionActive: true,
    lastMaintenance: "2026-01-15",
    nextMaintenance: "2027-01-15",
    faultHistory: [],
    powerQuality: { thdVoltage: "0.5%", thdCurrent: "1.0%", pf: 0.98 }
  },
  {
    id: "DEV-MACH-01",
    name: "CNC Precision Milling Machine Center #4",
    category: "Industrial Machines",
    building: "Building B - Manufacturing",
    location: "Tooling Bay 3",
    powerKw: 38.2,
    dailyKwh: 340.5,
    voltage: 400.8,
    current: 55.1,
    healthScore: 84,
    status: "ONLINE",
    spindleRpm: 12000,
    cycleState: "ACTIVE_CUT",
    lastMaintenance: "2026-06-25",
    nextMaintenance: "2026-08-25",
    faultHistory: [
      { id: "F-401", date: "2026-07-14", severity: "MEDIUM", title: "Harmonic feedback on Spindle Drive", resolved: true }
    ],
    powerQuality: { thdVoltage: "2.4%", thdCurrent: "6.2%", pf: 0.91 }
  }
];

export const DEPARTMENT_USAGE = [
  { name: "HVAC & Climate Control", usageKwh: 1850, percentage: 38.4, color: "#2563eb", change: "+4.2%" },
  { name: "Manufacturing Line B", usageKwh: 1420, percentage: 29.5, color: "#059669", change: "-2.1%" },
  { name: "Server Center & IT", usageKwh: 680, percentage: 14.1, color: "#d97706", change: "+0.5%" },
  { name: "Smart Lighting & Office", usageKwh: 490, percentage: 10.2, color: "#7c3aed", change: "-5.0%" },
  { name: "EV Charging Infrastructure", usageKwh: 380, percentage: 7.8, color: "#0891b2", change: "+12.4%" }
];

export const BUILDING_USAGE = [
  { name: "Building A (HQ & Tech)", usageKwh: 2150, peakKw: 220, efficiency: "94%", starRating: 4.8 },
  { name: "Building B (Manufacturing)", usageKwh: 1980, peakKw: 245, efficiency: "82%", starRating: 4.1 },
  { name: "Logistics Hub & Warehouse", usageKwh: 450, peakKw: 52, efficiency: "96%", starRating: 4.9 },
  { name: "Substation & Ancillary", usageKwh: 240, peakKw: 35, efficiency: "91%", starRating: 4.6 },
];

export const DEMAND_FORECAST_DATA = [
  { period: "15:00", actual: 428, forecast: 432, lowerBound: 415, upperBound: 445, confidence: 96 },
  { period: "16:00", actual: null, forecast: 468, lowerBound: 448, upperBound: 488, confidence: 95 },
  { period: "17:00", actual: null, forecast: 512, lowerBound: 490, upperBound: 535, confidence: 94 }, // PEAK
  { period: "18:00", actual: null, forecast: 440, lowerBound: 420, upperBound: 460, confidence: 95 },
  { period: "19:00", actual: null, forecast: 360, lowerBound: 340, upperBound: 380, confidence: 97 },
  { period: "20:00", actual: null, forecast: 290, lowerBound: 275, upperBound: 305, confidence: 98 },
  { period: "21:00", actual: null, forecast: 240, lowerBound: 230, upperBound: 250, confidence: 98 },
  { period: "22:00", actual: null, forecast: 210, lowerBound: 200, upperBound: 220, confidence: 99 },
];

export const ANOMALIES_LIST = [
  {
    id: "ANO-2026-881",
    timestamp: "14:12:45 today",
    severity: "CRITICAL",
    title: "Abnormal Energy Spike on Industrial Machine #4",
    affectedSystem: "Building B - CNC Precision Milling",
    rootCause: "Uncalibrated Spindle Motor pulling 42% excessive starting torque during heavy duty batching.",
    estimatedWasteUsd: 145.20,
    wasteKwh: 860,
    status: "ACTIVE",
    recommendation: "Inspect motor bearing and recalibrate variable frequency drive (VFD) parameters.",
  },
  {
    id: "ANO-2026-879",
    timestamp: "12:30:10 today",
    severity: "WARNING",
    title: "Equipment Left ON During Non-Operational Window",
    affectedSystem: "Building A - Floor 3 Auxiliary HVAC Dampers",
    rootCause: "Manual override switch engaged by facility crew overnight, preventing setback schedule.",
    estimatedWasteUsd: 68.50,
    wasteKwh: 410,
    status: "ACTIVE",
    recommendation: "Trigger remote BACnet reset command to re-enable automated setback program.",
  },
  {
    id: "ANO-2026-875",
    timestamp: "09:45:00 today",
    severity: "WARNING",
    title: "Power Factor Dip below 0.92 threshold",
    affectedSystem: "Substation Busbar 2",
    rootCause: "Inductive motor bank running without automated capacitor bank compensation step 3.",
    estimatedWasteUsd: 92.00,
    wasteKwh: 0, // penalty charge
    status: "RESOLVED",
    recommendation: "Capacitor bank step 3 switched automatically at 10:05 AM. Power factor restored to 0.97.",
  },
  {
    id: "ANO-2026-870",
    timestamp: "06:15:30 today",
    severity: "INFO",
    title: "Voltage Phase Imbalance (2.4% Variance)",
    affectedSystem: "Building B Main Switchgear",
    rootCause: "Single-phase EV charger cluster drawing un-balanced load across Phase L2.",
    estimatedWasteUsd: 22.10,
    wasteKwh: 120,
    status: "RESOLVED",
    recommendation: "Load balancing switch matrix re-routed EV charger feeder L2 to L3.",
  }
];

export const COST_ANALYTICS = {
  todayUsd: 674.85,
  weeklyUsd: 4620.50,
  monthlyUsd: 18450.00,
  projectedMonthlyUsd: 20210.00,
  annualUsd: 224500.00,
  peakDemandChargesUsd: 3420.00,
  savingsOpportunityUsd: 2850.00,
  tariffRates: {
    peakRate: "$0.24 / kWh (14:00 - 19:00)",
    offPeakRate: "$0.09 / kWh (22:00 - 06:00)",
    midPeakRate: "$0.14 / kWh (06:00 - 14:00)",
    demandChargeRate: "$15.50 / kW Peak"
  },
  departmentCost: [
    { department: "HVAC & Climate Control", cost: 258.50, percent: 38.3 },
    { department: "Manufacturing Line B", cost: 198.80, percent: 29.5 },
    { department: "Server Center & IT", cost: 95.20, percent: 14.1 },
    { department: "Lighting & Office", cost: 68.60, percent: 10.2 },
    { department: "EV Chargers", cost: 53.75, percent: 7.9 }
  ]
};

export const AI_SUGGESTIONS = [
  {
    id: "SUG-01",
    title: "Pre-Cool Building A prior to Peak Rate Window (14:00 PM)",
    category: "Peak Shaving",
    savingsUsdMonth: 420.00,
    co2ReductionKgMonth: 1800,
    paybackMonths: 0,
    effort: "Automated Rule",
    description: "Lower HVAC setpoint by 1.5°C between 11:00 AM and 13:30 PM using solar over-generation, then coast through peak demand hours.",
    applied: false
  },
  {
    id: "SUG-02",
    title: "Optimize Battery Discharge Schedule during 17:00 PM Peak",
    category: "Storage Optimization",
    savingsUsdMonth: 680.00,
    co2ReductionKgMonth: 2400,
    paybackMonths: 0,
    effort: "Automated Rule",
    description: "Discharge 120 kW from BESS Megapack during peak tariff hours (16:30 - 18:30) to cap peak grid demand at 450 kW.",
    applied: true
  },
  {
    id: "SUG-03",
    title: "Variable Speed Drive (VFD) Retrofit on Pump #3",
    category: "Equipment Upgrade",
    savingsUsdMonth: 310.00,
    co2ReductionKgMonth: 1200,
    paybackMonths: 14,
    effort: "Hardware Upgrade",
    description: "Retrofit throttling valve control on Circulation Pump #3 with a smart VFD to reduce throttled friction losses by 28%.",
    applied: false
  },
  {
    id: "SUG-04",
    title: "Automate Server Rack Dynamic Power C-States during Night",
    category: "IT Optimization",
    savingsUsdMonth: 210.00,
    co2ReductionKgMonth: 850,
    paybackMonths: 0,
    effort: "Software Rule",
    description: "Enable deep sleep states on redundant batch server nodes from 22:00 to 06:00 when compute demand drops below 15%.",
    applied: false
  }
];

export const SUSTAINABILITY_METRICS = {
  renewablePercent: 38.5,
  co2EmissionsTonMonth: 42.8,
  co2ReductionPercent: 24.6,
  greenEnergyKwhMonth: 48200,
  energySavedMwhYear: 185.4,
  treesPlantedEquivalent: 2840,
  cleanEnergyCertificates: 480,
  carbonTargetPercent: 50.0 // target 50% green energy by Q4 2026
};

export const AI_INSIGHTS_FEED = [
  {
    id: "INS-1",
    timestamp: "10 mins ago",
    type: "TREND",
    headline: "Energy usage increased 12% after 2:00 PM",
    details: "Solar generation reduced due to intermittent cloud cover while HVAC chillers ramped up to meet ambient thermal load.",
    impact: "Moderate"
  },
  {
    id: "INS-2",
    timestamp: "25 mins ago",
    type: "BREAKDOWN",
    headline: "HVAC consumes 38.4% of total facility energy today",
    details: "Chiller #2 is operating at 3.6 COP rating (vs. benchmark 4.2 COP). Servicing heat exchanger will recover 8.2% efficiency.",
    impact: "High"
  },
  {
    id: "INS-3",
    timestamp: "1 hour ago",
    type: "PREDICTION",
    headline: "Peak demand of 512 kW expected at 5:00 PM",
    details: "Recommended action: Dispatch 120 kW from BESS Battery Storage to cap grid draw below 400 kW and save $140 in peak charges.",
    impact: "Critical"
  },
  {
    id: "INS-4",
    timestamp: "3 hours ago",
    type: "EFFICIENCY",
    headline: "Building B is operating at 82% efficiency rating",
    details: "Sub-optimal air damper balance detected on Floor 2. Automated damper balancing will improve building score to 91%.",
    impact: "High"
  }
];

export const PROTOCOL_REGISTERS = {
  modbus: [
    { register: 40001, name: "Active_Power_Total_kW", value: "428.5 kW", type: "Float32", status: "OK" },
    { register: 40003, name: "Reactive_Power_Total_kVAR", value: "85.2 kVAR", type: "Float32", status: "OK" },
    { register: 40005, name: "Voltage_L1_L2_V", value: "401.2 V", type: "Float32", status: "OK" },
    { register: 40007, name: "Current_L1_A", value: "205.4 A", type: "Float32", status: "OK" },
    { register: 40009, name: "Grid_Frequency_Hz", value: "50.02 Hz", type: "Float32", status: "OK" },
    { register: 40011, name: "Power_Factor_Total", value: "0.97", type: "Float32", status: "OK" }
  ],
  mqtt: [
    { topic: "telemetry/v1/grid/meters/main/power", payload: '{"kw": 428.5, "ts": 1785241200}', rate: "1000ms" },
    { topic: "telemetry/v1/solar/inverter/01/generation", payload: '{"kw": 165.0, "status": "ONLINE"}', rate: "2000ms" },
    { topic: "telemetry/v1/bess/pack01/soc", payload: '{"soc": 82.0, "temp_c": 24.2}', rate: "5000ms" },
    { topic: "telemetry/v1/hvac/chiller01/status", payload: '{"power_kw": 112.4, "cop": 4.2}', rate: "5000ms" }
  ],
  opcua: [
    { node: "ns=2;s=DeviceSet.HVAC_Chiller_1.Power_KW", value: "112.4", quality: "Good (0x00)", timestamp: "Live" },
    { node: "ns=2;s=DeviceSet.BESS_Megapack.StateOfCharge", value: "82.0 %", quality: "Good (0x00)", timestamp: "Live" },
    { node: "ns=2;s=DeviceSet.Substation.Phase_Imbalance", value: "1.1 %", quality: "Good (0x00)", timestamp: "Live" }
  ]
};
