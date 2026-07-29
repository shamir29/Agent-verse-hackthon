import React from 'react';
import { ShieldCheck, Lock, Server, Cpu, CheckCircle2, FileText, Key, Network } from 'lucide-react';

export const EnterpriseSecurity: React.FC = () => {
  const securityFeatures = [
    {
      title: 'SOC2 Type II & ISO 27001 Certified',
      description: 'Formally audited municipal cybersecurity architecture with annual third-party verification.',
      icon: ShieldCheck
    },
    {
      title: 'End-to-End Encrypted Mesh (mTLS 1.3)',
      description: 'Zero-trust communication between all edge SCADA nodes, smart meters, and central AI agents.',
      icon: Lock
    },
    {
      title: 'Edge High Availability (99.999% SLA)',
      description: 'Kubernetes edge clusters deployed at municipal substations for local offline fallback operation.',
      icon: Server
    },
    {
      title: 'Deterministic Safety Proofs',
      description: 'Formal mathematical verification ensuring AI decision vectors never breach safety bounds.',
      icon: CheckCircle2
    },
    {
      title: 'Multi-Tenant RBAC Permissions',
      description: 'Granular role-based access control for city mayors, grid operators, and emergency responders.',
      icon: Key
    },
    {
      title: 'Immutable Audit Trail',
      description: 'Cryptographically signed log stream recording every AI optimization action.',
      icon: FileText
    }
  ];

  return (
    <section className="w-full py-32 px-6 md:px-12 bg-white select-none border-t border-slate-100">
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="linear-badge bg-emerald-50 text-emerald-700 border-emerald-200 mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span>Mission-Critical Security Framework</span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.02] mb-6">
            Enterprise Grade Trust & Compliance
          </h2>
          <p className="text-lg text-slate-600 font-normal leading-relaxed">
            Engineered for high-consequence municipal operations. NeuraGrid enforces deterministic safety bounds, zero-trust encryption, and multi-region high availability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {securityFeatures.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div key={i} className="apple-card p-8 bg-white border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600 mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified Infrastructure</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
