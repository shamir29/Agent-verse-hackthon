import React from 'react';
import {
  Sun,
  Sparkles,
  CloudSun,
  Clock,
} from 'lucide-react';
import { useSolar } from '../context/SolarContext';

export const SolarForecastSection: React.FC = () => {
  const { forecast } = useSolar();

  const forecastCards = [
    { label: 'Next Hour (15:00)', expected: '470 kWh', confidence: '98.5%', weather: 'Clear 920 W/m²' },
    { label: 'Next 6 Hours', expected: '1,840 kWh', confidence: '96.2%', weather: 'Partly Cloudy' },
    { label: 'Tomorrow Total', expected: '3,450 kWh', confidence: '94.0%', weather: 'Sunny (UV 8)' },
    { label: 'Weekly Prediction', expected: '24.2 MWh', confidence: '91.8%', weather: 'Optimal High Yield' },
  ];

  return (
    <section style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sun size={22} color="var(--yellow-600)" />
            Section 2 — Solar Generation AI Forecast
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Weather-integrated AI predictive model for solar irradiance and energy yield predictions
          </p>
        </div>

        {/* AI Confidence Score Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'var(--green-50)',
          border: '1px solid var(--green-100)',
          padding: '0.4rem 0.8rem',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.8rem',
          fontWeight: 700,
          color: 'var(--green-700)',
        }}>
          <Sparkles size={16} color="var(--green-600)" />
          <span>AI Model Accuracy Confidence: 95.8%</span>
        </div>
      </div>

      {/* Forecast Horizon Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
        marginBottom: '1.25rem',
      }}>
        {forecastCards.map((card, idx) => (
          <div key={idx} className="card-solid" style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>{card.label}</span>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--green-600)', backgroundColor: 'var(--green-50)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                {card.confidence} AI
              </span>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
              {card.expected}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <CloudSun size={14} color="var(--yellow-600)" />
              <span>{card.weather}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart: Expected vs Actual Generation & Peak Window */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem' }}>
        {/* Expected vs Actual Bar Chart */}
        <div className="card-solid" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Hourly Generation: Expected vs Actual (kWh)
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: 'var(--green-500)', borderRadius: '2px' }} />
                <span>Expected Yield</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: 'var(--yellow-500)', borderRadius: '2px' }} />
                <span>Actual Telemetry</span>
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            height: '180px',
            paddingTop: '1rem',
            borderBottom: '1px solid var(--border-light)',
          }}>
            {forecast.map((f, i) => {
              const maxVal = 500;
              const expectedH = (f.expectedKwh / maxVal) * 150;
              const actualH = f.actualKwh ? (f.actualKwh / maxVal) * 150 : 0;

              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '0.4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '150px' }}>
                    {/* Expected bar */}
                    <div
                      title={`Expected: ${f.expectedKwh} kWh`}
                      style={{
                        width: '14px',
                        height: `${expectedH}px`,
                        backgroundColor: 'var(--green-500)',
                        borderRadius: '4px 4px 0 0',
                      }}
                    />
                    {/* Actual bar */}
                    {f.actualKwh && (
                      <div
                        title={`Actual: ${f.actualKwh} kWh`}
                        style={{
                          width: '14px',
                          height: `${actualH}px`,
                          backgroundColor: 'var(--yellow-500)',
                          borderRadius: '4px 4px 0 0',
                        }}
                      />
                    )}
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{f.timeLabel}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Peak Generation Window Banner */}
        <div className="card-solid" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={16} color="var(--yellow-600)" />
              Peak Generation Opportunity Window
            </div>

            <div style={{
              backgroundColor: 'var(--yellow-50)',
              border: '1px solid var(--yellow-100)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1rem',
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--yellow-600)', marginBottom: '0.2rem' }}>
                11:30 AM — 14:45 PM TODAY
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
                Maximum Irradiance window ({'>'}920 W/m²). Solar output predicted to exceed 480 kW continuous.
              </p>
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--green-50)',
            border: '1px solid var(--green-100)',
            padding: '0.85rem',
            borderRadius: 'var(--radius-md)',
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--green-700)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.2rem' }}>
              <Sparkles size={14} />
              AI Load Shifting Recommendation
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: 0 }}>
              Initiate Battery Charging at 45 kW and export remaining 310 kW to high-tariff grid feed-in.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
