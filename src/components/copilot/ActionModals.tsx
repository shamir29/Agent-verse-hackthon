"use client";

import React, { useState } from "react";
import { CopilotAction } from "@/types/copilot";
import {
  FileText,
  Users,
  Send,
  AlertOctagon,
  CheckCircle2,
  X,
  Printer,
  Download,
  Shield,
  Clock,
  Wrench,
  Activity,
} from "lucide-react";

interface ActionModalProps {
  action: CopilotAction | null;
  onClose: () => void;
  onExecuteSuccess?: (message: string) => void;
}

export function ActionModals({ action, onClose, onExecuteSuccess }: ActionModalProps) {
  const [isExecuting, setIsExecuting] = useState(false);
  const [executed, setExecuted] = useState(false);

  if (!action) return null;

  const payload = action.payload || {};

  const handleConfirm = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setExecuted(true);
      if (onExecuteSuccess) {
        onExecuteSuccess(`Action executed successfully: ${action.label}`);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-surface border border-border rounded-card shadow-2xl max-w-lg w-full overflow-hidden text-text-primary flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 border-b border-border bg-bg/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-btn bg-primary/10 text-primary flex items-center justify-center font-bold">
              {action.type === "create_work_order" && <FileText className="w-4 h-4" />}
              {action.type === "assign_team" && <Users className="w-4 h-4" />}
              {action.type === "notify_ops" && <Send className="w-4 h-4" />}
              {action.type === "isolate_valve" && <AlertOctagon className="w-4 h-4 text-red-critical" />}
              {action.type === "reroute_load" && <Activity className="w-4 h-4 text-blue-600" />}
            </div>
            <div>
              <h3 className="text-sm font-bold">{action.label}</h3>
              <span className="text-[10px] text-text-tertiary uppercase tracking-wider font-semibold">
                NeuraGrid Copilot Executable Directive
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-chip text-text-tertiary hover:text-text-primary hover:bg-border/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {executed ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-good/10 text-emerald-good mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-text-primary">Execution Confirmed & Broadcasted</h4>
              <p className="text-text-secondary max-w-xs mx-auto">
                Directive has been logged in the NeuraGrid Audit Ledger and dispatched to active telemetry channels.
              </p>
              <div className="p-3 bg-bg border border-border rounded-btn font-mono text-[11px] text-primary">
                Transaction ID: TX-{Math.floor(Math.random() * 890000 + 100000)}
              </div>
            </div>
          ) : (
            <>
              {/* Scenario 1: Work Order */}
              {action.type === "create_work_order" && (
                <div className="space-y-4">
                  <div className="p-4 bg-bg border border-border rounded-card space-y-3">
                    <div className="flex items-center justify-between border-b border-border/80 pb-2">
                      <span className="font-bold text-primary font-mono">{payload.woId || "WO-2026-8942"}</span>
                      <span className="px-2 py-0.5 rounded-chip text-[10px] font-bold bg-red-critical/10 text-red-critical border border-red-critical/20">
                        {payload.priority || "HIGH P1"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-text-tertiary block">Target Asset:</span>
                        <span className="font-semibold text-text-primary">{payload.asset || "Main Pipe Segment"}</span>
                      </div>
                      <div>
                        <span className="text-text-tertiary block">Estimated Cost:</span>
                        <span className="font-semibold text-text-primary">{payload.estCost || "$3,200"}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-text-tertiary block">Dispatch Location:</span>
                        <span className="font-semibold text-text-primary">{payload.location || "Poondi Feeder Segment 4"}</span>
                      </div>
                    </div>

                    {payload.tools && (
                      <div className="pt-2 border-t border-border/80">
                        <span className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider block mb-1">
                          Required Tools & Equipment:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {payload.tools.map((t: string, i: number) => (
                            <span key={i} className="px-2 py-0.5 bg-surface border border-border rounded-chip text-[10px] font-medium">
                              <Wrench className="w-2.5 h-2.5 inline mr-1 text-primary" /> {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-text-tertiary text-[11px]">
                    <span className="flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-emerald-good" /> Signed by NeuraGrid Operations Copilot
                    </span>
                    <button className="hover:text-primary transition-colors flex items-center gap-1">
                      <Printer className="w-3.5 h-3.5" /> Export PDF
                    </button>
                  </div>
                </div>
              )}

              {/* Scenario 2: Assign Team */}
              {action.type === "assign_team" && (
                <div className="space-y-4">
                  <div className="p-4 bg-bg border border-border rounded-card space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-text-primary">{payload.teamName || "Crew Alpha - Hydro Unit 3"}</span>
                      <span className="px-2 py-0.5 rounded-chip text-[10px] font-bold bg-primary/10 text-primary">
                        STANDBY READY
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-[11px] pt-2 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-warning" />
                        <div>
                          <span className="text-text-tertiary block">Estimated Arrival:</span>
                          <span className="font-bold text-text-primary">{payload.etaMins || 22} Minutes</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <div>
                          <span className="text-text-tertiary block">Crew Size:</span>
                          <span className="font-bold text-text-primary">4 Technicians</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Scenario 3: Notify Ops */}
              {action.type === "notify_ops" && (
                <div className="space-y-3">
                  <p className="text-text-secondary">
                    Broadcast critical telemetry alert to the Central City Operations Room and duty supervisor mobile units.
                  </p>
                  <div className="p-3 bg-bg border border-border rounded-btn">
                    <label className="text-[10px] font-semibold text-text-tertiary uppercase block mb-1">
                      Alert Broadcast Channel:
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={payload.channel || "Control Room #1 (High Priority)"}
                      className="w-full bg-surface border border-border px-3 py-1.5 rounded text-xs font-semibold text-text-primary"
                    />
                  </div>
                </div>
              )}

              {/* Scenario 4: SCADA Valve Shutoff / Power Reroute */}
              {(action.type === "isolate_valve" || action.type === "reroute_load") && (
                <div className="space-y-3">
                  <div className="p-3 bg-red-critical/10 border border-red-critical/30 rounded-btn text-red-critical flex items-start gap-2">
                    <AlertOctagon className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-xs">Direct SCADA Remote Actuation Signal</h5>
                      <p className="text-[11px] opacity-90">
                        This directive sends an immediate hardware execution payload to SCADA telemetry gateways.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-bg border border-border rounded-btn font-mono text-[11px] space-y-1">
                    <div>COMMAND: {action.type.toUpperCase()}</div>
                    <div>VALVE/FEEDER: {payload.valveId || payload.from || "MAIN-SEG-1"}</div>
                    <div>TARGET STATE: {payload.targetState || "REROUTED 15MW"}</div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer Buttons */}
        <div className="p-4 border-t border-border bg-bg/30 flex items-center justify-end gap-3">
          {executed ? (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-btn hover:bg-primary-hover transition-colors"
            >
              Done
            </button>
          ) : (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-surface border border-border text-text-secondary hover:text-text-primary text-xs font-medium rounded-btn transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={isExecuting}
                className="px-5 py-2 bg-primary text-white text-xs font-bold rounded-btn hover:bg-primary-hover disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                {isExecuting ? (
                  <>
                    <Activity className="w-3.5 h-3.5 animate-spin" /> Dispatching Payload...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" /> Confirm & Execute
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
