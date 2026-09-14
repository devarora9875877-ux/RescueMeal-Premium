import React, { useState, useRef } from 'react';
import AnimatedCounter from './AnimatedCounter';
import LiveMap from './LiveMap';

const HeroDashboard = () => {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('');

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div 
      className="dashboard-3d-wrapper"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      <div className="dashboard-glass-card">
        <div className="card-glow-pulse"></div>
        <div className="scan-line"></div>

        {/* Notification Toast */}
        <div className="dash-toast">
          <span className="text-accent">✓</span> Volunteer Assigned
        </div>

        {/* Header */}
        <div className="dash-header">
          <div className="dash-logo">RescueMeal</div>
          <div className="dash-controls">
            <div className="live-indicator">
              <span className="live-dot"></span> LIVE
            </div>
            <div className="dash-time">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>

        {/* Donation Card */}
        <div className="dash-donation floating-delay-2">
          <div className="donation-icon">🍱</div>
          <div className="donation-info">
            <span className="donation-title">New Donation</span>
            <span className="donation-rest">Green Bowl</span>
          </div>
          <div className="badge-new">NEW</div>
        </div>

        {/* Centerpiece Map */}
        <LiveMap />

        {/* Bottom Stats */}
        <div className="dash-stats">
          <div className="stat-chip">
            <span className="stat-label">🍽 Meals Today</span>
            <span className="stat-value"><AnimatedCounter endValue={125} /></span>
          </div>
          <div className="stat-chip">
            <span className="stat-label">🤝 Vols Online</span>
            <span className="stat-value"><AnimatedCounter endValue={18} /></span>
          </div>
          <div className="stat-chip">
            <span className="stat-label">🌱 CO₂ Saved</span>
            <span className="stat-value"><AnimatedCounter endValue={42} suffix="kg" /></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDashboard;