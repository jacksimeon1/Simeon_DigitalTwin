'use client';

import { useEffect, useRef, useState } from 'react';

type Animation =
  | 'fade-up'
  | 'fade-in'
  | 'slide-left'
  | 'slide-right'
  | 'scale-in'
  | 'tilt-3d'
  | 'wave-slide'
  | 'wave-slide-right'
  | 'stamp-in'
  | 'blur-focus';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: Animation;
  delay?: number; // seconds
  duration?: number; // seconds
  threshold?: number; // 0-1
  className?: string;
  once?: boolean; // only animate once (default true)
  staggerIndex?: number; // for staggered children
  staggerDelay?: number; // delay between each stagger item (seconds)
}

const animationStyles: Record<Animation, { hidden: React.CSSProperties; visible: React.CSSProperties }> = {
  'fade-up': {
    hidden: { opacity: 0, transform: 'translateY(40px)' },
    visible: { opacity: 1, transform: 'translateY(0)' },
  },
  'fade-in': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  'slide-left': {
    hidden: { opacity: 0, transform: 'translateX(-50px)' },
    visible: { opacity: 1, transform: 'translateX(0)' },
  },
  'slide-right': {
    hidden: { opacity: 0, transform: 'translateX(50px)' },
    visible: { opacity: 1, transform: 'translateX(0)' },
  },
  'scale-in': {
    hidden: { opacity: 0, transform: 'scale(0.92)' },
    visible: { opacity: 1, transform: 'scale(1)' },
  },
  // Projects: 3D Isometric Card Flip & Settle
  'tilt-3d': {
    hidden: {
      opacity: 0,
      transform: 'perspective(1000px) rotateX(22deg) rotateY(-6deg) translateY(60px) scale(0.92)',
    },
    visible: {
      opacity: 1,
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)',
    },
  },
  // Skills: Cybernetic Lateral Wave with Shear
  'wave-slide': {
    hidden: {
      opacity: 0,
      transform: 'translateX(-60px) skewX(-5deg)',
    },
    visible: {
      opacity: 1,
      transform: 'translateX(0) skewX(0deg)',
    },
  },
  'wave-slide-right': {
    hidden: {
      opacity: 0,
      transform: 'translateX(60px) skewX(5deg)',
    },
    visible: {
      opacity: 1,
      transform: 'translateX(0) skewX(0deg)',
    },
  },
  // Resume: Authoritative Credential Seal Stamp
  'stamp-in': {
    hidden: {
      opacity: 0,
      transform: 'scale(1.15) rotate(-3deg) translateY(-25px)',
    },
    visible: {
      opacity: 1,
      transform: 'scale(1) rotate(0deg) translateY(0)',
    },
  },
  // Contact: Quantum Focal Blur Assembly
  'blur-focus': {
    hidden: {
      opacity: 0,
      filter: 'blur(16px)',
      transform: 'scale(0.94) translateY(30px)',
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transform: 'scale(1) translateY(0)',
    },
  },
};

export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 0.6,
  threshold = 0.15,
  className = '',
  once = true,
  staggerIndex = 0,
  staggerDelay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  const totalDelay = delay + staggerIndex * staggerDelay;
  const styles = animationStyles[animation];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...(isVisible ? styles.visible : styles.hidden),
        transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${totalDelay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${totalDelay}s, filter ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${totalDelay}s`,
        willChange: 'opacity, transform, filter',
      }}
    >
      {children}
    </div>
  );
}
