import React, { useState } from 'react';
import { Bot, Send, Sparkles, User, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AIInsightsView({ insightsFeed }) {
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: 'Hello! I am your AI Energy Assistant. I continuously monitor grid telemetry, load curves, and device health to optimize energy usage and reduce cost.'
    },
    {
      sender: 'assistant',
      text: 'Key insight for today: HVAC Chiller #2 efficiency has dropped by 8.2%. Shifting 120kW load to solar storage at 16:30 PM will save $140 today in peak demand charges.'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');

  const promptChips = [
    "Why did energy usage increase after 2 PM?",
    "Which department consumes the highest energy?",
    "When is peak demand expected today?",
    "How can we improve Building B efficiency?",
    "Switch non-critical loads to solar."
  ];

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    // Generate intelligent AI response based on energy domain knowledge
    setTimeout(() => {
      let aiResponseText = "Analyzing grid telemetry and load curves... ";
      if (query.includes("2 PM") || query.includes("increase")) {
        aiResponseText += "Energy usage increased 12% after 2:00 PM due to a coincidental ramp of Building B CNC Milling machines while solar panel output decreased 15% from cloud cover.";
      } else if (query.includes("highest") || query.includes("department")) {
        aiResponseText += "HVAC & Climate Control is currently the highest consuming sector, drawing 38.4% (1,850 kWh today) of total facility power.";
      } else if (query.includes("peak demand") || query.includes("expected")) {
        aiResponseText += "Peak demand is predicted at 5:00 PM reaching 512 kW. I recommend discharging 120 kW from BESS Battery Megapack to cap grid draw below 400 kW.";
      } else if (query.includes("Building B") || query.includes("82%")) {
        aiResponseText += "Building B is operating at 82% efficiency rating because Chiller #2 variable frequency drive is drawing 14% higher current than baseline. Servicing motor bearing will recover grade A status.";
      } else if (query.includes("solar") || query.includes("non-critical")) {
        aiResponseText += "Initiating automated rule: Rerouting 45 kW of warehouse auxiliary ventilation to solar DC bus string 1. Grid draw reduced by 45 kW.";
      } else {
        aiResponseText += `Here is the telemetry analysis for "${query}": Facilities are operating at 91/100 efficiency score with 38.5% renewable contribution.`;
      }

      setMessages((prev) => [...prev, { sender: 'assistant', text: aiResponseText }]);
    }, 600);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 className="section-title">Section 10 — AI Insights & Conversational Assistant</h2>
          <p className="section-desc">Explainable AI models, natural language energy diagnostics, and automated recommendation engines</p>
        </div>
      </div>

      <div className="grid-2-1">
        {/* Chat Window */}
        <div className="chat-window">
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bot size={20} color="#7c3aed" />
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Energy AI Copilot</h3>
              <p style={{ fontSize: '11px', color: '#64748b' }}>Online • LLM + Physics-Informed Grid Model</p>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-bubble ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Quick Prompt Chips */}
          <div style={{ padding: '8px 16px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '6px', overflowX: 'auto' }}>
            {promptChips.map((chip, idx) => (
              <button 
                key={idx}
                onClick={() => handleSendMessage(chip)}
                style={{ fontSize: '11.5px', padding: '4px 10px', borderRadius: '16px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#2563eb', whiteSpace: 'nowrap', cursor: 'pointer' }}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '10px', background: '#ffffff' }}>
            <input 
              type="text"
              className="form-input"
              placeholder="Ask AI about energy consumption, peak demand, equipment health..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              style={{ flex: 1 }}
            />
            <button className="btn btn-primary" onClick={() => handleSendMessage()}>
              <Send size={16} /> Send
            </button>
          </div>
        </div>

        {/* Explainable AI Feed */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Sparkles size={20} color="#7c3aed" />
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Live AI Diagnostic Stream</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {insightsFeed.map((insight) => (
              <div key={insight.id} style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span className="badge badge-blue">{insight.type}</span>
                  <span style={{ fontSize: '10px', color: '#64748b' }}>{insight.timestamp}</span>
                </div>
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '2px' }}>"{insight.headline}"</h4>
                <p style={{ fontSize: '12px', color: '#334155' }}>{insight.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
