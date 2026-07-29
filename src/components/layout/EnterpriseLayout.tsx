"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { BreadcrumbNav } from "@/components/navigation/BreadcrumbNav";
import { AIAssistantPanel } from "@/components/assistant/AIAssistantPanel";
import { AuthGate } from "@/components/auth/AuthGate";
import { useUser } from "@/context/UserContext";

export function EnterpriseLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useUser();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(true);

  // If user is not logged in / registered, block dashboard and display Auth/Registration Portal
  if (!isAuthenticated) {
    return <AuthGate />;
  }

  return (
    <div className="min-h-screen bg-bg text-text-primary flex flex-col antialiased">
      {/* Top Header */}
      <Header onToggleAiPanel={() => setIsAiPanelOpen(!isAiPanelOpen)} />

      {/* Body Layout */}
      <div className="flex flex-1 relative">
        {/* Left Sidebar */}
        <Sidebar collapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />

        {/* Main Content Workspace */}
        <main className={`flex-1 p-6 transition-all duration-300 max-w-7xl mx-auto w-full ${isAiPanelOpen ? "pr-14 sm:pr-96" : "pr-6"}`}>
          <BreadcrumbNav />
          {children}
        </main>

        {/* Persistent AI Assistant Panel */}
        {isAiPanelOpen && <AIAssistantPanel />}
      </div>
    </div>
  );
}
