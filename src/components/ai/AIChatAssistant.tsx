import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  Bot,
  Radio,
  ArrowRight,
} from 'lucide-react';
import { ChatMessage, MainTelemetry, LeakAlert, ReservoirData } from '../../types/waterSystem';
import { AIPredictorEngine } from '../../services/aiPredictor';

interface AIChatAssistantProps {
  telemetry: MainTelemetry;
  leaks: LeakAlert[];
  reservoirs: ReservoirData[];
  onNavigateTab: (tab: string) => void;
}

export const AIChatAssistant: React.FC<AIChatAssistantProps> = ({
  telemetry,
  leaks,
  reservoirs,
  onNavigateTab,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: "Greetings! I am **AquaMind AI Assistant**. Ask me anything about real-time water consumption, active pipe leaks, reservoir levels, flood forecasts, or smart irrigation recommendations.",
      timestamp: 'Just now',
      quickActions: [
        { label: "Show today's water usage", actionTab: 'distribution' },
        { label: "Where is the leak?", actionTab: 'leak-ai' },
        { label: "Which reservoir is nearly full?", actionTab: 'reservoirs' },
        { label: "Predict next week's demand", actionTab: 'distribution' },
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    // Add User Message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Generate Context-Aware AI Answer
    setTimeout(() => {
      let aiText = '';
      let quickActions: ChatMessage['quickActions'] = undefined;
      let card: ChatMessage['telemetryCard'] = undefined;
      const lower = query.toLowerCase();

      if (lower.includes('usage') || lower.includes('consumption')) {
        aiText = `Today's daily water consumption rate is **${telemetry.dailyConsumptionMGL} MGL/day**. Peak draw rate occurs between 14:00 and 16:00. Total system reserve available is **${telemetry.totalWaterAvailableMGL} MGL**.`;
        card = {
          title: 'Daily Water Draw Rate',
          value: `${telemetry.dailyConsumptionMGL} MGL/day`,
          detail: 'System efficiency at 94.2%',
        };
        quickActions = [{ label: 'View Distribution Details', actionTab: 'distribution' }];
      } else if (lower.includes('leak') || lower.includes('burst') || lower.includes('where')) {
        const topLeak = leaks[0];
        aiText = `There are currently **${leaks.length} active leak alerts**. The most severe leak is located at **${topLeak.locationName}** (${topLeak.pipeName}) with an estimated loss of **${topLeak.estimatedLossLh.toLocaleString()} L/hr** and pressure drop of **${topLeak.pressureDropPsi} PSI**.`;
        card = {
          title: `Leak Alert: ${topLeak.id}`,
          value: `${topLeak.estimatedLossLh.toLocaleString()} L/h Loss`,
          detail: `Severity: ${topLeak.severity} | ${topLeak.locationName}`,
        };
        quickActions = [{ label: 'Isolate Leak Valve', actionTab: 'leak-ai' }];
      } else if (lower.includes('reservoir') || lower.includes('full') || lower.includes('dam')) {
        const topRes = reservoirs[0];
        aiText = `The **${topRes.name}** is currently at **${topRes.fillPercentage}% capacity** (${topRes.currentCapacityMGL} MGL / ${topRes.maxCapacityMGL} MGL). It is expected to reach maximum capacity within 4 days. Spillway dam gate is operating at ${topRes.damGateOpenPct}% discharge.`;
        card = {
          title: topRes.name,
          value: `${topRes.fillPercentage}% Full`,
          detail: `Daily Inflow: +${topRes.dailyInflowMGL} MGL/day`,
        };
        quickActions = [{ label: 'Adjust Dam Gate Outflow', actionTab: 'reservoirs' }];
      } else if (lower.includes('demand') || lower.includes('predict') || lower.includes('next week')) {
        const forecast = AIPredictorEngine.forecast7DayWaterDemand(telemetry.dailyConsumptionMGL);
        aiText = `AI 7-day demand model forecasts peak demand of **${forecast[5].predictedMGL} MGL/day** on Saturday due to hot weather (34°C). Recommended baseline supply buffer: **+12%**.`;
        quickActions = [{ label: 'Open Demand Analytics', actionTab: 'distribution' }];
      } else if (lower.includes('irrigation') || lower.includes('schedule') || lower.includes('farm')) {
        aiText = `AI soil moisture analysis recommends irrigating Green Valley Wheat Field today between **19:00 - 22:00** with **185,000 Liters**. Water saving efficiency today: **32%**.`;
        quickActions = [{ label: 'View Smart Farm Heatmap', actionTab: 'irrigation' }];
      } else if (lower.includes('quality') || lower.includes('ph') || lower.includes('explain')) {
        aiText = `Water Quality Index (WQI) is **${telemetry.waterQualityIndex} / 100 (Grade A Potable)**. Average pH is 7.4 and TDS is 142 ppm. Minor turbidity spike detected in Sector 4 Sub-grid 4B.`;
        quickActions = [{ label: 'Open Quality Sensors', actionTab: 'quality' }];
      } else {
        aiText = `I am continuously monitoring the water grid telemetry. Currently: **${telemetry.totalWaterAvailableMGL} MGL** available, **${telemetry.activeLeaksCount} active leaks**, and flood risk at **${telemetry.floodRiskPct}% (${telemetry.floodRiskLevel})**.`;
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions,
        telemetryCard: card,
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 500);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-neon-cyan hover:scale-105 transition-transform flex items-center gap-2 font-orbitron font-bold text-xs"
        >
          <Bot className="w-6 h-6 animate-pulse" />
          <span>AQUAMIND AI CHAT</span>
        </button>
      )}

      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[520px] glass-panel rounded-3xl border border-cyan-500/40 shadow-2xl flex flex-col overflow-hidden bg-white dark:bg-[#0b1226] text-slate-900 dark:text-slate-100 animate-in slide-in-from-bottom duration-300">
          
          {/* Top Bar */}
          <div className="p-4 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-950 dark:to-slate-900 border-b border-cyan-500/30 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-white/20 dark:bg-cyan-500/20 border border-white/40 dark:border-cyan-400 text-white dark:text-cyan-300">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-xs tracking-wider">
                  AQUAMIND AI ASSISTANT
                </h3>
                <span className="text-[10px] text-cyan-100 dark:text-cyan-400 font-mono flex items-center gap-1">
                  <Radio className="w-2.5 h-2.5 animate-ping text-emerald-300 dark:text-emerald-400" /> ONLINE TELEMETRY SYNCED
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((msg) => {
              const isAi = msg.sender === 'ai';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 ${isAi ? 'justify-start' : 'justify-end'}`}
                >
                  {isAi && (
                    <div className="p-1.5 rounded-lg bg-cyan-100 dark:bg-cyan-950 border border-cyan-300 dark:border-cyan-500/40 text-cyan-700 dark:text-cyan-400 mt-1">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div className={`max-w-[80%] space-y-2`}>
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        isAi
                          ? 'bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-cyan-500/20 text-slate-900 dark:text-slate-200 shadow-glass'
                          : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-neon-blue'
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>

                    {/* Telemetry Card callout */}
                    {msg.telemetryCard && (
                      <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-400/40 text-xs font-mono space-y-1">
                        <div className="text-[10px] text-cyan-700 dark:text-cyan-300">{msg.telemetryCard.title}</div>
                        <div className="text-sm font-bold text-cyan-900 dark:text-cyan-200">{msg.telemetryCard.value}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">{msg.telemetryCard.detail}</div>
                      </div>
                    )}

                    {/* Quick Action Pills */}
                    {msg.quickActions && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {msg.quickActions.map((qa, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              onNavigateTab(qa.actionTab);
                              setIsOpen(false);
                            }}
                            className="px-2.5 py-1 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-500/40 text-cyan-800 dark:text-cyan-300 text-[10px] font-semibold hover:bg-cyan-200 dark:hover:bg-cyan-900 transition flex items-center gap-1"
                          >
                            <span>{qa.label}</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Query Suggestions Bar */}
          <div className="px-3 py-2 bg-slate-100 dark:bg-[#050914] border-t border-slate-200 dark:border-cyan-500/10 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[10px]">
            {[
              "Show today's water usage",
              "Where is the leak?",
              "Predict next week's demand",
              "Suggest irrigation schedule",
            ].map((sugg, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(sugg)}
                className="px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-cyan-500 whitespace-nowrap transition"
              >
                {sugg}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-slate-100 dark:bg-slate-900/90 border-t border-slate-200 dark:border-cyan-500/20 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask AquaMind AI..."
              className="flex-1 bg-white dark:bg-black/40 border border-slate-300 dark:border-cyan-500/30 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={() => handleSend()}
              className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-neon-blue hover:opacity-90 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
};
