import React, { useState } from 'react';
import { FileText, Download, FileSpreadsheet, FileCode, CheckCircle2, Calendar, Filter, Sparkles } from 'lucide-react';

export default function ReportsView({ onOpenReportModal }) {
  const reportsList = [
    { title: "Daily Energy & Demand Audit", desc: "Complete 24h summary of peak kW, kWh, battery storage dispatch, and hourly load curves.", format: ["PDF", "Excel", "CSV"], lastGenerated: "Today 08:00 AM" },
    { title: "Weekly Energy Efficiency & ISO 50001", desc: "Weekly energy intensity score, building benchmark performance, and carbon emission stats.", format: ["PDF", "Excel"], lastGenerated: "Yesterday" },
    { title: "Monthly Utility & TOU Tariff Breakdown", desc: "Itemized billing analysis, peak demand charges, and time-of-use cost breakdown.", format: ["PDF", "Excel", "CSV"], lastGenerated: "2026-07-01" },
    { title: "Department-wise Load & Submetering Report", desc: "Granular energy draw per department (HVAC, Manufacturing, IT, Lighting, EV).", format: ["PDF", "Excel"], lastGenerated: "3 days ago" },
    { title: "Device Health & Power Quality Log", desc: "THD voltage/current, power factor log, and maintenance alerts per monitored asset.", format: ["Excel", "CSV"], lastGenerated: "Today 06:00 AM" },
    { title: "Cost & Peak Charge Mitigation Summary", desc: "Financial summary of savings achieved via automated load shifting and battery peak shaving.", format: ["PDF", "Excel"], lastGenerated: "2026-07-25" }
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 className="section-title">Section 11 — Energy Reports & Data Export Center</h2>
          <p className="section-desc">Generate certified compliance reports and export raw telemetry in PDF, Excel, and CSV formats</p>
        </div>
        <button className="btn btn-primary" onClick={onOpenReportModal}>
          <Download size={16} /> Generate Custom Report
        </button>
      </div>

      {/* Reports Grid */}
      <div className="grid-2">
        {reportsList.map((rep, idx) => (
          <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ padding: '8px', borderRadius: '8px', background: '#eff6ff', color: '#2563eb' }}>
                  <FileText size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>{rep.title}</h3>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Last generated: {rep.lastGenerated}</span>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.4, marginBottom: '16px' }}>
                {rep.desc}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                {rep.format.map(fmt => (
                  <span key={fmt} className="badge badge-blue">{fmt}</span>
                ))}
              </div>
              <button className="btn btn-secondary btn-sm" onClick={onOpenReportModal}>
                <Download size={14} /> Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
