import React, { useState } from 'react';
import { Building2, Activity, Users, BedDouble, Stethoscope, AlertTriangle, ChevronRight, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

const hospitalRooms = [
  {
    id: 'er',
    name: "Emergency Triage Wing",
    glow: "border-rose-400 bg-rose-50/70 text-rose-900",
    status: "Active Triage",
    occupancy: "82% Bed Capacity",
    doctors: "8 On-Duty Trauma Physicians",
    details: "AI autonomous triage priority sorting patients by acute hemodynamic stability. Average wait time reduced to 3.2 minutes.",
    routing: "Autonomous Ambulance Route #4 Inbound (ETA 2 mins)"
  },
  {
    id: 'icu',
    name: "Intensive Care Unit (ICU)",
    glow: "border-amber-400 bg-amber-50/70 text-amber-900",
    status: "High Monitoring",
    occupancy: "75% Bed Capacity",
    doctors: "6 Intensivists & 14 Critical Care Nurses",
    details: "Continuous multi-modal vital monitoring. AI predictive alarm suppression eliminates 94% of false sensory alarms.",
    routing: "Ventilator Telemetry Synced"
  },
  {
    id: 'radiology',
    name: "Radiology & AI Imaging",
    glow: "border-sky-400 bg-sky-50/70 text-sky-900",
    status: "3D CT / MRI Active",
    occupancy: "90% Scanner Velocity",
    doctors: "4 Radiologists + AI Scan Assistant",
    details: "Real-time AI volumetric organ segmentation. Automatic anomaly highlighting for brain MRI and chest CT scans in < 15 seconds.",
    routing: "Scan Priority 1 Active"
  },
  {
    id: 'ot',
    name: "Autonomous Surgical Suite",
    glow: "border-emerald-400 bg-emerald-50/70 text-emerald-900",
    status: "Robotic Surgery In-Progress",
    occupancy: "3 of 4 Suites Active",
    doctors: "3 Chief Robotic Surgeons",
    details: "DaVinci XI robotic arm tele-assistance. Real-time tremor cancellation and intra-operative fluorescent vascular navigation.",
    routing: "Sterile Corridor Clear"
  },
  {
    id: 'ward',
    name: "Inpatient Recovery Ward",
    glow: "border-teal-400 bg-teal-50/70 text-teal-900",
    status: "Calm Recovery",
    occupancy: "64% Bed Capacity",
    doctors: "12 Attending Physicians",
    details: "Circadian lighting optimization. Automated non-invasive vitals check via smart mattresses and ceiling radar sensors.",
    routing: "Discharge Forecast 14 Patients"
  },
  {
    id: 'ambulance',
    name: "Ambulance Fleet & Drone Bay",
    glow: "border-indigo-400 bg-indigo-50/70 text-indigo-900",
    status: "Ready Dispatch",
    occupancy: "8 Vehicles On Standby",
    doctors: "16 Flight Paramedics",
    details: "Autonomous traffic light preemption for responding emergency vehicles. Drone blood delivery ready for rapid transport.",
    routing: "GPS Traffic Clearance Active"
  }
];

export default function HospitalCommand() {
  const [selectedRoomId, setSelectedRoomId] = useState('ot');
  const room = hospitalRooms.find(r => r.id === selectedRoomId) || hospitalRooms[0];

  return (
    <section id="hospital" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold mb-4">
            <Building2 className="w-3.5 h-3.5 text-sky-600" />
            <span>Section 10 • Hospital Architectural Floor Flow</span>
          </div>
          <h2 className="font-['Outfit'] font-bold text-3xl sm:text-5xl text-slate-950 tracking-tight mb-4">
            A hospital that breathes in harmony with AI.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Experience an interactive architectural floorplan visualizing room statuses, patient movement paths, bed occupancies, and emergency routing without dashboard clutter.
          </p>
        </div>

        {/* Floorplan Layout Grid & Room Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Architectural Floor Plan Grid (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-[#FAF9F6] border border-sky-100/90 rounded-3xl p-6 shadow-organic">
            
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/60">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-600" /> Interactive Floor Map • Mayo Medical Campus Level 3
              </div>
              <div className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Live Spatial Flow
              </div>
            </div>

            {/* Simulated Architectural Rooms Floor Plan */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {hospitalRooms.map((r) => {
                const isSelected = selectedRoomId === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRoomId(r.id)}
                    className={`p-5 rounded-2xl border transition-all text-left relative overflow-hidden group ${
                      isSelected
                        ? `${r.glow} shadow-md ring-2 ring-sky-500/30 scale-102`
                        : 'bg-white border-slate-200/70 hover:border-sky-300 text-slate-800'
                    }`}
                  >
                    {/* Glowing pulse dot */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/80 border border-slate-200/60">
                        {r.id.toUpperCase()}
                      </span>
                      <span className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-sky-600 animate-ping' : 'bg-emerald-500'}`} />
                    </div>

                    <h4 className="font-['Outfit'] font-bold text-sm text-slate-900 mb-1 leading-snug">{r.name}</h4>
                    <div className="text-[11px] font-medium text-slate-500">{r.occupancy}</div>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Room Inspector Panel (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-[#FAF9F6] border border-sky-100/90 rounded-3xl p-8 shadow-organic">
            
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 mb-4">
              Room Telemetry Details
            </div>

            <h3 className="font-['Outfit'] font-bold text-2xl text-slate-900 mb-2">{room.name}</h3>
            
            <div className="space-y-4 my-6">
              
              <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BedDouble className="w-5 h-5 text-sky-600" />
                  <span className="text-xs font-semibold text-slate-700">Bed Occupancy</span>
                </div>
                <span className="text-xs font-bold text-slate-900">{room.occupancy}</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Stethoscope className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs font-semibold text-slate-700">Staff On Duty</span>
                </div>
                <span className="text-xs font-bold text-slate-900">{room.doctors}</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-xs">
                <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">AI Operational Overview</div>
                <p className="text-xs text-slate-700 leading-relaxed">{room.details}</p>
              </div>

              <div className="bg-sky-50 border border-sky-100 p-4 rounded-2xl">
                <div className="text-[10px] uppercase font-bold text-sky-700 mb-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Emergency Routing Protocol
                </div>
                <div className="text-xs font-bold text-sky-950">{room.routing}</div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
