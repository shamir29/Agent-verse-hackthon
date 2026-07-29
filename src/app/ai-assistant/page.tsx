"use client";

import React, { useState, useRef, useEffect } from "react";
import { generateAssistantReply } from "@/lib/assistantReply";
import { FormattedText } from "@/components/assistant/FormattedText";
import { Bot, Send, Sparkles, RefreshCw, User, Cpu } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
}

export default function DedicatedAIAssistantPage() {
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg_welcome",
      sender: "assistant",
      text: generateAssistantReply("welcome"),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedChips = [
    "Provide daily city operations briefing",
    "Find water leakage locations",
    "What's the status of Adyar substation?",
    "Which reservoirs are below 50%?",
    "Check hazardous AQI spike in Manali",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isStreaming) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsStreaming(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      const data = await res.json();
      const replyText = data.text || generateAssistantReply(query);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `asst_${Date.now()}`,
            sender: "assistant",
            text: replyText,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
        setIsStreaming(false);
      }, 300);
    } catch (err) {
      const fallbackText = generateAssistantReply(query);
      setMessages((prev) => [
        ...prev,
        {
          id: `asst_${Date.now()}`,
          sender: "assistant",
          text: fallbackText,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setIsStreaming(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] max-w-4xl mx-auto space-y-3">
      {/* Clean Chat Console Header */}
      <div className="flex items-center justify-between p-4 bg-surface border border-border rounded-card shadow-xs shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-card bg-primary text-white flex items-center justify-center shadow-md shadow-primary/20">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-text-primary flex items-center gap-2">
              NeuraGrid AI Operations Copilot <Sparkles className="w-4 h-4 text-amber-warning fill-amber-warning" />
            </h1>
            <p className="text-xs text-text-secondary">
              Live Operations Assistant • Power, Water, Environmental AQI, EV Mobility, Healthcare & Digital Twin
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-bg border border-border px-3 py-1.5 rounded-chip">
          <span className="w-2 h-2 rounded-full bg-emerald-good animate-pulse" />
          <span className="text-text-primary font-bold">Online</span>
        </div>
      </div>

      {/* Scrollable Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-surface border border-border rounded-card shadow-xs space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[82%] rounded-card p-4 leading-relaxed ${
                msg.sender === "user"
                  ? "bg-primary text-white font-medium shadow-sm"
                  : "bg-bg text-text-primary border border-border shadow-2xs"
              }`}
            >
              {msg.sender === "user" ? (
                <p className="text-xs">{msg.text}</p>
              ) : (
                <FormattedText text={msg.text} />
              )}
              <div
                className={`text-[9px] mt-2 font-mono ${
                  msg.sender === "user" ? "text-white/70 text-right" : "text-text-tertiary"
                }`}
              >
                {msg.timestamp}
              </div>
            </div>

            {msg.sender === "user" && (
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isStreaming && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-bg border border-border rounded-card p-3 text-xs text-text-secondary animate-pulse">
              NeuraGrid Copilot is analyzing telemetry...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="px-3 py-2 bg-surface border border-border rounded-card shadow-2xs">
        <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider block mb-1.5">
          Suggested Operations Prompts
        </span>
        <div className="flex flex-wrap gap-1.5">
          {suggestedChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              disabled={isStreaming}
              className="px-3 py-1 bg-bg border border-border hover:border-primary/40 text-[11px] text-text-secondary hover:text-primary rounded-chip transition-colors text-left font-medium"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Chat Input Form */}
      <div className="p-3 bg-surface border border-border rounded-card shadow-xs shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message to AI Operations Copilot..."
            disabled={isStreaming}
            className="flex-1 px-4 py-3 text-xs bg-bg border border-border rounded-btn focus:outline-none focus:border-primary text-text-primary placeholder:text-text-tertiary font-medium shadow-2xs"
          />
          <button
            type="submit"
            disabled={isStreaming || !input.trim()}
            className="px-6 py-3 bg-primary text-white text-xs font-bold rounded-btn hover:bg-primary-hover disabled:opacity-50 transition-colors flex items-center gap-2 shadow-md shadow-primary/20 shrink-0"
          >
            {isStreaming ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" /> Send
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
