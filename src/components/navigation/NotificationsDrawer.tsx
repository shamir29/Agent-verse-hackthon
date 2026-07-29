"use client";

import React from "react";
import { Bell, X, ShieldAlert, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsDrawer({ isOpen, onClose }: NotificationsDrawerProps) {
  const { data: alerts = [] } = useQuery<any[]>({
    queryKey: ["notificationsAlerts"],
    queryFn: async () => {
      const res = await fetch("/api/alerts");
      if (!res.ok) return [];
      return res.json();
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end animate-in fade-in">
      <div
        className="w-80 sm:w-96 bg-surface border-l border-border h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-bg/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-btn bg-amber-bg text-amber-warning flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-text-primary">System Notification Center</h3>
              <span className="text-[10px] text-text-tertiary">Real-time Telemetry Dispatch Alerts</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-chip text-text-tertiary hover:text-text-primary hover:bg-border/60">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-card border text-xs space-y-1.5 transition-colors ${
                alert.severity === "critical"
                  ? "bg-red-bg border-red-critical/20"
                  : alert.severity === "high"
                  ? "bg-amber-bg border-amber-warning/20"
                  : "bg-bg border-border"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span
                  className={`font-bold leading-tight ${
                    alert.severity === "critical"
                      ? "text-red-critical"
                      : alert.severity === "high"
                      ? "text-amber-warning"
                      : "text-text-primary"
                  }`}
                >
                  {alert.title}
                </span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-surface border border-border shrink-0">
                  {alert.status}
                </span>
              </div>
              <p className="text-text-secondary text-[11px] leading-snug">{alert.location}</p>
              <div className="flex items-center justify-between text-[10px] text-text-tertiary pt-1 border-t border-border/50 font-mono-data">
                <span className="capitalize">{alert.category.replace("_", " ")}</span>
                <span>{new Date(alert.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border bg-bg text-center">
          <a href="/incidents/alerts" onClick={onClose} className="text-xs font-semibold text-primary hover:underline">
            View All Incident Logs &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
