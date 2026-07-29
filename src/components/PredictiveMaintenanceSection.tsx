import React, { useState } from 'react';
import { Wrench, ShieldAlert, CheckCircle2, Thermometer, Zap, AlertTriangle, RefreshCw } from 'lucide-react';

export const PredictiveMaintenanceSection: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [ticketDispatched, setTicketDispatched] = useState(false);

  const runDiagnosticScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 1800);
  };

  const dispatchRepairTicket = () => {
    setTicketDispatched(true);
    setTimeout(() => setTicketDispatched(false), 4000);
  };

  return (
    <section id="maintenance" className="w-full py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
              <Wrench className="w-4 h-4" />
              <span>Automated Hardware Diagnostics</span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Predictive Maintenance
            </h2>
            <p className="mt-2 text-slate-600 max-w-2xl text-base font-medium">
              Real-time thermal sensors, insulation impedance checks, and remaining useful life (RUL) forecasting prevent charger downtime before it occurs.
            </p>
          </div>

          <button
            onClick={runDiagnosticScan}
            disabled={isScanning}
            className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center space-x-2 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Scanning 18 Stations...' : 'Run Diagnostics Scan'}</span>
          </button>
        </div>

        {/* Diagnostic Monitor Main Box */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Active Station Health Scanner Status */}
          <div className="lg:col-span-7 card-20 p-8 flex flex-col justify-between relative overflow-hidden">
            
            {/* Scanner Pulse Overlay */}
            {isScanning && (
              <div className="absolute inset-0 bg-blue-500/5 backdrop-blur-[1px] z-10 flex items-center justify-center">
                <div className="text-center bg-white px-6 py-4 rounded-2xl border border-blue-200 shadow-xl">
                  <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
                  <p className="mt-2 text-sm font-bold text-slate-900">Scanning High-Voltage Contactors...</p>
                  <p className="text-xs text-slate-500 font-mono">Telemetry: 1,482 Sensors Polled</p>
                </div>
              </div>
            )}

            <div>
              <div className="flex justify-between items-start pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">Station Health Diagnostic Telemetry</h3>
                  <p className="text-xs text-slate-500">Live contactor impedance, liquid cooling flow rate, and cable temperature.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold font-mono border border-emerald-200">
                  98.4% System Health
                </span>
              </div>

              {/* Station Sensors List */}
              <div className="mt-6 space-y-4">
                
                <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Thermometer className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">NeuraHub Metro Terminal (ST-01)</p>
                      <p className="text-[11px] text-slate-500">Coolant Temp: 38.2°C • Contactor Resistance: 0.12 mΩ</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-600 font-mono">Nominal</span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Zap className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Silicon Boulevard Express (ST-02)</p>
                      <p className="text-[11px] text-slate-500">Inverter Efficiency: 98.2% • RUL: 510 days remaining</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-600 font-mono">Nominal</span>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 flex items-center justify-between shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Highland North Smart Depot (ST-06)</p>
                      <p className="text-[11px] text-amber-700 font-medium">Thermal Gradient Warning: 58.4°C (Limit: 55°C)</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-amber-600 font-mono">Alert Triggered</span>
                </div>

              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 flex justify-between items-center text-xs font-semibold text-slate-500">
              <span>Auto-Calibration: <strong className="text-slate-900 font-mono">Every 60s</strong></span>
              <span className="text-emerald-600 font-bold">Zero Offline Outages</span>
            </div>

          </div>

          {/* Maintenance Alert & Automated Repair Dispatch Ticket */}
          <div className="lg:col-span-5 card-white p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-xs font-extrabold uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 w-fit">
                <ShieldAlert className="w-4 h-4" />
                <span>Active Diagnostic Alert</span>
              </div>

              <h3 className="mt-4 text-xl font-extrabold text-slate-900">
                Highland North Contactor Thermal Alert
              </h3>
              <p className="mt-2 text-xs text-slate-600 font-medium leading-relaxed">
                NeuraGrid AI detected a +3.4°C thermal anomaly in Stall #02 liquid cooling loop. Station has been automatically derated to 100 kW to preserve hardware integrity.
              </p>

              <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Detected Anomaly:</span>
                  <span className="font-mono font-bold text-amber-600">Coolant Pump Flow Drop</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Est. Component RUL:</span>
                  <span className="font-mono font-bold text-slate-900">45 days remaining</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Recommended Action:</span>
                  <span className="font-mono font-bold text-blue-600">Replace Pump Seals</span>
                </div>
              </div>
            </div>

            {/* Repair Dispatch Button */}
            <div className="mt-8">
              {ticketDispatched ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Service Ticket #8849 Dispatched to Field Engineer!</span>
                </div>
              ) : (
                <button
                  onClick={dispatchRepairTicket}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Dispatch Auto-Service Ticket</span>
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
