import React from 'react';
import {
  DollarSign,
} from 'lucide-react';
import { useSolar } from '../context/SolarContext';

export const FinancialAnalyticsSection: React.FC = () => {
  const { financialMetrics } = useSolar();

  return (
    <section style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <DollarSign size={22} color="var(--yellow-600)" />
            Section 7 — Financial Analytics & ROI Yield
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Financial return tracking, electricity bill reduction, and utility export arbitrage revenue
          </p>
        </div>

        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--green-700)', backgroundColor: 'var(--green-50)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--green-100)' }}>
          Annual ROI: {financialMetrics.systemRoiPct}%
        </div>
      </div>

      {/* Financial Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '1.25rem',
      }}>
        <div className="card-solid" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>Today's Savings</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--green-600)', margin: '0.2rem 0' }}>
            ${financialMetrics.todaySavingsUsd.toFixed(2)}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--green-600)', fontWeight: 600 }}>+12.4% vs grid baseline</div>
        </div>

        <div className="card-solid" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>Monthly Savings</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.2rem 0' }}>
            ${financialMetrics.monthlySavingsUsd.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Projected July 2026</div>
        </div>

        <div className="card-solid" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>Annual Savings</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.2rem 0' }}>
            ${financialMetrics.annualSavingsUsd.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--green-600)', fontWeight: 600 }}>PPA Yield Met</div>
        </div>

        <div className="card-solid" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>System ROI</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--green-600)', margin: '0.2rem 0' }}>
            {financialMetrics.systemRoiPct}%
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>IRR Benchmark: 16.5%</div>
        </div>

        <div className="card-solid" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>Payback Remaining</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.2rem 0' }}>
            {financialMetrics.paybackPeriodYears} Yrs
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--green-600)', fontWeight: 600 }}>Ahead by 8 Months</div>
        </div>
      </div>

      {/* Cost Reduction Comparison Visualization */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.25rem' }}>
        <div className="card-solid" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Daily Utility Bill Comparison: Standard Tariff vs Solar Agent Optimized
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--green-600)', fontWeight: 700 }}>
              73.5% Net Reduction
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Standard Grid Bill */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                <span>Unoptimized Standard Utility Grid Bill</span>
                <span style={{ fontWeight: 700, color: 'var(--red-600)' }}>${financialMetrics.standardBillUsd.toFixed(2)}</span>
              </div>
              <div style={{ width: '100%', height: '16px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--red-500)' }} />
              </div>
            </div>

            {/* Solar Optimized Bill */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                <span>Solar Optimization Agent Bill (Solar + BMS Arbitrage)</span>
                <span style={{ fontWeight: 700, color: 'var(--green-600)' }}>${financialMetrics.solarOptimizedBillUsd.toFixed(2)}</span>
              </div>
              <div style={{ width: '100%', height: '16px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                <div style={{ width: '26.5%', height: '100%', backgroundColor: 'var(--green-500)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Breakdown Card */}
        <div className="card-solid" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Daily Revenue Stream Breakdown
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem' }}>
              <span>Self-Consumption Savings</span>
              <span style={{ fontWeight: 700, color: 'var(--green-600)' }}>+$318.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem' }}>
              <span>Grid Feed-in Export Revenue</span>
              <span style={{ fontWeight: 700, color: 'var(--green-600)' }}>+$108.50</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem' }}>
              <span>Peak Demand Charge Avoidance</span>
              <span style={{ fontWeight: 700, color: 'var(--green-600)' }}>+$34.20</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
