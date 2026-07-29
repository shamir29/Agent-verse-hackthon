import React from 'react';
import { 
  Stethoscope, 
  FileText, 
  Calendar, 
  Activity, 
  Pill, 
  MapPin, 
  ArrowRight, 
  Users, 
  UserCheck, 
  CheckCircle2, 
  Sparkles,
  Bot,
  ShieldCheck,
  Building2,
  Clock
} from 'lucide-react';

export default function HomeView({ setActiveView }) {
  const stats = [
    { label: "Registered Patients", val: "48,290+", icon: Users, color: "text-blue-600 bg-blue-50 border-blue-100" },
    { label: "Doctors Available", val: "1,420+", icon: UserCheck, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    { label: "Appointments Today", val: "384", icon: Calendar, color: "text-purple-600 bg-purple-50 border-purple-100" },
    { label: "Reports Analyzed", val: "128,400+", icon: FileText, color: "text-amber-600 bg-amber-50 border-amber-100" },
  ];

  const features = [
    {
      id: 'symptom-checker',
      title: "AI Symptom Checker",
      desc: "Enter your symptoms. AI asks targeted follow-up questions, evaluates possible conditions, and recommends whether medical attention is needed.",
      icon: Stethoscope,
      badge: "Symptom Triage",
      color: "border-blue-200 hover:border-blue-300 bg-white"
    },
    {
      id: 'report-analyzer',
      title: "Medical Report Analyzer",
      desc: "Upload blood tests or lab PDF reports. AI extracts abnormal results, provides plain-English medical explanations, and generates doctor recommendations.",
      icon: FileText,
      badge: "OCR & PDF Parser",
      color: "border-emerald-200 hover:border-emerald-300 bg-white"
    },
    {
      id: 'appointments',
      title: "Appointment Booking",
      desc: "Search top doctors, filter by specialty (Cardiologist, Dermatologist, Orthopedic), view ratings, select available dates, and book instantly.",
      icon: Calendar,
      badge: "Instant Scheduling",
      color: "border-purple-200 hover:border-purple-300 bg-white"
    },
    {
      id: 'dashboard',
      title: "Health Dashboard",
      desc: "Display real health metrics including Heart Rate, Blood Pressure, SpO2, Weight, BMI, and Temperature with weekly & monthly trend analytics.",
      icon: Activity,
      badge: "Vital Metrics",
      color: "border-sky-200 hover:border-sky-300 bg-white"
    },
    {
      id: 'medications',
      title: "Medication Reminders",
      desc: "Track active prescriptions, dosage schedules, upcoming doses, missed medications, and automated pharmacy refill alerts.",
      icon: Pill,
      badge: "Refill Manager",
      color: "border-amber-200 hover:border-amber-300 bg-white"
    },
    {
      id: 'hospitals',
      title: "Nearby Hospitals & Emergency",
      desc: "Interactive hospital directory with emergency wait times, nearby clinics, 24/7 pharmacies, turn-by-turn directions, and one-click SOS dispatch.",
      icon: MapPin,
      badge: "Maps & Emergency",
      color: "border-rose-200 hover:border-rose-300 bg-white"
    }
  ];

  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50/70 via-slate-50 to-emerald-50/40 border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>NeuraGrid.ai • Autonomous Smart Healthcare Platform</span>
            </div>

            <h1 className="font-['Inter'] font-extrabold text-4xl sm:text-5xl text-slate-900 tracking-tight leading-[1.12]">
              AI-Powered Smart Healthcare
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Monitor your health, analyze medical reports, book appointments, and receive personalized AI-powered healthcare assistance—all from one intelligent platform.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActiveView('symptom-checker')}
                className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all flex items-center gap-2 group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setActiveView('ai-assistant')}
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 shadow-2xs transition-all flex items-center gap-2"
              >
                <Bot className="w-4 h-4 text-blue-600" />
                <span>Talk to AI Assistant</span>
              </button>
            </div>
          </div>

          {/* Hero Right Vector Illustration Graphic */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    Dr
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Dr. Sarah Jenkins</div>
                    <div className="text-[10px] text-slate-500">Chief Clinical AI Officer</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Online
                </span>
              </div>

              {/* Simulated Record Item */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs space-y-2">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Patient Medical Sync</span>
                  <span className="text-[10px] font-semibold text-blue-600">Active</span>
                </div>
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>Blood Pressure: 118/78 mmHg</span>
                  <span>SpO2: 99%</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 p-3 rounded-2xl text-xs text-blue-900 font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>AI Symptom Triage & Report Analysis Ready</span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-2xs flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-medium text-slate-500 mb-1">{st.label}</div>
                <div className="text-2xl font-extrabold text-slate-900">{st.val}</div>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${st.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Six Features Section */}
      <div className="space-y-6">
        <div>
          <h2 className="font-['Inter'] font-bold text-2xl text-slate-900 mb-1">
            Platform Capabilities
          </h2>
          <p className="text-slate-500 text-sm">
            Practical, buildable tools designed for patient self-care and clinical workflow integration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                onClick={() => setActiveView(feat.id)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer shadow-2xs hover:shadow-sm flex flex-col justify-between group ${feat.color}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="font-['Inter'] font-bold text-lg text-slate-900 mb-2">{feat.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                  <span>Open {feat.title}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
