import React from 'react';
import { DigitalTwinProvider, useDigitalTwin } from './context/DigitalTwinContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardHero } from './components/DashboardHero';
import { DigitalTwinMap } from './components/Map/DigitalTwinMap';
import { LiveMonitoring } from './components/Monitoring/LiveMonitoring';
import { AISimulationCenter } from './components/Simulation/AISimulationCenter';
import { InfrastructureLayersView } from './components/Layers/InfrastructureLayersView';
import { AIPredictiveAnalytics } from './components/Prediction/AIPredictiveAnalytics';
import { CrossAgentCollaboration } from './components/Collaboration/CrossAgentCollaboration';
import { AIInsightsConsole } from './components/Insights/AIInsightsConsole';
import { SustainabilityDashboard } from './components/Sustainability/SustainabilityDashboard';
import { HistoricalPlayback } from './components/Playback/HistoricalPlayback';
import { ReportsExporter } from './components/Reports/ReportsExporter';
import { AlertsConsole } from './components/Alerts/AlertsConsole';
import { BackendIntegration } from './components/Settings/BackendIntegration';

const MainContent = () => {
  const { activeTab } = useDigitalTwin();

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <DashboardHero />
            
            {/* Embedded Digital Twin Map Section on Overview */}
            <div className="card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 className="card-title">Interactive 2D/3D Smart City Digital Twin Map</h3>
                <span className="badge badge-blue">14 Asset Types • Live Flow Vectors</span>
              </div>
              <DigitalTwinMap />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <AIInsightsConsole />
              <CrossAgentCollaboration />
            </div>
          </div>
        );

      case 'city_twin':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700 }}>
                Interactive 2D/3D Digital Twin Map View
              </h2>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                Inspect 1,482 smart city assets across 14 categories. Click any pin to open live health, load, and temperature telemetry.
              </p>
            </div>
            <DigitalTwinMap />
          </div>
        );

      case 'monitoring':
        return <LiveMonitoring />;

      case 'simulation':
        return <AISimulationCenter />;

      case 'layers':
        return <InfrastructureLayersView />;

      case 'prediction':
        return <AIPredictiveAnalytics />;

      case 'collaboration':
        return <CrossAgentCollaboration />;

      case 'insights':
        return <AIInsightsConsole />;

      case 'sustainability':
        return <SustainabilityDashboard />;

      case 'playback':
        return <HistoricalPlayback />;

      case 'reports':
        return <ReportsExporter />;

      case 'alerts':
        return <AlertsConsole />;

      case 'settings':
        return <BackendIntegration />;

      default:
        return <DashboardHero />;
    }
  };

  return (
    <main className="content-area">
      {renderActiveTab()}
    </main>
  );
};

export function App() {
  return (
    <DigitalTwinProvider>
      <div className="app-container">
        <Header />
        <div className="main-layout">
          <Sidebar />
          <MainContent />
        </div>
      </div>
    </DigitalTwinProvider>
  );
}

export default App;
