"use client";

import React from "react";
import { LineChart, Sparkles, TrendingUp, Zap, Droplets } from "lucide-react";

export default function AnalyticsInsightsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
          <LineChart className="w-6 h-6 text-primary" /> AI Operational Predictive Insights
        </h1>
        <p className="text-sm text-text-secondary">
          Deep learning urban trend forecasting, load reduction recommendations, and cross-domain synergy analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-surface border border-primary/20 rounded-card p-5 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="w-4 h-4 fill-primary" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Substation Peak Load Shaving Recommendation</h3>
          </div>
          <p className="text-xs text-text-primary leading-relaxed">
            By shifting 12% of non-essential commercial pumping at Chembarambakkam Lake from 14:00 to 02:00, Adyar Central Substation peak load will drop from 98.7% to 84.1%, eliminating transformer thermal stress.
          </p>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-surface border border-emerald-good/20 rounded-card p-5 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-good">
            <Sparkles className="w-4 h-4 fill-emerald-good" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Solar & EV Smart Matching</h3>
          </div>
          <p className="text-xs text-text-primary leading-relaxed">
            Perungudi Solar Park production spikes between 11:00-14:00. Directing dynamic fast-charge pricing at Velachery EV stations will absorb 1.2 MW of surplus green solar generation.
          </p>
        </div>
      </div>
    </div>
  );
}
