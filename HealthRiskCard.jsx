import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User, ShieldAlert, Heart, Activity, AlertTriangle, ShieldCheck, CheckSquare, Square } from 'lucide-react';
import { getUserProfile, updateUserProfile } from '../services/api';

export default function HealthRiskCard({ aqi, pm25, no2, co2, noise, temp, uvIndex, pollen }) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  // Fetch profile
  const { data: profile = { asthma: false, allergies: false, heartDisease: false, elderly: false, pregnant: false } } = useQuery({
    queryKey: ['profile'],
    queryFn: getUserProfile
  });

  // Update profile mutation
  const profileMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(['profile']);
    }
  });

  const toggleCondition = (condition) => {
    const updated = {
      ...profile,
      [condition]: !profile[condition]
    };
    profileMutation.mutate(updated);
  };

  // Calculation of personal exposure risk
  const calculateRisk = () => {
    let score = aqi || 0;
    const activeConditions = [];

    if (profile.asthma) {
      score += (pm25 || 0) * 1.6 + (no2 || 0) * 1.2;
      activeConditions.push('Asthma');
    }
    if (profile.allergies && pollen) {
      const totalPollen = (pollen.tree || 0) + (pollen.grass || 0) + (pollen.weed || 0);
      score += totalPollen * 0.2;
      activeConditions.push('Allergies');
    }
    if (profile.heartDisease) {
      score += (noise || 0) * 0.8 + ((co2 - 380) || 0) * 0.3;
      activeConditions.push('Heart Disease');
    }
    if (profile.elderly) {
      score += Math.max(0, temp - 20) * 2.0;
      activeConditions.push('Age Risk');
    }
    if (profile.pregnant) {
      score += Math.max(0, temp - 22) * 1.5 + (aqi * 0.15);
      activeConditions.push('Pregnancy');
    }

    // Determine warning levels
    let level = 'Low';
    let color = 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
    let glow = 'shadow-emerald-500/10';
    let recommendations = ['Air quality and thermal parameters are safe for outdoor activity.'];

    if (score > 60 && score <= 125) {
      level = 'Moderate';
      color = 'text-amber-400 border-amber-500/20 bg-amber-500/5';
      glow = 'shadow-amber-500/10';
      recommendations = ['Acceptable environment. Sensitives should monitor respiration.'];
    } else if (score > 125 && score <= 210) {
      level = 'High';
      color = 'text-orange-500 border-orange-500/20 bg-orange-500/5';
      glow = 'shadow-orange-500/10';
      recommendations = [];

      if (profile.asthma && (pm25 > 25 || aqi > 90)) {
        recommendations.push('High particulate density. Carry inhaler and limit outdoor workouts.');
      }
      if (profile.allergies && pollen && (pollen.tree > 50 || pollen.grass > 20)) {
        recommendations.push('Pollen index elevated. Keep windows closed and take antihistamines.');
      }
      if (uvIndex >= 6) {
        recommendations.push('High UV radiation. Apply sunscreen SPF 30+ and wear sunglasses.');
      }
      if (recommendations.length === 0) {
        recommendations.push('Elevated pollutants. Sensitive groups should reduce strenuous outdoor activity.');
      }
    } else if (score > 210) {
      level = 'Severe';
      color = 'text-rose-500 border-rose-500/20 bg-rose-500/5';
      glow = 'shadow-rose-500/10';
      recommendations = [];

      if (profile.asthma || profile.heartDisease) {
        recommendations.push('Hazardous pollutants. Avoid outdoor activity; run air purifiers indoors.');
      }
      if (temp > 32 && (profile.elderly || profile.pregnant)) {
        recommendations.push('Severe heat indices. Stay in air-conditioned environments and hydrate.');
      }
      if (uvIndex >= 8) {
        recommendations.push('Extreme UV radiation. Limit direct sunlight between 11 AM - 3 PM.');
      }
      if (recommendations.length === 0) {
        recommendations.push('Critical environmental breach. Avoid prolonged outdoor exposure.');
      }
    }

    return { score, level, color, glow, recommendations, activeConditions };
  };

  const risk = calculateRisk();

  return (
    <div className={`glass-panel p-5 rounded-2xl border-l-4 border-l-${risk.level === 'Low' ? 'emerald-500' : risk.level === 'Moderate' ? 'amber-500' : risk.level === 'High' ? 'orange-500' : 'rose-500'} shadow-sm transition-all duration-300 relative`}>
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-600">
            <Activity className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Personal Health Risk Index</h3>
            <p className="text-[10px] text-slate-500">Tailored environmental vulnerability assessment</p>
          </div>
        </div>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs bg-slate-100 hover:bg-slate-200 border border-slate-200 px-2.5 py-1 rounded-lg text-slate-700 font-medium transition"
        >
          {isOpen ? 'Save Profile' : 'Edit Profile'}
        </button>
      </div>

      {isOpen ? (
        <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
          <h4 className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">Select Health Conditions</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { id: 'asthma', name: 'Asthma / Respiratory' },
              { id: 'allergies', name: 'Allergies / Hayfever' },
              { id: 'heartDisease', name: 'Heart Disease' },
              { id: 'elderly', name: 'Elderly (65+)' },
              { id: 'pregnant', name: 'Pregnancy' }
            ].map(cond => (
              <button
                key={cond.id}
                onClick={() => toggleCondition(cond.id)}
                className={`flex items-center space-x-2 p-2 rounded-lg border text-left transition ${
                  profile[cond.id]
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-900 font-semibold'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                {profile[cond.id] ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 shrink-0" />
                )}
                <span className="truncate">{cond.name}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-baseline space-x-3">
            <span className={`text-4xl font-extrabold tracking-tight ${risk.level === 'Low' ? 'text-emerald-600' : risk.level === 'Moderate' ? 'text-amber-600' : risk.level === 'High' ? 'text-orange-600' : 'text-rose-600'}`}>{risk.level}</span>
            <span className="text-xs text-slate-500 font-medium">Risk rating</span>
          </div>

          <div className="flex flex-wrap gap-1.5 justify-end">
            {risk.activeConditions.length > 0 ? (
              risk.activeConditions.map((c, i) => (
                <span key={i} className="text-[9px] font-bold bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-slate-700">
                  {c}
                </span>
              ))
            ) : (
              <span className="text-[9px] font-bold bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-slate-500">
                Baseline (No Conditions)
              </span>
            )}
          </div>
        </div>
      )}

      {!isOpen && (
        <div className="mt-3.5 p-3 bg-slate-50/90 border border-slate-200 rounded-xl flex items-start space-x-2.5">
          <AlertTriangle className={`w-4 h-4 shrink-0 mt-0.5 ${risk.level === 'Low' ? 'text-emerald-600' : risk.level === 'Moderate' ? 'text-amber-600' : 'text-rose-600'}`} />
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-extrabold text-slate-700 tracking-wider">Health Recommendations</span>
            <div className="text-[11px] text-slate-600 leading-relaxed space-y-1">
              {risk.recommendations.map((rec, idx) => (
                <p key={idx}>• {rec}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
