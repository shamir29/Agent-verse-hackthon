import React, { useState } from 'react';
import { Code, Terminal, Cpu, Check, Copy, ArrowRight, Zap, Globe } from 'lucide-react';
import { soundFX } from '../../utils/soundFX';

export const DeveloperEcosystem: React.FC = () => {
  const [activeLang, setActiveLang] = useState<'ts' | 'python' | 'curl'>('ts');
  const [copied, setCopied] = useState(false);

  const codeSnippets = {
    ts: `import { NeuraGridClient } from '@neuragrid/sdk';

const client = new NeuraGridClient({
  apiKey: process.env.NEURAGRID_API_KEY,
  region: 'us-east-1',
});

// Stream real-time urban state consensus vectors
const stream = await client.consensus.streamStateVectors({
  districtId: 'district-4',
  agents: ['smart-grid', 'solar-optimization', 'water-management'],
});

stream.on('decision', (event) => {
  console.log(\`[Consensus \${event.confidence}%] \${event.aiResponseAction}\`);
});`,
    python: `from neuragrid import NeuraGridSDK

client = NeuraGridSDK(api_key="ng_live_9481a8c9e02")

# Inject real-time heatwave simulation vector
response = client.simulation.inject_crisis(
    scenario="heatwave",
    severity="CRITICAL",
    temperature_celsius=48.0
)

print(f"Mitigation Response: {response.ai_mitigation_action}")
print(f"Grid Stability: {response.metrics.grid_load}")`,
    curl: `curl -X POST https://api.neuragrid.ai/v4/consensus/stream \\
  -H "Authorization: Bearer ng_live_9481a8c9e02" \\
  -H "Content-Type: application/json" \\
  -d '{
    "district": "district-4",
    "agents": ["smart-grid", "ev-charging"],
    "zero_blackout_guarantee": true
  }'`
  };

  const handleCopy = () => {
    soundFX.playClick();
    navigator.clipboard.writeText(codeSnippets[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full py-32 px-6 md:px-12 bg-[#FAFAFA] select-none border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="linear-badge mb-4">
            <Code className="w-4 h-4 text-blue-600 animate-pulse" />
            <span>Developer-First Platform API</span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.02] mb-6">
            Developer & API Ecosystem
          </h2>
          <p className="text-lg text-slate-600 font-normal leading-relaxed">
            Integrate NeuraGrid AI into your municipal IoT backend, edge SCADA controllers, or custom agent frameworks using REST, WebSockets, or gRPC streaming SDKs.
          </p>
        </div>

        {/* Code Preview Box */}
        <div className="max-w-4xl mx-auto apple-card bg-slate-950 text-white rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
          
          <div className="p-4 px-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono text-slate-400 ml-2">NeuraGrid SDK Integration</span>
            </div>

            <div className="flex items-center gap-2">
              {(['ts', 'python', 'curl'] as const).map(lang => (
                <button
                  key={lang}
                  onClick={() => {
                    soundFX.playClick();
                    setActiveLang(lang);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    activeLang === lang ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang === 'ts' ? 'TypeScript' : lang === 'python' ? 'Python' : 'cURL'}
                </button>
              ))}

              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors ml-2 cursor-pointer"
                title="Copy Code"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="p-6 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
            <pre>
              <code>{codeSnippets[activeLang]}</code>
            </pre>
          </div>
        </div>

      </div>
    </section>
  );
};
