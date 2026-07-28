const db = require('../db');

function generateForecast(currentReading, history = []) {
  const forecasts = [];
  const now = new Date(currentReading.timestamp);
  const oneHour = 60 * 60 * 1000;

  // Compute trend (simple linear regression slope) if we have sufficient history
  let aqiTrend = 0;
  let co2Trend = 0;
  let tempTrend = 0;

  if (history.length >= 4) {
    const n = history.length;
    let sumX = 0, sumY_aqi = 0, sumY_co2 = 0, sumY_temp = 0;
    let sumXY_aqi = 0, sumXY_co2 = 0, sumXY_temp = 0;
    let sumXX = 0;

    // Use chronological time indices (0 to n-1)
    history.forEach((h, i) => {
      sumX += i;
      sumXX += i * i;
      sumY_aqi += h.aqi;
      sumY_co2 += h.co2;
      sumY_temp += h.temp;
      sumXY_aqi += i * h.aqi;
      sumXY_co2 += i * h.co2;
      sumXY_temp += i * h.temp;
    });

    const denom = (n * sumXX - sumX * sumX);
    if (denom !== 0) {
      aqiTrend = (n * sumXY_aqi - sumX * sumY_aqi) / denom;
      co2Trend = (n * sumXY_co2 - sumX * sumY_co2) / denom;
      tempTrend = (n * sumXY_temp - sumX * sumY_temp) / denom;
    }

    // Clamp rates of change to prevent extreme deviations
    aqiTrend = Math.max(-2, Math.min(2, aqiTrend));
    co2Trend = Math.max(-1, Math.min(1, co2Trend));
    tempTrend = Math.max(-0.5, Math.min(0.5, tempTrend));
  }

  // Generate projections for the next 24 hours
  for (let i = 1; i <= 24; i++) {
    const targetTime = new Date(currentReading.timestamp + i * oneHour);
    const targetHour = targetTime.getHours();

    // Diurnal factor (traffic rush-hours at 8 AM, 6 PM)
    const rushHourFactor = Math.exp(-Math.pow(targetHour - 8, 2) / 6) + Math.exp(-Math.pow(targetHour - 18, 2) / 6);
    const diurnalPollutionFactor = rushHourFactor * 0.3 - 0.15; // +/- 15% fluctuation
    const diurnalNoiseFactor = rushHourFactor * 15 - 5; // -5 to +10 dB fluctuation

    // Temperature fluctuation (lowest at 5 AM, highest at 3 PM)
    const diurnalTempFactor = Math.sin((targetHour - 9) * Math.PI / 12) * 5; // +/- 5 deg C

    // 1. Calculate AQI forecast
    let forecastedAqi = Math.round(
      currentReading.aqi + 
      (aqiTrend * i) + 
      (currentReading.aqi * diurnalPollutionFactor) + 
      (Math.random() * 4 - 2)
    );
    // Clamp AQI
    forecastedAqi = Math.max(5, forecastedAqi);

    // 2. Calculate CO2 forecast
    let forecastedCo2 = Math.round(
      currentReading.co2 + 
      (co2Trend * i) + 
      (rushHourFactor * 12) + 
      (Math.random() * 2 - 1)
    );
    forecastedCo2 = Math.max(350, forecastedCo2);

    // 3. Calculate Noise forecast
    let forecastedNoise = Math.round(
      currentReading.noise + 
      diurnalNoiseFactor + 
      (Math.random() * 2 - 1)
    );
    forecastedNoise = Math.max(30, forecastedNoise);

    // 4. Calculate Temp forecast
    let forecastedTemp = Math.round(
      currentReading.temp + 
      (tempTrend * i * 0.5) + // slow down trend projection
      diurnalTempFactor + 
      (Math.random() * 1.5 - 0.75)
    );

    // Pollutant calculations relative to AQI
    const pm25 = parseFloat((forecastedAqi * 0.48 + Math.random() * 1.5).toFixed(1));
    const pm10 = parseFloat((forecastedAqi * 0.72 + Math.random() * 3).toFixed(1));
    
    forecasts.push({
      hourOffset: i,
      timeString: targetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: targetTime.getTime(),
      aqi: forecastedAqi,
      co2: forecastedCo2,
      noise: forecastedNoise,
      temp: forecastedTemp,
      pm25: Math.max(0.1, pm25),
      pm10: Math.max(0.1, pm10)
    });
  }

  return forecasts;
}

module.exports = {
  generateForecast
};
