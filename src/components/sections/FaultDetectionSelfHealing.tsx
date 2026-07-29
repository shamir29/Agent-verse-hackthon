import React from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Cpu 
} from 'lucide-react';
import { useGrid } from '../../context/GridContext';

export const FaultDetectionSelfHealing: React.FC = () => {
  const { faults, triggerFaultSimulation, controlState } = useGrid();

  const activeFault = faults[0];

  return (
    <section id="fault-healing" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 space-y-4 md:space-y-0">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold mb-3 border border-rose-200">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Sub-45ms Self-Healing Grid Engine</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Autonomous Fault Detection & Self-Healing
            </h2>
            <p className="text-slate-600 mt-1 max-w-2xl text-sm">
              Instantaneous short-circuit detection, automated circuit breaker tripping, and dynamic power rerouting to guarantee zero-downtime microgrid resilience.
            </p>
          </div>

          {/* Interactive Trigger Sandbox Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => triggerFaultSimulation('tree_strike')}
              disabled={controlState.isFaultSimulationActive}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-md shadow-rose-500/20 disabled:opacity-50 transition-all cursor-pointer"
            >
              Simulate Tree Strike
            </button>
            <button
              onClick={() => triggerFaultSimulation('transformer_overload')}
              disabled={controlState.isFaultSimulationActive}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-md shadow-amber-500/20 disabled:opacity-50 transition-all cursor-pointer"
            >
              Simulate Transformer Surge
            </button>
          </div>
        </div>

        {/* Self-Healing Pipeline Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Col: Step-by-Step AI Execution Log */}
          <div className="lg:col-span-2 bg-slate-50 p-6 rounded-[20px] border border-slate-200 shadow-apple space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">Real-Time Autonomous Isolation Sequence</h3>
              </div>
              <span className="text-xs font-bold text-slate-500">Target Time: &lt; 45ms Total</span>
            </div>

            {/* 3 Step Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Step 1: Detect */}
              <div className={`p-4 rounded-xl border text-xs space-y-2 transition-all ${
                activeFault && activeFault.status !== 'resolved'
                  ? 'bg-rose-50 border-rose-200 text-rose-900'
                  : 'bg-white border-slate-200 text-slate-800'
              }`}>
                <div className="flex items-center justify-between font-bold">
                  <span>1. Fault Detection</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-rose-100 text-rose-800">3.4 ms</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Micro-PMU sensors detect 120kA transient short circuit spike.
                </p>
                <div className="flex items-center text-[10px] text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> High Confidence
                </div>
              </div>

              {/* Step 2: Isolate */}
              <div className={`p-4 rounded-xl border text-xs space-y-2 transition-all ${
                activeFault && (activeFault.status === 'isolating' || activeFault.status === 'rerouted')
                  ? 'bg-amber-50 border-amber-200 text-amber-900'
                  : 'bg-white border-slate-200 text-slate-800'
              }`}>
                <div className="flex items-center justify-between font-bold">
                  <span>2. Breaker Trip</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-800">11.8 ms</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Solid-state vacuum circuit breaker CB-14 tripped autonomously.
                </p>
                <div className="flex items-center text-[10px] text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Fault Isolated
                </div>
              </div>

              {/* Step 3: Reroute & Heal */}
              <div className={`p-4 rounded-xl border text-xs space-y-2 transition-all ${
                activeFault && activeFault.status === 'resolved'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-white border-slate-200 text-slate-800'
              }`}>
                <div className="flex items-center justify-between font-bold">
                  <span>3. Power Rerouting</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">34.2 ms</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Power redirected via East Loop B & NeuraBank BESS.
                </p>
                <div className="flex items-center text-[10px] text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Zero Outages
                </div>
              </div>

            </div>

            {/* Active Fault Log Banner */}
            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Latest Event Log:</span>
                <span className="text-slate-400 font-mono text-[10px]">{activeFault?.timestamp}</span>
              </div>
              <p className="text-slate-600 font-mono text-[11px]">
                {activeFault?.locationName}: {activeFault?.impactDescription}
              </p>
            </div>

          </div>

          {/* Right Col: Performance Stats */}
          <div className="bg-slate-50 p-6 rounded-[20px] border border-slate-200 shadow-apple space-y-4">
            <h3 className="text-base font-bold text-slate-900">Grid Resilience Telemetry</h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex justify-between items-center">
                <span className="text-slate-500 font-medium">Avg Reroute Speed:</span>
                <span className="font-bold text-emerald-600 text-sm">34.2 ms</span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 flex justify-between items-center">
                <span className="text-slate-500 font-medium">Prevented Customer Outages:</span>
                <span className="font-bold text-slate-900 text-sm">142,500 Homes</span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 flex justify-between items-center">
                <span className="text-slate-500 font-medium">Self-Healing Success Rate:</span>
                <span className="font-bold text-emerald-600 text-sm">100.0%</span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 flex justify-between items-center">
                <span className="text-slate-500 font-medium">Automatic Recovery:</span>
                <span className="font-bold text-blue-600 text-sm">Enabled</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
