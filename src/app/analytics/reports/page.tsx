"use client";

import React, { useState } from "react";
import { FileText, Download, CheckCircle2, RefreshCw } from "lucide-react";

export default function ReportsPage() {
  const [downloading, setDownloading] = useState<string | null>(null);

  const reports = [
    { id: "rep_1", title: "Monthly Grid Stability & Load Factor Audit", date: "2026-07-01", type: "PDF Report" },
    { id: "rep_2", title: "Water Reserve Storage & Leak Anomaly Summary", date: "2026-07-15", type: "CSV Export" },
    { id: "rep_3", title: "Metropolitan Air Quality Index & AQI Trends", date: "2026-07-28", type: "PDF Report" },
  ];

  const handleDownload = (id: string, title: string) => {
    setDownloading(id);
    setTimeout(() => {
      setDownloading(null);
      alert(`Report generated and downloaded: ${title}`);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
          <FileText className="w-6 h-6 text-primary" /> Automated Municipal Executive Reports
        </h1>
        <p className="text-sm text-text-secondary">
          Export automated compliance audits, infrastructure health summaries, and operational logs.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-card p-5 space-y-3 shadow-sm">
        <h3 className="text-sm font-bold text-text-primary">Available Municipal Compliance Reports</h3>
        <div className="divide-y divide-border">
          {reports.map((r) => (
            <div key={r.id} className="py-3 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-text-primary">{r.title}</h4>
                <span className="text-[11px] text-text-tertiary font-mono-data">Generated: {r.date} • Format: {r.type}</span>
              </div>
              <button
                onClick={() => handleDownload(r.id, r.title)}
                disabled={downloading === r.id}
                className="px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-btn hover:bg-primary-hover transition-colors inline-flex items-center gap-1.5"
              >
                {downloading === r.id ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                Export Report
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
