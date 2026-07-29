"use client";

import React from "react";
import { ShieldCheck, Lock, Key } from "lucide-react";

export default function RolesAdminPage() {
  const roles = [
    { role: "Administrator", perms: "Full System Access, User Management, Threshold Overrides", count: 2 },
    { role: "Grid Dispatcher", perms: "Substation Telemetry, Load Shedding Control, Work Orders", count: 5 },
    { role: "Water Ops Lead", perms: "Reservoir Telemetry, Valve Controls, Leak Resolution", count: 4 },
    { role: "Safety Analyst", perms: "Read-only Telemetry, Incident Post-Mortem Audits", count: 8 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-primary" /> Role-Based Access Control (RBAC) Permissions
        </h1>
        <p className="text-sm text-text-secondary">
          Define permission matrices, functional scope limits, and operational dispatch security policy.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-card p-5 space-y-4 shadow-sm">
        <h3 className="text-sm font-bold text-text-primary">Configured Role Permissions</h3>
        <div className="divide-y divide-border text-xs">
          {roles.map((r, i) => (
            <div key={i} className="py-3 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-text-primary">{r.role}</h4>
                <p className="text-text-secondary text-[11px] mt-0.5">{r.perms}</p>
              </div>
              <span className="font-mono-data text-text-tertiary bg-bg px-2.5 py-1 rounded-chip border border-border">
                {r.count} Active Users
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
