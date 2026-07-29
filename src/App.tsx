import { useState } from 'react';
import { GridProvider } from './context/GridContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { LiveDigitalGridMap } from './components/sections/LiveDigitalGridMap';
import { RealTimePowerFlow } from './components/sections/RealTimePowerFlow';
import { GridLoadBalancing } from './components/sections/GridLoadBalancing';
import { RenewableEnergyOptimization } from './components/sections/RenewableEnergyOptimization';
import { AIForecasting } from './components/sections/AIForecasting';
import { FaultDetectionSelfHealing } from './components/sections/FaultDetectionSelfHealing';
import { PredictiveMaintenance } from './components/sections/PredictiveMaintenance';
import { EnergyAnalytics } from './components/sections/EnergyAnalytics';
import { AIInsightsCenter } from './components/sections/AIInsightsCenter';
import { UserJourneyStoryline } from './components/sections/UserJourneyStoryline';
import { GridControlCenter } from './components/sections/GridControlCenter';
import { LiveAlertsCenter } from './components/sections/LiveAlertsCenter';

function MainApp() {
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isControlOpen, setIsControlOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-500/10 selection:text-blue-600">
      <Navbar 
        onOpenAlerts={() => setIsAlertsOpen(true)}
        onOpenControlCenter={() => setIsControlOpen(true)}
      />

      <main className="flex-grow">
        <HeroSection onExploreClick={() => setIsControlOpen(true)} />
        <LiveDigitalGridMap />
        <RealTimePowerFlow />
        <GridLoadBalancing />
        <RenewableEnergyOptimization />
        <AIForecasting />
        <FaultDetectionSelfHealing />
        <PredictiveMaintenance />
        <EnergyAnalytics />
        <AIInsightsCenter />
        <UserJourneyStoryline />
      </main>

      <Footer />

      <GridControlCenter 
        isOpen={isControlOpen}
        onClose={() => setIsControlOpen(false)}
      />

      <LiveAlertsCenter 
        isOpen={isAlertsOpen}
        onClose={() => setIsAlertsOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <GridProvider>
      <MainApp />
    </GridProvider>
  );
}
