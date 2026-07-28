/* WasteFlow AI - Interactive Leaflet Map Engine (Multi-Instance Manager with Dynamic Request Markers) */

window.WasteFlowMap = {
  instances: {},
  routePolylines: [],

  init: function(elementId) {
    const container = document.getElementById(elementId);
    if (!container) return;

    const config = window.WasteFlowConfig;
    
    if (typeof L === 'undefined') {
      console.warn("Leaflet library not loaded yet.");
      container.innerHTML = `
        <div style="display:flex; align-items:center; justify-content:center; height:100%; color:#6B7280; font-size:14px; background:#F8FAFC;">
          Map Engine Offline (Leaflet CDN initializing...)
        </div>
      `;
      return;
    }

    // Clear existing Leaflet instance on container if any
    if (this.instances[elementId]) {
      try {
        this.instances[elementId].remove();
      } catch(e) {}
    }

    // Initialize New Map Instance
    const map = L.map(elementId, {
      center: config.cityCenter,
      zoom: config.cityZoom,
      zoomControl: true,
      attributionControl: false
    });

    // Enterprise Clean Light Theme Map Tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map);

    this.instances[elementId] = map;
    this.renderLayersForMap(map);

    // Invalidate size after layout settles
    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  },

  invalidateAllSizes: function() {
    Object.values(this.instances).forEach(map => {
      if (map) {
        map.invalidateSize();
      }
    });
  },

  refreshAllMaps: function() {
    Object.values(this.instances).forEach(map => {
      if (map) {
        map.eachLayer(layer => {
          if (layer instanceof L.Marker || layer instanceof L.Polyline) {
            map.removeLayer(layer);
          }
        });
        this.renderLayersForMap(map);
      }
    });
  },

  createSvgIcon: function(color, symbolSvg, size = 32) {
    const svgHtml = `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 5px rgba(0,0,0,0.25);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
      ">
        ${symbolSvg}
      </div>
    `;
    return L.divIcon({
      html: svgHtml,
      className: '',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
      popupAnchor: [0, -size / 2]
    });
  },

  renderLayersForMap: function(map) {
    if (!map) return;

    const config = window.WasteFlowConfig;

    // 1. Render Smart Bins
    const binIconSvg = `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>`;

    config.smartBins.forEach(bin => {
      let color = "#16A34A"; // Green
      if (bin.overflowRisk === 'HIGH') color = "#F59E0B"; // Amber
      if (bin.overflowRisk === 'CRITICAL') color = "#DC2626"; // Red

      const icon = this.createSvgIcon(color, binIconSvg, 30);
      const marker = L.marker([bin.lat, bin.lng], { icon: icon }).addTo(map);

      const popupHtml = `
        <div class="map-popup-header">
          <span>${bin.id}</span>
          <span class="badge ${bin.overflowRisk === 'CRITICAL' ? 'badge-danger' : bin.overflowRisk === 'HIGH' ? 'badge-warning' : 'badge-success'}">${bin.overflowRisk}</span>
        </div>
        <div class="map-popup-row"><span class="map-popup-label">Location:</span> <span class="map-popup-value">${bin.location}</span></div>
        <div class="map-popup-row"><span class="map-popup-label">Waste Type:</span> <span class="map-popup-value">${bin.type}</span></div>
        <div class="map-popup-row"><span class="map-popup-label">Fill Level:</span> <span class="map-popup-value" style="color:${color}">${bin.fillLevel}%</span></div>
        <div class="map-popup-row"><span class="map-popup-label">Methane Level:</span> <span class="map-popup-value">${bin.methane} ppm</span></div>
        <div class="map-popup-row"><span class="map-popup-label">Battery Level:</span> <span class="map-popup-value">${bin.battery}%</span></div>
        <div class="map-popup-row"><span class="map-popup-label">AI Priority Score:</span> <span class="map-popup-value">${bin.priorityScore}/100</span></div>
        <div class="map-popup-row"><span class="map-popup-label">Last Collection:</span> <span class="map-popup-value">${bin.lastCollection}</span></div>
        <div style="margin-top:8px;">
          <button onclick="window.WasteFlowApp.dispatchCollectionForBin('${bin.id}')" class="btn btn-primary btn-sm" style="width:100%;">Dispatch Pickup</button>
        </div>
      `;

      marker.bindPopup(popupHtml);
    });

    // 2. Render Collection Fleet Trucks
    const truckIconSvg = `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="2"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>`;

    config.fleet.forEach(truck => {
      const icon = this.createSvgIcon("#2563EB", truckIconSvg, 34);
      const marker = L.marker([truck.lat, truck.lng], { icon: icon }).addTo(map);

      const popupHtml = `
        <div class="map-popup-header">
          <span>${truck.id}</span>
          <span class="badge badge-info">${truck.status}</span>
        </div>
        <div class="map-popup-row"><span class="map-popup-label">Driver:</span> <span class="map-popup-value">${truck.driver}</span></div>
        <div class="map-popup-row"><span class="map-popup-label">Vehicle:</span> <span class="map-popup-value">${truck.model}</span></div>
        <div class="map-popup-row"><span class="map-popup-label">Capacity Used:</span> <span class="map-popup-value">${truck.capacityUsed}%</span></div>
        <div class="map-popup-row"><span class="map-popup-label">Fuel/Battery:</span> <span class="map-popup-value">${truck.fuel}%</span></div>
        <div class="map-popup-row"><span class="map-popup-label">Speed:</span> <span class="map-popup-value">${truck.speed} km/h</span></div>
        <div class="map-popup-row"><span class="map-popup-label">Active Route:</span> <span class="map-popup-value">${truck.route}</span></div>
      `;

      marker.bindPopup(popupHtml);
    });

    // 3. Render Recycling Facilities & Landfills
    const recIconSvg = `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>`;

    config.recyclingCenters.forEach(facility => {
      const icon = this.createSvgIcon("#059669", recIconSvg, 32);
      const marker = L.marker([facility.lat, facility.lng], { icon: icon }).addTo(map);
      marker.bindPopup(`
        <div class="map-popup-header"><span>${facility.name}</span></div>
        <div class="map-popup-row"><span class="map-popup-label">Processed Waste:</span> <span class="map-popup-value">${facility.processedTons} Tons</span></div>
        <div class="map-popup-row"><span class="map-popup-label">Efficiency:</span> <span class="map-popup-value">${facility.efficiency}%</span></div>
        <div class="map-popup-row"><span class="map-popup-label">Daily Revenue:</span> <span class="map-popup-value">${facility.revenue}</span></div>
      `);
    });

    // 4. Illegal Dumping Hotspots
    const dumpIconSvg = `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`;

    config.illegalDumpingEvents.forEach(dump => {
      const icon = this.createSvgIcon("#DC2626", dumpIconSvg, 32);
      const marker = L.marker([dump.lat, dump.lng], { icon: icon }).addTo(map);
      marker.bindPopup(`
        <div class="map-popup-header"><span>${dump.id} - ALERT</span></div>
        <div class="map-popup-row"><span class="map-popup-label">Type:</span> <span class="map-popup-value">${dump.type}</span></div>
        <div class="map-popup-row"><span class="map-popup-label">Location:</span> <span class="map-popup-value">${dump.location}</span></div>
        <div class="map-popup-row"><span class="map-popup-label">AI Confidence:</span> <span class="map-popup-value">${dump.confidence}%</span></div>
      `);
    });

    // 5. Dynamic Citizen & Emergency Pickup Requests (Purple Markers)
    const reqIconSvg = `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;

    if (config.activeRequests && config.activeRequests.length > 0) {
      config.activeRequests.forEach(req => {
        const icon = this.createSvgIcon("#8B5CF6", reqIconSvg, 34);
        const marker = L.marker([req.lat, req.lng], { icon: icon }).addTo(map);

        const popupHtml = `
          <div class="map-popup-header">
            <span>⚡ ${req.id} (NEW REQUEST)</span>
            <span class="badge badge-warning">PENDING</span>
          </div>
          <div class="map-popup-row"><span class="map-popup-label">Type:</span> <span class="map-popup-value">${req.type}</span></div>
          <div class="map-popup-row"><span class="map-popup-label">Location:</span> <span class="map-popup-value">${req.location}</span></div>
          <div class="map-popup-row"><span class="map-popup-label">Received:</span> <span class="map-popup-value">${req.time}</span></div>
          <div style="margin-top:10px;">
            <button onclick="window.WasteFlowApp.completePickupRequest('${req.id}')" class="btn btn-primary btn-sm" style="width:100%; background-color:#8B5CF6; border-color:#8B5CF6;">Complete & Remove Request</button>
          </div>
        `;

        marker.bindPopup(popupHtml);
      });
    }
  },

  drawOptimizedRoute: function(routePoints) {
    Object.values(this.instances).forEach(map => {
      if (!map) return;

      // Clear previous route polylines
      if (this.routePolylines && this.routePolylines.length > 0) {
        this.routePolylines.forEach(p => {
          try { map.removeLayer(p); } catch(e){}
        });
        this.routePolylines = [];
      }

      const polyline = L.polyline(routePoints, {
        color: '#16A34A',
        weight: 5,
        opacity: 0.85,
        dashArray: '8, 8'
      }).addTo(map);

      this.routePolylines.push(polyline);
      
      try {
        map.fitBounds(polyline.getBounds(), { padding: [40, 40] });
      } catch(e) {}
    });
  }
};
