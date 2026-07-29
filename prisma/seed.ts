import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding NeuraGrid.ai Enterprise Smart City OS data...");

  // Clean existing tables
  await prisma.systemIntegration.deleteMany();
  await prisma.userRecord.deleteMany();
  await prisma.hospitalNode.deleteMany();
  await prisma.eVStation.deleteMany();
  await prisma.airQualitySensor.deleteMany();
  await prisma.wasteZone.deleteMany();
  await prisma.solarArray.deleteMany();
  await prisma.alert.deleteMany();
  await prisma.substation.deleteMany();
  await prisma.reservoir.deleteMany();

  // 1. Substations
  const substations = [
    { name: "Anna Nagar Primary Substation", zone: "Anna Nagar", status: "operational", loadPercent: 78.5, voltageKv: 110.2, lat: 13.0850, lng: 80.2101 },
    { name: "Tower Park Substation", zone: "Anna Nagar", status: "warning", loadPercent: 92.4, voltageKv: 108.5, lat: 13.0880, lng: 80.2150 },
    { name: "Kilpauk Grid Node", zone: "Anna Nagar", status: "operational", loadPercent: 64.1, voltageKv: 111.0, lat: 13.0800, lng: 80.2280 },
    { name: "Adyar Central Substation", zone: "Adyar", status: "critical", loadPercent: 98.7, voltageKv: 103.2, lat: 13.0012, lng: 80.2565 },
    { name: "IIT Campus Substation", zone: "Adyar", status: "operational", loadPercent: 54.3, voltageKv: 110.8, lat: 12.9915, lng: 80.2336 },
    { name: "Besant Nagar Distribution Node", zone: "Adyar", status: "warning", loadPercent: 82.0, voltageKv: 109.1, lat: 13.0001, lng: 80.2670 },
    { name: "T. Nagar Commercial Substation", zone: "T. Nagar", status: "warning", loadPercent: 89.2, voltageKv: 107.8, lat: 13.0418, lng: 80.2341 },
    { name: "Panagal Park Power Hub", zone: "T. Nagar", status: "critical", loadPercent: 96.5, voltageKv: 104.1, lat: 13.0400, lng: 80.2300 },
    { name: "Kodambakkam Feeder Node", zone: "T. Nagar", status: "operational", loadPercent: 48.0, voltageKv: 111.5, lat: 13.0512, lng: 80.2205 },
    { name: "Velachery Main Substation", zone: "Velachery", status: "operational", loadPercent: 71.4, voltageKv: 110.0, lat: 12.9815, lng: 80.2180 },
    { name: "Phoenix Market City Substation", zone: "Velachery", status: "warning", loadPercent: 88.9, voltageKv: 108.0, lat: 12.9910, lng: 80.2170 },
    { name: "Perungudi Industrial Grid", zone: "Velachery", status: "operational", loadPercent: 61.2, voltageKv: 110.5, lat: 12.9650, lng: 80.2410 },
  ];
  for (const s of substations) await prisma.substation.create({ data: s });

  // 2. Reservoirs
  const reservoirs = [
    { name: "Chembarambakkam Lake", levelPercent: 68.4, capacityMl: 3645.0, lat: 13.0112, lng: 80.0578 },
    { name: "Poondi Reservoir", levelPercent: 42.1, capacityMl: 3231.0, lat: 13.1895, lng: 79.9012 },
    { name: "Red Hills (Puzhal) Lake", levelPercent: 81.5, capacityMl: 3300.0, lat: 13.1750, lng: 80.1850 },
    { name: "Cholavaram Reservoir", levelPercent: 35.8, capacityMl: 1081.0, lat: 13.2320, lng: 80.1490 },
    { name: "Porur Lake", levelPercent: 74.2, capacityMl: 1200.0, lat: 13.0350, lng: 80.1580 },
    { name: "Veeranam Supply Link", levelPercent: 52.0, capacityMl: 1465.0, lat: 12.9700, lng: 80.1200 },
  ];
  for (const r of reservoirs) await prisma.reservoir.create({ data: r });

  // 3. Alerts
  const now = new Date();
  const daysAgo = (d: number, h = 0) => new Date(now.getTime() - (d * 24 + h) * 3600 * 1000);
  const alerts = [
    { title: "Voltage Sag & Transformer Overload Warning", category: "power", severity: "critical", status: "open", location: "Adyar Central Substation", assignedTeam: null, createdAt: daysAgo(0, 2) },
    { title: "Major Pipeline Pressure Drop (Leak Suspected)", category: "water", severity: "critical", status: "open", location: "Poondi Supply Line Segment 4", assignedTeam: null, createdAt: daysAgo(0, 4) },
    { title: "High Peak Load Demand Spike Exceeding 95%", category: "power", severity: "critical", status: "assigned", location: "Panagal Park Power Hub", assignedTeam: "Grid Maintenance Delta", createdAt: daysAgo(1, 1) },
    { title: "Elevated PM2.5 Concentration Spikes Detected", category: "air_quality", severity: "high", status: "open", location: "Anna Nagar Roundtana Zone", assignedTeam: null, createdAt: daysAgo(1, 5) },
    { title: "Secondary Substation Transformer Temperature High", category: "power", severity: "high", status: "assigned", location: "Tower Park Substation", assignedTeam: "Rapid Power Response 2", createdAt: daysAgo(2, 3) },
    { title: "Water Reservoir Level Below 40% Threshold", category: "water", severity: "high", status: "open", location: "Cholavaram Reservoir", assignedTeam: null, createdAt: daysAgo(2, 8) },
    { title: "Feeder Cable Insulation Degradation Alert", category: "maintenance", severity: "high", status: "assigned", location: "T. Nagar Commercial Substation", assignedTeam: "Electrical Inspection Unit", createdAt: daysAgo(3, 2) },
    { title: "Heavy Rainfall Storm Water Drainage Overflow Risk", category: "weather", severity: "medium", status: "open", location: "Velachery Bypass Corridor", assignedTeam: null, createdAt: daysAgo(3, 9) },
    { title: "Distribution Pipe Joint Seepage Reported", category: "water", severity: "medium", status: "assigned", location: "Besant Nagar Sector 3", assignedTeam: "Metro Water Team 7", createdAt: daysAgo(4, 1) },
    { title: "Air Quality Sensor Calibration Offset", category: "air_quality", severity: "medium", status: "resolved", location: "Kilpauk Monitoring Station", assignedTeam: "Sensor Ops Team", createdAt: daysAgo(4, 12), resolvedAt: daysAgo(4, 2) },
  ];
  for (const a of alerts) await prisma.alert.create({ data: a });

  // 4. Solar Arrays
  const solarArrays = [
    { name: "Perungudi Solar Park 1", zone: "Velachery", capacityKw: 4500, generationKw: 3950, efficiencyPercent: 91.2, tiltAngleDeg: 28, status: "optimal" },
    { name: "Anna Nagar Rooftop Array", zone: "Anna Nagar", capacityKw: 1200, generationKw: 980, efficiencyPercent: 88.5, tiltAngleDeg: 30, status: "optimal" },
    { name: "IIT Research Park Solar Grid", zone: "Adyar", capacityKw: 2800, generationKw: 2100, efficiencyPercent: 78.4, tiltAngleDeg: 32, status: "degraded" },
    { name: "T. Nagar Commercial Roof Farm", zone: "T. Nagar", capacityKw: 1800, generationKw: 1450, efficiencyPercent: 84.0, tiltAngleDeg: 25, status: "optimal" },
  ];
  for (const s of solarArrays) await prisma.solarArray.create({ data: s });

  // 5. Waste Zones
  const wasteZones = [
    { zoneName: "Anna Nagar Central Sector", binCount: 140, fillLevelPercent: 82.4, status: "overflow_risk" },
    { zoneName: "Adyar Beach Corridor", binCount: 95, fillLevelPercent: 64.0, status: "normal" },
    { zoneName: "T. Nagar Shopping Belt", binCount: 210, fillLevelPercent: 91.5, status: "overflow_risk" },
    { zoneName: "Velachery Tech Park Zone", binCount: 160, fillLevelPercent: 48.2, status: "normal" },
  ];
  for (const w of wasteZones) await prisma.wasteZone.create({ data: w });

  // 6. Air Quality Sensors
  const aqSensors = [
    { location: "Anna Nagar Roundtana", aqi: 142, pm25: 58.4, pm10: 95.0, co2: 520, status: "unhealthy" },
    { location: "Adyar Signal Junction", aqi: 74, pm25: 22.1, pm10: 45.0, co2: 430, status: "moderate" },
    { location: "T. Nagar Bus Terminus", aqi: 168, pm25: 78.0, pm10: 124.0, co2: 610, status: "unhealthy" },
    { location: "IIT Campus Forest Buffer", aqi: 35, pm25: 9.8, pm10: 18.0, co2: 380, status: "good" },
  ];
  for (const aq of aqSensors) await prisma.airQualitySensor.create({ data: aq });

  // 7. EV Charging Stations
  const evStations = [
    { name: "FastCharge Hub Anna Nagar", location: "2nd Avenue Metro", totalChargers: 12, chargersAvailable: 4, powerKw: 150, status: "active" },
    { name: "Adyar EcoCharge Hub", location: "LB Road Corner", totalChargers: 8, chargersAvailable: 1, powerKw: 120, status: "busy" },
    { name: "Panagal Park EV Grid", location: "Usman Road", totalChargers: 16, chargersAvailable: 0, powerKw: 180, status: "busy" },
    { name: "Velachery Metro EV Dock", location: "Bypass Road", totalChargers: 10, chargersAvailable: 7, powerKw: 100, status: "active" },
  ];
  for (const ev of evStations) await prisma.eVStation.create({ data: ev });

  // 8. Hospital Nodes
  const hospitals = [
    { name: "Government General Hospital Node", location: "Park Town", totalBeds: 850, occupiedBeds: 790, emergencyQueue: 14, icuAvailable: 6, status: "busy" },
    { name: "Adyar Specialty Medical Center", location: "Kasturba Nagar", totalBeds: 420, occupiedBeds: 340, emergencyQueue: 4, icuAvailable: 12, status: "normal" },
    { name: "Kilpauk Medical College Hub", location: "EVR High Road", totalBeds: 600, occupiedBeds: 585, emergencyQueue: 22, icuAvailable: 2, status: "critical" },
  ];
  for (const h of hospitals) await prisma.hospitalNode.create({ data: h });

  // 9. User Records (Empty by default until custom admin registration)
  // No fake hardcoded default users seeded

  // 10. System Integrations
  const integrations = [
    { name: "TNEB Power SCADA Gateway", category: "Grid Telemetry", status: "connected", latencyMs: 14 },
    { name: "Metro Water Flow Sensor Mesh", category: "SCADA Link", status: "connected", latencyMs: 22 },
    { name: "IMD Weather Doppler Stream", category: "Weather Radar", status: "connected", latencyMs: 45 },
    { name: "LoRaWAN Pollution Sensor Grid", category: "IoT Gateway", status: "degraded", latencyMs: 180 },
  ];
  for (const i of integrations) await prisma.systemIntegration.create({ data: i });

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
