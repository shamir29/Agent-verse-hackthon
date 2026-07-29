import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CommandSearchModal from './components/CommandSearchModal';

import HomeView from './components/views/HomeView';
import SymptomCheckerView from './components/views/SymptomCheckerView';
import ReportAnalyzerView from './components/views/ReportAnalyzerView';
import AppointmentsView from './components/views/AppointmentsView';
import HealthDashboardView from './components/views/HealthDashboardView';
import MedicationsView from './components/views/MedicationsView';
import HospitalsView from './components/views/HospitalsView';
import AIAssistantView from './components/views/AIAssistantView';
import ProfileView from './components/views/ProfileView';
import AdminView from './components/views/AdminView';

export default function App() {
  const [activeView, setActiveView] = useState('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSOSOpen, setIsSOSOpen] = useState(false);

  // Keyboard shortcut listener for Cmd + K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderActiveView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView setActiveView={setActiveView} />;
      case 'symptom-checker':
        return <SymptomCheckerView setActiveView={setActiveView} />;
      case 'report-analyzer':
        return <ReportAnalyzerView />;
      case 'appointments':
        return <AppointmentsView />;
      case 'dashboard':
        return <HealthDashboardView />;
      case 'medications':
        return <MedicationsView />;
      case 'hospitals':
        return <HospitalsView isSOSOpen={isSOSOpen} setIsSOSOpen={setIsSOSOpen} />;
      case 'ai-assistant':
        return <AIAssistantView />;
      case 'profile':
        return <ProfileView />;
      case 'admin':
        return <AdminView />;
      default:
        return <HomeView setActiveView={setActiveView} />;
    }
  };

  const activeViewName = activeView.replace('-', ' ');

  return (
    <div className="flex min-h-screen bg-white text-slate-800 font-['Inter',sans-serif] selection:bg-blue-100 selection:text-blue-900 antialiased overflow-x-hidden">
      
      {/* Navigation Sidebar */}
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        onOpenSOS={() => setIsSOSOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#FFFFFF]">
        
        {/* Sticky Header */}
        <Header 
          activeViewName={activeViewName}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenSOS={() => setIsSOSOpen(true)}
        />

        {/* View Component Body */}
        <main className="flex-1 pb-16 bg-[#FFFFFF]">
          {renderActiveView()}
        </main>
      </div>

      {/* Global Cmd + K Search Modal */}
      <CommandSearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        setActiveView={setActiveView}
      />

    </div>
  );
}
