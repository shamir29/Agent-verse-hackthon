"use client";

import React, { useState } from "react";
import { Settings, Save, Bell, Shield, Sliders } from "lucide-react";

export default function SettingsAdminPage() {
  const [criticalThreshold, setCriticalThreshold] = useState("95");
  const [reservoirThreshold, setReservoirThreshold] = useState("40");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
          <Settings className="w-6 h-6 text-primary" /> Platform Operational Settings & Thresholds
        </h1>
        <p className="text-sm text-text-secondary">
          Configure alert trigger thresholds, notification channels, and automated dispatch parameters.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-card p-6 shadow-sm max-w-2xl">
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-text-primary block mb-1">
              Substation Critical Load Alert Threshold (%)
            </label>
            <input
              type="number"
              value={criticalThreshold}
              onChange={(e) => setCriticalThreshold(e.target.value)}
              className="w-full px-3 py-2 bg-bg border border-border rounded-btn font-mono-data"
            />
            <p className="text-[11px] text-text-tertiary mt-1">Triggers high-priority dispatch when load exceeds this %.</p>
          </div>

          <div>
            <label className="font-bold text-text-primary block mb-1">
              Reservoir Minimum Capacity Threshold (%)
            </label>
            <input
              type="number"
              value={reservoirThreshold}
              onChange={(e) => setReservoirThreshold(e.target.value)}
              className="w-full px-3 py-2 bg-bg border border-border rounded-btn font-mono-data"
            />
            <p className="text-[11px] text-text-tertiary mt-1">Triggers water supply scarcity warning when volume drops below this %.</p>
          </div>

          <div className="pt-3 border-t border-border flex items-center gap-3">
            <button
              type="submit"
              className="px-5 py-2 bg-primary text-white text-xs font-semibold rounded-btn hover:bg-primary-hover transition-colors inline-flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" /> Save System Thresholds
            </button>
            {saved && <span className="text-emerald-good font-semibold">Settings saved successfully!</span>}
          </div>
        </form>
      </div>
    </div>
  );
}
