import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

// ==========================================
// Sub-Component: Animated Counter
// ==========================================
const AnimatedCounter = ({ endValue, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = countRef.current;
    if (!element || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          let startTime = null;

          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            // Ease-out cubic formula for premium deceleration
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * endValue));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [endValue, duration, hasAnimated]);

  return <span ref={countRef}>{count}{suffix}</span>;
};

// ==========================================
// Sub-Component: Floating Particles
// ==========================================
const FloatingParticles = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${Math.random() * 20 + 10}s`, 
      delay: `${Math.random() * -20}s`,
      opacity: Math.random() * 0.4 + 0.1,
      xMove: `${(Math.random() - 0.5) * 80}px`,
      yMove: `${(Math.random() - 0.5) * 80}px`,
    }));
  }, []);

  return (
    <div className="bg-particles">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: p.left,
            top: p.top,
            opacity: p.opacity,
            '--x-move': p.xMove,
            '--y-move': p.yMove,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

// ==========================================
// Sub-Component: Live SVG Map
// ==========================================
const LiveMap = () => {
  const routePath = "M 20 90 C 80 90, 120 30, 180 50 C 230 65, 270 30, 300 20";

  return (
    <div className="dash-map-container floating-delay-1">
      <div className="map-base">
        <svg viewBox="0 0 320 120" className="route-svg">
          <path d={routePath} className="route-bg" />
          <path d={routePath} className="route-active" />
        </svg>

        <div className="route-entity truck-icon" style={{ '--path': `path("${routePath}")` }}>
          🚚
        </div>
        <div className="route-entity glowing-dot" style={{ '--path': `path("${routePath}")`, animationDelay: '1.5s' }} />
        <div className="route-entity glowing-dot" style={{ '--path': `path("${routePath}")`, animationDelay: '3s' }} />

        <div className="map-pin pin-restaurant">
          <span className="pin-pulse"></span>
          🏪
        </div>
        <div className="map-pin pin-ngo">
          <span className="pin-pulse"></span>
          ❤️
        </div>
      </div>
    </div>
  );
};

// ==========================================
// Main Hero Component
// ==========================================
const Hero = () => {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('');

  // 3D Mouse Tracking Logic
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
    <section className="hero-section">
      {/* Background Layers */}
      <div className="bg-grid"></div>
      <FloatingParticles />
      <div className="bg-glow teal-glow"></div>
      <div className="bg-glow blue-glow"></div>
      
      <div className="hero-container">
        {/* Left Side: Original Content */}
        <div className="hero-content">
          <h1 className="hero-title fade-up-1">
            Rescue Food.<br />
            <span className="text-accent">Feed Hope.</span>
          </h1>
          <p className="hero-subtitle fade-up-2">
            A technology platform connecting restaurants and volunteers to eliminate food waste. Turn surplus into sustenance with a tap.
          </p>
          <div className="hero-actions fade-up-3">
            <Link to="/donate" className="btn-solid">
              Donate Food <span className="arrow">→</span>
            </Link>
            <Link to="/campaigns" className="btn-glass">
              Explore Campaigns
            </Link>
          </div>
        </div>
        
        {/* Right Side: Holographic Dashboard */}
        <div className="hero-illustration-wrapper fade-up-4">
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

              {/* Dashboard Header */}
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

              {/* New Donation Card */}
              <div className="dash-donation floating-delay-2">
                <div className="donation-icon">🍱</div>
                <div className="donation-info">
                  <span className="donation-title">New Donation</span>
                  <span className="donation-rest">Green Bowl</span>
                </div>
                <div className="badge-new">NEW</div>
              </div>

              {/* Live Map Centerpiece */}
              <LiveMap />

              {/* Bottom Animated Stats */}
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
        </div>
      </div>
    </section>
  );
};

export default Hero;