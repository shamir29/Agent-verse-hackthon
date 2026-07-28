const axios = require('axios');

const WEATHER_API_KEY = process.env.WEATHER_API_KEY || '';

// Base mock calculations to represent a specific coordinate's character
function getCoordFingerprint(lat, lon) {
  const latVal = Math.sin(lat * 100);
  const lonVal = Math.cos(lon * 100);
  
  const isUrban = (latVal + lonVal) > 0.3;
  const baseAqi = isUrban ? 80 + Math.round(Math.abs(latVal) * 90) : 25 + Math.round(Math.abs(lonVal) * 35);
  const baseNoise = isUrban ? 58 + Math.round(Math.abs(lonVal) * 18) : 38 + Math.round(Math.abs(latVal) * 10);
  const baseCo2 = isUrban ? 418 + Math.round(Math.abs(latVal) * 20) : 405 + Math.round(Math.abs(lonVal) * 8);
  
  return { isUrban, baseAqi, baseNoise, baseCo2 };
}

// Generate wildfires deterministically based on coordinates
function getSimulatedWildfires(lat, lon, aqi) {
  const fires = [];
  // Only trigger simulated fires if coordinates match certain criteria or AQI is elevated (> 85)
  const isDryArea = (Math.sin(lat * 50) + Math.cos(lon * 50)) > 0.5;
  
  if (isDryArea && aqi > 85) {
    fires.push({
      id: 'firms-1',
      name: 'Forest Fire Corridor',
      lat: parseFloat((parseFloat(lat) + 0.018).toFixed(4)),
      lon: parseFloat((parseFloat(lon) + 0.022).toFixed(4)),
      frp: 185.4, // Fire Radiative Power (MW)
      confidence: 92 // confidence %
    });
    
    // Add second minor hotspot
    if (aqi > 140) {
      fires.push({
        id: 'firms-2',
        name: 'Secondary Thermal Spot',
        lat: parseFloat((parseFloat(lat) - 0.015).toFixed(4)),
        lon: parseFloat((parseFloat(lon) - 0.028).toFixed(4)),
        frp: 62.1,
        confidence: 78
      });
    }
  }
  return fires;
}

// Highly realistic mock generator that varies by time of day, weather conditions, and coordinates
function generateMockData(lat, lon, locationName = 'Simulated Location') {
  const { isUrban, baseAqi, baseNoise, baseCo2 } = getCoordFingerprint(lat, lon);
  const now = new Date();
  const hour = now.getHours();

  // Traffic fluctuations (peaks at 8 AM and 6 PM)
  const rushHourFactor = Math.exp(-Math.pow(hour - 8, 2) / 6) + Math.exp(-Math.pow(hour - 18, 2) / 6);
  const trafficFactor = rushHourFactor * 0.4 + 0.8; 
  
  // Diurnal weather behavior
  const tempFactor = Math.sin((hour - 6) * Math.PI / 12); 
  const temp = Math.round(22 + tempFactor * 7 + (Math.random() * 2 - 1));
  const humidity = Math.round(62 - tempFactor * 18 + (Math.random() * 4 - 2));
  
  const windSpeed = parseFloat((2.5 + Math.random() * 5.5).toFixed(1));
  const windDeg = Math.round((Math.abs(lat * lon * 50) % 360));
  const windDispersion = 1 - (windSpeed - 2.5) * 0.05; 

  // Final composite values
  const aqi = Math.max(5, Math.round(baseAqi * trafficFactor * windDispersion + (Math.random() * 8 - 4)));
  const co2 = Math.max(350, Math.round((baseCo2 + (rushHourFactor * 15)) * (1.0 + (temp - 22) * 0.001) + (Math.random() * 5 - 2.5)));
  const noise = Math.max(30, Math.round(baseNoise * (trafficFactor * 0.9 + 0.1) + (Math.random() * 4 - 2)));

  // Detailed pollutant breakdown
  const pm25 = parseFloat((aqi * 0.48 + Math.random() * 2).toFixed(1));
  const pm10 = parseFloat((aqi * 0.72 + Math.random() * 4).toFixed(1));
  const no2 = parseFloat((aqi * 0.38 + Math.random() * 1.5).toFixed(1));
  const o3 = parseFloat((35 + tempFactor * 22 + Math.random() * 4).toFixed(1)); 
  const so2 = parseFloat((aqi * 0.07 + Math.random() * 0.3).toFixed(1));

  // UV Index calculation (peaks during noon hours: 10 AM to 3 PM)
  const sunElevation = Math.max(0, Math.sin((hour - 6) * Math.PI / 12)); // 0 to 1
  const uvIndex = Math.max(0, Math.round(sunElevation * 9.5 + (Math.random() * 1.5 - 0.75)));

  // Pollen count (grains/m³) - higher in rural green areas, dry days, and afternoons
  const pollenMult = isUrban ? 0.6 : 1.4;
  const drynessMult = (100 - humidity) / 50; // higher pollen on dry days
  const treePollen = Math.round(Math.max(0, (25 + Math.sin(hour * Math.PI / 12) * 15) * pollenMult * drynessMult));
  const grassPollen = Math.round(Math.max(0, (12 + Math.sin(hour * Math.PI / 12) * 8) * pollenMult * drynessMult));
  const weedPollen = Math.round(Math.max(0, (6 + Math.sin(hour * Math.PI / 12) * 4) * pollenMult * drynessMult));

  const fires = getSimulatedWildfires(lat, lon, aqi);

  return {
    locationName,
    lat: parseFloat(lat),
    lon: parseFloat(lon),
    timestamp: Date.now(),
    aqi,
    co2,
    noise,
    pm25,
    pm10,
    no2,
    o3,
    so2,
    temp,
    humidity,
    windSpeed,
    windDeg,
    uvIndex,
    pollen: {
      tree: treePollen,
      grass: grassPollen,
      weed: weedPollen
    },
    fires
  };
}

