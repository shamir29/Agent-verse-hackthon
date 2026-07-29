import React from 'react';
import type { NotificationItem } from '../types/charging';
import { Bell, X, CheckCircle2, AlertTriangle, Zap, Info } from 'lucide-react';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
}

export const LiveNotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
}) => {
  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'grid_optimization': return Zap;
      case 'charging_completed': return CheckCircle2;
      case 'maintenance_detected': return AlertTriangle;
      case 'renewable_available': return Zap;
      default: return Info;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/20 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-200 p-6 flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Live AI System Stream</h3>
                <p className="text-xs text-slate-500 font-medium">Real-time smart city telemetry alerts</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action Bar */}
          <div className="mt-4 flex justify-between items-center text-xs font-semibold">
            <span className="text-slate-500">{notifications.length} Total Alerts</span>
            <button
              onClick={onMarkAllRead}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Mark all as read
            </button>
          </div>

          {/* Notifications Stream List */}
          <div className="mt-4 space-y-3 max-h-[70vh] overflow-y-auto pr-1">
            {notifications.map((item) => {
              const Icon = getIcon(item.type);
              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    !item.read
                      ? 'bg-blue-50/40 border-blue-200'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center font-bold ${
                        item.severity === 'ai'
                          ? 'bg-blue-600 text-white'
                          : item.severity === 'warning'
                          ? 'bg-amber-500 text-white'
                          : 'bg-emerald-500 text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4 fill-current" />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                        <span className="text-[10px] text-slate-400 font-mono">{item.timestamp}</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-600 leading-relaxed">{item.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200 text-center text-xs text-slate-500">
          <span>NeuraGrid Telemetry Feed • Updated every 2s</span>
        </div>

      </div>
    </div>
  );
};
