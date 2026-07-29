import React, { useState } from 'react';
import { MapPin, Navigation, Phone, Clock, AlertTriangle, Building2, ShieldAlert, CheckCircle2, ChevronRight, X } from 'lucide-react';

const hospitalsList = [
  {
    id: 1,
    name: "Mayo Medical Center — Main Emergency Facility",
    type: "Level 1 Trauma Hospital",
    dist: "1.4 miles",
    waitTime: "4 mins wait",
    address: "750 Boylston St, Boston, MA 02116",
    phone: "+1 (800) 555-0199",
    status: "Open 24/7",
    color: "text-emerald-700 bg-emerald-50 border-emerald-200"
  },
  {
    id: 2,
    name: "Massachusetts General Hospital Urgent Care",
    type: "Urgent Care & Specialty Clinic",
    dist: "2.8 miles",
    waitTime: "12 mins wait",
    address: "55 Fruit St, Boston, MA 02114",
    phone: "+1 (617) 726-2000",
    status: "Open 24/7",
    color: "text-emerald-700 bg-emerald-50 border-emerald-200"
  },
  {
    id: 3,
    name: "CVS Health 24-Hour Pharmacy & Clinic",
    type: "Pharmacy & Rapid Clinic",
    dist: "0.6 miles",
    waitTime: "No wait",
    address: "423 Beacon St, Boston, MA 02115",
    phone: "+1 (617) 536-1400",
    status: "Open 24/7",
    color: "text-blue-700 bg-blue-50 border-blue-200"
  }
];

export default function HospitalsView({ isSOSOpen, setIsSOSOpen }) {
  const [selectedHospital, setSelectedHospital] = useState(hospitalsList[0]);
  const [directionsActive, setDirectionsActive] = useState(false);

  const handleDirections = (h) => {
    setSelectedHospital(h);
    setDirectionsActive(true);
    setTimeout(() => setDirectionsActive(false), 3000);
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-800 text-xs font-bold mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Geolocation & Emergency Services</span>
          </div>
          <h1 className="font-['Inter'] font-bold text-3xl text-slate-900">Nearby Hospitals & SOS Dispatch</h1>
          <p className="text-slate-500 text-sm mt-1">
            Locate nearest hospitals, emergency rooms, urgent care clinics, and pharmacies with live wait times and turn-by-turn routing.
          </p>
        </div>

        <button
          onClick={() => setIsSOSOpen(true)}
          className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20 flex items-center gap-2"
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Dispatch Emergency SOS</span>
        </button>
      </div>

      {/* Main Grid: Interactive Map & Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Directory List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-['Inter'] font-bold text-base text-slate-900">Nearby Facilities (3 found)</h3>

          {hospitalsList.map((h) => {
            const isSelected = selectedHospital.id === h.id;
            return (
              <div
                key={h.id}
                onClick={() => setSelectedHospital(h)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-blue-500 shadow-md ring-2 ring-blue-500/20'
                    : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${h.color}`}>
                    {h.status}
                  </span>
                  <span className="text-xs font-bold text-blue-600 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {h.waitTime}
                  </span>
                </div>

                <h4 className="font-['Inter'] font-bold text-base text-slate-900 mb-1">{h.name}</h4>
                <div className="text-xs text-slate-500 font-medium mb-3">{h.type} • {h.dist} away</div>

                <div className="text-[11px] text-slate-600 mb-4 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {h.address}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <a href={`tel:${h.phone}`} className="text-xs font-bold text-slate-700 flex items-center gap-1 hover:text-blue-600">
                    <Phone className="w-3.5 h-3.5 text-blue-600" /> {h.phone}
                  </a>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDirections(h);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Get Directions</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Map Canvas Visualizer (7 cols) */}
        <div className="lg:col-span-7 bg-slate-100 border border-slate-200 rounded-3xl p-6 relative min-h-[480px] flex flex-col justify-between shadow-2xs">
          
          <div className="flex items-center justify-between bg-white/90 p-3.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-800 shadow-xs z-10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
              <span>GPS Location: 42.3601° N, 71.0589° W (Boston, MA)</span>
            </div>
            {directionsActive && (
              <span className="text-emerald-600 font-extrabold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Live Turn-by-Turn Active
              </span>
            )}
          </div>

          {/* Interactive Map Graphical Canvas */}
          <div className="my-6 relative h-72 rounded-2xl bg-slate-200/80 border border-slate-300/60 overflow-hidden flex items-center justify-center">
            
            {/* Map Roads Vector Simulation */}
            <svg className="absolute inset-0 w-full h-full stroke-slate-300 stroke-2 fill-none">
              <line x1="0" y1="80" x2="100%" y2="80" strokeWidth="6" stroke="#E2E8F0" />
              <line x1="0" y1="200" x2="100%" y2="200" strokeWidth="6" stroke="#E2E8F0" />
              <line x1="180" y1="0" x2="180" y2="100%" strokeWidth="6" stroke="#E2E8F0" />
              <line x1="420" y1="0" x2="420" y2="100%" strokeWidth="6" stroke="#E2E8F0" />
            </svg>

            {/* Current User Location Pulse Pin */}
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md mt-1 shadow-sm">Your Location</span>
            </div>

            {/* Hospital Target Pin */}
            <div className="absolute top-1/3 right-1/4 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="bg-white text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-200 mt-1 shadow-xs">
                {selectedHospital.name.split('—')[0]}
              </span>
            </div>

          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-slate-900">{selectedHospital.name}</div>
              <div className="text-[11px] text-slate-500">Estimated Drive Time: 6 mins ({selectedHospital.dist})</div>
            </div>
            <a href={`tel:${selectedHospital.phone}`} className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold flex items-center gap-1.5 hover:bg-emerald-700">
              <Phone className="w-3.5 h-3.5" /> Call ER
            </a>
          </div>

        </div>

      </div>

      {/* SOS Emergency Modal */}
      {isSOSOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border-2 border-rose-300 rounded-3xl p-8 max-w-lg w-full shadow-2xl space-y-6 text-center animate-in zoom-in-95">
            
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto animate-pulse">
              <AlertTriangle className="w-9 h-9" />
            </div>

            <div>
              <h3 className="font-['Inter'] font-extrabold text-2xl text-slate-900">EMERGENCY SOS DISPATCH</h3>
              <p className="text-xs text-slate-600 mt-1">
                Transmitting GPS coordinates (Boston MA) & medical history to 911 Tele-ER services.
              </p>
            </div>

            <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200 text-xs text-rose-900 space-y-2 text-left">
              <div className="font-bold flex items-center justify-between">
                <span>Nearest Ambulance Dispatched</span>
                <span className="font-extrabold text-rose-700">ETA 4 Mins</span>
              </div>
              <div>Emergency Contacts Notified: Sarah Smith (Spouse), Dr. Elena Rostova</div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setIsSOSOpen(false)}
                className="px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Cancel SOS Call
              </button>
              <a
                href="tel:911"
                className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20 flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4" /> Direct 911 Call
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
