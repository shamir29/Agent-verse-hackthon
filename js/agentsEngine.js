/* WasteFlow AI - Autonomous Multi-Agent Simulation Engine */

window.WasteFlowAgents = {
  isSimulating: true,
  intervalId: null,
  logs: [],

  init: function() {
    this.startSimulation();
  },

  startSimulation: function() {
    if (this.intervalId) clearInterval(this.intervalId);

    // Tick every 3.5 seconds
    this.intervalId = setInterval(() => {
      if (this.isSimulating) {
        this.runSimulationTick();
      }
    }, 3500);
  },

  stopSimulation: function() {
    if (this.intervalId) clearInterval(this.intervalId);
  },

  runSimulationTick: function() {
    const config = window.WasteFlowConfig;

    // 1. Simulate Bin Fill Level & Gas Sensor Drift
    config.smartBins.forEach(bin => {
      // 30% chance to increment fill level slightly
      if (Math.random() < 0.35 && bin.fillLevel < 100) {
        bin.fillLevel = Math.min(100, bin.fillLevel + Math.floor(Math.random() * 3) + 1);
        if (bin.fillLevel > 90) {
          bin.overflowRisk = 'CRITICAL';
          bin.priorityScore = Math.min(99, bin.priorityScore + 2);
        } else if (bin.fillLevel > 75) {
          bin.overflowRisk = 'HIGH';
        }
      }

      // Methane fluctuation
      if (bin.type === 'Organic Waste' && Math.random() < 0.25) {
        bin.methane = Math.max(2, bin.methane + Math.floor(Math.random() * 5) - 2);
      }
    });

    // Auto-Dispatch AI Check (Autonomous Smart Bin Agent)
    if (window.WasteFlowApp && window.WasteFlowApp.autoDispatchEnabled) {
      const criticalBin = config.smartBins.find(b => b.fillLevel >= 95);
      if (criticalBin) {
        window.WasteFlowApp.dispatchCollectionForBin(criticalBin.id, true);
      }
    }

    // 2. Simulate Truck Movement & Telemetry
    config.fleet.forEach(truck => {
      if (truck.status === 'COLLECTING' || truck.status === 'EN_ROUTE') {
        truck.lat += (Math.random() - 0.5) * 0.0015;
        truck.lng += (Math.random() - 0.5) * 0.0015;
        
        // Fuel / Battery consumption
        if (Math.random() < 0.2 && truck.fuel > 5) {
          truck.fuel -= 1;
        }

        // Capacity increase
        if (truck.status === 'COLLECTING' && Math.random() < 0.3 && truck.capacityUsed < 98) {
          truck.capacityUsed = Math.min(100, truck.capacityUsed + 2);
        }
      }
    });

    // 3. Update AI Agents Metrics (Latency, Confidence, Decisions)
    const agentIndex = Math.floor(Math.random() * config.aiAgents.length);
    const targetAgent = config.aiAgents[agentIndex];
    targetAgent.latency = (Math.floor(Math.random() * 40) + 12) + "ms";
    targetAgent.confidence = (94 + (Math.random() * 5.9)).toFixed(1);

    // Generate dynamic decision log message
    const dynamicDecisions = [
      `Re-optimized truck arrival window for Sector ${Math.floor(Math.random() * 6) + 1}.`,
      `Inferred bin fill acceleration (+${(Math.random()*1.5).toFixed(1)}%/hr) via humidity sensors.`,
      `Adjusted optical sorter sensitivity on Conveyor Belt #${Math.floor(Math.random()*4)+1}.`,
      `Calculated CO2 offset: ${ (Math.random() * 2 + 1).toFixed(2) } metric tons for current batch.`,
      `Scanned 14 CCTV streams - Zero new illegal dumping violations detected.`
    ];

    targetAgent.decision = dynamicDecisions[Math.floor(Math.random() * dynamicDecisions.length)];

    // Trigger UI Refresh if application is running
    if (window.WasteFlowApp && typeof window.WasteFlowApp.refreshLiveViews === 'function') {
      window.WasteFlowApp.refreshLiveViews();
    }
  }
};
