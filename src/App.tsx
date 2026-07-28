import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeaderTelemetry } from './components/dashboard/HeaderTelemetry';
import { City3DViewer } from './components/3d/City3DViewer';
import { GisMapViewer } from './components/gis/GisMapViewer';
import { WaterDistribution } from './components/modules/WaterDistribution';
import { LeakDetectionAI } from './components/modules/LeakDetectionAI';
import { FloodPrediction } from './components/modules/FloodPrediction';
import { ReservoirStatus } from './components/modules/ReservoirStatus';
import { WaterQualityMonitoring } from './components/modules/WaterQualityMonitoring';
import { SmartIrrigation } from './components/modules/SmartIrrigation';
import { RainwaterAnalytics } from './components/modules/RainwaterAnalytics';
import { AIChatAssistant } from './components/ai/AIChatAssistant';
import { AdminPanel } from './components/admin/AdminPanel';
import { ReportGeneratorModal } from './components/reports/ReportGeneratorModal';
import { WaterSystemSimulation } from './services/simulationEngine';
import { UserRole, Language } from './types/waterSystem';
import { Cpu, Globe } from 'lucide-react';

export const App: React.FC = () => {
  // Initialize Real-time Simulation Engine
  const sim = useMemo(() => new WaterSystemSimulation(), []);

  // Application State
  const [telemetry, setTelemetry] = useState(sim.telemetry);
  const [pipelines, setPipelines] = useState(sim.pipelines);
  const [leaks, setLeaks] = useState(sim.leaks);
  const [reservoirs, setReservoirs] = useState(sim.reservoirs);
  const [floods, setFloods] = useState(sim.floods);
  const [qualitySectors, setQualitySectors] = useState(sim.qualitySectors);
  const [farms, setFarms] = useState(sim.farms);
  const [rainwater, setRainwater] = useState(sim.rainwater);
  const [insights, setInsights] = useState(sim.insights);
  const [sensors, setSensors] = useState(sim.sensors);

  // Controls State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentRole, setCurrentRole] = useState<UserRole>('Admin');
  const [language, setLanguage] = useState<Language>('EN');
  const [isSimulating, setIsSimulating] = useState(true);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('light'); // Default to Light Theme!

  // Sync HTML Class with Theme
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
  }, [theme]);

  // Live Stream Simulation Loop
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      const updated = sim.tick();
      setTelemetry(updated.telemetry);
      setPipelines(updated.pipelines);
      setReservoirs(updated.reservoirs);
    }, 2000);

    return () => clearInterval(interval);
  }, [isSimulating, sim]);

  // Isolate Pipe Action Handler
  const handleIsolatePipe = (pipeId: string) => {
    sim.isolatePipe(pipeId);
    setPipelines([...sim.pipelines]);
    setLeaks([...sim.leaks]);
    setTelemetry({ ...sim.telemetry });
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] dark:bg-[#050914] light:bg-[#f0f4f8] bg-grid-pattern text-slate-900 dark:text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-cyan-500 selection:text-white transition-colors duration-300">
      
      {/* Top Navbar */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        language={language}
        onLanguageChange={setLanguage}
        isSimulating={isSimulating}
        onToggleSimulation={() => setIsSimulating(!isSimulating)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        insights={insights}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Header Telemetry 10-Card Matrix */}
        <HeaderTelemetry
          telemetry={telemetry}
          onNavigateTab={setActiveTab}
        />

        {/* Dynamic Main View Switcher */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Split Screen: 3D Underground City Visualizer + GIS Map */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-orbitron font-bold text-cyan-700 dark:text-cyan-300 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> 3D Underground Pipeline & City Visualizer
                  </h3>
                  <button
                    onClick={() => setActiveTab('3d-city')}
                    className="text-xs text-cyan-700 dark:text-cyan-400 hover:underline flex items-center gap-1 font-mono"
                  >
                    FULLSCREEN 3D VIEW &rarr;
                  </button>
                </div>
                <City3DViewer
                  pipelines={pipelines}
                  leaks={leaks}
                  reservoirs={reservoirs}
                  floodRiskPct={telemetry.floodRiskPct}
                  theme={theme}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-orbitron font-bold text-cyan-700 dark:text-cyan-300 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> GIS Infrastructure & Telemetry Map
                  </h3>
                  <button
                    onClick={() => setActiveTab('gis-map')}
                    className="text-xs text-cyan-700 dark:text-cyan-400 hover:underline flex items-center gap-1 font-mono"
                  >
                    FULLSCREEN GIS MAP &rarr;
                  </button>
                </div>
                <GisMapViewer
                  pipelines={pipelines}
                  leaks={leaks}
                  reservoirs={reservoirs}
                  qualitySectors={qualitySectors}
                  floods={floods}
                  sensors={sensors}
                  onIsolatePipe={handleIsolatePipe}
                  theme={theme}
                />
              </div>

            </div>

            {/* Featured AI Module Spotlight: Leak Detection */}
            <LeakDetectionAI
              leaks={leaks}
              pipelines={pipelines}
              onIsolatePipe={handleIsolatePipe}
            />
          </div>
        )}

        {activeTab === '3d-city' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h2 className="text-xl font-orbitron font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-600 dark:text-cyan-400" /> INTERACTIVE 3D CITY & UNDERGROUND PIPELINE NETWORK
            </h2>
            <City3DViewer
              pipelines={pipelines}
              leaks={leaks}
              reservoirs={reservoirs}
              floodRiskPct={telemetry.floodRiskPct}
              theme={theme}
            />
          </div>
        )}

        {activeTab === 'gis-map' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h2 className="text-xl font-orbitron font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan-600 dark:text-cyan-400" /> FULL-SCREEN GIS WATER RESOURCE MAP
            </h2>
            <GisMapViewer
              pipelines={pipelines}
              leaks={leaks}
              reservoirs={reservoirs}
              qualitySectors={qualitySectors}
              floods={floods}
              sensors={sensors}
              onIsolatePipe={handleIsolatePipe}
              theme={theme}
            />
          </div>
        )}

        {activeTab === 'distribution' && (
          <WaterDistribution
            pipelines={pipelines}
            onIsolatePipe={handleIsolatePipe}
          />
        )}

        {activeTab === 'leak-ai' && (
          <LeakDetectionAI
            leaks={leaks}
            pipelines={pipelines}
            onIsolatePipe={handleIsolatePipe}
          />
        )}

        {activeTab === 'flood-ai' && (
          <FloodPrediction floods={floods} />
        )}

        {activeTab === 'reservoirs' && (
          <ReservoirStatus reservoirs={reservoirs} />
        )}

        {activeTab === 'quality' && (
          <WaterQualityMonitoring qualitySectors={qualitySectors} />
        )}

        {activeTab === 'irrigation' && (
          <SmartIrrigation farms={farms} />
        )}

        {activeTab === 'rainwater' && (
          <RainwaterAnalytics rainwater={rainwater} />
        )}

        {activeTab === 'admin' && (
          <AdminPanel sensors={sensors} currentRole={currentRole} />
        )}

      </main>

      {/* Floating AI Chatbot Assistant */}
      <AIChatAssistant
        telemetry={telemetry}
        leaks={leaks}
        reservoirs={reservoirs}
        onNavigateTab={setActiveTab}
      />

      {/* Downloadable Reports Modal */}
      <ReportGeneratorModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        telemetry={telemetry}
        pipelines={pipelines}
        leaks={leaks}
        reservoirs={reservoirs}
        qualitySectors={qualitySectors}
      />

      {/* Footer */}
      <Footer onOpenReportModal={() => setIsReportModalOpen(true)} />
    </div>
  );
};

export default App;
