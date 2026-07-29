import React from 'react';
import { 
  Brain, 
  CloudSun, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const FORECAST_DATA = [
  { time: '06:00', actual: 3.4, predicted: 3.45, renewablePred: 2.1 },
  { time: '09:00', actual: 4.2, predicted: 4.18, renewablePred: 3.4 },
  { time: '12:00', actual: 4.8, predicted: 4.82, renewablePred: 4.3 },
  { time: '15:00', actual: 4.9, predicted: 4.91, renewablePred: 3.9 },
  { time: '18:00', actual: 5.1, predicted: 5.08, renewablePred: 2.6 },
  { time: '21:00', actual: 4.3, predicted: 4.35, renewablePred: 2.0 },
  { time: '00:00', actual: 3.6, predicted: 3.58, renewablePred: 1.7 },
];

export const AIForecasting: React.FC = () => {
  return (
    <section id="forecasting" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 space-y-4 md:space-y-0">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3 border border-blue-200">
              <Brain className="w-3.5 h-3.5" />
              <span>Predictive Neural Network</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              24-Hour AI Demand & Generation Forecasting
            </h2>
            <p className="text-slate-600 mt-1 max-w-2xl text-sm">
              Deep transformer models analyze micro-climate radar, EV fleet charging schedules, and industrial production cycles with 99.4% precision.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm text-xs text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">Prediction Confidence:</span>
            <span className="font-bold text-blue-600">99.4%</span>
          </div>
        </div>

        {/* Main Chart + Weather Impact Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recharts 24h Prediction Line Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-[20px] border border-slate-200 shadow-apple space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Actual vs Predicted Grid Load (GW)</h3>
                <p className="text-xs text-slate-500">Includes renewable generation forecast curve</p>
              </div>
              <div className="flex items-center space-x-3 text-xs">
                <span className="flex items-center text-blue-600 font-semibold"><span className="w-2.5 h-2.5 rounded-full bg-blue-600 mr-1.5"></span> Actual</span>
                <span className="flex items-center text-indigo-600 font-semibold"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500 mr-1.5"></span> AI Forecast</span>
                <span className="flex items-center text-emerald-600 font-semibold"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-1.5"></span> Renewables</span>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={FORECAST_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="time" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} domain={[0, 6]} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
                  <Line type="monotone" dataKey="actual" stroke="#2563EB" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="predicted" stroke="#6366F1" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                  <Line type="monotone" dataKey="renewablePred" stroke="#10B981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weather Impact & Peak Hour Warnings */}
          <div className="bg-white p-6 rounded-[20px] border border-slate-200 shadow-apple space-y-5">
            <div className="flex items-center space-x-2 text-slate-900 font-bold border-b border-slate-100 pb-3">
              <CloudSun className="w-5 h-5 text-blue-600" />
              <span>Weather Impact Matrix</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-900 block">Evening Peak Heatwave</span>
                  <span className="text-slate-500 text-[11px]">18:00 - 20:30 Expected</span>
                </div>
                <span className="px-2 py-1 bg-amber-100 text-amber-800 font-bold rounded-md text-[10px]">High Impact</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-900 block">Coastal Wind Front</span>
                  <span className="text-slate-500 text-[11px]">Boosts wind generation +18%</span>
                </div>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-md text-[10px]">Positive</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-900 block">EV Supercharger Peak</span>
                  <span className="text-slate-500 text-[11px]">17:30 Fleet Arrival</span>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 font-bold rounded-md text-[10px]">Managed</span>
              </div>
            </div>

            <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-200 text-xs text-blue-900 space-y-1">
              <div className="font-bold text-blue-800 flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1" />
                <span>Next Peak Hour Action Plan</span>
              </div>
              <p className="text-[11px] leading-snug">
                AI will autonomously trigger 250MWh BESS discharge starting at 17:45 to flatten the peak load curve without fossil ramp-up.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
