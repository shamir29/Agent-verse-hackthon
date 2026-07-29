import React from 'react';
import { COST_ANALYTICS } from '../data/mockData';

export default function CostAnalyticsView({ costData = COST_ANALYTICS }) {
  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 className="section-title">Section 8 — Cost Analytics & Tariff Management</h2>
          <p className="section-desc">Time-of-Use (TOU) electricity cost tracking, peak demand charge mitigation, and bill forecasting</p>
        </div>
      </div>

      {/* 5 Cost KPI Cards */}
      <div className="grid-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div className="card">
          <span className="kpi-label">TODAY'S COST</span>
          <p style={{ fontSize: '24px', fontWeight: 800, color: '#059669', margin: '6px 0' }}>${costData.todayUsd.toFixed(2)}</p>
          <span className="badge badge-green">On Budget</span>
        </div>

        <div className="card">
          <span className="kpi-label">WEEKLY COST</span>
          <p style={{ fontSize: '24px', fontWeight: 800, color: '#2563eb', margin: '6px 0' }}>${costData.weeklyUsd.toLocaleString()}</p>
          <span className="badge badge-blue">7 Days Run-rate</span>
        </div>

        <div className="card">
          <span className="kpi-label">PROJECTED MONTH</span>
          <p style={{ fontSize: '24px', fontWeight: 800, color: '#d97706', margin: '6px 0' }}>${costData.projectedMonthlyUsd.toLocaleString()}</p>
          <span className="badge badge-amber">Target: $19,500</span>
        </div>

        <div className="card">
          <span className="kpi-label">ANNUAL RUN-RATE</span>
          <p style={{ fontSize: '24px', fontWeight: 800, color: '#7c3aed', margin: '6px 0' }}>${costData.annualUsd.toLocaleString()}</p>
          <span className="badge badge-blue">Annual Budget</span>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #dc2626' }}>
          <span className="kpi-label">PEAK DEMAND CHARGES</span>
          <p style={{ fontSize: '24px', fontWeight: 800, color: '#dc2626', margin: '6px 0' }}>${costData.peakDemandChargesUsd.toLocaleString()}</p>
          <span className="badge badge-red">$15.50 / kW Peak</span>
        </div>
      </div>

      {/* Savings Opportunity Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #ecfdf5, #eff6ff)', border: '1px solid #a7f3d0', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ padding: '12px', background: '#059669', color: '#ffffff', borderRadius: '12px' }}>
              <PiggyBank size={26} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
                Identified Savings Opportunity: ${costData.savingsOpportunityUsd.toLocaleString()} / month
              </h3>
              <p style={{ fontSize: '13px', color: '#334155' }}>
                By discharging 120 kW from BESS storage during 17:00 PM peak tariff hours, you will eliminate $1,860/mo in demand charges.
              </p>
            </div>
          </div>
          <button className="btn btn-eco">Optimize Tariff Schedule</button>
        </div>
      </div>

      {/* Department Cost Breakdown */}
      <div className="card">
        <div className="card-header">
          <div className="card-title-group">
            <div className="card-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
              <DollarSign size={18} />
            </div>
            <div>
              <h3 className="card-title">Department Cost Comparison Today</h3>
              <p className="card-subtitle">Cost contribution per department based on TOU tariff</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {costData.departmentCost.map(d => (
            <div key={d.department} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{d.department}</span>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '15px', fontWeight: 800, color: '#059669' }}>${d.cost.toFixed(2)}</span>
                <span style={{ fontSize: '11px', color: '#64748b', marginLeft: '8px' }}>({d.percent}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
