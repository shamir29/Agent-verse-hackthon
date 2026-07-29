"use client";

import React from "react";
import { ShieldAlert, CheckCircle2, FileSpreadsheet } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function IncidentsAuditPage() {
  const { data: alerts = [] } = useQuery<any[]>({
    queryKey: ["auditIncidents"],
    queryFn: async () => (await fetch("/api/alerts")).json(),
  });

  const resolved = alerts.filter((a) => a.status === "resolved");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-primary" /> Incident Post-Mortem & Resolution Audit
        </h1>
        <p className="text-sm text-text-secondary">
          Historical log of resolved incident tickets, response times, and root cause analysis.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-card p-5 space-y-4 shadow-sm">
        <h3 className="text-sm font-bold text-text-primary">Resolved Incidents Log ({resolved.length})</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border text-[11px] font-semibold uppercase text-text-tertiary bg-bg/50">
                <th className="py-2.5 px-3">Title</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">Assigned Unit</th>
                <th className="py-2.5 px-3">Resolved Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {resolved.map((res) => (
                <tr key={res.id} className="hover:bg-bg/60">
                  <td className="py-3 px-3 font-semibold text-text-primary">{res.title}</td>
                  <td className="py-3 px-3 capitalize text-text-secondary">{res.category.replace("_", " ")}</td>
                  <td className="py-3 px-3 text-text-secondary">{res.location}</td>
                  <td className="py-3 px-3 font-mono-data text-[11px]">{res.assignedTeam || "Ops Command"}</td>
                  <td className="py-3 px-3 font-mono-data text-emerald-good font-semibold">
                    {res.resolvedAt ? new Date(res.resolvedAt).toLocaleString() : "Resolved"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
