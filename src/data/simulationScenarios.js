export const SIMULATION_SCENARIOS = [
  {
    id: 'sim_power_outage',
    title: 'Major Power Grid Outage (Zone 3)',
    category: 'Grid Failure',
    icon: 'ZapOff',
    description: 'Simulates a primary transmission line trip causing widespread blackout across Downtown and West Residential districts.',
    defaultSeverity: 7,
    affectedAreas: ['Downtown Core', 'West Residential Grid', 'Metro Civic Center'],
    affectedAssetIds: ['SUB-B', 'T-04', 'BLD-101', 'EV-HUB-1'],
    metrics: {
      downtime: '2h 30m',
      powerLoss: '185 MWh',
      waterLoss: '0 Gallons',
      carbonImpact: '+12.4 tCO2e (Diesel Gensets)',
      economicImpact: '$186,000',
      recoveryTime: '3.5 Hours'
    },
    aiRecommendedResponse: [
      'Isolate trip at Breaker B-14 and reroute power via Bay Solar BESS 100 MWh battery array.',
      'Dispatch Autonomous Grid Repair Crew to Transformer T-04.',
      'Throttle non-essential HVAC loads in Metro Tower to conserve emergency feeder capacity.',
      'Notify EV Charging Stations to defer high-draw fast charging sessions.'
    ],
    timelineData: [
      { time: 'T-0m', normalLoad: 100, simulatedLoad: 100, healthScore: 98 },
      { time: 'T+15m', normalLoad: 102, simulatedLoad: 24, healthScore: 45 },
      { time: 'T+30m', normalLoad: 105, simulatedLoad: 48, healthScore: 62 },
      { time: 'T+1h', normalLoad: 108, simulatedLoad: 72, healthScore: 78 },
      { time: 'T+2h', normalLoad: 110, simulatedLoad: 95, healthScore: 92 },
      { time: 'T+3h', normalLoad: 112, simulatedLoad: 100, healthScore: 98 }
    ]
  },
  {
    id: 'sim_transformer_failure',
    title: 'Transformer T-08 Winding Overheat & Fault',
    category: 'Equipment Failure',
    icon: 'Cpu',
    description: 'Simulates catastrophic thermal degradation and insulation breakdown on Industrial Transformer T-08.',
    defaultSeverity: 8,
    affectedAreas: ['North Industrial Zone', 'Innovation Tech Park'],
    affectedAssetIds: ['T-08', 'SUB-A', 'BLD-204'],
    metrics: {
      downtime: '4h 15m',
      powerLoss: '140 MWh',
      waterLoss: '0 Gallons',
      carbonImpact: '+8.2 tCO2e',
      economicImpact: '$240,000',
      recoveryTime: '5.0 Hours'
    },
    aiRecommendedResponse: [
      'Immediately trigger automated load shed of 6.2 MW on non-critical industrial circuits.',
      'Activate redundant Step-Down Transformer T-09 to pickup load.',
      'Engage forced-oil cooling pumps on adjacent substations.',
      'Deploy Predictive Maintenance Team with thermal imaging drone.'
    ],
    timelineData: [
      { time: 'T-0m', normalLoad: 100, simulatedLoad: 100, healthScore: 74 },
      { time: 'T+15m', normalLoad: 100, simulatedLoad: 12, healthScore: 28 },
      { time: 'T+30m', normalLoad: 102, simulatedLoad: 55, healthScore: 50 },
      { time: 'T+1h', normalLoad: 104, simulatedLoad: 80, healthScore: 75 },
      { time: 'T+2h', normalLoad: 105, simulatedLoad: 98, healthScore: 90 }
    ]
  },
  {
    id: 'sim_solar_drop',
    title: 'Sudden Cloud Cover Solar Generation Drop',
    category: 'Renewables',
    icon: 'SunDim',
    description: 'Simulates a 75% rapid reduction in solar irradiance at Bay Renewable Hub due to storm front arrival.',
    defaultSeverity: 5,
    affectedAreas: ['Bay Renewable Hub', 'City-wide Renewable %'],
    affectedAssetIds: ['SOL-01', 'SOL-02', 'BESS-01'],
    metrics: {
      downtime: '1h 15m',
      powerLoss: '48 MWh',
      waterLoss: '0 Gallons',
      carbonImpact: '+24.6 tCO2e (Peaker Plant Ramp)',
      economicImpact: '$42,000',
      recoveryTime: '1.5 Hours'
    },
    aiRecommendedResponse: [
      'Instantly discharge Grid BESS Storage Facility 1 at 25 MW rate.',
      'Ramp up rapid-response Hydro Turbine Generators to bridge the 35 MW deficit.',
      'Signal EV Charging Hubs to switch to Eco-Charge mode (reduced draw).',
      'Optimize HVAC setpoints in municipal buildings by +1.5°C.'
    ],
    timelineData: [
      { time: 'T-0m', normalLoad: 50, simulatedLoad: 50, healthScore: 98 },
      { time: 'T+15m', normalLoad: 52, simulatedLoad: 12, healthScore: 70 },
      { time: 'T+30m', normalLoad: 54, simulatedLoad: 32, healthScore: 82 },
      { time: 'T+1h', normalLoad: 55, simulatedLoad: 48, healthScore: 94 }
    ]
  },
  {
    id: 'sim_water_leak',
    title: 'Trunk Main Burst & Water Pressure Drop',
    category: 'Water System',
    icon: 'Droplets',
    description: 'Simulates a 300 GPM high-pressure rupture along District 5 Trunk Pipeline.',
    defaultSeverity: 9,
    affectedAreas: ['Downtown Core', 'District 5 Water Grid'],
    affectedAssetIds: ['WTR-PIPE-09', 'WTR-RES-1'],
    metrics: {
      downtime: '6h 00m',
      powerLoss: '12 MWh',
      waterLoss: '620,000 Gallons',
      carbonImpact: '+2.1 tCO2e',
      economicImpact: '$310,000',
      recoveryTime: '8.0 Hours'
    },
    aiRecommendedResponse: [
      'Trigger smart motorized isolation valves V-401 and V-402 to block damaged pipe segment.',
      'Increase boost pump pressure at Grand Summit Reservoir to maintain 50 PSI in commercial district.',
      'Issue automated boil-water notice to affected building operators via AI Orchestrator.',
      'Dispatch hydro-excavation crew to coordinates 37.7742, -122.4190.'
    ],
    timelineData: [
      { time: 'T-0m', normalLoad: 800, simulatedLoad: 800, healthScore: 96 },
      { time: 'T+15m', normalLoad: 810, simulatedLoad: 1120, healthScore: 41 },
      { time: 'T+30m', normalLoad: 815, simulatedLoad: 920, healthScore: 65 },
      { time: 'T+1h', normalLoad: 820, simulatedLoad: 830, healthScore: 88 }
    ]
  },
  {
    id: 'sim_heat_wave',
    title: 'Extreme Heat Wave (42°C Ambient Surge)',
    category: 'Climate Event',
    icon: 'ThermometerSun',
    description: 'Simulates sustained high ambient temperature causing city-wide air conditioning grid load surge.',
    defaultSeverity: 8,
    affectedAreas: ['All Districts', 'Substation Hubs', 'Building HVAC'],
    affectedAssetIds: ['BLD-101', 'BLD-204', 'SUB-A', 'SUB-B', 'T-08'],
    metrics: {
      downtime: '8h 00m',
      powerLoss: '420 MWh Peak Demand',
      waterLoss: '180,000 Gallons (Cooling Towers)',
      carbonImpact: '+65.0 tCO2e',
      economicImpact: '$450,000',
      recoveryTime: '12.0 Hours'
    },
    aiRecommendedResponse: [
      'Activate Smart Grid Automated Demand Response program across 450 commercial buildings.',
      'Pre-cool civic towers prior to peak pricing window (12:00 PM - 4:00 PM).',
      'Max out Solar + BESS discharge to offset thermal generator derating.',
      'Deploy mobile transformer cooling units to Substation Sub-A.'
    ],
    timelineData: [
      { time: 'T-0m', normalLoad: 350, simulatedLoad: 350, healthScore: 95 },
      { time: 'T+2h', normalLoad: 380, simulatedLoad: 490, healthScore: 82 },
      { time: 'T+4h', normalLoad: 410, simulatedLoad: 540, healthScore: 72 },
      { time: 'T+6h', normalLoad: 430, simulatedLoad: 510, healthScore: 85 }
    ]
  },
  {
    id: 'sim_flood_scenario',
    title: 'Coastal Storm Surge & Low-Lying Inundation',
    category: 'Environmental',
    icon: 'Waves',
    description: 'Simulates high tide storm surge flooding lower bay electrical vaults and EV stations.',
    defaultSeverity: 9,
    affectedAreas: ['Bay Renewable Hub', 'Lower Coastal Boulevard'],
    affectedAssetIds: ['SOL-01', 'BESS-01', 'EV-ST-04'],
    metrics: {
      downtime: '14h 00m',
      powerLoss: '210 MWh',
      waterLoss: 'N/A',
      carbonImpact: '+18.9 tCO2e',
      economicImpact: '$890,000',
      recoveryTime: '18.0 Hours'
    },
    aiRecommendedResponse: [
      'De-energize coastal distribution lines to prevent short circuits and salt-water arc flashes.',
      'Engage high-capacity stormwater pumps at Bay Pump Hub 4.',
      'Reroute traffic around flooded EV Hubs using smart signage.',
      'Deploy emergency barrier walls at BESS Storage Facility.'
    ],
    timelineData: [
      { time: 'T-0m', normalLoad: 100, simulatedLoad: 100, healthScore: 95 },
      { time: 'T+2h', normalLoad: 100, simulatedLoad: 35, healthScore: 50 },
      { time: 'T+6h', normalLoad: 100, simulatedLoad: 60, healthScore: 75 },
      { time: 'T+12h', normalLoad: 100, simulatedLoad: 92, healthScore: 90 }
    ]
  },
  {
    id: 'sim_ev_surge',
    title: 'Fleet Charging Demand Spike (+300% Draw)',
    category: 'EV Infrastructure',
    icon: 'Car',
    description: 'Simulates simultaneous fast-charging of 150 electric buses and delivery trucks at Supercharger Plaza.',
    defaultSeverity: 6,
    affectedAreas: ['Downtown Core', 'Transit Depot'],
    affectedAssetIds: ['EV-HUB-1', 'SUB-B', 'T-04'],
    metrics: {
      downtime: '0h 45m',
      powerLoss: '35 MWh Surge',
      waterLoss: '0 Gallons',
      carbonImpact: '0 tCO2e (Stored Green Power)',
      economicImpact: '$18,500',
      recoveryTime: '1.0 Hours'
    },
    aiRecommendedResponse: [
      'Dynamically throttle individual charging plug speeds from 250 kW to 120 kW per vehicle.',
      'Direct BESS unit 1 to supply dedicated 5.0 MW fast-discharge buffer.',
      'Shift 30% of fleet vehicles to Westside secondary charger hub.'
    ],
    timelineData: [
      { time: 'T-0m', normalLoad: 1.8, simulatedLoad: 1.8, healthScore: 93 },
      { time: 'T+15m', normalLoad: 2.0, simulatedLoad: 6.8, healthScore: 74 },
      { time: 'T+30m', normalLoad: 2.2, simulatedLoad: 4.2, healthScore: 86 },
      { time: 'T+1h', normalLoad: 2.1, simulatedLoad: 2.3, healthScore: 93 }
    ]
  },
  {
    id: 'sim_battery_failure',
    title: 'BESS Inverter Thermal Shutdown',
    category: 'Storage',
    icon: 'BatteryOff',
    description: 'Simulates primary inverter trip on 100 MWh BESS Storage Unit during peak grid export.',
    defaultSeverity: 7,
    affectedAreas: ['Bay Renewable Hub'],
    affectedAssetIds: ['BESS-01', 'SOL-01'],
    metrics: {
      downtime: '3h 10m',
      powerLoss: '75 MWh',
      waterLoss: '0 Gallons',
      carbonImpact: '+14.2 tCO2e',
      economicImpact: '$64,000',
      recoveryTime: '4.0 Hours'
    },
    aiRecommendedResponse: [
      'Switch to secondary modular inverter string B2.',
      'Curtail solar output temporarily to avoid grid over-frequency.',
      'Notify Grid Reliability Coordinator of reduced spin reserve.'
    ],
    timelineData: [
      { time: 'T-0m', normalLoad: 84, simulatedLoad: 84, healthScore: 95 },
      { time: 'T+30m', normalLoad: 84, simulatedLoad: 0, healthScore: 52 },
      { time: 'T+1h', normalLoad: 84, simulatedLoad: 45, healthScore: 78 },
      { time: 'T+2h', normalLoad: 84, simulatedLoad: 84, healthScore: 95 }
    ]
  },
  {
    id: 'sim_waste_overflow',
    title: 'City-wide Smart Bin Overflow Risk',
    category: 'Waste Management',
    icon: 'Trash2',
    description: 'Simulates post-festival waste accumulation exceeding 95% capacity in 45 downtown smart bins.',
    defaultSeverity: 4,
    affectedAreas: ['Downtown Core', 'Civic Center'],
    affectedAssetIds: ['WST-HUB-3'],
    metrics: {
      downtime: '2h 00m',
      powerLoss: '0 MWh',
      waterLoss: '0 Gallons',
      carbonImpact: '+0.8 tCO2e (Route Fuel)',
      economicImpact: '$8,200',
      recoveryTime: '2.5 Hours'
    },
    aiRecommendedResponse: [
      'Re-optimize EV Waste Collection Truck routes to prioritize 14 critical red-flag bins.',
      'Dispatch automated compactors via remote IoT command.'
    ],
    timelineData: [
      { time: 'T-0m', normalLoad: 60, simulatedLoad: 60, healthScore: 90 },
      { time: 'T+1h', normalLoad: 65, simulatedLoad: 94, healthScore: 68 },
      { time: 'T+2h', normalLoad: 70, simulatedLoad: 40, healthScore: 92 }
    ]
  },
  {
    id: 'sim_pollution_event',
    title: 'Industrial Chemical Emission Anomaly',
    category: 'Air Quality',
    icon: 'AlertTriangle',
    description: 'Simulates a sudden spike in NO2 and PM2.5 emissions near North Industrial Zone.',
    defaultSeverity: 8,
    affectedAreas: ['North Industrial Zone', 'Adjacent Residential'],
    affectedAssetIds: ['AQI-04', 'BLD-204'],
    metrics: {
      downtime: '5h 00m',
      powerLoss: '0 MWh',
      waterLoss: '0 Gallons',
      carbonImpact: '+42.0 tCO2e',
      economicImpact: '$115,000',
      recoveryTime: '6.0 Hours'
    },
    aiRecommendedResponse: [
      'Issue automated compliance warning to Plant 4 Smokestack Scrubbers.',
      'Activate HVAC positive-pressure filtration in neighboring school & office buildings.',
      'Trigger environmental enforcement drone scan.'
    ],
    timelineData: [
      { time: 'T-0m', normalLoad: 45, simulatedLoad: 45, healthScore: 92 },
      { time: 'T+30m', normalLoad: 48, simulatedLoad: 185, healthScore: 35 },
      { time: 'T+2h', normalLoad: 50, simulatedLoad: 90, healthScore: 70 },
      { time: 'T+4h', normalLoad: 48, simulatedLoad: 48, healthScore: 92 }
    ]
  },
  {
    id: 'sim_peak_demand',
    title: 'Summer Peak Grid Demand (580 MW Peak)',
    category: 'Grid Load',
    icon: 'TrendingUp',
    description: 'Simulates 5:00 PM peak demand when industrial shifts, residential HVAC, and EV charging coincide.',
    defaultSeverity: 6,
    affectedAreas: ['All City Districts'],
    affectedAssetIds: ['SUB-A', 'SUB-B', 'T-08', 'T-04'],
    metrics: {
      downtime: '2h 00m',
      powerLoss: '65 MWh Peak Shave Needed',
      waterLoss: '0 Gallons',
      carbonImpact: '+32.0 tCO2e',
      economicImpact: '$78,000',
      recoveryTime: '3.0 Hours'
    },
    aiRecommendedResponse: [
      'Dispatch 45 MW from BESS + Solar arrays.',
      'Request automated 15 MW load shedding from top 10 industrial manufacturing clients.',
      'Activate dynamic hourly pricing incentives to lower EV residential home charging.'
    ],
    timelineData: [
      { time: 'T-0m', normalLoad: 400, simulatedLoad: 400, healthScore: 95 },
      { time: 'T+1h', normalLoad: 450, simulatedLoad: 580, healthScore: 78 },
      { time: 'T+2h', normalLoad: 460, simulatedLoad: 490, healthScore: 88 },
      { time: 'T+3h', normalLoad: 420, simulatedLoad: 420, healthScore: 96 }
    ]
  },
  {
    id: 'sim_heavy_rain',
    title: 'Severe Thunderstorm & Heavy Rain',
    category: 'Weather',
    icon: 'CloudRain',
    description: 'Simulates 80 mm/hr rainfall, lightning risk, and wind gusts up to 85 km/h.',
    defaultSeverity: 7,
    affectedAreas: ['City-wide Infrastructure', 'Coastal Hubs'],
    affectedAssetIds: ['WTH-01', 'SOL-01', 'SUB-A'],
    metrics: {
      downtime: '4h 00m',
      powerLoss: '85 MWh',
      waterLoss: '0 Gallons (Storm Runoff High)',
      carbonImpact: '+11.5 tCO2e',
      economicImpact: '$145,000',
      recoveryTime: '5.0 Hours'
    },
    aiRecommendedResponse: [
      'Stow solar panel tilt angles to stow position (0 deg) for high wind resistance.',
      'Switch overhead transmission lines to auto-recloser high sensitivity mode.',
      'Open stormwater retention sluice gates G-12 and G-14.'
    ],
    timelineData: [
      { time: 'T-0m', normalLoad: 100, simulatedLoad: 100, healthScore: 96 },
      { time: 'T+1h', normalLoad: 100, simulatedLoad: 60, healthScore: 68 },
      { time: 'T+3h', normalLoad: 100, simulatedLoad: 85, healthScore: 86 },
      { time: 'T+5h', normalLoad: 100, simulatedLoad: 100, healthScore: 96 }
    ]
  }
];
