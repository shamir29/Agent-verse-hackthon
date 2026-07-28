/* WasteFlow AI - Master Application Controller */

window.WasteFlowApp = {
  activeView: 'dashboard',

  init: function() {
    this.bindEvents();
    this.showView('dashboard');

    // Initialize map after DOM ready
    setTimeout(() => {
      if (window.WasteFlowMap) {
        window.WasteFlowMap.init('main-map');
        window.WasteFlowMap.init('mini-map');
      }
      if (window.WasteFlowAgents) {
        window.WasteFlowAgents.init();
      }
      if (window.WasteFlowCharts) {
        window.WasteFlowCharts.initPredictionChart('pred-chart-canvas');
        window.WasteFlowCharts.initWasteGenerationChart('waste-gen-chart-canvas');
        window.WasteFlowCharts.initCarbonChart('carbon-chart-canvas');
        window.WasteFlowCharts.initRecyclingDoughnut('recycling-doughnut-canvas');
      }
      if (window.WasteFlowRouter) {
        window.WasteFlowRouter.generateOptimization();
      }
      if (window.WasteFlowReports) {
        window.WasteFlowReports.generateReport();
      }
    }, 200);
  },

  bindEvents: function() {
    // Sidebar Navigation Click Handlers
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const viewName = item.getAttribute('data-view');
        if (viewName) {
          this.showView(viewName);
        }
      });
    });

    // Global Search Input Keyboard Handler
    const searchInput = document.getElementById('global-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.handleGlobalSearch(e.target.value);
      });
    }

    // Chat Enter key handler
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
      chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          window.WasteFlowAssistant.sendMessage();
        }
      });
    }
  },

  showView: function(viewId) {
    this.activeView = viewId;

    // Update Sidebar Active state
    document.querySelectorAll('.nav-item').forEach(nav => {
      if (nav.getAttribute('data-view') === viewId) {
        nav.classList.add('active');
      } else {
        nav.classList.remove('active');
      }
    });

    // Hide all view panels and show target panel
    document.querySelectorAll('.view-panel').forEach(panel => {
      panel.classList.remove('active');
    });

    const targetPanel = document.getElementById(`view-${viewId}`);
    if (targetPanel) {
      targetPanel.classList.add('active');
    }

    // Trigger Leaflet map invalidateSize whenever switching views
    if (window.WasteFlowMap && typeof window.WasteFlowMap.invalidateAllSizes === 'function') {
      setTimeout(() => {
        window.WasteFlowMap.invalidateAllSizes();
      }, 150);
    }

    this.renderViewContent(viewId);
  },

  renderViewContent: function(viewId) {
    const config = window.WasteFlowConfig;

    if (viewId === 'bins') {
      this.renderBinsGrid();
    } else if (viewId === 'fleet') {
      this.renderFleetGrid();
    } else if (viewId === 'agents') {
      this.renderAgentsGrid();
    } else if (viewId === 'dumping') {
      this.renderIllegalDumpingList();
    } else if (viewId === 'recycling') {
      this.renderRecyclingGrid();
    } else if (viewId === 'landfills') {
      this.renderLandfillsGrid();
    }
  },

  renderBinsGrid: function() {
    const container = document.getElementById('bins-table-body');
    if (!container) return;

    const bins = window.WasteFlowConfig.smartBins;
    container.innerHTML = bins.map(bin => {
      let badgeClass = 'badge-success';
      if (bin.overflowRisk === 'HIGH') badgeClass = 'badge-warning';
      if (bin.overflowRisk === 'CRITICAL') badgeClass = 'badge-danger';

      return `
        <tr>
          <td><strong>${bin.id}</strong></td>
          <td>${bin.location}</td>
          <td><span class="badge badge-neutral">${bin.type}</span></td>
          <td>
            <div style="display:flex; align-items:center; gap:8px;">
              <div class="progress-bar-bg" style="width:80px;">
                <div class="progress-bar-fill ${bin.fillLevel > 85 ? 'fill-red' : bin.fillLevel > 70 ? 'fill-yellow' : 'fill-green'}" style="width:${bin.fillLevel}%;"></div>
              </div>
              <span style="font-weight:600;">${bin.fillLevel}%</span>
            </div>
          </td>
          <td>${bin.methane} ppm</td>
          <td>${bin.temp}°C / ${bin.humidity}%</td>
          <td>${bin.battery}%</td>
          <td><span class="badge ${badgeClass}">${bin.overflowRisk}</span></td>
          <td><strong style="color:${bin.priorityScore > 80 ? '#DC2626' : '#111827'}">${bin.priorityScore}</strong></td>
          <td>
            <button onclick="window.WasteFlowApp.dispatchCollectionForBin('${bin.id}')" class="btn btn-primary btn-sm">Dispatch</button>
          </td>
        </tr>
      `;
    }).join('');
  },

  renderFleetGrid: function() {
    const container = document.getElementById('fleet-cards-container');
    if (!container) return;

    const fleet = window.WasteFlowConfig.fleet;
    container.innerHTML = fleet.map(truck => `
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">${truck.id}</div>
            <div class="card-subtitle">${truck.model} • Driver: ${truck.driver}</div>
          </div>
          <span class="badge badge-info">${truck.status}</span>
        </div>
        <div style="display:flex; flex-direction:column; gap:10px; font-size:13px;">
          <div style="display:flex; justify-content:space-between;">
            <span style="color:#6B7280;">Capacity Load:</span>
            <strong>${truck.capacityUsed}%</strong>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill fill-blue" style="width:${truck.capacityUsed}%;"></div>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span style="color:#6B7280;">Fuel / Battery:</span>
            <strong>${truck.fuel}%</strong>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span style="color:#6B7280;">Active Route:</span>
            <strong>${truck.route}</strong>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span style="color:#6B7280;">Health & Service:</span>
            <span class="badge badge-success">${truck.maintenance}</span>
          </div>
        </div>
      </div>
    `).join('');
  },

  renderAgentsGrid: function() {
    const container = document.getElementById('agents-grid-container');
    if (!container) return;

    const agents = window.WasteFlowConfig.aiAgents;
    container.innerHTML = agents.map(agent => `
      <div class="agent-card">
        <div class="agent-card-header">
          <div class="agent-name">${agent.name}</div>
          <span class="badge badge-success">${agent.status}</span>
        </div>
        <div style="font-size:12px; color:#6B7280;">${agent.task}</div>
        <div class="agent-meta-row">
          <span>Confidence: <strong>${agent.confidence}%</strong></span>
          <span>Latency: <strong>${agent.latency}</strong></span>
          <span>Health: <strong>${agent.health}%</strong></span>
        </div>
        <div class="agent-decision-box">
          LOG: ${agent.decision}
        </div>
      </div>
    `).join('');
  },

  dispatchEnforcementCrew: function(eventId) {
    const evt = window.WasteFlowConfig.illegalDumpingEvents.find(e => e.id === eventId);
    if (evt) {
      evt.status = 'CREW_DISPATCHED';

      this.showToastNotification(
        "🚨 Enforcement Squad Dispatched",
        `Eco-Enforcement Squad #04 assigned to ${evt.location} (${evt.type}). Ticket #${evt.id} queued.`,
        "danger"
      );

      this.renderIllegalDumpingList();
    }
  },

  renderIllegalDumpingList: function() {
    const container = document.getElementById('dumping-events-container');
    if (!container) return;

    const events = window.WasteFlowConfig.illegalDumpingEvents;
    container.innerHTML = events.map(evt => {
      const isDispatched = evt.status === 'CREW_DISPATCHED';

      return `
        <div class="card" style="border-left: 4px solid #DC2626;">
          <div class="card-header">
            <div>
              <div class="card-title">${evt.id} - ${evt.type}</div>
              <div class="card-subtitle">${evt.location} • Recorded ${evt.time}</div>
            </div>
            <span class="badge ${isDispatched ? 'badge-success' : 'badge-danger'}">
              ${isDispatched ? 'CREW DISPATCHED' : 'SEVERITY: ' + evt.severity}
            </span>
          </div>
          <div style="display:flex; gap:16px; align-items:center;">
            <div style="width:120px; height:80px; background:#1E293B; border-radius:6px; display:flex; align-items:center; justify-content:center; color:white; font-size:11px; font-weight:600;">
              CCTV CAM #14
            </div>
            <div style="flex:1; font-size:13px; display:flex; flex-direction:column; gap:4px;">
              <div>AI Confidence Rating: <strong>${evt.confidence}%</strong></div>
              <div>Automated Recommendation: Dispatch Eco-Enforcement Rapid Response Team</div>
              <div style="margin-top:6px;">
                <button onclick="window.WasteFlowApp.dispatchEnforcementCrew('${evt.id}')" 
                        class="btn ${isDispatched ? 'btn-secondary' : 'btn-primary'} btn-sm"
                        ${isDispatched ? 'disabled style="opacity:0.75; cursor:default;"' : ''}>
                  ${isDispatched ? '✓ Enforcement Crew Dispatched' : 'Dispatch Enforcement Crew'}
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  renderRecyclingGrid: function() {
    const container = document.getElementById('recycling-grid-container');
    if (!container) return;

    const centers = window.WasteFlowConfig.recyclingCenters;
    container.innerHTML = centers.map(c => `
      <div class="card">
        <div class="card-header">
          <div class="card-title">${c.name}</div>
          <span class="badge badge-success">EFFICIENCY ${c.efficiency}%</span>
        </div>
        <div style="display:flex; flex-direction:column; gap:8px; font-size:13px;">
          <div style="display:flex; justify-content:space-between;"><span style="color:#6B7280;">Processed Waste:</span> <strong>${c.processedTons} Tons / Day</strong></div>
          <div style="display:flex; justify-content:space-between;"><span style="color:#6B7280;">Reject Contamination:</span> <strong>${c.rejectRate}%</strong></div>
          <div style="display:flex; justify-content:space-between;"><span style="color:#6B7280;">Machine Health Meter:</span> <strong>${c.machineHealth}%</strong></div>
          <div style="display:flex; justify-content:space-between;"><span style="color:#6B7280;">Daily Revenue Generated:</span> <strong style="color:#16A34A;">${c.revenue}</strong></div>
        </div>
      </div>
    `).join('');
  },

  renderLandfillsGrid: function() {
    const container = document.getElementById('landfills-grid-container');
    if (!container) return;

    const landfills = window.WasteFlowConfig.landfills;
    container.innerHTML = landfills.map(l => `
      <div class="card">
        <div class="card-header">
          <div class="card-title">${l.name}</div>
          <span class="badge ${l.environmentalRisk === 'LOW' ? 'badge-success' : 'badge-warning'}">RISK: ${l.environmentalRisk}</span>
        </div>
        <div style="display:flex; flex-direction:column; gap:8px; font-size:13px;">
          <div style="display:flex; justify-content:space-between;"><span style="color:#6B7280;">Capacity Occupied:</span> <strong>${l.capacityUsed}%</strong></div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill fill-red" style="width:${l.capacityUsed}%;"></div>
          </div>
          <div style="display:flex; justify-content:space-between;"><span style="color:#6B7280;">Methane Gas Level:</span> <strong>${l.methanePpm} ppm</strong></div>
          <div style="display:flex; justify-content:space-between;"><span style="color:#6B7280;">Leachate Level:</span> <strong>${l.leachateLevel}</strong></div>
          <div style="display:flex; justify-content:space-between;"><span style="color:#6B7280;">Predicted Closure Date:</span> <strong>${l.closureYear}</strong></div>
        </div>
      </div>
    `).join('');
  },

  completePickupRequest: function(reqId) {
    const config = window.WasteFlowConfig;
    const reqIndex = config.activeRequests.findIndex(r => r.id === reqId);

    if (reqIndex !== -1) {
      const req = config.activeRequests[reqIndex];
      config.activeRequests.splice(reqIndex, 1);

      this.showToastNotification(
        "Request Completed & Removed",
        `Dispatch task ${req.id} (${req.location}) completed! Marker removed from map.`,
        "success"
      );

      // Refresh Leaflet map to remove marker
      if (window.WasteFlowMap && typeof window.WasteFlowMap.refreshAllMaps === 'function') {
        window.WasteFlowMap.refreshAllMaps();
      }
    }
  },

  triggerSimulatedNewRequest: function() {
    const config = window.WasteFlowConfig;
    const samplePlaces = [
      { location: "T. Nagar Ranganathan Street Market", lat: 13.0410, lng: 80.2330, type: "Commercial Market Waste" },
      { location: "Anna Nagar 2nd Avenue Junction", lat: 13.0870, lng: 80.2120, type: "Dry Packaging Waste" },
      { location: "OMR IT Corridor (Taramani Gate)", lat: 12.9850, lng: 80.2450, type: "E-Waste Accumulation" },
      { location: "Koyambedu Flower Market Complex", lat: 13.0720, lng: 80.1910, type: "Organic Produce Waste" }
    ];

    const randomPick = samplePlaces[Math.floor(Math.random() * samplePlaces.length)];
    const newReqId = `REQ-${Math.floor(Math.random() * 800) + 100}`;

    const newReq = {
      id: newReqId,
      location: randomPick.location,
      lat: randomPick.lat,
      lng: randomPick.lng,
      type: randomPick.type,
      time: "Just now"
    };

    config.activeRequests.push(newReq);

    this.showToastNotification(
      "⚡ New Pickup Request Received",
      `New dispatch request ${newReqId} spawned at ${newReq.location}.`,
      "info"
    );

    // Refresh map to display new purple marker
    if (window.WasteFlowMap && typeof window.WasteFlowMap.refreshAllMaps === 'function') {
      window.WasteFlowMap.refreshAllMaps();
    }
  },

  autoDispatchEnabled: true,

  toggleAutoDispatch: function() {
    this.autoDispatchEnabled = !this.autoDispatchEnabled;
    const btn = document.getElementById('auto-dispatch-toggle-btn');
    if (btn) {
      if (this.autoDispatchEnabled) {
        btn.innerHTML = '🤖 Auto-Dispatch AI: ACTIVE';
        btn.style.backgroundColor = '#16A34A';
        btn.style.borderColor = '#16A34A';
        this.showToastNotification("Auto-Dispatch Enabled", "Smart Bin Monitoring Agent will automatically dispatch haulers for critical bins.", "success");
      } else {
        btn.innerHTML = '⏸️ Auto-Dispatch AI: PAUSED';
        btn.style.backgroundColor = '#6B7280';
        btn.style.borderColor = '#6B7280';
        this.showToastNotification("Auto-Dispatch Paused", "Manual collection dispatch mode activated.", "warning");
      }
    }
  },

  autoDispatchAllCritical: function() {
    const bins = window.WasteFlowConfig.smartBins.filter(b => b.fillLevel > 80 || b.overflowRisk === 'CRITICAL');
    if (bins.length === 0) {
      this.showToastNotification("Bins Audited", "No critical bin overflows detected.", "info");
      return;
    }

    bins.forEach(bin => {
      bin.fillLevel = 0;
      bin.overflowRisk = 'LOW';
      bin.priorityScore = 15;
      bin.lastCollection = 'Just now';
    });

    this.showToastNotification(
      "⚡ Batch Auto-Dispatch Complete",
      `Dispatched collection trucks to ${bins.length} critical bins simultaneously. Telemetry reset to 0%.`,
      "success"
    );

    this.renderBinsGrid();
  },

  dispatchCollectionForBin: function(binId, isAuto = false) {
    const bin = window.WasteFlowConfig.smartBins.find(b => b.id === binId);
    if (bin) {
      bin.fillLevel = 0;
      bin.overflowRisk = 'LOW';
      bin.priorityScore = 15;
      bin.lastCollection = 'Just now';

      const title = isAuto ? "🤖 AI Auto-Dispatch Triggered" : "Collection Truck Dispatched";
      const msg = isAuto 
        ? `Smart Bin Agent automatically dispatched truck to ${binId} (${bin.location}). Fill reset to 0%.`
        : `Truck assigned to ${binId} (${bin.location}). Fill telemetry reset to 0%.`;

      // Trigger Toast Banner Notification & Update Notification Center
      this.showToastNotification(title, msg, isAuto ? "info" : "success");

      this.renderBinsGrid();
    }
  },

  showToastNotification: function(title, message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (container) {
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.innerHTML = `
        <div class="toast-icon">✓</div>
        <div class="toast-content">
          <div class="toast-title">${title}</div>
          <div class="toast-message">${message}</div>
        </div>
      `;
      container.appendChild(toast);

      // Auto dismiss after 4 seconds
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
      }, 4000);
    }

    // Push entry into Smart Notifications Drawer
    const drawerBody = document.querySelector('#notification-drawer .drawer-body');
    if (drawerBody) {
      const alertItem = document.createElement('div');
      alertItem.className = 'alert-item info';
      alertItem.innerHTML = `
        <div class="alert-title">${title}</div>
        <div style="font-size:12px; color:#4B5563;">${message}</div>
        <div class="alert-time">Just now</div>
      `;
      drawerBody.insertBefore(alertItem, drawerBody.firstChild);
    }

    // Increment header notification badge counter
    const badge = document.querySelector('.notification-count');
    if (badge) {
      let count = parseInt(badge.innerText || '0', 10);
      badge.innerText = count + 1;
    }
  },

  toggleNotificationsDrawer: function() {
    const drawer = document.getElementById('notification-drawer');
    if (drawer) drawer.classList.toggle('open');
  },

  toggleAgentStatusModal: function() {
    const modal = document.getElementById('agent-status-modal');
    if (modal) modal.classList.toggle('open');
  },

  handleGlobalSearch: function(query) {
    if (!query || query.trim() === '') return;
    const q = query.toLowerCase();

    // Match Smart Bins
    const matchedBin = window.WasteFlowConfig.smartBins.find(b => b.id.toLowerCase().includes(q) || b.location.toLowerCase().includes(q));
    if (matchedBin) {
      this.showView('bins');
    }
  },

  refreshLiveViews: function() {
    if (this.activeView === 'bins') this.renderBinsGrid();
    if (this.activeView === 'fleet') this.renderFleetGrid();
    if (this.activeView === 'agents') this.renderAgentsGrid();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.WasteFlowApp.init();
});
