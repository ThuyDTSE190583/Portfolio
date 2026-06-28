import { useState } from 'react';

const ParticleBackground = () => {
  // Initialize state with a function so it only runs once on mount
  const [particles] = useState(() => {
    const particleCount = 30;
    return Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-background/80 z-0"></div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] z-0" 
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      ></div>
      
      {/* Animated Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-primary/30 animate-pulse"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Large Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] mix-blend-screen pointer-events-none animate-pulse duration-[10000ms]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] mix-blend-screen pointer-events-none animate-pulse duration-[8000ms]"></div>
    </div>
  );
};

export default ParticleBackground;
