import React from 'react';
import { Heart, ShieldCheck, FileText, Code, Lock, Award, Mail } from 'lucide-react';


export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-900">
          
          {/* Brand Info (4 Cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-teal-400 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Heart className="w-4 h-4 text-sky-400 fill-sky-950" />
                </div>
              </div>
              <span className="font-['Outfit'] font-bold text-xl tracking-tight text-white">AURA HEALTH AI</span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Healthcare that thinks before illness begins. Autonomous predictive biometric monitoring, continuous genomic sequencing, and patient-first care.
            </p>

            {/* Compliance Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 border border-slate-800 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" /> HIPAA Compliant
              </span>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 border border-slate-800">
                ISO 27001
              </span>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 border border-slate-800">
                FDA Class II SaMD
              </span>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 border border-slate-800">
                GDPR Health
              </span>
            </div>
          </div>

          {/* Links Column 1: Ecosystem */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Ecosystem</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#digital-human" className="hover:text-sky-400 transition-colors">Digital Human</a></li>
              <li><a href="#timeline" className="hover:text-sky-400 transition-colors">AI Timeline</a></li>
              <li><a href="#digital-twin" className="hover:text-sky-400 transition-colors">Digital Twin</a></li>
              <li><a href="#diagnosis" className="hover:text-sky-400 transition-colors">Diagnostics Engine</a></li>
              <li><a href="#lab-reader" className="hover:text-sky-400 transition-colors">Lab PDF Scanner</a></li>
            </ul>
          </div>

          {/* Links Column 2: Developers & API */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Developers</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#" className="hover:text-sky-400 transition-colors flex items-center gap-1"><FileText className="w-3 h-3" /> Documentation</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors flex items-center gap-1"><Code className="w-3 h-3" /> REST & FHIR API</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors flex items-center gap-1"><Code className="w-3 h-3" /> GitHub Repository</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Clinical SDK</a></li>
            </ul>
          </div>

          {/* Links Column 3: Trust & Research */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Research & Integrity</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#" className="hover:text-sky-400 transition-colors flex items-center gap-1"><Lock className="w-3 h-3" /> Zero-Knowledge Privacy Protocol</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Mayo Clinic & Johns Hopkins Clinical Papers</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Medical Compliance Oversight</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors flex items-center gap-1"><Mail className="w-3 h-3" /> Contact Clinical Team</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © 2026 AURA Autonomous Healthcare Platform. Inspired by Mayo Clinic, WHO, and Apple Health.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Clinical Compliance</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
