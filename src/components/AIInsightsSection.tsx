import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  CheckCircle2,
} from 'lucide-react';
import { useSolar } from '../context/SolarContext';

export const AIInsightsSection: React.FC = () => {
  const { aiInsights, askAiAssistant } = useSolar();
  const [promptInput, setPromptInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    askAiAssistant(promptInput);
    setPromptInput('');
  };

  const sampleQuestions = [
    'Why did Panel B2-1 efficiency drop?',
    'When should we charge the battery today?',
    'How much financial savings did we achieve today?',
    'Schedule cleaning for Array C',
  ];

  return (
    <section style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={22} color="var(--green-600)" />
            Section 9 — AI Co-Pilot & Conversational Optimization Insights
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Explainable AI assistant continuously analyzing plant performance and answering natural language queries
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.25rem' }}>
        {/* Left: AI Insight Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {aiInsights.map((insight) => (
            <div
              key={insight.id}
              className="card-solid"
              style={{
                padding: '1rem 1.25rem',
                borderLeft: '4px solid var(--green-500)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span className="badge-green">
                  <Sparkles size={12} />
                  {insight.category}
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  Confidence: {insight.confidenceScorePct}% | {insight.timestamp}
                </span>
              </div>

              <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', margin: 0, fontWeight: 500, lineHeight: 1.4 }}>
                "{insight.content}"
              </p>

              {insight.actionRequired && (
                <div style={{ marginTop: '0.6rem', fontSize: '0.75rem', color: 'var(--green-700)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <CheckCircle2 size={14} color="var(--green-600)" />
                  Action Suggested: {insight.actionRequired}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right: Interactive AI Assistant Chat Box */}
        <div className="card-solid" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Bot size={18} color="var(--green-600)" />
              Ask Solar AI Assistant
            </div>

            {/* Quick Prompt Chips */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                Suggested Prompts:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {sampleQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => askAiAssistant(q)}
                    style={{
                      textAlign: 'left',
                      fontSize: '0.75rem',
                      padding: '0.4rem 0.6rem',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-subtle)',
                      border: '1px solid var(--border-light)',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s ease',
                    }}
                  >
                    "{q}"
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form Input */}
          <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <input
              type="text"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="Ask AI about panels, battery, yield..."
              style={{
                flex: 1,
                padding: '0.5rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-app)',
                fontSize: '0.8rem',
                outline: 'none',
              }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '0.5rem 0.85rem' }}>
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
