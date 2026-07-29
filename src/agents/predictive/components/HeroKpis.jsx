import React from 'react';
import { 
  HeartPulse, 
  AlertOctagon, 
  TrendingDown, 
  BellRing, 
  CalendarClock, 
  ShieldCheck, 
  BrainCircuit, 
  CheckCircle 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HeroKpis = () => {
  const { assets, maintenanceTasks, mockFailurePredictions } = useApp();

  const totalAssets = assets.length;
  const avgHealth = (assets.reduce((sum, a) => sum + a.healthScore, 0) / totalAssets).toFixed(1);
  const criticalCount = assets.filter((a) => a.status === 'Critical').length;
  const warningCount = assets.filter((a) => a.status === 'Warning' || a.status === 'Maintenance Required').length;
  const highRiskFailures = mockFailurePredictions.filter((p) => p.riskLevel === 'Critical' || p.riskLevel === 'High').length;
  const tasksDueToday = maintenanceTasks.filter((t) => t.category === 'Today\'s Tasks' || t.category === 'Critical Maintenance').length;

  const kpis = [
    {
      id: 'health',
      title: 'Overall Asset Health Score',
      value: `${avgHealth}%`,
      subtitle: `${totalAssets} Smart Infrastructure Nodes`,
      icon: HeartPulse,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 border-emerald-200',
      trend: '+1.4% vs last week',
      trendType: 'positive',
    },
    {
      id: 'critical',
      title: 'Critical Assets',
      value: criticalCount,
      subtitle: `${warningCount} Warning / Maint Required`,
      icon: AlertOctagon,
      color: 'text-red-600',
      bgColor: 'bg-red-50 border-red-200',
      trend: 'Requires immediate action',
      trendType: 'negative',
    },
    {
      id: 'predicted_failures',
      title: 'Predicted Failures (AI)',
      value: highRiskFailures,
      subtitle: 'Next 30 Days Forecast',
      icon: TrendingDown,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 border-amber-200',
      trend: '3 High Risk (PMP-202, MTR-708)',
      trendType: 'warning',
    },
    {
      id: 'active_alerts',
      title: 'Active Telemetry Alerts',
      value: '4',
      subtitle: '2 Critical, 2 Warnings',
      icon: BellRing,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 border-orange-200',
      trend: 'Real-time sensor feeds',
      trendType: 'neutral',
    },
    {
      id: 'maint_due',
      title: 'Maintenance Due',
      value: tasksDueToday,
      subtitle: 'Scheduled Work Orders',
      icon: CalendarClock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200',
      trend: '2 Technicians Assigned',
      trendType: 'neutral',
    },
    {
      id: 'downtime_saved',
      title: 'Estimated Downtime Saved',
      value: '148 Hours',
      subtitle: '$320,000 Avoided Cost',
      icon: ShieldCheck,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 border-indigo-200',
      trend: '+42h avoided this month',
      trendType: 'positive',
    },
    {
      id: 'ai_confidence',
      title: 'AI Confidence Score',
      value: '98.4%',
      subtitle: 'Predictive RUL Model',
      icon: BrainCircuit,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 border-purple-200',
      trend: 'Calibrated continuously',
      trendType: 'positive',
    },
    {
      id: 'system_availability',
      title: 'System Availability',
      value: '99.98%',
      subtitle: 'Smart Grid & City Services',
      icon: CheckCircle,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50 border-teal-200',
      trend: 'SLA standard met',
      trendType: 'positive',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.id}
            className="card-enterprise p-4 flex flex-col justify-between hover:-translate-y-0.5 transition-transform"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">{kpi.title}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1 tracking-tight">{kpi.value}</h3>
              </div>
              <div className={`p-2.5 rounded-xl border ${kpi.bgColor}`}>
                <Icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-medium">{kpi.subtitle}</span>
              <span
                className={`font-semibold ${
                  kpi.trendType === 'positive'
                    ? 'text-emerald-600'
                    : kpi.trendType === 'negative'
                    ? 'text-red-600 font-bold'
                    : kpi.trendType === 'warning'
                    ? 'text-amber-600'
                    : 'text-slate-600'
                }`}
              >
                {kpi.trend}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
