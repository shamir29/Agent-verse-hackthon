import { useState } from 'react';
import { Navbar } from './components/ui/Navbar';
import { HeroSection } from './components/views/HeroSection';
import { AgentWorkforce } from './components/views/AgentWorkforce';
import { CrisisSimulation } from './components/views/CrisisSimulation';
import { NeuralOrchestrator } from './components/views/NeuralOrchestrator';
import { MissionTimeline } from './components/views/MissionTimeline';
import { AgentCollaborationWorkflow } from './components/views/AgentCollaborationWorkflow';
import { InfrastructureSearch } from './components/views/InfrastructureSearch';
import { DigitalTwinTimeMachine } from './components/views/DigitalTwinTimeMachine';
import { InteractiveAnalytics } from './components/views/InteractiveAnalytics';
import { DeveloperEcosystem } from './components/views/DeveloperEcosystem';
import { EnterpriseSecurity } from './components/views/EnterpriseSecurity';
import { WorkflowBuilder } from './components/views/WorkflowBuilder';
import { FooterSection } from './components/views/FooterSection';
import { AgentDeepDiveModal } from './components/views/AgentDeepDiveModal';
import { CommandCenterModal } from './components/views/CommandCenterModal';
import type { AgentCard, CrisisType } from './types';

export function App() {
  const [isNight, setIsNight] = useState(false);
  const [activeCrisis, setActiveCrisis] = useState<CrisisType | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<AgentCard | null>(null);
  const [isCommandCenterOpen, setIsCommandCenterOpen] = useState(false);

  const scrollToCity = () => {
    const el = document.getElementById('workforce');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 ${isNight ? 'dark bg-slate-950 text-white' : 'bg-[#FAFAFA] text-slate-900'}`}>
      <Navbar
        isNight={isNight}
        onToggleNight={() => setIsNight(!isNight)}
        onOpenCommandCenter={() => setIsCommandCenterOpen(true)}
      />

      <main className="w-full">
        {/* Section 1: Hero Landing Experience */}
        <HeroSection
          isNight={isNight}
          activeCrisis={activeCrisis}
          selectedAgentId={selectedAgent?.id}
          onExploreCity={scrollToCity}
          onOpenCommandCenter={() => setIsCommandCenterOpen(true)}
        />

        {/* Section 2: AI Workforce Orbital Core */}
        <AgentWorkforce
          onSelectAgent={(agent) => setSelectedAgent(agent)}
        />

        {/* Section 3 & 4: Living Consensus Brain */}
        <NeuralOrchestrator
          onSelectAgent={(agent) => setSelectedAgent(agent)}
        />

        {/* Section 5: Scenario Crisis Simulator */}
        <CrisisSimulation
          activeCrisis={activeCrisis}
          onTriggerCrisis={(crisis) => setActiveCrisis(crisis)}
        />

        {/* Section 6: Mission Decision Tree Timeline */}
        <MissionTimeline />

        {/* Section 7: Inter-Agent Collaboration Workflow */}
        <AgentCollaborationWorkflow
          onSelectAgent={(agent) => setSelectedAgent(agent)}
        />

        {/* Section 8: Sub-Meter Infrastructure Search Engine */}
        <InfrastructureSearch
          onSelectAgent={(agent) => setSelectedAgent(agent)}
        />

        {/* Section 9: Digital Twin 50-Year Time Machine */}
        <DigitalTwinTimeMachine />

        {/* Section 11: Storytelling Analytics */}
        <InteractiveAnalytics />

        {/* Section 12: Developer API & SDK Ecosystem */}
        <DeveloperEcosystem />

        {/* Section 13: Enterprise Trust & Security */}
        <EnterpriseSecurity />

        {/* Section 14: Drag & Drop Agent Workflow Playground */}
        <WorkflowBuilder />

        {/* Section 15: Minimalist Product Footer */}
        <FooterSection />
      </main>

      {selectedAgent && (
        <AgentDeepDiveModal
          agent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
        />
      )}

      {isCommandCenterOpen && (
        <CommandCenterModal
          onClose={() => setIsCommandCenterOpen(false)}
          onSelectAgent={(agent) => setSelectedAgent(agent)}
        />
      )}
    </div>
  );
}

export default App;
