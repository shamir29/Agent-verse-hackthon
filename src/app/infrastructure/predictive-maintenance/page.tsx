"use client";

import React, { useState } from "react";
import { Wrench, AlertTriangle, CheckCircle2, ShieldAlert, Plus } from "lucide-react";

export default function PredictiveMaintenancePage() {
  const [workOrders, setWorkOrders] = useState([
    { id: "WO-901", asset: "Adyar Substation Transformer B", anomalyScore: 94, status: "in_progress", tech: "Grid Tech 4" },
    { id: "WO-902", asset: "Poondi Supply Valve Joint 12", anomalyScore: 88, status: "scheduled", tech: "Metro Water Team 2" },
    { id: "WO-903", asset: "Panagal Park Feeder Cable 3", anomalyScore: 91, status: "scheduled", tech: "Rapid Electrical 1" },
  ]);

  const [newAsset, setNewAsset] = useState("");

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsset.trim()) return;
    const newWo = {
      id: `WO-${Math.floor(100 + Math.random() * 900)}`,
      asset: newAsset,
      anomalyScore: 78,
      status: "scheduled",
      tech: "Assigned Dispatch Tech",
    };
    setWorkOrders([newWo, ...workOrders]);
    setNewAsset("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
          <Wrench className="w-6 h-6 text-amber-warning" /> Predictive Maintenance & Equipment Anomaly Telemetry
        </h1>
        <p className="text-sm text-text-secondary">
          AI vibration & thermal sensor anomaly detection with automated work order generation before failure occurs.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-card p-5 space-y-4 shadow-sm">
        <h3 className="text-sm font-bold text-text-primary">Dispatch Predictive Work Order</h3>
        <form onSubmit={handleCreateOrder} className="flex gap-2">
          <input
            type="text"
            value={newAsset}
            onChange={(e) => setNewAsset(e.target.value)}
            placeholder="Enter target equipment asset name (e.g. Tower Park Circuit Breaker 2)..."
            className="flex-1 px-3 py-2 text-xs bg-bg border border-border rounded-btn focus:outline-none focus:border-primary text-text-primary"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-btn hover:bg-primary-hover transition-colors inline-flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Create Work Order
          </button>
        </form>
      </div>

      <div className="bg-surface border border-border rounded-card p-5 space-y-3 shadow-sm">
        <h3 className="text-sm font-bold text-text-primary">Active Predictive Work Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border text-[11px] font-semibold uppercase text-text-tertiary bg-bg/50">
                <th className="py-2.5 px-3">Order ID</th>
                <th className="py-2.5 px-3">Equipment Asset</th>
                <th className="py-2.5 px-3">AI Anomaly Risk Score</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Assigned Tech</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {workOrders.map((wo) => (
                <tr key={wo.id} className="hover:bg-bg/60">
                  <td className="py-3 px-3 font-mono-data font-bold text-primary">{wo.id}</td>
                  <td className="py-3 px-3 font-semibold text-text-primary">{wo.asset}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-chip text-[11px] font-bold bg-red-bg text-red-critical font-mono-data">
                      {wo.anomalyScore}% High Risk
                    </span>
                  </td>
                  <td className="py-3 px-3 capitalize font-semibold text-amber-warning">{wo.status.replace("_", " ")}</td>
                  <td className="py-3 px-3 font-mono-data text-text-secondary">{wo.tech}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
