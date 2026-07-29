import React from 'react';
import { User, ShieldCheck, Mail, Phone, MapPin, FileText, Heart, Bell, CheckCircle2, Lock } from 'lucide-react';

export default function ProfileView() {
  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold mb-2">
            <User className="w-3.5 h-3.5" />
            <span>Patient Account & Insurance</span>
          </div>
          <h1 className="font-['Inter'] font-bold text-3xl text-slate-900">Patient Profile</h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage personal health records, insurance policy details, emergency contacts, and privacy preferences.
          </p>
        </div>
      </div>

      {/* Main Profile Info Card */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-2xs space-y-6">
        
        <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-slate-100">
          <div className="w-20 h-20 rounded-3xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-2xl shadow-md">
            JS
          </div>
          <div>
            <h2 className="font-['Inter'] font-bold text-2xl text-slate-900">Johnathan Smith</h2>
            <div className="text-xs font-semibold text-blue-600 mt-0.5">Patient ID: #NH-94820 • Age: 34 Yrs</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Primary Care Physician: Dr. Sarah Jenkins, MD</div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          
          <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-slate-400">Personal Demographics</h4>
            <div className="flex justify-between text-slate-700"><span>Email:</span><span className="font-bold text-slate-900">johnathan.smith@email.com</span></div>
            <div className="flex justify-between text-slate-700"><span>Phone:</span><span className="font-bold text-slate-900">+1 (555) 234-5678</span></div>
            <div className="flex justify-between text-slate-700"><span>Blood Group:</span><span className="font-bold text-slate-900">O Positive (O+)</span></div>
            <div className="flex justify-between text-slate-700"><span>Allergies:</span><span className="font-bold text-slate-900">Penicillin (Mild)</span></div>
          </div>

          <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-slate-400">Insurance & Coverage</h4>
            <div className="flex justify-between text-slate-700"><span>Provider:</span><span className="font-bold text-slate-900">Blue Cross Blue Shield</span></div>
            <div className="flex justify-between text-slate-700"><span>Policy No:</span><span className="font-bold text-slate-900">#BCBS-9820481</span></div>
            <div className="flex justify-between text-slate-700"><span>Group No:</span><span className="font-bold text-slate-900">#GRP-44102</span></div>
            <div className="flex justify-between text-slate-700"><span>Coverage Status:</span><span className="font-bold text-emerald-600">Active (Fully Covered)</span></div>
          </div>

        </div>

      </div>

    </div>
  );
}
