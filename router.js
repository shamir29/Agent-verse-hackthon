const apiService = require('./apiService');

// Calculates intermediate coordinates along a path, displaced by an offset vector to represent different path choices
function generatePathCoordinates(start, end, waypointCount = 12, displaceFactor = 0) {
  const coords = [];
  const latDiff = end.lat - start.lat;
  const lonDiff = end.lon - start.lon;

  // Vector perpendicular to direction (for displacement)
  const perpLat = -lonDiff;
  const perpLon = latDiff;

  for (let i = 0; i <= waypointCount; i++) {
    const fraction = i / waypointCount;
    
    // Base linear interpolation
    let lat = start.lat + latDiff * fraction;
    let lon = start.lon + lonDiff * fraction;

    // Apply arc displacement (peaks in the middle)
    const arc = Math.sin(fraction * Math.PI);
    lat += perpLat * displaceFactor * arc;
    lon += perpLon * displaceFactor * arc;

    // Add tiny jitter for organic look
    if (i > 0 && i < waypointCount) {
      lat += (Math.random() - 0.5) * 0.0005;
      lon += (Math.random() - 0.5) * 0.0005;
    }

    coords.push({ lat, lon });
  }
  return coords;
}

function calculateRouteExposure(coordinates) {
  let totalAqi = 0;
  let totalNoise = 0;
  let totalTemp = 0;

  coordinates.forEach(c => {
    // Generate mock sensor metrics for each coordinate
    const metrics = apiService.generateMockData(c.lat, c.lon);
    totalAqi += metrics.aqi;
    totalNoise += metrics.noise;
    totalTemp += metrics.temp;
  });

  const count = coordinates.length;
  const avgAqi = Math.round(totalAqi / count);
  const avgNoise = Math.round(totalNoise / count);
  const avgTemp = parseFloat((totalTemp / count).toFixed(1));

  // Compute pollution exposure score: lower is better
  const exposureScore = Math.round(avgAqi * 0.4 + avgNoise * 0.35 + (avgTemp - 15) * 0.5);

  return {
    avgAqi,
    avgNoise,
    avgTemp,
    exposureScore: Math.max(5, exposureScore)
  };
}

const router = {
  calculateRoutes: (startLat, startLon, endLat, endLon) => {
    const start = { lat: parseFloat(startLat), lon: parseFloat(startLon) };
    const end = { lat: parseFloat(endLat), lon: parseFloat(endLon) };

    // Distance calculation
    const R = 6371; // Earth radius in km
    const dLat = (end.lat - start.lat) * Math.PI / 180;
    const dLon = (end.lon - start.lon) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(start.lat * Math.PI / 180) * Math.cos(end.lat * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const directDistance = R * c; // in km

    // Define three routes with different displacements
    // Route 1: Green Path (curves towards parks, low noise/pollution)
    const greenCoords = generatePathCoordinates(start, end, 12, -0.15);
    const greenMetrics = calculateRouteExposure(greenCoords);
    // Artificially scale green values to represent park pathways
    greenMetrics.avgAqi = Math.max(5, Math.round(greenMetrics.avgAqi * 0.65));
    greenMetrics.avgNoise = Math.max(30, Math.round(greenMetrics.avgNoise * 0.7));
    greenMetrics.exposureScore = Math.max(5, Math.round(greenMetrics.avgAqi * 0.4 + greenMetrics.avgNoise * 0.35));

    // Route 2: Standard Path (direct avenues)
    const standardCoords = generatePathCoordinates(start, end, 10, 0.0);
    const standardMetrics = calculateRouteExposure(standardCoords);

    // Route 3: Highway / High-Exposure Path (expressways, commercial roads)
    const highwayCoords = generatePathCoordinates(start, end, 12, 0.2);
    const highwayMetrics = calculateRouteExposure(highwayCoords);
    // Artificially scale highway values to represent congested roadways
    highwayMetrics.avgAqi = Math.round(highwayMetrics.avgAqi * 1.35);
    highwayMetrics.avgNoise = Math.round(highwayMetrics.avgNoise * 1.25);
    highwayMetrics.exposureScore = Math.round(highwayMetrics.avgAqi * 0.4 + highwayMetrics.avgNoise * 0.35);

    return [
      {
        id: 'green',
        name: 'Eco-Healthy Route (Parks & Residential)',
        distance: parseFloat((directDistance * 1.15).toFixed(2)), // slightly longer
        duration: Math.round(directDistance * 1.15 * 12), // walking pace mins
        coordinates: greenCoords,
        ...greenMetrics
      },
      {
        id: 'standard',
        name: 'Standard Route (Avenues)',
        distance: parseFloat((directDistance * 1.05).toFixed(2)),
        duration: Math.round(directDistance * 1.05 * 10),
        coordinates: standardCoords,
        ...standardMetrics
      },
      {
        id: 'highway',
        name: 'Expressway Route (Main Highways)',
        distance: parseFloat((directDistance * 0.95).toFixed(2)), // shorter distance
        duration: Math.round(directDistance * 0.95 * 8), // faster driving/transit pace
        coordinates: highwayCoords,
        ...highwayMetrics
      }
    ].sort((a, b) => a.exposureScore - b.exposureScore); // Rank by exposure score ascending
  }
};

module.exports = router;
