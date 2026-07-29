"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Bot,
  Globe,
  Zap,
  Sun,
  Activity,
  Wrench,
  Droplets,
  Trash2,
  Wind,
  Car,
  HeartPulse,
  FileText,
  LineChart,
  Bell,
  ShieldAlert,
  Users,
  UserPlus,
  ShieldCheck,
  Settings,
  Cpu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ collapsed, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();

  const navGroups = [
    {
      group: "Core Workspace",
      items: [
        { label: "Operations Center", href: "/", icon: Home },
        { label: "AI Assistant", href: "/ai-assistant", icon: Bot },
        { label: "Digital Twin", href: "/digital-twin", icon: Globe },
      ],
    },
    {
      group: "Infrastructure",
      items: [
        { label: "Smart Grid", href: "/infrastructure/smart-grid", icon: Zap },
        { label: "Solar Optimization", href: "/infrastructure/solar", icon: Sun },
        { label: "Energy Monitoring", href: "/infrastructure/energy", icon: Activity },
        { label: "Predictive Maintenance", href: "/infrastructure/predictive-maintenance", icon: Wrench },
      ],
    },
    {
      group: "Urban Services",
      items: [
        { label: "Water Management", href: "/urban-services/water", icon: Droplets },
        { label: "Waste Management", href: "/urban-services/waste", icon: Trash2 },
        { label: "Air Quality", href: "/urban-services/air-quality", icon: Wind },
      ],
    },
    {
      group: "Mobility",
      items: [{ label: "EV Charging", href: "/mobility/ev-charging", icon: Car }],
    },
    {
      group: "Healthcare",
      items: [{ label: "Healthcare AI", href: "/healthcare/healthcare-ai", icon: HeartPulse }],
    },
    {
      group: "Analytics",
      items: [
        { label: "Reports", href: "/analytics/reports", icon: FileText },
        { label: "Insights", href: "/analytics/insights", icon: LineChart },
      ],
    },
    {
      group: "Incident Center",
      items: [
        { label: "Alerts Log", href: "/incidents/alerts", icon: Bell },
        { label: "Incidents Audit", href: "/incidents/log", icon: ShieldAlert },
      ],
    },
    {
      group: "Administration",
      items: [
        { label: "Register Admin", href: "/admin/register", icon: UserPlus },
        { label: "Users", href: "/admin/users", icon: Users },
        { label: "Roles", href: "/admin/roles", icon: ShieldCheck },
        { label: "Settings", href: "/admin/settings", icon: Settings },
        { label: "Integrations", href: "/admin/integrations", icon: Cpu },
      ],
    },
  ];

  return (
    <aside
      className={`bg-surface border-r border-border h-[calc(100vh-64px)] sticky top-16 z-20 transition-all duration-300 flex flex-col select-none ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Sidebar Navigation Items */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {navGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-1">
            {!collapsed && (
              <h4 className="px-2 text-[10px] font-bold text-text-tertiary uppercase tracking-wider mb-1">
                {group.group}
              </h4>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={`flex items-center gap-3 px-2.5 py-2 rounded-btn text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-text-tertiary"}`} />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Collapse Toggle Footer */}
      <div className="p-3 border-t border-border bg-bg/50 flex items-center justify-between">
        {!collapsed && <span className="text-[11px] font-mono-data text-text-tertiary">Azure OS Engine v2.4</span>}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-chip text-text-secondary hover:text-text-primary hover:bg-surface border border-border shadow-xs transition-colors mx-auto"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
}
