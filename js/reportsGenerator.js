/* WasteFlow AI - Reports & Export Engine */

window.WasteFlowReports = {
  generateReport: function() {
    const reportType = document.getElementById('report-type-select') ? document.getElementById('report-type-select').value : 'daily';
    const reportOutput = document.getElementById('report-output-container');

    if (!reportOutput) return;

    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    let contentHtml = `
      <div style="background:white; border:1px solid #E5E7EB; border-radius:12px; padding:24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #E5E7EB; padding-bottom:16px; margin-bottom:20px;">
          <div>
            <h2 style="font-size:20px; font-weight:700; color:#111827;">WasteFlow AI - ${reportType.toUpperCase()} OPERATIONS REPORT</h2>
            <p style="font-size:13px; color:#6B7280;">Municipal Smart City Waste Management System | Generated ${dateStr}</p>
          </div>
          <span class="badge badge-success" style="font-size:12px; padding:6px 12px;">VERIFIED BY AI AUDITOR</span>
        </div>
    `;

    if (reportType === 'daily' || reportType === 'overflow') {
      contentHtml += `
        <h3 style="font-size:15px; margin-bottom:12px;">Summary Highlights</h3>
        <div class="kpi-grid" style="margin-bottom:24px;">
          <div class="kpi-card">
            <span class="kpi-label">Total Bins Collected</span>
            <div class="kpi-value">1,482</div>
            <span class="kpi-footer kpi-trend-up">↑ 12% vs yesterday</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">Overflow Incidents Prevented</span>
            <div class="kpi-value">48 Bins</div>
            <span class="kpi-footer kpi-trend-up">100% Resolved</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">Fleet Miles Driven</span>
            <div class="kpi-value">412 km</div>
            <span class="kpi-footer kpi-trend-down">↓ 18% fuel saved</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">Recycling Diverted</span>
            <div class="kpi-value">64.2 Tons</div>
            <span class="kpi-footer kpi-trend-up">54% Rate</span>
          </div>
        </div>

        <h3 style="font-size:15px; margin-bottom:12px;">Smart Bin Overflow Audit</h3>
        <table style="width:100%; border-collapse:collapse; font-size:13px;">
          <thead>
            <tr style="background:#F8FAFC; text-align:left;">
              <th style="padding:10px;">BIN ID</th>
              <th style="padding:10px;">LOCATION</th>
              <th style="padding:10px;">WASTE TYPE</th>
              <th style="padding:10px;">MAX FILL %</th>
              <th style="padding:10px;">STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding:10px;">BIN-101</td><td style="padding:10px;">5th Ave & 42nd St</td><td style="padding:10px;">Plastic</td><td style="padding:10px;">94%</td><td style="padding:10px;"><span class="badge badge-danger">Collected</span></td></tr>
            <tr><td style="padding:10px;">BIN-106</td><td style="padding:10px;">Lexington Ave Hub</td><td style="padding:10px;">Glass</td><td style="padding:10px;">96%</td><td style="padding:10px;"><span class="badge badge-danger">Collected</span></td></tr>
            <tr><td style="padding:10px;">BIN-109</td><td style="padding:10px;">SoHo Grand</td><td style="padding:10px;">Landfill</td><td style="padding:10px;">97%</td><td style="padding:10px;"><span class="badge badge-warning">En Route</span></td></tr>
          </tbody>
        </table>
      `;
    } else {
      contentHtml += `
        <h3 style="font-size:15px; margin-bottom:12px;">Environmental Sustainability & Carbon Audit</h3>
        <p style="font-size:13px; color:#4B5563; margin-bottom:16px;">
          Detailed breakdown of metric tons CO2 diverted, fuel reduction metrics, and landfill diversion percentage across municipal sectors.
        </p>
        <div style="background:#DCFCE7; padding:16px; border-radius:8px; border:1px solid #16A34A; margin-bottom:20px;">
          <strong>Total Carbon Offset:</strong> 14.8 Metric Tons CO₂e saved today via automated AI route optimization and 100% electric fleet priority.
        </div>
      `;
    }

    contentHtml += `</div>`;
    reportOutput.innerHTML = contentHtml;
  },

  exportCSV: function() {
    const csvContent = "data:text/csv;charset=utf-8,Bin ID,Location,Type,Fill Level,Overflow Risk,Last Collection\nBIN-101,5th Ave & 42nd St,Plastic,92%,CRITICAL,14 hrs ago\nBIN-102,Broadway & 34th St,Organic,88%,HIGH,18 hrs ago\nBIN-103,Wall Street,Landfill,45%,LOW,4 hrs ago\nBIN-106,Lexington Ave,Glass,94%,CRITICAL,22 hrs ago\nBIN-109,SoHo Grand,Landfill,97%,CRITICAL,26 hrs ago";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "WasteFlow_Telemetry_Report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
