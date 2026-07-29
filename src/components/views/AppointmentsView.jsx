import React, { useState } from 'react';
import { Calendar, Search, Star, Clock, MapPin, CheckCircle2, UserCheck, Stethoscope, ChevronRight, X, Sparkles } from 'lucide-react';

const doctorData = [
  {
    id: 1,
    name: "Dr. Elena Rostova, MD",
    specialty: "Cardiologist",
    exp: "16 Years Experience",
    rating: 4.9,
    reviews: 142,
    hospital: "Mayo Medical Center, Boston",
    fee: "$150 / consult",
    available: "Today, 02:30 PM",
    avatar: "ER"
  },
  {
    id: 2,
    name: "Dr. Marcus Vance, MD",
    specialty: "Dermatologist",
    exp: "12 Years Experience",
    rating: 4.8,
    reviews: 98,
    hospital: "Johns Hopkins Hospital",
    fee: "$120 / consult",
    available: "Tomorrow, 10:00 AM",
    avatar: "MV"
  },
  {
    id: 3,
    name: "Dr. Sarah Jenkins, MD",
    specialty: "General Physician",
    exp: "14 Years Experience",
    rating: 4.95,
    reviews: 210,
    hospital: "Stanford Health Clinic",
    fee: "$90 / consult",
    available: "Today, 04:00 PM",
    avatar: "SJ"
  },
  {
    id: 4,
    name: "Dr. Robert Chen, MD",
    specialty: "Orthopedic",
    exp: "18 Years Experience",
    rating: 4.85,
    reviews: 176,
    hospital: "Mass General Orthopedics",
    fee: "$160 / consult",
    available: "Thursday, 11:30 AM",
    avatar: "RC"
  },
  {
    id: 5,
    name: "Dr. Maya Lin, DDS",
    specialty: "Dentist",
    exp: "10 Years Experience",
    rating: 4.9,
    reviews: 124,
    hospital: "Boston Dental Institute",
    fee: "$110 / consult",
    available: "Friday, 09:00 AM",
    avatar: "ML"
  }
];

const mockAppointments = [
  {
    id: 'app-1',
    doctor: "Dr. Elena Rostova, MD",
    specialty: "Cardiologist",
    date: "Thursday, July 30, 2026",
    time: "10:00 AM",
    type: "Virtual Consultation",
    status: "Confirmed",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200"
  },
  {
    id: 'app-2',
    doctor: "Dr. Sarah Jenkins, MD",
    specialty: "General Physician",
    date: "August 12, 2026",
    time: "02:00 PM",
    type: "In-Person Clinic Visit",
    status: "Upcoming",
    color: "bg-blue-50 text-blue-700 border-blue-200"
  }
];

export default function AppointmentsView() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('directory'); // 'directory' | 'my-appointments'
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingDate, setBookingDate] = useState('2026-07-31');
  const [bookingSlot, setBookingSlot] = useState('10:00 AM');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const specialties = ['All', 'Cardiologist', 'Dermatologist', 'General Physician', 'Orthopedic', 'Dentist'];

  const filteredDoctors = doctorData.filter(d => {
    const matchSpec = selectedSpecialty === 'All' || d.specialty === selectedSpecialty;
    const matchSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSpec && matchSearch;
  });

  const handleConfirmBooking = () => {
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setSelectedDoctor(null);
      setActiveTab('my-appointments');
    }, 1800);
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Header & View Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-bold mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Physician Directory & Booking</span>
          </div>
          <h1 className="font-['Inter'] font-bold text-3xl text-slate-900">Appointment Scheduling</h1>
          <p className="text-slate-500 text-sm mt-1">
            Search verified specialists, review patient ratings, pick available slots, and manage upcoming appointments.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveTab('directory')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'directory' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Doctor Directory
          </button>
          <button
            onClick={() => setActiveTab('my-appointments')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'my-appointments' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            My Appointments ({mockAppointments.length})
          </button>
        </div>
      </div>

      {activeTab === 'directory' ? (
        <>
          {/* Search & Specialty Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search doctor by name or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-blue-500 font-medium"
              />
            </div>

            {/* Specialty Pills */}
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {specialties.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedSpecialty === spec
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>

          </div>

          {/* Doctor Cards Directory */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-blue-700 text-lg shrink-0">
                      {doc.avatar}
                    </div>
                    <div>
                      <h3 className="font-['Inter'] font-bold text-base text-slate-900">{doc.name}</h3>
                      <div className="text-xs font-semibold text-blue-600">{doc.specialty}</div>
                      <div className="text-[11px] text-slate-400 font-medium mt-0.5">{doc.exp}</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 mb-6 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 font-bold text-slate-900">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {doc.rating} ({doc.reviews} reviews)
                      </span>
                      <span className="font-extrabold text-slate-900">{doc.fee}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1 border-t border-slate-200/60">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {doc.hospital}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Next: {doc.available}
                  </div>
                  <button
                    onClick={() => setSelectedDoctor(doc)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs transition-colors"
                  >
                    Book Consultation
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* My Appointments List */
        <div className="space-y-4">
          {mockAppointments.map((app) => (
            <div
              key={app.id}
              className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xs flex flex-wrap items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${app.color}`}>
                    {app.status}
                  </span>
                  <h3 className="font-['Inter'] font-bold text-lg text-slate-900 mt-1">{app.doctor}</h3>
                  <div className="text-xs text-slate-500 font-medium">
                    {app.specialty} • {app.type}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-bold text-slate-900">{app.date}</div>
                <div className="text-xs text-slate-500 font-medium">Time: {app.time}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Calendar Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-lg w-full shadow-2xl space-y-6 animate-in zoom-in-95">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold">
                  {selectedDoctor.avatar}
                </div>
                <div>
                  <h3 className="font-['Inter'] font-bold text-base text-slate-900">{selectedDoctor.name}</h3>
                  <div className="text-xs text-blue-600 font-semibold">{selectedDoctor.specialty}</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedDoctor(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {bookingConfirmed ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-['Inter'] font-bold text-xl text-slate-900">Appointment Confirmed!</h4>
                <p className="text-xs text-slate-500">
                  Scheduled with {selectedDoctor.name} for {bookingDate} at {bookingSlot}.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-400 mb-1.5 block">Select Date:</label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase text-slate-400 mb-1.5 block">Available Time Slots:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['09:00 AM', '10:00 AM', '02:30 PM', '04:00 PM', '05:30 PM'].map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setBookingSlot(slot)}
                          className={`py-2 rounded-xl text-xs font-bold transition-all ${
                            bookingSlot === slot
                              ? 'bg-blue-600 text-white shadow-2xs'
                              : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-900">Consultation Fee: {selectedDoctor.fee}</div>
                  <button
                    onClick={handleConfirmBooking}
                    className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20"
                  >
                    Confirm Booking
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
