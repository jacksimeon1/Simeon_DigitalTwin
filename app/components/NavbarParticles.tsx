'use client';

import { useEffect, useState } from 'react';

interface NavbarParticle {
  id: number;
  x: number;
  delay: number;
  duration: number;
}

export default function NavbarParticles() {
  const [particles, setParticles] = useState<NavbarParticle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: NavbarParticle[] = [];
      for (let i = 0; i < 8; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          delay: Math.random() * 3,
          duration: Math.random() * 2 + 3,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: '50%',
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            transform: 'translateY(-50%)',
          }}
        />
      ))}
    </div>
  );
}
