import React, { useMemo } from 'react';

const FloatingParticles = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1, // 1px to 4px
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${Math.random() * 20 + 10}s`, 
      delay: `${Math.random() * -20}s`, // Negative delay starts them immediately
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

export default FloatingParticles;