import React, { useState } from 'react';
import { X, FileText, Download, CheckCircle2, Calendar, FileSpreadsheet, FileCode } from 'lucide-react';

export default function ReportGeneratorModal({ isOpen, onClose }) {
  const [reportType, setReportType] = useState('Daily Report');
  const [format, setFormat] = useState('PDF');
  const [dateRange, setDateRange] = useState('2026-07-28');
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
      setTimeout(() => {
        setExportComplete(false);
        onClose();
      }, 2000);
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        <div className="modal-header" style={{ background: '#f8fafc' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={22} color="#2563eb" />
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a' }}>Export Energy Report</h3>
              <p style={{ fontSize: '11px', color: '#64748b' }}>Generate certified energy & cost audit documentation</p>
            </div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {exportComplete ? (
            <div style={{ textAlign: 'center', padding: '30px 0' }}>
              <CheckCircle2 size={48} color="#059669" style={{ margin: '0 auto 12px auto' }} />
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Report Exported Successfully!</h4>
              <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                Your {reportType} in {format} format has been compiled and downloaded.
              </p>
            </div>
          ) : (
            <div>
              {/* Report Type Selector */}
              <div className="form-group">
                <label className="form-label">Report Category</label>
                <select 
                  className="form-select" 
                  value={reportType} 
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <option value="Daily Report">Daily Energy & Demand Summary</option>
                  <option value="Weekly Report">Weekly Energy Efficiency Audit</option>
                  <option value="Monthly Report">Monthly Utility & Tariff Breakdown</option>
                  <option value="Department Report">Department-wise Load Distribution</option>
                  <option value="Device Report">Device Health & Power Quality Log</option>
                  <option value="Efficiency Report">Energy Efficiency & AI Recommendations</option>
                  <option value="Cost Report">Cost & Peak Charge Analytics</option>
                </select>
              </div>

              {/* Date Selection */}
              <div className="form-group">
                <label className="form-label">Target Date / Period</label>
                <input 
                  type="date" 
                  className="form-input" 
                  value={dateRange} 
                  onChange={(e) => setDateRange(e.target.value)} 
                />
              </div>

              {/* Format Selection Cards */}
              <div className="form-group">
                <label className="form-label">Export File Format</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  <div 
                    onClick={() => setFormat('PDF')}
                    style={{ 
                      padding: '12px', 
                      borderRadius: '8px', 
                      border: `2px solid ${format === 'PDF' ? '#2563eb' : '#e2e8f0'}`,
                      background: format === 'PDF' ? '#eff6ff' : '#ffffff',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <FileText size={22} color={format === 'PDF' ? '#2563eb' : '#64748b'} style={{ margin: '0 auto 4px auto' }} />
                    <p style={{ fontSize: '13px', fontWeight: 700, color: format === 'PDF' ? '#2563eb' : '#0f172a' }}>PDF</p>
                    <p style={{ fontSize: '10px', color: '#64748b' }}>Print Ready</p>
                  </div>

                  <div 
                    onClick={() => setFormat('Excel')}
                    style={{ 
                      padding: '12px', 
                      borderRadius: '8px', 
                      border: `2px solid ${format === 'Excel' ? '#059669' : '#e2e8f0'}`,
                      background: format === 'Excel' ? '#ecfdf5' : '#ffffff',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <FileSpreadsheet size={22} color={format === 'Excel' ? '#059669' : '#64748b'} style={{ margin: '0 auto 4px auto' }} />
                    <p style={{ fontSize: '13px', fontWeight: 700, color: format === 'Excel' ? '#059669' : '#0f172a' }}>Excel</p>
                    <p style={{ fontSize: '10px', color: '#64748b' }}>.xlsx Sheets</p>
                  </div>

                  <div 
                    onClick={() => setFormat('CSV')}
                    style={{ 
                      padding: '12px', 
                      borderRadius: '8px', 
                      border: `2px solid ${format === 'CSV' ? '#7c3aed' : '#e2e8f0'}`,
                      background: format === 'CSV' ? '#f5f3ff' : '#ffffff',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <FileCode size={22} color={format === 'CSV' ? '#7c3aed' : '#64748b'} style={{ margin: '0 auto 4px auto' }} />
                    <p style={{ fontSize: '13px', fontWeight: 700, color: format === 'CSV' ? '#7c3aed' : '#0f172a' }}>CSV</p>
                    <p style={{ fontSize: '10px', color: '#64748b' }}>Raw Telemetry</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {!exportComplete && (
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={handleExport} disabled={isExporting}>
              {isExporting ? (
                <>Compiling Report...</>
              ) : (
                <>
                  <Download size={16} /> Export {format}
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
