/**
 * AI Predictive Intelligence Engine for Water Resources Management
 * Simulates TensorFlow / Scikit-learn Machine Learning Models
 */

export interface DemandForecastPoint {
  day: string;
  actualMGL?: number;
  predictedMGL: number;
  lowerConfidenceMGL: number;
  upperConfidenceMGL: number;
  weatherFactor: string;
}

export interface WQIEvaluation {
  score: number;
  classification: 'Excellent' | 'Good' | 'Fair' | 'Marginal' | 'Poor';
  color: 'Green' | 'Yellow' | 'Red';
  subIndex: {
    pH: number;
    tds: number;
    turbidity: number;
    dissolvedOxygen: number;
  };
}

export class AIPredictorEngine {
  /**
   * Leak Anomaly Scoring Model
   * Returns leak probability percentage (0 - 100%) and severity estimate
   */
  public static evaluateLeakProbability(
    pressureDropPsi: number,
    flowDiscrepancyLps: number,
    acousticNoiseDb: number
  ): { probabilityPct: number; severity: 'Low' | 'Medium' | 'High' | 'Critical'; isAnomaly: boolean } {
    // Weighted model simulation: P = w1*dP + w2*dQ + w3*dB
    const normalizedDP = Math.min(1, pressureDropPsi / 30.0);
    const normalizedDQ = Math.min(1, flowDiscrepancyLps / 50.0);
    const normalizedDB = Math.min(1, acousticNoiseDb / 80.0);

    const score = (normalizedDP * 0.45 + normalizedDQ * 0.35 + normalizedDB * 0.20) * 100;
    const probabilityPct = +Math.min(99.9, Math.max(5.0, score)).toFixed(1);

    let severity: 'Low' | 'Medium' | 'High' | 'Critical' = 'Low';
    if (probabilityPct > 85) severity = 'Critical';
    else if (probabilityPct > 70) severity = 'High';
    else if (probabilityPct > 45) severity = 'Medium';

    return {
      probabilityPct,
      severity,
      isAnomaly: probabilityPct > 50,
    };
  }

  /**
   * 7-Day Water Demand Forecasting Engine
   */
  public static forecast7DayWaterDemand(baseDailyMGL: number = 184.2): DemandForecastPoint[] {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weatherFactors = [
      'Hot & Dry (32°C)',
      'Sunny (29°C)',
      'Scattered Rain (24°C)',
      'Thunderstorm (21°C)',
      'Clear (26°C)',
      'Hot Weekend (34°C)',
      'Pleasant (27°C)',
    ];

    const multipliers = [1.08, 1.02, 0.91, 0.82, 0.98, 1.15, 1.10]; // Weekend spikes & rain dips

    return days.map((day, idx) => {
      const pred = +(baseDailyMGL * multipliers[idx]).toFixed(1);
      const lower = +(pred * 0.95).toFixed(1);
      const upper = +(pred * 1.05).toFixed(1);
      const point: DemandForecastPoint = {
        day,
        predictedMGL: pred,
        lowerConfidenceMGL: lower,
        upperConfidenceMGL: upper,
        weatherFactor: weatherFactors[idx],
      };
      if (idx === 0) point.actualMGL = baseDailyMGL;
      return point;
    });
  }

  /**
   * Water Quality Index (WQI) Calculator (Weighted NSF Method)
   */
  public static calculateWQI(
    pH: number,
    tdsPpm: number,
    turbidityNtu: number,
    dissolvedOxygenMgL: number
  ): WQIEvaluation {
    // pH subindex (ideal 7.0)
    const pHDev = Math.abs(pH - 7.0);
    const qpH = Math.max(0, 100 - pHDev * 25);

    // TDS subindex (ideal < 300)
    const qTDS = tdsPpm <= 300 ? 100 : Math.max(0, 100 - (tdsPpm - 300) * 0.15);

    // Turbidity subindex (ideal < 1.0)
    const qTurb = turbidityNtu <= 1.0 ? 100 : Math.max(0, 100 - (turbidityNtu - 1.0) * 20);

    // Dissolved Oxygen subindex (ideal > 6.5)
    const qDO = Math.min(100, (dissolvedOxygenMgL / 8.0) * 100);

    // Weighted average
    const score = +(qpH * 0.25 + qTDS * 0.25 + qTurb * 0.25 + qDO * 0.25).toFixed(1);

    let classification: WQIEvaluation['classification'] = 'Excellent';
    let color: WQIEvaluation['color'] = 'Green';

    if (score < 50) {
      classification = 'Poor';
      color = 'Red';
    } else if (score < 75) {
      classification = 'Fair';
      color = 'Yellow';
    } else if (score < 90) {
      classification = 'Good';
      color = 'Green';
    }

    return {
      score,
      classification,
      color,
      subIndex: {
        pH: +qpH.toFixed(1),
        tds: +qTDS.toFixed(1),
        turbidity: +qTurb.toFixed(1),
        dissolvedOxygen: +qDO.toFixed(1),
      },
    };
  }

  /**
   * Smart Irrigation Recommendation Model
   */
  public static recommendIrrigation(
    cropType: string,
    currentSoilMoisturePct: number,
    targetSoilMoisturePct: number,
    areaHectares: number,
    rainProbability24hPct: number
  ): {
    needsWatering: boolean;
    recommendedLiters: number;
    bestTimeWindow: string;
    advice: string;
  } {
    if (currentSoilMoisturePct >= targetSoilMoisturePct) {
      return {
        needsWatering: false,
        recommendedLiters: 0,
        bestTimeWindow: 'N/A',
        advice: `Soil moisture (${currentSoilMoisturePct}%) is optimal for ${cropType}. No irrigation required.`,
      };
    }

    if (rainProbability24hPct > 70) {
      return {
        needsWatering: false,
        recommendedLiters: 0,
        bestTimeWindow: 'Post Rain Evaluation',
        advice: `High rain forecast (${rainProbability24hPct}%). AI recommends delaying irrigation to conserve water.`,
      };
    }

    const moistureDeficitPct = targetSoilMoisturePct - currentSoilMoisturePct;
    // ~10,000 liters per hectare per 10% deficit
    const requiredLiters = Math.round(areaHectares * (moistureDeficitPct / 10) * 12000);

    return {
      needsWatering: true,
      recommendedLiters: requiredLiters,
      bestTimeWindow: '20:00 - 23:00 (Evening / Sunset)',
      advice: `Soil moisture deficit of ${moistureDeficitPct.toFixed(1)}%. Irrigate during cool hours to reduce evapotranspiration by 32%.`,
    };
  }
}
