require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const db = require('./db');
const apiService = require('./services/apiService');
const predictor = require('./services/predictor');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database
db.init();

// Middleware
app.use(cors());
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Helper: Check reading metrics against user thresholds and record alerts
function checkThresholdsAndLogAlerts(reading) {
  try {
    const thresholds = db.getThresholds();
    
    if (thresholds.aqiEnabled && reading.aqi > thresholds.aqiLimit) {
      db.addAlert({
        metric: 'AQI',
        value: reading.aqi,
        threshold: thresholds.aqiLimit,
        location: reading.locationName,
        message: `Air Quality Index (AQI) exceeded threshold of ${thresholds.aqiLimit} at ${reading.locationName}. Current: ${reading.aqi} (US-AQI)`
      });
    }

    if (thresholds.noiseEnabled && reading.noise > thresholds.noiseLimit) {
      db.addAlert({
        metric: 'Noise',
        value: reading.noise,
        threshold: thresholds.noiseLimit,
        location: reading.locationName,
        message: `Noise pollution exceeded threshold of ${thresholds.noiseLimit} dB at ${reading.locationName}. Current: ${reading.noise} dB`
      });
    }

    if (thresholds.co2Enabled && reading.co2 > thresholds.co2Limit) {
      db.addAlert({
        metric: 'CO2',
        value: reading.co2,
        threshold: thresholds.co2Limit,
        location: reading.locationName,
        message: `CO₂ carbon concentration exceeded threshold of ${thresholds.co2Limit} ppm at ${reading.locationName}. Current: ${reading.co2} ppm`
      });
    }
  } catch (err) {
    console.error('Error checking thresholds:', err.message);
  }
}

// Endpoint 1: Get Current Pollution & Weather Conditions
app.get('/api/pollution', async (req, res) => {
  const { lat, lon, name } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude (lat) and Longitude (lon) are required' });
  }

  try {
    const locationName = name || `Coord (${parseFloat(lat).toFixed(4)}, ${parseFloat(lon).toFixed(4)})`;
    const reading = await apiService.fetchPollutionData(lat, lon, locationName);
    
    // Save to historical database
    db.addReading(reading);

    // Cross-reference thresholds and log alerts
    checkThresholdsAndLogAlerts(reading);

    res.json(reading);
  } catch (error) {
    console.error('Error in /api/pollution:', error.message);
    res.status(500).json({ error: 'Failed to retrieve pollution data' });
  }
});

// Endpoint 2: Get Location History
app.get('/api/history', (req, res) => {
  const { lat, lon, limit } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude (lat) and Longitude (lon) are required' });
  }

  try {
    const history = db.getReadings(parseFloat(lat), parseFloat(lon), limit ? parseInt(limit) : 100);
    res.json(history);
  } catch (error) {
    console.error('Error in /api/history:', error.message);
    res.status(500).json({ error: 'Failed to retrieve history' });
  }
});

// Endpoint 3: Get 24-Hour Forecast
app.get('/api/forecast', async (req, res) => {
  const { lat, lon, name } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude (lat) and Longitude (lon) are required' });
  }

  try {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);
    const locationName = name || `Coord (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;

    // Fetch current conditions
    const currentReading = await apiService.fetchPollutionData(latitude, longitude, locationName);
    const history = db.getReadings(latitude, longitude, 24);
    const forecasts = predictor.generateForecast(currentReading, history);

    res.json({
      current: currentReading,
      forecasts
    });
  } catch (error) {
    console.error('Error in /api/forecast:', error.message);
    res.status(500).json({ error: 'Failed to retrieve forecast' });
  }
});

// Endpoint 4: Geocoding search (free OpenStreetMap Nominatim API)
app.get('/api/geocode', async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim() === '') {
    return res.json([]);
  }

  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5&addressdetails=1`;
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Pollution-AI-Platform-Agentic/1.0 (vishal.krishnan.s.edu@gmail.com)'
      }
    });

    const results = response.data.map(item => {
      const nameParts = [];
      if (item.address.city) nameParts.push(item.address.city);
      else if (item.address.town) nameParts.push(item.address.town);
      else if (item.address.village) nameParts.push(item.address.village);
      else if (item.address.suburb) nameParts.push(item.address.suburb);
      
      if (item.address.state) nameParts.push(item.address.state);
      if (item.address.country) nameParts.push(item.address.country);

      const displayName = nameParts.length > 0 ? nameParts.join(', ') : item.display_name;

      return {
        name: displayName,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon)
      };
    });

    res.json(results);
  } catch (error) {
    console.warn('Geocoding API failed, falling back to static local search:', error.message);
    const staticCities = db.getSearchHistory();
    const query = q.toLowerCase();
    const filtered = staticCities.filter(c => c.name.toLowerCase().includes(query));
    res.json(filtered);
  }
});

// Endpoint 5: Get & Save Search History
app.get('/api/search/history', (req, res) => {
  try {
    const history = db.getSearchHistory();
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});

app.post('/api/search', (req, res) => {
  const { name, lat, lon } = req.body;

  if (!name || lat === undefined || lon === undefined) {
    return res.status(400).json({ error: 'Name, lat, and lon are required' });
  }

  try {
    db.addSearch(name, parseFloat(lat), parseFloat(lon));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save search' });
  }
});

// Endpoint 6: User Health Profiles
app.get('/api/profile', (req, res) => {
  res.json(db.getProfile());
});

app.post('/api/profile', (req, res) => {
  const updated = db.updateProfile(req.body);
  res.json(updated);
});

// Endpoint 7: Alert Thresholds
app.get('/api/thresholds', (req, res) => {
  res.json(db.getThresholds());
});

app.post('/api/thresholds', (req, res) => {
  const updated = db.updateThresholds(req.body);
  res.json(updated);
});

// Endpoint 8: Alert Logs list
app.get('/api/alerts', (req, res) => {
  res.json(db.getAlerts());
});

app.post('/api/alerts/read', (req, res) => {
  const alerts = db.markAlertsAsRead();
  res.json(alerts);
});

// Endpoint 10: Historical Trends comparisons
app.get('/api/trends', (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude (lat) and Longitude (lon) are required' });
  }

  try {
    const history = db.getReadings(parseFloat(lat), parseFloat(lon), 200); // get larger history block
    const all = db.getAllReadings();
    
    // Sort all global readings to find worst days this year
    const sortedWorst = [...all]
      .sort((a, b) => b.aqi - a.aqi)
      .slice(0, 10) // top 10 worst entries
      .map(entry => ({
        locationName: entry.locationName,
        lat: entry.lat,
        lon: entry.lon,
        aqi: entry.aqi,
        timestamp: entry.timestamp,
        dateString: new Date(entry.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
      }));

    res.json({
      locationHistory: history,
      worstDays: sortedWorst
    });
  } catch (error) {
    console.error('Error in /api/trends:', error.message);
    res.status(500).json({ error: 'Failed to retrieve trends data' });
  }
});

// Basic Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Pollution AI Server listening on port ${PORT}`);
});
