import React, { useState } from 'react';
import { INITIAL_STATIONS, MOCK_NOTIFICATIONS } from './data/mockData';
import type { ChargingStation, NotificationItem } from './types/charging';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InteractiveCityMap } from './components/InteractiveCityMap';
import { SmartChargingSection } from './components/SmartChargingSection';
import { GridLoadOptimization } from './components/GridLoadOptimization';
import { RenewableEnergySection } from './components/RenewableEnergySection';
import { AiAnalyticsSection } from './components/AiAnalyticsSection';
import { PredictiveMaintenanceSection } from './components/PredictiveMaintenanceSection';
import { DriverJourneySection } from './components/DriverJourneySection';
import { LiveNotificationCenter } from './components/LiveNotificationCenter';
import { ControlCenterPanel } from './components/ControlCenterPanel';
import { FooterSection } from './components/FooterSection';

export const App: React.FC = () => {
  const [stations] = useState<ChargingStation[]>(INITIAL_STATIONS);
  const [selectedStation, setSelectedStation] = useState<ChargingStation | null>(INITIAL_STATIONS[0]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [renewablesOnly, setRenewablesOnly] = useState(false);
  const [activeAiMode, setActiveAiMode] = useState<string>('Max Speed');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Filter stations if clean energy priority is toggled
  const displayedStations = renewablesOnly
    ? stations.filter((s) => s.renewablePct >= 90)
    : stations;

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Navigation Header */}
      <Navbar
        onOpenNotifications={() => setIsNotificationOpen(true)}
        notificationCount={unreadCount}
      />

      {/* Hero Section */}
      <HeroSection
        onStartMonitoring={() => scrollToId('city-map')}
        onExploreNetwork={() => scrollToId('grid-load')}
      />

      {/* Interactive City Map */}
      <InteractiveCityMap
        stations={displayedStations}
        selectedStation={selectedStation}
        onSelectStation={(st) => setSelectedStation(st)}
      />

      {/* Smart Charging Simulator */}
      <SmartChargingSection />

      {/* Grid Load Optimization */}
      <GridLoadOptimization />

      {/* Renewable Energy Telemetry */}
      <RenewableEnergySection />

      {/* AI Analytics Cards */}
      <AiAnalyticsSection />

      {/* Predictive Maintenance & Scanner */}
      <PredictiveMaintenanceSection />

      {/* Driver Journey Walkthrough */}
      <DriverJourneySection />

      {/* Live System Notifications Overlay */}
      <LiveNotificationCenter
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllRead}
      />

      {/* Floating Control Center */}
      <ControlCenterPanel
        onToggleRenewablesOnly={(val) => setRenewablesOnly(val)}
        renewablesOnly={renewablesOnly}
        activeAiMode={activeAiMode}
        onChangeAiMode={(mode) => setActiveAiMode(mode)}
      />

      {/* Modern Minimal Footer */}
      <FooterSection />

    </div>
  );
};

export default App;
