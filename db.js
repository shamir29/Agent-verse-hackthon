const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'data.json');

// Initialize DB schema
const defaultDb = {
  readings: [],
  searches: [],
  profile: {
    asthma: false,
    allergies: false,
    heartDisease: false,
    elderly: false,
    pregnant: false
  },
  thresholds: {
    aqiEnabled: true,
    aqiLimit: 120,
    noiseEnabled: false,
    noiseLimit: 75,
    co2Enabled: false,
    co2Limit: 500
  },
  alerts: []
};

// Seed cities coordinates
const SEED_CITIES = [
  { name: 'New York', lat: 40.7128, lon: -74.0060, baseAqi: 45, baseCo2: 415, baseNoise: 55 },
  { name: 'London', lat: 51.5074, lon: -0.1278, baseAqi: 35, baseCo2: 412, baseNoise: 50 },
  { name: 'Delhi', lat: 28.6139, lon: 77.2090, baseAqi: 165, baseCo2: 435, baseNoise: 72 },
  { name: 'Tokyo', lat: 35.6762, lon: 139.6503, baseAqi: 38, baseCo2: 410, baseNoise: 48 },
  { name: 'Sydney', lat: -33.8688, lon: 151.2093, baseAqi: 25, baseCo2: 408, baseNoise: 42 }
];

function initDb() {
  if (!fs.existsSync(DB_PATH)) {
    console.log('Database file does not exist. Seeding historical readings...');
    const seededReadings = [];
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    // Seed 24 hours of data for each city
    SEED_CITIES.forEach(city => {
      for (let i = 24; i >= 0; i--) {
        const timestamp = now - i * oneHour;
        const hour = new Date(timestamp).getHours();
        
        const trafficFactor = Math.sin((hour - 8) * Math.PI / 6) + Math.sin((hour - 17) * Math.PI / 6);
        const dailyVariation = trafficFactor * 0.15 + 1.0; 

        const aqi = Math.round(city.baseAqi * dailyVariation + (Math.random() * 5 - 2.5));
        const co2 = Math.round(city.baseCo2 + (trafficFactor * 8) + (Math.random() * 4 - 2));
        const noise = Math.round(city.baseNoise + (trafficFactor * 12) + (Math.random() * 3 - 1.5));
        
        const temp = Math.round(20 + Math.sin((hour - 14) * Math.PI / 12) * 5 + (Math.random() * 2 - 1));
        const humidity = Math.round(60 - Math.sin((hour - 14) * Math.PI / 12) * 15 + (Math.random() * 6 - 3));
        const windSpeed = parseFloat((3.0 + Math.random() * 4).toFixed(1));
        const windDeg = Math.round(Math.random() * 360);

        const pm25 = parseFloat((aqi * 0.45 + Math.random() * 3).toFixed(1));
        const pm10 = parseFloat((aqi * 0.75 + Math.random() * 5).toFixed(1));
        const no2 = parseFloat((aqi * 0.35 + Math.random() * 2).toFixed(1));
        const o3 = parseFloat((40 + Math.sin((hour - 14) * Math.PI / 12) * 20 + Math.random() * 5).toFixed(1));
        const so2 = parseFloat((aqi * 0.08 + Math.random() * 0.5).toFixed(1));

        seededReadings.push({
          locationName: city.name,
          lat: city.lat,
          lon: city.lon,
          timestamp,
          aqi: Math.max(1, aqi),
          co2: Math.max(350, co2),
          noise: Math.max(30, noise),
          pm25: Math.max(0.1, pm25),
          pm10: Math.max(0.1, pm10),
          no2: Math.max(0.1, no2),
          o3: Math.max(0.1, o3),
          so2: Math.max(0.1, so2),
          temp,
          humidity,
          windSpeed,
          windDeg
        });
      }
    });

    const initialData = {
      ...defaultDb,
      readings: seededReadings,
      searches: SEED_CITIES.map(c => ({ name: c.name, lat: c.lat, lon: c.lon }))
    };

    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
    console.log(`Database seeded with ${seededReadings.length} readings.`);
  } else {
    // Schema migration check: ensure keys exist
    const current = readData();
    let updated = false;
    
    if (!current.profile) { current.profile = defaultDb.profile; updated = true; }
    if (!current.thresholds) { current.thresholds = defaultDb.thresholds; updated = true; }
    if (!current.alerts) { current.alerts = defaultDb.alerts; updated = true; }
    
    if (updated) {
      writeData(current);
      console.log('Database schema successfully migrated.');
    }
  }
}

function readData() {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading database file:', err);
    return defaultDb;
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing to database file:', err);
  }
}

const db = {
  init: initDb,
  
  addReading: (reading) => {
    const data = readData();
    data.readings.push(reading);
    
    // Retain readings long-term (e.g. 365 days / 1 year)
    const cutoff = Date.now() - 365 * 24 * 60 * 60 * 1000;
    data.readings = data.readings.filter(r => r.timestamp > cutoff);
    
    writeData(data);
  },

  getReadings: (lat, lon, limit = 100) => {
    const data = readData();
    const THRESHOLD = 0.15;
    const filtered = data.readings.filter(r => {
      return Math.abs(r.lat - lat) < THRESHOLD && Math.abs(r.lon - lon) < THRESHOLD;
    });

    filtered.sort((a, b) => b.timestamp - a.timestamp);
    return filtered.slice(0, limit).reverse();
  },

  getAllReadings: () => {
    const data = readData();
    return data.readings;
  },

  getSearchHistory: () => {
    const data = readData();
    return data.searches;
  },

  addSearch: (name, lat, lon) => {
    const data = readData();
    const exists = data.searches.some(s => s.name.toLowerCase() === name.toLowerCase());
    if (!exists) {
      data.searches.push({ name, lat, lon });
      writeData(data);
    }
  },

  // User Profile
  getProfile: () => {
    const data = readData();
    return data.profile || defaultDb.profile;
  },

  updateProfile: (profile) => {
    const data = readData();
    data.profile = { ...data.profile, ...profile };
    writeData(data);
    return data.profile;
  },

  // Alert Settings
  getThresholds: () => {
    const data = readData();
    return data.thresholds || defaultDb.thresholds;
  },

  updateThresholds: (thresholds) => {
    const data = readData();
    data.thresholds = { ...data.thresholds, ...thresholds };
    writeData(data);
    return data.thresholds;
  },

  // Alert Log
  getAlerts: () => {
    const data = readData();
    return data.alerts || [];
  },

  addAlert: (alert) => {
    const data = readData();
    if (!data.alerts) data.alerts = [];
    
    // Prevent duplicate alert logs within short time window (e.g. 5 mins) for same metric
    const fiveMinutes = 5 * 60 * 1000;
    const isDuplicate = data.alerts.some(a => 
      a.metric === alert.metric && 
      (Date.now() - a.timestamp) < fiveMinutes
    );

    if (!isDuplicate) {
      data.alerts.push({
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        read: false,
        ...alert
      });
      
      // Limit alert log history to last 50 entries
      if (data.alerts.length > 50) {
        data.alerts.shift();
      }
      
      writeData(data);
      return true;
    }
    return false;
  },

  markAlertsAsRead: () => {
    const data = readData();
    if (data.alerts) {
      data.alerts.forEach(a => a.read = true);
      writeData(data);
    }
    return data.alerts || [];
  }
};

module.exports = db;
