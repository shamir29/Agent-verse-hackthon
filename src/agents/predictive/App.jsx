import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HeroKpis } from './components/HeroKpis';
import { LiveMonitoring } from './components/LiveMonitoring';
import { AssetHealthMatrix } from './components/AssetHealthMatrix';
import { FailurePrediction } from './components/FailurePrediction';
import { DiagnosticsDashboard } from './components/DiagnosticsDashboard';
import { RootCauseAnalysis } from './components/RootCauseAnalysis';
import { RulGaugeSection } from './components/RulGaugeSection';
import { MaintenancePlanner } from './components/MaintenancePlanner';
import { AiRecommendations } from './components/AiRecommendations';
import { AssetLifecycleTimeline } from './components/AssetLifecycleTimeline';
import { ReportsAndExports } from './components/ReportsAndExports';
import { CrossAgentIntegration } from './components/CrossAgentIntegration';
import { AssetDiagnosticModal } from './components/AssetDiagnosticModal';
import { NotificationsDrawer } from './components/NotificationsDrawer';

const MainContent = () => {
  const { activeTab } = useApp();

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <HeroKpis />
            <LiveMonitoring />
          </div>
        );
      case 'monitoring':
        return <LiveMonitoring />;
      case 'health':
        return <AssetHealthMatrix />;
      case 'prediction':
        return <FailurePrediction />;
      case 'diagnostics':
        return <DiagnosticsDashboard />;
      case 'rootcause':
        return <RootCauseAnalysis />;
      case 'rul':
        return <RulGaugeSection />;
      case 'planner':
        return <MaintenancePlanner />;
      case 'recommendations':
        return <AiRecommendations />;
      case 'lifecycle':
        return <AssetLifecycleTimeline />;
      case 'reports':
        return <ReportsAndExports />;
      case 'integration':
        return <CrossAgentIntegration />;
      default:
        return <LiveMonitoring />;
    }
  };

  return (
    <main className="flex-1 p-6 overflow-y-auto max-w-[1600px] mx-auto w-full">
      {renderActiveTab()}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <MainContent />
        </div>
        <AssetDiagnosticModal />
        <NotificationsDrawer />
      </div>
    </AppProvider>
  );
}
