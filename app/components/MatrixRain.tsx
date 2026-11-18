'use client';

import { useEffect, useState } from 'react';

interface MatrixDrop {
  id: number;
  x: number;
  chars: string[];
  speed: number;
  opacity: number;
}

export default function MatrixRain() {
  const [drops, setDrops] = useState<MatrixDrop[]>([]);

  useEffect(() => {
    const matrixChars = '01{}<>/~+=*#λπ';
    const generateDrops = () => {
      const newDrops: MatrixDrop[] = [];
      for (let i = 0; i < 10; i++) {
        const charCount = Math.floor(Math.random() * 8) + 6;
        const chars = [];
        for (let j = 0; j < charCount; j++) {
          chars.push(matrixChars[Math.floor(Math.random() * matrixChars.length)]);
        }
        newDrops.push({
          id: i,
          x: Math.random() * 100,
          speed: Math.random() * 4 + 4,
          opacity: Math.random() * 0.12 + 0.04,
          chars,
        });
      }
      setDrops(newDrops);
    };

    generateDrops();
  }, []);

  return (
    <div className="hidden dark:block fixed inset-0 pointer-events-none overflow-hidden z-0">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute text-purple-400 font-mono text-[11px] select-none"
          style={{
            left: `${drop.x}%`,
            animation: `matrix-rain ${drop.speed}s linear infinite`,
            opacity: drop.opacity,
          }}
        >
          {drop.chars.map((char, index) => (
            <div
              key={index}
              className="block leading-tight"
              style={{
                opacity: 1 - (index / drop.chars.length) * 0.7,
              }}
            >
              {char}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
