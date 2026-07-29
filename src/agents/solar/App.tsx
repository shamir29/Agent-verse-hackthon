import React from 'react';
import { SolarProvider, useSolar } from './context/SolarContext';
import { TopNav } from './components/TopNav';
import { Sidebar } from './components/Sidebar';
import { HeroKpi } from './components/HeroKpi';
import { LiveMonitoringSection } from './components/LiveMonitoringSection';
import { SolarForecastSection } from './components/SolarForecastSection';
import { PanelHealthSection } from './components/PanelHealthSection';
import { PanelDetailModal } from './components/PanelDetailModal';
import { FaultDetectionSection } from './components/FaultDetectionSection';
import { BatteryOptimizationSection } from './components/BatteryOptimizationSection';
import { MaintenanceSection } from './components/MaintenanceSection';
import { FinancialAnalyticsSection } from './components/FinancialAnalyticsSection';
import { EnvironmentalImpactSection } from './components/EnvironmentalImpactSection';
import { AIInsightsSection } from './components/AIInsightsSection';
import { ReportsSection } from './components/ReportsSection';
import { ApiConfigSection } from './components/ApiConfigSection';
import { GlobalSearchModal } from './components/GlobalSearchModal';

const DashboardContent: React.FC = () => {
  const { activeSection } = useSolar();

  return (
    <main className="app-content">
      {/* Hero KPI Summary Section */}
      <HeroKpi />

      {/* Render Active Section or Full Dashboard */}
      {activeSection === 'dashboard' ? (
        <>
          <LiveMonitoringSection />
          <SolarForecastSection />
          <PanelHealthSection />
          <FaultDetectionSection />
          <BatteryOptimizationSection />
          <MaintenanceSection />
          <FinancialAnalyticsSection />
          <EnvironmentalImpactSection />
          <AIInsightsSection />
          <ReportsSection />
          <ApiConfigSection />
        </>
      ) : activeSection === 'live' ? (
        <LiveMonitoringSection />
      ) : activeSection === 'forecast' ? (
        <SolarForecastSection />
      ) : activeSection === 'panels' ? (
        <PanelHealthSection />
      ) : activeSection === 'battery' ? (
        <BatteryOptimizationSection />
      ) : activeSection === 'faults' ? (
        <FaultDetectionSection />
      ) : activeSection === 'maintenance' ? (
        <MaintenanceSection />
      ) : activeSection === 'financial' ? (
        <FinancialAnalyticsSection />
      ) : activeSection === 'environmental' ? (
        <EnvironmentalImpactSection />
      ) : activeSection === 'ai-insights' ? (
        <AIInsightsSection />
      ) : activeSection === 'reports' ? (
        <ReportsSection />
      ) : activeSection === 'settings' ? (
        <ApiConfigSection />
      ) : (
        <LiveMonitoringSection />
      )}
    </main>
  );
};

export function App() {
  return (
    <SolarProvider>
      <div className="app-container">
        <TopNav />
        <div className="app-main">
          <Sidebar />
          <DashboardContent />
        </div>
        <PanelDetailModal />
        <GlobalSearchModal />
      </div>
    </SolarProvider>
  );
}

export default App;
