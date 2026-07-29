import React, { useState } from 'react';
import { X, AlertTriangle, Zap, CheckCircle2, Battery, RefreshCw, Cpu, ShieldAlert, Bell } from 'lucide-react';

export default function NotificationDrawer({ isOpen, onClose, notifications, onAcknowledgeAlert, onNavigate }) {
  const [filter, setFilter] = useState('ALL');

  if (!isOpen) return null;

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'UNACKNOWLEDGED') return !n.acknowledged;
    if (filter === 'CRITICAL') return n.severity === 'CRITICAL';
    return true;
  });

  return (
    <div className="modal-overlay" onClick={onClose} style={{ justifyContent: 'flex-end', padding: 0 }}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          maxWidth: '440px', 
          height: '100vh', 
          borderRadius: 0,
          maxHeight: '100vh' 
        }}
      >
        <div className="modal-header" style={{ background: '#f8fafc' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bell size={20} color="#2563eb" />
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Real-time Notifications</h3>
              <p style={{ fontSize: '11px', color: '#64748b' }}>Live energy telemetry alerts & events</p>
            </div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}>
            <X size={20} />
          </button>
        </div>

        {/* Filter Pills */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '6px', background: '#ffffff' }}>
          <button 
            className={`tab-btn ${filter === 'ALL' ? 'active' : ''}`}
            onClick={() => setFilter('ALL')}
            style={{ fontSize: '12px', padding: '4px 10px' }}
          >
            All ({notifications.length})
          </button>
          <button 
            className={`tab-btn ${filter === 'UNACKNOWLEDGED' ? 'active' : ''}`}
            onClick={() => setFilter('UNACKNOWLEDGED')}
            style={{ fontSize: '12px', padding: '4px 10px' }}
          >
            Active ({notifications.filter(n => !n.acknowledged).length})
          </button>
          <button 
            className={`tab-btn ${filter === 'CRITICAL' ? 'active' : ''}`}
            onClick={() => setFilter('CRITICAL')}
            style={{ fontSize: '12px', padding: '4px 10px' }}
          >
            Critical ({notifications.filter(n => n.severity === 'CRITICAL').length})
          </button>
        </div>

        {/* Notifications List */}
        <div className="modal-body" style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {filteredNotifications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748b' }}>
              <CheckCircle2 size={36} color="#059669" style={{ margin: '0 auto 12px auto' }} />
              <p style={{ fontSize: '14px', fontWeight: 600 }}>All notifications cleared</p>
              <p style={{ fontSize: '12px', color: '#94a3b8' }}>Grid telemetry operating within nominal bounds.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredNotifications.map((item) => (
                <div 
                  key={item.id}
                  style={{
                    padding: '14px',
                    borderRadius: '10px',
                    border: `1px solid ${item.severity === 'CRITICAL' ? '#fecaca' : item.severity === 'WARNING' ? '#fef08a' : '#bfdbfe'}`,
                    backgroundColor: item.acknowledged ? '#f8fafc' : item.severity === 'CRITICAL' ? '#fef2f2' : item.severity === 'WARNING' ? '#fffbe6' : '#eff6ff',
                    opacity: item.acknowledged ? 0.75 : 1,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {item.severity === 'CRITICAL' ? (
                        <ShieldAlert size={18} color="#dc2626" />
                      ) : item.severity === 'WARNING' ? (
                        <AlertTriangle size={18} color="#d97706" />
                      ) : (
                        <Zap size={18} color="#2563eb" />
                      )}
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{item.title}</span>
                    </div>
                    <span className={`badge ${item.severity === 'CRITICAL' ? 'badge-red' : item.severity === 'WARNING' ? 'badge-amber' : 'badge-blue'}`}>
                      {item.severity}
                    </span>
                  </div>

                  <p style={{ fontSize: '12px', color: '#334155', marginBottom: '8px', lineHeight: 1.4 }}>
                    {item.message}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', borderTop: '1px dashed #cbd5e1', paddingTop: '8px' }}>
                    <span>{item.timestamp}</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {!item.acknowledged && (
                        <button 
                          className="btn btn-secondary btn-sm"
                          onClick={() => onAcknowledgeAlert(item.id)}
                          style={{ fontSize: '11px', padding: '2px 8px' }}
                        >
                          Acknowledge
                        </button>
                      )}
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          onNavigate(item.targetTab || 'anomaly_detection');
                          onClose();
                        }}
                        style={{ fontSize: '11px', padding: '2px 8px' }}
                      >
                        Inspect
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
