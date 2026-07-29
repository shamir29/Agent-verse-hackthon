import React, { useState, useEffect, useRef } from 'react';
import { Dna, ShieldCheck, AlertCircle, Pill, Sparkles, Heart, Activity, CheckCircle2, ChevronRight } from 'lucide-react';

const genomicData = [
  {
    category: "Inherited Risks",
    title: "Cardiovascular & Lipid Metabolic Variants",
    icon: Heart,
    color: "bg-rose-50 text-rose-600 border-rose-200",
    gene: "APOE e3/e3 Baseline",
    details: "Zero APOE-e4 high-risk Alzheimer's or hypercholesterolemia allele detected. Low baseline familial plaque propensity.",
    riskScore: "Low (0.4x Population Avg)"
  },
  {
    category: "Pharmacogenomics",
    title: "Drug Compatibility & CYP450 Metabolism",
    icon: Pill,
    color: "bg-sky-50 text-sky-600 border-sky-200",
    gene: "CYP2C19 *1/*1 Rapid Metabolizer",
    details: "Optimal liver enzyme activity for beta-blockers, statins, and anti-platelet therapy. Zero adverse drug reaction markers.",
    riskScore: "100% Compatible"
  },
  {
    category: "Nutrigenomics",
    title: "Methylation & Folate Metabolism",
    icon: Sparkles,
    color: "bg-emerald-50 text-emerald-600 border-emerald-200",
    gene: "MTHFR C677T Heterozygous",
    details: "Mildly reduced folate conversion efficiency (-30%). Active L-Methylfolate (5-MTHF) recommended over synthetic folic acid.",
    riskScore: "Actionable Protocol"
  },
  {
    category: "Oncology Screening",
    title: "Hereditary Cancer Susceptibility",
    icon: ShieldCheck,
    color: "bg-purple-50 text-purple-600 border-purple-200",
    gene: "BRCA1 / BRCA2 Negative",
    details: "Full exon genomic sequencing confirms zero pathogenic mutations in tumor suppressor genes.",
    riskScore: "Negative (Protective)"
  }
];

export default function GenomicAI() {
  const canvasRef = useRef(null);
  const [activeGenome, setActiveGenome] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;
    let width = canvas.width = 340;
    let height = canvas.height = 420;
    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const nodes = 22;
      const spanHeight = 340;

      for (let i = 0; i < nodes; i++) {
        const progress = i / nodes;
        const y = centerY - spanHeight / 2 + progress * spanHeight;
        const angle = progress * Math.PI * 3.5 + time;

        const x1 = centerX + Math.cos(angle) * 75;
        const x2 = centerX - Math.cos(angle) * 75;

        const z1 = Math.sin(angle);
        const z2 = -Math.sin(angle);

        // Base pair connecting line
        ctx.beginPath();
        ctx.strokeStyle = `rgba(2, 132, 199, ${0.15 + (z1 + 1) * 0.1})`;
        ctx.lineWidth = 2;
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();

        // Base pair Node A
        ctx.beginPath();
        ctx.arc(x1, y, 4 + (z1 + 1) * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = z1 > 0 ? '#0284C7' : '#93C5FD';
        ctx.fill();

        // Base pair Node B
        ctx.beginPath();
        ctx.arc(x2, y, 4 + (z2 + 1) * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = z2 > 0 ? '#10B981' : '#6EE7B7';
        ctx.fill();
      }

      frameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section id="genomic" className="py-24 bg-[#FAF9F6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold mb-4">
            <Dna className="w-3.5 h-3.5 text-sky-600" />
            <span>Section 07 • Genomic AI & DNA Sequencing</span>
          </div>
          <h2 className="font-['Outfit'] font-bold text-3xl sm:text-5xl text-slate-950 tracking-tight mb-4">
            Decoded genetics for lifelong precision.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Whole-genome 30x sequencing analyzed continuously by AI to map inherited disease risks, pharmacogenomic drug compatibility, and longevity predispositions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: DNA Double Helix Canvas Visualization */}
          <div className="lg:col-span-5 bg-white border border-sky-100/90 rounded-3xl p-8 shadow-organic flex flex-col items-center justify-center relative min-h-[460px]">
            <div className="absolute top-4 left-4 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-500" /> 30x Whole Genome Sequencing
            </div>
            
            <canvas ref={canvasRef} className="my-4" />

            <div className="text-center">
              <div className="text-xs font-bold text-slate-900 mb-1">3.2 Billion Base Pairs Analyzed</div>
              <p className="text-[11px] text-slate-500">Autonomous genomic alignment against ClinVar & PharmGKB databases.</p>
            </div>
          </div>

          {/* Right Column: Genomic Insight Cards */}
          <div className="lg:col-span-7 space-y-4">
            {genomicData.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = activeGenome === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveGenome(idx)}
                  className={`p-6 rounded-3xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-sky-300 shadow-organic ring-2 ring-sky-400/20'
                      : 'bg-white/70 border-slate-200/60 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${item.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{item.category}</span>
                        <h4 className="font-['Outfit'] font-bold text-lg text-slate-900">{item.title}</h4>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/60">
                      {item.riskScore}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-sky-700 mb-1 mt-3">
                    Detected Variant: {item.gene}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.details}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
