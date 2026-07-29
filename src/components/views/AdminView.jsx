import React, { useState } from 'react';
import { Shield, Users, UserCheck, Calendar, FileText, Activity, CheckCircle2, Search, Plus, Sparkles } from 'lucide-react';

export default function AdminView() {
  const [activeTab, setActiveTab] = useState('patients'); // 'patients' | 'doctors' | 'reports'

  const patientsList = [
    { id: '#NH-94820', name: "Johnathan Smith", age: 34, status: "Active", bp: "118/78", doctor: "Dr. Elena Rostova" },
    { id: '#NH-84102', name: "Sarah Williams", age: 48, status: "Active", bp: "132/84", doctor: "Dr. Marcus Vance" },
    { id: '#NH-72910', name: "Michael Chen", age: 62, status: "Monitoring", bp: "140/90", doctor: "Dr. Sarah Jenkins" },
  ];

  const doctorsList = [
    { name: "Dr. Elena Rostova, MD", spec: "Cardiology", patients: 142, rating: "4.9 / 5.0", status: "On Duty" },
    { name: "Dr. Marcus Vance, MD", spec: "Dermatology", patients: 98, rating: "4.8 / 5.0", status: "On Duty" },
    { name: "Dr. Sarah Jenkins, MD", spec: "General Medicine", patients: 210, rating: "4.95 / 5.0", status: "On Duty" },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>NeuraGrid Operational Admin Portal</span>
          </div>
          <h1 className="font-['Inter'] font-bold text-3xl text-slate-900">Hospital Operations & User Management</h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage patient records, clinical staff rosters, appointment schedules, and system analytics.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveTab('patients')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'patients' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
            }`}
          >
            Patients (48,290)
          </button>
          <button
            onClick={() => setActiveTab('doctors')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'doctors' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
            }`}
          >
            Doctors (1,420)
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-2xs space-y-6">
        
        {activeTab === 'patients' ? (
          <div>
            <h3 className="font-['Inter'] font-bold text-xl text-slate-900 mb-4">Registered Patient Directory</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase font-bold text-[10px] bg-slate-50">
                    <th className="py-3 px-4">Patient ID</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Age</th>
                    <th className="py-3 px-4">Vitals Summary</th>
                    <th className="py-3 px-4">Primary Doctor</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {patientsList.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-4 px-4 font-mono font-bold text-blue-600">{p.id}</td>
                      <td className="py-4 px-4 font-bold text-slate-900">{p.name}</td>
                      <td className="py-4 px-4 text-slate-600">{p.age} Yrs</td>
                      <td className="py-4 px-4 text-slate-600">BP: {p.bp} mmHg</td>
                      <td className="py-4 px-4 text-slate-600">{p.doctor}</td>
                      <td className="py-4 px-4">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="font-['Inter'] font-bold text-xl text-slate-900 mb-4">Attending Physician Directory</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase font-bold text-[10px] bg-slate-50">
                    <th className="py-3 px-4">Doctor Name</th>
                    <th className="py-3 px-4">Specialty</th>
                    <th className="py-3 px-4">Active Patients</th>
                    <th className="py-3 px-4">Rating</th>
                    <th className="py-3 px-4">Shift Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {doctorsList.map((d, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-4 px-4 font-bold text-slate-900">{d.name}</td>
                      <td className="py-4 px-4 font-semibold text-blue-600">{d.spec}</td>
                      <td className="py-4 px-4 text-slate-600">{d.patients} Active</td>
                      <td className="py-4 px-4 font-bold text-slate-900">{d.rating}</td>
                      <td className="py-4 px-4">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {d.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
