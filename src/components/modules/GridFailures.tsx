import React from 'react';
import { GridFailureAlert, TelemetryStats } from '../../types/powerGrid';
import { AlertTriangle, ShieldAlert, Zap, CheckCircle2, Bot, Play, RotateCcw, Activity } from 'lucide-react';

interface GridFailuresProps {
  alerts: GridFailureAlert[];
  telemetry: TelemetryStats;
  onTriggerFailure: (type: 'substation_trip' | 'transformer_overload' | 'line_break' | 'solar_flare') => void;
  onRunAiHealing: () => void;
}

export const GridFailures: React.FC<GridFailuresProps> = ({
  alerts,
  telemetry,
  onTriggerFailure,
  onRunAiHealing
}) => {
  const activeAlerts = alerts.filter(a => a.status === 'active');
  const resolvedAlerts = alerts.filter(a => a.status === 'resolved_by_ai' || a.status === 'manually_fixed');

  return (
    <div className="space-y-6">
      
      {/* Top Hero Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className={`p-4 rounded-2xl border ${
            telemetry.activeFailuresCount > 0
              ? 'bg-red-50 text-red-600 border-red-200 animate-pulse'
              : 'bg-emerald-50 text-emerald-600 border-emerald-200'
          }`}>
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-slate-900">Grid Failures & AI Self-Healing Engine</h2>
              <span className={`px-2.5 py-0.5 text-xs font-extrabold rounded-full ${
                telemetry.activeFailuresCount > 0 ? 'bg-red-500 text-white' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {telemetry.activeFailuresCount > 0 ? `${telemetry.activeFailuresCount} CRITICAL FAULT` : 'GRID HEALTHY'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Autonomous AI anomaly detection, automatic line trip isolation, and millisecond emergency re-routing.
            </p>
          </div>
        </div>

        {/* AI Self Healing Big Button */}
        <button
          onClick={onRunAiHealing}
          className="w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700 text-white font-bold text-sm shadow-md shadow-cyan-500/20 flex items-center justify-center space-x-2 transition-all"
        >
          <Bot className="w-5 h-5 text-cyan-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Execute Simple AI Self-Healing</span>
        </button>
      </div>

      {/* Manual Failure Injection Controls */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500" />
          Fault Injection Simulator (Test AI Resilience)
        </h3>
        <p className="text-xs text-slate-500">
          Click any incident scenario below to simulate live hardware failures and observe how the Simple AI Agent reacts.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          <button
            onClick={() => onTriggerFailure('line_break')}
            className="p-4 rounded-xl bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-300 text-left transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 group-hover:text-red-700">1. Feeder Line Trip</span>
              <AlertTriangle className="w-4 h-4 text-red-500" />
            </div>
            <p className="text-slate-500 mt-1">
              Simulate high-voltage phase fault on Hospital feeder line. Cuts primary supply.
            </p>
          </button>

          <button
            onClick={() => onTriggerFailure('substation_trip')}
            className="p-4 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-left transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 group-hover:text-amber-700">2. Substation Busbar Fault</span>
              <Zap className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-slate-500 mt-1">
              Simulate overcurrent trip at North Substation (isolates 320MW distribution).
            </p>
          </button>

          <button
            onClick={() => onTriggerFailure('solar_flare')}
            className="p-4 rounded-xl bg-slate-50 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-300 text-left transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 group-hover:text-cyan-700">3. Sudden Weather Disturbance</span>
              <Activity className="w-4 h-4 text-cyan-500" />
            </div>
            <p className="text-slate-500 mt-1">
              Simulate 70% drop in solar irradiance due to storm front. Tests BESS battery boost.
            </p>
          </button>

        </div>
      </div>

      {/* Incidents Table / Log */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">Live Incident Log & Resolution History</h3>

        {alerts.length === 0 ? (
          <div className="text-center py-10 text-slate-400 bg-slate-50 rounded-xl border border-slate-200">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No active or historical grid faults.</p>
            <p className="text-xs text-slate-500 mt-0.5">Use the Fault Injection Simulator above to trigger a test incident.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Incident Title</th>
                  <th className="py-3 px-4">Severity</th>
                  <th className="py-3 px-4">Affected Load</th>
                  <th className="py-3 px-4">Status & AI Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {alerts.map(alert => (
                  <tr key={alert.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-600">{alert.timestamp}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{alert.title}</div>
                      <div className="text-[11px] text-slate-500">{alert.description}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 font-bold rounded-full text-[10px] ${
                        alert.severity === 'critical'
                          ? 'bg-red-100 text-red-700 border border-red-200'
                          : 'bg-amber-100 text-amber-700 border border-amber-200'
                      }`}>
                        {alert.severity.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-800">{alert.affectedLoadMW} MW</td>
                    <td className="py-3 px-4">
                      {alert.status === 'active' ? (
                        <button
                          onClick={onRunAiHealing}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors flex items-center space-x-1 animate-pulse"
                        >
                          <span>Auto-Fix with AI</span>
                        </button>
                      ) : (
                        <div className="flex items-center space-x-1 text-emerald-600 font-bold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Resolved by AI ({alert.reroutedVia || 'Grid Rerouted'})</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
