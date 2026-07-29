import React from 'react';
import { TrendingUp, Clock, Users, DollarSign, Activity, BatteryCharging, ShieldAlert, Cpu } from 'lucide-react';

export const AiAnalyticsSection: React.FC = () => {
  const analyticsCards = [
    {
      title: 'Charging Demand Forecast',
      metric: '+14.2%',
      subtitle: 'Expected demand surge between 17:30 - 19:30',
      icon: TrendingUp,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      tag: 'AI Predict v4.2',
    },
    {
      title: 'Peak Hour Risk Window',
      metric: '18:15 PM',
      subtitle: 'Transformer #04 near 88% capacity limit',
      icon: Clock,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      tag: 'Load Shift Trigger',
    },
    {
      title: 'Average Queue Time',
      metric: '1.8 mins',
      subtitle: '-4.2 mins vs traditional unmanaged stations',
      icon: Users,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      tag: 'Zero Wait Guarantee',
    },
    {
      title: 'Daily Grid Revenue',
      metric: '$18,420',
      subtitle: 'Dynamic clean energy tariff optimization',
      icon: DollarSign,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      tag: '+22% Margin',
    },
    {
      title: 'Energy Consumption Trend',
      metric: '48.5 MWh',
      subtitle: 'Total clean power dispatched today',
      icon: Activity,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      tag: '100% Verified',
    },
    {
      title: 'Battery Longevity Guard',
      metric: '99.8%',
      subtitle: '0.00% lithium cell degradation recorded',
      icon: BatteryCharging,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      tag: 'Li-ion Safeguard',
    },
    {
      title: 'Equipment Utilization',
      metric: '84.2%',
      subtitle: 'Optimal port turn rate across 18 superhubs',
      icon: Cpu,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      tag: 'High Throughput',
    },
    {
      title: 'Fault Anomaly Risk',
      metric: '< 0.04%',
      subtitle: 'Real-time telemetry scan healthy',
      icon: ShieldAlert,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      tag: 'Diagnostic Active',
    },
  ];

  return (
    <section id="analytics" className="w-full py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
            <Cpu className="w-4 h-4" />
            <span>NeuraGrid Predictive Core</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            AI Analytics & Intelligence
          </h2>
          <p className="mt-3 text-lg text-slate-600 font-medium leading-relaxed">
            Continuous deep learning neural models predicting station demand, battery health, revenue optimization, and grid anomalies.
          </p>
        </div>

        {/* 8 Premium 20px Rounded Cards Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {analyticsCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="card-20 p-6 flex flex-col justify-between hover:scale-[1.02]">
                <div>
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl ${card.bg} ${card.color} flex items-center justify-center font-bold`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="mt-5 text-sm font-bold text-slate-600 tracking-tight">{card.title}</h3>
                  <p className={`mt-2 text-3xl font-extrabold font-mono tracking-tight ${card.color}`}>
                    {card.metric}
                  </p>
                  <p className="mt-2 text-xs text-slate-500 font-medium leading-normal">
                    {card.subtitle}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                  <span>Confidence: <strong className="text-slate-700">99.4%</strong></span>
                  <span className="text-blue-600 font-bold">Live Stream</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
