import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import './Impact.css';

// Reusable Counter Component
const AnimatedCounter = ({ from, to, suffix = "", duration = 2, decimals = 0 }) => {
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (inView) {
      let start = null;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / (duration * 1000), 1);
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setValue(from + (to - from) * easeProgress);
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, from, to, duration]);

  const formatted = decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toLocaleString();
  return <span ref={nodeRef}>{formatted}{suffix}</span>;
};

// SVG Graph Component
const ImpactChart = () => {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const width = 1000;
  const height = 250;
  const padding = 20;
  
  // Adjusted data points matching the screenshot trajectory
  const points = [
    { x: 50, y: 220 },
    { x: 200, y: 205 },
    { x: 400, y: 170 },
    { x: 550, y: 130 },
    { x: 750, y: 100 },
    { x: 950, y: 40 }
  ];

  const pathData = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
  const fillPathData = `${pathData} L ${points[points.length-1].x},${height} L ${points[0].x},${height} Z`;

  return (
    <div className="graph-container" ref={containerRef}>
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="graph-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0, 210, 180, 0.15)" />
            <stop offset="100%" stopColor="rgba(0, 210, 180, 0)" />
          </linearGradient>
        </defs>

        {/* Grid Lines */}
        {[50, 100, 150, 200].map((y, i) => (
          <g key={i}>
            <line x1="50" y1={y} x2="950" y2={y} className="grid-line" />
            <text x="10" y={y + 4} className="axis-label">{125 - (i * 25)}K</text>
          </g>
        ))}

        {/* X Axis Labels */}
        {['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'JAN 2026', 'CURRENT [Q1 26]'].map((label, i) => (
          <text key={i} x={points[i].x} y={height - 5} textAnchor="middle" className="axis-label">{label}</text>
        ))}

        {/* Animated Graph Elements */}
        {inView && (
          <>
            <motion.path 
              d={fillPathData} 
              className="graph-fill"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            <motion.path 
              d={pathData} 
              className="graph-line"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            {points.map((p, i) => (
              <motion.circle 
                key={i}
                cx={p.x} cy={p.y} r="4" 
                className="graph-point"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + (i * 0.2) }}
              />
            ))}
          </>
        )}
      </svg>
    </div>
  );
};

export default function Impact() {
  return (
    <section className="impact-section">
      <div className="impact-container">
        
        {/* Header */}
        <motion.div 
          className="impact-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="telemetry-badge">
            <span className="dot"></span> AUDITED IMPACT TELEMETRY // 2026
          </div>
          <h2>The Impact, Measured.<br/><span className="highlight">Real change. Real numbers.</span></h2>
          <p>Every gram of surplus food redirected, every volunteer route completed, and every family nourished is cryptographically audited on open registries.</p>
        </motion.div>

        {/* Top Stats */}
        <div className="top-stats-grid">
          <motion.div className="glass-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="stat-header">
              <span className="stat-tag">● PLATFORM CORNERSTONE INDEX</span>
              <span className="stat-tag cyan">LIVE REGISTRY FEED</span>
            </div>
            <div className="stat-value">
              <AnimatedCounter from={0} to={125} suffix="K+" />
            </div>
            <div className="stat-label">MEALS RESCUED & DELIVERED</div>
            <p className="stat-desc">Piping-hot meals and fresh pantry produce safely diverted from commercial kitchens to verified community dining rooms in under 45 minutes.</p>
            
            <div className="sub-telemetry">
              <span className="stat-tag">● 99.4% safe delivery index</span>
              <span className="stat-tag">LATENCY AVG: 32.4 MIN</span>
            </div>
          </motion.div>

          <div className="right-stats-col">
            <motion.div className="glass-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="stat-header">
                <div className="stat-value"><AnimatedCounter from={0} to={42} suffix=" Tons" /></div>
                <span className="stat-tag cyan">DIVERSION</span>
              </div>
              <div className="stat-label">FOOD WASTE PREVENTED</div>
              <p className="stat-desc" style={{fontSize: '0.8rem'}}>Diverted from municipal landfills, closing urban circular loops across 14 metropolitan nodes.</p>
            </motion.div>

            <motion.div className="glass-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className="stat-header">
                <div className="stat-value"><AnimatedCounter from={0} to={18.9} decimals={1} suffix="K+" /></div>
                <span className="stat-tag cyan">OUTREACH</span>
              </div>
              <div className="stat-label">FAMILIES SUPPORTED</div>
              <p className="stat-desc" style={{fontSize: '0.8rem'}}>Nutritious sustenance delivered directly to local shelters, day centers, and community pantries.</p>
            </motion.div>
          </div>
        </div>

        {/* Graph Section */}
        <motion.div className="glass-card graph-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <div className="graph-header-flex">
            <div>
              <span className="stat-tag" style={{display: 'block', marginBottom: '8px'}}>● RESCUE ACTIVITY TELEMETRY</span>
              <div className="graph-title">Cumulative Volume Trajectory <span className="stat-tag cyan">2025-2026</span></div>
            </div>
            <span className="stat-tag">● AUDITED HOURLY | DISPATCH RETENTION: 99.8%</span>
          </div>
          <ImpactChart />
        </motion.div>

        {/* Bottom Stats */}
        <div className="bottom-stats-grid">
          {[
            { tag: "RAPID COURIERS", value: 850, suffix: "+", label: "ACTIVE VOLUNTEERS", desc: "Autonomous bike couriers and neighborhood rescue drivers ready for dispatch within minutes.", delay: 0.4 },
            { tag: "CULINARY NETWORK", value: 2500, suffix: "+", label: "VERIFIED PARTNERS", desc: "Commercial kitchens, university cafes, and artisan food purveyors logged on the network.", delay: 0.5 },
            { tag: "ATMOSPHERIC OFFSET", value: 18, suffix: " Tons", label: "CO₂ REDUCED", desc: "Avoided methane and carbon emissions through rapid same-day surplus redistribution.", delay: 0.6 }
          ].map((stat, i) => (
            <motion.div key={i} className="glass-card small-stat-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: stat.delay }}>
              <span className="stat-tag">{stat.tag}</span>
              <div className="stat-value"><AnimatedCounter from={0} to={stat.value} suffix={stat.suffix} /></div>
              <div className="stat-label">{stat.label}</div>
              <p className="stat-desc" style={{fontSize: '0.8rem'}}>{stat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div className="impact-footer" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }}>
          <div><span style={{color: '#00d2b4'}}>●</span> Audited every 24 hours &nbsp;&nbsp;|&nbsp;&nbsp; Public Ledger: v2.4</div>
          <a href="#">Download Open Impact Report (PDF) →</a>
        </motion.div>

      </div>
    </section>
  );
}