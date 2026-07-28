/* WasteFlow AI - Chart Analytics Engine (Chart.js Integration) */

window.WasteFlowCharts = {
  charts: {},

  initPredictionChart: function(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx || typeof Chart === 'undefined') return;

    if (this.charts[canvasId]) this.charts[canvasId].destroy();

    const hours = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
    
    this.charts[canvasId] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: hours,
        datasets: [
          {
            label: 'Predicted Bin Overflow Risk (%)',
            data: [15, 12, 10, 18, 42, 68, 85, 92, 88, 74, 52, 30],
            borderColor: '#DC2626',
            backgroundColor: 'rgba(220, 38, 38, 0.08)',
            fill: true,
            tension: 0.4,
            borderWidth: 2
          },
          {
            label: 'Actual Telemetry Aggregate (%)',
            data: [14, 11, 12, 20, 39, 65, 80, 89, 85, 70, 48, 28],
            borderColor: '#2563EB',
            backgroundColor: 'transparent',
            borderDash: [5, 5],
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { boxWidth: 12, font: { family: 'Inter', size: 12 } } }
        },
        scales: {
          y: { min: 0, max: 100, grid: { color: '#E5E7EB' } },
          x: { grid: { display: false } }
        }
      }
    });
  },

  initWasteGenerationChart: function(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx || typeof Chart === 'undefined') return;

    if (this.charts[canvasId]) this.charts[canvasId].destroy();

    this.charts[canvasId] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Recyclables (Tons)',
            data: [420, 450, 480, 460, 520, 610, 590],
            backgroundColor: '#16A34A',
            borderRadius: 4
          },
          {
            label: 'Organic Waste (Tons)',
            data: [680, 710, 750, 720, 810, 950, 910],
            backgroundColor: '#F59E0B',
            borderRadius: 4
          },
          {
            label: 'Landfill Waste (Tons)',
            data: [310, 290, 300, 280, 340, 410, 380],
            backgroundColor: '#DC2626',
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { boxWidth: 12, font: { family: 'Inter', size: 12 } } }
        },
        scales: {
          y: { grid: { color: '#E5E7EB' } },
          x: { grid: { display: false } }
        }
      }
    });
  },

  initCarbonChart: function(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx || typeof Chart === 'undefined') return;

    if (this.charts[canvasId]) this.charts[canvasId].destroy();

    this.charts[canvasId] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: 'CO₂ Emissions Prevented (Metric Tons)',
            data: [1200, 1350, 1480, 1620, 1790, 1950, 2100],
            borderColor: '#16A34A',
            backgroundColor: 'rgba(22, 163, 74, 0.1)',
            fill: true,
            tension: 0.3,
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { boxWidth: 12, font: { family: 'Inter', size: 12 } } }
        },
        scales: {
          y: { grid: { color: '#E5E7EB' } },
          x: { grid: { display: false } }
        }
      }
    });
  },

  initRecyclingDoughnut: function(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx || typeof Chart === 'undefined') return;

    if (this.charts[canvasId]) this.charts[canvasId].destroy();

    this.charts[canvasId] = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['PET Plastic', 'Paper & Cardboard', 'Glass', 'Metals & Aluminum', 'E-Waste'],
        datasets: [{
          data: [38, 28, 16, 12, 6],
          backgroundColor: ['#2563EB', '#16A34A', '#F59E0B', '#0EA5E9', '#8B5CF6'],
          borderWidth: 2,
          borderColor: '#FFFFFF'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'right', labels: { boxWidth: 12, font: { family: 'Inter', size: 12 } } }
        },
        cutout: '70%'
      }
    });
  }
};
