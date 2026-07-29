import React, { useState } from 'react';
import { Pill, Plus, CheckCircle2, AlertTriangle, Clock, Calendar, RefreshCw, X, Sparkles } from 'lucide-react';

const initialMedications = [
  {
    id: 1,
    name: "Rosuvastatin",
    dosage: "5 mg",
    time: "08:00 AM",
    frequency: "Once Daily (Morning)",
    remaining: 4,
    total: 30,
    status: "Refill Needed",
    color: "bg-amber-50 text-amber-800 border-amber-200"
  },
  {
    id: 2,
    name: "CoQ10 Ubiquinol",
    dosage: "100 mg",
    time: "08:00 AM",
    frequency: "Once Daily (Morning)",
    remaining: 22,
    total: 30,
    status: "Sufficient",
    color: "bg-emerald-50 text-emerald-800 border-emerald-200"
  },
  {
    id: 3,
    name: "Magnesium L-Threonate",
    dosage: "400 mg",
    time: "09:30 PM",
    frequency: "Once Daily (Bedtime)",
    remaining: 18,
    total: 30,
    status: "Sufficient",
    color: "bg-emerald-50 text-emerald-800 border-emerald-200"
  },
  {
    id: 4,
    name: "Vitamin D3 + K2",
    dosage: "5000 IU",
    time: "08:30 AM",
    frequency: "Once Daily (With Breakfast)",
    remaining: 26,
    total: 30,
    status: "Sufficient",
    color: "bg-emerald-50 text-emerald-800 border-emerald-200"
  }
];

export default function MedicationsView() {
  const [meds, setMeds] = useState(initialMedications);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMedName, setNewMedName] = useState('');
  const [newDosage, setNewDosage] = useState('');
  const [newTime, setNewTime] = useState('08:00 AM');
  const [takenIds, setTakenIds] = useState([2, 4]); // Checkbox state

  const toggleTake = (id) => {
    setTakenIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleAddMed = (e) => {
    e.preventDefault();
    if (!newMedName.trim()) return;

    const newMed = {
      id: Date.now(),
      name: newMedName,
      dosage: newDosage || '10 mg',
      time: newTime,
      frequency: 'Once Daily',
      remaining: 30,
      total: 30,
      status: 'Sufficient',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    };

    setMeds([...meds, newMed]);
    setNewMedName('');
    setNewDosage('');
    setShowAddModal(false);
  };

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-800 text-xs font-bold mb-2">
            <Pill className="w-3.5 h-3.5" />
            <span>Prescription & Refill Manager</span>
          </div>
          <h1 className="font-['Inter'] font-bold text-3xl text-slate-900">Medication Reminders</h1>
          <p className="text-slate-500 text-sm mt-1">
            Track active medicines, daily dosing schedules, remaining tablets, and automated pharmacy refills.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Medication</span>
        </button>
      </div>

      {/* Dosing Schedule Today */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xs space-y-4">
        <h3 className="font-['Inter'] font-bold text-lg text-slate-900">Today's Dosing Checklist</h3>

        <div className="space-y-3">
          {meds.map((med) => {
            const isTaken = takenIds.includes(med.id);
            return (
              <div
                key={med.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                  isTaken ? 'bg-slate-50 border-slate-200 opacity-75' : 'bg-white border-slate-200 shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleTake(med.id)}
                    className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors ${
                      isTaken ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 hover:border-blue-500'
                    }`}
                  >
                    {isTaken && <CheckCircle2 className="w-4 h-4" />}
                  </button>

                  <div>
                    <h4 className="font-['Inter'] font-bold text-sm text-slate-900">{med.name} ({med.dosage})</h4>
                    <div className="text-xs text-slate-500 font-medium">{med.frequency} • Scheduled: {med.time}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="text-right hidden sm:block">
                    <span className="font-bold text-slate-900">{med.remaining} / {med.total}</span>
                    <div className="text-[10px] text-slate-400">Tablets Left</div>
                  </div>

                  <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border ${med.color}`}>
                    {med.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Medication Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-['Inter'] font-bold text-lg text-slate-900">Add New Medication</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddMed} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-400 mb-1 block">Medicine Name:</label>
                <input
                  type="text"
                  placeholder="E.g. Lisinopril, Metformin, Magnesium"
                  value={newMedName}
                  onChange={(e) => setNewMedName(e.target.value)}
                  className="w-full text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-400 mb-1 block">Dosage:</label>
                <input
                  type="text"
                  placeholder="E.g. 10 mg, 500 mg, 1 tablet"
                  value={newDosage}
                  onChange={(e) => setNewDosage(e.target.value)}
                  className="w-full text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-400 mb-1 block">Schedule Time:</label>
                <input
                  type="text"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs"
                >
                  Save Prescription
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
