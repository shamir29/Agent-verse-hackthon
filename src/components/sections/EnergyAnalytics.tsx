import React from 'react';
import { 
  BarChart3, 
  DollarSign, 
  Leaf, 
  Zap, 
  CheckCircle2 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const REGIONAL_DEMAND_DATA = [
  { region: 'Downtown Core', demand: 1420, renewable: 980 },
  { region: 'North Sector', demand: 980, renewable: 740 },
  { region: 'Silicon Heavy Ind.', demand: 1250, renewable: 810 },
  { region: 'East Waterfront', demand: 680, renewable: 620 },
  { region: 'South Bay', demand: 490, renewable: 420 },
];

export const EnergyAnalytics: React.FC = () => {
  return (
    <section id="analytics" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 space-y-4 md:space-y-0">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3 border border-blue-200">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Executive Telemetry Suite</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Grid Performance & Sustainability Analytics
            </h2>
            <p className="text-slate-600 mt-1 max-w-2xl text-sm">
              Comprehensive telemetry accounting for cost savings, line loss reduction, regional load distribution, and cumulative carbon offset.
            </p>
          </div>
        </div>

        {/* Executive Highlights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          <div className="p-6 rounded-[20px] bg-slate-50 border border-slate-200 shadow-apple space-y-3">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Monthly AI Cost Savings</span>
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900">$4,250,000</div>
            <p className="text-xs text-slate-500">
              Achieved by avoiding peak fossil generation ramp-up and minimizing thermal line losses.
            </p>
          </div>

          <div className="p-6 rounded-[20px] bg-slate-50 border border-slate-200 shadow-apple space-y-3">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">CO₂ Offset (YTD)</span>
              <Leaf className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-600">128,450 <span className="text-sm font-normal text-slate-500">Tons</span></div>
            <p className="text-xs text-slate-500">
              Equivalent to planting 5.8 million urban trees across the metropolitan area.
            </p>
          </div>

          <div className="p-6 rounded-[20px] bg-slate-50 border border-slate-200 shadow-apple space-y-3">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Transmission Efficiency</span>
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900">97.62%</div>
            <p className="text-xs text-emerald-600 font-semibold flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Line losses reduced to 2.38%
            </p>
          </div>

        </div>

        {/* Regional Demand Chart */}
        <div className="bg-slate-50 p-6 rounded-[20px] border border-slate-200 shadow-apple space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Regional Power Demand vs Renewable Supply (MW)</h3>
              <p className="text-xs text-slate-500">Breakdown across city districts</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REGIONAL_DEMAND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="region" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '12px' }} />
                <Bar dataKey="demand" name="Total Demand (MW)" fill="#2563EB" radius={[6, 6, 0, 0]} />
                <Bar dataKey="renewable" name="Renewable Supply (MW)" fill="#10B981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </section>
  );
};
