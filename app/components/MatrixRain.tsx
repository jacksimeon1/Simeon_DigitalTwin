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
    const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const generateDrops = () => {
      const newDrops: MatrixDrop[] = [];
      for (let i = 0; i < 15; i++) {
        const charCount = Math.floor(Math.random() * 15) + 10;
        const chars = [];
        for (let j = 0; j < charCount; j++) {
          chars.push(matrixChars[Math.floor(Math.random() * matrixChars.length)]);
        }
        newDrops.push({
          id: i,
          x: Math.random() * 100,
          chars,
          speed: Math.random() * 3 + 2,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
      setDrops(newDrops);
    };

    generateDrops();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-5">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute text-green-500 font-mono text-sm"
          style={{
            left: `${drop.x}%`,
            animation: `matrix-rain ${drop.speed}s linear infinite`,
            opacity: drop.opacity,
          }}
        >
          {drop.chars.map((char, index) => (
            <div
              key={index}
              className="block"
              style={{
                opacity: 1 - (index / drop.chars.length) * 0.8,
                fontSize: `${14 - index * 0.5}px`,
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
