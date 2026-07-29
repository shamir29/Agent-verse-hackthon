import { CopilotResponse } from "@/types/copilot";

// Comprehensive Project Services Knowledge Base for NeuraGrid AI Copilot
export const PROJECT_SERVICES = {
  powerGrid: {
    name: "Power Grid & Smart Substations",
    substationsCount: 12,
    substations: [
      { name: "Adyar Central Hub", zone: "Adyar", load: 98.4, voltage: "21.1 kV", status: "CRITICAL" },
      { name: "IIT Campus Substation", zone: "Adyar", load: 54.1, voltage: "22.8 kV", status: "NOMINAL" },
      { name: "Panagal Park Substation", zone: "T. Nagar", load: 91.8, voltage: "21.6 kV", status: "WARNING" },
      { name: "Anna Nagar Substation", zone: "Anna Nagar", load: 72.3, voltage: "22.4 kV", status: "NOMINAL" },
      { name: "Velachery Substation", zone: "Velachery", load: 68.0, voltage: "22.5 kV", status: "NOMINAL" },
      { name: "Guindy Industrial Hub", zone: "Guindy", load: 84.6, voltage: "21.9 kV", status: "WARNING" },
    ],
    bessCapacity: "84.5%",
    solarMicrogrids: "45 MW Total Peak",
  },
  waterManagement: {
    name: "Water Infrastructure & Reservoirs",
    reservoirsCount: 6,
    reservoirs: [
      { name: "Poondi Reservoir", level: 68, capacityMl: 3231, status: "NOMINAL", inflow: "120 cusecs" },
      { name: "Cholavaram Reservoir", level: 42, capacityMl: 1081, status: "WARNING", inflow: "45 cusecs" },
      { name: "Redhills (Puzhal)", level: 74, capacityMl: 3300, status: "GOOD", inflow: "210 cusecs" },
      { name: "Chembarambakkam", level: 81, capacityMl: 3645, status: "GOOD", inflow: "340 cusecs" },
      { name: "Veeranam Lake", level: 56, capacityMl: 1465, status: "NOMINAL", inflow: "80 cusecs" },
      { name: "Thervoy Kandigai", level: 49, capacityMl: 500, status: "WARNING", inflow: "30 cusecs" },
    ],
    trunkPipelines: "450mm & 600mm Ductile Iron Mains",
  },
  environmentalAQI: {
    name: "Environmental Telemetry & AQI",
    sensorsCount: 32,
    nodes: [
      { name: "AQI-88 Manali Industrial", aqi: 312, pm25: 284, status: "HAZARDOUS" },
      { name: "AQI-42 Tiruvottiyur Highway", aqi: 184, pm25: 112, status: "UNHEALTHY" },
      { name: "AQI-19 Guindy Eco-Park", aqi: 62, pm25: 28, status: "GOOD" },
      { name: "AQI-04 Kathipara Junction", aqi: 145, pm25: 85, status: "MODERATE" },
    ],
  },
  evMobility: {
    name: "EV Infrastructure & Urban Mobility",
    chargingStationsCount: 48,
    fastChargers: "150 kW DC Ultra-Fast",
    trafficSensors: "128 CCTV Edge AI Density Nodes",
  },
  healthcareEMS: {
    name: "Healthcare EMS & Emergency Response",
    hospitalsCount: 16,
    ambulancesActive: 42,
    emergencyGenerators: "100% Standby Ready",
  },
  digitalTwin: {
    name: "3D Spatial Digital Twin & Time Machine",
    resolution: "Sub-meter 3D Spatial Grid",
    timeMachineRange: "50-Year Climate & Infra Simulation",
  },
};

