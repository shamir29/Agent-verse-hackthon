import React, { createContext, useContext, useState } from 'react';
import { MOCK_ASSETS, ASSET_CATEGORIES } from '../data/mockCityAssets';
import { SIMULATION_SCENARIOS } from '../data/simulationScenarios';
import { AI_INSIGHTS as INITIAL_INSIGHTS } from '../data/predictiveData';

const DigitalTwinContext = createContext();

export const DigitalTwinProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedAsset, setSelectedAsset] = useState(MOCK_ASSETS[0]); // default to T-08 or null
  const [searchQuery, setSearchQuery] = useState('');
  
  // Layer controls (12 layers enabled by default)
  const [activeLayers, setActiveLayers] = useState(
    ASSET_CATEGORIES.map(c => c.id)
  );

  // Map 2D / 3D mode
  const [mapMode, setMapMode] = useState('3d'); // '2d' or '3d'
  const [mapZoom, setMapZoom] = useState(1);
  
  // Simulation State
  const [activeSimulation, setActiveSimulation] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationSeverity, setSimulationSeverity] = useState(7);
  const [simulationProgress, setSimulationProgress] = useState(0);

  // Insights state
  const [insights, setInsights] = useState(INITIAL_INSIGHTS);
  
  // Alerts state
  const [alerts, setAlerts] = useState([
    {
      id: 'alt-101',
      severity: 'CRITICAL',
      title: 'Water Main Pressure Drop Detected',
      location: 'District 5 Trunk Line',
      timestamp: '2 mins ago',
      system: 'Water Pipeline',
      status: 'UNRESOLVED'
    },
    {
      id: 'alt-102',
      severity: 'HIGH',
      title: 'Transformer T-08 Winding Temp High (88.4°C)',
      location: 'North Industrial Zone',
      timestamp: '8 mins ago',
      system: 'Power Grid',
      status: 'UNRESOLVED'
    },
    {
      id: 'alt-103',
      severity: 'MEDIUM',
      title: '14 Downtown Smart Bins Exceeded 90% Fill',
      location: 'Downtown Core',
      timestamp: '15 mins ago',
      system: 'Waste Management',
      status: 'IN_PROGRESS'
    },
    {
      id: 'alt-104',
      severity: 'LOW',
      title: 'Solar Farm Panel Pitch Auto-Adjust Completed',
      location: 'Bay Renewable Hub',
      timestamp: '32 mins ago',
      system: 'Solar Optimization',
      status: 'RESOLVED'
    }
  ]);

  // Historical Playback state
  const [playbackRange, setPlaybackRange] = useState('last_hour'); // 'last_hour', 'yesterday', 'last_week', 'last_month'
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [playbackPlayhead, setPlaybackPlayhead] = useState(100); // 0 to 100%

  const toggleLayer = (layerId) => {
    setActiveLayers(prev => 
      prev.includes(layerId)
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    );
  };

  const selectAllLayers = () => {
    setActiveLayers(ASSET_CATEGORIES.map(c => c.id));
  };

  const clearAllLayers = () => {
    setActiveLayers([]);
  };

  const runSimulation = (scenarioId, severity = 7) => {
    const scenario = SIMULATION_SCENARIOS.find(s => s.id === scenarioId) || SIMULATION_SCENARIOS[0];
    setActiveSimulation(scenario);
    setSimulationSeverity(severity);
    setIsSimulating(true);
    setSimulationProgress(0);

    // Increment simulation progress animation
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setSimulationProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 200);
  };

  const stopSimulation = () => {
    setActiveSimulation(null);
    setIsSimulating(false);
    setSimulationProgress(0);
  };

  const dismissInsight = (insightId) => {
    setInsights(prev => prev.filter(i => i.id !== insightId));
  };

  const resolveAlert = (alertId) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'RESOLVED' } : a));
  };

  return (
    <DigitalTwinContext.Provider value={{
      activeTab,
      setActiveTab,
      selectedDistrict,
      setSelectedDistrict,
      selectedAsset,
      setSelectedAsset,
      searchQuery,
      setSearchQuery,
      activeLayers,
      toggleLayer,
      selectAllLayers,
      clearAllLayers,
      mapMode,
      setMapMode,
      mapZoom,
      setMapZoom,
      activeSimulation,
      isSimulating,
      simulationSeverity,
      setSimulationSeverity,
      simulationProgress,
      runSimulation,
      stopSimulation,
      insights,
      dismissInsight,
      alerts,
      resolveAlert,
      playbackRange,
      setPlaybackRange,
      isPlaying,
      setIsPlaying,
      playbackSpeed,
      setPlaybackSpeed,
      playbackPlayhead,
      setPlaybackPlayhead
    }}>
      {children}
    </DigitalTwinContext.Provider>
  );
};

export const useDigitalTwin = () => useContext(DigitalTwinContext);
