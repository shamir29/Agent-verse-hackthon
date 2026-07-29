import React from 'react';
import { AI_AGENTS, CROSS_AGENT_WORKFLOWS } from '../../data/crossAgentData';
import { Sparkles, ArrowRight, Radio, Activity, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';

export const CrossAgentCollaboration = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={24} style={{ color: 'var(--accent-blue)' }} /> Cross-Agent Autonomous Collaboration Hub
          </h2>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            Direct peer-to-peer AI agent communication channels enabling synchronized smart city optimization, energy routing, and failure prevention.
          </p>
        </div>

        <span className="badge badge-green" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
          ● 8/8 Agents Synchronized
        </span>
      </div>

      {/* 8 AI Agent Nodes Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '14px'
      }}>
        {AI_AGENTS.map((agent) => (
          <div key={agent.id} className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: agent.color }} />
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {agent.name}
                  </h4>
                </div>
                <span className="badge badge-green" style={{ fontSize: '0.65rem' }}>{agent.status}</span>
              </div>

              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '10px', lineHeight: 1.3 }}>
                {agent.role}
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--bg-app)', padding: '8px 10px', borderRadius: 'var(--radius-sm)', fontSize: '0.725rem' }}>
              <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '2px' }}>Last Action:</div>
              <div style={{ color: 'var(--text-secondary)' }}>"{agent.lastAction}"</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', color: 'var(--text-muted)' }}>
                <span>Latency: {agent.latency}</span>
                <span>{agent.messagesSentSec} msg/sec</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Inter-Agent Message Workflow Stream */}
      <div className="card" style={{ padding: '20px' }}>
        <h3 className="card-title" style={{ marginBottom: '16px' }}>
          <Activity size={18} style={{ color: 'var(--accent-blue)' }} /> Real-Time Cross-Agent Telemetry & Command Workflows
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {CROSS_AGENT_WORKFLOWS.map((wf) => (
            <div 
              key={wf.id}
              style={{
                padding: '14px 16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-app)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '280px' }}>
                <span style={{ fontSize: '0.825rem', fontWeight: 700, color: '#0369a1' }}>{wf.from}</span>
                <ArrowRight size={16} style={{ color: 'var(--accent-blue)', flexShrink: 0 }} />
                <span style={{ fontSize: '0.825rem', fontWeight: 700, color: '#047857' }}>{wf.to}</span>
              </div>

              <div style={{ flex: 1, fontSize: '0.775rem', color: 'var(--text-main)', fontWeight: 500 }}>
                <span style={{ color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: '0.7rem' }}>[{wf.topic}]</span>: "{wf.message}"
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge badge-blue" style={{ fontSize: '0.65rem' }}>{wf.protocol}</span>
                <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{wf.latency}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