export function processCopilotQuery(query: string): CopilotResponse {
  const lower = query.toLowerCase().trim();
  const timestamp = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const latencyMs = Math.floor(Math.random() * 100) + 120;

  // Domain 1: Water Management & Leaks
  if (lower.includes("water") || lower.includes("leak") || lower.includes("reservoir") || lower.includes("pipe") || lower.includes("poondi") || lower.includes("chembarambakkam")) {
    const isReservoirsQuery = lower.includes("reservoir") || lower.includes("chembarambakkam") || lower.includes("capacity");
    
    return {
      id: `copilot_${Date.now()}`,
      userQuery: query,
      timestamp,
      latencyMs,
      intent: {
        title: isReservoirsQuery ? "Metropolitan Reservoir Capacity & Inflow Audit" : "Water Leak Detection & Pipeline Inspection",
        category: "Hydro-Infrastructure Intelligence",
        confidence: 99.6,
        description: "SCADA hydraulic gradient analysis monitoring 6 main reservoirs and 450mm trunk pipelines across Chennai Metro region.",
      },
      modules: [
        { id: "water", name: "Water Management", status: "active" },
        { id: "digital_twin", name: "Digital Twin", status: "synced" },
        { id: "power", name: "Power Grid", status: "active" },
        { id: "ems", name: "Emergency Services", status: "synced" },
      ],
      liveSources: [
        { id: "src_1", name: "SCADA-Hydro-Pipe-329", type: "SCADA", status: "live", lastSync: "1 sec ago", recordCount: 1420 },
        { id: "src_2", name: "IoT Hydro-Pressure Telemetry", type: "IoT", status: "streaming", lastSync: "Real-time", recordCount: 8900 },
        { id: "src_3", name: "GIS Pipe Vector Matrix v4", type: "GIS", status: "synced", lastSync: "5 mins ago" },
        { id: "src_4", name: "Satellite InSAR Soil Moisture", type: "Satellite", status: "nominal", lastSync: "15 mins ago" },
      ],
      metrics: [
        { label: "Total Reservoir Storage", value: "13,222", unit: "ML", status: "good" },
        { label: "Active Leaks Detected", value: 2, status: "critical" },
        { label: "Est. Water Loss Rate", value: "420", unit: "L/min", status: "critical" },
        { label: "Repair SLA Target", value: "< 4.0", unit: "hrs", status: "nominal" },
      ],
      table: {
        title: isReservoirsQuery ? "Live City Reservoirs Volume & Inflow Telemetry" : "Detected Pipeline Ruptures & Priority Analysis",
        headers: isReservoirsQuery ? ["Reservoir Name", "Current Storage %", "Capacity (ML)", "Inflow Rate", "Operational Status"] : ["Leak Location", "Severity", "Est. Water Loss", "Affected Pipelines", "Priority", "Repair Est."],
        rows: isReservoirsQuery
          ? PROJECT_SERVICES.waterManagement.reservoirs.map((r) => ({
              "Reservoir Name": r.name,
              "Current Storage %": `${r.level}%`,
              "Capacity (ML)": `${r.capacityMl} ML`,
              "Inflow Rate": r.inflow,
              "Operational Status": r.status,
            }))
          : [
              {
                "Leak Location": "Poondi Feeder Segment 4 (Lat 13.18, Lng 79.91)",
                Severity: "CRITICAL",
                "Est. Water Loss": "280 L/min",
                "Affected Pipelines": "450mm Ductile Iron Main #P4",
                Priority: "HIGH P1",
                "Repair Est.": "$3,200 (3.5 hrs)",
              },
              {
                "Leak Location": "Guindy Industrial Main #12 (Lat 13.01, Lng 80.21)",
                Severity: "HIGH",
                "Est. Water Loss": "140 L/min",
                "Affected Pipelines": "300mm PVC Sub-line #G12",
                Priority: "P2",
                "Repair Est.": "$1,600 (2.0 hrs)",
              },
            ],
      },
      chart: {
        title: "Hydro Pressure Telemetry Drop vs Target Baseline (PSI)",
        type: "line",
        dataKey: "pressurePSI",
        unit: "PSI",
        data: [
          { time: "06:00", pressurePSI: 65 },
          { time: "08:00", pressurePSI: 64 },
          { time: "10:00", pressurePSI: 52 },
          { time: "11:00", pressurePSI: 38 },
          { time: "11:30", pressurePSI: 27 },
          { time: "12:00", pressurePSI: 24 },
        ],
      },
      timeline: [
        { time: "11:04 AM", event: "Pressure drop anomaly (>25%) logged at SCADA Node #329", status: "completed", module: "Water Management" },
        { time: "11:12 AM", event: "Digital Twin 3D Hydro Simulation pinpoints rupture on Poondi Main P4", status: "completed", module: "Digital Twin" },
        { time: "11:15 AM", event: "Auto-throttling requested for Pump Station #4 to prevent cavitation", status: "in_progress", module: "Power Grid" },
        { time: "Pending", event: "Dispatch Maintenance Team Alpha to isolate Valve SV-104", status: "pending", module: "Emergency Services" },
      ],
      gisMap: {
        overlayTitle: "Water Pipeline GIS Vector & Leak Location Overlay",
        center: [13.1, 80.05],
        zoom: 11,
        markers: [
          {
            id: "leak_1",
            name: "Poondi Feeder Rupture",
            lat: 13.18,
            lng: 79.91,
            type: "leak",
            severity: "critical",
            value: "280 L/min",
            detail: "450mm Ductile Iron Main rupture with major soil saturation",
            radiusKm: 1.8,
            zone: "Poondi West",
          },
          {
            id: "res_chembar",
            name: "Chembarambakkam Reservoir",
            lat: 13.01,
            lng: 80.01,
            type: "reservoir",
            severity: "nominal",
            value: "81% Vol",
            detail: "3,645 ML Storage Capacity",
          },
        ],
        polylines: [
          {
            id: "pipe_main_1",
            name: "Poondi - City Trunk Pipeline P4",
            points: [
              [13.19, 79.9],
              [13.18, 79.91],
              [13.12, 80.05],
              [13.08, 80.18],
            ],
            color: "#EF4444",
            dashed: true,
            type: "pipeline",
          },
        ],
      },
      recommendations: [
        {
          id: "rec_1",
          title: "Automated Hydraulic Bypass & Pump Throttling",
          reasoning: "Pressure drop of 41 PSI at Poondi Segment 4 is causing cavitation risk at Pump Station #4.",
          impact: "Throttling Pump Station #4 by 30% prevents $45,000 motor burnout while Redhills bypass supplies drinking water.",
          crossModuleInsight: "Water Management + Power Grid SCADA: Automated current reduction prevents grid voltage sags.",
        },
      ],
      actions: [
        { id: "act_view_map", label: "View on Map", type: "view_map", primary: true, payload: { focusMarkerId: "leak_1", lat: 13.18, lng: 79.91, zoom: 14 } },
        { id: "act_assign_team", label: "Assign Maintenance Team", type: "assign_team", payload: { teamName: "Crew Alpha - Hydro Unit 3", location: "Poondi Feeder Segment 4", etaMins: 22 } },
        { id: "act_work_order", label: "Generate Work Order", type: "create_work_order", payload: { woId: "WO-2026-8942", asset: "450mm Ductile Iron Main #P4", location: "Poondi Feeder Segment 4", priority: "CRITICAL P1", estCost: "$3,200", tools: ["Hydraulic Clamp 450mm", "Acoustic Detector", "Excavator Unit 2"] } },
        { id: "act_notify", label: "Notify Operations Command", type: "notify_ops", payload: { channel: "Control Room #1", priority: "HIGH" } },
        { id: "act_isolate", label: "Execute Valve Shutoff (SV-104)", type: "isolate_valve", payload: { valveId: "SV-104", targetState: "CLOSED", pressureBypass: "SV-105 OPEN" } },
      ],
    };
  }

  // Domain 2: Power Grid & Substations
  if (lower.includes("power") || lower.includes("substation") || lower.includes("grid") || lower.includes("adyar") || lower.includes("load") || lower.includes("voltage")) {
    return {
      id: `copilot_${Date.now()}`,
      userQuery: query,
      timestamp,
      latencyMs,
      intent: {
        title: "Substation Load Shedding & Power Peak Mitigation",
        category: "Smart Power Grid Telemetry",
        confidence: 99.4,
        description: "Monitoring 12 Chennai smart substations. High thermal load detected on Adyar Central Transformer T-2.",
      },
      modules: [
        { id: "power", name: "Power Grid", status: "active" },
        { id: "solar", name: "Solar Storage", status: "synced" },
        { id: "ev", name: "EV Charging Network", status: "active" },
        { id: "digital_twin", name: "Digital Twin", status: "synced" },
      ],
      liveSources: [
        { id: "src_grid", name: "Substation SCADA Feeder-4B", type: "SCADA", status: "live", lastSync: "1 sec ago", recordCount: 3400 },
        { id: "src_solar", name: "Solar Array Telemetry Grid", type: "IoT", status: "streaming", lastSync: "Real-time", recordCount: 1200 },
        { id: "src_ev", name: "EV Fast Charger Node Network", type: "IoT", status: "live", lastSync: "3 secs ago" },
      ],
      metrics: [
        { label: "Adyar Transformer Load", value: "98.4", unit: "%", status: "critical" },
        { label: "Busbar Voltage", value: "21.1", unit: "kV", status: "warning" },
        { label: "Reroutable Load", value: "15.0", unit: "MW", status: "nominal" },
        { label: "BESS Backup Capacity", value: "84.5", unit: "%", status: "good" },
      ],
      table: {
        title: "Chennai Metropolitan Substations Telemetry Matrix",
        headers: ["Substation Name", "Zone", "Status", "Active Load %", "Voltage (kV)", "Recommended Action"],
        rows: PROJECT_SERVICES.powerGrid.substations.map((s) => ({
          "Substation Name": s.name,
          Zone: s.zone,
          Status: s.status,
          "Active Load %": `${s.load}%`,
          "Voltage (kV)": s.voltage,
          "Recommended Action": s.load > 90 ? "Offload 15 MW to backup bus" : "Maintain normal operation",
        })),
      },
      chart: {
        title: "Substation Load Curve vs Thermal Threshold (%)",
        type: "area",
        dataKey: "loadPercent",
        unit: "%",
        data: [
          { time: "07:00", loadPercent: 62 },
          { time: "08:00", loadPercent: 74 },
          { time: "09:00", loadPercent: 88 },
          { time: "10:00", loadPercent: 94 },
          { time: "11:00", loadPercent: 98.4 },
          { time: "12:00", loadPercent: 96 },
        ],
      },
      gisMap: {
        overlayTitle: "Power Grid Substation Vectors & Feeder Lines",
        center: [13.0, 80.24],
        zoom: 12,
        markers: [
          { id: "sub_adyar", name: "Adyar Central Substation", lat: 13.0, lng: 80.25, type: "substation", severity: "critical", value: "98.4% Load", detail: "Transformer T-2 overload" },
          { id: "sub_iit", name: "IIT Campus Substation", lat: 12.99, lng: 80.23, type: "substation", severity: "nominal", value: "54.1% Load", detail: "15 MW headroom available" },
        ],
        polylines: [
          { id: "power_line_1", name: "110kV Inter-Substation Feeder", points: [[13.0, 80.25], [12.99, 80.23]], color: "#3B82F6", dashed: true, type: "power_feeder" },
        ],
      },
      recommendations: [
        {
          id: "rec_grid_1",
          title: "Automated 15 MW Inter-Substation Load Reroute",
          reasoning: "Transferring 15 MW load from Adyar Central to IIT Campus Substation reduces thermal temperature by 18°C.",
          impact: "Prevents automatic breaker trip affecting 45,000 residents.",
          crossModuleInsight: "Power Grid + EV Network: Throttling EV fast chargers temporarily saves an extra 3.2 MW.",
        },
      ],
      actions: [
        { id: "act_reroute", label: "Execute 15MW Power Reroute", type: "reroute_load", primary: true, payload: { from: "Adyar Central", to: "IIT Campus Substation", mw: 15 } },
        { id: "act_view_map", label: "View on Map", type: "view_map", payload: { focusMarkerId: "sub_adyar", lat: 13.0, lng: 80.25, zoom: 14 } },
        { id: "act_work_order", label: "Generate Work Order", type: "create_work_order", payload: { woId: "WO-PWR-4091", asset: "Adyar Transformer T-2", priority: "HIGH P1", estCost: "$1,800" } },
        { id: "act_notify", label: "Notify Operations Command", type: "notify_ops", payload: { channel: "Power Dispatch Center", priority: "HIGH" } },
      ],
    };
  }

  // Domain 3: Environmental AQI & Emissions
  if (lower.includes("aqi") || lower.includes("air") || lower.includes("pollution") || lower.includes("manali") || lower.includes("pm2.5")) {
    return {
      id: `copilot_${Date.now()}`,
      userQuery: query,
      timestamp,
      latencyMs,
      intent: {
        title: "AQI Incident Containment & Industrial Emission Tracing",
        category: "Environmental Telemetry Response",
        confidence: 98.9,
        description: "Optical PM2.5 laser sensors monitoring 32 environmental nodes. Hazardous spike at Manali Sector 3.",
      },
      modules: [
        { id: "env", name: "Environmental Sensors", status: "active" },
        { id: "mobility", name: "Urban Traffic Control", status: "active" },
        { id: "digital_twin", name: "Digital Twin", status: "synced" },
        { id: "healthcare", name: "Healthcare EMS", status: "synced" },
      ],
      liveSources: [
        { id: "src_aqi", name: "Optical Laser PM2.5 Grid AQI-88", type: "IoT", status: "live", lastSync: "Real-time", recordCount: 5200 },
        { id: "src_weather", name: "Meteo-Grid Wind Dispersion API", type: "Database", status: "nominal", lastSync: "2 mins ago" },
      ],
      metrics: [
        { label: "Manali AQI Index", value: "312", status: "critical" },
        { label: "PM2.5 Concentration", value: "284", unit: "µg/m³", status: "critical" },
        { label: "Plume Dispersion Rate", value: "14.2", unit: "km/h SSW", status: "warning" },
        { label: "Affected Population", value: "18,400", status: "warning" },
      ],
      table: {
        title: "Air Quality Optical Monitoring Nodes Matrix",
        headers: ["Sensor Node ID", "Zone Location", "AQI Index", "PM2.5 Level", "Status"],
        rows: PROJECT_SERVICES.environmentalAQI.nodes.map((n) => ({
          "Sensor Node ID": n.name,
          "Zone Location": n.name.split(" ")[1] || "Metro",
          "AQI Index": n.aqi,
          "PM2.5 Level": `${n.pm25} µg/m³`,
          Status: n.status,
        })),
      },
      chart: {
        title: "PM2.5 Spike Profile vs Safety Limit (µg/m³)",
        type: "bar",
        dataKey: "pm25",
        unit: "µg/m³",
        data: [
          { time: "06:00", pm25: 45 },
          { time: "08:00", pm25: 68 },
          { time: "09:30", pm25: 140 },
          { time: "11:00", pm25: 284 },
          { time: "12:00", pm25: 260 },
        ],
      },
      gisMap: {
        overlayTitle: "Pollution Plume Dispersion & Traffic Diversion Map",
        center: [13.16, 80.26],
        zoom: 12,
        markers: [
          { id: "aqi_manali", name: "Manali Industrial Sensor AQI-88", lat: 13.17, lng: 80.27, type: "aqi_sensor", severity: "critical", value: "AQI 312", detail: "Hazardous PM2.5 plume spreading SSW", radiusKm: 3.2, zone: "Manali" },
        ],
      },
      recommendations: [
        {
          id: "rec_env_1",
          title: "Industrial Stack Scrubbing & Freight Traffic Diversion",
          reasoning: "High wind vector at 14 km/h is carrying PM2.5 plume towards North Chennai residential zones.",
          impact: "Diverting heavy diesel trucks to Outer Ring Road lowers ambient PM2.5 by 38% within 35 minutes.",
          crossModuleInsight: "Environmental Telemetry + Mobility + Healthcare: Pre-alerting nearby health clinics for nebulizer readiness.",
        },
      ],
      actions: [
        { id: "act_view_map", label: "View Plume Map", type: "view_map", primary: true, payload: { focusMarkerId: "aqi_manali", lat: 13.17, lng: 80.27, zoom: 13 } },
        { id: "act_assign_team", label: "Dispatch Eco-Inspection Team", type: "assign_team", payload: { teamName: "Hazmat Unit 1", location: "Manali Sector 3", etaMins: 15 } },
        { id: "act_work_order", label: "Generate Emission Order", type: "create_work_order", payload: { woId: "WO-ENV-9011", asset: "Petrochemical Stack #2", priority: "CRITICAL P1", estCost: "$0" } },
        { id: "act_notify", label: "Notify Health Command", type: "notify_ops", payload: { channel: "Public Health Room", priority: "HIGH" } },
      ],
    };
  }

  // Domain 4: EV Infrastructure & Urban Mobility
  if (lower.includes("ev") || lower.includes("traffic") || lower.includes("mobility") || lower.includes("charger") || lower.includes("charging")) {
    return {
      id: `copilot_${Date.now()}`,
      userQuery: query,
      timestamp,
      latencyMs,
      intent: {
        title: "EV Fleet Charging Demand Response & Grid Balancing",
        category: "Urban Mobility & EV Infrastructure",
        confidence: 99.1,
        description: "Managing 48 fast-charging EV stations (150kW DC). Peak charging demand surge detected in North Zone.",
      },
      modules: [
        { id: "ev", name: "EV Charging Network", status: "active" },
        { id: "power", name: "Power Grid", status: "active" },
        { id: "mobility", name: "Urban Traffic Control", status: "synced" },
      ],
      liveSources: [
        { id: "src_ev_net", name: "OCPP EV Fast-Charger Gateway", type: "IoT", status: "live", lastSync: "Real-time", recordCount: 2400 },
        { id: "src_grid_tele", name: "Feeder Transformer Sensor B4", type: "SCADA", status: "streaming", lastSync: "1 sec ago" },
      ],
      metrics: [
        { label: "Active Charging Nodes", value: "48", status: "good" },
        { label: "Peak Power Draw", value: "7.2", unit: "MW", status: "warning" },
        { label: "Average Charging Speed", value: "120", unit: "kW", status: "good" },
        { label: "Grid Headroom Available", value: "3.4", unit: "MW", status: "nominal" },
      ],
      table: {
        title: "EV Fast Charger Cluster Telemetry Snapshot",
        headers: ["Station ID", "Location Zone", "Active Chargers", "Power Demand (kW)", "Status"],
        rows: [
          { "Station ID": "EV-NORTH-01", "Location Zone": "Anna Nagar Hub", "Active Chargers": "12 / 12", "Power Demand (kW)": "1440 kW", Status: "SURGE" },
          { "Station ID": "EV-SOUTH-04", "Location Zone": "Adyar Plaza", "Active Chargers": "8 / 10", "Power Demand (kW)": "960 kW", Status: "NOMINAL" },
          { "Station ID": "EV-EAST-02", "Location Zone": "Guindy CyberCity", "Active Chargers": "15 / 15", "Power Demand (kW)": "1800 kW", Status: "SURGE" },
        ],
      },
      chart: {
        title: "EV Demand Peak Curve (MW)",
        type: "area",
        dataKey: "demandMW",
        unit: "MW",
        data: [
          { time: "08:00", demandMW: 2.1 },
          { time: "10:00", demandMW: 4.5 },
          { time: "12:00", demandMW: 7.2 },
          { time: "14:00", demandMW: 6.8 },
        ],
      },
      recommendations: [
        {
          id: "rec_ev_1",
          title: "Dynamic Smart-Charging Rate Throttling",
          reasoning: "Throttling charger power output from 150kW to 100kW during peak grid load balances feeder capacity.",
          impact: "Reduces peak demand by 2.4 MW without extending user charge time by more than 4 minutes.",
          crossModuleInsight: "EV Network + Power Grid: Direct API signal triggers battery buffer storage discharge.",
        },
      ],
      actions: [
        { id: "act_reroute", label: "Enable Smart Load Throttling", type: "reroute_load", primary: true, payload: { from: "EV Fast Chargers", to: "Battery Buffer", mw: 2.4 } },
        { id: "act_notify", label: "Notify Fleet Operations", type: "notify_ops", payload: { channel: "EV Mobility Control", priority: "NORMAL" } },
      ],
    };
  }

  // Domain 5: Healthcare & EMS Response
  if (lower.includes("hospital") || lower.includes("emergency") || lower.includes("ems") || lower.includes("ambulance") || lower.includes("health")) {
    return {
      id: `copilot_${Date.now()}`,
      userQuery: query,
      timestamp,
      latencyMs,
      intent: {
        title: "Critical Hospital Emergency Backup & EMS Dispatch",
        category: "Healthcare Infrastructure & EMS Response",
        confidence: 99.5,
        description: "Monitoring 16 Chennai major hospitals. Power backup generators & green wave emergency traffic clearance.",
      },
      modules: [
        { id: "healthcare", name: "Healthcare EMS", status: "active" },
        { id: "power", name: "Power Grid", status: "active" },
        { id: "mobility", name: "Urban Traffic Control", status: "synced" },
      ],
      liveSources: [
        { id: "src_ems", name: "EMS Dispatch GPS Telemetry", type: "IoT", status: "live", lastSync: "Real-time", recordCount: 1800 },
        { id: "src_hospital", name: "Hospital Power Backup SCADA", type: "SCADA", status: "streaming", lastSync: "1 sec ago" },
      ],
      metrics: [
        { label: "Active Hospitals Monitored", value: "16", status: "good" },
        { label: "Emergency Beds Available", value: "142", status: "good" },
        { label: "Active Ambulance Fleet", value: "42", status: "good" },
        { label: "Backup Generator Readiness", value: "100", unit: "%", status: "good" },
      ],
      table: {
        title: "Major Hospital Emergency Preparedness Status",
        headers: ["Hospital Name", "Location Zone", "ICU Beds Available", "Backup Power Status", "Emergency Routing"],
        rows: [
          { "Hospital Name": "Apollo Greams Road", "Location Zone": "Thousand Lights", "ICU Beds Available": "14", "Backup Power Status": "100% STANDBY", "Emergency Routing": "CLEAR" },
          { "Hospital Name": "Rajiv Gandhi Govt General", "Location Zone": "Park Town", "ICU Beds Available": "32", "Backup Power Status": "100% STANDBY", "Emergency Routing": "CLEAR" },
          { "Hospital Name": "MIOT International", "Location Zone": "Manapakkam", "ICU Beds Available": "18", "Backup Power Status": "100% STANDBY", "Emergency Routing": "CLEAR" },
        ],
      },
      recommendations: [
        {
          id: "rec_ems_1",
          title: "Priority Grid Feeder Protection & Traffic Green Wave",
          reasoning: "Hospital power feeders assigned highest priority breaker locking to prevent load shedding trips.",
          impact: "Ensures 100% uninterrupted power to life support & ICU surgical suites.",
          crossModuleInsight: "Healthcare EMS + Urban Traffic: Dynamic signal green waves automatically reduce ambulance transit time by 6.5 mins.",
        },
      ],
      actions: [
        { id: "act_notify", label: "Notify Emergency Dispatch", type: "notify_ops", primary: true, payload: { channel: "Central EMS Room", priority: "HIGH" } },
        { id: "act_assign_team", label: "Deploy Support Crew", type: "assign_team", payload: { teamName: "EMS Response Team 2", location: "General Hospital Corridor", etaMins: 8 } },
      ],
    };
  }

  // General NeuraGrid Services Platform Query Fallback
  return {
    id: `copilot_${Date.now()}`,
    userQuery: query,
    timestamp,
    latencyMs,
    intent: {
      title: `NeuraGrid System Intelligence (${query.slice(0, 35)}...)`,
      category: "Unified City OS Co-pilot Directive",
      confidence: 97.8,
      description: "Synthesized cross-module analysis answering directive query across all 6 NeuraGrid smart city domains.",
    },
    modules: [
      { id: "power", name: "Power Grid", status: "active" },
      { id: "water", name: "Water Management", status: "synced" },
      { id: "env", name: "Environmental Telemetry", status: "active" },
      { id: "digital_twin", name: "Digital Twin 3D", status: "synced" },
    ],
    liveSources: [
      { id: "src_core", name: "NeuraGrid Core Database Matrix", type: "Database", status: "live", lastSync: "Real-time", recordCount: 145000 },
      { id: "src_scada_master", name: "Metro SCADA & Sensor Pipeline", type: "SCADA", status: "streaming", lastSync: "1 sec ago" },
      { id: "src_gis_master", name: "3D GIS Infrastructure Layer", type: "GIS", status: "synced", lastSync: "3 mins ago" },
    ],
    metrics: [
      { label: "City Health Index", value: "95.4", unit: "%", status: "good" },
      { label: "Monitored Substations", value: "12", status: "good" },
      { label: "Monitored Reservoirs", value: "6", status: "good" },
      { label: "Telemetry Ingest Rate", value: "14.8", unit: "k ops/s", status: "good" },
    ],
    table: {
      title: "NeuraGrid City Services Platform Overview",
      headers: ["Service Domain", "Operational Status", "Monitored Assets", "Telemetry Feed", "Copilot Status"],
      rows: [
        { "Service Domain": "Power Grid & Smart Substations", "Operational Status": "OPTIMIZED", "Monitored Assets": "12 Substations (110kV)", "Telemetry Feed": "SCADA Feeder Pipeline", "Copilot Status": "Load Shedding Ready" },
        { "Service Domain": "Water & Hydro Infrastructure", "Operational Status": "MONITORING", "Monitored Assets": "6 Reservoirs / Trunk Mains", "Telemetry Feed": "Hydro Sensor Array", "Copilot Status": "Leak Detection Active" },
        { "Service Domain": "Environmental & AQI", "Operational Status": "ACTIVE", "Monitored Assets": "32 Optical Laser Sensors", "Telemetry Feed": "PM2.5 / PM10 Stream", "Copilot Status": "Plume Model Active" },
        { "Service Domain": "EV Infrastructure & Mobility", "Operational Status": "STABLE", "Monitored Assets": "48 DC Fast Chargers", "Telemetry Feed": "OCPP Network Feed", "Copilot Status": "Demand Response Ready" },
        { "Service Domain": "Healthcare & EMS", "Operational Status": "READY", "Monitored Assets": "16 Major Hospitals", "Telemetry Feed": "EMS Dispatch Matrix", "Copilot Status": "Green Wave Ready" },
        { "Service Domain": "Digital Twin & Time Machine", "Operational Status": "SYNCED", "Monitored Assets": "Sub-meter 3D Spatial Grid", "Telemetry Feed": "Spatial GIS Pipeline", "Copilot Status": "50-Yr Simulator Ready" },
      ],
    },
    chart: {
      title: "City Platform Telemetry Health Index Score",
      type: "line",
      dataKey: "score",
      unit: "Index",
      data: [
        { time: "06:00", score: 92 },
        { time: "08:00", score: 94 },
        { time: "10:00", score: 95 },
        { time: "12:00", score: 95.4 },
      ],
    },
    recommendations: [
      {
        id: "rec_platform_1",
        title: "Cross-Domain Telemetry Synchronization Complete",
        reasoning: `Analysis of query "${query}" verified against active Power, Water, AQI, EV, and Emergency Services databases.`,
        impact: "Provides unified operational command with zero latency between city modules.",
        crossModuleInsight: "Digital Twin + SCADA: Integrated dispatch triggers real-time status update across central control console.",
      },
    ],
    actions: [
      { id: "act_work_order", label: "Generate Operations Directive", type: "create_work_order", primary: true, payload: { woId: `WO-SYS-${Math.floor(Math.random() * 8900 + 1000)}`, asset: "NeuraGrid Platform Core", priority: "NORMAL", estCost: "$0" } },
      { id: "act_notify", label: "Notify Central Command", type: "notify_ops", payload: { channel: "Operations Control Room", priority: "NORMAL" } },
    ],
  };
}
