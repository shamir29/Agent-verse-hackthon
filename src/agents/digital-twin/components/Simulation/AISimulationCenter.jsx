import React from 'react';
import { SIMULATION_SCENARIOS } from '../../data/simulationScenarios';
import { useDigitalTwin } from '../../context/DigitalTwinContext';
import { 
  FlaskConical, 
  Play, 
  Square, 
  Sliders, 
  AlertTriangle, 
  DollarSign, 
  Clock, 
  ZapOff, 
  Droplets, 
  Leaf, 
  CheckCircle2, 
  Sparkles,
  RefreshCw,
  TrendingDown
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const AISimulationCenter = () => {
  const { 
    activeSimulation, 
    isSimulating, 
    simulationSeverity, 
    setSimulationSeverity, 
    simulationProgress, 
    runSimulation, 
    stopSimulation 
  } = useDigitalTwin();

  const currentScenario = activeSimulation || SIMULATION_SCENARIOS[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FlaskConical size={24} style={{ color: 'var(--accent-blue)' }} /> AI Scenario Simulation Center
          </h2>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            Predict grid stress, infrastructure failures, climate events, and evaluate automated AI mitigation response strategies before real-world execution.
          </p>
        </div>

        {activeSimulation && (
          <button className="btn btn-secondary" onClick={stopSimulation}>
            <Square size={14} /> Reset Simulation
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px' }}>
        {/* Left Column: 12 Scenario Selector Cards */}
        <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
            Select Failure / Event Scenario (12)
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '560px', overflowY: 'auto' }}>
            {SIMULATION_SCENARIOS.map((scen) => {
              const isSelected = currentScenario.id === scen.id;

              return (
                <button
                  key={scen.id}
                  onClick={() => runSimulation(scen.id, simulationSeverity)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isSelected ? 'var(--accent-blue-light)' : 'var(--bg-app)',
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--accent-blue)' : 'var(--border-color)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: isSelected ? 'var(--accent-blue)' : 'var(--text-main)' }}>
                      {scen.title}
                    </span>
                    <span className="badge badge-yellow" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                      Sev {scen.defaultSeverity}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>
                    {scen.category} • {scen.affectedAreas.length} Zones Affected
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Simulation Output Dashboard & Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Controls & Runner Card */}
          <div className="card" style={{ padding: '20px', backgroundColor: 'var(--bg-card)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <span className="badge badge-blue">{currentScenario.category}</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '4px' }}>
                  {currentScenario.title}
                </h3>
              </div>

              <button
                className={`btn ${isSimulating ? 'btn-secondary' : 'btn-primary'}`}
                onClick={() => runSimulation(currentScenario.id, simulationSeverity)}
                disabled={isSimulating}
                style={{ height: '40px', padding: '0 20px', fontSize: '0.875rem' }}
              >
                {isSimulating ? <RefreshCw size={16} className="spin" /> : <Play size={16} fill="currentColor" />}
                {isSimulating ? `Running Simulation (${simulationProgress}%)...` : 'Execute Simulation'}
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              {currentScenario.description}
            </p>

            {/* Severity Slider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: 'var(--bg-app)', padding: '12px 16px', borderRadius: 'var(--radius-md)' }}>
              <Sliders size={18} style={{ color: 'var(--accent-blue)' }} />
              <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-main)', whiteSpace: 'nowrap' }}>
                Scenario Severity Level: <strong style={{ color: 'var(--accent-orange)' }}>Level {simulationSeverity} / 10</strong>
              </span>
              <input
                type="range"
                min="1"
                max="10"
                value={simulationSeverity}
                onChange={(e) => setSimulationSeverity(parseInt(e.target.value))}
                style={{ flex: 1, accentColor: 'var(--accent-blue)', cursor: 'pointer' }}
              />
            </div>

            {/* Progress Bar when running */}
            {isSimulating && (
              <div style={{ marginTop: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px', fontWeight: 600 }}>
                  <span>Simulating Physical Asset Response...</span>
                  <span>{simulationProgress}%</span>
                </div>
                <div style={{ height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${simulationProgress}%`, height: '100%', backgroundColor: 'var(--accent-blue)', transition: 'width 0.2s linear' }} />
                </div>
              </div>
            )}
          </div>

          {/* Simulation Output Metrics Grid (6 KPI Metrics) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
            <div className="card" style={{ padding: '14px' }}>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={14} style={{ color: 'var(--accent-blue)' }} /> Estimated Downtime
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
                {currentScenario.metrics.downtime}
              </div>
            </div>

            <div className="card" style={{ padding: '14px' }}>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ZapOff size={14} style={{ color: 'var(--accent-orange)' }} /> Power Loss Impact
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
                {currentScenario.metrics.powerLoss}
              </div>
            </div>

            <div className="card" style={{ padding: '14px' }}>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Droplets size={14} style={{ color: '#06b6d4' }} /> Water Loss Impact
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
                {currentScenario.metrics.waterLoss}
              </div>
            </div>

            <div className="card" style={{ padding: '14px' }}>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Leaf size={14} style={{ color: 'var(--accent-green)' }} /> Carbon Impact
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
                {currentScenario.metrics.carbonImpact}
              </div>
            </div>

            <div className="card" style={{ padding: '14px' }}>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <DollarSign size={14} style={{ color: 'var(--accent-red)' }} /> Economic Impact
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-red)', marginTop: '4px' }}>
                {currentScenario.metrics.economicImpact}
              </div>
            </div>

            <div className="card" style={{ padding: '14px' }}>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={14} style={{ color: 'var(--accent-purple)' }} /> Recovery Time
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
                {currentScenario.metrics.recoveryTime}
              </div>
            </div>
          </div>

          {/* Interactive Recovery Curve & AI Recommended Response Plan */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {/* Timeline Curve Chart */}
            <div className="card" style={{ padding: '16px' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <TrendingDown size={16} style={{ color: 'var(--accent-blue)' }} /> Recovery Curve Timeline
              </h4>
              <div style={{ width: '100%', height: '200px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={currentScenario.timelineData}>
                    <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="simulatedLoad" name="Simulated Load %" stroke="#ef4444" fill="#fee2e2" fillOpacity={0.8} />
                    <Area type="monotone" dataKey="healthScore" name="Health Score %" stroke="#10b981" fill="#d1fae5" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* AI Response Workflow */}
            <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px', color: '#0369a1' }}>
                  <Sparkles size={16} /> AI Autonomous Recommended Response
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {currentScenario.aiRecommendedResponse.map((step, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.775rem' }}>
                      <CheckCircle2 size={16} style={{ color: 'var(--accent-green)', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ color: 'var(--text-main)', lineHeight: 1.4 }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="btn btn-success"
                onClick={() => alert(`AI Response Workflow Executed for ${currentScenario.title}!`)}
                style={{ width: '100%', marginTop: '12px' }}
              >
                <CheckCircle2 size={16} /> Deploy AI Autonomous Mitigation Strategy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
