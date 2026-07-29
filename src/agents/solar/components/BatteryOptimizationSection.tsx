import React from 'react';
import {
  BatteryCharging,
  Zap,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Building,
} from 'lucide-react';
import { useSolar } from '../context/SolarContext';

export const BatteryOptimizationSection: React.FC = () => {
  const { telemetry, batterySchedule, updateBatteryMode } = useSolar();

  return (
    <section style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BatteryCharging size={22} color="var(--green-600)" />
            Section 5 — Battery Optimization & BMS Arbitrage
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            LiFePO4 energy storage system (BMS) optimization for peak-shaving and time-of-use utility arbitrage
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--green-700)', backgroundColor: 'var(--green-50)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--green-100)' }}>
            State of Health (SOH): 98.4%
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '1.25rem' }}>
        {/* Left Column: Battery Gauge & State Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="card-solid" style={{ padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              State of Charge (SoC)
            </div>

            {/* Battery SoC Circle Gauge */}
            <div style={{ position: 'relative', width: '150px', height: '150px', margin: '0 auto 1rem auto' }}>
              <svg width="150" height="150" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="var(--bg-subtle)" strokeWidth="10" />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="var(--green-500)"
                  strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 42 * (telemetry.batteryChargePct / 100)} 999`}
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  style={{ transition: 'stroke-dasharray 0.5s ease' }}
                />
              </svg>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
                  {telemetry.batteryChargePct}%
                </span>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--green-600)', textTransform: 'uppercase', marginTop: '0.2rem' }}>
                  {telemetry.batteryChargingStatus}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', textAlign: 'left' }}>
              <div style={{ padding: '0.5rem 0.75rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Charging Rate</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--green-600)' }}>+{telemetry.batteryPowerKw} kW</div>
              </div>

              <div style={{ padding: '0.5rem 0.75rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Est. Backup Time</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>14.2 Hours</div>
              </div>
            </div>
          </div>

          {/* AI Recommended Quick Battery Action Buttons */}
          <div className="card-solid" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Sparkles size={16} color="var(--green-600)" />
              AI Battery Control Override
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
              <button
                onClick={() => updateBatteryMode('11:00 - 13:00', 'CHARGE_SOLAR')}
                className="btn-secondary"
                style={{ fontSize: '0.75rem', justifyContent: 'flex-start' }}
              >
                <Zap size={14} color="var(--yellow-600)" />
                Store Solar Energy
              </button>

              <button
                onClick={() => updateBatteryMode('11:00 - 13:00', 'EXPORT_GRID')}
                className="btn-secondary"
                style={{ fontSize: '0.75rem', justifyContent: 'flex-start' }}
              >
                <ArrowUpRight size={14} color="var(--green-600)" />
                Export Power (Peak)
              </button>

              <button
                onClick={() => updateBatteryMode('11:00 - 13:00', 'DISCHARGE_LOAD')}
                className="btn-secondary"
                style={{ fontSize: '0.75rem', justifyContent: 'flex-start' }}
              >
                <ArrowDownRight size={14} color="var(--blue-500)" />
                Power Load from Battery
              </button>

              <button
                onClick={() => updateBatteryMode('11:00 - 13:00', 'CHARGE_GRID')}
                className="btn-secondary"
                style={{ fontSize: '0.75rem', justifyContent: 'flex-start' }}
              >
                <Building size={14} color="var(--text-muted)" />
                Charge from Off-Peak
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Charge/Discharge Schedule Timeline */}
        <div className="card-solid" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Optimized Time-of-Use Charge & Export Schedule
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Grid Tariff Peak: $0.35/kWh
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {batterySchedule.map((slot, i) => {
              const isExport = slot.mode === 'EXPORT_GRID';
              const isSolar = slot.mode === 'CHARGE_SOLAR';
              const isDischarge = slot.mode === 'DISCHARGE_LOAD';

              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.6rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: slot.isCurrentSlot ? 'var(--green-50)' : 'var(--bg-subtle)',
                    border: `1px solid ${slot.isCurrentSlot ? 'var(--green-500)' : 'var(--border-light)'}`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', width: '100px' }}>
                      {slot.timeSlot}
                    </div>

                    <span className={isExport ? 'badge-green' : isSolar ? 'badge-yellow' : isDischarge ? 'badge-red' : 'badge-green'}>
                      {slot.mode.replace('_', ' ')}
                    </span>

                    {slot.isCurrentSlot && (
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--green-700)', textTransform: 'uppercase' }}>
                        ACTIVE SLOT
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.8rem' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{slot.plannedPowerKw} kW</span>
                    <span style={{ color: 'var(--text-muted)' }}>${slot.tariffRateUsdKwh}/kWh</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
