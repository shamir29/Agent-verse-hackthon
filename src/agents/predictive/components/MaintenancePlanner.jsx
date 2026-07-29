import React, { useState } from 'react';
import { 
  CalendarCheck, 
  Clock, 
  UserCheck, 
  DollarSign, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  Wrench,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MaintenancePlanner = () => {
  const { maintenanceTasks, markTaskCompleted, assignTechnician, scheduleTask } = useApp();
  const [activeCategory, setActiveCategory] = useState("Today's Tasks");
  const [showAssignModal, setShowAssignModal] = useState(null); // taskId
  const [selectedTech, setSelectedTech] = useState('David Miller');

  const categories = [
    "Today's Tasks",
    "Weekly Tasks",
    "Monthly Tasks",
    "Critical Maintenance",
    "Completed Jobs",
  ];

  const technicians = [
    'David Miller (Lead Reliability Eng)',
    'Sarah Jenkins (Hydraulics Specialist)',
    'Alex Rodriguez (High-Voltage Electrician)',
    'Elena Rostova (BESS Storage Tech)',
    'Marcus Vance (EVSE Field Tech)',
  ];

  const filteredTasks = maintenanceTasks.filter((t) => {
    if (activeCategory === "Completed Jobs") return t.status === 'Completed';
    if (t.status === 'Completed') return false;
    return t.category === activeCategory;
  });

  const handleAssignSubmit = (taskId) => {
    assignTechnician(taskId, selectedTech.split(' (')[0]);
    setShowAssignModal(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="card-enterprise p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">AI-Optimized Maintenance Planner</h2>
          <p className="text-xs text-slate-500 mt-1">
            Automated work order generation, technician dispatch optimization, and downtime reduction scheduling.
          </p>
        </div>

        {/* Task Counter Badges */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            {maintenanceTasks.filter((t) => t.status !== 'Completed').length} Pending Tasks
          </span>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            {maintenanceTasks.filter((t) => t.status === 'Completed').length} Completed Jobs
          </span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs px-4 py-2 rounded-xl whitespace-nowrap font-semibold transition-all ${
              activeCategory === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Maintenance Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTasks.map((task) => {
          const isP1 = task.priority.startsWith('P1');
          const isCompleted = task.status === 'Completed';

          return (
            <div
              key={task.id}
              className={`card-enterprise p-5 flex flex-col justify-between transition-all ${
                isCompleted
                  ? 'bg-slate-50 opacity-90 border-slate-200'
                  : isP1
                  ? 'border-l-4 border-l-red-500 bg-red-50/5'
                  : 'border-l-4 border-l-blue-500'
              }`}
            >
              <div>
                
                {/* Header: ID, Priority & Status */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {task.id}
                      </span>
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                        {task.assetId}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mt-1">{task.equipment}</h3>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      isP1 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100 mt-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <div>
                      <span className="text-[10px] text-slate-400 block">Est. Duration</span>
                      <span className="font-bold text-slate-800">{task.estimatedTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                    <div>
                      <span className="text-[10px] text-slate-400 block">Est. Cost</span>
                      <span className="font-bold text-slate-800 font-mono">${task.estimatedCost?.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                    <div>
                      <span className="text-[10px] text-slate-400 block">Technician Required</span>
                      <span className="font-semibold text-slate-800">{task.technicianRequired}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    <div>
                      <span className="text-[10px] text-slate-400 block">Expected Improvement</span>
                      <span className="font-bold text-emerald-600">{task.expectedImprovement}</span>
                    </div>
                  </div>
                </div>

                {/* Assigned Technician Badge */}
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Assigned Tech:</span>
                  <span className="font-bold text-slate-800 bg-white border border-slate-200 px-2.5 py-1 rounded-md">
                    {task.technicianAssigned}
                  </span>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                {!isCompleted ? (
                  <>
                    <button
                      onClick={() => setShowAssignModal(task.id)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition"
                    >
                      Assign Technician
                    </button>

                    <button
                      onClick={() => markTaskCompleted(task.id)}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-2xs transition flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Mark Completed
                    </button>
                  </>
                ) : (
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Work Order Completed
                  </span>
                )}
              </div>

              {/* Technician Assign Popover Modal */}
              {showAssignModal === task.id && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs space-y-2">
                  <span className="font-bold text-blue-900 block">Select Technician to Dispatch:</span>
                  <select
                    value={selectedTech}
                    onChange={(e) => setSelectedTech(e.target.value)}
                    className="w-full p-2 bg-white border border-blue-200 rounded-md font-medium text-slate-800"
                  >
                    {technicians.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      onClick={() => setShowAssignModal(null)}
                      className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleAssignSubmit(task.id)}
                      className="px-3 py-1 bg-blue-600 text-white font-semibold rounded shadow-2xs"
                    >
                      Confirm Dispatch
                    </button>
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
