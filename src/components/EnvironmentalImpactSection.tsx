import React from 'react';
import {
  Leaf,
  Trees,
  Fuel,
  Award,
  Globe,
} from 'lucide-react';
import { useSolar } from '../context/SolarContext';

export const EnvironmentalImpactSection: React.FC = () => {
  const { environmentalMetrics } = useSolar();

  return (
    <section style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Leaf size={22} color="var(--green-600)" />
            Section 8 — Environmental Impact & Sustainability Score
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Real-time carbon offset accounting and ESG compliance metrics
          </p>
        </div>

        {/* Sustainability Grade Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'var(--green-50)',
          border: '1px solid var(--green-100)',
          padding: '0.4rem 0.85rem',
          borderRadius: 'var(--radius-md)',
        }}>
          <Award size={18} color="var(--green-600)" />
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', lineHeight: 1 }}>
              ESG Rating Grade
            </span>
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--green-700)' }}>
              A+ ({environmentalMetrics.sustainabilityScore}/100)
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        {/* Card 1: CO2 Avoided */}
        <div className="card-solid" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--green-600)' }}>
            <Globe size={20} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>CO₂ Avoided Today</span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {environmentalMetrics.co2ReductionTons.toFixed(2)} Tons
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Cumulative YTD: 428.5 Tons
          </div>
        </div>

        {/* Card 2: Renewable Energy */}
        <div className="card-solid" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--yellow-600)' }}>
            <Leaf size={20} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Clean Yield</span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {environmentalMetrics.renewableEnergyGeneratedMwh.toFixed(2)} MWh
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--green-600)', fontWeight: 600, marginTop: '0.2rem' }}>
            100% Zero Emission
          </div>
        </div>

        {/* Card 3: Tree Equivalent */}
        <div className="card-solid" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--green-600)' }}>
            <Trees size={20} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Trees Equivalent</span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {environmentalMetrics.treesPlantedEquivalent} Trees
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Pine Forest Sequestration
          </div>
        </div>

        {/* Card 4: Gasoline Offset */}
        <div className="card-solid" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--blue-500)' }}>
            <Fuel size={20} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Fossil Fuel Offset</span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {environmentalMetrics.fossilFuelOffsetGallons} Gal
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Gasoline Burn Avoided
          </div>
        </div>
      </div>
    </section>
  );
};
