import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Play, CheckCircle2, ArrowRight, Zap, Sun, Droplets, Car, Plus, Trash2 } from 'lucide-react';
import { soundFX } from '../../utils/soundFX';

export const WorkflowBuilder: React.FC = () => {
  const [selectedNodes, setSelectedNodes] = useState<string[]>(['smart-grid', 'solar-optimization', 'ev-charging']);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  const availableNodes = [
    { id: 'smart-grid', name: 'Smart Grid AI', color: '#2563EB', icon: Zap },
    { id: 'solar-optimization', name: 'Solar Optimization', color: '#F59E0B', icon: Sun },
    { id: 'water-management', name: 'Water Management', color: '#0284C7', icon: Droplets },
    { id: 'ev-charging', name: 'EV Charging Network', color: '#8B5CF6', icon: Car }
  ];

  const toggleNode = (id: string) => {
    soundFX.playClick();
    if (selectedNodes.includes(id)) {
      setSelectedNodes(selectedNodes.filter(n => n !== id));
    } else {
      setSelectedNodes([...selectedNodes, id]);
    }
  };

  const handleRunWorkflow = () => {
    soundFX.playCrisis();
    setIsRunning(true);
    setLogs(['[00:00] Initializing Custom Agent Mesh...']);

    setTimeout(() => {
      setLogs(prev => [...prev, '[00:01] Smart Grid AI calculated 4.2 GW phase balance']);
    }, 600);

    setTimeout(() => {
      setLogs(prev => [...prev, '[00:02] Solar Optimization AI shifted tilt angles +4.2°']);
    }, 1200);

    setTimeout(() => {
      setLogs(prev => [...prev, '[00:03] Workflow execution complete: 100% Consensus Score']);
      setIsRunning(false);
    }, 1800);
  };

  return (
    <section id="playground" className="w-full py-32 px-6 md:px-12 bg-[#FAFAFA] select-none border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="linear-badge mb-4">
            <Bot className="w-4 h-4 text-blue-600 animate-pulse" />
            <span>Interactive Agent Swarm Canvas</span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.02] mb-6">
            Developer Drag & Drop Playground
          </h2>
          <p className="text-lg text-slate-600 font-normal leading-relaxed">
            Assemble custom autonomous agent swarms by connecting decision nodes. Test workflow pipelines against live municipal simulation events.
          </p>
        </div>

        {/* Builder Container */}
        <div className="apple-card p-8 bg-white rounded-3xl border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Available Nodes Palette */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Select Agent Nodes (Click to Toggle)
            </div>

            <div className="space-y-2.5">
              {availableNodes.map(node => {
                const Icon = node.icon;
                const isSelected = selectedNodes.includes(node.id);
                return (
                  <button
                    key={node.id}
                    onClick={() => toggleNode(node.id)}
                    className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected ? 'border-blue-500 bg-blue-50/40 text-slate-900 shadow-sm' : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center">
                        <Icon className="w-4 h-4" style={{ color: node.color }} />
                      </div>
                      <span className="text-sm font-bold">{node.name}</span>
                    </div>

                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      {isSelected ? 'Active' : '+ Add'}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleRunWorkflow}
              disabled={isRunning || selectedNodes.length === 0}
              className={`w-full py-4 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isRunning ? 'bg-slate-400 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isRunning ? 'Running Simulation...' : 'Execute Custom Workflow'}</span>
            </button>
          </div>

          {/* Active Canvas Display */}
          <div className="lg:col-span-8 bg-slate-950 p-6 rounded-2xl border border-slate-800 text-white flex flex-col justify-between min-h-[360px]">
            <div>
              <div className="text-xs font-mono text-slate-400 mb-4 pb-2 border-b border-slate-800 flex items-center justify-between">
                <span>WORKFLOW CANVAS ({selectedNodes.length} NODES CONNECTED)</span>
                <span className="text-emerald-400">● Live Pipeline</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 my-6">
                {selectedNodes.map((id, index) => {
                  const item = availableNodes.find(n => n.id === id);
                  if (!item) return null;
                  return (
                    <React.Fragment key={id}>
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="bg-slate-900 border border-slate-800 p-3 px-4 rounded-2xl flex items-center gap-2"
                      >
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-xs font-bold">{item.name}</span>
                      </motion.div>
                      {index < selectedNodes.length - 1 && (
                        <ArrowRight className="w-4 h-4 text-slate-600" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Live Terminal Log Output */}
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5 min-h-[110px]">
              <div className="text-[10px] text-slate-500 uppercase mb-1">Execution Stream</div>
              {logs.length === 0 ? (
                <div className="text-slate-600 italic">Click "Execute Custom Workflow" to run simulation...</div>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className="text-emerald-400">{log}</div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
