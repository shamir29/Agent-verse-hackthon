// Clean Conversational AI Assistant Service for NeuraGrid AI Operations

export function generateAssistantReply(query: string): string {
  const lower = query.toLowerCase().trim();

  // Water & Leaks
  if (lower.includes("water") || lower.includes("leak") || lower.includes("reservoir") || lower.includes("pipe") || lower.includes("poondi") || lower.includes("chembarambakkam")) {
    if (lower.includes("reservoir") || lower.includes("capacity") || lower.includes("storage")) {
      return `### Metropolitan Water Reservoir Status

Here is the live storage telemetry across all 6 main city reservoirs:

- **Chembarambakkam Reservoir**: **81% full** (3,645 ML capacity) — Inflow: *340 cusecs* [GOOD]
- **Redhills (Puzhal) Reservoir**: **74% full** (3,300 ML capacity) — Inflow: *210 cusecs* [GOOD]
- **Poondi Reservoir**: **68% full** (3,231 ML capacity) — Inflow: *120 cusecs* [NOMINAL]
- **Veeranam Lake**: **56% full** (1,465 ML capacity) — Inflow: *80 cusecs* [NOMINAL]
- **Thervoy Kandigai**: **49% full** (500 ML capacity) — Inflow: *30 cusecs* [WARNING]
- **Cholavaram Reservoir**: **42% full** (1,081 ML capacity) — Inflow: *45 cusecs* [WARNING]

**Total Potable Water Storage**: **13,222 ML** (81% nominal capacity). Trunk supply lines are operating within standard parameters.`;
    }

    return `### Water Leak Detection & Pipeline Inspection Report

SCADA hydraulic gradient analysis has identified **2 active pipeline leak locations**:

1. **Poondi Feeder Segment 4** (Lat 13.18, Lng 79.91)
   - **Severity**: CRITICAL (Priority P1)
   - **Estimated Water Loss**: **280 L/min**
   - **Affected Line**: 450mm Ductile Iron Main #P4
   - **Estimated Repair Time**: 3.5 hours ($3,200 cost)
   - **Action Taken**: Motorized valve SV-104 isolated; pressure bypass SV-105 opened to prevent residential water outage.

2. **Guindy Industrial Main #12** (Lat 13.01, Lng 80.21)
   - **Severity**: HIGH (Priority P2)
   - **Estimated Water Loss**: **140 L/min**
   - **Affected Line**: 300mm PVC Sub-line #G12
   - **Action Taken**: Maintenance Team Alpha dispatched for leak clamping.

*Total Potable Water Storage*: **13,222 ML** across Chembarambakkam, Redhills, Poondi, and Cholavaram reservoirs. Automated load reduction has been requested for Pump Station #4 to prevent motor burnout.`;
  }

  // Power Grid & Substations
  if (lower.includes("power") || lower.includes("substation") || lower.includes("grid") || lower.includes("adyar") || lower.includes("load") || lower.includes("voltage")) {
    return `### Power Grid & Smart Substation Telemetry Report

Telemetry monitoring across **12 Chennai Metro Substations** indicates heavy peak load in the Adyar sector:

- **Adyar Central Hub**: **98.4% Load** (21.1 kV busbar voltage) — **CRITICAL OVERLOAD** on Transformer T-2 (84.2°C thermal warning).
- **Panagal Park Substation**: **91.8% Load** (21.6 kV) — **WARNING** state.
- **Guindy Industrial Hub**: **84.6% Load** (21.9 kV) — **WARNING** state.
- **Anna Nagar Substation**: **72.3% Load** (22.4 kV) — NOMINAL.
- **Velachery Substation**: **68.0% Load** (22.5 kV) — NOMINAL.
- **IIT Campus Substation**: **54.1% Load** (22.8 kV) — NOMINAL (15 MW headroom available).

**Recommended Directive**: Reroute **15 MW** from Adyar Central to IIT Campus Substation to reduce transformer load to 78% and prevent automatic breaker trips across 45,000 residential connections. BESS battery backup is standing by at 84.5% capacity.`;
  }

  // Air Quality & Environment
  if (lower.includes("aqi") || lower.includes("air") || lower.includes("pollution") || lower.includes("manali") || lower.includes("pm2.5")) {
    return `### Environmental Air Quality (AQI) Report

Laser optical sensors monitoring **32 environmental nodes** have detected an industrial emission surge:

- **Manali Industrial Zone (AQI-88)**: **AQI 312** (PM2.5: **284 µg/m³**) — **HAZARDOUS**. Particulate plume is dispersing SSW at 14.2 km/h.
- **Tiruvottiyur Highway (AQI-42)**: **AQI 184** (PM2.5: **112 µg/m³**) — UNHEALTHY.
- **Kathipara Junction (AQI-04)**: **AQI 145** (PM2.5: **85 µg/m³**) — MODERATE.
- **Guindy Eco-Park (AQI-19)**: **AQI 62** (PM2.5: **28 µg/m³**) — GOOD.

**Operational Actions Initiated**:
1. Industrial stack scrubbing directive issued for Manali Sector 3 Petrochemical Plant.
2. Heavy diesel freight truck traffic diverted from Tiruvottiyur Highway to Outer Ring Road.
3. Pre-alert broadcast sent to local medical clinics for respiratory emergency readiness.`;
  }

  // EV Mobility & Traffic
  if (lower.includes("ev") || lower.includes("traffic") || lower.includes("mobility") || lower.includes("charger") || lower.includes("charging")) {
    return `### EV Fleet Infrastructure & Mobility Report

Monitoring **48 DC Fast-Charging Stations** (150 kW DC) and **128 CCTV Edge AI Traffic Nodes**:

- **Active Charging Stations**: 48 nodes operating across North & South Zones.
- **Current Peak Power Draw**: **7.2 MW** (Peak demand surge at Anna Nagar & Guindy CyberCity stations).
- **Average Charging Speed**: 120 kW per active vehicle.
- **Available Feeder Headroom**: 3.4 MW.

**Smart Directive**: Dynamic load throttling enabled, adjusting output to 100 kW during peak feeder load to maintain grid stability without delaying user charge cycles.`;
  }

  // Healthcare & EMS
  if (lower.includes("hospital") || lower.includes("emergency") || lower.includes("ems") || lower.includes("ambulance") || lower.includes("health")) {
    return `### Healthcare EMS & Emergency Operations Report

Telemetry status for **16 Major Metropolitan Hospitals** and emergency dispatch:

- **Hospitals Monitored**: 16 medical centers (Apollo Greams Road, Rajiv Gandhi Govt General, MIOT International, etc.).
- **Available Emergency ICU Beds**: **142 beds** open.
- **Active Ambulance Fleet**: **42 vehicles** deployed on active corridors.
- **Emergency Power Backup**: **100% Standby Generator Readiness** verified.

**Priority Action**: Green wave signal timing cleared for ambulance corridors, reducing average emergency transit time by 6.5 minutes.`;
  }

  // Default / General Response
  return `Hello. I am NeuraGrid AI Operations Copilot, monitoring live telemetry across all 6 smart city domains:

1. **Power Grid**: 12 substations monitored (Adyar Central currently at 98.4% peak load).
2. **Water Infrastructure**: 6 main reservoirs (13,222 ML total storage) and trunk pipeline leak detection.
3. **Environmental Telemetry**: 32 optical PM2.5 laser sensors (Manali Industrial AQI monitored).
4. **EV Mobility**: 48 DC fast-charging stations and 128 traffic optical density nodes.
5. **Healthcare EMS**: 16 major hospitals and ambulance dispatch routing.
6. **3D Digital Twin**: Sub-meter spatial grid mapping and 50-year climate scenario simulator.

How can I assist your operations dispatch today?`;
}
