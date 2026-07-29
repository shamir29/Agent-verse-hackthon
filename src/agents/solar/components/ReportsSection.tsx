import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  FileSpreadsheet,
  CheckCircle2,
} from 'lucide-react';
import { useSolar } from '../context/SolarContext';

export const ReportsSection: React.FC = () => {
  const { telemetry, panels, environmentalMetrics } = useSolar();
  const [selectedReport, setSelectedReport] = useState('daily');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const reports = [
    { id: 'daily', name: 'Daily Performance Summary', desc: 'Detailed 24-hour generation telemetry, battery charge curves, and grid export' },
    { id: 'weekly', name: 'Weekly Yield Forecast Audit', desc: 'Expected vs Actual energy comparison, irradiance analysis, and weather impact' },
    { id: 'monthly', name: 'Monthly Financial & Carbon Audit', desc: 'Time-of-use tariff savings, ROI countdown, and ESG carbon credit compliance' },
    { id: 'maintenance', name: 'Maintenance & Work Order Log', desc: 'Completed panel cleanings, diode repairs, and predictive health scores' },
  ];

  // Helper to trigger browser print for PDF
  const handleExportPdf = () => {
    window.print();
  };

  // Helper to generate dynamic CSV file for download
  const handleExportCsv = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Panel ID,String ID,Power Output (W),Voltage (V),Current (A),Temperature (C),Health Score (%),Status\n';

    panels.forEach((p) => {
      csvContent += `${p.id},${p.stringId},${p.powerOutputW},${p.voltageV},${p.currentA},${p.temperatureC},${p.healthScorePct},${p.status}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `solar_optimization_report_${selectedReport}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess('CSV Export downloaded successfully!');
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const handleExportExcel = () => {
    handleExportCsv();
  };

  return (
    <section style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={22} color="var(--green-600)" />
            Section 10 — Automated System Reports & Data Export
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Generate enterprise compliance audits, operational logs, and data exports in PDF, Excel, and CSV formats
          </p>
        </div>

        {downloadSuccess && (
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--green-700)', backgroundColor: 'var(--green-50)', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--green-100)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <CheckCircle2 size={16} />
            {downloadSuccess}
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1.25rem' }}>
        {/* Report Selector List */}
        <div className="card-solid" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
            Select Report Template
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {reports.map((rep) => {
              const isSelected = selectedReport === rep.id;
              return (
                <button
                  key={rep.id}
                  onClick={() => setSelectedReport(rep.id)}
                  style={{
                    textAlign: 'left',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isSelected ? 'var(--green-50)' : 'var(--bg-subtle)',
                    border: `1px solid ${isSelected ? 'var(--green-500)' : 'var(--border-light)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: isSelected ? 'var(--green-700)' : 'var(--text-primary)' }}>
                    {rep.name}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    {rep.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Report Preview & Export Controls */}
        <div className="card-solid" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--green-600)', textTransform: 'uppercase' }}>
                  REPORT PREVIEW SUMMARY
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  {reports.find((r) => r.id === selectedReport)?.name}
                </h3>
              </div>

              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Generated: {new Date().toLocaleDateString()}
              </span>
            </div>

            {/* Simulated Live Report Data Box */}
            <div style={{
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              fontSize: '0.8rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Plant Capacity:</span>
                <span style={{ fontWeight: 700 }}>500.0 kW (48 Panels Active)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Current Generation:</span>
                <span style={{ fontWeight: 700, color: 'var(--green-600)' }}>{telemetry.currentPowerKw} kW</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Today Energy Yield:</span>
                <span style={{ fontWeight: 700 }}>{telemetry.todayEnergyKwh} kWh</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Financial Cost Savings:</span>
                <span style={{ fontWeight: 700, color: 'var(--green-600)' }}>${telemetry.costSavingsUsd.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>CO₂ Carbon Offset:</span>
                <span style={{ fontWeight: 700 }}>{environmentalMetrics.co2ReductionTons} Tons</span>
              </div>
            </div>
          </div>

          {/* Export Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
            <button onClick={handleExportPdf} className="btn-primary" style={{ flex: 1, fontSize: '0.8rem' }}>
              <Printer size={16} />
              <span>Export PDF / Print</span>
            </button>

            <button onClick={handleExportExcel} className="btn-secondary" style={{ flex: 1, fontSize: '0.8rem' }}>
              <FileSpreadsheet size={16} color="var(--green-600)" />
              <span>Export Excel (.XLSX)</span>
            </button>

            <button onClick={handleExportCsv} className="btn-secondary" style={{ flex: 1, fontSize: '0.8rem' }}>
              <Download size={16} color="var(--blue-500)" />
              <span>Download CSV</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
