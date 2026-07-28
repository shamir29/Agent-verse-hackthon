/* WasteFlow AI - Master Data Configuration & Telemetry State (Tamil Nadu Smart Cities Region) */

window.WasteFlowConfig = {
  // Metro City Center Coordinates: Chennai Smart City Operations Region
  cityCenter: [13.0827, 80.2707],
  cityZoom: 12,

  // Smart Bins Dataset (Tamil Nadu Landmarks & Places)
  smartBins: [
    { id: "BIN-101", location: "Marina Beach Promenade, Chennai", lat: 13.0499, lng: 80.2824, type: "Recyclable Plastic", fillLevel: 92, temp: 32, humidity: 75, methane: 14, battery: 88, overflowRisk: "CRITICAL", priorityScore: 98, lastCollection: "14 hrs ago" },
    { id: "BIN-102", location: "T. Nagar Ranganathan Street", lat: 13.0405, lng: 80.2337, type: "Organic Waste", fillLevel: 88, temp: 34, humidity: 78, methane: 48, battery: 72, overflowRisk: "HIGH", priorityScore: 89, lastCollection: "18 hrs ago" },
    { id: "BIN-103", location: "OMR IT Corridor (Sholinganallur)", lat: 12.9010, lng: 80.2279, type: "General Landfill", fillLevel: 45, temp: 31, humidity: 68, methane: 9, battery: 94, overflowRisk: "LOW", priorityScore: 32, lastCollection: "4 hrs ago" },
    { id: "BIN-104", location: "Anna Nagar Tower Park", lat: 13.0850, lng: 80.2100, type: "Paper & Cardboard", fillLevel: 76, temp: 30, humidity: 65, methane: 6, battery: 85, overflowRisk: "MEDIUM", priorityScore: 68, lastCollection: "9 hrs ago" },
    { id: "BIN-105", location: "Guindy Industrial Estate Hub", lat: 13.0100, lng: 80.2120, type: "E-Waste Container", fillLevel: 30, temp: 29, humidity: 60, methane: 3, battery: 99, overflowRisk: "LOW", priorityScore: 18, lastCollection: "2 days ago" },
    { id: "BIN-106", location: "Adyar Signal & Gandhi Nagar", lat: 13.0060, lng: 80.2570, type: "Glass Container", fillLevel: 94, temp: 33, humidity: 72, methane: 12, battery: 64, overflowRisk: "CRITICAL", priorityScore: 96, lastCollection: "22 hrs ago" },
    { id: "BIN-107", location: "Mylapore Kapaleeshwarar Temple Zone", lat: 13.0334, lng: 80.2697, type: "Organic Waste", fillLevel: 82, temp: 33, humidity: 76, methane: 62, battery: 79, overflowRisk: "HIGH", priorityScore: 87, lastCollection: "12 hrs ago" },
    { id: "BIN-108", location: "Velachery Main Road Junction", lat: 12.9800, lng: 80.2220, type: "Recyclable Plastic", fillLevel: 61, temp: 31, humidity: 69, methane: 16, battery: 91, overflowRisk: "MEDIUM", priorityScore: 54, lastCollection: "8 hrs ago" },
    { id: "BIN-109", location: "Tambaram Bus Terminal & Station", lat: 12.9249, lng: 80.1000, type: "General Landfill", fillLevel: 97, temp: 35, humidity: 70, methane: 42, battery: 42, overflowRisk: "CRITICAL", priorityScore: 99, lastCollection: "26 hrs ago" },
    { id: "BIN-110", location: "Egmore Railway Station Complex", lat: 13.0780, lng: 80.2610, type: "Metal & Cans", fillLevel: 41, temp: 31, humidity: 66, methane: 5, battery: 89, overflowRisk: "LOW", priorityScore: 28, lastCollection: "1 day ago" },
    { id: "BIN-111", location: "Koyambedu Wholesale Market", lat: 13.0700, lng: 80.1940, type: "Paper & Cardboard", fillLevel: 85, temp: 32, humidity: 71, methane: 7, battery: 76, overflowRisk: "HIGH", priorityScore: 84, lastCollection: "16 hrs ago" },
    { id: "BIN-112", location: "Porur Junction & Lake Road", lat: 13.0380, lng: 80.1560, type: "Hazardous Waste", fillLevel: 35, temp: 30, humidity: 64, methane: 2, battery: 95, overflowRisk: "LOW", priorityScore: 22, lastCollection: "3 days ago" }
  ],

  // Collection Fleet Dataset (Tamil Nadu Fleet Operations)
  fleet: [
    { id: "TRUCK-01", model: "Ashok Leyland BOSS EV Collector", driver: "K. Saravanan", lat: 13.0450, lng: 80.2750, speed: 28, fuel: 84, capacityUsed: 78, status: "COLLECTING", route: "Route Alpha (Marina Beach & Mylapore)", tripsCompleted: 4, maintenance: "Good (96%)", idleTime: "4 mins" },
    { id: "TRUCK-02", model: "Tata Ultra Electric Waste Hauler", driver: "M. Murugan", lat: 13.0420, lng: 80.2300, speed: 34, fuel: 62, capacityUsed: 42, status: "EN_ROUTE", route: "Route Beta (T. Nagar & Anna Nagar Sector)", tripsCompleted: 3, maintenance: "Good (92%)", idleTime: "2 mins" },
    { id: "TRUCK-03", model: "Mahindra Furio EV", driver: "S. Anbarasan", lat: 12.9050, lng: 80.2250, speed: 0, fuel: 95, capacityUsed: 12, status: "IDLE", route: "Route Gamma (OMR IT Expressway & Velachery)", tripsCompleted: 2, maintenance: "Good (98%)", idleTime: "18 mins" },
    { id: "TRUCK-04", model: "Eicher Pro 2059 E-Tipper", driver: "R. Elangovan", lat: 12.9260, lng: 80.1020, speed: 22, fuel: 39, capacityUsed: 91, status: "RETURNING", route: "Route Delta (Tambaram & Guindy Industrial)", tripsCompleted: 5, maintenance: "Service Due (74%)", idleTime: "6 mins" },
    { id: "TRUCK-05", model: "Tata Ace EV Tipper", driver: "P. Karthik", lat: 13.0720, lng: 80.1960, speed: 30, fuel: 71, capacityUsed: 65, status: "COLLECTING", route: "Route Epsilon (Koyambedu & Porur Metro)", tripsCompleted: 3, maintenance: "Good (90%)", idleTime: "1 min" }
  ],

  // Recycling Facilities (Tamil Nadu Facilities)
  recyclingCenters: [
    { id: "REC-01", name: "Tamil Nadu Eco-Recycling Facility (Manali, Chennai)", lat: 13.1600, lng: 80.2600, incomingTons: 1420, processedTons: 1350, rejectRate: 4.9, efficiency: 95.1, machineHealth: 94, energyKwh: 3420, revenue: "₹42,50,000" },
    { id: "REC-02", name: "Perungudi Waste Recovery Plant (OMR Road)", lat: 12.9600, lng: 80.2400, incomingTons: 2100, processedTons: 1980, rejectRate: 5.7, efficiency: 94.3, machineHealth: 88, energyKwh: 5120, revenue: "₹61,20,000" },
    { id: "REC-03", name: "Coimbatore Eco-Circular Hub (Kurichi Industrial)", lat: 10.9500, lng: 76.9600, incomingTons: 980, processedTons: 945, rejectRate: 3.5, efficiency: 96.4, machineHealth: 99, energyKwh: 2150, revenue: "₹28,40,000" }
  ],

  // Landfills (Tamil Nadu Regional Sites)
  landfills: [
    { id: "LND-01", name: "Kodungaiyur Regional Sanitary Landfill", lat: 13.1400, lng: 80.2700, capacityUsed: 78.4, methanePpm: 420, leachateLevel: "Normal (1.2m)", aqIndex: 42, closureYear: 2038, environmentalRisk: "LOW" },
    { id: "LND-02", name: "Perungudi Integrated Waste Processing Site", lat: 12.9500, lng: 80.2350, capacityUsed: 91.2, methanePpm: 890, leachateLevel: "Elevated (2.8m)", aqIndex: 78, closureYear: 2029, environmentalRisk: "WARNING" }
  ],

  // Transfer Stations (Tamil Nadu Terminals)
  transferStations: [
    { id: "TS-01", name: "Koyambedu Municipal Transfer Terminal", lat: 13.0680, lng: 80.1980, dailyCapacity: 3500, currentLoad: 2400 },
    { id: "TS-02", name: "Alandur Rail Waste Transit Station", lat: 13.0030, lng: 80.2010, dailyCapacity: 4200, currentLoad: 3100 }
  ],

  // Illegal Dumping CCTV Events (Tamil Nadu Locations)
  illegalDumpingEvents: [
    { id: "DUMP-901", location: "ECR Kovalam Bypass Road", lat: 12.7900, lng: 80.2500, time: "12 mins ago", type: "Construction Debris & Drywall", severity: "HIGH", confidence: 96.8, status: "DISPATCH_PENDING", image: "construction_dump.jpg" },
    { id: "DUMP-902", location: "Ennore Creek Peripheral Service Road", lat: 13.2000, lng: 80.3200, time: "45 mins ago", type: "Hazardous Chemical Drums", severity: "CRITICAL", confidence: 98.4, status: "CREW_DISPATCHED", image: "hazardous_dump.jpg" },
    { id: "DUMP-903", location: "Maduravoyal Bypass Service Lane", lat: 13.0600, lng: 80.1600, time: "2 hrs ago", type: "E-Waste & Monitors", severity: "MEDIUM", confidence: 91.2, status: "INVESTIGATING", image: "ewaste_dump.jpg" }
  ],

  // Autonomous AI Agents
  aiAgents: [
    { id: "AGENT-01", name: "Smart Bin Monitoring Agent", status: "ACTIVE", task: "Polling 1,240 ultrasonic sensors in Greater Chennai Corporation", confidence: 99.4, latency: "14ms", health: 100, decision: "Flagged BIN-101 (Marina Beach) and BIN-109 (Tambaram) as critical overflow risk." },
    { id: "AGENT-02", name: "Overflow Prediction Agent", status: "ACTIVE", task: "Running LSTM predictive overflow models", confidence: 97.8, latency: "42ms", health: 99, decision: "Predicted BIN-106 (Adyar) overflow in 2.4 hours based on peak foot traffic." },
    { id: "AGENT-03", name: "Route Optimization Agent", status: "ACTIVE", task: "Re-calculating TSP graph with live OMR traffic", confidence: 98.6, latency: "65ms", health: 100, decision: "Rerouted TRUCK-01 via Marina Beach Road, saving 4.2 km fuel consumption." },
    { id: "AGENT-04", name: "Fleet Management Agent", status: "ACTIVE", task: "Telemetry check for 45 Ashok Leyland & Tata EV haulers", confidence: 99.1, latency: "18ms", health: 98, decision: "Scheduled preventive battery maintenance for TRUCK-04." },
    { id: "AGENT-05", name: "Waste Classification Agent", status: "ACTIVE", task: "YOLOv11 Vision Inference on Manali conveyor #4", confidence: 96.5, latency: "22ms", health: 97, decision: "Classified 1,420 kg recyclables with 96.5% confidence score." },
    { id: "AGENT-06", name: "Illegal Dumping Detection Agent", status: "ACTIVE", task: "Scanning 140 smart city CCTV feeds across Tamil Nadu", confidence: 95.9, latency: "88ms", health: 99, decision: "Detected illegal dumping at Ennore Creek Peripheral Road." },
    { id: "AGENT-07", name: "Recycling Optimization Agent", status: "ACTIVE", task: "Optical sorter calibration & purity optimization", confidence: 98.2, latency: "30ms", health: 100, decision: "Adjusted air-jet nozzle timing, reducing plastic reject rate by 1.4%." },
    { id: "AGENT-08", name: "Landfill Monitoring Agent", status: "ACTIVE", task: "Gas chromatography sensor synthesis", confidence: 99.0, latency: "52ms", health: 96, decision: "Verified methane flaring safety margins at Kodungaiyur." },
    { id: "AGENT-09", name: "Carbon Analytics Agent", status: "ACTIVE", task: "GHG Protocol Scope 1 & 2 audit calculations", confidence: 99.9, latency: "11ms", health: 100, decision: "Logged 14.8 metric tons CO2 saved for today's collection routes." },
    { id: "AGENT-10", name: "Predictive Analytics Agent", status: "ACTIVE", task: "Festival & seasonal waste demand forecasting", confidence: 94.7, latency: "110ms", health: 98, decision: "Forecasted +28% surge in cardboard packaging for Pongal festival season." },
    { id: "AGENT-11", name: "Citizen Complaint Analysis Agent", status: "ACTIVE", task: "NLP sentiment parsing of GCC Namma Chennai civic app reports", confidence: 93.4, latency: "35ms", health: 95, decision: "Correlated 4 complaint tickets to BIN-109 overflow and assigned priority." }
  ],

  // Live Citizen & Emergency Pickup Requests Stream (Tamil Nadu Locations)
  activeRequests: [
    { id: "REQ-701", location: "T. Nagar Ranganathan Street Market", lat: 13.0410, lng: 80.2330, type: "Overflowing Market Waste", time: "2 mins ago" },
    { id: "REQ-702", location: "Anna Nagar 2nd Avenue Junction", lat: 13.0870, lng: 80.2120, type: "Commercial Packaging Waste", time: "7 mins ago" }
  ],

  // Sample Waste Classification Preset Dataset for AI Scanner Demo
  wasteVisionSamples: [
    {
      id: "sample-plastic",
      label: "PET Plastic Water Bottle",
      category: "Plastics (PET 1)",
      confidence: 98.7,
      boxes: [{ label: "PET Plastic Bottle", x: 25, y: 20, w: 50, h: 60 }],
      disposal: "Blue Recycling Bin / Optical Plastics Sorter",
      recyclability: "High (100% Recyclable)",
      image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><rect width='400' height='300' fill='%230F172A'/><path d='M180,60 L220,60 L220,80 L230,100 L230,220 L170,220 L170,100 L180,80 Z' fill='%2338BDF8' opacity='0.7'/><rect x='185' y='120' width='30' height='60' fill='%23FFFFFF' opacity='0.9'/><text x='187' y='155' font-size='10' font-family='sans-serif' fill='%230284C7'>RECYCLE</text></svg>"
    },
    {
      id: "sample-ewaste",
      label: "Circuit Board & Lithium Battery",
      category: "E-Waste / Hazardous",
      confidence: 96.4,
      boxes: [{ label: "PCB Board & Battery", x: 15, y: 15, w: 70, h: 70 }],
      disposal: "Specialized E-Waste Drop-off Facility",
      recyclability: "Specialized Extraction (Precious Metals)",
      image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><rect width='400' height='300' fill='%230F172A'/><rect x='80' y='60' width='240' height='180' fill='%2315803D' rx='8'/><rect x='110' y='90' width='50' height='50' fill='%23334155'/><circle cx='240' cy='120' r='30' fill='%23F59E0B'/><path d='M100,200 L300,200' stroke='%23FACC15' stroke-width='4' stroke-dasharray='8,8'/></svg>"
    },
    {
      id: "sample-organic",
      label: "Compostable Kitchen Scrap",
      category: "Organic Waste",
      confidence: 94.2,
      boxes: [{ label: "Organic Wet Waste", x: 20, y: 25, w: 60, h: 55 }],
      disposal: "Green Wet Waste Plant / Anaerobic Bio-Digester",
      recyclability: "100% Bio-Compostable (Bio-CNG Ready)",
      image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><rect width='400' height='300' fill='%230F172A'/><circle cx='200' cy='150' r='80' fill='%23B45309' opacity='0.8'/><path d='M160,130 C180,100 220,100 240,130 C250,170 210,190 200,200 C190,190 150,170 160,130 Z' fill='%2316A34A'/></svg>"
    }
  ]
};
