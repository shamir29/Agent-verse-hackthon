import React from 'react';
import { X, Bell, AlertTriangle, AlertCircle, Info, CheckCircle2, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NotificationsDrawer = () => {
  const {
    notificationsOpen,
    setNotificationsOpen,
    notifications,
    markNotificationRead,
    clearAllNotifications,
  } = useApp();

  if (!notificationsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200 border-l border-slate-200">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-slate-700" />
            <h3 className="font-bold text-slate-900 text-base">Telemetry Alerts & Notifications</h3>
          </div>
          <button
            onClick={() => setNotificationsOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body: Notifications List */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center text-slate-400 py-12 text-xs">No active notifications</div>
          ) : (
            notifications.map((notif) => {
              const isCritical = notif.type === 'critical';
              const isWarning = notif.type === 'warning';

              return (
                <div
                  key={notif.id}
                  onClick={() => markNotificationRead(notif.id)}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    notif.unread ? 'bg-blue-50/40 border-blue-200 shadow-2xs' : 'bg-white border-slate-200 opacity-80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      {isCritical ? (
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      ) : isWarning ? (
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      ) : (
                        <Info className="w-4 h-4 text-blue-600 shrink-0" />
                      )}
                      <span>{notif.title}</span>
                    </div>

                    {notif.unread && (
                      <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1" />
                    )}
                  </div>

                  <p className="text-slate-600 text-[11px] leading-relaxed pl-5">{notif.message}</p>
                  
                  <div className="mt-2 pl-5 flex items-center justify-between text-[10px] text-slate-400">
                    <span>{notif.time}</span>
                    {notif.unread && (
                      <span className="text-blue-600 font-semibold hover:underline">Mark read</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={clearAllNotifications}
            className="text-xs text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Mark All as Read
          </button>
          
          <button
            onClick={() => setNotificationsOpen(false)}
            className="px-4 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-2xs hover:bg-slate-800 transition"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
