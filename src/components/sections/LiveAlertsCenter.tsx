import React from 'react';
import { 
  Bell, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck,
  BatteryCharging
} from 'lucide-react';
import { useGrid } from '../../context/GridContext';

interface LiveAlertsCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveAlertsCenter: React.FC<LiveAlertsCenterProps> = ({ isOpen, onClose }) => {
  const { faults } = useGrid();

  if (!isOpen) return null;

  const MOCK_NOTIFICATIONS = [
    {
      id: 'notif-1',
      title: 'NeuraBank BESS Activated',
      category: 'Optimization',
      time: 'Just now',
      message: '250MW battery dispatch initiated to cover evening peak demand surge.',
      type: 'info',
      icon: <BatteryCharging className="w-4 h-4 text-blue-600" />
    },
    {
      id: 'notif-2',
      title: 'Renewable Output Peak',
      category: 'Renewables',
      time: '12 mins ago',
      message: 'Solar arrays and coastal wind farms reached 68.4% clean contribution.',
      type: 'success',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />
    },
    {
      id: 'notif-3',
      title: 'Transformer Overload Pre-Empted',
      category: 'Protection',
      time: '24 mins ago',
      message: 'Industrial Sector thermal load rerouted via East Loop in 29.4ms.',
      type: 'warning',
      icon: <AlertTriangle className="w-4 h-4 text-amber-600" />
    },
    {
      id: 'notif-4',
      title: 'Grid Frequency Stabilized',
      category: 'Stability',
      time: '45 mins ago',
      message: 'Automatic VAR voltage compensation locked frequency to 60.02 Hz.',
      type: 'success',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-200 p-6 flex flex-col justify-between overflow-y-auto space-y-6">
        
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-md">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Live Grid Alert Center</h3>
                <p className="text-xs text-slate-500">Real-Time Event Audit Stream</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Fault Simulation Active Status */}
          {faults.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 tracking-wider uppercase">Active Fault Log</h4>
              {faults.map(f => (
                <div key={f.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between items-center font-bold text-slate-900">
                    <span>{f.locationName}</span>
                    <span className="text-[10px] text-slate-400">{f.timestamp}</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">{f.impactDescription}</p>
                </div>
              ))}
            </div>
          )}

          {/* System Notifications */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 tracking-wider uppercase">System Stream Notifications</h4>
            <div className="space-y-2.5">
              {MOCK_NOTIFICATIONS.map(n => (
                <div key={n.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-blue-200 transition-all text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {n.icon}
                      <span className="font-bold text-slate-900">{n.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{n.time}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{n.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-xs transition-colors cursor-pointer"
        >
          Dismiss Alerts
        </button>

      </div>
    </div>
  );
};
