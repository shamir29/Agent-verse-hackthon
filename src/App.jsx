import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SearchModal from './components/SearchModal';
import NotificationDrawer from './components/NotificationDrawer';
import DeviceDetailModal from './components/DeviceDetailModal';
import ReportGeneratorModal from './components/ReportGeneratorModal';

import DashboardView from './views/DashboardView';
import LiveMonitoringView from './views/LiveMonitoringView';
import EnergyConsumptionView from './views/EnergyConsumptionView';
import DeviceMonitoringView from './views/DeviceMonitoringView';
import LoadAnalysisView from './views/LoadAnalysisView';
import DemandForecastView from './views/DemandForecastView';
import EnergyEfficiencyView from './views/EnergyEfficiencyView';
import AnomalyDetectionView from './views/AnomalyDetectionView';
import CostAnalyticsView from './views/CostAnalyticsView';
import SustainabilityView from './views/SustainabilityView';
import AIInsightsView from './views/AIInsightsView';
import ReportsView from './views/ReportsView';
import BackendIntegrationView from './views/BackendIntegrationView';

import { 
  INITIAL_TELEMETRY, 
  TELEMETRY_HISTORY, 
  DEVICES_DATA, 
  DEPARTMENT_USAGE, 
  BUILDING_USAGE, 
  DEMAND_FORECAST_DATA, 
  ANOMALIES_LIST, 
  COST_ANALYTICS, 
  AI_SUGGESTIONS, 
  SUSTAINABILITY_METRICS, 
  AI_INSIGHTS_FEED, 
  PROTOCOL_REGISTERS 
} from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [telemetry, setTelemetry] = useState(INITIAL_TELEMETRY);
  const [history, setHistory] = useState(TELEMETRY_HISTORY);
  const [devices, setDevices] = useState(DEVICES_DATA);
  const [anomalies, setAnomalies] = useState(ANOMALIES_LIST);
  const [aiSuggestions, setAiSuggestions] = useState(AI_SUGGESTIONS);
  const [isLiveStreaming, setIsLiveStreaming] = useState(true);

  // Modals & Overlays State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Real-time Notifications list
  const [notifications, setNotifications] = useState([
    { id: 'N-1', title: 'High Energy Consumption Alert', message: 'Machine Line #4 drawing 42% excessive starting torque.', severity: 'CRITICAL', timestamp: '14:12 PM', acknowledged: false, targetTab: 'anomaly_detection' },
    { id: 'N-2', title: 'Peak Demand Limit Approaching', message: 'Facility power draw reached 512 kW (Cap 600 kW).', severity: 'WARNING', timestamp: '14:05 PM', acknowledged: false, targetTab: 'load_analysis' },
    { id: 'N-3', title: 'HVAC Chiller #2 Maintenance Reminder', message: 'Vibration threshold variance detected on Motor Bearing #2.', severity: 'WARNING', timestamp: '13:45 PM', acknowledged: false, targetTab: 'device_monitoring' },
    { id: 'N-4', title: 'Voltage Instability Glitch', message: 'Transient phase voltage dip (0.8% variance) on Switchgear 2.', severity: 'INFO', timestamp: '12:30 PM', acknowledged: true, targetTab: 'live_monitoring' },
    { id: 'N-5', title: 'Low Power Factor Dip', message: 'Substation Busbar 2 power factor dropped to 0.91.', severity: 'WARNING', timestamp: '11:15 AM', acknowledged: true, targetTab: 'anomaly_detection' },
    { id: 'N-6', title: 'Renewable Solar Output Peak', message: 'Rooftop solar array reached maximum 165 kW output.', severity: 'INFO', timestamp: '10:30 AM', acknowledged: true, targetTab: 'sustainability' }
  ]);

  // Live Telemetry 1-second simulation engine
  useEffect(() => {
    if (!isLiveStreaming) return;

    const timer = setInterval(() => {
      setTelemetry((prev) => {
        const deltaPower = (Math.random() - 0.48) * 3.5;
        const newPowerKw = Math.max(380, Math.min(540, prev.powerKw + deltaPower));
        const deltaVoltage = (Math.random() - 0.5) * 0.8;
        const newVoltage = Math.max(398, Math.min(403, prev.voltage + deltaVoltage));
        const deltaFreq = (Math.random() - 0.5) * 0.04;
        const newFreq = Math.max(49.90, Math.min(50.10, prev.frequency + deltaFreq));
        const deltaPF = (Math.random() - 0.5) * 0.005;
        const newPF = Math.max(0.95, Math.min(0.99, prev.powerFactor + deltaPF));

        return {
          ...prev,
          powerKw: newPowerKw,
          voltage: newVoltage,
          frequency: newFreq,
          powerFactor: newPF,
          energyKwhToday: prev.energyKwhToday + (newPowerKw / 3600),
          costTodayUsd: prev.costTodayUsd + ((newPowerKw / 3600) * 0.14)
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isLiveStreaming]);

  // Handle Ctrl+K shortcut for Search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Action Handlers
  const handleAcknowledgeAlert = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, acknowledged: true } : n));
  };

  const handleApplySuggestion = (id) => {
    setAiSuggestions(prev => prev.map(s => s.id === id ? { ...s, applied: true } : s));
  };

  const handleResolveAnomaly = (id) => {
    setAnomalies(prev => prev.map(a => a.id === id ? { ...a, status: 'RESOLVED' } : a));
  };

  return (
    <div className="app-container">
      {/* Top Header Navigation */}
      <Header 
        activeTab={activeTab}
        telemetry={telemetry}
        notifications={notifications}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        isLiveStreaming={isLiveStreaming}
        setIsLiveStreaming={setIsLiveStreaming}
      />

      {/* Main Body with Left Sidebar + Scrollable Content */}
      <div className="main-body">
        <Sidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeAnomaliesCount={anomalies.filter(a => a.status === 'ACTIVE').length}
          aiSuggestionsCount={aiSuggestions.filter(s => !s.applied).length}
        />

        <main className="content-area">
          {activeTab === 'dashboard' && (
            <DashboardView 
              telemetry={telemetry}
              anomalies={anomalies}
              aiInsights={AI_INSIGHTS_FEED}
              onNavigate={setActiveTab}
              onSelectDevice={(dev) => setSelectedDevice(dev)}
              onOpenReportModal={() => setIsReportModalOpen(true)}
            />
          )}

          {activeTab === 'live_monitoring' && (
            <LiveMonitoringView 
              telemetry={telemetry}
              history={history}
              isLiveStreaming={isLiveStreaming}
              setIsLiveStreaming={setIsLiveStreaming}
            />
          )}

          {activeTab === 'consumption' && (
            <EnergyConsumptionView 
              departmentUsage={DEPARTMENT_USAGE}
              buildingUsage={BUILDING_USAGE}
              devices={devices}
            />
          )}

          {activeTab === 'device_monitoring' && (
            <DeviceMonitoringView 
              devices={devices}
              onSelectDevice={(dev) => setSelectedDevice(dev)}
            />
          )}

          {activeTab === 'load_analysis' && (
            <LoadAnalysisView 
              telemetry={telemetry}
              history={history}
            />
          )}

          {activeTab === 'demand_forecast' && (
            <DemandForecastView 
              forecastData={DEMAND_FORECAST_DATA}
            />
          )}

          {activeTab === 'energy_efficiency' && (
            <EnergyEfficiencyView 
              suggestions={aiSuggestions}
              onApplySuggestion={handleApplySuggestion}
            />
          )}

          {activeTab === 'anomaly_detection' && (
            <AnomalyDetectionView 
              anomalies={anomalies}
              onResolveAnomaly={handleResolveAnomaly}
            />
          )}

          {activeTab === 'cost_analytics' && (
            <CostAnalyticsView 
              costData={COST_ANALYTICS}
            />
          )}

          {activeTab === 'sustainability' && (
            <SustainabilityView 
              metrics={SUSTAINABILITY_METRICS}
            />
          )}

          {activeTab === 'ai_insights' && (
            <AIInsightsView 
              insightsFeed={AI_INSIGHTS_FEED}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsView 
              onOpenReportModal={() => setIsReportModalOpen(true)}
            />
          )}

          {activeTab === 'backend_integration' && (
            <BackendIntegrationView 
              protocolRegisters={PROTOCOL_REGISTERS}
            />
          )}
        </main>
      </div>

      {/* Global Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={setActiveTab}
        devices={devices}
        anomalies={anomalies}
      />

      {/* Real-time Notification Drawer */}
      <NotificationDrawer 
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onAcknowledgeAlert={handleAcknowledgeAlert}
        onNavigate={setActiveTab}
      />

      {/* Device Deep-Dive Detail Modal */}
      <DeviceDetailModal 
        device={selectedDevice}
        onClose={() => setSelectedDevice(null)}
      />

      {/* Report Export Modal */}
      <ReportGeneratorModal 
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
}
