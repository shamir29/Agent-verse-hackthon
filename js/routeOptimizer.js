/* WasteFlow AI - Route Optimizer & Dispatch Solver Engine (Tamil Nadu Smart City Network) */

window.WasteFlowRouter = {
  currentRoute: null,

  generateOptimization: function() {
    const truckSelect = document.getElementById('route-truck-select');
    const selectedTruck = truckSelect ? truckSelect.value : 'TRUCK-01';

    // Route waypoint presets in Tamil Nadu Region (Chennai Metro)
    const routePresets = {
      'TRUCK-01': {
        waypoints: [
          [13.0499, 80.2824], // BIN-101 (Marina Beach)
          [13.0405, 80.2337], // BIN-102 (T. Nagar Ranganathan St)
          [13.0334, 80.2697], // BIN-107 (Mylapore Temple Zone)
          [13.0780, 80.2610], // BIN-110 (Egmore Station)
          [13.1600, 80.2600]  // Manali Eco-Recycling Facility (Dropoff)
        ],
        metrics: {
          shortestDistance: "16.8 km",
          fuelSavings: "₹1,350 (13.4 Liters / 36 kWh)",
          timeSaved: "26 mins",
          co2Reduction: "15.4 kg CO₂",
          eta: "10:45 AM (30 mins total)"
        },
        waypointsList: `
          <div style="display:flex; flex-direction:column; gap:10px;">
            <div style="display:flex; align-items:center; justify-content:space-between; padding:10px; background:#DCFCE7; border:1px solid #16A34A; border-radius:6px;">
              <div><strong>Start:</strong> Central Depot HQ (Marina Beach Road)</div>
              <span class="badge badge-success">08:00 AM</span>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; padding:10px; border:1px solid #E5E7EB; border-radius:6px;">
              <div><strong>Stop 1:</strong> BIN-101 (Marina Beach Promenade) - Fill: 92%</div>
              <span class="badge badge-danger">High Priority</span>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; padding:10px; border:1px solid #E5E7EB; border-radius:6px;">
              <div><strong>Stop 2:</strong> BIN-102 (T. Nagar Ranganathan St) - Fill: 88%</div>
              <span class="badge badge-warning">Medium Priority</span>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; padding:10px; border:1px solid #E5E7EB; border-radius:6px;">
              <div><strong>Stop 3:</strong> BIN-107 (Mylapore Kapaleeshwarar Zone) - Fill: 82%</div>
              <span class="badge badge-warning">Medium Priority</span>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; padding:10px; border:1px solid #E5E7EB; border-radius:6px;">
              <div><strong>Stop 4:</strong> BIN-110 (Egmore Station Complex) - Fill: 41%</div>
              <span class="badge badge-success">Low Priority</span>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; padding:10px; background:#DBEAFE; border:1px solid #2563EB; border-radius:6px;">
              <div><strong>Destination:</strong> Tamil Nadu Eco-Recycling Facility (Manali)</div>
              <span class="badge badge-info">10:45 AM ETA</span>
            </div>
          </div>
        `
      },
      'TRUCK-02': {
        waypoints: [
          [13.0405, 80.2337], // BIN-102 (T. Nagar)
          [13.0850, 80.2100], // BIN-104 (Anna Nagar Tower)
          [13.0700, 80.1940], // BIN-111 (Koyambedu Market)
          [13.1400, 80.2700]  // Kodungaiyur Landfill
        ],
        metrics: {
          shortestDistance: "14.6 km",
          fuelSavings: "₹1,180 (12.2 Liters / 32 kWh)",
          timeSaved: "22 mins",
          co2Reduction: "13.2 kg CO₂",
          eta: "11:15 AM (25 mins total)"
        },
        waypointsList: `
          <div style="display:flex; flex-direction:column; gap:10px;">
            <div style="display:flex; align-items:center; justify-content:space-between; padding:10px; background:#DCFCE7; border:1px solid #16A34A; border-radius:6px;">
              <div><strong>Start:</strong> North Depot HQ (Anna Nagar)</div>
              <span class="badge badge-success">08:30 AM</span>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; padding:10px; border:1px solid #E5E7EB; border-radius:6px;">
              <div><strong>Stop 1:</strong> BIN-102 (T. Nagar Ranganathan St) - Fill: 88%</div>
              <span class="badge badge-warning">Medium Priority</span>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; padding:10px; border:1px solid #E5E7EB; border-radius:6px;">
              <div><strong>Stop 2:</strong> BIN-104 (Anna Nagar Tower Park) - Fill: 76%</div>
              <span class="badge badge-warning">Medium Priority</span>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; padding:10px; border:1px solid #E5E7EB; border-radius:6px;">
              <div><strong>Stop 3:</strong> BIN-111 (Koyambedu Market) - Fill: 85%</div>
              <span class="badge badge-danger">High Priority</span>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; padding:10px; background:#DBEAFE; border:1px solid #2563EB; border-radius:6px;">
              <div><strong>Destination:</strong> Kodungaiyur Regional Landfill Site</div>
              <span class="badge badge-info">11:15 AM ETA</span>
            </div>
          </div>
        `
      },
      'TRUCK-03': {
        waypoints: [
          [12.9010, 80.2279], // BIN-103 (OMR IT Corridor)
          [12.9800, 80.2220], // BIN-108 (Velachery)
          [13.0060, 80.2570], // BIN-106 (Adyar)
          [12.9600, 80.2400]  // Perungudi Plant
        ],
        metrics: {
          shortestDistance: "19.2 km",
          fuelSavings: "₹1,620 (16.4 Liters / 42 kWh)",
          timeSaved: "30 mins",
          co2Reduction: "17.8 kg CO₂",
          eta: "11:40 AM (35 mins total)"
        },
        waypointsList: `
          <div style="display:flex; flex-direction:column; gap:10px;">
            <div style="display:flex; align-items:center; justify-content:space-between; padding:10px; background:#DCFCE7; border:1px solid #16A34A; border-radius:6px;">
              <div><strong>Start:</strong> South IT Expressway Depot (OMR)</div>
              <span class="badge badge-success">09:00 AM</span>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; padding:10px; border:1px solid #E5E7EB; border-radius:6px;">
              <div><strong>Stop 1:</strong> BIN-103 (OMR IT Corridor Sholinganallur) - Fill: 45%</div>
              <span class="badge badge-success">Low Priority</span>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; padding:10px; border:1px solid #E5E7EB; border-radius:6px;">
              <div><strong>Stop 2:</strong> BIN-108 (Velachery Main Road) - Fill: 61%</div>
              <span class="badge badge-warning">Medium Priority</span>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; padding:10px; border:1px solid #E5E7EB; border-radius:6px;">
              <div><strong>Stop 3:</strong> BIN-106 (Adyar Signal & Gandhi Nagar) - Fill: 94%</div>
              <span class="badge badge-danger">Critical Priority</span>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; padding:10px; background:#DBEAFE; border:1px solid #2563EB; border-radius:6px;">
              <div><strong>Destination:</strong> Perungudi Recovery Plant (OMR)</div>
              <span class="badge badge-info">11:40 AM ETA</span>
            </div>
          </div>
        `
      },
      'TRUCK-04': {
        waypoints: [
          [12.9249, 80.1000], // BIN-109 (Tambaram)
          [13.0100, 80.2120], // BIN-105 (Guindy Industrial)
          [13.0380, 80.1560]  // BIN-112 (Porur)
        ],
        metrics: {
          shortestDistance: "15.4 km",
          fuelSavings: "₹1,240 (12.8 Liters / 34 kWh)",
          timeSaved: "24 mins",
          co2Reduction: "14.1 kg CO₂",
          eta: "10:30 AM (22 mins total)"
        },
        waypointsList: `
          <div style="display:flex; flex-direction:column; gap:10px;">
            <div style="display:flex; align-items:center; justify-content:space-between; padding:10px; background:#DCFCE7; border:1px solid #16A34A; border-radius:6px;">
              <div><strong>Start:</strong> Southwest Industrial Depot (Guindy)</div>
              <span class="badge badge-success">08:15 AM</span>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; padding:10px; border:1px solid #E5E7EB; border-radius:6px;">
              <div><strong>Stop 1:</strong> BIN-109 (Tambaram Bus Terminal) - Fill: 97%</div>
              <span class="badge badge-danger">Critical Priority</span>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; padding:10px; border:1px solid #E5E7EB; border-radius:6px;">
              <div><strong>Stop 2:</strong> BIN-105 (Guindy Industrial Hub) - Fill: 30%</div>
              <span class="badge badge-success">Low Priority</span>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; padding:10px; border:1px solid #E5E7EB; border-radius:6px;">
              <div><strong>Stop 3:</strong> BIN-112 (Porur Junction) - Fill: 35%</div>
              <span class="badge badge-success">Low Priority</span>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; padding:10px; background:#DBEAFE; border:1px solid #2563EB; border-radius:6px;">
              <div><strong>Destination:</strong> Alandur Rail Waste Transit Station</div>
              <span class="badge badge-info">10:30 AM ETA</span>
            </div>
          </div>
        `
      }
    };

    const preset = routePresets[selectedTruck] || routePresets['TRUCK-01'];

    // 1. Draw route polyline on Leaflet maps
    if (window.WasteFlowMap && typeof window.WasteFlowMap.drawOptimizedRoute === 'function') {
      window.WasteFlowMap.drawOptimizedRoute(preset.waypoints);
    }

    // 2. Render Metrics to UI
    const distEl = document.getElementById('opt-distance');
    const fuelEl = document.getElementById('opt-fuel');
    const timeEl = document.getElementById('opt-time');
    const co2El = document.getElementById('opt-co2');
    const etaEl = document.getElementById('opt-eta');

    if (distEl) distEl.innerText = preset.metrics.shortestDistance;
    if (fuelEl) fuelEl.innerText = preset.metrics.fuelSavings;
    if (timeEl) timeEl.innerText = preset.metrics.timeSaved;
    if (co2El) co2El.innerText = preset.metrics.co2Reduction;
    if (etaEl) etaEl.innerText = preset.metrics.eta;

    // 3. Render Turn-by-Turn Waypoints list
    const waypointsContainer = document.getElementById('opt-waypoints-list');
    if (waypointsContainer) {
      waypointsContainer.innerHTML = preset.waypointsList;
    }

    // 4. Trigger Toast Notification
    if (window.WasteFlowApp && typeof window.WasteFlowApp.showToastNotification === 'function') {
      window.WasteFlowApp.showToastNotification(
        "🤖 AI Route Recalculated",
        `Generated optimal TSP path for ${selectedTruck}. Distance: ${preset.metrics.shortestDistance}, Saved ${preset.metrics.timeSaved}!`,
        "success"
      );
    }
  }
};
