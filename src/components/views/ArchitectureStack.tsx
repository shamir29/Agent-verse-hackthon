import React, { useState } from 'react';
import { TECH_NODES } from '../../data/mockData';
import type { TechNode } from '../../types';
import { soundFX } from '../../utils/soundFX';
import { Layers, Cpu, Cloud, Bot, Box, BrainCircuit, Building2 } from 'lucide-react';

export const ArchitectureStack: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<TechNode | null>(TECH_NODES[2]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cloud': return <Cloud className="w-5 h-5 text-blue-600" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-emerald-600" />;
      case 'Bot': return <Bot className="w-5 h-5 text-purple-600" />;
      case 'Box': return <Box className="w-5 h-5 text-sky-600" />;
      case 'BrainCircuit': return <BrainCircuit className="w-5 h-5 text-amber-600" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-indigo-600" />;
      default: return <Layers className="w-5 h-5 text-blue-600" />;
    }
  };

  const handleNodeClick = (node: TechNode) => {
    soundFX.playClick();
    setSelectedNode(node);
  };

  return (
    <section id="architecture" className="w-full min-h-screen py-32 px-6 md:px-12 bg-white flex flex-col justify-center select-none border-t border-slate-100">
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="linear-badge mb-4">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Infrastructure Stack</span>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.02] mb-6">
            Floating System Architecture
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed">
            From raw hardware IoT sensors to high-level spatial digital twins—explore the 6 integrated layers powering NeuraGrid.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            {TECH_NODES.map((node, index) => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <React.Fragment key={node.id}>
                  <div
                    onClick={() => handleNodeClick(node)}
                    onMouseEnter={() => soundFX.playHover()}
                    className={`apple-card p-6 flex items-center justify-between transition-all duration-300 cursor-pointer ${
                      isSelected ? 'ring-2 ring-blue-500 bg-blue-50/30 scale-[1.02] shadow-xl' : 'hover:translate-x-2'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                        {getIcon(node.icon)}
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Layer 0{index + 1} — {node.layer}
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 tracking-tight">
                          {node.title}
                        </h4>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-slate-500 font-medium">Latency</div>
                      <div className="text-sm font-bold font-mono text-blue-600">{node.latency}</div>
                    </div>
                  </div>

                  {index < TECH_NODES.length - 1 && (
                    <div className="flex justify-center py-1">
                      <div className="w-0.5 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 animate-pulse relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-28">
            {selectedNode ? (
              <div className="apple-card p-8 bg-slate-900 text-white rounded-[24px] border border-slate-800 shadow-2xl">
                <div className="text-xs uppercase tracking-widest text-blue-400 font-bold mb-2">
                  Layer Deep Inspector
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{selectedNode.title}</h3>
                <p className="text-sm text-slate-400 mb-6">{selectedNode.subtitle}</p>

                <div className="space-y-4 mb-8">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                    <span className="text-xs text-slate-400">Processing Throughput</span>
                    <span className="text-base font-bold font-mono text-emerald-400">{selectedNode.throughput}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                    <span className="text-xs text-slate-400">Layer Latency Guarantee</span>
                    <span className="text-base font-bold font-mono text-blue-400">{selectedNode.latency}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {selectedNode.description}
                </p>
              </div>
            ) : null}
          </div>

        </div>

      </div>
    </section>
  );
};
