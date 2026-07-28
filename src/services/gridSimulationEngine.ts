import {
  GridNode,
  PowerLine,
  SolarFarm,
  WindFarm,
  BatteryBESS,
  DistrictBuilding,
  GridFailureAlert,
  TelemetryStats,
  AgentMessage
} from '../types/powerGrid';

export class GridSimulationEngine {
  public nodes: GridNode[] = [];
  public powerLines: PowerLine[] = [];
  public solarFarms: SolarFarm[] = [];
  public windFarms: WindFarm[] = [];
  public battery: BatteryBESS;
  public buildings: DistrictBuilding[] = [];
  public alerts: GridFailureAlert[] = [];
  public agentMessages: AgentMessage[] = [];
  public telemetry: TelemetryStats;

  public isSimulating = true;
  public simSpeed = 1; // 1x, 2x, 5x
  public timeOfDayHours = 14.5; // 2:30 PM default sunny peak
  public weatherCondition: 'sunny' | 'cloudy' | 'stormy' | 'calm' = 'sunny';

  private listeners: (() => void)[] = [];
  private intervalId: any = null;

  constructor() {
    // 1. Initialize Generation & Substation Nodes with 3D Extrusion Heights
    this.nodes = [
      { id: 'node_solar', name: 'Helios Solar Park', type: 'solar', x: 12, y: 22, heightExtrusion: 35, capacityMW: 240, currentMW: 195, voltageKV: 115, frequencyHz: 60.0, status: 'online' },
      { id: 'node_wind_1', name: 'Aeolus Wind Ridge', type: 'wind', x: 18, y: 72, heightExtrusion: 65, capacityMW: 180, currentMW: 142, voltageKV: 115, frequencyHz: 60.0, status: 'online' },
      { id: 'node_wind_2', name: 'Zephyr Offshore Farm', type: 'wind', x: 42, y: 88, heightExtrusion: 75, capacityMW: 120, currentMW: 95, voltageKV: 115, frequencyHz: 60.0, status: 'online' },
      { id: 'node_hydro', name: 'Cascade Dam Hydro', type: 'hydro', x: 78, y: 15, heightExtrusion: 45, capacityMW: 150, currentMW: 110, voltageKV: 230, frequencyHz: 60.0, status: 'online' },
      { id: 'node_thermal', name: 'Apex Reserve Thermal', type: 'thermal', x: 88, y: 48, heightExtrusion: 80, capacityMW: 100, currentMW: 25, voltageKV: 230, frequencyHz: 60.0, status: 'online' },
      { id: 'node_sub_north', name: 'North High-Voltage Substation', type: 'substation', x: 34, y: 32, heightExtrusion: 50, capacityMW: 450, currentMW: 320, voltageKV: 230, frequencyHz: 60.0, status: 'online' },
      { id: 'node_sub_south', name: 'Metro Distribution Hub', type: 'substation', x: 62, y: 62, heightExtrusion: 50, capacityMW: 450, currentMW: 310, voltageKV: 115, frequencyHz: 60.0, status: 'online' },
      { id: 'node_bess', name: 'Titan BESS Energy Bank', type: 'battery', x: 50, y: 45, heightExtrusion: 40, capacityMW: 200, currentMW: 0, voltageKV: 115, frequencyHz: 60.0, status: 'online' },
      
      // City Districts & Glowing Buildings (3D Height Extrusions)
      { id: 'node_bldg_hosp', name: 'St. Jude General Hospital', type: 'building', category: 'hospital', heightExtrusion: 90, priorityLevel: 1, x: 26, y: 52, capacityMW: 45, currentMW: 45, voltageKV: 13.8, frequencyHz: 60.0, status: 'online', electricitySupplyPct: 100 },
      { id: 'node_bldg_tech', name: 'Silicon Bay Tech Campus', type: 'building', category: 'tech_center', heightExtrusion: 110, priorityLevel: 2, x: 40, y: 22, capacityMW: 85, currentMW: 85, voltageKV: 13.8, frequencyHz: 60.0, status: 'online', electricitySupplyPct: 100 },
      { id: 'node_bldg_res', name: 'Metropolitan Residential District', type: 'building', category: 'residential', heightExtrusion: 70, priorityLevel: 4, x: 68, y: 40, capacityMW: 130, currentMW: 130, voltageKV: 13.8, frequencyHz: 60.0, status: 'online', electricitySupplyPct: 100 },
      { id: 'node_bldg_ind', name: 'Titan Industrial Heavy Zone', type: 'building', category: 'industrial', heightExtrusion: 60, priorityLevel: 5, x: 82, y: 75, capacityMW: 160, currentMW: 160, voltageKV: 34.5, frequencyHz: 60.0, status: 'online', electricitySupplyPct: 100 },
      { id: 'node_bldg_com', name: 'Downtown Financial Towers', type: 'building', category: 'commercial', heightExtrusion: 140, priorityLevel: 3, x: 55, y: 78, capacityMW: 95, currentMW: 95, voltageKV: 13.8, frequencyHz: 60.0, status: 'online', electricitySupplyPct: 100 },
      { id: 'node_bldg_def', name: 'Grid Command & Cyber Bunker', type: 'building', category: 'defense', heightExtrusion: 85, priorityLevel: 1, x: 15, y: 45, capacityMW: 35, currentMW: 35, voltageKV: 13.8, frequencyHz: 60.0, status: 'online', electricitySupplyPct: 100 }
    ];

    // 2. Power Transmission Lines (Grid Interconnections)
    this.powerLines = [
      { id: 'line_sol_sub', fromId: 'node_solar', toId: 'node_sub_north', maxCapacityMW: 260, currentFlowMW: 195, status: 'active', voltageKV: 115, efficiencyPct: 98.4 },
      { id: 'line_wind1_sub', fromId: 'node_wind_1', toId: 'node_sub_north', maxCapacityMW: 200, currentFlowMW: 142, status: 'active', voltageKV: 115, efficiencyPct: 97.9 },
      { id: 'line_wind2_south', fromId: 'node_wind_2', toId: 'node_sub_south', maxCapacityMW: 150, currentFlowMW: 95, status: 'active', voltageKV: 115, efficiencyPct: 98.1 },
      { id: 'line_hydro_sub', fromId: 'node_hydro', toId: 'node_sub_north', maxCapacityMW: 200, currentFlowMW: 110, status: 'active', voltageKV: 230, efficiencyPct: 99.1 },
      { id: 'line_therm_south', fromId: 'node_thermal', toId: 'node_sub_south', maxCapacityMW: 150, currentFlowMW: 25, status: 'active', voltageKV: 230, efficiencyPct: 97.5 },
      
      { id: 'line_sub_bess', fromId: 'node_sub_north', toId: 'node_bess', maxCapacityMW: 250, currentFlowMW: 40, status: 'active', voltageKV: 115, efficiencyPct: 99.5 },
      { id: 'line_bess_south', fromId: 'node_bess', toId: 'node_sub_south', maxCapacityMW: 250, currentFlowMW: 40, status: 'active', voltageKV: 115, efficiencyPct: 99.5 },
      
      { id: 'line_sub_hosp', fromId: 'node_sub_north', toId: 'node_bldg_hosp', maxCapacityMW: 60, currentFlowMW: 45, status: 'active', voltageKV: 13.8, efficiencyPct: 98.8 },
      { id: 'line_sub_def', fromId: 'node_solar', toId: 'node_bldg_def', maxCapacityMW: 50, currentFlowMW: 35, status: 'active', voltageKV: 13.8, efficiencyPct: 99.0 },
      { id: 'line_sub_tech', fromId: 'node_sub_north', toId: 'node_bldg_tech', maxCapacityMW: 110, currentFlowMW: 85, status: 'active', voltageKV: 13.8, efficiencyPct: 98.5 },
      
      { id: 'line_south_res', fromId: 'node_sub_south', toId: 'node_bldg_res', maxCapacityMW: 160, currentFlowMW: 130, status: 'active', voltageKV: 13.8, efficiencyPct: 97.8 },
      { id: 'line_south_ind', fromId: 'node_sub_south', toId: 'node_bldg_ind', maxCapacityMW: 200, currentFlowMW: 160, status: 'active', voltageKV: 34.5, efficiencyPct: 98.2 },
      { id: 'line_south_com', fromId: 'node_sub_south', toId: 'node_bldg_com', maxCapacityMW: 120, currentFlowMW: 95, status: 'active', voltageKV: 13.8, efficiencyPct: 98.0 }
    ];

    // 3. Solar & Wind Detailed Records
    this.solarFarms = [
      { id: 'sol_1', name: 'Helios Solar Park - Phase I & II', capacityMW: 240, currentOutputMW: 195, irradianceWm2: 890, cloudCoverPct: 10, panelEfficiencyPct: 23.8, panelTempC: 38.5, activeTrackers: 1420 }
    ];

    this.windFarms = [
      { id: 'wind_1', name: 'Aeolus Ridge Onshore Wind', capacityMW: 180, currentOutputMW: 142, windSpeedMs: 11.4, totalTurbines: 60, activeTurbines: 58, bladePitchDeg: 12, rotorRpm: 15.2 },
      { id: 'wind_2', name: 'Zephyr Offshore Wind Array', capacityMW: 120, currentOutputMW: 95, windSpeedMs: 13.1, totalTurbines: 40, activeTurbines: 40, bladePitchDeg: 8, rotorRpm: 18.0 }
    ];

    // 4. BESS Battery Energy Storage
    this.battery = {
      id: 'bess_main',
      name: 'Titan Megawatt BESS Bank',
      maxCapacityMWh: 500,
      currentChargeMWh: 380,
      stateOfChargePct: 76,
      maxPowerMW: 150,
      currentPowerMW: 0,
      mode: 'auto',
      healthPct: 98.5,
      temperatureC: 27.4,
      cycleCount: 412
    };

    // 5. Buildings
    this.buildings = [
      { id: 'bldg_1', nodeId: 'node_bldg_hosp', name: 'St. Jude General Hospital', category: 'hospital', demandMW: 45, suppliedMW: 45, powerPct: 100, criticality: 'High', glowColor: '#00f0ff' },
      { id: 'bldg_2', nodeId: 'node_bldg_tech', name: 'Silicon Bay Tech Campus', category: 'tech_center', demandMW: 85, suppliedMW: 85, powerPct: 100, criticality: 'Medium', glowColor: '#3b82f6' },
      { id: 'bldg_3', nodeId: 'node_bldg_res', name: 'Metropolitan Residential District', category: 'residential', demandMW: 130, suppliedMW: 130, powerPct: 100, criticality: 'Medium', glowColor: '#10b981' },
      { id: 'bldg_4', nodeId: 'node_bldg_ind', name: 'Titan Industrial Heavy Zone', category: 'industrial', demandMW: 160, suppliedMW: 160, powerPct: 100, criticality: 'Low', glowColor: '#f59e0b' },
      { id: 'bldg_5', nodeId: 'node_bldg_com', name: 'Downtown Financial Towers', category: 'commercial', demandMW: 95, suppliedMW: 95, powerPct: 100, criticality: 'Medium', glowColor: '#a855f7' },
      { id: 'bldg_6', nodeId: 'node_bldg_def', name: 'Grid Command & Cyber Bunker', category: 'defense', demandMW: 35, suppliedMW: 35, powerPct: 100, criticality: 'High', glowColor: '#06b6d4' }
    ];

    this.telemetry = this.calculateTelemetry();

    this.agentMessages = [
      {
        id: 'msg_welcome',
        sender: 'ai',
        text: '⚡ Power Grid AI Command Center initialized. 3D Isometric View and Manual Feeder Circuit Rerouting ready. All 6 city districts are fully powered (100%).',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];

    this.startSimulation();
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  public startSimulation() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      if (this.isSimulating) {
        this.stepSimulation();
      }
    }, 1000);
  }

  public setSpeed(speed: number) {
    this.simSpeed = speed;
    this.notify();
  }

  public toggleSimulation() {
    this.isSimulating = !this.isSimulating;
    this.notify();
  }

  // --- MANUAL POWER LINE RE-ROUTING ---
  public addPowerLine(fromId: string, toId: string) {
    const fromNode = this.nodes.find(n => n.id === fromId);
    const toNode = this.nodes.find(n => n.id === toId);
    if (!fromNode || !toNode || fromId === toId) return;

    // Check if line already exists
    const existing = this.powerLines.find(l => (l.fromId === fromId && l.toId === toId) || (l.fromId === toId && l.toId === fromId));
    if (existing) {
      existing.status = 'active';
      existing.currentFlowMW = 50;
    } else {
      const newLine: PowerLine = {
        id: `line_user_${Date.now()}`,
        fromId,
        toId,
        maxCapacityMW: 200,
        currentFlowMW: 60,
        status: 'user_created',
        voltageKV: fromNode.voltageKV,
        efficiencyPct: 99.2
      };
      this.powerLines.push(newLine);
    }

    // Check if building was unpowered and is now connected to power!
    const building = this.buildings.find(b => b.nodeId === toId || b.nodeId === fromId);
    if (building && building.powerPct === 0) {
      building.suppliedMW = building.demandMW;
      building.powerPct = 100;
    }

    this.addAgentMessage(`🔌 Manual Circuit Connected: Established feeder transmission line between ${fromNode.name} and ${toNode.name}. Power flow engaged.`, {
      type: 'MANUAL_REROUTE',
      details: `New circuit ${fromId} -> ${toId}`
    });

    this.stepSimulation();
  }

  public removePowerLine(lineId: string) {
    this.powerLines = this.powerLines.filter(l => l.id !== lineId);
    this.stepSimulation();
  }

  public setBuildingDemand(buildingId: string, demandMW: number) {
    const building = this.buildings.find(b => b.id === buildingId);
    if (building) {
      building.demandMW = Math.max(5, demandMW);
      this.stepSimulation();
    }
  }

  public stepSimulation() {
    const deltaHours = (0.02 * this.simSpeed);
    this.timeOfDayHours = (this.timeOfDayHours + deltaHours) % 24;

    const sunAngleFactor = Math.max(0, Math.sin(((this.timeOfDayHours - 6) / 12) * Math.PI));
    let weatherIrradianceMultiplier = 1.0;
    let cloudPct = 10;

    if (this.weatherCondition === 'cloudy') {
      weatherIrradianceMultiplier = 0.45;
      cloudPct = 65;
    } else if (this.weatherCondition === 'stormy') {
      weatherIrradianceMultiplier = 0.15;
      cloudPct = 90;
    } else if (this.weatherCondition === 'calm') {
      weatherIrradianceMultiplier = 0.95;
      cloudPct = 15;
    }

    const currentIrradiance = Math.round(1000 * sunAngleFactor * weatherIrradianceMultiplier);
    this.solarFarms[0].irradianceWm2 = currentIrradiance;
    this.solarFarms[0].cloudCoverPct = cloudPct;
    this.solarFarms[0].currentOutputMW = Math.round(this.solarFarms[0].capacityMW * (currentIrradiance / 1000) * (1 - cloudPct / 200));

    const solarNode = this.nodes.find(n => n.id === 'node_solar');
    if (solarNode && solarNode.status !== 'failed') {
      solarNode.currentMW = this.solarFarms[0].currentOutputMW;
    }

    let windBaseMs = 11.5 + (Math.sin(Date.now() / 5000) * 2.5);
    if (this.weatherCondition === 'stormy') windBaseMs = 22.0;
    if (this.weatherCondition === 'calm') windBaseMs = 4.0;

    this.windFarms[0].windSpeedMs = parseFloat(windBaseMs.toFixed(1));
    this.windFarms[1].windSpeedMs = parseFloat((windBaseMs * 1.15).toFixed(1));

    this.windFarms[0].currentOutputMW = Math.round(Math.min(this.windFarms[0].capacityMW, this.windFarms[0].capacityMW * Math.pow(this.windFarms[0].windSpeedMs / 12, 2.5)));
    this.windFarms[1].currentOutputMW = Math.round(Math.min(this.windFarms[1].capacityMW, this.windFarms[1].capacityMW * Math.pow(this.windFarms[1].windSpeedMs / 12, 2.5)));

    const windNode1 = this.nodes.find(n => n.id === 'node_wind_1');
    const windNode2 = this.nodes.find(n => n.id === 'node_wind_2');
    if (windNode1 && windNode1.status !== 'failed') windNode1.currentMW = this.windFarms[0].currentOutputMW;
    if (windNode2 && windNode2.status !== 'failed') windNode2.currentMW = this.windFarms[1].currentOutputMW;

    const hydroNode = this.nodes.find(n => n.id === 'node_hydro');
    const thermalNode = this.nodes.find(n => n.id === 'node_thermal');

    let totalDemand = 0;
    this.buildings.forEach(b => {
      totalDemand += b.demandMW;
    });

    let totalGeneration = (solarNode?.status === 'online' ? solarNode.currentMW : 0) +
                          (windNode1?.status === 'online' ? windNode1.currentMW : 0) +
                          (windNode2?.status === 'online' ? windNode2.currentMW : 0) +
                          (hydroNode?.status === 'online' ? hydroNode.currentMW : 0) +
                          (thermalNode?.status === 'online' ? thermalNode.currentMW : 0);

    let netSurplusDeficit = totalGeneration - totalDemand;

    if (this.battery.mode === 'auto') {
      if (netSurplusDeficit > 10 && this.battery.stateOfChargePct < 99) {
        const chargePower = Math.min(this.battery.maxPowerMW, netSurplusDeficit * 0.8);
        this.battery.currentPowerMW = -Math.round(chargePower);
        this.battery.currentChargeMWh = Math.min(this.battery.maxCapacityMWh, this.battery.currentChargeMWh + (chargePower * (deltaHours / 10)));
      } else if (netSurplusDeficit < -10 && this.battery.stateOfChargePct > 5) {
        const dischargePower = Math.min(this.battery.maxPowerMW, Math.abs(netSurplusDeficit), (this.battery.currentChargeMWh / 0.5));
        this.battery.currentPowerMW = Math.round(dischargePower);
        this.battery.currentChargeMWh = Math.max(0, this.battery.currentChargeMWh - (dischargePower * (deltaHours / 10)));
        totalGeneration += dischargePower;
      } else {
        this.battery.currentPowerMW = 0;
      }
      this.battery.stateOfChargePct = Math.round((this.battery.currentChargeMWh / this.battery.maxCapacityMWh) * 100);
    } else if (this.battery.mode === 'discharge' && this.battery.stateOfChargePct > 2) {
      this.battery.currentPowerMW = this.battery.maxPowerMW;
      this.battery.currentChargeMWh = Math.max(0, this.battery.currentChargeMWh - (this.battery.maxPowerMW * (deltaHours / 10)));
      this.battery.stateOfChargePct = Math.round((this.battery.currentChargeMWh / this.battery.maxCapacityMWh) * 100);
      totalGeneration += this.battery.maxPowerMW;
    } else if (this.battery.mode === 'charge' && this.battery.stateOfChargePct < 99) {
      this.battery.currentPowerMW = -this.battery.maxPowerMW;
      this.battery.currentChargeMWh = Math.min(this.battery.maxCapacityMWh, this.battery.currentChargeMWh + (this.battery.maxPowerMW * (deltaHours / 10)));
      this.battery.stateOfChargePct = Math.round((this.battery.currentChargeMWh / this.battery.maxCapacityMWh) * 100);
    } else {
      this.battery.currentPowerMW = 0;
    }

    const bessNode = this.nodes.find(n => n.id === 'node_bess');
    if (bessNode) {
      bessNode.currentMW = Math.abs(this.battery.currentPowerMW);
    }

    const availableRatio = Math.min(1.2, totalGeneration / Math.max(1, totalDemand));
    
    this.buildings.forEach(b => {
      const bNode = this.nodes.find(n => n.id === b.nodeId);
      
      // Dynamic line connectivity check: check if building is connected via ANY active/user_created/rerouted line to an active substation or generator!
      const activeLinesToBuilding = this.powerLines.filter(l => (l.toId === b.nodeId || l.fromId === b.nodeId) && l.status !== 'tripped');
      const lineOk = activeLinesToBuilding.length > 0;

      if (!lineOk || bNode?.status === 'failed') {
        b.suppliedMW = 0;
        b.powerPct = 0;
        if (bNode) bNode.electricitySupplyPct = 0;
      } else {
        let buildingSupplyRatio = availableRatio;
        if (availableRatio < 1.0) {
          if (b.criticality === 'High') buildingSupplyRatio = Math.min(1.0, availableRatio * 1.4);
          else if (b.criticality === 'Medium') buildingSupplyRatio = availableRatio * 0.9;
          else buildingSupplyRatio = availableRatio * 0.7;
        }

        b.suppliedMW = Math.round(b.demandMW * Math.min(1.15, buildingSupplyRatio));
        b.powerPct = Math.round((b.suppliedMW / b.demandMW) * 100);
        if (bNode) bNode.electricitySupplyPct = b.powerPct;
      }

      if (b.powerPct === 0) b.glowColor = '#ef4444';
      else if (b.powerPct < 70) b.glowColor = '#f59e0b';
      else if (b.powerPct > 105) b.glowColor = '#00f0ff';
      else if (b.category === 'hospital') b.glowColor = '#06b6d4';
      else if (b.category === 'tech_center') b.glowColor = '#3b82f6';
      else b.glowColor = '#10b981';
    });

    this.powerLines.forEach(line => {
      const fromNode = this.nodes.find(n => n.id === line.fromId);
      if (line.status === 'tripped') {
        line.currentFlowMW = 0;
      } else {
        line.currentFlowMW = Math.round((fromNode?.currentMW || 100) * 0.6 + Math.random() * 5);
      }
    });

    this.telemetry = this.calculateTelemetry();
    this.notify();
  }

  public calculateTelemetry(): TelemetryStats {
    const solarNode = this.nodes.find(n => n.id === 'node_solar');
    const wind1 = this.nodes.find(n => n.id === 'node_wind_1');
    const wind2 = this.nodes.find(n => n.id === 'node_wind_2');
    const hydro = this.nodes.find(n => n.id === 'node_hydro');
    const thermal = this.nodes.find(n => n.id === 'node_thermal');

    const solMW = solarNode?.status === 'online' ? (solarNode.currentMW || 0) : 0;
    const windMW = (wind1?.status === 'online' ? (wind1.currentMW || 0) : 0) + (wind2?.status === 'online' ? (wind2.currentMW || 0) : 0);
    const hydroMW = hydro?.status === 'online' ? (hydro.currentMW || 0) : 0;
    const thermalMW = thermal?.status === 'online' ? (thermal.currentMW || 0) : 0;

    const totalGen = solMW + windMW + hydroMW + thermalMW + (this.battery.currentPowerMW > 0 ? this.battery.currentPowerMW : 0);
    const totalDem = this.buildings.reduce((acc, b) => acc + b.demandMW, 0);

    const renewableGen = solMW + windMW + hydroMW;
    const renewableShare = totalGen > 0 ? Math.round((renewableGen / totalGen) * 100) : 0;

    const freqNominal = 60.0;
    const loadImbalanceRatio = (totalGen - totalDem) / Math.max(1, totalDem);
    const gridFreq = parseFloat((freqNominal + (loadImbalanceRatio * 0.12)).toFixed(2));

    const activeFailures = this.alerts.filter(a => a.status === 'active').length;

    let stabilityScore = 100 - (activeFailures * 20);
    if (Math.abs(gridFreq - 60.0) > 0.3) stabilityScore -= 15;
    if (renewableShare > 80) stabilityScore += 5;
    stabilityScore = Math.max(0, Math.min(100, Math.round(stabilityScore)));

    return {
      totalGenerationMW: Math.round(totalGen),
      totalDemandMW: Math.round(totalDem),
      netBalanceMW: Math.round(totalGen - totalDem),
      renewableSharePct: Math.min(100, renewableShare),
      solarGenerationMW: Math.round(solMW),
      windGenerationMW: Math.round(windMW),
      hydroGenerationMW: Math.round(hydroMW),
      thermalReserveMW: Math.round(thermalMW),
      gridFrequencyHz: gridFreq,
      gridVoltageIndexPct: Math.round(98.5 + (Math.random() * 1.2)),
      bessChargePct: this.battery.stateOfChargePct,
      bessNetMW: this.battery.currentPowerMW,
      carbonOffsetTonsToday: Math.round((renewableGen * 0.42 * (this.timeOfDayHours / 24))),
      gridStabilityScore: stabilityScore,
      activeFailuresCount: activeFailures
    };
  }

  public triggerGridFailure(type: 'substation_trip' | 'transformer_overload' | 'line_break' | 'solar_flare') {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    if (type === 'line_break') {
      const line = this.powerLines.find(l => l.id === 'line_sub_hosp' || l.id === 'line_south_res');
      if (line) {
        line.status = 'tripped';
        line.currentFlowMW = 0;

        const newAlert: GridFailureAlert = {
          id: 'alert_' + Date.now(),
          timestamp,
          lineId: line.id,
          title: `Grid Transmission Line Fault (${line.id})`,
          description: `High voltage phase fault detected on feeder line connecting ${line.fromId} to ${line.toId}. Line tripped automatically.`,
          severity: 'critical',
          status: 'active',
          affectedLoadMW: 60
        };

        this.alerts.unshift(newAlert);
        this.addAgentMessage(`⚠️ WARNING: Critical line trip on ${line.id}. Hospital/District power cut! Connect a manual circuit or click Auto-Fix with AI.`);
      }
    } else if (type === 'substation_trip') {
      const sub = this.nodes.find(n => n.id === 'node_sub_north');
      if (sub) {
        sub.status = 'failed';
        const newAlert: GridFailureAlert = {
          id: 'alert_' + Date.now(),
          timestamp,
          nodeId: sub.id,
          title: `Substation North Busbar Trip`,
          description: `Overcurrent relay triggered at North High-Voltage Substation. 320MW load isolated.`,
          severity: 'critical',
          status: 'active',
          affectedLoadMW: 320
        };
        this.alerts.unshift(newAlert);
        this.addAgentMessage(`🚨 EMERGENCY ALERT: North Substation total trip! AI Agent is preparing alternate emergency backup routes.`);
      }
    } else if (type === 'solar_flare') {
      this.weatherCondition = 'stormy';
      const newAlert: GridFailureAlert = {
        id: 'alert_' + Date.now(),
        timestamp,
        title: `Solar Inverter Grid Disturbance`,
        description: `Severe cloud front and geomagnetic surge reduced solar output by 70%. BESS battery discharge automatically engaged.`,
        severity: 'warning',
        status: 'active',
        affectedLoadMW: 120
      };
      this.alerts.unshift(newAlert);
      this.addAgentMessage(`⚡ Weather disruption: Severe storm front reducing solar yield. AI Agent spinning up Thermal Reserve & discharging BESS.`);
    }

    this.stepSimulation();
  }

  public runAutoAIHealing() {
    const activeAlerts = this.alerts.filter(a => a.status === 'active');
    if (activeAlerts.length === 0) {
      this.addAgentMessage(`✅ Simple AI Agent scan complete: No active grid failures detected. All systems optimal.`);
      return;
    }

    activeAlerts.forEach(alert => {
      alert.status = 'resolved_by_ai';
      alert.reroutedVia = 'BESS Emergency Bypass Line & Metro South Substation Reroute';

      if (alert.lineId) {
        const line = this.powerLines.find(l => l.id === alert.lineId);
        if (line) {
          line.status = 'rerouted';
          line.currentFlowMW = 45;
        }
      }

      if (alert.nodeId) {
        const node = this.nodes.find(n => n.id === alert.nodeId);
        if (node) {
          node.status = 'online';
        }
      }
    });

    const thermal = this.nodes.find(n => n.id === 'node_thermal');
    if (thermal) thermal.currentMW = 65;

    this.battery.mode = 'auto';
    this.battery.currentPowerMW = 75;

    this.addAgentMessage(`🤖 AI Agent Executed Grid Reroute: Re-established power to St. Jude Hospital & Residential District via Titan BESS bypass line in 1.4s. 0 blackouts.`, {
      type: 'GRID_REROUTE',
      details: 'Substation B Bypass engaged. Discharged 75MW from BESS storage bank.'
    });

    this.stepSimulation();
  }

  public addAgentMessage(text: string, actionTaken?: { type: string; details: string }) {
    this.agentMessages.unshift({
      id: 'msg_' + Date.now(),
      sender: 'ai',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actionTaken
    });
    this.notify();
  }

  public userSendMessage(text: string) {
    const userMsg: AgentMessage = {
      id: 'msg_user_' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    this.agentMessages.unshift(userMsg);

    const lower = text.toLowerCase();
    setTimeout(() => {
      if (lower.includes('fix') || lower.includes('repair') || lower.includes('heal') || lower.includes('failure')) {
        this.runAutoAIHealing();
      } else if (lower.includes('battery') || lower.includes('charge') || lower.includes('discharge') || lower.includes('bess')) {
        if (lower.includes('charge')) {
          this.battery.mode = 'charge';
          this.addAgentMessage(`🤖 Agent Action: BESS set to forced CHARGE mode (charging at ${this.battery.maxPowerMW}MW).`);
        } else if (lower.includes('discharge')) {
          this.battery.mode = 'discharge';
          this.addAgentMessage(`🤖 Agent Action: BESS set to forced DISCHARGE mode (supplying ${this.battery.maxPowerMW}MW to grid).`);
        } else {
          this.battery.mode = 'auto';
          this.addAgentMessage(`🤖 Agent Status: BESS returned to AUTO smart peak shaving mode. Current SoC: ${this.battery.stateOfChargePct}%.`);
        }
      } else if (lower.includes('solar') || lower.includes('sun') || lower.includes('weather')) {
        this.weatherCondition = 'sunny';
        this.addAgentMessage(`🤖 Environmental Sync: Cleared weather. Helios Solar Park irradiance boosted to 890 W/m².`);
      } else if (lower.includes('wind')) {
        this.windFarms[0].windSpeedMs = 15.0;
        this.addAgentMessage(`🤖 Wind Optimization: Turbine blade pitch optimized for 15.0 m/s gale. Wind power output at maximum.`);
      } else if (lower.includes('status') || lower.includes('report') || lower.includes('health')) {
        this.addAgentMessage(`📊 Grid Diagnostic Summary: Total Generation ${this.telemetry.totalGenerationMW}MW | Demand ${this.telemetry.totalDemandMW}MW | Renewable Share ${this.telemetry.renewableSharePct}% | Stability Index ${this.telemetry.gridStabilityScore}/100.`);
      } else {
        this.addAgentMessage(`🤖 Power Grid AI Copilot: Monitoring command grid. You can command me to "fix grid failures", "charge battery", "connect lines", or "generate report".`);
      }
    }, 400);

    this.notify();
  }
}