async function fetchFromAPIs(lat, lon, locationName) {
  if (!WEATHER_API_KEY) {
    return generateMockData(lat, lon, locationName);
  }

  try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
    const weatherRes = await axios.get(weatherUrl);
    const weather = weatherRes.data;

    let aqiData = null;
    try {
      const aqiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;
      const aqiRes = await axios.get(aqiUrl);
      if (aqiRes.data && aqiRes.data.list && aqiRes.data.list.length > 0) {
        aqiData = aqiRes.data.list[0];
      }
    } catch (aqiErr) {
      console.warn('OpenWeatherMap Air Pollution API failed, falling back to mock AQI:', aqiErr.message);
    }

    const temp = Math.round(weather.main.temp);
    const humidity = weather.main.humidity;
    const windSpeed = weather.wind.speed;
    const windDeg = weather.wind.deg;

    let aqi, pm25, pm10, no2, o3, so2;
    if (aqiData) {
      const owmIndexToAqiScale = [0, 25, 75, 125, 175, 250];
      const index = aqiData.main.aqi; 
      aqi = Math.round(owmIndexToAqiScale[index] + (Math.random() * 20 - 10));

      const comps = aqiData.components;
      pm25 = comps.pm2_5;
      pm10 = comps.pm10;
      no2 = comps.no2;
      o3 = comps.o3;
      so2 = comps.so2;
    } else {
      const finger = getCoordFingerprint(lat, lon);
      const windDispersion = 1 - (windSpeed - 2.5) * 0.05;
      aqi = Math.max(5, Math.round(finger.baseAqi * windDispersion + (Math.random() * 10 - 5)));
      pm25 = parseFloat((aqi * 0.48 + Math.random() * 2).toFixed(1));
      pm10 = parseFloat((aqi * 0.72 + Math.random() * 4).toFixed(1));
      no2 = parseFloat((aqi * 0.38 + Math.random() * 1.5).toFixed(1));
      o3 = parseFloat((35 + Math.random() * 20).toFixed(1));
      so2 = parseFloat((aqi * 0.07 + Math.random() * 0.3).toFixed(1));
    }

    const finger = getCoordFingerprint(lat, lon);
    const now = new Date();
    const hour = now.getHours();
    const rushHourFactor = Math.exp(-Math.pow(hour - 8, 2) / 6) + Math.exp(-Math.pow(hour - 18, 2) / 6);
    
    const co2 = Math.max(350, Math.round((finger.baseCo2 + (rushHourFactor * 15)) + (Math.random() * 4 - 2)));
    const noise = Math.max(30, Math.round(finger.baseNoise * (rushHourFactor * 0.4 + 0.8) + (Math.random() * 3 - 1.5)));

    // Generate UV Index & Pollen Mock overlays correlated with Weather results
    const sunElevation = Math.max(0, Math.sin((hour - 6) * Math.PI / 12));
    const uvIndex = Math.max(0, Math.round(sunElevation * 9.5 + (Math.random() * 1.5 - 0.75)));

    const pollenMult = finger.isUrban ? 0.6 : 1.4;
    const drynessMult = (100 - humidity) / 50;
    const treePollen = Math.round(Math.max(0, (25 + Math.sin(hour * Math.PI / 12) * 15) * pollenMult * drynessMult));
    const grassPollen = Math.round(Math.max(0, (12 + Math.sin(hour * Math.PI / 12) * 8) * pollenMult * drynessMult));
    const weedPollen = Math.round(Math.max(0, (6 + Math.sin(hour * Math.PI / 12) * 4) * pollenMult * drynessMult));

    const fires = getSimulatedWildfires(lat, lon, aqi);

    return {
      locationName: weather.name || locationName,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      timestamp: Date.now(),
      aqi,
      co2,
      noise,
      pm25,
      pm10,
      no2,
      o3,
      so2,
      temp,
      humidity,
      windSpeed,
      windDeg,
      uvIndex,
      pollen: {
        tree: treePollen,
        grass: grassPollen,
        weed: weedPollen
      },
      fires
    };
  } catch (err) {
    console.error('Error fetching from live OpenWeatherMap API:', err.message);
    return generateMockData(lat, lon, locationName);
  }
}

module.exports = {
  fetchPollutionData: fetchFromAPIs,
  generateMockData
};
