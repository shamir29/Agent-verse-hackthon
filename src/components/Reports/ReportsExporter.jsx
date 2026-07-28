import React, { useState } from 'react';
import { FileSpreadsheet, Download, FileText, CheckCircle2, Printer, Share2 } from 'lucide-react';

export const ReportsExporter = () => {
  const [selectedReportType, setSelectedReportType] = useState('city_health');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [isGenerating, setIsGenerating] = useState(false);

  const REPORTS = [
    { id: 'city_health', title: 'City Infrastructure Health Report', desc: 'Full city stability, asset health index, and AI uptime audit.' },
    { id: 'infrastructure', title: 'Infrastructure Telemetry Log', desc: '14 asset category load, temperature, and maintenance status.' },
    { id: 'simulation', title: 'AI Scenario Simulation Impact Report', desc: 'Detailed power loss, economic impact, and recovery workflow metrics.' },
    { id: 'carbon', title: 'Sustainability & Carbon Offset Report', desc: 'ISO 50001 decarbonization trend and renewable mix analysis.' },
    { id: 'energy', title: 'Smart Energy & Substation Demand Report', desc: 'Substation load curves, transformer peak shave, and BESS discharge.' },
    { id: 'water', title: 'Water Infrastructure & Pressure Audit', desc: 'Pump station efficiency, main trunk leakage analysis, and GPM loss.' },
    { id: 'maintenance', title: 'Predictive Maintenance Dispatch Report', desc: 'Component RUL estimates, vibration anomalies, and technician dispatches.' },
    { id: 'ai_decision', title: 'AI Autonomous Decision Log', desc: 'Cross-agent command log, priority actions, and expected ROI.' }
  ];

  const handleDownload = (format) => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert(`Exported ${selectedReportType.toUpperCase()}_REPORT.${format.toUpperCase()} successfully!`);
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileSpreadsheet size={24} style={{ color: 'var(--accent-blue)' }} /> Automated Smart City Reports & Export Center
          </h2>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            Generate executive compliance documents, telemetry datasets, and AI audit reports in PDF, Excel, or CSV formats.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={() => handleDownload('pdf')}>
            <FileText size={14} /> Export PDF
          </button>
          <button className="btn btn-primary" onClick={() => handleDownload('xlsx')}>
            <Download size={14} /> Export Excel / CSV
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px' }}>
        {/* Report Types Selection Sidebar */}
        <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', paddingBottom: '8px', borderBottom: '1px solid var(--border-color)' }}>
            Available Report Templates (8)
          </div>

          {REPORTS.map((r) => {
            const isSelected = selectedReportType === r.id;

            return (
              <button
                key={r.id}
                onClick={() => setSelectedReportType(r.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isSelected ? 'var(--accent-blue-light)' : 'var(--bg-app)',
                  border: '1px solid',
                  borderColor: isSelected ? 'var(--accent-blue)' : 'var(--border-color)',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: isSelected ? 'var(--accent-blue)' : 'var(--text-main)' }}>
                  {r.title}
                </div>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {r.desc}
                </div>
              </button>
            );
          })}
        </div>

        {/* Report Preview Document */}
        <div className="card" style={{ padding: '24px', backgroundColor: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid var(--border-color)', paddingBottom: '16px', marginBottom: '20px' }}>
            <div>
              <span className="badge badge-blue">ENTERPRISE AUDIT PREVIEW</span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, marginTop: '4px' }}>
                {REPORTS.find(r => r.id === selectedReportType)?.title}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Generated on: {new Date().toLocaleDateString()} • Digital Twin Agent v4.2 • Smart City & Smart Energy AI Platform
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => handleDownload('pdf')}>
                <Printer size={14} /> Print
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => handleDownload('xlsx')}>
                <Download size={14} /> Download File
              </button>
            </div>
          </div>

          {/* Formatted Mock Executive Summary Preview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.875rem' }}>
            <div style={{ backgroundColor: 'var(--bg-app)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <h4 style={{ fontWeight: 700, marginBottom: '6px' }}>1. Executive Summary & City Stability</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem' }}>
                The Digital Twin Agent maintained a city-wide stability score of 96.4/100 across 1,482 monitored assets. A total of 42,850 IoT nodes contributed high-frequency telemetry.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--bg-app)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <h4 style={{ fontWeight: 700, marginBottom: '6px' }}>2. Resource & Decarbonization Performance</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem' }}>
                Renewable energy mix reached 68.4% with 1,420 MWh saved via AI demand response. Carbon emissions decreased by 14.2% YoY.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--bg-app)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <h4 style={{ fontWeight: 700, marginBottom: '6px' }}>3. Critical Maintenance & AI Action Audit</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem' }}>
                Transformer T-08 thermal fault warning flagged by Predictive Maintenance Agent; 40% load rerouted to Transformer T-09 successfully avoiding an estimated $240,000 outage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
