import React, { useState } from 'react';
import { IoTSensor, UserRole } from '../../types/waterSystem';
import {
  Shield,
  Radio,
  Cpu,
  Users,
  Bell,
  Plus,
  RefreshCw,
} from 'lucide-react';

interface AdminPanelProps {
  sensors: IoTSensor[];
  currentRole: UserRole;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ sensors, currentRole }) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'sensors' | 'ai-models' | 'users' | 'alerts'>('sensors');
  const [sensorList, setSensorList] = useState<IoTSensor[]>(sensors);
  const [aiSensitivity, setAiSensitivity] = useState(85);

  const toggleSensorStatus = (id: string) => {
    setSensorList((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: s.status === 'Optimal' ? 'Degraded' : 'Optimal' } : s
      )
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between glass-panel rounded-2xl p-4 border border-cyan-500/30">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-950/80 border border-purple-400 dark:border-purple-500/50 text-purple-600 dark:text-purple-400">
            <Shield className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-orbitron font-bold text-slate-900 dark:text-slate-100">
              ADMINISTRATION & SYSTEM CONFIGURATOR
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage IoT sensor mesh, fine-tune neural AI models, configure role permissions & alert thresholds
            </p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-mono font-bold text-xs border border-purple-300 dark:border-purple-500/40">
          Role Access: {currentRole}
        </span>
      </div>

      {/* Admin Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-cyan-500/20 pb-3">
        {[
          { id: 'sensors', label: 'IoT Sensor Mesh', icon: Radio },
          { id: 'ai-models', label: 'AI Models Hyperparameters', icon: Cpu },
          { id: 'users', label: 'Users & Roles', icon: Users },
          { id: 'alerts', label: 'Alert Configurations', icon: Bell },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeAdminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-neon-blue'
                  : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Tab 1: IoT Sensor Mesh Table */}
      {activeAdminTab === 'sensors' && (
        <div className="glass-panel rounded-2xl p-5 border border-cyan-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-orbitron font-bold text-cyan-700 dark:text-cyan-300 flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Active IoT Telemetry Nodes ({sensorList.length})
            </h3>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-100 dark:bg-cyan-950 border border-cyan-300 dark:border-cyan-500/40 text-cyan-800 dark:text-cyan-300 text-xs font-semibold hover:bg-cyan-200 transition">
              <Plus className="w-3.5 h-3.5" /> Provision New Sensor
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-900/90 text-slate-600 dark:text-slate-400 font-mono uppercase text-[10px]">
                <tr>
                  <th className="p-3">Sensor ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Battery</th>
                  <th className="p-3">Signal</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-cyan-500/10 font-mono">
                {sensorList.map((sensor) => (
                  <tr key={sensor.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition">
                    <td className="p-3 font-bold text-cyan-700 dark:text-cyan-400">{sensor.id}</td>
                    <td className="p-3 text-slate-800 dark:text-slate-200">{sensor.name}</td>
                    <td className="p-3 text-slate-700 dark:text-slate-300">{sensor.type}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">{sensor.location}</td>
                    <td className="p-3 text-emerald-600 dark:text-emerald-400">{sensor.batteryPct}%</td>
                    <td className="p-3 text-cyan-700 dark:text-cyan-300">{sensor.signalStrengthPct}%</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          sensor.status === 'Optimal'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-500/30'
                            : 'bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-500/30'
                        }`}
                      >
                        {sensor.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => toggleSensorStatus(sensor.id)}
                        className="px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-300 text-[10px] hover:bg-slate-300 dark:hover:bg-slate-700"
                      >
                        Toggle Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Content Tab 2: AI Model Hyperparameters */}
      {activeAdminTab === 'ai-models' && (
        <div className="glass-panel rounded-2xl p-5 border border-cyan-500/20 space-y-4">
          <h3 className="text-sm font-orbitron font-bold text-cyan-700 dark:text-cyan-300 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-600 dark:text-purple-400" /> AI Neural Models Tuning & Sensitivity
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-cyan-500/20 space-y-3">
              <div className="font-bold text-slate-800 dark:text-slate-200 text-xs">Leak Anomaly Sensitivity Threshold</div>
              <input
                type="range"
                min="50"
                max="99"
                value={aiSensitivity}
                onChange={(e) => setAiSensitivity(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500 dark:accent-purple-400"
              />
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-600 dark:text-slate-400">Sensitivity: {aiSensitivity}%</span>
                <span className="text-purple-700 dark:text-purple-300">False Positive Rate: &lt; 0.4%</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-cyan-500/20 space-y-3">
              <div className="font-bold text-slate-800 dark:text-slate-200 text-xs">Model Retraining Protocol</div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Last trained: Today at 02:00 UTC (100,000 telemetry epochs). Next automated retrain scheduled in 18 hours.
              </p>
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 text-white font-orbitron text-xs font-bold shadow-neon-blue hover:bg-purple-500 transition">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> TRIGGER IMMEDIATE MODEL RETRAIN
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
