import React from 'react';
import { useDigitalTwin } from '../../context/DigitalTwinContext';
import { Play, Pause, RotateCcw, FastForward, Clock, Calendar, ShieldCheck, Zap } from 'lucide-react';
import { DigitalTwinMap } from '../Map/DigitalTwinMap';

export const HistoricalPlayback = () => {
  const { 
    playbackRange, 
    setPlaybackRange, 
    isPlaying, 
    setIsPlaying, 
    playbackSpeed, 
    setPlaybackSpeed, 
    playbackPlayhead, 
    setPlaybackPlayhead 
  } = useDigitalTwin();

  const PLAYBACK_TIMELINES = [
    { id: 'last_hour', label: 'Last Hour' },
    { id: 'yesterday', label: 'Yesterday (24h)' },
    { id: 'last_week', label: 'Last Week (7d)' },
    { id: 'last_month', label: 'Last Month (30d)' },
    { id: 'custom', label: 'Custom Date Range' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock size={24} style={{ color: 'var(--accent-blue)' }} /> Digital Twin Historical State Playback
          </h2>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            Replay historical grid states, power flows, traffic events, solar generation curves, and fault occurrences frame by frame.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {PLAYBACK_TIMELINES.map(t => (
            <button
              key={t.id}
              onClick={() => setPlaybackRange(t.id)}
              className={`btn ${playbackRange === t.id ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Map View for Replay */}
      <div style={{ position: 'relative' }}>
        <DigitalTwinMap />

        {/* Playback Control Bar Floating Card */}
        <div style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '780px',
          backgroundColor: '#ffffff',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-floating)',
          padding: '14px 20px',
          zIndex: 30,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button 
                className="btn btn-primary"
                onClick={() => setIsPlaying(!isPlaying)}
                style={{ width: '40px', height: '40px', borderRadius: '50%', padding: 0 }}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
              </button>

              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => setPlaybackPlayhead(0)}
              >
                <RotateCcw size={14} /> Reset
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Speed:
                {[1, 2, 5, 10].map(s => (
                  <button
                    key={s}
                    onClick={() => setPlaybackSpeed(s)}
                    style={{
                      padding: '2px 6px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: playbackSpeed === s ? 'var(--accent-blue)' : 'var(--bg-app)',
                      color: playbackSpeed === s ? '#ffffff' : 'var(--text-main)',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.7rem'
                    }}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>

            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0369a1', fontFamily: 'monospace' }}>
              REPLAY TIMESTAMP: {playbackRange.toUpperCase()} ({playbackPlayhead}% Timeline)
            </div>
          </div>

          {/* Timeline Scrubber */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>00:00</span>
            <input 
              type="range"
              min="0"
              max="100"
              value={playbackPlayhead}
              onChange={(e) => setPlaybackPlayhead(parseInt(e.target.value))}
              style={{ flex: 1, accentColor: 'var(--accent-blue)', cursor: 'pointer' }}
            />
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>24:00</span>
          </div>
        </div>
      </div>
    </div>
  );
};
