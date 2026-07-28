import React from 'react';
import { FORECAST_SERIES_24H, PREDICTIVE_MODELS } from '../../data/predictiveData';
import { TrendingUp, ShieldCheck, Cpu, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export const AIPredictiveAnalytics = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TrendingUp size={24} style={{ color: 'var(--accent-blue)' }} /> AI Predictive Analytics Engine
          </h2>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            Deep learning neural networks forecasting demand curves, equipment degradation rates, and environmental impacts with 95% confidence intervals.
          </p>
        </div>

        <span className="badge badge-green" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
          <Sparkles size={14} /> AI Model Accuracy: 99.1%
        </span>
      </div>

      {/* 24-Hour Forecast Chart with 95% Confidence Bounds */}
      <div className="card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 className="card-title">City Energy Demand Forecast (24-Hour Ahead)</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Includes 95% Upper & Lower Confidence Interval Bounds</span>
          </div>

          <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '3px', backgroundColor: '#0284c7' }} /> Predicted MW Demand
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', backgroundColor: 'rgba(2, 132, 199, 0.15)', borderRadius: '2px' }} /> 95% Confidence Interval
            </div>
          </div>
        </div>

        <div style={{ width: '100%', height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={FORECAST_SERIES_24H}>
              <defs>
                <linearGradient id="confidenceBound" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284c7" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#0284c7" stopOpacity={0.02}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="hour" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} unit=" MW" />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="upperMW" name="Upper 95% Bound" stroke="none" fill="url(#confidenceBound)" />
              <Line type="monotone" dataKey="forecastMW" name="AI Forecast (MW)" stroke="#0284c7" strokeWidth={3} dot={{ r: 4 }} />
              <Area type="monotone" dataKey="lowerMW" name="Lower 95% Bound" stroke="none" fill="#ffffff" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 6 Predictive Models Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        {PREDICTIVE_MODELS.map((model) => (
          <div key={model.id} className="card" style={{ padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {model.title}
                </h4>
                <span className={`badge ${model.status === 'HIGH_RISK' ? 'badge-red' : model.status === 'MODERATE_RISK' ? 'badge-yellow' : 'badge-green'}`}>
                  {model.status}
                </span>
              </div>

              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '8px' }}>
                {model.metric}
              </div>

              <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', marginBottom: '12px', lineHeight: 1.4 }}>
                <strong>AI Recommendation:</strong> {model.recommendation}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid var(--border-color)', fontSize: '0.75rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Confidence Score:</span>
              <span style={{ fontWeight: 700, color: 'var(--accent-green)' }}>
                <ShieldCheck size={14} style={{ inlineSize: '14px', verticalAlign: 'middle' }} /> {model.confidence}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
