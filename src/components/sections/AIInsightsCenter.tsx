import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { useGrid } from '../../context/GridContext';
import confetti from 'canvas-confetti';

export const AIInsightsCenter: React.FC = () => {
  const { insights, applyInsight } = useGrid();

  const handleApply = (id: string) => {
    applyInsight(id);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  return (
    <section id="insights" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 space-y-4 md:space-y-0">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3 border border-blue-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time Autonomous Recommendations</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              AI Decision Engine & Grid Directives
            </h2>
            <p className="text-slate-600 mt-1 max-w-2xl text-sm">
              Single-click authorization to execute high-impact autonomous microgrid optimization routines.
            </p>
          </div>
        </div>

        {/* Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insights.map(item => (
            <div 
              key={item.id}
              className={`p-6 rounded-[20px] bg-white border transition-all duration-300 flex flex-col justify-between space-y-5 shadow-apple ${
                item.applied ? 'border-emerald-300 ring-2 ring-emerald-100' : 'border-slate-200 hover:border-blue-300'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100">
                    {item.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {item.confidenceScore}% Confidence
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center justify-between">
                  <span>Impact:</span>
                  <span>{item.impact}</span>
                </div>

                {item.applied ? (
                  <div className="w-full py-2.5 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Directive Authorized & Active</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleApply(item.id)}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-500/20 flex items-center justify-center space-x-1.5 transition-all transform hover:scale-[1.02]"
                  >
                    <span>{item.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
