"use client";

import React, { useState, useRef, useEffect } from "react";
import { processCopilotQuery } from "@/lib/copilotEngine";
import { CopilotResponseCard } from "@/components/copilot/CopilotResponseCard";
import { CopilotResponse } from "@/types/copilot";
import {
  Bot,
  Send,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  RefreshCw,
  Droplets,
  Zap,
  Wind,
  Layers,
} from "lucide-react";

export function AIAssistantPanel() {
  const [isOpen, setIsOpen] = useState(true);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Store structured Copilot responses
  const [responses, setResponses] = useState<CopilotResponse[]>([
    processCopilotQuery("Find water leakage locations"),
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedChips = [
    "Find water leakage locations",
    "High grid load on Adyar substation",
    "Hazardous AQI spike near industrial park",
    "Optimize EV charging station load",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [responses, isProcessing]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isProcessing) return;

    setIsProcessing(true);
    if (!textToSend) setInput("");

    setTimeout(() => {
      const res = processCopilotQuery(query);
      setResponses((prev) => [...prev, res]);
      setIsProcessing(false);
    }, 350);
  };

  return (
    <aside
      className={`fixed top-16 right-0 bottom-0 z-30 bg-surface border-l border-border transition-all duration-300 flex flex-col shadow-2xl ${
        isOpen ? "w-96 sm:w-[480px]" : "w-12"
      }`}
    >
      {/* Panel Header */}
      <div className="p-3 border-b border-border flex items-center justify-between bg-bg/70 backdrop-blur-md">
        {isOpen ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-btn bg-primary/10 text-primary flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-text-primary flex items-center gap-1.5">
                NeuraGrid Copilot <Sparkles className="w-3.5 h-3.5 text-amber-warning fill-amber-warning" />
              </h3>
              <span className="text-[10px] text-text-tertiary font-mono">Operations Copilot Engine v4.2</span>
            </div>
          </div>
        ) : (
          <div className="mx-auto py-2 text-primary">
            <Bot className="w-5 h-5" />
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 rounded-chip text-text-secondary hover:text-text-primary hover:bg-border/60 transition-colors"
          title={isOpen ? "Collapse panel" : "Expand AI assistant"}
        >
          {isOpen ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {isOpen && (
        <>
          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">
            {responses.map((res) => (
              <div key={res.id} className="space-y-2">
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-card p-2.5 bg-primary text-white text-xs font-medium shadow-sm">
                    {res.userQuery}
                  </div>
                </div>
                <CopilotResponseCard response={res} />
              </div>
            ))}

            {isProcessing && (
              <div className="p-4 bg-bg border border-border rounded-card text-center text-xs text-text-secondary animate-pulse">
                Analyzing smart city telemetry & routing modules...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompt Chips */}
          <div className="px-3 py-2 border-t border-border bg-bg/40">
            <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider block mb-1.5">
              Suggested Operations Directives
            </span>
            <div className="flex flex-wrap gap-1.5">
              {suggestedChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip)}
                  disabled={isProcessing}
                  className="px-2.5 py-1 bg-surface border border-border hover:border-primary/40 text-[11px] text-text-secondary hover:text-primary rounded-chip transition-colors text-left font-medium"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="p-3 border-t border-border bg-surface">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Copilot: e.g. 'Find water leakage locations'..."
                disabled={isProcessing}
                className="flex-1 px-3 py-2 text-xs bg-bg border border-border rounded-btn focus:outline-none focus:border-primary text-text-primary placeholder:text-text-tertiary font-medium"
              />
              <button
                type="submit"
                disabled={isProcessing || !input.trim()}
                className="p-2 bg-primary text-white rounded-btn hover:bg-primary-hover disabled:opacity-50 transition-colors shrink-0 shadow-sm"
              >
                {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
          </div>
        </>
      )}
    </aside>
  );
}
