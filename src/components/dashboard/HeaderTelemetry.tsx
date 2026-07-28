import React from 'react';
import {
  Droplets,
  Gauge,
  Database,
  AlertTriangle,
  CloudRain,
  Activity,
  Sprout,
  Sparkles,
  Radio,
  TrendingUp,
} from 'lucide-react';
import { MainTelemetry } from '../../types/waterSystem';

interface HeaderTelemetryProps {
  telemetry: MainTelemetry;
  onNavigateTab: (tab: string) => void;
}

export const HeaderTelemetry: React.FC<HeaderTelemetryProps> = ({ telemetry, onNavigateTab }) => {
  const cards = [
    {
      id: 'total-water',
      title: 'Total Water Available',
      value: `${telemetry.totalWaterAvailableMGL.toLocaleString()} MGL`,
      detail: 'Cumulative system reserves',
      icon: Database,
      color: 'from-cyan-500 to-blue-600',
      badge: '+2.4% vs last wk',
      badgeType: 'positive',
      tab: 'reservoirs',
    },
    {
      id: 'daily-consumption',
      title: 'Daily Water Consumption',
      value: `${telemetry.dailyConsumptionMGL} MGL/day`,
      detail: 'Real-time citywide draw rate',
      icon: Gauge,
      color: 'from-blue-500 to-indigo-600',
      badge: 'Peak Demand 14:00',
      badgeType: 'neutral',
      tab: 'distribution',
    },
    {
      id: 'reservoir-capacity',
      title: 'Reservoir Capacity',
      value: `${telemetry.reservoirCapacityPct}%`,
      detail: '856 MGL out of 900 MGL',
      icon: Droplets,
      color: 'from-sky-500 to-cyan-600',
      badge: '95% Grand Canyon Dam',
      badgeType: 'warning',
      tab: 'reservoirs',
    },
    {
      id: 'leak-alerts',
      title: 'Leak Alerts',
      value: `${telemetry.activeLeaksCount} Active`,
      detail: 'Est. loss 18,950 L/hr',
      icon: AlertTriangle,
      color: 'from-red-500 to-rose-600',
      badge: 'P1 Immediate Isolation',
      badgeType: 'critical',
      tab: 'leak-ai',
    },
    {
      id: 'flood-risk',
      title: 'Flood Risk Level',
      value: `${telemetry.floodRiskPct}%`,
      detail: `Zone C ${telemetry.floodRiskLevel}`,
      icon: CloudRain,
      color: telemetry.floodRiskLevel === 'Critical' ? 'from-red-600 to-amber-600' : 'from-amber-500 to-yellow-600',
      badge: 'Peak Expected 18:30',
      badgeType: 'critical',
      tab: 'flood-ai',
    },
    {
      id: 'water-quality',
      title: 'Water Quality Index',
      value: `${telemetry.waterQualityIndex} / 100`,
      detail: 'pH 7.4 | TDS 142 ppm',
      icon: Activity,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Potable Grade A',
      badgeType: 'positive',
      tab: 'quality',
    },
    {
      id: 'smart-irrigation',
      title: 'Smart Irrigation Saved',
      value: `${(telemetry.smartIrrigationSavedLiters / 1000).toFixed(0)}k Liters`,
      detail: 'Optimized watering schedule',
      icon: Sprout,
      color: 'from-green-500 to-emerald-600',
      badge: '32% Water Saved',
      badgeType: 'positive',
      tab: 'irrigation',
    },
    {
      id: 'rainwater',
      title: 'Rainwater Harvested',
      value: `${(telemetry.rainwaterHarvestedLiters / 1000000).toFixed(2)}M Liters`,
      detail: 'Collection efficiency 92.4%',
      icon: CloudRain,
      color: 'from-blue-600 to-cyan-500',
      badge: '38.5 mm Rainfall',
      badgeType: 'positive',
      tab: 'rainwater',
    },
    {
      id: 'active-sensors',
      title: 'Active IoT Sensors',
      value: `${telemetry.activeSensorsCount} / ${telemetry.totalSensorsCount}`,
      detail: 'Pressure, Flow & WQI mesh',
      icon: Radio,
      color: 'from-purple-500 to-indigo-600',
      badge: '97.6% Online Rate',
      badgeType: 'positive',
      tab: 'admin',
    },
    {
      id: 'ai-summary',
      title: 'AI Prediction Summary',
      value: 'AI Sentinel Active',
      detail: telemetry.aiPredictionSummary,
      icon: Sparkles,
      color: 'from-cyan-400 to-blue-500',
      badge: 'Real-time Neural Engine',
      badgeType: 'special',
      tab: 'leak-ai',
    },
  ];

  return (
    <section className="mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-orbitron font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
            REAL-TIME WATER TELEMETRY MATRIX
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Live sensor data streaming from regional water grid, smart meters & satellite telemetry
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-950/40 border border-cyan-300 dark:border-cyan-500/30 px-3 py-1 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-ping"></span>
          STREAM SYNCED
        </div>
      </div>

      {/* 10 Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={() => onNavigateTab(card.tab)}
              className="glass-panel glass-panel-hover rounded-2xl p-4 cursor-pointer relative overflow-hidden group border border-cyan-500/20"
            >
              {/* Top Accent Gradient Bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.color}`} />

              <div className="flex items-start justify-between mb-2">
                <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 tracking-wider uppercase font-space">
                  {card.title}
                </span>
                <div className={`p-2 rounded-xl bg-slate-100 dark:bg-slate-900/80 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="text-xl font-orbitron font-extrabold text-slate-900 dark:text-slate-100 my-1 tracking-wide">
                {card.value}
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mb-2">
                {card.detail}
              </p>

              {/* Badge */}
              <div className="flex items-center justify-between border-t border-cyan-500/10 pt-2 text-[10px]">
                <span
                  className={`px-2 py-0.5 rounded-full font-mono font-semibold ${
                    card.badgeType === 'critical'
                      ? 'bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-500/40'
                      : card.badgeType === 'warning'
                      ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-400 border border-amber-300 dark:border-amber-500/40'
                      : card.badgeType === 'special'
                      ? 'bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-400/40'
                      : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40'
                  }`}
                >
                  {card.badge}
                </span>
                <TrendingUp className="w-3 h-3 text-cyan-600 dark:text-cyan-400/60" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
