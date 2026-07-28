import React, { useState } from 'react';
import { AgentMessage, TelemetryStats } from '../../types/powerGrid';
import { Bot, Send, X, Zap, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw } from 'lucide-react';

interface SimpleGridAgentProps {
  isOpen: boolean;
  onClose: () => void;
  messages: AgentMessage[];
  onSendMessage: (text: string) => void;
  telemetry: TelemetryStats;
  onRunAiHealing: () => void;
  onSetBatteryMode: (mode: 'auto' | 'charge' | 'discharge' | 'reserve') => void;
}

export const SimpleGridAgent: React.FC<SimpleGridAgentProps> = ({
  isOpen,
  onClose,
  messages,
  onSendMessage,
  telemetry,
  onRunAiHealing,
  onSetBatteryMode
}) => {
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  const handleQuickCommand = (cmd: string) => {
    onSendMessage(cmd);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-white/95 backdrop-blur-xl border-l border-slate-200 shadow-2xl flex flex-col justify-between transition-all duration-300">
      
      {/* Agent Header */}
      <div className="p-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <div className="relative p-2 bg-cyan-500/20 rounded-xl border border-cyan-400/30 text-cyan-300">
            <Bot className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight">Simple AI Grid Agent</h3>
            <p className="text-[11px] text-cyan-300 font-medium">Autonomous Grid Balancing Engine</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Grid Live Health Pill Bar */}
      <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600 font-semibold">
        <div className="flex items-center space-x-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Stability: {telemetry.gridStabilityScore}/100</span>
        </div>
        <div className="text-cyan-700">
          {telemetry.renewableSharePct}% Renewable
        </div>
      </div>

      {/* Quick Action Commands */}
      <div className="p-3 bg-white border-b border-slate-200 space-y-1.5">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Quick Commands</div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => {
              onRunAiHealing();
              handleQuickCommand('Fix all grid failures');
            }}
            className="px-2.5 py-1 bg-cyan-50 hover:bg-cyan-100 text-cyan-800 text-[11px] font-semibold rounded-lg border border-cyan-200 flex items-center space-x-1 transition-colors"
          >
            <Zap className="w-3 h-3 text-cyan-600" />
            <span>Auto-Fix Grid</span>
          </button>

          <button
            onClick={() => handleQuickCommand('Report grid status')}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold rounded-lg border border-slate-300 flex items-center space-x-1 transition-colors"
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Grid Diagnostic</span>
          </button>

          <button
            onClick={() => {
              onSetBatteryMode('auto');
              handleQuickCommand('Set battery mode to smart auto');
            }}
            className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-[11px] font-semibold rounded-lg border border-indigo-200 transition-colors"
          >
            <span>🔋 Smart BESS</span>
          </button>
        </div>
      </div>

      {/* Messages Scroll View */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-cyan-600 text-white rounded-br-none shadow-sm'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
              }`}
            >
              {msg.sender === 'ai' && (
                <div className="flex items-center space-x-1 font-bold text-cyan-600 mb-1 text-[11px]">
                  <Bot className="w-3.5 h-3.5" />
                  <span>Simple AI Agent</span>
                </div>
              )}
              <p>{msg.text}</p>

              {msg.actionTaken && (
                <div className="mt-2 p-2 bg-emerald-50 text-emerald-900 rounded-lg border border-emerald-200 text-[11px] font-semibold">
                  <div className="flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Action Executed: {msg.actionTaken.type}</span>
                  </div>
                  <div className="text-[10px] font-normal text-emerald-800 mt-0.5">{msg.actionTaken.details}</div>
                </div>
              )}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 px-1 font-medium">{msg.timestamp}</span>
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Ask AI agent or command grid actions..."
          className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white disabled:opacity-50 transition-all shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
