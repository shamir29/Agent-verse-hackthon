import React from 'react';
import { Radio, Server, Cpu, RefreshCw, Send, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { mockCrossAgentFeeds, mockBackendProtocols } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const CrossAgentIntegration = () => {
  const { assets } = useApp();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="card-enterprise p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Cross-Agent Telemetry & Protocol Gateway</h2>
          <p className="text-xs text-slate-500 mt-1">
            Bi-directional data exchange with Smart City sub-agents and industrial IoT protocols (MQTT, Modbus, OPC-UA).
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs px-3 py-1.5 rounded-lg border border-emerald-200 font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 6 Connected Agents Active
        </div>
      </div>

      {/* Cross-Agent Ingestion Hub */}
      <div className="card-enterprise p-5 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Radio className="w-4 h-4 text-blue-600" /> Cross-Agent Ingestion & Bi-Directional AI Directives
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockCrossAgentFeeds.map((feed) => (
            <div
              key={feed.agent}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">{feed.agent}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2 rounded-md border border-slate-100">
                <div>
                  <span className="text-slate-400 block">Monitored Assets</span>
                  <span className="font-bold text-slate-800 font-mono">{feed.monitoredAssets} Nodes</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Telemetry Stream</span>
                  <span className="font-bold text-blue-600 font-mono">{feed.telemetryRate}</span>
                </div>
              </div>

              <div className="text-xs space-y-1">
                <span className="text-[10px] font-semibold text-slate-400 uppercase">Latest Ingested Event:</span>
                <p className="text-slate-700 bg-slate-50 p-2 rounded border border-slate-100 font-medium">
                  {feed.lastEvent}
                </p>
              </div>

              <div className="text-xs space-y-1">
                <span className="text-[10px] font-semibold text-indigo-500 uppercase flex items-center gap-1">
                  <Send className="w-3 h-3" /> Sent AI Directive:
                </span>
                <p className="text-indigo-900 bg-indigo-50/60 p-2 rounded border border-indigo-100 font-medium">
                  {feed.recommendationPayload}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Industrial Protocol Adapters (SCADA / BMS / OPC-UA / Modbus) */}
      <div className="card-enterprise p-5 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Server className="w-4 h-4 text-slate-700" /> Backend Protocol Adapters & SCADA Gateway
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-semibold uppercase text-[10px] border-b border-slate-200">
                <th className="p-3">Protocol Engine</th>
                <th className="p-3">Connection Endpoint</th>
                <th className="p-3">Status</th>
                <th className="p-3">Latency</th>
                <th className="p-3">Registers / Topics / Auth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {mockBackendProtocols.map((proto) => (
                <tr key={proto.name} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900 font-sans">{proto.name}</td>
                  <td className="p-3 text-slate-600">{proto.endpoint}</td>
                  <td className="p-3">
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold font-sans">
                      {proto.status}
                    </span>
                  </td>
                  <td className="p-3 text-blue-600 font-bold">{proto.latency}</td>
                  <td className="p-3 text-slate-500 text-[11px] font-sans">
                    {proto.topics || proto.registers || proto.nodes || proto.auth || proto.statusText}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
